package com.example.NEXY.controller;

import com.example.NEXY.model.Cliente;
import com.example.NEXY.repository.ClienteRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final ClienteRepository clienteRepository;

    public UserDetailsServiceImpl(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Busca o cliente no banco de dados pelo email
        Cliente cliente = clienteRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com o email: " + email));

        // Converte nosso objeto Cliente para o formato que o Spring Security entende.
        // O construtor é: User(username, password, authorities)
        return new User(cliente.getEmail(), cliente.getSenha(), new ArrayList<>());
    }
}