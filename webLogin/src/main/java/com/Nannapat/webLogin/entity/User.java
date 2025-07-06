package com.Nannapat.webLogin.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "UserData")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name  = "id")
    private int id;

    @Column(name = "username",unique = true, nullable = false)
    private String username;

    @Column(name = "Email",unique = true, nullable = false)
    private String email;

    @Column(name = "Password",unique = true, nullable = false)
    private String password;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "last_login")
    private LocalDateTime lastLogin;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    public User(){}

    public User(String username,String email ,String password ){
        this.username = username;
        this.email = email;
        this.password = password;
        this.createdAt = LocalDateTime.now();
    }
    public String getUsername(){
        return username;
    }
    public String getEmail(){
        return email;
    }
    public String getPassword(){
        return password;
    }
    public int GetId(){
        return id;
    }  
    public LocalDateTime getCreatedAt(){
        return  createdAt;
    }
    public LocalDateTime getLastLogin(){
        return  lastLogin;
    }
    public Boolean getisActive(){
        return  isActive;
    }

    public void setUsername(String username){
        this.username = username;
    }
    public void setEmail(String email){
        this.email = email;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public void setId(int id){
        this.id = id;
    }
    public void setCreatedAt(LocalDateTime createdAt){
        this.createdAt = createdAt;
    } 
    public void setLastLogin(LocalDateTime lastlogin){
        this.lastLogin = lastlogin;
    }
    public void setIsActive(Boolean isActive){
        this.isActive = isActive;
    }
}
