const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const SELECT_ALL_ISSUES_QUERY = 'SELECT * from issue';
const SELECT_SPECIFIC_ISSUE = 'SELECT * from issue WHERE issueId=';
SELECT_COMMENTS_FOR_ISSUE = 'SELECT * from comment WHERE issueId=';

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

app.get('/', (req, res) => {
  res.send("go to /issues to see issues");
});

app.get('/issues', (req, res) => {
  connection.query(SELECT_ALL_ISSUES_QUERY, (err, results) => {
    if (err) {
      return res.send(err)
    } else {
      return res.json({
        data: [{"issueId":1,"time":"2000-01-01T05:00:00.000Z","heading":"Trash disposal","category":"Garbage storage","content":"Property owners must clean and sweep the sidewalks and gutters next to their property, including 18 inches from the curb into the street. Property owners who do not clean the sidewalks and gutters bordering their property may be issued a summons.","location":"Washington Square","urgent":1,"downvote":1,"upvote":3},{"issueId":2,"time":"1998-02-02T05:00:00.000Z","heading":"Damaged tree","category":"Streets and sidewalks","content":"The Department of Parks and Recreation (DPR) removes street trees and large branches that have fallen to the ground in front of houses, in parks, and in other public places. ","location":"Wasserman Center","urgent":0,"downvote":null,"upvote":2}]
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

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});

 