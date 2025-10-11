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
    public Carrinho findByClienteId(@PathVariable Long clienteId) {
        return carrinhoService.findByClienteId(clienteId).orElse(null);
    }

    @PutMapping("/{id}")
    public Carrinho update(@PathVariable Long id, @RequestBody Carrinho carrinho) {
        return carrinhoService.update(id, carrinho);
    }


    @PostMapping
    public Carrinho save(@RequestBody Carrinho carrinho) {
        return carrinhoService.save(carrinho);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        carrinhoService.remover(id);
    }

}
