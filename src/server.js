const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const router = require("./routes");
const cors = require("cors");

//config
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));

//rotas
app.use(router);

app.listen(process.env.PORT || 3000)