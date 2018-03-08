function doPost(request) {
  Logger = BetterLog.useSpreadsheet('1OLIsTacd6IZGICuq7cOoMeufHRCC3bzE5gcx57zLNT0');
  try {
    if (request !== undefined) {
      var spreadsheet = SpreadsheetApp.openById('1WrPSvh_BlryrCyTIvOJzYf_V5xnBfYG4MIoeKGfUiw0');
      var jsonString = request.postData.getDataAsString();
      var jsonObj = JSON.parse(jsonString);
      var pid = jsonObj.participantid;
      var sheet = spreadsheet.getSheetByName(pid);
      if (!sheet) {
        sheet = spreadsheet.insertSheet(pid);
        sheet.appendRow(['Survey ID', 'Survey Date', 'Tag', 'Response']);
        sheet.setFrozenRows(1);
      }
      for (var i in jsonObj.surveys) {
        var surveyid = jsonObj.surveys[i].surveyid;
        var createdDate = jsonObj.surveys[i].createddate;
        for (var j in jsonObj.surveys[i].responses) {
          sheet.appendRow([surveyid, createdDate, jsonObj.surveys[i].responses[j].tag, jsonObj.surveys[i].responses[j].value]);
        }
      }
      return returnJSON(true);
    } else {
      Logger.severe('UPLOAD RESPONSE DATA :: Empty Request, Found No Data in Post');
      return returnJSON(false);
    }
  } catch (error) {
    Logger.severe('UPLOAD RESPONSE DATA :: %s', JSON.stringify(error, null, 2));
    return returnJSON(false);
  }
}

function returnJSON(status) {
  return ContentService.createTextOutput(JSON.stringify({"status": status})).setMimeType(ContentService.MimeType.JSON);
}