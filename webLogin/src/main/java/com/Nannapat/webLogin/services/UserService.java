package com.Nannapat.webLogin.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.Nannapat.webLogin.Repository.*;
import com.Nannapat.webLogin.entity.User;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User save(User user) {
        return userRepository.save(user);
    }   
    public User findById(Integer id) {
        Optional<User> result = userRepository.findById(id);
        User data = null;
        if (result.isPresent()) {
            data = result.get();
        }else{
            throw new RuntimeException("ไม่พบรหัสผู้ใช้ "+id);
        }
        return data;
    }
    public void deleteUserById(Integer id) {
        userRepository.deleteById(id);
    }
    public Page<User> getUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }
    

    public List<User> findAll() {
        return userRepository.findAll();
     }

    public User createdUser(String username,String email,String password){
        if (userRepository.existsByUsername(username)) {
            throw new RuntimeException("ชื่อผู้ใช้นี้มีอยู่แล้ว");
        }
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("เมลผู้ใช้นี้มีอยู่แล้ว");
        }
        //encode ไว้แปลงรหัสที่เข้ามา
        String encodedPassword = passwordEncoder.encode(password);
        
        User user = new User(username,email,encodedPassword);
        return userRepository.save(user);
    }

    public User authenticateUser(String usernameOrEmail,String password){
        Optional<User> userOptional = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("ไม่พบผู้ใช้");
        }
        User user = userOptional.get();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("รหัสผ่านไม่ถูกต้อง");
        }
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        return user;
    }
    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username);
    }
    public Optional<User> findById(int id){
        return userRepository.findById(id);
    }
}
