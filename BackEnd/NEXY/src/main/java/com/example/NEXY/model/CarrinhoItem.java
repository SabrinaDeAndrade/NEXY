package com.example.NEXY.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
public class CarrinhoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantidade;

    private double precoUnitario;

    @ManyToOne
    private Produto produto;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "carrinho_id")
    private Carrinho carrinho;

    @PreRemove
    public void removerDoCarrinho() {
        if (this.carrinho != null) {
            this.carrinho.getItens().remove(this);
            this.carrinho = null;
        }
    }

    public CarrinhoItem() {
    }

    public CarrinhoItem(Long id, int quantidade, double precoUnitario, Produto produto, Carrinho carrinho) {
        this.id = id;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
        this.produto = produto;
        this.carrinho = carrinho;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public double getPrecoUnitario() {
        return precoUnitario;
    }

    public void setPrecoUnitario(double precoUnitario) {
        this.precoUnitario = precoUnitario;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Carrinho getCarrinho() {
        return carrinho;
    }

    public void setCarrinho(Carrinho carrinho) {
        this.carrinho = carrinho;
    }
}
