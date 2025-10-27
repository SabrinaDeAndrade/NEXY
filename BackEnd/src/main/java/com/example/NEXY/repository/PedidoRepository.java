package com.example.NEXY.repository;

import com.example.NEXY.model.Cliente;
import com.example.NEXY.model.Endereco;
import com.example.NEXY.model.Pedido;
import jakarta.persistence.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findByClienteId(Long clienteId);
    List<Pedido> findAllByOrderByDataPedidoDesc();

}
