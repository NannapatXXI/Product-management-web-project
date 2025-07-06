 // ตัวแปรสำหรับจัดการสถานะ
 let isLoading = false;


 function Open(){
    setTimeout(() => {
        console.log("Backup redirect...");
        window.location.replace('login.html');
    }, 1000);
 }
 function LoginPage(e) {
    e.preventDefault();
    console.log("in function LoginPage");
    
    if (isLoading) return;
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    // ตรวจสอบข้อมูล
    if (!username || !password) {
        showError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
        return;
    }
    
    // แสดงสถานะ loading
    isLoading = true;
    document.querySelector('.login-container').classList.add('loading');
    
    // ส่งข้อมูลไปยัง Spring Boot
    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json()) // แปลงเป็น JSON ก่อน
    .then(data => {
        if (data.success || data.token) { // ตรวจสอบความสำเร็จ
            // เข้าสู่ระบบสำเร็จ
            showSuccess('เข้าสู่ระบบสำเร็จ กำลังพาไปหน้าหลัก...');
            
            // เก็บ token (ถ้ามี)
            if (data.token) {
                localStorage.setItem('authToken', data.token);
                console.log("Token saved:", data.token);
            }
            
            // พาไปหน้าหลักหลังจาก 1.5 วินาที
            setTimeout(() => {
                window.location.replace('maincontent.html'); // ถ้าอยู่ในโฟลเดอร์เดียว
            }, 1000);
            
        } else {
            // เข้าสู่ระบบไม่สำเร็จ
            showError(data.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        showError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง');
    })
    .finally(() => {
        // ปิดสถานะ loading
        isLoading = false;
        document.querySelector('.login-container').classList.remove('loading');
    });
}





function Register(e){ 
    e.preventDefault();   
   if (isLoading) return;

  
   const username = document.getElementById('username').value.trim();
   const password = document.getElementById('password').value;
   const email = document.getElementById('email').value;

   console.log(username);
   console.log(password);
   console.log(email);
   
   if (!username || !password || !email) {
       showError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
       return;
   }
   // ตรวจสอบรูปแบบ email
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
       showError('กรุณากรอกอีเมลให้ถูกต้อง');
       return;
   }
   isLoading = true;
    document.querySelector('.login-container').classList.add('loading');

    fetch('/api/auth/register',{
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify({username,password,email})
    }) .then(response => {
        console.log("Response status:", response.status);
        return response.json();
    })
    .then(data => {
        console.log("Response data:", data);
        console.log("data.success:", data.success);
        console.log("typeof data.success:", typeof data.success);
        
        // ตรวจสอบหลายแบบ เพราะ response อาจเป็น string หรือ boolean
        if (data.success === true || data.success === 'true' || data.message === 'สมัครสมาชิกสำเร็จ') {
            console.log("Register success detected!");
            showSuccess('สมัครสมาชิกสำเร็จ กำลังพาไปหน้าเข้าสู่ระบบ...');
            
            // เก็บ token (ถ้ามี)
            if (data.token) {
                localStorage.setItem('authToken', data.token);
                console.log("Token saved");
            }
            
            // ลอง redirect ทันที และมี setTimeout backup
            console.log("Redirecting immediately...");
           
            
            // Backup redirect หลังจาก 1 วินาที
            setTimeout(() => {
                console.log("Backup redirect...");
                window.location.replace('login.html');
            }, 1000);
            
        } else {
            console.log("Register failed or unknown response");
            showError(data.message || 'การสมัครสมาชิกไม่สำเร็จ');
        }
    })
    .catch(error => {
        console.error('Register error:', error);
        showError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง');
    })
    .finally(() => {
        isLoading = false;
        const loginContainer = document.querySelector('.login-container');
        if (loginContainer) {
            loginContainer.classList.remove('loading');
        }
    });
}


 // ฟังก์ชันแสดงข้อความ error
 function showError(message) {
     const errorDiv = document.getElementById('errorMessage');
     const successDiv = document.getElementById('successMessage');
     
     successDiv.style.display = 'none';
     errorDiv.textContent = message;
     errorDiv.style.display = 'block';
     
     setTimeout(() => {
         errorDiv.style.display = 'none';
     }, 5000);
 }

 // ฟังก์ชันแสดงข้อความ success
 function showSuccess(message) {
    console.log("showSuccess called:", message);
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    
    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
    }
    
    setTimeout(() => {
        if (successDiv) successDiv.style.display = 'none';
    }, 3000);
}

 // ฟังก์ชันจัดการการส่งฟอร์ม




 // ฟังก์ชันสำหรับลืมรหัสผ่าน
 function showForgotPassword() {
     alert('ฟีเจอร์ลืมรหัสผ่านยังไม่เปิดใช้งาน');
 }

 // ฟังก์ชันสำหรับสมัครสมาชิก
 function showRegister() {
     window.location.href = '/register.html';
     console.log("in funtion Register");
     
 }

 function BackLoginPage() {
    window.location.href = '/login.html';
    console.log("in funtion Backlogin");
    
}

 // ตรวจสอบว่าผู้ใช้เข้าสู่ระบบแล้วหรือไม่
 document.addEventListener('DOMContentLoaded', function() {
     const token = localStorage.getItem('authToken');
     if (token) {
         // ตรวจสอบ token กับ server
         fetch('/api/auth/verify', {
             method: 'GET',
             headers: {
                 'Authorization': 'Bearer ' + token
             }
         })
         .then(response => {
             if (response.ok) {
                 // ถ้า token ยังใช้ได้ ให้ไปหน้าหลัก
                 window.location.href = '/login.html';
             }
         })
         .catch(error => {
             console.log('Token verification failed:', error);
         });
     }
 });




 //backgrourd web funtion 
 // ฟังก์ชันสำหรับสร้างพื้นหลังดาว (รันเฉพาะเมื่อมี element ที่ต้องการ)
function createStars() {
    const container = document.getElementById('starsContainer');
    if (!container) return; // ตรวจสอบว่ามี element หรือไม่
    
    const numStars = 200;
 
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        const duration = Math.random() * 3 + 2;
        star.style.animationDuration = duration + 's';
        star.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(star);
    }
 }
 
 function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');
    
    shootingStar.style.left = Math.random() * 100 + '%';
    shootingStar.style.top = Math.random() * 50 + '%';
    shootingStar.style.animation = 'shoot 2s linear forwards';
    
    document.body.appendChild(shootingStar);
    
    setTimeout(() => {
        if (shootingStar.parentNode) {
            shootingStar.parentNode.removeChild(shootingStar);
        }
    }, 2000);
 }
 
 function createConstellation() {
    const constellation = document.getElementById('constellation');
    if (!constellation) return; // ตรวจสอบว่ามี element หรือไม่
    
    const numLines = 15;
    
    for (let i = 0; i < numLines; i++) {
        const line = document.createElement('div');
        line.classList.add('constellation-line');
        
        const length = Math.random() * 150 + 50;
        const angle = Math.random() * 360;
        
        line.style.width = length + 'px';
        line.style.left = Math.random() * 100 + '%';
        line.style.top = Math.random() * 100 + '%';
        line.style.transform = `rotate(${angle}deg)`;
        line.style.opacity = Math.random() * 0.3 + 0.1;
        
        constellation.appendChild(line);
    }
 }
 
 // รอให้ DOM โหลดเสร็จก่อนรันโค้ด
 document.addEventListener('DOMContentLoaded', function() {
    // ตรวจสอบ token
    const token = localStorage.getItem('authToken');
    if (token) {
        fetch('/api/auth/verify', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/login.html';
            }
        })
        .catch(error => {
            console.log('Token verification failed:', error);
        });
    }
    
    // สร้างพื้นหลังดาว (เฉพาะเมื่อมี elements ที่จำเป็น)
    if (document.getElementById('starsContainer')) {
        createStars();
        createConstellation();
        
        // สร้างดาวตกเป็นระยะ
        setInterval(() => {
            if (Math.random() < 0.7) {
                createShootingStar();
            }
        }, Math.random() * 5000 + 3000);
        
        // เพิ่มดาวเมื่อคลิก (เฉพาะบริเวณพื้นหลัง ไม่ใช่ปุ่ม)
        document.addEventListener('click', function(e) {
            // ตรวจสอบว่าไม่ได้คลิกที่ปุ่มหรือ input
            if (!e.target.closest('button') && !e.target.closest('input') && !e.target.closest('a')) {
                const star = document.createElement('div');
                star.classList.add('star');
                star.style.width = '4px';
                star.style.height = '4px';
                star.style.left = e.clientX + 'px';
                star.style.top = e.clientY + 'px';
                star.style.position = 'fixed';
                star.style.animationDuration = '1s';
                star.style.zIndex = '100';
                
                document.body.appendChild(star);
                
                setTimeout(() => {
                    if (star.parentNode) {
                        star.parentNode.removeChild(star);
                    }
                }, 2000);
            }
        });
    }
 });