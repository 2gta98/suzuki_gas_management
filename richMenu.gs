function richMenuPic(){
  var CHANNEL_ACCESS_TOKEN = 'lH8HxSXqxXzhsj8zf/VWS2eDFh9Id5zwRdNNcxziHpqsgfTwRFElBTT3OyE1tPGwGWOXA6/4GvEoAcCPdB9JEB5OrZ42o+ezDlyqtdLh/MFMaVtDmbNFrxoml5ZrwLLo08qqeKkjWs1AvvkOsi8wqgdB04t89/1O/w1cDnyilFU='; 
  var richMenuId = 'richmenu-a42999a3bd01f2aa4d09b8d02f8868dd';
  var url = 'https://api.line.me/v2/bot/richmenu/' + richMenuId + '/content';
  var postData = DriveApp.getFileById('1ieHl8wh0ZxS4nLvXua0EYZUKvxjiCRGO');
  
  var blob = postData.getBlob().getAs('image/jpeg');
  Logger.log(blob.getName());
  Logger.log(blob.getContentType());

  var headers = {
    "Content-Type": "image/jpeg",
    "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN
  };
  
  var options = {
    "method": "post",
    "headers": headers,
    "payload": blob
  };
  
  UrlFetchApp.fetch(url, options);
}

function getRichMenuId() {
  var CHANNEL_ACCESS_TOKEN = 'lH8HxSXqxXzhsj8zf/VWS2eDFh9Id5zwRdNNcxziHpqsgfTwRFElBTT3OyE1tPGwGWOXA6/4GvEoAcCPdB9JEB5OrZ42o+ezDlyqtdLh/MFMaVtDmbNFrxoml5ZrwLLo08qqeKkjWs1AvvkOsi8wqgdB04t89/1O/w1cDnyilFU='; 
  var postData = {
    "size": {
      "width": 2500,
      "height": 843
    },
    "selected": false,
    "name": "フロン回収",
    "chatBarText": "メニュー",
    "areas": [
      {
        "bounds": {
          "x": 0,
          "y": 0,
          "width": 833,
          "height": 843
        },
        "action": {
          "type":"uri",
          "label":"フロン回収開始",
          "uri":"line://app/1603406459-5WvmxWRY"
        }
      },
      {
        "bounds": {
          "x": 834,
          "y": 0,
          "width": 834,
          "height": 843
        },
        "action": {
          "type":"postback",
          "label":"フロン回収終了",
          "data":"complete",
          "text":"回収実績を登録する"
        }
      },
      {
        "bounds": {
          "x": 1668,
          "y": 0,
          "width": 833,
          "height": 843
        },
        "action": {
          "type":"postback",
          "label":"ボンベ出荷報告",
          "data":"shipment",
          "text":"ボンベ出荷を登録する"
        }
      }
   ]
}
  
  var url = 'https://api.line.me/v2/bot/richmenu';
  var headers = {
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };
  var options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };
  var richMenuId = UrlFetchApp.fetch(url, options);
  Logger.log(richMenuId);
}


function linkRichMenu() {
  var CHANNEL_ACCESS_TOKEN = 'lH8HxSXqxXzhsj8zf/VWS2eDFh9Id5zwRdNNcxziHpqsgfTwRFElBTT3OyE1tPGwGWOXA6/4GvEoAcCPdB9JEB5OrZ42o+ezDlyqtdLh/MFMaVtDmbNFrxoml5ZrwLLo08qqeKkjWs1AvvkOsi8wqgdB04t89/1O/w1cDnyilFU=';
  var url = 'https://api.line.me/v2/bot/richmenu/bulk/link'; 
  var richMenuId = 'richmenu-a42999a3bd01f2aa4d09b8d02f8868dd';
  
  var ss = SpreadsheetApp.openById('1Q1JzHM6ravix6FtLPGZYUt4NYaDZAKGc49v6AJNK9sw');
  var sh = ss.getSheetByName('作業員リスト');
  var lastRow = sh.getLastRow();
  var picData = sh.getRange(2, 2, lastRow-1, 1).getValues();
  
  var userIds = [];
  
  for (var i=0; i<picData.length; i++) {
    if (picData[i][0] != '') {
      userIds.push(picData[i][0]);
    }
  }
  
  Logger.log(userIds);
  
  var headers = {
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };
  
  var postData = {
    "richMenuId": richMenuId,
    "userIds": userIds
  }
  
  var options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };
  
  UrlFetchApp.fetch(url, options);
  
}