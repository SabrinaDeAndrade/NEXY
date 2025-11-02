package com.example.NEXY.controller;

import com.example.NEXY.model.Pedido;
import com.example.NEXY.model.StatusPedido;
import com.example.NEXY.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

record CheckoutRequestDTO(Long clienteId, Long enderecoId, Long cartaoId) {}

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;
    @Autowired
    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }


    @PostMapping("/finalizar")
    public ResponseEntity<Pedido> finalizarCompra(@RequestBody CheckoutRequestDTO checkoutRequest) {
        Pedido pedido = pedidoService.finalizarCompra(
                checkoutRequest.clienteId(),
                checkoutRequest.enderecoId(),
                checkoutRequest.cartaoId()
        );
        return ResponseEntity.ok(pedido);
    }

    @PostMapping
    public Pedido save(@RequestBody Pedido pedido) {
        return pedidoService.save(pedido);
    }

    @GetMapping
    public ResponseEntity<List<Pedido>> listarTodosAdmin() {
        List<Pedido> pedidos = pedidoService.listarTodosOrdenados();
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/{id}")
    public Pedido findById(@PathVariable Long id) {
        return pedidoService.findById(id).orElse(null);
    }

    @GetMapping("/cliente/{clienteId}")
    public List<Pedido> findByClienteId(@PathVariable Long clienteId) {
        return pedidoService.findByClienteId(clienteId);
    }

    @PutMapping("/{id}")
    public Pedido update(@PathVariable Long id, @RequestBody Pedido pedido) {
        return pedidoService.update(id, pedido);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        try {
            String novoStatusStr = payload.get("status");
            if (novoStatusStr == null) {
                return ResponseEntity.badRequest().body(Map.of("erro", "O campo 'status' é obrigatório no corpo da requisição."));
            }

            StatusPedido novoStatus = StatusPedido.valueOf(novoStatusStr.toUpperCase());

            Pedido pedidoAtualizado = pedidoService.atualizarStatus(id, novoStatus);
            return ResponseEntity.ok(pedidoAtualizado);
        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body(Map.of("erro", "Status inválido: " + payload.get("status")));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("erro", e.getMessage())); // Retorna 404 Not Found ou outra mensagem
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        pedidoService.delete(id);
    }

}
