package com.example.NEXY.service;

import com.example.NEXY.model.Cliente;
import com.example.NEXY.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ClienteService(ClienteRepository clienteRepository, PasswordEncoder passwordEncoder) {
        this.clienteRepository = clienteRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // REGISTRO de novo cliente
    public Cliente registrar(Cliente cliente) {
        if (clienteRepository.findByEmail(cliente.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado.");
        }

        // Criptografa a senha antes de salvar
        cliente.setSenha(passwordEncoder.encode(cliente.getSenha()));
        return clienteRepository.save(cliente);
    }

    // LOGIN do cliente
    public Cliente login(String email, String senha) {
        Cliente cliente = clienteRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas."));

        // Compara senha digitada com senha criptografada
        if (passwordEncoder.matches(senha, cliente.getSenha())) {
            return cliente;
        } else {
            throw new RuntimeException("Credenciais inválidas.");
        }
    }

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> findById(Long id) {
        return clienteRepository.findById(id);
    }

    public Cliente update(Long id, Cliente clienteAtualizado) {
        return clienteRepository.findById(id).map(cliente -> {
            cliente.setNome(clienteAtualizado.getNome());
            cliente.setEmail(clienteAtualizado.getEmail());
            cliente.setCpf(clienteAtualizado.getCpf());
            cliente.setTelefone(clienteAtualizado.getTelefone());
            cliente.setTipoUsuario(clienteAtualizado.getTipoUsuario());
            return clienteRepository.save(cliente);
        }).orElseThrow(() -> new RuntimeException("Cliente não encontrado com ID: " + id));
    }

    public void delete(Long id) {
        clienteRepository.deleteById(id);
    }
}