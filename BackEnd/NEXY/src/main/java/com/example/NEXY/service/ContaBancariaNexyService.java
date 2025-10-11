package com.example.NEXY.service;

import com.example.NEXY.model.ContaBancariaNexy;
import com.example.NEXY.repository.ContaBancariaNexyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContaBancariaNexyService {
    private final ContaBancariaNexyRepository contaRepository;

    public ContaBancariaNexyService(ContaBancariaNexyRepository contaRepository) {
        this.contaRepository = contaRepository;
    }

    public List<ContaBancariaNexy> findAll() {
        return contaRepository.findAll();
    }

    public Optional<ContaBancariaNexy> findById(Long id) {
        return contaRepository.findById(id);
    }

    public ContaBancariaNexy save(ContaBancariaNexy conta) {
        return contaRepository.save(conta);
    }

    public ContaBancariaNexy update(Long id, ContaBancariaNexy novaConta) {
        return contaRepository.findById(id)
                .map(c -> {
                    c.setBanco(novaConta.getBanco());
                    c.setAgencia(novaConta.getAgencia());
                    c.setNumeroConta(novaConta.getNumeroConta());
                    c.setTipoConta(novaConta.getTipoConta());
                    return contaRepository.save(c);
                })
                .orElseThrow(() -> new RuntimeException("Conta não encontrada com ID: " + id));
    }

    public void delete(Long id) {
        contaRepository.deleteById(id);
    }
}
