const express = require("express");
const app = express();
const port = 5000;
const users = require("./data.json");
const fs = require("fs");

/*
Http Response Status Code

HTTP response status codes indicate whether a specific HTTP request has been successfully completed.
1. Informational responses (100 - 199 )
2. Successful responses ( 200- 299 )
3. Redirection messages ( 300- 399)
4. Client error responses (400— 499 )
5. Server error responses ( 500 - 599)

*/

//middle ware
app.use(
  express.urlencoded({
    extended: true,
  })
);

//REst api calls
app.get("/api/users", (req, res) => {
  return res.json(users);
});

//post request
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  console.log(body);
  fs.writeFile("./data.json", JSON.stringify(users), (error, data) => {
    return res.status(201).json({ status: "Success", id: users.length });
  });
});

app.listen(port, () => {
  console.log("Server Running", port);
});
