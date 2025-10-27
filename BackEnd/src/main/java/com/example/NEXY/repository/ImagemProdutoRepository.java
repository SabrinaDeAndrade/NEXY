package com.example.NEXY.repository;

import com.example.NEXY.model.ImagemProduto;
import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImagemProdutoRepository extends JpaRepository<ImagemProduto, Long> {
}
