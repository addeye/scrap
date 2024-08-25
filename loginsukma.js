// https://sukma.jatimprov.go.id/login

const fs = require("fs");
var { HttpsProxyAgent } = require("https-proxy-agent");
var { ProxyAgent } = require("undici");

const base_url = "https://sukma.jatimprov.go.id/login";

var all_cookeies = [];

// console.log(global.fetch);
// Object.getOwnPropertyDescriptor(global);
const proxyAgent = new ProxyAgent("http://127.0.0.1:8888");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

fetch(base_url, { dispatcher: proxyAgent })
  .then((res) => {
    console.log(res);
    if (!res.ok) {
      throw new Error("Network response was not ok " + res.statusText);
    }
    // const cookieHeader = res.headers.getSetCookie();

    // console.log(cookieHeader);

    const cookies = [];
    const array = res.headers.getSetCookie();
    for (const string of array) {
      for (const string2 of string.split("; ")) {
        const [name, value] = string2.split("=");
        if (
          /^(Domain|Expires|HttpOnly|Max-Age|Partitioned|Path|Secure|SameSite)$/i.test(
            name
          )
        ) {
          continue;
        }
        cookies.push([name, value].join("="));
      }
    }

    // console.log(cookies.join("; "));

    fs.writeFileSync("cookie.txt", cookies.join("; "));

    const htmlString = res.text();
    console.log(res.status);

    return htmlString; // Mengambil konten dalam bentuk teks
  })
  .then((html) => {
    // Regex untuk mencari token
    const tokenRegex =
      /<input\s+type="hidden"\s+name="_token"\s+value="([^"]+)"/i;

    // Mencari token menggunakan Regex
    const match = html.match(tokenRegex);

    // Mengambil nilai token jika ditemukan
    const tokenValue = match ? match[1] : null;

    // console.log(laravel_session, XSRF_TOKEN);
    //   _token=pKPuV1V2lkyD0oCwzD0RbixZDAZ5dxfiXPEjhzUv&id_kota=3501&id_opd=917&id_upt=&password=123

    // Menampilkan token di console (atau gunakan sesuai kebutuhan)
    // console.log("Token Value:", tokenValue);

    var data = `_token=${tokenValue}&id_kota=3501&id_opd=917&id_upt=&password=123`;

    doLogin(data);

    // const domainName = new URL(base_url).hostname; // Mendapatkan nama domain dari URL
    // const fileName = `${domainName}.html`; // Menentukan nama file

    // Menyimpan konten HTML ke file
    // fs.writeFile(fileName, html, (err) => {
    //   if (err) {
    //     console.error("There was an error writing the file:", err);
    //   } else {
    // console.log(`File has been saved as ${fileName}`);
    //   }
    // });
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });

function doLogin(data) {
  var cookie_dologin = fs.readFileSync("cookie.txt", "utf8");

  // const queryObject = Object.fromEntries(new URLSearchParams(data));

  // console.log(queryObject);
  // console.log(cookie_dologin);

  // const myHeaders = new Headers();

  // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  // myHeaders.append("Cookie", cookie_dologin);

  const formData = new URLSearchParams(data).toString();

  // Melakukan request menggunakan fetch
  fetch("https://sukma.jatimprov.go.id/login", {
    dispatcher: proxyAgent,
    method: "POST",
    redirect : "manual",
    headers: {
      Host: "sukma.jatimprov.go.id",
      Connection: "keep-alive",
      "Content-Length": formData.length.toString(),
      "Cache-Control": "max-age=0",
      "sec-ch-ua":
        '"Not)A;Brand";v="99", "Microsoft Edge";v="127", "Chromium";v="127"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "Upgrade-Insecure-Requests": "1",
      Origin: "https://sukma.jatimprov.go.id",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-User": "?1",
      "Sec-Fetch-Dest": "document",
      Referer: "https://sukma.jatimprov.go.id/login",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
      Cookie: cookie_dologin,
    },
    body: formData,
  })
    .then((res) => {
      console.log(res.status);

      const cookies = [];
      const array = res.headers.getSetCookie();
      for (const string of array) {
        for (const string2 of string.split("; ")) {
          const [name, value] = string2.split("=");
          if (
            /^(Domain|Expires|HttpOnly|Max-Age|Partitioned|Path|Secure|SameSite)$/i.test(
              name
            )
          ) {
            continue;
          }
          cookies.push([name, (value)].join("="));
        }
      }
      console.log(cookies.join("; "));

      fs.writeFileSync("cookie.txt", cookies.join("; "));

      return res.text(); // Mengambil konten dalam bentuk teks
    })
    .then((data) => {
      console.log('Response:', data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getSurvey() {}

function setupCookie(cookie_text) {}
