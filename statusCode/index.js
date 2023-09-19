const express = require('express');
const app = express();
const port = 5000;

/*
Http Response Status Code

HTTP response status codes indicate whether a specific HTTP request has been successfully completed.
1. Informational responses (100 - 199 )
2. Successful responses ( 200- 299 )
3. Redirection messages ( 300- 399)
4. Client error responses (400— 499 )
5. Server error responses ( 500 - 599)

*/


app.listen(port,()=>{
   console.log("Server Running",port);  
});