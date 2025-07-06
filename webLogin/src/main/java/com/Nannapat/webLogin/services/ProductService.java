package com.Nannapat.webLogin.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.Nannapat.webLogin.Repository.ProductRepository;
import com.Nannapat.webLogin.entity.Product;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
     
    public Product createProduct(Product product){
        return productRepository.save(product);
    }
   
    public List<Product> getAllProducts() {
        return productRepository.findAll(); // แก้ไขจาก categoryRepository
    }
    
    public Optional<Product> getProductBySku(String IDPRO) {
        return productRepository.findByIDPRO(IDPRO); // แก้ไขจาก categoryRepository
    }
    public Product  findById(Long id){
        Optional<Product> result = productRepository.findById(id);
        Product data = null;
        if (result.isPresent()) {
            data = result.get();
        }else{
            throw new RuntimeException("ไม่พบรหัสผู้ใช้ "+id);
        }
        return data;
    }
    
    public void deleteProductById(Long id) {
        productRepository.deleteById(id);
    }
    public Page<Product> getAllProduct(Pageable pageable) {
        return productRepository.findAll(pageable); // แก้ไขจาก categoryRepository
    }
}