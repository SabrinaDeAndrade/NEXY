package com.example.NEXY.controller;

import com.example.NEXY.model.Produto;
import com.example.NEXY.service.ProdutoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }


    @PostMapping
    public ResponseEntity<Produto> save(@RequestBody Produto produto) {
        Produto salvo = produtoService.save(produto);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }


    @GetMapping
    public ResponseEntity<List<Produto>> findAll(
            @RequestParam(value = "categoriaId", required = false) Long categoriaId) {
        List<Produto> produtos;
        if (categoriaId != null) {
            produtos = produtoService.getProductsByCategoryId(categoriaId);
        } else {
            produtos = produtoService.findAll();
        }
        return ResponseEntity.ok(produtos);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Produto> findById(@PathVariable Long id) {
        Produto produto = produtoService.findById(id);
        return ResponseEntity.ok(produto);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Produto> update(@PathVariable Long id, @RequestBody Produto produto) {
        Produto atualizado = produtoService.save(produto);
        return ResponseEntity.ok(atualizado);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        produtoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/upload-imagens")
    public ResponseEntity<List<String>> uploadImagens(@PathVariable Long id,
                                                      @RequestParam("imagens") MultipartFile[] imagens) {
        try {
            // 2. CONVERTA O ARRAY 'imagens' EM UMA LISTA ANTES DE CHAMAR O SERVIÇO
            List<String> urls = produtoService.salvarImagens(id, Arrays.asList(imagens));
            return ResponseEntity.ok(urls);
        } catch (Exception e) {
            // Adiciona um log do erro para facilitar a depuração
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @DeleteMapping("/imagens/{id}")
    public ResponseEntity<Void> deleteImagem(@PathVariable Long id) {
        try {
            produtoService.deleteImagem(id);
            return ResponseEntity.noContent().build(); // HTTP 204 (Sucesso, sem conteúdo)
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
