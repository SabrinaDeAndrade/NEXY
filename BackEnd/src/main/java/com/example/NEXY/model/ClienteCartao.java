package com.example.NEXY.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
public class ClienteCartao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCompleto;
    private String numeroCartao;
    private String cvv;
    private String cpfTitular;
    private String mesVenc;
    private String anoVenc;

    @JsonBackReference("cliente-cartoes")
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    public ClienteCartao() {

    }

    public ClienteCartao(Long id, String nomeCompleto, String numeroCartao, String cvv, String cpfTitular, String mesVenc, String anoVenc, Cliente cliente) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.numeroCartao = numeroCartao;
        this.cvv = cvv;
        this.cpfTitular = cpfTitular;
        this.mesVenc = mesVenc;
        this.anoVenc = anoVenc;
        this.cliente = cliente;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getNumeroCartao() {
        return numeroCartao;
    }

    public void setNumeroCartao(String numeroCartao) {
        this.numeroCartao = numeroCartao;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public String getCpfTitular() {
        return cpfTitular;
    }

    public void setCpfTitular(String cpfTitular) {
        this.cpfTitular = cpfTitular;
    }

    public String getMesVenc() {
        return mesVenc;
    }

    public void setMesVenc(String mesVenc) {
        this.mesVenc = mesVenc;
    }

    public String getAnoVenc() {
        return anoVenc;
    }

    public void setAnoVenc(String anoVenc) {
        this.anoVenc = anoVenc;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}

