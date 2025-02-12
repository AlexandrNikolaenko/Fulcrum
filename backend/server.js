const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const toml = require('toml');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(5000);