package com.Nannapat.webLogin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.Nannapat.webLogin.entity.User;
import com.Nannapat.webLogin.dto.quantityChange;
import com.Nannapat.webLogin.entity.Product;
import com.Nannapat.webLogin.services.UserService;
import com.Nannapat.webLogin.services.ProductService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    @Autowired
     private UserService userService;


     @GetMapping("/all")
     public List<User> getAllUsers() {
         return userService.findAll();
     }
     @PostMapping("/login")
     public ResponseEntity<Map<String,Object>>login(@RequestBody LoginRequest loginRequest,HttpSession session){
        Map<String,Object> response = new HashMap<>();
        try{
            User user = userService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());


            //เก็บข้อมูลผูํใช้ใน session
            session.setAttribute("userId", user.GetId());
            session.setAttribute("username", user.getUsername());
            response.put("success", true);
            response.put("message","เข้าสู่ระบบสำเร็จ" );
            response.put("user", Map.of(
                "id",user.GetId(),
                "username",user.getUsername(),
                "email",user.getEmail()
            ));
            return ResponseEntity.ok(response);
        }catch(Exception e){
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);

        }
     }



     @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterRequest registerRequest) {
        Map<String, Object> response = new HashMap<>();
        
        try {
             User user = userService.createdUser(
                registerRequest.getUsername(),
                registerRequest.getEmail(),
                registerRequest.getPassword()
            );
           
            response.put("success", true);
            response.put("message", "สมัครสมาชิกสำเร็จ");
            response.put("user", Map.of(
                "id", user.GetId(),
                "username", user.getUsername(),
                "email", user.getEmail()
            ));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    @GetMapping("/verify")
    public ResponseEntity<Map<String,Object>> verify(HttpSession session){
        Map<String,Object> response = new HashMap<>();
        Long userId =(Long) session.getAttribute("userId");
        String username = (String) session.getAttribute("username");

        if (userId != null && username != null) {
            response.put("success", true);
            response.put("user", Map.of(
            "id", userId,
            "username", username
            ));
            return ResponseEntity.ok(response);
        }else{
            response.put("success", false);
            response.put("message", "ไม่ได้เข้าสู่ระบบ");
            return ResponseEntity.status(401).body(response);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        
        session.invalidate();
        
        response.put("success", true);
        response.put("message", "ออกจากระบบสำเร็จ");
        
        return ResponseEntity.ok(response);
    }

     // DTO Classes
    public static class LoginRequest {
        private String username;
        private String password;
        
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
    
    public static class RegisterRequest {
        private String username;
        private String email;
        private String password;
        
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    @Autowired
    private ProductService productService;

    @PostMapping("/createProduct")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return ResponseEntity.ok(productService.createProduct(product));
    }

    @GetMapping("/getallProduct")
    public List<Product> listAll() {
        return productService.getAllProducts();
    }

    @GetMapping("/{IDPRO}")
    public ResponseEntity<Product> getProductBySku(@PathVariable String IDPRO) {
        return productService.getProductBySku(IDPRO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/deleteProductByID/{id}")
    public ResponseEntity<?> deleteProductByID(@PathVariable Long id) {

        try {
            productService.findById(id); // ถ้าไม่เจอจะ throw อยู่แล้ว
            productService.deleteProductById(id);
            return ResponseEntity.ok("ลบสินค้าเรียบร้อยแล้ว ID: " + id);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("ไม่พบสินค้า ID: " + id);
        }
    }

    @PutMapping("/editProduct/{id}")
    public ResponseEntity<?> editProduct(@PathVariable Long id,@RequestBody Product product){
        try {
            System.out.println("Request to update id: " + id);
            System.out.println("Body received: " + product); 
       
            product.setProductId(id);
            return ResponseEntity.ok(productService.updateProduct(product));
   
            } catch (RuntimeException e) {
                return ResponseEntity.status(404).body("ไม่พบสินค้า ID: " + id);
            } 
    }

    @PutMapping("/increaseQuantity/{id}/price-cost")
    public ResponseEntity<Product> increaseProducts(
        @PathVariable("id") Long productId,
        @RequestBody quantityChange request) {

     Product increaseProducts = productService.quantityIncrease(productId,request.getQuantityChange());

    return ResponseEntity.ok(increaseProducts);
    }

    @PutMapping("/decreaseQuantity/{id}/price-cost")
    public ResponseEntity<Product> decreaseProducts(
        @PathVariable("id") Long productId,
        @RequestBody quantityChange request) {

     Product increaseProducts = productService.quantityDecrease(productId,request.getQuantityChange());

    return ResponseEntity.ok(increaseProducts);
    }



   
    @GetMapping
    public Page<Product> getUsers(@PageableDefault(size = 5, page = 0) Pageable pageable) {
        Page<Product> pageResult = productService.getAllProduct(pageable);
         System.out.println("Page content size: " + pageResult.getContent().size());

         return pageResult;
    
    }

}






/* 
    //Api for Table
     @Autowired
    private ProductService userTableServices;

    public AuthController(ProductService userTableServices){
        this.userTableServices = userTableServices;
    }
    @GetMapping("/all/UserTabe")
    public List<Product> getAllUsersTable() {
        return userTableServices.findAll();
    }

    @GetMapping("/{id}")
    public Product getUser(@PathVariable int id){
        Product myUser = userTableServices.findById(id);
        if (myUser == null) {
            throw new RuntimeException("ไม่พบรหัสผู้ใช้ "+id);
        }
         return myUser;
    }
    @PostMapping("/createUser")
    public Product createUser(@RequestBody Product user) {
        return userTableServices.save(user);
    }

    @DeleteMapping("/{id}")
    public String delateUserByid(@PathVariable int id){
        if (userTableServices.findById(id) == null) {
            throw new RuntimeException("ไม่พบรหัสผู้ใช้ "+id);
        }
        userTableServices.deleteUserById(id);
         return  "ลบข้อมูลผู้ใช้ Id = "+ id;
    }
   
    @PutMapping("/editUser/{id}")
    public Product editUser(@PathVariable int id,@RequestBody Product user){
        if (userTableServices.findById(id) == null) {
            throw new RuntimeException("ไม่พบรหัสผู้ใช้ "+id);
        }
        return userTableServices.save(user);
    }
}
*/
