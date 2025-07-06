package com.Nannapat.webLogin.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "product")
public class Product {
    
    @Id
    @Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;
    
    
    @Column(name = "idpro", nullable = false, unique = true)
    @JsonProperty("IDproduct")  // หรือชื่อที่ JSON ใช้
    private String IDPRO;
    
    @Column(name = "name")
    private String name;

    @Column(name = "category")
    private String category;

    @Column(name = "price")
    private BigDecimal price;
    
    @Column(name = "cost")
    private BigDecimal cost;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "unit", length = 50)
    private ProductUnit unit;
    
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Default constructor
    public Product() {}
    
    // Constructor with parameters
   
    
    // Getters - แก้ไขชื่อให้ถูกต้อง
    public Long getProductId() {
        return productId;
    }
    
    public String getIDPRO() {
        return IDPRO;
    }
    
    public String getName() {
        return name;
    }
    
    public String getCategory() {
        return category;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public BigDecimal getCost() {
        return cost;
    }
    
    public ProductUnit getUnit() {
        return unit;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    // Setters - แก้ไขชื่อให้ถูกต้อง
    public void setProductId(Long productId) {
        this.productId = productId;
    }
    
    public void setIDPRO(String IDPRO) {
        this.IDPRO = IDPRO;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    
    
   
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }
    
    public void setUnit(ProductUnit unit) {
        this.unit = unit;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    @Override
    public String toString() {
        return "Product{" +
                "productId=" + productId +
                ", IDPRO='" + IDPRO + '\'' +
                ", name='" + name + '\'' +
                ", category ='" + category + '\'' +
                ", price=" + price +
                ", cost=" + cost +
                ", unit=" + unit +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}