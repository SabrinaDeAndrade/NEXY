package com.example.NEXY.controller;

import com.example.NEXY.model.Cliente;
import com.example.NEXY.service.TokenService;
import com.example.NEXY.service.ClienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

record LoginDTO(String email, String senha) {}
record LoginResponseDTO(Long clienteId, String nomeCliente, String tipoUsuario, String mensagem, String token) {}


@RestController
@RequestMapping("/auth")
public class AuthController {
    private final ClienteService clienteService;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public AuthController(ClienteService clienteService, AuthenticationManager authenticationManager, TokenService tokenService) {
        this.clienteService = clienteService;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registrar(@RequestBody Cliente cliente) {
        try {
            cliente.setTipoUsuario("CLIENTE");
            Cliente novoCliente = clienteService.registrar(cliente);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoCliente);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/admin/register")
    public ResponseEntity<?> registrarAdmin(@RequestBody Cliente cliente) {
        try {
            cliente.setTipoUsuario("ADMIN");
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


            Cliente cliente = (Cliente) clienteService.findByEmail(auth.getName())
                    .orElseThrow(() -> new RuntimeException("Cliente não encontrado após autenticação"));

            String tipoUsuario = cliente.getTipoUsuario();
            if (tipoUsuario == null) {
                tipoUsuario = "CLIENTE"; // padrão de segurança
            }

            String tokenJwt = tokenService.generateToken(cliente);

            var response = new LoginResponseDTO
                    (cliente.getId(), cliente.getNome(), tipoUsuario, "Login bem-sucedido!", tokenJwt);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            // Retorna um objeto JSON também no erro
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("erro", "Credenciais inválidas."));
        }
    }

    @GetMapping("/admins")
    public ResponseEntity<?> listarAdmins(Authentication authentication) {
        try {
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado.");
            }
            String emailLogado = authentication.getName();
            Cliente usuarioLogado = clienteService.findByEmail(emailLogado)
                    .orElseThrow(() -> new RuntimeException("Usuário logado não encontrado."));
            if (!"ADMIN".equals(usuarioLogado.getTipoUsuario())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Apenas administradores podem listar admins.");
            }
            List<Cliente> admins = clienteService.findAllAdmins(); // Implemente no ClienteService
            return ResponseEntity.ok(admins);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/admins/{id}")
    public ResponseEntity<?> atualizarAdmin(@PathVariable Long id, @RequestBody Cliente clienteAtualizado, Authentication authentication) {
        try {
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado.");
            }
            String emailLogado = authentication.getName();
            Cliente usuarioLogado = clienteService.findByEmail(emailLogado)
                    .orElseThrow(() -> new RuntimeException("Usuário logado não encontrado."));
            if (!"ADMIN".equals(usuarioLogado.getTipoUsuario())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Apenas administradores podem atualizar admins.");
            }
            Cliente adminAtualizado = clienteService.update(id, clienteAtualizado);
            return ResponseEntity.ok(adminAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/admins/{id}")
    public ResponseEntity<Void> excluirAdmin(@PathVariable Long id) {
        try {
            clienteService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
