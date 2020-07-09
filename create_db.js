var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "BarApp"
});



con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var users = "CREATE TABLE Users (id  INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), wallet INT NOT NULL DEFAULT 0"
);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });
