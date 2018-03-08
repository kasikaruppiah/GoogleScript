function doPost(request) {
  Logger = BetterLog.useSpreadsheet('1OLIsTacd6IZGICuq7cOoMeufHRCC3bzE5gcx57zLNT0');
  try {
    if (request !== undefined) {
      var spreadsheet = SpreadsheetApp.openById('1WrPSvh_BlryrCyTIvOJzYf_V5xnBfYG4MIoeKGfUiw0');
      var jsonString = request.postData.getDataAsString();
      var jsonObj = JSON.parse(jsonString);
      var device = 'iOS';
      var sheet = spreadsheet.getSheetByName(device);
      if (!sheet) {
        sheet = spreadsheet.insertSheet(device);
        sheet.appendRow(['Participant ID', 'Login Date', 'Name', 'System Name', 'System Version', 'Model', 'Localized Model', 'User Interface Idiom', 'Identifier For Vendor']);
        sheet.setFrozenRows(1);
      }
      sheet.appendRow([jsonObj.participantid, jsonObj.logindate, jsonObj.name, jsonObj.systemname, jsonObj.systemversion, jsonObj.model, jsonObj.localizedmodel, jsonObj.userinterfaceidiom, jsonObj.identifierforvendor]);
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