const express = require("express");
const route = require("./calculator");

const port =  8000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", route);

app.listen(port, () => {
  console.log(`connection is live at port ${port}`);
});
