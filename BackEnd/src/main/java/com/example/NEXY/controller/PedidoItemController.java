package com.example.NEXY.controller;

import com.example.NEXY.model.PedidoItem;
import com.example.NEXY.service.PedidoItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedido-itens")
public class PedidoItemController {

    private final PedidoItemService pedidoItemService;
    @Autowired
    public PedidoItemController(PedidoItemService pedidoItemService) {
        this.pedidoItemService = pedidoItemService;
    }

    @PostMapping
    public PedidoItem save(@RequestBody PedidoItem item) {
        return pedidoItemService.save(item);
    }

    @GetMapping
    public List<PedidoItem> findAll() {
        return pedidoItemService.findAll();
    }

    @GetMapping("/{id}")
    public PedidoItem findById(@PathVariable Long id) {
        return pedidoItemService.findById(id).orElse(null);
    }

    @GetMapping("/pedido/{pedidoId}")
    public List<PedidoItem> findByPedidoId(@PathVariable Long pedidoId) {
        return pedidoItemService.findByPedidoId(pedidoId);
    }

    @PutMapping("/{id}")
    public PedidoItem update(@PathVariable Long id, @RequestBody PedidoItem item) {
        return pedidoItemService.update(id, item);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        pedidoItemService.delete(id);
    }
}

