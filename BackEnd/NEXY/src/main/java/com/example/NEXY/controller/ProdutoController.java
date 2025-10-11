package com.example.NEXY.controller;

import com.example.NEXY.model.Produto;
import com.example.NEXY.service.CategoriaService;
import com.example.NEXY.service.ProdutoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

        private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService, CategoriaService categoriaService) {
        this.produtoService = produtoService;
    }

    @PostMapping
        public Produto save(@RequestBody Produto produto) {
            return produtoService.save(produto);
        }

        @GetMapping
        public List<Produto> findAll() {
            return produtoService.findAll();
        }

        @GetMapping("/{id}")
        public Produto findById(@PathVariable Long id) {
            return produtoService.findById(id);
        }

        @PutMapping("/{id}")
        public Produto update(@PathVariable Long id, @RequestBody Produto produto) {
            return produtoService.update(id, produto);
        }

        @DeleteMapping("/{id}")
        public void delete(@PathVariable Long id) {
            produtoService.delete(id);
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

