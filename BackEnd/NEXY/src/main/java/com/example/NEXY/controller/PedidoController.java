package com.example.NEXY.controller;

import com.example.NEXY.model.Pedido;
import com.example.NEXY.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

record CheckoutRequestDTO(Long clienteId, Long enderecoId, String cartaoToken) {}

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
                checkoutRequest.cartaoToken()
        );
        return ResponseEntity.ok(pedido);
    }

    @PostMapping
    public Pedido save(@RequestBody Pedido pedido) {
        return pedidoService.save(pedido);
    }

    @GetMapping
    public List<Pedido> findAll() {
        return pedidoService.findAll();
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

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        pedidoService.delete(id);
    }

}
