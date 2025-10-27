package com.example.NEXY.service;

import com.example.NEXY.model.Cliente;
import com.example.NEXY.model.ClienteCartao;
import com.example.NEXY.repository.ClienteCartaoRepository;
import com.example.NEXY.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteCartaoService {

    private final ClienteCartaoRepository clienteCartaoRepository;
    private final ClienteRepository clienteRepository;

    public ClienteCartaoService(ClienteCartaoRepository clienteCartaoRepository, ClienteRepository clienteRepository) {
        this.clienteCartaoRepository = clienteCartaoRepository;
        this.clienteRepository = clienteRepository;
    }

    public List<ClienteCartao> findAll() {
        return clienteCartaoRepository.findAll();
    }

    public Optional<ClienteCartao> findById(Long id) {
        return clienteCartaoRepository.findById(id);
    }

    public List<ClienteCartao> findByClienteId(Long clienteId) {
        return clienteCartaoRepository.findByClienteId(clienteId);
    }

    public ClienteCartao save(Long clienteId, ClienteCartao cartao) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com ID: " + clienteId));

        cartao.setCliente(cliente);
        return clienteCartaoRepository.save(cartao);
    }

    public ClienteCartao update(Long id, ClienteCartao cartaoAtualizado) {
        return clienteCartaoRepository.findById(id).map(cartao -> {
            cartao.setNomeCompleto(cartaoAtualizado.getNomeCompleto());
            cartao.setNumeroCartao(cartaoAtualizado.getNumeroCartao());
            cartao.setCvv(cartaoAtualizado.getCvv());
            cartao.setCpfTitular(cartaoAtualizado.getCpfTitular());
            cartao.setDataVenc(cartaoAtualizado.getDataVenc());
            cartao.setCliente(cartaoAtualizado.getCliente());
            return clienteCartaoRepository.save(cartao);
        }).orElseThrow(() -> new RuntimeException("Cartão não encontrado com ID: " + id));
    }

    public void delete(Long id) {
        clienteCartaoRepository.deleteById(id);
    }

}
