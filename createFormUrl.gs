/** 完了報告フォームのURLを作成する
*
* @param 完了報告したいボンベの回収前データ
* @return URL
*/

function createCompleteFormUrl(data) {
  
  var commodity = data[2];
  var disposer = data[3];
  var cylinder = data[4];
  var gas = data[5];
  var startVol = data[8];
  var index = data[13];
  
  var googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScpl1al0aV0-1GBK8mJpGicIzSwUcnhyYrQfmhSXQe5ol-f9w/viewform?usp=pp_url';

  var comId = '&entry.684385908=';
  var disId = '&entry.1532344679=';
  var cylId = '&entry.805689195=';
  var gasId = '&entry.54770329=';
  var volId = '&entry.1527233470=';
  var indexId = '&entry.575040426=';
  
  var url = googleFormUrl;
  url += comId + commodity;
  url += disId + disposer;
  url += cylId + cylinder;
  url += gasId + gas;
  url += volId + startVol;
  url += indexId + index;
  
  var shortUrl = shortenUrl(url);
  
  return shortUrl; 
}

/** 出荷連絡フォームのURLを作成する
*
* @param 出荷連絡したいボンベのデータ
* @return URL
*/

function createExportFormUrl(data) {
  
  var cylinder = data[0];
  var gas = data[2];
  var latestVol = data[1];
  
  var googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfLdgABEu5D7PaTgHJLUAolraTK0wgSmUPzJ81CY6gLA5bvqg/viewform?usp=pp_url';

  var cylId = '&entry.31262382=';
  var gasId = '&entry.804175454=';
  var volId = '&entry.1813155321=';
  
  var url = googleFormUrl;
  url += cylId + cylinder;
  url += gasId + gas;
  url += volId + latestVol;
  
  var shortUrl = shortenUrl(url);
  
  return shortUrl; 
}



// 短縮版URLの作成 via bit.ly
function shortenUrl(longUrl) {

  const ACCESS_TOKEN = 'e61a6f6f180029dacb75805ba03829adc4cd980c';
  const ACCESS_URL   = 'https://api-ssl.bitly.com/v4/shorten';

  var payload = {
      'long_url': longUrl,
  };

  var headers = {
      'Authorization' : 'Bearer ' + ACCESS_TOKEN,
      'Content-Type': 'application/json',
  }

  var options = {
      "method"      : 'POST',
      'headers'     : headers,
      'payload'     : JSON.stringify(payload),
  }

　 var response = UrlFetchApp.fetch(ACCESS_URL, options);
　 var content = response.getContentText("UTF-8");

　 return JSON.parse(content).link;
}