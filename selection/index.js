const fs = require('fs');
const axios = require('axios');
const fetch = require('node-fetch');
const FormData = require('form-data');
const sha1 = require('sha1');

const token = '8704e7a73a6d8c544622129c65c7e2958aa6cc69';

async function getJSON() {
    const response = await fetch(`https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${token}`);
    const data = await response.json();
    //console.log(data);

    data.decifrado = decipher(data.cifrado, data.numero_casas);
    data.resumo_criptografico = sha1(data.decifrado);
    //console.log(data);

    fs.writeFileSync('answer.json', JSON.stringify(data, null, 2));

    /*
    await fs.readFile('answer.json', (err, data) => {
        if (err) throw err;
        console.log(JSON.parse(data));
    });
    */

    const form = new FormData();
    form.append('answer', fs.createReadStream('answer.json'), {
        filename: 'answer.json',
        contentType: 'application/json',
    });

    try {
        const res = await axios.post(`https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${token}`, form, {
            headers: form.getHeaders()
        });
        console.log(res.status);
    } catch (error) {
        console.log('error: ', error);
    }

}

function decipher(str, n) {
  var alphabet = ("abcdefghijklmnopqrstuvwxyz").split("");

  str = str.toLowerCase();

  let str2 = "";
  for (let i = 0; i < str.length; i++) {

    if (str[i] == " " || str[i].match(/^[-&\/\\#,+()$~%.'":*\!\?\<>_{}0-9]+$/i) ) {
      str2 = str2 + str[i];

    } else {
      var normal_index = alphabet.indexOf(str[i]);
      if (normal_index - n < 0) {
        var index = alphabet.length - (n - normal_index);

      } else {
        var index = normal_index - n;
      }

      str2 = str2 + alphabet[index];
    }
  }

  return str2;
}

//console.log(decipher("wlph lv dq looxvlrq. oxqfkwlph grxeob vr. grxjodv dgdpv", 3));

getJSON();
