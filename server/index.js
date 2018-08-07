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
const SELECT1 = "SELECT * FROM issue WHERE ";
const SELECT2 = " = '";
const SELECT3 = "' AND category IN (SELECT mun_category.issue_category FROM municipality INNER JOIN mun_category ON municipality.mun_id = mun_category.mun_id WHERE municipality.mun_name = '";
const SELECT4 = "' AND municipality.mun_level = '";
const SELECT5 = "')";
const SELECT_MUN_LEVEL_1 = "SELECT mun_name FROM mun_category WHERE issue_category = '";
const SELECT_MUN_LEVEL_2 = "' AND (mun_name = '";
const SELECT_MUN_LEVEL_3 = "' OR mun_name = '";
const SELECT_MUN_LEVEL_4 = "' OR mun_name = '";
const SELECT_MUN_LEVEL_5 = "')";
const UPDATE_ISSUE_LEVEL = "UPDATE issue SET level = ? WHERE issueId = ?";;

// query for selecting level
const SELECTL1 = "SELECT * FROM municipality INNER JOIN mun_category ON municipality.mun_id=mun_category.mun_id WHERE (municipality.mun_name = \"";
const SELECTL2 = "\" AND municipality.mun_level = \"";
const SELECTL3 = "\" AND mun_category.issue_category = \"";
const SELECTL4 = "\") OR (municipality.mun_name = \"";
const SELECTL5 = "\" AND municipality.mun_level = \"";
const SELECTL6 = "\" AND mun_category.issue_category = \"";
const SELECTL7 = "\") OR (municipality.mun_name = \"";
const SELECTL8 = "\" AND municipality.mun_level = \"";
const SELECTL9 = "\" AND mun_category.issue_category = \"";
const SELECTL10 = "\")"

/*const connection = mysql.createConnection({
  host: '34.234.205.122',
  user: 'root',
  password: 'DWDStudent2017',
  database: '311app',
  port: 3306
});*/

const pool = mysql.createPool({
  connectionLimit : 10,
  host: '34.234.205.122',
  user: 'root',
  password: 'DWDStudent2017',
  database: '311app',
  port: 3306
});

const getConnection = (callback) => {
  pool.getConnection((err, connection) => {
    callback(err, connection);
  });
}

/*connection.connect(err => {
  if (err) {
    return err;
  } else {
    console.log("Connect Mysql Success");
  }
});*/

app.use(cors());
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
  res.send("go to /issues to see issues");
});

app.get('/issues', (req, res) => {
  getConnection((err, connection) => {
    if (err) {
      connection.release();
      return err;
    }
    connection.query(SELECT_ALL_ISSUES_QUERY, (err, results) => {
      connection.release();
      if (err) {
        return res.send(err)
      } else {
        return res.json({
          data: results
        })
      }
    })
  });
});

app.get('/munDetails/:level', (req, res) => {
  getConnection((err, connection) => {
    if (err) {
      connection.release();
      return err;
    }
    connection.query(SELECT_MUN_DETAILS_QUERY + req.params.level + "\"", (err, results) => {
      connection.release();
      if (err) {
        return res.send(err)
      } else {
        return res.json({
          data: results
        })
      }
    });
  });
});

app.get('/issueDetail/:issueIdInRouter', (req, res) => {
  getConnection((err, connection) => {
    if (err) {
      connection.release();
      return err;
    }
    connection.query(SELECT_SPECIFIC_ISSUE + req.params.issueIdInRouter, (err, results) => {
      connection.release();
      if (err) {
        return res.send(err)
      } else {
        return res.json({
          data: results
        })
      }
    });
  });
});

app.get('/issueComments/:issueIdInRouter', (req, res) => {
  getConnection((err, connection) => {
    if (err) {
      connection.release();
      return err;
    }
    connection.query(SELECT_COMMENTS_FOR_ISSUE + req.params.issueIdInRouter, (err, results) => {
      connection.release();
      if (err) {
        return res.send(err)
      } else {
        return res.json({
          data: results
        })
      }
    });
  });
});

app.get('/munDetailsIssues/:mlevel/:mname', (req, res) => {
  getConnection((err, connection) => {
    if (err) {
      connection.release();
      return err;
    }
    connection.query(SELECT1 + req.params.mlevel + SELECT2 + req.params.mname + SELECT3 + req.params.mname + SELECT4 + req.params.mlevel + SELECT5, (err, results) => {
      if (err) {
        return res.send(err)
      } else {
        return res.json({
          data: results
        })
      }
    });
  });
});

app.get('/munLevel/:category/:State/:City/:County', jsonParser, (req, res) => {
  getConnection((err, connection) => {
    if (err) {
      connection.release();
      return err;
    }
    // connection.query(SELECT_MUN_LEVEL_1 + req.params.category + SELECT_MUN_LEVEL_2 + req.params.state +  SELECT_MUN_LEVEL_3 + req.params.city + SELECT_MUN_LEVEL_4 + req.params.county + SELECT_MUN_LEVEL_5, (err, results) => {
    connection.query(SELECTL1 + req.params.State + SELECTL2 + "State" + SELECTL3 + req.params.category + SELECTL4 + req.params.County + SELECTL5 + "County" + SELECTL6 + req.params.category + SELECTL7 + req.params.City + SELECTL8 + "City" + SELECTL9 + req.params.category + SELECTL10,(err, results) => {
    if (err) {
        return res.send(err)
      } else {
        return res.json({
          data: results[0].mun_level
        })
      }
    });
  });
});

// POST /api/newIssue gets JSON bodies
app.post('/api/newIssue', jsonParser, (req, res) => {
  let postData = req.body;
  getConnection((err, connection) => {
    if (err) {
      connection.release();
      return err;
    }
    connection.query(INSERT_NEW_ISSUE, postData, (err, results) => {
      connection.release();
      if (err) {
        return res.send(err)
      } else {
        return res.json({
          data: results
        })
      }
    });
  });
});

// POST /api/newComment gets JSON bodies
app.post('/api/newComment', jsonParser, (req, res) => {
  let postData = req.body;
  getConnection((err, connection) => {
    if (err) {
      connection.release();
      return err;
    }
    connection.query(INSERT_NEW_COMMENT, postData, (err, results) => {
      connection.release();
      if (err) {
        return res.send(err)
      } else {
        return res.json({
          data: results
        })
      }
    });
  });
});

// POST /api/changeUp
app.post('/api/changeUp', jsonParser, (req, res) => {
  let postData = req.body;
  getConnection((err, connection) => {
    if (err) {
      connection.release();
      return err;
    }
    connection.query(UPDATE_UPV, [postData.upvote, postData.issueId], (err, results) => {
      connection.release();
      if (err) {
        return res.send(err)
      } else {
        return res.json({
          data: results
        })
      }
    });
  });
});

// POST /api/changeDown
app.post('/api/changeDown', jsonParser, (req, res) => {
  let postData = req.body;
  getConnection((err, connection) => {
    if (err) {
      connection.release();
      return err;
    }
    connection.query(UPDATE_DOWNV, [postData.downvote, postData.issueId], (err, results) => {
      connection.release();
      if (err) {
        return res.send(err)
      } else {
        return res.json({
          data: results
        })
      }
    });
  });
});

// POST /api/changeIssueLevel
app.post('/api/changeIssueLevel', jsonParser, (req, res) => {
  let postData = req.body;
  getConnection((err, connection) => {
    if (err) {
      connection.release();
      return err;
    }
    connection.query(UPDATE_ISSUE_LEVEL, [postData.munLevel, postData.issueId], (err, results) => {
      connection.release();
      if (err) {
        return res.send(err)
      } else {
        return res.json({
          data: results
        })
      }
    });
  });
});


if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file
  app.use(express.static('client/build'));

  // Express will serve up index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server listening on port 5000');
});

