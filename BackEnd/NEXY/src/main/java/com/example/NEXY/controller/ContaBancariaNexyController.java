package com.example.NEXY.controller;

import com.example.NEXY.model.ContaBancariaNexy;
import com.example.NEXY.service.ContaBancariaNexyService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contas-bancarias")
public class ContaBancariaNexyController {

    private final ContaBancariaNexyService contaService;

    public ContaBancariaNexyController(ContaBancariaNexyService contaService) {
        this.contaService = contaService;
    }

    @GetMapping
    public List<ContaBancariaNexy> findAll() {
        return contaService.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<ContaBancariaNexy> findById(@PathVariable Long id) {
        return contaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ContaBancariaNexy save(@RequestBody ContaBancariaNexy conta) {
        return contaService.save(conta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContaBancariaNexy> update(@PathVariable Long id, @RequestBody ContaBancariaNexy conta) {
        return ResponseEntity.ok(contaService.update(id, conta));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        contaService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
