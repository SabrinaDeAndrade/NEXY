package com.example.NEXY.controller;

import com.example.NEXY.model.ClienteCartao;
import com.example.NEXY.service.ClienteCartaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes-cartao")
public class ClienteCartaoController {

    private final ClienteCartaoService clienteCartaoService;
    @Autowired
    public ClienteCartaoController(ClienteCartaoService clienteCartaoService) {
        this.clienteCartaoService = clienteCartaoService;
    }

    @PostMapping
    public ClienteCartao save(@RequestBody ClienteCartao cartao) {
        return clienteCartaoService.save(cartao);
    }

    @GetMapping
    public List<ClienteCartao> findAll() {
        return clienteCartaoService.findAll();
    }

    @GetMapping("/{id}")
    public ClienteCartao findById(@PathVariable Long id) {
        return clienteCartaoService.findById(id).orElse(null);
    }

    @GetMapping("/cliente/{clienteId}")
    public List<ClienteCartao> findByClienteId(@PathVariable Long clienteId) {
        return clienteCartaoService.findByClienteId(clienteId);
    }

    @PutMapping("/{id}")
    public ClienteCartao update(@PathVariable Long id, @RequestBody ClienteCartao cartao) {
        return clienteCartaoService.update(id, cartao);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        clienteCartaoService.delete(id);
    }
}
