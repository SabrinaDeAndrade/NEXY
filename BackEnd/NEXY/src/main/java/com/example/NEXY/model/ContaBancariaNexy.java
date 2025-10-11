package com.example.NEXY.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
@Entity
public class ContaBancariaNexy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String banco;
    private String agencia;
    private String numeroConta;
    private String tipoConta;

    @ManyToOne
    @JoinColumn(name = "loja_id")
    @JsonIgnore
    private CadastroNexy cadastroNexy;

    public ContaBancariaNexy() {
    }

    public ContaBancariaNexy(Long id, String banco, String agencia, String numeroConta, String tipoConta, CadastroNexy cadastroNexy) {
        this.id = id;
        this.banco = banco;
        this.agencia = agencia;
        this.numeroConta = numeroConta;
        this.tipoConta = tipoConta;
        this.cadastroNexy = cadastroNexy;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBanco() {
        return banco;
    }

    public void setBanco(String banco) {
        this.banco = banco;
    }

    public String getAgencia() {
        return agencia;
    }

    public void setAgencia(String agencia) {
        this.agencia = agencia;
    }

    public String getNumeroConta() {
        return numeroConta;
    }

    public void setNumeroConta(String numeroConta) {
        this.numeroConta = numeroConta;
    }

    public String getTipoConta() {
        return tipoConta;
    }

    public void setTipoConta(String tipoConta) {
        this.tipoConta = tipoConta;
    }

    public CadastroNexy getCadastroNexy() {
        return cadastroNexy;
    }

    public void setCadastroNexy(CadastroNexy cadastroNexy) {
        this.cadastroNexy = cadastroNexy;
    }
}
