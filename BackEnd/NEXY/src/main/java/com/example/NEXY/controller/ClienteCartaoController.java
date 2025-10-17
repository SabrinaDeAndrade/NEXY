package com.example.NEXY.controller;

import com.example.NEXY.model.ClienteCartao;
import com.example.NEXY.model.Endereco;
import com.example.NEXY.service.ClienteCartaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes-cartao")
public class ClienteCartaoController {

    private final ClienteCartaoService clienteCartaoService;
    @Autowired
    public ClienteCartaoController(ClienteCartaoService clienteCartaoService) {
        this.clienteCartaoService = clienteCartaoService;
    }

    @PostMapping("/cliente/{clienteId}")
    public ResponseEntity<ClienteCartao> CriarCartao(@PathVariable Long clienteId, @RequestBody ClienteCartao cartao) {
        ClienteCartao clienteCartao = clienteCartaoService.save(clienteId, cartao);
        return ResponseEntity.status(HttpStatus.CREATED).body(clienteCartao);
    }

    @GetMapping
    public List<ClienteCartao> findAll() {
        return clienteCartaoService.findAll();
    }

    @GetMapping("/{id}")
    public ClienteCartao findById(@PathVariable Long id) {
        return clienteCartaoService.findById(id).orElse(null);
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<ClienteCartao>> getCartoesPorCliente(@PathVariable Long clienteId) {
        List<ClienteCartao> cartoes = clienteCartaoService.findByClienteId(clienteId);
        return ResponseEntity.ok(cartoes);
    }


    @PutMapping("/{id}")
    public ClienteCartao update(@PathVariable Long id, @RequestBody ClienteCartao cartao) {
        return clienteCartaoService.update(id, cartao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        clienteCartaoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
