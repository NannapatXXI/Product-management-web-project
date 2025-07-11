package com.Nannapat.webLogin.Repository;


import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Nannapat.webLogin.entity.User;

@Repository
public interface UserRepository extends JpaRepository <User,Integer> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsernameOrEmail(String username,String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    
   
} 