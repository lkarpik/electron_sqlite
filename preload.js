// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }



  const sqlite3 = require('sqlite3').verbose();

  const db = new sqlite3.Database('./database/file.db');

  db.serialize(function () {
    db.run("CREATE TABLE Products (name, barcode, quantity)", (err) => {
      console.log(err);
    });

    // db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product001', 'xxxxx', 20]);
    // db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product002', 'xxxxx', 40]);
    // db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product003', 'xxxxx', 60]);

    db.each("SELECT * FROM Products WHERE quantity=40", function (err, row) {
      console.log(row);
      replaceText(`newText`, `${row.name} Nowy row`);
    });
  });

  db.close();

});