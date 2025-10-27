package com.example.NEXY.repository;

import com.example.NEXY.model.CadastroNexy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CadastroNexyRepository extends JpaRepository<CadastroNexy, Long> {
}
