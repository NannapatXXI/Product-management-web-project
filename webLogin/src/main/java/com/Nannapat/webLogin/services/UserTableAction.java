/*package com.Nannapat.webLogin.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.Nannapat.webLogin.Repository.ProductRepository;
import com.Nannapat.webLogin.entity.Product;

@Service
public class UserTableAction  implements ProductService{

     private ProductRepository userTableRepository;

     @Autowired
    public UserTableAction(ProductRepository userTableRepository){
        this.userTableRepository = userTableRepository;
    }

    
   
  
    public Product save(Product userTable) {
        return userTableRepository.save(userTable);
    }

   
    public List<Product> findAll() {
        return userTableRepository.findAll();
     }

    
    public Product findById(Integer id) {
        Optional<Product> result = userTableRepository.findById(id);
        Product data = null;
        if (result.isPresent()) {
            data = result.get();
        }else{
            throw new RuntimeException("ไม่พบรหัสผู้ใช้ "+id);
        }
        return data;
    }

   
    public void deleteUserById(Integer id) {
        userTableRepository.deleteById(id);
    }

   
    public Page<Product> getUsersTable(Pageable pageable) {
        return userTableRepository.findAll(pageable);
    }
    public Product editUser(Integer id,Product userTable){
        return  userTableRepository.save(userTable);
    }
    
    
} */