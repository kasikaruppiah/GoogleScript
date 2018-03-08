function doPost(request) {
  Logger = BetterLog.useSpreadsheet('1OLIsTacd6IZGICuq7cOoMeufHRCC3bzE5gcx57zLNT0');
  try {
    if (request !== undefined) {
      var spreadsheet = SpreadsheetApp.openById('1Zp4zGCXsk3KCJREL0_h4zPVxEI6fAWMhpNDvkKPSEf8');
      var jsonString = request.postData.getDataAsString();
      var jsonObj = JSON.parse(jsonString);
      var device = 'Android';
      var sheet = spreadsheet.getSheetByName(device);
      if (!sheet) {
        sheet = spreadsheet.insertSheet(device);
        sheet.appendRow(['Participant ID', 'Login Date', 'Code Name', 'Incremental', 'Release', 'SDK', 'Board', 'Bootloader', 'Brand', 'Device', 'Display', 'Fingerprint', 'Hardware', 'Host', 'Id', 'Manufacturer', 'Model', 'Product', 'Tags', 'Time', 'Type', 'User']);
        sheet.setFrozenRows(1);
      }
      sheet.appendRow([jsonObj.participantid, jsonObj.logindate, jsonObj.codename, jsonObj.incremental, jsonObj.release, jsonObj.sdk, jsonObj.board, jsonObj.bootloader, jsonObj.brand, jsonObj.device, jsonObj.display, jsonObj.fingerprint, jsonObj.hardware, jsonObj.host, jsonObj.id, jsonObj.manufacturer, jsonObj.model, jsonObj.product, jsonObj.tags, jsonObj.time, jsonObj.type, jsonObj.user]);
      return returnJSON(true);
    } else {
      Logger.severe('UPLOAD DEVICE DATA :: Empty Request, Found No Data in Post');
      return returnJSON(false);
    }
  } catch (error) {
    Logger.severe('UPLOAD DEVICE DATA :: %s', JSON.stringify(error, null, 2));
    return returnJSON(false);
  }
}

function returnJSON(status) {
  return ContentService.createTextOutput(JSON.stringify({"status": status})).setMimeType(ContentService.MimeType.JSON);
}