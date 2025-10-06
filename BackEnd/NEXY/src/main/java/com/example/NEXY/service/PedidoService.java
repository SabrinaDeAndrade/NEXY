package com.example.NEXY.service;

import com.example.NEXY.model.Pedido;
import com.example.NEXY.repository.PedidoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;

    public PedidoService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    public List<Pedido> findAll() {
        return pedidoRepository.findAll();
    }

    public Optional<Pedido> findById(Long id) {
        return pedidoRepository.findById(id);
    }

    public List<Pedido> findByClienteId(Long clienteId) {
        return pedidoRepository.findByClienteId(clienteId);
    }

    public Pedido save(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    public Pedido update(Long id, Pedido pedidoAtualizado) {
        return pedidoRepository.findById(id).map(pedido -> {
            pedido.setStatus(pedidoAtualizado.getStatus());
            pedido.setValorTotal(pedidoAtualizado.getValorTotal());
            pedido.setCliente(pedidoAtualizado.getCliente());
            pedido.setEndereco(pedidoAtualizado.getEndereco());
            pedido.setDataPedido(pedidoAtualizado.getDataPedido());
            return pedidoRepository.save(pedido);
        }).orElseThrow(() -> new RuntimeException("Pedido não encontrado com ID: " + id));
    }

    public void delete(Long id) {
        pedidoRepository.deleteById(id);
    }
}
