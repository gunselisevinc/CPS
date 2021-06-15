const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const path = require('path');

// parse application/json
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Server listening
app.listen(5000, () => {
  console.log('Server started on port 5000...');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'indexModelling.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'indexPrediction.html'));
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'C:\\Users\\senas\\github\\xampp\\htdocs\\CPS\\restful-api\\model-image');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
//C:\\Users\\senas\\github\\xampp\\htdocs\\CPS\\restful-api\\model-image

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

app.use(express.static('model-image'));

//create database connection
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cps'
});

//connect to database
con.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected...');
});

//show all models
app.get('/models', (req, res) => {
  let sql = "SELECT * FROM models";
  let query = con.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

//show single model
app.get('/models/:model_name', (req, res) => {
  let sql = "SELECT * FROM models WHERE model_name=" + "\"" + req.params.model_name + "\"";
  let query = con.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify(results));
  });
});

//add new row
app.post('/newModel', upload.single('mymodel_image'), (req, res) => {
  console.log(JSON.stringify(req.file));
  let data = {
    width: req.body.width,
    height: req.body.height,
    image_path: req.file.path,
    model_name: req.body.model_name,
    stimuli_name: req.body.stimuli_name,
    grid_x: req.body.grid_x,
    grid_y: req.body.grid_y,
    autistic_path: req.body.autistic_path,
    control_path: req.body.control_path,
    flag: req.body.flag,
    description: req.body.description
  };
  let sql = "INSERT INTO models SET ?";
  let query = con.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});

//delete row with ID
app.delete('/modelRemove/:model_name', (req, res) => {
  let sql = "DELETE FROM models WHERE model_name=" + "\"" + req.params.model_name + "\"";
  let query = con.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({
      "status": 200,
      "error": null,
      "response": results
    }));
  });
});
