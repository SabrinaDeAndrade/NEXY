package com.example.NEXY.repository;

import com.example.NEXY.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
        List<Cliente> findByTipoUsuario(String tipoUsuario);

        Optional<Cliente> findByEmail(String email);

}
