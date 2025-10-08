package com.example.NEXY.repository;

import com.example.NEXY.model.ContaBancariaNexy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ContaBancariaNexyRepository extends JpaRepository<ContaBancariaNexy, Long> {
    List<ContaBancariaNexy> findByCadastroNexyId(Long cadastroNexyId);
}
