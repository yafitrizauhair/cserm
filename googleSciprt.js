function doPost(e) {
  try {
  
    const data = JSON.parse(e.postData.contents);

    const sheet = SpreadsheetApp.openById("ganti id anda")
      .getSheetByName("Sheet1");

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.subject || "",
      data.message || "",
    ]);


    const result = {
      status: "success",
      message: "Pesan berhasil dikirim!",
    };

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    const errorResult = {
      status: "error",
      message: err.message,
    };

    return ContentService
      .createTextOutput(JSON.stringify(errorResult))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


function doOptions() {
  return ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}


function doGet() {
  return ContentService
    .createTextOutput("Contact API aktif")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*");
}
