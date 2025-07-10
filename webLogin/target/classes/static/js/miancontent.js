let currentPage = 0;
const pageSize =5;

//const sequenceNumber = (page * pageSize) + index + 1;

function loadUsers(page) {
    fetch(`/api/auth?page=${page}&size=${pageSize}`)
      .then(res => res.json())
      .then(data => {
        const body = document.getElementById('tableBody');
        

        body.innerHTML = '';
        data.content.forEach((product,index )=> {
          const dt = product.updatedAt;
           const formattedDate = dt 
           ? `${String(dt[2]).padStart(2, '0')}/${String(dt[1]).padStart(2, '0')}/${dt[0]} ${String(dt[3]).padStart(2, '0')}:${String(dt[4]).padStart(2, '0')}`
           : 'N/A';
          let sequenceNumber = (currentPage * pageSize) + index + 1;
          body.innerHTML += 
          `<tr>
            <td>${sequenceNumber}</td>
            <td>${product.productId}</td>
            <td>${product.idpro}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.cost}</td>
            <td>${product.quantity}</td>
            <td>${product.unit}</td>
            <td>${formattedDate}</td>
            <td>
                <button class="action-btn"><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="action-btn-trash"><i class="fa-regular fa-trash-can"></i></button>
            </td>
          
          </tr>`;
        });
       setupActionButtons();
       
        document.getElementById('prevBtn').disabled = data.first;
        document.getElementById('nextBtn').disabled = data.last;
        
        document.getElementById('pageInfo').innerText = `Page ${data.number + 1} of ${data.totalPages}`;

      })
      .catch(err => console.error('Error loading users:', err));
  }

  const alertDelete = document.getElementById("alertWindow");
  
// ตั้งค่าปุ่มในตาราง 
  function setupActionButtons() {
    document.querySelectorAll('.action-btn').forEach(button => {
      button.addEventListener('click', handleActionButtonClick);
    });
    document.querySelectorAll('.action-btn-trash').forEach(button => {
        button.addEventListener('click',function(event){
            const row = event.target.closest('tr');
            const IDPRO = row.cells[1].textContent;
            const productid = row.cells[2].textContent;
            const categoryproduct = row.cells[3].textContent;
           
            alertDelete.style.display = "flex";
            document.getElementById('hiddenInputforDelete').value = IDPRO;
            document.getElementById('id').innerText ="ID : "+IDPRO;
            document.getElementById('productid').innerText ="Product ID : "+productid ;
            document.getElementById('categoryproduct').innerText ="Category : "+categoryproduct ;
           
             
        } );
      });
  }
  function confirmDeleteUser(){
    const idUserforDelete = document.getElementById('hiddenInputforDelete').value;
    console.log(idUserforDelete);
    deleteUser(idUserforDelete);
    
    
  }
  
  function handleActionButtonClick(event) {
    const row = event.target.closest('tr');
    const IDPRO = row.cells[1].textContent;
    const productid = row.cells[2].textContent;
    const nameproduct = row.cells[3].textContent;
    const categoryproduct = row.cells[4].textContent;
    const price = row.cells[5].textContent;
    const cost = row.cells[6].textContent;
    const quantity = row.cells[7].textContent;
    const unit = row.cells[8].textContent;
    openWindowEdit(IDPRO,productid,nameproduct,categoryproduct,price,cost,quantity,unit);
   
   }

const editUser = document.getElementById("customUser");
  function openWindowEdit(IDPRO,productid,nameproduct,categoryproduct,price,cost,quantity,unit) {
    editUser.style.display = "flex";
    document.getElementById('hiddenInput').value = IDPRO;
    document.getElementById('IDproduct-edit').value = productid;
    document.getElementById('nameproduct-edit').value = nameproduct;
    document.getElementById('category-edit').value = categoryproduct;
    document.getElementById('unitprodut-edit').value = unit;
    
    console.log(unit);
    
    document.getElementById('price-edit').value = price;
    document.getElementById('cost-edit').value =cost;
    document.getElementById('quantity-edit').value =quantity;
  }

  
  function closeWindowEdit() {
    editUser.style.display = "none";
    alertDelete.style.display = "none";
    }



  
  
  // โหลดข้อมูลทันทีที่เปิดเว็บ
  loadUsers();

  function deleteUser(id){ 
    fetch(`/api/auth/deleteProductByID/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'},
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        return response.text();
    })
    .then(msg => {
     
         loadUsers(currentPage);  // โหลดข้อมูลใหม่
      
        closeWindowEdit();
    
     showSuccess("ลบสินค้าเรียบร้อย", "main"); // ให้แสดงในส่วน header-content
    })
    .catch(err => {
        alert("ลบไม่สำเร็จ: " + err.message);
    });
}

function editProductInTable(){
   
   const id =  document.getElementById('hiddenInput').value ;
   const IDPRO =  document.getElementById('IDproduct-edit').value ;
    const nameproduct = document.getElementById('nameproduct-edit').value ;
    const categoryproduct = document.getElementById('category-edit').value ;
    const unitprodut = document.getElementById('unitprodut-edit').value ;
    
   
    const price = document.getElementById('price-edit').value;
    const unit = document.getElementById('cost-edit').value;
    const quantity = document.getElementById('quantity-edit').value ;
    
    
    console.log();
    
      if (IDPRO == "" || nameproduct == "" || categoryproduct == "" ) {
        if (IDPRO == "") {
            showError("กรุณากรอกไอดีสินค้าก่อน : ");
        }else if (nameproduct == "") {
            showError("กรุณากรอกชื่อสินค้าก่อน : ");
        }else if(categoryproduct == ""){
          showError("กรุณากรอกหมวดหมู่สินค้าก่อน : ");
        } else if(quantity == ""){
          showError("กรุณากรอกจำนวนสินค้าก่อน")
          
      }else{
        showError("กรุณากรอกฟอร์มก่อน");
      }
       
    }else{
        fetch(`/api/auth/editProduct/${id}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              IDproduct: IDPRO,
              name: nameproduct,
              category: categoryproduct,
              price : price,
              cost : unit,
              quantity :quantity,
              unit : unitprodut

            })
        }).then(() => {
            loadUsers(currentPage);
        });
        showSuccess("แก้ไขสินค้าเรียบร้อย")
        setTimeout(() => {
            closeWindowEdit();
         }, 1000);
    }

}

function addProduct() {
const name = document.getElementById('nameproduct').value;
const category = document.getElementById('category').value;
const price = document.getElementById('price').value;
const cost = document.getElementById('cost').value;
const IDproduct = document.getElementById('IDproduct').value;
const quantity = document.getElementById('quantity').value;

const selectEl = document.getElementById('countingunit');
const selectedValue = selectEl.value;
console.log("ที่เราเลือก:", selectedValue);
 
   

if (name == "" || category == "" || price == "" || cost == ""|| selectedValue == "" || IDproduct == "" || quantity == "") {
    if (name == "") {
        showError("กรุณากรอกชื่อก่อน : ","add");
    }else if (category == "") {
        showError("กรุณากรอกประเภทก่อน : ","add");
        
    }else if (price == "") {
      showError("กรุณากรอกราคาก่อน : ","add");
      
  }else if (cost == "") {
    showError("กรุณากรอกต้นทุนก่อน : ","add");
    
  }else if (unit == "") {
    showError("กรุณาเลือกหน่วยก่อน : ","add");
  
  }else if (IDproduct == "") {
    showError("กรุณากรอกไอดีสินค้าก่อน : ","add");
  
  }else if (quantity == "") {
    showError("กรุณากรอกจำนวนสินค้าก่อน : ","add");
  
  }else {
          showError("กรุณากรอกฟอร์มก่อน","add");
    }
  
   
 
   
} else {
 
  
    fetch('/api/auth/createProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          category,
          price,
          cost,
          IDproduct,
          quantity,
          unit: selectedValue
        }) 
      })
      .then(() => {
        loadUsers(currentPage); // โหลดข้อมูลใหม่
      });
      showSuccess("เพิ่มสินค้าเรียบร้อย")
      document.getElementById('IDproduct').value= "";
       document.getElementById('nameproduct').value= "";
        document.getElementById('category').value= "";
        document.getElementById('price').value= "";
        document.getElementById('cost').value= "";
        document.getElementById('quantity').value= "";

        selectEl.selectedIndex = 0;
        setTimeout(() => {
       closeModal();
      
       
    }, 1000);
}
}


 const modal = document.getElementById("customModal");

 function openModal() {
   modal.style.display = "flex";
 }

 function closeModal() {
   modal.style.display = "none";
 }

 // กดนอก modal แล้วปิด
 window.addEventListener("click", function(e) {
   if (e.target === modal) {
     closeModal();
   }
 });



 function TestMeassage(){
 showSuccess("come", "main"); // ให้แสดงในส่วน header-content
  console.log("hello");
  console.log(document.getElementById('successMessage-main'));



 }
 // ฟังก์ชันแสดงข้อความ error
 function showError(message, context = "main") {
   
    const errorDiv = document.getElementById(`errorMessage-${context}`);
    const successDiv = document.getElementById(`successMessage-${context}`);
   
    if (successDiv) errorDiv.style.display = 'none';
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.style.display = 'block';
   }
     setTimeout(() => {
      if (errorDiv) errorDiv.style.display = 'none';
    }, 1000);
 }

 // ฟังก์ชันแสดงข้อความ success
 function showSuccess(message, context = "main") {
    console.log("showSuccess called:", message);
    const errorDiv = document.getElementById(`errorMessage-${context}`);
    const successDiv = document.getElementById(`successMessage-${context}`);
    console.log(document.getElementById('successMessage-main'));

    if (errorDiv) errorDiv.style.display = 'none';
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
    }
    
    setTimeout(() => {
        if (successDiv) successDiv.style.display = 'none';
    }, 1000);
}

//ฟังก์ชั่นเปลี่ยนหน้า table
function prevPage() {
    if (currentPage > 0) {
      currentPage--;
      loadUsers(currentPage);
      console.log(currentPage);
      console.log("in funtion prev");
    }
  }
  function nextPage() {
    currentPage++;
    loadUsers(currentPage);
    console.log(currentPage);
    console.log("in funtion next");
  }

