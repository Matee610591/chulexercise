function doGet(e) {
  try {
    // ถ้าไม่มีการระบุหน้า
    if (!e.parameter.page) {
      var template = HtmlService.createTemplateFromFile('main');
      // เพิ่ม meta tag สำหรับ viewport ที่ให้การแสดงผลดีขึ้นในอุปกรณ์มือถือ
      return template.evaluate().addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    }
    // ถ้ามีการระบุหน้าให้โหลดตามที่ระบุ
    return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate().addMetaTag('viewport', 'width=device-width, initial-scale=1').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);;
  } catch (err) {
    return HtmlService.createHtmlOutput("Error: " + err.message);
  }
}
function getUrl() {
  return ScriptApp.getService().getUrl();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
function checkDuplicateId(userId) {
  var ss = SpreadsheetApp.openById('12t4TdPyjTzVayCCTm-z-KDbUcr1hVs7AFpE19jOKxIk');
  var sheet = ss.getSheetByName('สมัครสมาชิก');
  
  // ดึงค่าทั้งหมดในคอลัมน์ที่ 1 (ที่มีรหัสพนักงาน)
  var range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1); // เริ่มจากแถวที่ 2
  var values = range.getValues(); // ได้ค่าเป็นอาร์เรย์ 2D
  
  // ตรวจสอบว่ามีรหัสพนักงานที่ซ้ำหรือไม่
  var isDuplicate = values.some(function(row) {
    return row[0] == userId; // ถ้าค่ารหัสพนักงานในคอลัมน์ A ซ้ำ
  });
  
  return isDuplicate; // ส่งผลลัพธ์กลับไป (true ถ้าซ้ำ, false ถ้าไม่ซ้ำ)
}

function saveUserData(user) {
  if (checkDuplicateId(user.data1)) {
    // ส่งผลลัพธ์ไปยัง client ว่ารหัสพนักงานซ้ำ
    return { success: false, message: "รหัสพนักงานนี้ได้สมัครไปแล้ว" };
  }

  var ss = SpreadsheetApp.openById('12t4TdPyjTzVayCCTm-z-KDbUcr1hVs7AFpE19jOKxIk');
  var sheet = ss.getSheetByName('สมัครสมาชิก');

  if (user.data6) {
    var decodedImage = Utilities.base64Decode(user.data6.split(',')[1]);
    var imageBlob = Utilities.newBlob(decodedImage, 'image/png', 'uploaded_image.png');
    var folder = DriveApp.getFolderById('1xmFyfWIaDaqaMa-dIKBFIz6enx4EIf0O');
    var file = folder.createFile(imageBlob);
    var fileUrl = file.getUrl();
    sheet.appendRow([user.data1, user.data2, user.data3, user.data4, user.data5, fileUrl]);
  } else {
    sheet.appendRow([user.data1, user.data2, user.data3, user.data4, user.data5, '']);
  }

  return { success: true }; // ข้อมูลถูกบันทึกเรียบร้อย
}


function saveActivity(user) {
  var ss = SpreadsheetApp.openById('12t4TdPyjTzVayCCTm-z-KDbUcr1hVs7AFpE19jOKxIk');
  var sheet = ss.getSheetByName('data1');

  // ตรวจสอบว่ามีการอัปโหลดไฟล์รูปหรือไม่
  if (user.data6) {
    // หากมีการอัปโหลดไฟล์รูป
    var decodedImage = Utilities.base64Decode(user.data6.split(',')[1]); // แยก Base64 data
    var imageBlob = Utilities.newBlob(decodedImage, 'image/png', 'uploaded_image.png'); // สร้าง Blob จาก Base64
    var folder = DriveApp.getFolderById('1w2M8SuDJrAcUw_EUvSSHGJLL2rdQkVog'); // ระบุ ID ของโฟลเดอร์ใน Google Drive ที่ต้องการเก็บรูป
    var file = folder.createFile(imageBlob); // อัปโหลดไฟล์ไปยังโฟลเดอร์ใน Google Drive
    var fileUrl = file.getUrl(); // ได้ URL ของไฟล์ที่อัปโหลด
  
    // เพิ่มข้อมูลใน Google Sheets พร้อม URL ของไฟล์ในคอลัมน์ที่ต้องการ
    sheet.appendRow([user.data1, user.data2, user.data3, user.data4, user.data5, fileUrl]);
  } else {
    // หากไม่มีไฟล์ ให้เพิ่มข้อมูลโดยไม่ต้องอัปโหลดรูป
    sheet.appendRow([user.data1, user.data2, user.data3, user.data4, user.data5, '']);
  }
}

function getEmployeeData(id2) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("สมัครสมาชิก"); // ชื่อชีตที่เก็บข้อมูล
  var data = sheet.getDataRange().getValues(); // ดึงข้อมูลทั้งหมดจากชีต

  for (var i = 0; i < data.length; i++) {
    if (data[i][0] == id2) {  // ถ้ารหัสพนักงานตรง
      // ส่งกลับข้อมูลพนักงานรวมถึงลิงก์รูปภาพในคอลัมน์ที่ 6
      return {
        name: data[i][1],        // ชื่อ
        department: data[i][2],   // แผนก
        line: data[i][3],         // สาย
        gender: data[i][4],       // เพศ
        fileUrl: data[i][5]       // ลิงก์รูปภาพ (คอลัมน์ที่ 6)
      };
    }
  }
  return null; // ถ้าไม่พบข้อมูล
}

function getData() {
  var spreadSheetId = "12t4TdPyjTzVayCCTm-z-KDbUcr1hVs7AFpE19jOKxIk"; 
  var dataRange = "data2!A2:L"; 
  var range = Sheets.Spreadsheets.Values.get(spreadSheetId, dataRange);
  var values = range.values || [];

  values = values.map(row => {
    while (row.length < 13) row.push(""); // เติมให้ครบ 11 คอลัมน์

    if (row[10]) { 
      let fileId = row[9].match(/d\/(.*)\/view/); 
      if (fileId && fileId[1]) {
        let imageUrl = `https://drive.google.com/uc?export=view&id=${fileId[1]}`;
        row[10] = `<a href="${imageUrl}" target="_blank">ดูรูป</a>`; // ทำให้คลิกได้
      }
    }
    return row;
  });

  return values;
}

function checkEmployeeId(id) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("สมัครสมาชิก");
    if (!sheet) {
        return { exists: false, error: "ไม่พบชีต สมัครสมาชิก" };
    }

    var data = sheet.getRange("A:A").getValues().flat().filter(String); // ดึงข้อมูลและลบค่าที่ว่างออก
    var exists = data.some(row => row.toString().trim() === id); // ตรวจสอบรหัสที่ตรงเป๊ะ

    Logger.log("รหัสที่ตรวจสอบ: " + id + " | พบซ้ำ: " + exists);

    return { exists: exists };
}

