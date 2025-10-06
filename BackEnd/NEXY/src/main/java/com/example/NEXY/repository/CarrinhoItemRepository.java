package com.example.NEXY.repository;

import com.example.NEXY.model.CarrinhoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarrinhoItemRepository extends JpaRepository <CarrinhoItem, Long> {

    List<CarrinhoItem> findByCarrinhoId(Long carrinhoId);

}
