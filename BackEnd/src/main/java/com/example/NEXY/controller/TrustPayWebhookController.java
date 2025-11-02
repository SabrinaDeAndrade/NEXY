package com.example.NEXY.controller;

import com.example.NEXY.model.Pedido;
import com.example.NEXY.model.StatusPedido;
import com.example.NEXY.service.PedidoService;
import com.example.NEXY.service.TrustPayService;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/webhooks/trustpay")
public class TrustPayWebhookController {

    @Autowired
    private PedidoService pedidoService;

    private static final Logger logger = LoggerFactory.getLogger(TrustPayWebhookController.class);

    @PostMapping
    public ResponseEntity<?> receberWebhook(@RequestBody Map<String, Object> payload) {
        try {
            logger.info("Webhook recebido: {}", payload);  // CORREÇÃO: Adicione log
            Map<String, Object> data = (Map<String, Object>) payload.get("data");
            if (data == null) return ResponseEntity.badRequest().body("Payload inválido");
            String orderId = (String) data.get("orderId");
            String status = (String) data.get("status");
            // CORREÇÃO: Busque pelo orderId (novo método no PedidoService)
            Optional<Pedido> pedidoOpt = pedidoService.findByOrderId(orderId);
            if (pedidoOpt.isEmpty()) return ResponseEntity.badRequest().body("Pedido não encontrado");
            Pedido pedido = pedidoOpt.get();
            if ("APPROVED".equalsIgnoreCase(status)) {
                pedidoService.atualizarStatus(pedido.getId(), StatusPedido.PROCESSANDO);  // Ou PAGAMENTO_APROVADO se preferir
            } else if ("REJECTED".equalsIgnoreCase(status) || "DECLINED".equalsIgnoreCase(status)) {
                pedidoService.atualizarStatus(pedido.getId(), StatusPedido.CANCELADO);
            }
            return ResponseEntity.ok("Webhook processado com sucesso");
        } catch (Exception e) {
            logger.error("Erro ao processar webhook: {}", e.getMessage());
            return ResponseEntity.status(500).body("Erro ao processar webhook");
        }
    }
}
