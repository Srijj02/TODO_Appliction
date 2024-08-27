const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors=require('cors');
const path=require('path');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')))


const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'todos'
})

database.connect((err) => {
    if (err) console.log('error in establishing the connection');
    else console.log('connection establised');
})

app.get('/tasks', (req, res) => {
    const query = 'SELECT * FROM todo_table';
    database.query(query, (err, result) => {
        if (err) {
            res.status(500).json({
                error: "error in fetching data"
            })
        }
        else {
            res.json(result);
        }
    })
})

// (ID INT PRIMARY KEY, Task VARCHAR(255), PerformDate VARCHAR(255), Discription VARCHAR(255));

app.post('/tasks', (req, res) => {
    const { Task, PerformDate, Discription } = req.body;
    const query = 'INSERT INTO todo_table(Task,PerformDate,Discription) VALUE(?,?,?)';
    database.query(query, [Task, PerformDate, Discription], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: 'error in posting data'
            })
        }
        else {
            res.json({
                ID:result.insertId,
                Task,
                PerformDate,
                Discription
            })
        }
    })
})

app.put('/tasks/:id',(req,res)=> {
    const {id}=req.params;
    const { Task, PerformDate, Discription } = req.body;
    const query='UPDATE todo_table SET Task=?,PerformDate=?,Discription=? WHERE ID=?';
    database.query(query,[Task, PerformDate, Discription,id],(err,result)=> {
        if(err) {
            console.log(err);
            res.status(500).json({
                error:'error in updating data'
            })
        }
        else {
            res.json({
                messege:'successfully updated'
            })
        }
    })
})


app.delete('/tasks/:id',(req,res)=> {
    const {id}=req.params;
    const query='DELETE FROM todo_table WHERE ID=?';
    database.query(query,[id],(err,result)=> {
        if(err) {
            console.log(err);
            res.status(500).json({
                error:'error in deleting'
            })
        }
        else {
            res.json({
                messege:"deleted succesfully"
            })
        }
    })
})

app.listen(5000, () => {
    console.log("listening at port 5000");
})
