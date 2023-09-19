const express = require("express");
//get the user data from json file
const users = require("./MOCK_DATA.json");
const app = express();
const fs = require("fs");
const { error } = require("console");

/*
Notes:


Middle ware function can perform the following actions:
1.Execute any code
2.Make changes to the request and the response objects
3.End the request -response cycle 
4.Call the next middleware function in the stack


*/
//middle ware
app.use(
  express.urlencoded({
    extended: false,
  })
);

//hold the request object
// app.use((req,res,next)=>{
// console.log("hello from middleware")
// });

//reject the request
// app.use((req,res,next)=>{
// console.log("hello from middleware")
// return res.json({ message: 'hello from middleware 1'})
// });

//Custom use of Express middleware
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}:${req.path}:${req.method}`,
    (error, data) => {
      next();
    }
  );
});

// //point to next middleware request
// app.use((req,res,next)=>{
// console.log("hello from middleware 2",req.myusername)
// next();
// });

// console.log(users)
const port = 8000;

//Rest api endpoints
//GET USER
app.get("/api/users", (req, res) => {
  return res.json(users);
});

//GET USER By Id
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id == id);
  return res.json(user);
});

//post request
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  console.log(body);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error, data) => {
    return res.json({ status: "Success", id: users.length });
  });
});

//patch request
app.patch("/api/users/:id", () => {
  return res.json({ message: "patch request" });
});

//TypeError: Cannot read properties of undefined (reading 'id')
app.delete("/api/users/:id", (res, req) => {
  const id = Number(req.params.id);
  const index = users.find((user) => user.id === id);

  if (index !== -1) {
    //Delete the user from users json
    users.splice(index, 1);
    //write the updated user
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (error) => {
      return res.json({
        status: "Success",
        message: "User deleted successfully.",
      });
    });
  } else {
    return res
      .status(404)
      .json({ status: "Error", message: "User not found." });
  }
});

app.listen(port, () => console.log(`listening on ${port}...`));
