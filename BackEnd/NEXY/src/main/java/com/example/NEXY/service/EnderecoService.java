package com.example.NEXY.service;

import com.example.NEXY.model.Endereco;
import com.example.NEXY.repository.EnderecoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnderecoService {

    private final EnderecoRepository enderecoRepository;

    public EnderecoService(EnderecoRepository enderecoRepository) {
        this.enderecoRepository = enderecoRepository;
    }

    public List<Endereco> findAll() {
        return enderecoRepository.findAll();
    }

    public Optional<Endereco> findById(Long id) {
        return enderecoRepository.findById(id);
    }

    public List<Endereco> findByClienteId(Long clienteId) {
        return enderecoRepository.findByClienteId(clienteId);
    }

    public Endereco save(Endereco endereco) {
        return enderecoRepository.save(endereco);
    }

    public Endereco update(Long id, Endereco enderecoAtualizado) {
        return enderecoRepository.findById(id).map(endereco -> {
            endereco.setRua(enderecoAtualizado.getRua());
            endereco.setBairro(enderecoAtualizado.getBairro());
            endereco.setEstado(enderecoAtualizado.getEstado());
            endereco.setNumero(enderecoAtualizado.getNumero());
            endereco.setComplemento(enderecoAtualizado.getComplemento());
            endereco.setCliente(enderecoAtualizado.getCliente());
            return enderecoRepository.save(endereco);
        }).orElseThrow(() -> new RuntimeException("Endereço não encontrado com ID: " + id));
    }

    public void delete(Long id) {
        enderecoRepository.deleteById(id);
    }

}
