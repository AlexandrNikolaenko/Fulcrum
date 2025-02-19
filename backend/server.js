const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const fs = require('fs');
const toml = require('toml');
const mysql = require('mysql2');
const crypto = require('crypto');
const base64url = require('base64url');
const nodemailer = require("nodemailer");

const app = express();

const host = 'localhost';

const refreshAge = 4320000*1000;
const accesAge = 60000*1000;

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

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "alexnikol092004@gmail.com",
      pass: config.gmail.emailkey,
    },
});

app.use(cookieParser());
app.use((req, res, next) => {
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
                        exp: Number(newId.split('.')[0]) + accesAge,
                        id: newId   
                    }))];
                    let newRefresh = base64url(JSON.stringify({
                        exp: Number(newId.split('.')[0]) + refreshAge,
                        id: newId   
                    }));

                    res.cookie('access', `${newAccess[0]}.${newAccess[1]}.${crypto.createHmac('SHA256', config.jwt.key).update(`${newAccess[0]}.${newAccess[1]}`).digest('base64')}`, {maxAge: accesAge});
                    res.cookie('refresh', `${newRefresh}`, {httpOnly: true, maxAge: refreshAge});
                    req.user = refresh.id.split('.')[1];
                }
            }
        }
    } catch(e) {console.log(e);}
    
    next();
})
app.use(cors());
app.use(bodyParser.json());

function getTokens(res, {userId, email}) {
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
            });

            connection.end();

        } catch (e) {
            console.log(e);
            res.status(500);
        }
    }
    let newAccess = [base64url(JSON.stringify({
        alg: 'SHA256',
        typ: "JWT",
        ctp: "JWT"
    })), base64url(JSON.stringify({
        iss: 'fulcrum',
        exp: Number(newId.split('.')[0]) + accesAge,
        id: newId   
    }))];
    let newRefresh = base64url(JSON.stringify({
        exp: Number(newId.split('.')[0]) + refreshAge,
        id: newId   
    }));

    return {
        access: `${newAccess[0]}.${newAccess[1]}.${crypto.createHmac('SHA256', config.jwt.key).update(`${newAccess[0]}.${newAccess[1]}`).digest('base64')}`,
        refresh: `${newRefresh}`
    }
}

app.get('/auth/login', function(req, res) {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        'Access-Control-Allow-Credentials': 'true'
    });

    try {
        const connection = new Connetion((err) => {
            if (err) console.log(err);
        });

        connection.query(`select id, password from Users where email = '${req.query.email}'`, function(e, result) {
            if (e) throw new Error(e);
            if (result.length == 0) {
                res.status(401);
                res.send();
            }
            else if (result[0].password == crypto.createHmac('SHA256', config.jwt.key).update(req.query.password).digest('base64')) {
                res.status(200);
                let {access, refresh} = getTokens(res, {userId: result[0].id});
                res.cookie('access', access, {maxAge: accesAge});
                res.cookie('refresh', refresh, {httpOnly: true, maxAge: refreshAge});
                res.send();
            }
            else {
                res.status(401);
                res.send();
            }
        })

        connection.end();
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send();
    }

    
});

app.get('/auth/signup', function(req, res) {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });

    let returnData = {}

    try {
        const connection = new Connetion((err) => {
            if (err) throw new Error(err);
        });
    
        connection.query(`select * from Users where email = '${req.query.email}'`, function(e, result) {
            if (e) throw new Error(e);
            if (result.length == 0) {
                res.status(200);
                let link = `http://${host}:3000/auth/checkemail/${base64url(JSON.stringify({
                        email: req.query.email,
                        password: crypto.createHmac('SHA256', config.jwt.key).update(req.query.password).digest('base64')
                    }))}`
                transporter.sendMail({
                    from: '<alexnikol092004@gmail.com>',
                    to: `${req.query.email}`,
                    subject: "Подтверждение почты",
                    text: `Для подтверждения адреса электронной почты перейдите по ссылке: ${link}`
                });
                
                returnData = {link: base64url(JSON.stringify({
                    email: req.query.email,
                    password: crypto.createHmac('SHA256', config.jwt.key).update(req.query.password).digest('base64')
                }))}
            }
            else res.status(401);
        });
    
        connection.end();
    } catch (e) {
        console.log(e);
        res.status(500);
    }    

    res.send(returnData);
});

app.post('/auth/adduser', function(req, res) {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        'Access-Control-Allow-Credentials': 'true'
    });

    try {
        const connection = new Connetion((err) => {
            if (err) throw new Error(err);
        });

        let {email, password} = JSON.parse(Buffer.from(req.body.link, 'base64').toString('utf8'));
    
        connection.query(`insert into Users (email, password) values ('${email}', '${password}')`, function(e, result) {
            if (e) throw new Error(e);
            if (result.length == 0) {
                res.status(200);
                let {access, refresh} = getTokens(res, {email: email});
                res.cookie('access', access, {maxAge: accesAge});
                res.cookie('refresh', refresh, {httpOnly: true, maxAge: refreshAge});
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

app.get('/getuser', function(req, res) {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        'Access-Control-Allow-Credentials': 'true'
    });

    let data = {}
    
    try {
        if (typeof req.user != 'undefined') {
            const connection = new Connetion((e) => {
                if (e) throw new Error(e);
            });
    
            connection.query(`select username from Users where id = ${req.user}`, function(err, result) {
                if (err) throw new Error(err);
                if (result.length != 0) {
                    res.status(200);
                    data = {
                        id: req.user,
                        name: result[0].username
                    }
                    res.send(data);
                } else {
                    res.status(401);
                    res.send(data);
                }
            });

            connection.end();
        } else {
            res.status(401);
            res.send(data);
        }
        
    } catch(e) {
        console.log(e);
        res.status(500);
        res.send(data);
    }
});

app.get('/ads/amount', function(req, res) {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
    });

    try {
        let filter = [];
        if (req.query.university) filter.push({name: 'university', val: req.query.university});
        if (req.query.subject) filter.push({name: 'subject', val: req.query.subject});
        if (req.query.course) filter.push({name: 'course', val: req.query.course});
        let stroke = 'where ';
        filter.forEach((elem) => {
            stroke.concat(`${elem.name} = '${elem.val}' and `)
        });
        if (stroke == 'where ') stroke = '';
        else stroke = stroke.slice(0, stroke.length - 5);

        const connection = new Connetion((err) => {
            if (err) throw new Error(err);
        });

        connection.query(`select count(*) as amount from Ads ${stroke}`, function (e, result) {
            if (e) throw new Error(e);
            else {
                res.status(200);
                res.send({amount: result[0].amount});
            }
        });

        connection.end();
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send();
    }
});

app.get('/ads', function(req, res) {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
    });

    try {
        let filter = [];
        if (req.query.university) filter.push({name: 'university', val: req.query.university});
        if (req.query.subject) filter.push({name: 'subject', val: req.query.subject});
        if (req.query.course) filter.push({name: 'course', val: req.query.course});
        let stroke = 'where ';
        filter.forEach((elem) => {
            stroke.concat(`${elem.name} = '${elem.val}' and `)
        });
        if (stroke == 'where ') stroke = '';
        else stroke = stroke.slice(0, stroke.length - 5);

        const connection = new Connetion((err) => {
            if (err) throw new Error(err);
        });

        connection.query(`select * from Ads ${stroke}`, function (e, result) {
            if (e) throw new Error(e);
            else {
                res.status(200);
                res.send({ads: result});
            }
        });

        connection.end();
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send();
    }
});

app.post('/ads/like', function(req, res) {
    req.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        'Access-Control-Allow-Credentials': 'true'
    });

    try {
        if (req.user) {
            const connection = new Connetion((err) => {
                if (err) throw new Error(err);
            });

            let likes = [];
    
            connection.query(`select ad_like from Users where user_id = ${req.user}`, function(e, result) {
                if (e) throw new Error(e);
                likes.push(JSON.parse(result[0].ad_like));
                if (req.query.like) likes.push(req.query.id);
                else likes = likes.filter((likeId) => likeId != req.query.id);
            });
    
            connection.end((err) => {
                if (err) throw new Error(err);
                const con = new Connetion((error) => {
                    if (error) throw new Error(error);
                });

                con.query(`insert Users set ad_like = ${JSON.stringify(likes)} where id = ${req.user}`, function(e, _) {
                    if (e) throw new Error(e);
                    res.status(200);
                    res.send();
                });

                con.end();
            });
        } else {
            res.status(401);
            res.send();
        }
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send();
    }
})

app.listen(5000);