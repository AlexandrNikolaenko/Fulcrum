const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const toml = require('toml');
const mysql = require('mysql2');

const app = express();

const host = 'localhost';

app.use(bodyParser.json());
app.use(cors());

const config = toml.parse(fs.readFileSync('./config.toml', 'utf-8'));

class Connetion {
    constructor(connectCallback) {
        this.connection = mysql.createConnection({
            host: host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database
        });
        this.connection.connect(err => connectCallback(err));
    }

    query(query, callback) {
        this.connection.query(query, (err, result) => callback(err, result));
    }

    end(callback) {
        this.connection.end((err) => {if (callback) callback(err)});
    }
}

app.get('/auth/login', function(req, res) {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });

    const connection = new Connetion((err) => {
        if (err) console.log(err);
        else console.log('Connection is success');
    });

    connection.end();
});

app.listen(5000);