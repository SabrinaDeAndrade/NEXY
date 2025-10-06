package com.example.NEXY.controller;

import com.example.NEXY.model.CarrinhoItem;
import com.example.NEXY.service.CarrinhoItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carrinho-itens")
public class CarrinhoItemController {
    private final CarrinhoItemService carrinhoItemService;

    public CarrinhoItemController(CarrinhoItemService carrinhoItemService) {
        this.carrinhoItemService = carrinhoItemService;
    }

    @PostMapping
    public CarrinhoItem criar(@RequestBody CarrinhoItem item) {
        return carrinhoItemService.save(item);
    }

    @GetMapping
    public List<CarrinhoItem> listarTodos() {
        return carrinhoItemService.findAll();
    }

    @GetMapping("/{id}")
    public CarrinhoItem buscarPorId(@PathVariable Long id) {
        return carrinhoItemService.findById(id).orElse(null);
    }

    @GetMapping("/carrinho/{carrinhoId}")
    public List<CarrinhoItem> buscarPorCarrinho(@PathVariable Long carrinhoId) {
        return carrinhoItemService.findByCarrinhoId(carrinhoId);
    }

    @PutMapping("/{id}")
    public CarrinhoItem atualizar(@PathVariable Long id, @RequestBody CarrinhoItem item) {
        return carrinhoItemService.update(id, item);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        carrinhoItemService.delete(id);
    }

}
