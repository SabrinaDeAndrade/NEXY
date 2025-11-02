package com.example.NEXY.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Service
public class TrustPayService {
    private static final Logger logger = LoggerFactory.getLogger(TrustPayService.class);
    @Value("${trustpay.api.url}")
    private String trustPayApiUrl;
    @Value("${trustpay.api.key}")
    private String trustPayApiKey;
    @Value("${trustpay.api.secret}")
    private String trustPayApiSecret;    // Merchant Secret
    @Value("${trustpay.webhook.callback-url}")
    private String callbackUrl;
    @Value("${trustpay.webhook.return-url}")
    private String returnUrl;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();


    public String criarPaymentIntent(String orderId, int amount, String currency, String customerName, String customerEmail) {
        String path = "/api/merchant/v1/payment-intents";
        String url = trustPayApiUrl + path;
        // Montar o corpo JSON da requisição
        Map<String, Object> payload = new HashMap<>();
        payload.put("orderId", orderId);
        payload.put("amount", amount);
        payload.put("currency", currency);
        payload.put("paymentMethod", "credit_card");
        Map<String, Object> customer = new HashMap<>();
        customer.put("name", customerName);
        customer.put("email", customerEmail);
        payload.put("customer", customer);
        payload.put("callbackUrl", callbackUrl);
        payload.put("returnUrl", returnUrl);
        String rawBody;
        try {
            rawBody = objectMapper.writeValueAsString(payload);
            String jsonFormatado = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(payload);
            logger.info("Payload enviado para TrustPay:\n{}", jsonFormatado);
        } catch (Exception e) {
            logger.error("Erro ao converter payload para JSON", e);
            throw new RuntimeException("Erro ao converter payload para JSON", e);
        }
        // Gerar timestamp atual em segundos
        String timestamp = String.valueOf(Instant.now().getEpochSecond());
        // Gerar assinatura HMAC-SHA256
        String signature;
        try {
            signature = gerarSignature(trustPayApiSecret, "POST", path, timestamp, rawBody);
        } catch (Exception e) {
            logger.error("Erro ao gerar assinatura", e);
            throw new RuntimeException("Erro ao gerar assinatura", e);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-api-key", trustPayApiKey);
        headers.set("x-timestamp", timestamp);
        headers.set("x-signature", signature);
        HttpEntity<String> request = new HttpEntity<>(rawBody, headers);
        logger.info("Enviando requisição Payment Intent para orderId: {}", orderId);
        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);
            if (response.getStatusCode() == HttpStatus.OK || response.getStatusCode() == HttpStatus.CREATED) {
                Map<String, Object> respBody = response.getBody();
                if (respBody != null && Boolean.TRUE.equals(respBody.get("success"))) {
                    Map<String, Object> data = (Map<String, Object>) respBody.get("data");
                    if (data != null && data.containsKey("id")) {
                        String id = data.get("id").toString();
                        logger.info("Payment Intent criado com id: {}", id);
                        return id;
                    }
                }
            }
            logger.warn("Resposta inesperada do TrustPay: {}", response.getBody());
        } catch (Exception e) {
            logger.error("Erro ao criar Payment Intent no TrustPay", e);
            throw new RuntimeException("Erro ao criar Payment Intent no TrustPay", e);
        }
        throw new RuntimeException("Falha desconhecida ao criar Payment Intent");
    }

    private String gerarSignature(String secret, String method, String path, String timestamp, String rawBody) throws Exception {
        String stringToSign = method + "\n" + path + "\n" + timestamp + "\n" + rawBody;
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes("UTF-8"), "HmacSHA256");
        mac.init(secretKey);
        byte[] hash = mac.doFinal(stringToSign.getBytes("UTF-8"));
        // Converter bytes para hex (minúsculo)
        StringBuilder hexString = new StringBuilder(2 * hash.length);
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }

    public boolean capturarPagamento(String paymentId, String cardNumber, String cardHolderName,
                                     String expirationMonth, String expirationYear, String cvv) {
        String path = "/api/merchant/v1/payments/" + paymentId + "/capture";
        String url = trustPayApiUrl + path;
        Map<String, Object> payload = new HashMap<>();
        payload.put("cardNumber", cardNumber);
        payload.put("cardHolderName", cardHolderName);
        payload.put("expirationMonth", expirationMonth);
        payload.put("expirationYear", expirationYear);
        payload.put("cvv", cvv);
        String rawBody;
        try {
            rawBody = objectMapper.writeValueAsString(payload);
        } catch (Exception e) {
            logger.error("Erro ao converter payload para JSON", e);
            return false;
        }
        String timestamp = String.valueOf(Instant.now().getEpochSecond());
        String signature;
        try {
            signature = gerarSignature(trustPayApiSecret, "POST", path, timestamp, rawBody);
        } catch (Exception e) {
            logger.error("Erro ao gerar assinatura na captura", e);
            return false;
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-api-key", trustPayApiKey);
        headers.set("x-timestamp", timestamp);
        headers.set("x-signature", signature);
        HttpEntity<String> request = new HttpEntity<>(rawBody, headers);
        logger.info("Enviando requisição de captura para pagamento id={}", paymentId);
        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);
            Map<String, Object> respBody = response.getBody();

            if (response.getStatusCode() == HttpStatus.OK && respBody != null) {
                if (Boolean.TRUE.equals(respBody.get("success"))) {
                    Map<String, Object> data = (Map<String, Object>) respBody.get("data");
                    if (data != null && "APPROVED".equalsIgnoreCase((String) data.get("status"))) {
                        logger.info("Pagamento capturado com sucesso, status: APPROVED");
                        return true;
                    }
                    logger.warn("Pagamento não aprovado, status retornado: {}", data.get("status"));
                } else {
                    logger.warn("Falha na captura do pagamento: {}", respBody.get("error"));
                }
            } else if (response.getStatusCode() == HttpStatus.UNPROCESSABLE_ENTITY) {
                logger.error("Cartão rejeitado pela validação externa: {}", respBody);
                throw new RuntimeException("Pagamento recusado: cartão inválido ou não autorizado.");
            } else {
                logger.warn("Resposta inesperada da TrustPay: {}", respBody);
            }
        } catch (Exception e) {
            logger.error("Erro ao capturar pagamento no TrustPay", e);
            throw new RuntimeException("Erro ao capturar pagamento no TrustPay.", e);
        }

        return false;

    }
    public String consultarStatusPagamento(String paymentId) {
        String path = "/api/merchant/v1/payments/" + paymentId + "/status";
        String url = trustPayApiUrl + path;

        String timestamp = String.valueOf(Instant.now().getEpochSecond());
        String rawBody = "";
        String signature;
        try {
            signature = gerarSignature(trustPayApiSecret, "GET", path, timestamp, rawBody);
        } catch (Exception e) {
            logger.error("Erro ao gerar assinatura para consulta de status", e);
            throw new RuntimeException("Erro ao gerar assinatura", e);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-api-key", trustPayApiKey);
        headers.set("x-timestamp", timestamp);
        headers.set("x-signature", signature);

        HttpEntity<Void> request = new HttpEntity<>(headers); // Sem corpo (Void)

        logger.info("Consultando status para pagamento ID: {}", paymentId);
        try {

            ResponseEntity<Map> response = this.restTemplate.exchange(url, HttpMethod.GET, request, Map.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> respBody = response.getBody();
                if (respBody != null) {
                    // Assumindo que a resposta de status siga o padrão
                    Map<String, Object> data = (Map<String, Object>) respBody.get("data");
                    if (data != null && data.containsKey("status")) {
                        String status = (String) data.get("status");
                        logger.info("Status consultado: {}", status);
                        return status;
                    }
                }
            }
            logger.warn("Consulta de status falhou: {}", response.getBody());
        } catch (Exception e) {
            logger.error("Erro ao consultar status: {}", e.getMessage());
            throw new RuntimeException("Erro ao consultar status do pagamento no TrustPay.", e);
        }
        throw new RuntimeException("Erro ao consultar status do pagamento no TrustPay.");
    }
}
