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
    public CarrinhoItem save(@RequestBody CarrinhoItem item) {
        return carrinhoItemService.save(item);
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
    public CarrinhoItem update(@PathVariable Long id, @RequestBody CarrinhoItem item) {
        return carrinhoItemService.update(id, item);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        carrinhoItemService.delete(id);
    }

}
