package com.example.NEXY.service;

import com.example.NEXY.model.PedidoItem;
import com.example.NEXY.repository.PedidoItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoItemService {
    private final PedidoItemRepository pedidoItemRepository;

    public PedidoItemService(PedidoItemRepository pedidoItemRepository) {
        this.pedidoItemRepository = pedidoItemRepository;
    }

    public List<PedidoItem> findAll() {
        return pedidoItemRepository.findAll();
    }

    public Optional<PedidoItem> findById(Long id) {
        return pedidoItemRepository.findById(id);
    }

    public List<PedidoItem> findByPedidoId(Long pedidoId) {
        return pedidoItemRepository.findByPedidoId(pedidoId);
    }

    public PedidoItem save(PedidoItem item) {
        return pedidoItemRepository.save(item);
    }

    public PedidoItem update(Long id, PedidoItem itemAtualizado) {
        return pedidoItemRepository.findById(id).map(item -> {
            item.setQuantidade(itemAtualizado.getQuantidade());
            item.setPrecoUnitario(itemAtualizado.getPrecoUnitario());
            item.setPedido(itemAtualizado.getPedido());
            item.setProduto(itemAtualizado.getProduto());
            return pedidoItemRepository.save(item);
        }).orElseThrow(() -> new RuntimeException("Item do pedido não encontrado com ID: " + id));
    }

    public void delete(Long id) {
        pedidoItemRepository.deleteById(id);
    }

}
