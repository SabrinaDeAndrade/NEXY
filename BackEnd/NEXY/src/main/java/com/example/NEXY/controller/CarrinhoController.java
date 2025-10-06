package com.example.NEXY.controller;

import com.example.NEXY.model.Carrinho;
import com.example.NEXY.service.CarrinhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carrinhos")
public class CarrinhoController {

    private final CarrinhoService carrinhoService;
    @Autowired
    public CarrinhoController(CarrinhoService carrinhoService) {
        this.carrinhoService = carrinhoService;
    }

    @GetMapping("/cliente/{clienteId}")
    public Carrinho buscarPorCliente(@PathVariable Long clienteId) {
        return carrinhoService.findByClienteId(clienteId).orElse(null);
    }

    @PutMapping("/{id}")
    public Carrinho atualizar(@PathVariable Long id, @RequestBody Carrinho carrinho) {
        return carrinhoService.update(id, carrinho);
    }


    @PostMapping
    public Carrinho criar(@RequestBody Carrinho carrinho) {
        return carrinhoService.criar(carrinho);
    }


    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        carrinhoService.remover(id);
    }

}
