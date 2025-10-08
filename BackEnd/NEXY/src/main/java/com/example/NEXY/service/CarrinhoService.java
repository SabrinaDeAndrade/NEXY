package com.example.NEXY.service;

import com.example.NEXY.model.Carrinho;
import com.example.NEXY.repository.CarrinhoRepository;
import com.example.NEXY.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CarrinhoService {

    private final CarrinhoRepository carrinhoRepository;
    private final ProdutoRepository produtoRepository;

    @Autowired
    public CarrinhoService(CarrinhoRepository carrinhoRepository, ProdutoRepository produtoRepository) {
        this.carrinhoRepository = carrinhoRepository;
        this.produtoRepository = produtoRepository;
    }

    public Carrinho save(Carrinho carrinho) {
        return carrinhoRepository.save(carrinho);
    }

    public Optional<Carrinho> findByClienteId(Long clienteId) {
        return carrinhoRepository.findByClienteId(clienteId);
    }

    public Carrinho update(Long id, Carrinho carrinhoAtualizado) {
        return carrinhoRepository.findById(id).map(carrinho -> {
            carrinho.setItens(carrinhoAtualizado.getItens());
            carrinho.setCliente(carrinhoAtualizado.getCliente());
            carrinho.setValorTotal(carrinhoAtualizado.getValorTotal());
            return carrinhoRepository.save(carrinho);
        }).orElseThrow(() -> new RuntimeException("Carrinho não encontrado com ID: " + id));
    }

    public void remover(Long carrinhoId) {
        carrinhoRepository.deleteById(carrinhoId);
    }
}
