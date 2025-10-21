package com.example.NEXY.controller;

import com.example.NEXY.model.CarrinhoItem;
import com.example.NEXY.service.CarrinhoItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/carrinho-itens")
public class CarrinhoItemController {
    private final CarrinhoItemService carrinhoItemService;

    public CarrinhoItemController(CarrinhoItemService carrinhoItemService) {
        this.carrinhoItemService = carrinhoItemService;
    }

    @PostMapping
    public ResponseEntity<CarrinhoItem> criarItem(@RequestBody CarrinhoItem item) {
        CarrinhoItem itemSalvo = carrinhoItemService.criar(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(itemSalvo);
    }

    @GetMapping
    public List<CarrinhoItem> findAll() {
        return carrinhoItemService.findAll();
    }

    @GetMapping("/{id}")
    public CarrinhoItem findById(@PathVariable Long id) {
        return carrinhoItemService.findById(id).orElse(null);
    }

    @GetMapping("/carrinho/{carrinhoId}")
    public List<CarrinhoItem> findByCarrinhoId(@PathVariable Long carrinhoId) {
        return carrinhoItemService.findByCarrinhoId(carrinhoId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarrinhoItem> atualizarQuantidade(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> payload) {

        Integer novaQuantidade = payload.get("quantidade");
        if (novaQuantidade == null || novaQuantidade < 0) {
            return ResponseEntity.badRequest().build();
        }

        CarrinhoItem itemAtualizado = carrinhoItemService.atualizarQuantidade(id, novaQuantidade);
        return ResponseEntity.ok(itemAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarItem(@PathVariable Long id) {
        carrinhoItemService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
