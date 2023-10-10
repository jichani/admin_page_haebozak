require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require('mysql');

// .env 파일에 있는 환경변수들을 사용합니다.
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // PORT가 이미 위에서 사용되었으므로 DB_PORT 등으로 변경해주세요.
  database: process.env.DB_DATABASE
})
connection.connect();

// 파일을 가져오기 위해서는 multer가 필요
const multer = require('multer');
const upload = multer({ dest: './upload' });

app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM users WHERE isDeleted = 0",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO users VALUES (null, ?, ?, ?, ?, null, now(), 0)';
  let image = 'http://localhost:5000/image/' + req.file.filename;
  let email = req.body.email;
  let psword = req.body.psword;
  let username = req.body.username;
  let params = [email, psword, username, image];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
      console.log(err);
    })
})

app.delete('/api/customers/:id', (req, res) => {
  let sql = 'UPDATE users SET isDeleted = 1 WHERE user_id = ?';
  let params = [req.params.id];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    })
})

app.listen(port, () => console.log(`Listening on port ${port} :)`));