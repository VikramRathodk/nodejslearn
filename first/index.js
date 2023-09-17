//Creating a http server

const http = require("http");
const fs = require("fs");
const port = 8000;
const url = require("url");
//Creating a server

// console.log(http)

const myServer = http.createServer((req, res) => {
  const currentTime = new Date();
  const formattedTime = currentTime.toISOString();

  // Creating a custom log entry
  const myurl = url.parse(req.url,true);
  console.log(myurl);
  const log = `${formattedTime}: New Request Received ${myurl.query.name} \n`;
  fs.appendFile("logs.txt", log, (errors) => {
    res.end("hello world");
  });

  //http method

  if(req.method == "GET"){
    res.statusCode = 200;
    res.end('GET request received');
  }else if(req.method == "POST"){
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      // Handle POST data here
      res.statusCode = 200;
      res.end('POST request received with data: ' + data);
  })}
});





myServer.listen(port, () => {
  console.log("Server listening on " + port);
});
