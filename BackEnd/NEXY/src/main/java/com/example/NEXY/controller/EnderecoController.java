package com.example.NEXY.controller;

import com.example.NEXY.model.Endereco;
import com.example.NEXY.service.EnderecoService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping
    public Endereco criar(@RequestBody Endereco endereco) {
        return enderecoService.save(endereco);
    }

    @GetMapping
    public List<Endereco> listarTodos() {
        return enderecoService.findAll();
    }

    @GetMapping("/{id}")
    public Endereco buscarPorId(@PathVariable Long id) {
        return enderecoService.findById(id).orElse(null);
    }

    @GetMapping("/cliente/{clienteId}")
    public List<Endereco> buscarPorCliente(@PathVariable Long clienteId) {
        return enderecoService.findByClienteId(clienteId);
    }

    @PutMapping("/{id}")
    public Endereco atualizar(@PathVariable Long id, @RequestBody Endereco endereco) {
        return enderecoService.update(id, endereco);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        enderecoService.delete(id);
    }
}
