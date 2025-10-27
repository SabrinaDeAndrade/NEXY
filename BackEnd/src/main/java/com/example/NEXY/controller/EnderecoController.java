package com.example.NEXY.controller;

import com.example.NEXY.model.Endereco;
import com.example.NEXY.service.EnderecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enderecos")
public class EnderecoController {

    private final EnderecoService enderecoService;
    @Autowired
    public EnderecoController(EnderecoService enderecoService) {
        this.enderecoService = enderecoService;
    }

    @PostMapping("/cliente/{clienteId}")
    public Endereco save(@PathVariable Long clienteId, @RequestBody Endereco endereco) {
        return enderecoService.save(clienteId, endereco);
    }

    @GetMapping
    public List<Endereco> findAll() {
        return enderecoService.findAll();
    }

    @GetMapping("/{id}")
    public Endereco findById(@PathVariable Long id) {
        return enderecoService.findById(id).orElse(null);
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<Endereco>> getEnderecosPorCliente(@PathVariable Long clienteId) {
        return ResponseEntity.ok(enderecoService.findByClienteId(clienteId));
    }

    @PutMapping("/{id}")
    public Endereco update(@PathVariable Long id, @RequestBody Endereco endereco) {
        return enderecoService.update(id, endereco);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        enderecoService.delete(id);
    }
}
