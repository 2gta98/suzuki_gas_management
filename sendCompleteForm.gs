/* LINE上でPostされたメッセージに応じて対応を変える */

function doPost(e) {
  //Post情報の取得
  var messageInfo = JSON.parse(e.postData.contents).events[0];
  var replyToken = messageInfo.replyToken;  // WebHookで受信した応答用Token
  var userMessage = messageInfo.message.text;  // ユーザーのメッセージを取得
  var timestamp = messageInfo.timestamp;
  var userId = messageInfo.source.userId;
  var messageData = [];
  
  //返信用の情報
  var CHANNEL_ACCESS_TOKEN = '{TOKEN}';
  var url = 'https://api.line.me/v2/bot/message/reply';  // 応答メッセージ用のAPI URL
  
  //ログの保存
  var ss = SpreadsheetApp.openById('1iQ923kdrEhfP6_XzZ4kDXBIr4h1kA7QpAjunbM7X8NY');
  var sh = ss.getSheetByName('LINE_log');
  var lastRow = sh.getLastRow();
  
  messageData.push(timestamp);
  messageData.push(userId);
  messageData.push(userMessage);
  sh.appendRow(messageData);
  
  // ボンベ番号の取得
  var ss_sum = SpreadsheetApp.openById('1Q1JzHM6ravix6FtLPGZYUt4NYaDZAKGc49v6AJNK9sw');
  var sh_sum = ss_sum.getSheetByName('サマリー');
  var lastRow_sum = sh_sum.getLastRow();
  var sumData = sh_cyl.getDataRange().getValues();
  
  var command = userMessage.split(' ');
  
  // ==================================
  // リッチメニューから完了報告を選択した際の処理
  // ==================================
  if (command[0] == '完了報告') {
    
    var contents = fetchContents();
    
    var postData = {
      "replyToken": replyToken,
      
      "messages": [{
        "type": "template",
        "altText": "this is a buttons template",
        "template": {
          "type": "buttons",
          "actions": contents,
          "title": "完了報告",
          "text": "回収の終了したボンベ番号を選択してください。"
        }
      }],
    };
    
    var headers = {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN,
    };
    
    var options = {
      "method": "POST",
      "headers": headers,
      "payload": JSON.stringify(postData)
    };
    
    var response = UrlFetchApp.fetch(url, options);
    return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
  } 
  
  // ==================================
  // バブルメッセージで車番が選択された時の処理
  // ==================================
  else {
    for (var i=1; i<lastRow_sum; i++) {
      if (command[2] == sumData[i][12]) { // ユーザーメッセージとボンベ番号の一致
        var url = createFormUrl(sumData[i]);
      }
    }
    
    var replyMessage = '以下のURLより完了報告を実施してください。\n\n' + url;
    
    var postData = {
      "replyToken": replyToken,
      "messages": [{
        "type": "text",
        "text": replyMessage,
      }],
    };
    var headers = {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN,
    };
    var options = {
      "method": "POST",
      "headers": headers,
      "payload": JSON.stringify(postData)
    };
    var response = UrlFetchApp.fetch(url, options);
    return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
  }
}

