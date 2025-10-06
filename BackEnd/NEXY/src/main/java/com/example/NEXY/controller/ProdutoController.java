package com.example.NEXY.controller;

import com.example.NEXY.model.Produto;
import com.example.NEXY.service.ProdutoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

        private final ProdutoService produtoService;

        public ProdutoController(ProdutoService produtoService) {
            this.produtoService = produtoService;
        }

        @PostMapping
        public Produto criar(@RequestBody Produto produto) {
            return produtoService.salvar(produto);
        }

        @GetMapping
        public List<Produto> listarTodos() {
            return produtoService.listarTodos();
        }

        @GetMapping("/{id}")
        public Produto buscarPorId(@PathVariable Long id) {
            return produtoService.buscarPorId(id);
        }

        @PutMapping("/{id}")
        public Produto atualizar(@PathVariable Long id, @RequestBody Produto produto) {
            return produtoService.atualizar(id, produto);
        }

        @DeleteMapping("/{id}")
        public void deletar(@PathVariable Long id) {
            produtoService.deletar(id);
        }

    @PostMapping("/{id}/upload-imagem")
    public ResponseEntity<String> uploadImagem(@PathVariable Long id,
                                               @RequestParam("imagem") MultipartFile imagem) {
        try {
            String url = produtoService.salvarImagem(id, imagem);
            return ResponseEntity.ok("Imagem enviada com sucesso! URL: " + url);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao enviar imagem: " + e.getMessage());
        }
    }
}

