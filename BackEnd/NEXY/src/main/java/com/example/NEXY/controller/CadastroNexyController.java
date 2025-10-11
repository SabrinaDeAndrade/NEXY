package com.example.NEXY.controller;

import com.example.NEXY.model.CadastroNexy;
import com.example.NEXY.service.CadastroNexyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cadastro-nexy")
public class CadastroNexyController {

    private final CadastroNexyService cadastroService;

    public CadastroNexyController(CadastroNexyService cadastroService) {
        this.cadastroService = cadastroService;
    }


    @GetMapping("/{id}")
    public ResponseEntity<CadastroNexy> findById(@PathVariable Long id) {
        return cadastroService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CadastroNexy save(@RequestBody CadastroNexy cadastro) {
        return cadastroService.save(cadastro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CadastroNexy> update(@PathVariable Long id, @RequestBody CadastroNexy cadastro) {
        return ResponseEntity.ok(cadastroService.update(id, cadastro));
    }

}
