package com.Nannapat.webLogin.services;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.Nannapat.webLogin.Repository.ProductRepository;
import com.Nannapat.webLogin.entity.Product;

import jakarta.transaction.Transactional;

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
    
    public Product updateProduct(Product product){
        Long id = product.getProductId();
        Optional<Product> update = productRepository.findById(id);
         if (update.isEmpty()) {
            throw new RuntimeException("ไม่พบรหัสสินค้า " + id);
         }

         Product updateproduct = update.get();
         updateproduct.setIDPRO(product.getIDPRO());
         updateproduct.setName(product.getName());
         updateproduct.setCost(product.getCost());
         updateproduct.setPrice(product.getPrice());
         updateproduct.setUnit(product.getUnit());
        
         updateproduct.setCategory(product.getCategory());
         updateproduct.setQuantity(product.getQuantity());
         
         return productRepository.save(updateproduct);
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

    @Transactional
    public Product quantityDecrease(Long productId, int quantity) {
       
        Product product = findById(productId);
        int newQuantity = product.getQuantity() - quantity;    
        product.setQuantity(newQuantity);
        return productRepository.save(product);
    }
    @Transactional
    public Product quantityIncrease(Long productId, int quantity) {
       
        Product product = findById(productId);
        int newQuantity = product.getQuantity() + quantity;    
        product.setQuantity(newQuantity);
        return productRepository.save(product);
    }
    
}