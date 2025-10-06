package com.example.NEXY.service;

import com.example.NEXY.model.CarrinhoItem;
import com.example.NEXY.repository.CarrinhoItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarrinhoItemService {

    private final CarrinhoItemRepository carrinhoItemRepository;

    public CarrinhoItemService(CarrinhoItemRepository carrinhoItemRepository) {
        this.carrinhoItemRepository = carrinhoItemRepository;
    }

    public List<CarrinhoItem> findAll() {
        return carrinhoItemRepository.findAll();
    }

    public Optional<CarrinhoItem> findById(Long id) {
        return carrinhoItemRepository.findById(id);
    }

    public List<CarrinhoItem> findByCarrinhoId(Long carrinhoId) {
        return carrinhoItemRepository.findByCarrinhoId(carrinhoId);
    }

    public CarrinhoItem save(CarrinhoItem item) {
        return carrinhoItemRepository.save(item);
    }

    public CarrinhoItem update(Long id, CarrinhoItem itemAtualizado) {
        return carrinhoItemRepository.findById(id).map(item -> {
            item.setQuantidade(itemAtualizado.getQuantidade());
            item.setPrecoUnitario(itemAtualizado.getPrecoUnitario());
            item.setProduto(itemAtualizado.getProduto());
            item.setCarrinho(itemAtualizado.getCarrinho());
            return carrinhoItemRepository.save(item);
        }).orElseThrow(() -> new RuntimeException("Item do carrinho não encontrado com ID: " + id));
    }

    public void delete(Long id) {
        carrinhoItemRepository.deleteById(id);
    }

}
