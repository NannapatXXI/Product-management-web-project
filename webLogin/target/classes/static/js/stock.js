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
          </tr>`;
        });
       
        document.getElementById('prevBtn').disabled = data.first;
        document.getElementById('nextBtn').disabled = data.last;
        document.getElementById('pageInfo').innerText = `Page ${data.number + 1} of ${data.totalPages}`;

      })
      .catch(err => console.error('Error loading users:', err));
  }
  function getTableData() {
    
    const rows = document.querySelectorAll('#userTable tbody tr');
    const tableData = [];
    rows.forEach(row => {
      const cells = row.children;
      tableData.push({
        sequenceNumber: cells[0].innerText,
        productId: cells[1].innerText,
        idpro: cells[2].innerText,
        name: cells[3].innerText,
        category: cells[4].innerText,
        price: cells[5].innerText,
        cost: cells[6].innerText,
        updatedAt: cells[7].innerText,
      });
    
    });
    return tableData;
  }

  function printRowDetail(tableData,rowIndex) {
    if (rowIndex < 0 || rowIndex >= tableData.length) {
      console.error('Index out of range');
      return;
    }
    const item = tableData[rowIndex];
    console.log(`Row ${rowIndex + 1}:`);
    console.log(`  sequenceNumber: ${item.sequenceNumber}`);
    console.log(`  productId: ${item.productId}`);
    console.log(`  idpro: ${item.idpro}`);
    console.log(`  name: ${item.name}`);
    console.log(`  category: ${item.category}`);
    console.log(`  price: ${item.price}`);
    console.log(`  cost: ${item.cost}`);
    console.log(`  updatedAt: ${item.updatedAt}`);
  }
  
  function test(){
    /*const data = getTableData();
   console.log(data);
   printRowDetail(data,1); */
   findAndPrintByIdpro("Nannapat");
   
  }

  function myFunction() {
    const value = document.getElementById('IDproduct').value;
    console.log('พิมพ์:', value);
    // ทำงานอะไรที่ต้องการตรงนี้
  }



  function findAndPrintByIdpro(searchIdpro) {
    const searchIdStr = String(searchIdpro);  // แปลงเป็น string และตัดช่องว่างข้างหน้า-หลัง
    const rows = document.querySelectorAll('#userTable tbody tr');
    
    
    for (const row of rows) {
      const cells = row.children;
      const idpro = cells[2].innerText.trim();  // ตัดช่องว่างด้วย
      if (idpro === searchIdStr) {
        const item = {
          sequenceNumber: cells[0].innerText,
          productId: cells[1].innerText,
          idpro: idpro,
          name: cells[3].innerText,
          category: cells[4].innerText,
          price: cells[5].innerText,
          cost: cells[6].innerText,
          updatedAt: cells[7].innerText,
        };
        console.log(`ข้อมูลของ idpro "${searchIdStr}":`);
        console.log(item);
        return item;
      }
    }
    console.warn(`ไม่พบข้อมูล idpro = "${searchIdStr}" ในตาราง`);
    return null;
  }
  // โหลดข้อมูลทันทีที่เปิดเว็บ
  loadUsers();

  

 const modal = document.getElementById("withdrawProduct");

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

