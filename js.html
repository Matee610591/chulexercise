<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>
document.getElementById('btn').addEventListener('click', save);

function save(event) {
    event.preventDefault(); // หยุดการทำงานปกติของฟอร์ม

    // ตรวจสอบว่าฟอร์มกรอกครบหรือยัง
    if (!validateForm()) {
        return; // ถ้ายังไม่ครบ หยุดการทำงาน
    }

    // แสดง Loading Alert
    Swal.fire({
        title: "กำลังบันทึกข้อมูล...",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif",
        showConfirmButton: false,
        allowOutsideClick: false
    });

    var user = {
        data1: document.getElementById('id').value,
        data2: document.getElementById('name').value,
        data3: document.getElementById('department').value,
        data4: document.getElementById('line').value,
        data5: document.getElementById('gender').value
    };

    var imageFile = document.getElementById('imageUpload').files[0];

    if (imageFile) {
        var reader = new FileReader();
        reader.onload = function (e) {
            user.data6 = e.target.result;

            // ส่งข้อมูลไปยัง Google Apps Script
            sendData(user);
        };
        reader.readAsDataURL(imageFile);
    } else {
        user.data6 = '';
        sendData(user);
    }
}

function sendData(user) {
    google.script.run
        .withFailureHandler(function (error) {
            Swal.close();
            Swal.fire({
                title: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
                icon: "error",
                timer: 3000
            });
        })
        .withSuccessHandler(function (response) {
            if (!response.success) {
                Swal.close();
                Swal.fire({
                    title: response.message, // แสดงข้อความเมื่อรหัสพนักงานซ้ำ
                    icon: "warning",
                    timer: 3000
                });
                return; // หยุดการทำงานหากรหัสซ้ำ
            }

            resetForm();
            Swal.close();
            Swal.fire({
                title: "บันทึกข้อมูลเรียบร้อยแล้ว",
                icon: "success",
                timer: 3000
            });
        })
        .saveUserData(user);
}

function validateForm() {
    let id = document.getElementById("id").value.trim();
    let name = document.getElementById("name").value.trim();
    let department = document.getElementById("department").value;
    let line = document.getElementById("line").value;
    let gender = document.getElementById("gender").value;

    if (id === "" || name === "" || department === "" || line === "" || gender === "") {
        Swal.fire({
            title: "กรุณากรอกข้อมูลให้ครบทุกช่อง!",
            icon: "warning"
        });
        return false; // ไม่ให้ส่งฟอร์ม
    }
    return true; // ส่งฟอร์มได้
}

function resetForm() {
    document.getElementById('id').value = "";
    document.getElementById('name').value = "";
    document.getElementById('department').value = "";
    document.getElementById('line').value = "";
    document.getElementById('gender').value = "";
    document.getElementById('imageUpload').value = "";
}
</script>

<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
         <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });
  </script>


  <script>
  // ป้องกันการคลิกโลโก้
  document.getElementById("logo").addEventListener("click", function(event) {
    event.preventDefault(); // ไม่ให้ทำงานเมื่อคลิก
  });
</script>

<!-- Import jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<!-- Import Select2 JS -->
<script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js"></script>
<script>
    $(document).ready(function() {
        // เรียกใช้ Select2 สำหรับ select ของเรา
        $('#department').select2({
            placeholder: "เลือกแผนก",
            allowClear: true
        });
    });
</script>
<script>
    document.getElementById('btn').addEventListener('click', function(event) {
        event.preventDefault();  // หยุดการทำงานปกติของฟอร์ม

        // แสดง GIF ขณะกำลังโหลด
        document.getElementById('loading').style.display = 'block';
        
        // ทำงานที่ต้องการ เช่น ส่งข้อมูล หรือรอการประมวลผล
        setTimeout(function() {
            // ซ่อน GIF หลังจากประมวลผลเสร็จ
            document.getElementById('loading').style.display = 'none';
        }, 5000);  // กำหนดเวลาแค่ 3 วินาทีสำหรับการโหลด
    });
</script>
<script>
function checkDuplicateId() {
    let id = document.getElementById("id").value.trim();
    let idStatus = document.getElementById("idStatus");

    if (id === "") {
        idStatus.innerHTML = "กรุณากรอกรหัสพนักงาน";
        idStatus.style.color = "orange";
        return;
    }

    // แสดง Loading
    idStatus.innerHTML = "กำลังตรวจสอบ...";
    idStatus.style.color = "blue";

    google.script.run
        .withSuccessHandler(function(response) {
            console.log(response); // ตรวจสอบค่าที่ได้จาก Google Apps Script
            if (response.exists) {
                idStatus.innerHTML = "❌ รหัสพนักงานซ้ำ";
                idStatus.style.color = "red";
            } else {
                idStatus.innerHTML = "✅ ใช้งานได้";
                idStatus.style.color = "green";
            }
        })
        .withFailureHandler(function(error) {
            console.error("เกิดข้อผิดพลาด: ", error);
            idStatus.innerHTML = "⚠️ เกิดข้อผิดพลาดในการตรวจสอบ";
            idStatus.style.color = "red";
        })
        .checkEmployeeId(id);
}

</script>
