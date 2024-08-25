// https://sukma.jatimprov.go.id/hasil_survey

const fs = require("fs");
var {ProxyAgent} = require("undici");

const base_url = "https://sukma.jatimprov.go.id/hasil_survey";

const proxyAgent = new ProxyAgent('http://127.0.0.1:8888');
process.env.NODE_TLS_REJECT_UNAUTHORIZED=0

var cookie = "";

try {
  const data = fs.readFileSync('cookie.txt', 'utf8');
//   console.log(data);
  cookie = data;
} catch (err) {
  console.error(err);
}
console.log(cookie);
// console.log("oke");


fetch(base_url,{
    dispatcher: proxyAgent,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0',
      "Cookie" : cookie
    }
}).then((res) => {
    console.log(res.status);
    return res.text();  // Mengambil konten dalam bentuk teks
}).then((html) => {
    // console.log(html);
});