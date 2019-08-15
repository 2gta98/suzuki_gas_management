/* LINE上でPostされたイベントに反応する */

function doPost(e) {
  //Post情報の取得
  var event = JSON.parse(e.postData.contents).events[0];
 
  //ログの保存
  var ss = SpreadsheetApp.openById('1iQ923kdrEhfP6_XzZ4kDXBIr4h1kA7QpAjunbM7X8NY');
  var sh = ss.getSheetByName('LINE_log');
  var lastRow = sh.getLastRow();
  sh.getRange(lastRow+1,1).setValue(event);
  
  if (event.type === 'message') {
    replyToMessage(event);
  } else if (event.type === 'postback') {
    actionToPostBack(event);
  }
}
