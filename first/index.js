 //Creating a http server

const http = require("http");
const fs = require("fs");
const port = 8000;
const url = require("url");

//Express server
const express = require("express");
const app = express();

app.get("/", (req,res)=>{
    res.send("Hello World by Express!");
})

app.get("/about", (req,res)=>{
  const log = `${req.query.name}`;
  fs.appendFile("log.txt", log,(error)=>{
    res.send("About by Express!");
  })

})

//Creating a server

// console.log(http)

// function myHandler(req,res){
 
//     const currentTime = new Date();
//     const formattedTime = currentTime.toISOString();
  
//     // Creating a custom log entry
//     const myurl = url.parse(req.url,true);
//     console.log(myurl);
//     const log = `${formattedTime}: New Request Received ${myurl.query.name} \n`;
//     fs.appendFile("logs.txt", log, (errors) => {
//       res.end("hello world");
//     });
  
//     //http method
  
//     if(req.method == "GET"){
//       res.statusCode = 200;
//       res.end('GET request received');
//     }else if(req.method == "POST"){
//       let data = '';
//       req.on('data', (chunk) => {
//         data += chunk;
//       });
//       req.on('end', () => {
//         // Handle POST data here
//         res.statusCode = 200;
//         res.end('POST request received with data: ' + data);
//     })}

// }
// const myServer = http.createServer(app);


app.listen(port, () => {
  console.log("Server listening on " + port);
});
