const express = require("express");

const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
  
})






app.listen(5000, () => {
  console.log("app listen 5000");
});
