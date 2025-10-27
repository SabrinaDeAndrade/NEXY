package com.example.NEXY.service;

import com.example.NEXY.model.Carrinho;
import com.example.NEXY.model.Cliente;
import com.example.NEXY.repository.CarrinhoRepository;
import com.example.NEXY.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;
    private final CarrinhoRepository carrinhoRepository;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository, CarrinhoRepository carrinhoRepository, @Lazy PasswordEncoder passwordEncoder) {
        this.clienteRepository = clienteRepository;
        this.carrinhoRepository = carrinhoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // REGISTRO de novo cliente
    public Cliente registrar(Cliente cliente) {
        if (clienteRepository.findByEmail(cliente.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado.");
        }

        String senhaEncriptada = passwordEncoder.encode(cliente.getSenha());
        cliente.setSenha(senhaEncriptada);

        return clienteRepository.save(cliente);
    }

    public Optional<Cliente> findByEmail(String email) {
        return clienteRepository.findByEmail(email);
    }


    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    public List<Cliente> findAllAdmins() {
        return clienteRepository.findByTipoUsuario("ADMIN");
    }

    public Optional<Cliente> findById(Long id) {
        return clienteRepository.findById(id);
    }

    public Cliente update(Long id, Cliente clienteAtualizado) {
        Cliente clienteExistente = findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com id: " + id));

        clienteExistente.setNome(clienteAtualizado.getNome());
        clienteExistente.setEmail(clienteAtualizado.getEmail());
        clienteExistente.setCpf(clienteAtualizado.getCpf());
        clienteExistente.setTelefone(clienteAtualizado.getTelefone());

        if (clienteAtualizado.getSenha() != null && !clienteAtualizado.getSenha().isEmpty()) {
            String senhaNovaEncriptada = passwordEncoder.encode(clienteAtualizado.getSenha());
            clienteExistente.setSenha(senhaNovaEncriptada);
        }

        return clienteRepository.save(clienteExistente);
    }


    public void delete(Long id) {

        Cliente clienteParaExcluir = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com id: " + id));

        if (!"ADMIN".equalsIgnoreCase(clienteParaExcluir.getTipoUsuario())) {
            throw new RuntimeException("Apenas administradores podem ser excluídos através desta função.");
        }

        Optional<Carrinho> carrinhoOptional = carrinhoRepository.findByClienteId(id);
        carrinhoOptional.ifPresent(carrinho -> carrinhoRepository.deleteById(carrinho.getId()));
        clienteRepository.deleteById(id);
    }
}