package com.example.NEXY.controller;

import com.example.NEXY.model.Cliente;
import com.example.NEXY.service.ClienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

record LoginDTO(String email, String senha) {}

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final ClienteService clienteService;
    private final AuthenticationManager authenticationManager; // Injeta o gerenciador de autenticação

    public AuthController(ClienteService clienteService, AuthenticationManager authenticationManager) {
        this.clienteService = clienteService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register") // Mudado de 'registrar' para o padrão 'register'
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
            // Cria o objeto de autenticação que o Spring Security espera
            var usernamePassword = new UsernamePasswordAuthenticationToken(loginDTO.email(), loginDTO.senha());

            // O AuthenticationManager processa a tentativa de login.
            // Ele usará o PasswordEncoder e buscará o usuário no banco (via UserDetailsService, que implementaremos a seguir se necessário)
            Authentication auth = this.authenticationManager.authenticate(usernamePassword);

            // Se a autenticação for bem-sucedida, o código continua.
            // Futuramente, aqui você gerará um token JWT.
            return ResponseEntity.ok("Login bem-sucedido! O usuário " + auth.getName() + " está autenticado.");

        } catch (Exception e) {
            // Se as credenciais estiverem erradas, ele lança uma exceção
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas.");
        }
    }
}