function cleanDatabase() {
  Logger = BetterLog.useSpreadsheet('1OLIsTacd6IZGICuq7cOoMeufHRCC3bzE5gcx57zLNT0');
  try {
    var spreadsheets = ['1WrPSvh_BlryrCyTIvOJzYf_V5xnBfYG4MIoeKGfUiw0', '1Zp4zGCXsk3KCJREL0_h4zPVxEI6fAWMhpNDvkKPSEf8']
    for (var spreadsheetnum = 0; spreadsheetnum < spreadsheets.length; spreadsheetnum++) {
      var spreadsheet = SpreadsheetApp.openById(spreadsheets[spreadsheetnum]);
      var sheets = spreadsheet.getSheets()
      for (var sheetnum = 0; sheetnum < sheets.length; sheetnum++) {
        var sheet = sheets[sheetnum]
        Logger.log(sheet.getName())
      }
    }
  } catch (error) {
    Logger.severe('CLEAN SPREADSHEET ERROR :: %s', JSON.stringify(error, null, 2));
  }
}

