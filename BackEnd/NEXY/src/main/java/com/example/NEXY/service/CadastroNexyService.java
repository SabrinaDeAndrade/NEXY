package com.example.NEXY.service;

import com.example.NEXY.model.CadastroNexy;
import com.example.NEXY.repository.CadastroNexyRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CadastroNexyService {
    private final CadastroNexyRepository cadastroNexyRepository;

    public CadastroNexyService(CadastroNexyRepository cadastroNexyRepository) {
        this.cadastroNexyRepository = cadastroNexyRepository;
    }

    public Optional<CadastroNexy> findById(Long id) {
        return cadastroNexyRepository.findById(id);
    }
    public CadastroNexy save(CadastroNexy cadastro) {
        return cadastroNexyRepository.save(cadastro);
    }

    public CadastroNexy update(Long id, CadastroNexy novoCadastro) {
        return cadastroNexyRepository.findById(id)
                .map(c -> {
                    c.setNome(novoCadastro.getNome());
                    c.setCnpj(novoCadastro.getCnpj());
                    c.setEmail(novoCadastro.getEmail());
                    c.setTelefone(novoCadastro.getTelefone());
                    c.setEndereco(novoCadastro.getEndereco());
                    return cadastroNexyRepository.save(c);
                })
                .orElseThrow(() -> new RuntimeException(""));
    }

}
