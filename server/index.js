const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const SELECT_ALL_ISSUES_QUERY = 'SELECT * from issue';
const SELECT_SPECIFIC_ISSUE = 'SELECT * from issue WHERE issueId=';
const SELECT_COMMENTS_FOR_ISSUE = 'SELECT * from comment WHERE issueId=';
const INSERT_NEW_ISSUE = "INSERT INTO issue SET ?";
const INSERT_NEW_COMMENT = "INSERT INTO comment SET ?";
const UPDATE_UPV = "UPDATE issue SET upvote = ? WHERE issueId = ?";
const UPDATE_DOWNV = "UPDATE issue SET downvote = ? WHERE issueId = ?";
const SELECT_MUN_DETAILS_QUERY = "SELECT * FROM municipality WHERE mun_level = \"";
const SELECT_ISSUES_FOR_MUN = "SELECT municipality.mun_id AS id, mun_category.issue_category AS category FROM municipality INNER JOIN mun_category ON municipality.mun_id = mun_category.mun_id WHERE municipality.mun_level = \"";
const SELECT_ISSUES_FOR_MUN2 = "\" AND municipality.mun_name = \"";
const SELECT_ISSUES_MUN_POST = "SELECT municipality.mun_id AS id, mun_category.issue_category AS category FROM municipality INNER JOIN mun_category ON municipality.mun_id = mun_category.mun_id WHERE municipality.mun_level = ? AND municipality.mun_name = ?"
// const SELECT_ISSUES_MUN_POST = "SELECT * FROM municipality INNER JOIN mun_category ON municipality.mun_id = mun_category.mun_id WHERE municipality.mun_level = ? AND municipality.mun_name = ?"


const connection = mysql.createConnection({
  host: '34.234.205.122',
  user: 'root',
  password: 'DWDStudent2017',
  database: '311app',
  port: 3306
});

connection.connect(err => {
  if (err) {
    return err;
  } else {
    console.log("Connect Mysql Success");
  }
});

app.use(cors());
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
  res.send("go to /issues to see issues");
});

app.get('/issues', (req, res) => {
  connection.query(SELECT_ALL_ISSUES_QUERY, (err, results) => {
    if (err) {
      return res.send(err)
    } else {
      return res.json({
        data: results
      })
    }
  });
});

app.get('/munDetails/:level', (req, res) => {
  connection.query(SELECT_MUN_DETAILS_QUERY + req.params.level + "\"", (err, results) => {
    if (err) {
      return res.send(err)
    } else {
      return res.json({
        data: results
      })
    }
  });
});

app.get('/issueDetail/:issueIdInRouter', (req, res) => {
  connection.query(SELECT_SPECIFIC_ISSUE + req.params.issueIdInRouter, (err, results) => {
    if (err) {
      return res.send(err)
    } else {
      return res.json({
        data: results
      })
    }
  });
});

app.get('/issueComments/:issueIdInRouter', (req, res) => {
  connection.query(SELECT_COMMENTS_FOR_ISSUE + req.params.issueIdInRouter, (err, results) => {
    if (err) {
      return res.send(err)
    } else {
      return res.json({
        data: results
      })
    }
  });
});

// app.get('/munDetails/:mlevel/:mname', (req, res) => {
//   connection.query(SELECT_ISSUES_FOR_MUN + req.params.mlevel + SELECT_ISSUES_FOR_MUN2 + req.params.mname + "\"", (err, results) => {
//     if (err) {
//       return res.send(err)
//     } else {
//       return res.json({
//         data: results
//       })
//     }
//   });
// });

// POST /api/newIssue gets JSON bodies
app.post('/api/newIssue', jsonParser, (req, res) => {
  let postData = req.body;
  connection.query(INSERT_NEW_ISSUE, postData, (err, results) => {
    if (err) {
      return res.send(err)
    } else {
      return res.json({
        data: results
      })
    }
  });
});

// POST /api/newComment gets JSON bodies
app.post('/api/newComment', jsonParser, (req, res) => {
  let postData = req.body;
  connection.query(INSERT_NEW_COMMENT, postData, (err, results) => {
    if (err) {
      return res.send(err)
    } else {
      return res.json({
        data: results
      })
    }
  });
});

// POST /api/changeUp
app.post('/api/changeUp', jsonParser, (req, res) => {
  let postData = req.body;
  connection.query(UPDATE_UPV, [postData.upvote, postData.issueId], (err, results) => {
    if (err) {
      return res.send(err)
    } else {
      return res.json({
        data: results
      })
    }
  });
});

// POST /api/changeDown
app.post('/api/changeDown', jsonParser, (req, res) => {
  let postData = req.body;
  connection.query(UPDATE_DOWNV, [postData.downvote, postData.issueId], (err, results) => {
    if (err) {
      return res.send(err)
    } else {
      return res.json({
        data: results
      })
    }
  });
});

// POST /api/issuesMun
app.post('/api/issuesMun', jsonParser, (req, res) => {
  let postData = req.body;
  connection.query(SELECT_ISSUES_MUN_POST, [postData.mun_level, postData.mun_name], (err, results) => {
    if (err) {
      return res.send(err)
    } else {
      // console.log(results[0].id + " from index.js");
      Object.keys(results).forEach(function(key) {
        var row = results[key];
        console.log(row.id)
      });
      return res.json({
        data: results
      })
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server listening on port 5000');
});

