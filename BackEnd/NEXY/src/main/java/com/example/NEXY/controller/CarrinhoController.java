package com.example.NEXY.controller;

import com.example.NEXY.model.Carrinho;
import com.example.NEXY.service.CarrinhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carrinhos")
public class CarrinhoController {

    private final CarrinhoService carrinhoService;
    @Autowired
    public CarrinhoController(CarrinhoService carrinhoService) {
        this.carrinhoService = carrinhoService;
    }

    @PostMapping
    public ResponseEntity<Carrinho> criarCarrinho(@RequestBody Carrinho carrinho) {
        Carrinho novoCarrinho = carrinhoService.criarParaCliente(carrinho.getCliente().getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(novoCarrinho);
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<Carrinho> buscarPorCliente(@PathVariable Long clienteId) {
        return carrinhoService.buscarPorCliente(clienteId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Carrinho update(@PathVariable Long id, @RequestBody Carrinho carrinho) {
        return carrinhoService.update(id, carrinho);
    }


//    @PostMapping
//    public Carrinho save(@RequestBody Carrinho carrinho) {
//        return carrinhoService.save(carrinho);
//    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        carrinhoService.remover(id);
    }

}
