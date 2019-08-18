// データ追加時に報告先を追加する用の関数
function addReport() {
  var ss = SpreadsheetApp.openById('1Q1JzHM6ravix6FtLPGZYUt4NYaDZAKGc49v6AJNK9sw');
  var sh_sum = ss.getSheetByName('サマリー');
  var sh_rep = ss.getSheetByName('報告先指定先');
  var lastRow_sum = sh_sum.getLastRow();
  var lastRow_rep = sh_rep.getLastRow();

  var sumData = sh_sum.getDataRange().getValues();
  var repData = sh_rep.getDataRange().getValues();
  
  for (var i=1; i<lastRow_sum; i++) {
    for (var j=1; j<lastRow_rep; j++) {
      if (sumData[i][3] == repData[j][0]) {
        sh_sum.getRange(i+1,18).setValue(repData[j][1]);
      }
    }
  }
}

function editCylinderNumber() {
  var ss = SpreadsheetApp.openById('1Q1JzHM6ravix6FtLPGZYUt4NYaDZAKGc49v6AJNK9sw');
  var sh = ss.getSheetByName('ボンベリスト');
  var lastRow = sh.getLastRow();
  
  var data = sh.getRange(2, 1, lastRow-1, 1).getValues();
  Logger.log(data);
  
  for (var i=0; i<lastRow; i++) {
    var cyl = data[i][0].split('-');
    Logger.log(cyl);
    sh.getRange(i+2,6).setValue(cyl[1]);
  }
}


function changeCylinderNum() {
  var ss = SpreadsheetApp.openById('1Q1JzHM6ravix6FtLPGZYUt4NYaDZAKGc49v6AJNK9sw');
  var sh_sum = ss.getSheetByName('サマリー');
  var sh_cyl = ss.getSheetByName('ボンベリスト');
  var lastRow_sum = sh_sum.getLastRow();
  var lastRow_cyl = sh_cyl.getLastRow();

  var sumData = sh_sum.getDataRange().getValues();
  var cylData = sh_cyl.getDataRange().getValues();

  for (var i=1; i<lastRow_sum; i++) {
    for (var j=1; j<lastRow_cyl; j++) {
      if (sumData[i][3] == cylData[j][5]) {
        sh_sum.getRange(i+1,4).setValue(cylData[j][0]);
      }
    }
  }
}

function editDate() {
  var ss = SpreadsheetApp.openById('1Q1JzHM6ravix6FtLPGZYUt4NYaDZAKGc49v6AJNK9sw');
  var sh = ss.getSheetByName('サマリー');
  var lastRow = sh.getLastRow();
  var data = sh.getDataRange().getValues();
  
  for (var i=1; i<lastRow; i++) {
    var date = new Date(data[i][0]);
    var month = date.getMonth();
    var day = date.getDate();
    
    sh.getRange(i+1,2).setValue(month+1);
    sh.getRange(i+1,3).setValue(day);
  }
}