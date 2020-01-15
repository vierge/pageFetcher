const request = require('request');
const fs = require('fs');


const args = process.argv.slice(2);

const fetcher = function(arg) {
  let url = arg[0];
  let filePath = arg[1];
  let size;
  request(url, (error, response, body) => {
    console.log('ERROR: ', error);
    console.log('statusCode: ', response && response.statusCode);
    fs.writeFile(filePath, body, (err) => {
      if(err) {
        return console.log(err);
      }
      fs.stat(filePath, (error, stats) => {
        if(error) { console.log(error) };
        size = stats.size;
        return console.log(`downloaded ${size} to ${filePath}`);
      });
    });
  });
}

fetcher(args);