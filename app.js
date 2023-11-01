const express = require('express');
const app = express();
const conn = require('./config/db');

app.use(express.json());

app.get('/read-mahasiswa', function (req, res ) {
    const queryStr = "SELECT * FROM mahasiswa ";
    conn.query(queryStr, (err, results) => {
        if (err) {
            console.log(err);
            res.error(err.sqlMessage, res);
        }else {
            res.status(200).json ({
                "success" : true,
                "message" : "sukses menampilkan data",
                "data"    : results 
            }); 
        }
    })
})

app.get('/read-mahasiswa-by-id', function (req, res ) {
    const param = req.query;
    const id = param.id;

    const queryStr = "SELECT * FROM mahasiswa WHERE id = ?";
    const values = [id];

    conn.query(queryStr, values,  (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success" : false,
                "message" : err.sqlMessage,
                "data"    : null
            });
        }else {
            res.status(200).json ({
                "success" : true,
                "message" : "sukses menampilkan data",
                "data"    : results
            });
        }
    })
})

app.post('/create-mahasiswa', function (req, res)  {
    console.log(req.body);
    const param = req.body;
    const name = param.name;
    const jurusan = param.jurusan;
    const now = new Date();

    const queryStr = "INSERT INTO mahasiswa (name, jurusan, created_at) VALUES (?, ?, ?)";
    const values = [name, jurusan, now];

    conn.query(queryStr, values, (err, results) => {
        if(err){
            console.log(err);
        } else {
            res.status(200).json({
                "success" : true,
                "message" : "Sukses menyimpan data",
                "data"    : results
            });
        }
    })
})

app.put('/update-mahasiswa', function (req, res){
    const param = req.body;
    const id = param.id;
    const name = param.name;
    const jurusan = param.jurusan;

    const queryStr = "UPDATE mahasiswa SET name = ?, jurusan = ? WHERE id = ? ";
    const values = [name, jurusan, id];

    conn.query(queryStr, values,  (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success" : false,
                "message" : err.sqlMessage,
                "data"    : null
            });
        }else {
            res.status(200).json ({
                "success" : true,
                "message" : "sukses menampilkan data",
                "data"    : results
            });
        }
    })
})

app.delete('/delete-mahasiswa', function (req, res) {
    const param = req.body;
    const id = param.id;
    

    const queryStr = "DELETE FROM mahasiswa WHERE id = ?";
    const values = [id];

    conn.query(queryStr, values,  (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success" : false,
                "message" : err.sqlMessage,
                "data"    : null
            });
        }else {
            res.status(200).json ({
                "success" : true,
                "message" : "sukses menampilkan data",
                "data"    : results
            });
        }
    })
})

app.listen(3001);