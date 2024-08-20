// https://sukma.jatimprov.go.id/hasil_survey

const fs = require("fs");
const base_url = "https://sukma.jatimprov.go.id/_survey";

var cookie = "";

try {
  const data = fs.readFileSync('cookie.txt', 'utf8');
//   console.log(data);
  cookie = data;
} catch (err) {
  console.error(err);
}
// console.log(cookie);
// console.log("oke");


fetch(base_url,{
    method: 'GET',
    headers: {
        "Sec-Fetch-Site" : "same-origin",
        "Cookie" : cookie
    }
}).then((res) => {
    console.log(res.status);
    return res.text();  // Mengambil konten dalam bentuk teks
}).then((html) => {
    // console.log(html);
});