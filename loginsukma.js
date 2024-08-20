// https://sukma.jatimprov.go.id/login

const fs = require("fs");
const base_url = "https://sukma.jatimprov.go.id/login";

var all_cookeies = [];

fetch(base_url)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok " + res.statusText);
    }
    const cookieHeader = res.headers.get("Set-Cookie");
    if (cookieHeader) {
      const cookies = cookieHeader.split("; ");
      cookies.forEach((cookie) => {
        // do something with each cookie, e.g. set it in document.cookie
        cookie = cookie.split(", ");
        cookie.forEach((element) => {
          all_cookeies.push(element);
        });
      });
    }

    const htmlString = res.text();

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

    var laravel_session = all_cookeies.filter((cookie) =>
        cookie.includes("laravel_session")
      )[0];
      var XSRF_TOKEN = all_cookeies.filter((cookie) =>
        cookie.includes("XSRF-TOKEN")
      )[0];
  
      console.log(laravel_session, XSRF_TOKEN);

    // Menampilkan token di console (atau gunakan sesuai kebutuhan)
    console.log("Token Value:", tokenValue);

    const domainName = new URL(base_url).hostname; // Mendapatkan nama domain dari URL
    const fileName = `${domainName}.html`; // Menentukan nama file

    // Menyimpan konten HTML ke file
    fs.writeFile(fileName, html, (err) => {
      if (err) {
        console.error("There was an error writing the file:", err);
      } else {
        console.log(`File has been saved as ${fileName}`);
      }
    });
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });
