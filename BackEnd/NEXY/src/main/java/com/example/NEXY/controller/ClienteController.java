package com.example.NEXY.controller;

import com.example.NEXY.model.Cliente;
import com.example.NEXY.service.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping
    public Cliente criar(@RequestBody Cliente cliente) {
        return clienteService.save(cliente);
    }

    @PostMapping("/login")
    public Cliente login(@RequestBody Cliente cliente) {
        return clienteService.login(cliente.getEmail(), cliente.getSenha())
                .orElse(null);
    }

    @GetMapping
    public List<Cliente> listarTodos() {
        return clienteService.findAll();
    }

    @GetMapping("/{id}")
    public Cliente buscarPorId(@PathVariable Long id) {
        return clienteService.findById(id).orElse(null); //
    }

    @PutMapping("/{id}")
    public Cliente atualizar(@PathVariable Long id, @RequestBody Cliente cliente) {
        return clienteService.update(id, cliente);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        clienteService.delete(id);
    }

}