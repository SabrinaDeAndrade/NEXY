package com.example.NEXY.controller;

import com.example.NEXY.model.Cliente;
import com.example.NEXY.service.ClienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

record LoginDTO(String email, String senha) {}
record LoginResponseDTO(Long clienteId, String nomeCliente, String mensagem, String token) {}


@RestController
@RequestMapping("/auth")
public class AuthController {
    private final ClienteService clienteService;
    private final AuthenticationManager authenticationManager; // Injeta o gerenciador de autenticação

    public AuthController(ClienteService clienteService, AuthenticationManager authenticationManager) {
        this.clienteService = clienteService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody Cliente cliente) {
        try {
            Cliente novoCliente = clienteService.registrar(cliente);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoCliente);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(loginDTO.email(), loginDTO.senha());
            Authentication auth = this.authenticationManager.authenticate(usernamePassword);

            // Busca o cliente completo para obter o ID e o nome
            Cliente cliente = (Cliente) clienteService.findByEmail(auth.getName())
                    .orElseThrow(() -> new RuntimeException("Cliente não encontrado após autenticação"));

            // Futuramente, você vai gerar o token aqui
            String tokenJwt = "TOKEN_JWT_AQUI";

            var response = new LoginResponseDTO(cliente.getId(), cliente.getNome(), "Login bem-sucedido!", tokenJwt);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            // Retorna um objeto JSON também no erro
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("erro", "Credenciais inválidas."));
        }
    }
}
