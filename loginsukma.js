// https://sukma.jatimprov.go.id/login

const fs = require('fs');
const base_url = "https://sukma.jatimprov.go.id/login";

fetch(base_url)
    .then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok ' + res.statusText);
        }
        const cookieHeader = res.headers.get('Set-Cookie');
        if (cookieHeader) {
            const cookies = cookieHeader.split('; ');
            var all_cookeies = [];
            cookies.forEach(cookie => {
              // do something with each cookie, e.g. set it in document.cookie
              cookie = cookie.split(', ');
              cookie.forEach(element => {
                all_cookeies.push(element);
              })
              
            });
        }
        console.log(all_cookeies.filter(cookie => cookie.includes("laravel_session")));
        console.log(all_cookeies.filter(cookie => cookie.includes("XSRF-TOKEN")));
        return res.text();  // Mengambil konten dalam bentuk teks
    })
    .then((html) => {
        const domainName = new URL(base_url).hostname; // Mendapatkan nama domain dari URL
        const fileName = `${domainName}.html`; // Menentukan nama file

        // Menyimpan konten HTML ke file
        fs.writeFile(fileName, html, (err) => {
            if (err) {
                console.error('There was an error writing the file:', err);
            } else {
                console.log(`File has been saved as ${fileName}`);
            }
        });
    })
    .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
    });
