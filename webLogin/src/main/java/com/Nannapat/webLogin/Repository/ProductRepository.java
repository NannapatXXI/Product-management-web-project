package com.Nannapat.webLogin.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Nannapat.webLogin.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    Optional<Product> findByIDPRO(String IDPRO);
}
