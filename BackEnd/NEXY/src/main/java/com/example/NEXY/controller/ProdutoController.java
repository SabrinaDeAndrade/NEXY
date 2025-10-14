package com.example.NEXY.controller;

import com.example.NEXY.model.Produto;
import com.example.NEXY.service.ProdutoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/{id}/upload-imagem")
    public ResponseEntity<?> uploadImagem(@PathVariable Long id,
                                          @RequestParam("imagem") MultipartFile imagem) {
        try {
            String url = produtoService.salvarImagem(id, imagem);

            // Retorna um JSON com a URL da imagem
            return ResponseEntity.ok().body(Map.of(
                    "mensagem", "Imagem enviada com sucesso!",
                    "url", url
            ));

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "erro", e.getMessage()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "erro", "Erro ao enviar imagem: " + e.getMessage()
            ));
        }
    }

}
