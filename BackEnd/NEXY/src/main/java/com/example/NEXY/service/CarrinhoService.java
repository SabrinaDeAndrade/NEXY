package com.example.NEXY.service;

import com.example.NEXY.model.Carrinho;
import com.example.NEXY.model.Cliente;
import com.example.NEXY.repository.CarrinhoItemRepository;
import com.example.NEXY.repository.CarrinhoRepository;
import com.example.NEXY.repository.ClienteRepository;
import com.example.NEXY.repository.ProdutoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CarrinhoService {

    private final CarrinhoRepository carrinhoRepository;
    private final ClienteRepository clienteRepository;
    private final CarrinhoItemRepository carrinhoItemRepository;

    @Autowired
    public CarrinhoService(
            CarrinhoRepository carrinhoRepository,
            ClienteRepository clienteRepository,
            CarrinhoItemRepository carrinhoItemRepository) { // Adicione ao construtor
        this.carrinhoRepository = carrinhoRepository;
        this.clienteRepository = clienteRepository;
        this.carrinhoItemRepository = carrinhoItemRepository;
    }

    public Optional<Carrinho> buscarPorCliente(Long clienteId) {
        return carrinhoRepository.findByClienteId(clienteId);
    }

    public Carrinho criarParaCliente(Long clienteId) {
        // Verifica se o carrinho já não existe
        if (carrinhoRepository.findByClienteId(clienteId).isPresent()) {
            throw new RuntimeException("Cliente já possui um carrinho.");
        }

        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado."));

        Carrinho novoCarrinho = new Carrinho();
        novoCarrinho.setCliente(cliente);

        return carrinhoRepository.save(novoCarrinho);
    }


    public Optional<Carrinho> findByClienteId(Long clienteId) {
        return carrinhoRepository.findByClienteId(clienteId);
    }

    public Carrinho save(Carrinho carrinho) {
        return carrinhoRepository.save(carrinho);
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

    @Transactional
    public void limparCarrinho(Long carrinhoId) {
        // 1. Busca o carrinho para garantir que ele existe
        Carrinho carrinho = carrinhoRepository.findById(carrinhoId)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado para limpar."));

        // 2. Deleta todos os itens associados a este carrinho de uma só vez
        carrinhoItemRepository.deleteAllByCarrinhoId(carrinhoId);

        // 3. Zera o valor total do carrinho
        carrinho.setValorTotal(0.0);
        carrinhoRepository.save(carrinho);

        System.out.println("Carrinho ID " + carrinhoId + " foi limpo com sucesso.");
    }
}

