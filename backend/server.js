const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const fs = require('fs');
const toml = require('toml');
const mysql = require('mysql2');
const crypto = require('crypto');
const base64url = require('base64url');

const app = express();

const host = 'localhost';

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

const config = toml.parse(fs.readFileSync('./config.toml', 'utf-8'));

app.use(cookieParser());
app.use((req, _, next) => {
    try {
        if (req.cookies.access) {
            let access = req.cookies.access.split('.');
            if (Date.now() < JSON.parse(Buffer.from(access[1], 'base64').toString('utf8')).exp) {

                if (access[2] == crypto.createHmac('SHA256', config.jwt.key).update(`${access[0]}.${access[1]}`).digest('base64')) {
                    req.user = JSON.parse(Buffer.from(access[1], 'base64').toString('utf8')).id.split('.')[1];
                }

            } else if (req.cookies.refresh) {

                let refresh = JSON.parse(Buffer.from(req.cookies.refresh, 'base64').toString('utf8'));

                if (refresh.exp > Date.now() && refresh.id == JSON.parse(Buffer.from(access[1], 'base64').toString('utf8')).id) {

                    let newId = `${Date.now()}.${refresh.id.split('.')[1]}`;
                    let newAccess = [base64url(JSON.stringify({
                        alg: 'SHA256',
                        typ: "JWT",
                        ctp: "JWT"
                    })), base64url(JSON.stringify({
                        iss: 'fulcrum',
                        exp: Number(newId.split('.')[0]) + 60000,
                        id: newId   
                    }))];
                    let newRefresh = base64url(JSON.stringify({
                        exp: Number(newId.split('.')[0]) + 4320000,
                        id: newId   
                    }));

                    res.cookie('access', `${newAccess[0]}.${newAccess[1]}.${crypto.createHmac('SHA256', config.jwt.key).update(`${newAccess[0]}.${newAccess[1]}`).digest('base64')}`);
                    res.cookie('refresh', `${newRefresh}`, {httpOnly: true});
                    req.user = refresh.id.split('.')[1];
                }
            }
        }
    } catch(e) {console.log(e);}

    next();
})
app.use(bodyParser.json());
app.use(cors());

async function setTokens(res, {userId, email}) {
    let newId
    if (userId) newId = `${Date.now()}.${userId}`;
    else {
        try {
            const connection = new Connetion((err) => {
                if (err) throw new Error(err);
            });
            
            connection.query(`select id from Users where email = '${email}'`, function(e, result) {
                if (e) throw new Error(e);
                newId = result[0].id;
            })

        } catch (e) {
            console.log(e);
            res.status(500);
            res.send();
        }
    }
    let newAccess = [base64url(JSON.stringify({
        alg: 'SHA256',
        typ: "JWT",
        ctp: "JWT"
    })), base64url(JSON.stringify({
        iss: 'fulcrum',
        exp: Number(newId.split('.')[0]) + 60000,
        id: newId   
    }))];
    let newRefresh = base64url(JSON.stringify({
        exp: Number(newId.split('.')[0]) + 4320000,
        id: newId   
    }));

    res.cookie('access', `${newAccess[0]}.${newAccess[1]}.${crypto.createHmac('SHA256', config.jwt.key).update(`${newAccess[0]}.${newAccess[1]}`).digest('base64')}`);
    res.cookie('refresh', `${newRefresh}`, {httpOnly: true});
}

app.get('/auth/login', function(req, res) {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });

    try {
        const connection = new Connetion((err) => {
            if (err) console.log(err);
            else console.log('Connection is success');
        });

        let callback = () => {return};

        connection.query(`select id, password from User where email = '${req.query.password}'`, function(e, result) {
            if (e) throw new Error(e);
            if (result.length == 0) res.status(401);
            else if (result[0].password == crypto.createHmac('SHA256', config.jwt.key).update(req.query.password).digest('base64')) {
                callback = () => {
                    res.status(200);
                    setTokens(res, result[0].id);
                }
            }
            else res.status(401);
        })

        connection.end(callback);
    } catch (e) {
        console.log(e);
        res.status(500);
    }

    res.send();
});

app.get('/auth/signup', function(req, res) {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });

    try {
        const connection = new Connetion((err) => {
            if (err) throw new Error(err);
        });
    
        connection.query(`select * from Users where email = '${req.query.email}'`, function(e, result) {
            if (e) throw new Error(e);
            if (result.length == 0) {
                res.status(200);
                res.send({link: base64url(JSON.stringify({
                    email: req.query.email,
                    password: crypto.createHmac('SHA256', config.jwt.key).update(req.query.password).digest('base64')
                }))});
            }
            else res.status(401);
        });
    
        connection.end();
    } catch (e) {
        console.log(e);
        res.status(500);
    }    

    res.send();
});

app.post('/auth/adduser', function(req, res) {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });

    try {
        const connection = new Connetion((err) => {
            if (err) throw new Error(err);
        });

        let {email, password} = JSON.parse(Buffer.from(req.body.link).toString('utf8'));
    
        connection.query(`insert into Users (email, password) values ('${email}', '${password}')`, function(e, result) {
            if (e) throw new Error(e);
            if (result.length == 0) {
                res.status(200);
                setTokens();
            }
            else res.status(401);
        });
    
        connection.end();
    } catch (e) {
        console.log(e);
        res.status(500);
    }    

    res.send();
})

app.listen(5000);