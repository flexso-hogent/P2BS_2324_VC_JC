const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Functie om gegevens van CSV naar de database te schrijven
function writeToDatabase(filename, tableName, db) {
  const filePath = path.join(__dirname, 'db', 'csv', filename);
  console.log('Bestandspad:', filePath);

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      // Voeg de gegevens toe aan de database
      const columns = Object.keys(row).join(', ');
      const values = Object.values(row).map(value => `'${value}'`).join(', ');
      db.run(`INSERT INTO ${tableName} (${columns}) VALUES (${values})`, (err) => {
        if (err) {
          console.error(`Fout bij invoegen van gegevens in tabel ${tableName}: ${err.message}`);
        }
      });
    })
    .on('end', () => {
      console.log(`Gegevens van ${filename} zijn succesvol toegevoegd aan de database`);
    });
}

// Open de databaseverbinding
let db = new sqlite3.Database(path.join(__dirname, 'db', 'my-events.db'));

// Roep de functie writeToDatabase aan voor elk CSV-bestand
writeToDatabase('my.events-Events.csv', 'Events', db);
writeToDatabase('my.events-Sessions.csv', 'Sessions', db);
writeToDatabase('my.events-Users.csv', 'Users', db);

// Sluit de databaseverbinding wanneer het proces is voltooid
db.close();

/*
const fs = require('fs');
const csv = require('csv-parser');
const sqlite3 = require('sqlite3').verbose();

// Functie om gegevens van CSV naar de database te schrijven
function writeToDatabase(filename, tableName, db) {
  const filePath = `csv/${filename}`;
  console.log('Bestandspad:', filePath);

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      // Voeg de gegevens toe aan de database
      const columns = Object.keys(row).join(', ');
      const values = Object.values(row).map(value => `'${value}'`).join(', ');
      db.run(`INSERT INTO ${tableName} (${columns}) VALUES (${values})`, (err) => {
        if (err) {
          console.error(`Fout bij invoegen van gegevens in tabel ${tableName}: ${err.message}`);
        }
      });
    })
    .on('end', () => {
      console.log(`Gegevens van ${filename} zijn succesvol toegevoegd aan de database`);
    });
}

// Open de databaseverbinding
let db = new sqlite3.Database('my-events.db');

// Roep de functie writeToDatabase aan voor elk CSV-bestand
writeToDatabase('my.event-Events.csv', 'Events', db);
writeToDatabase('my.event-Sessions.csv', 'Sessions', db);
writeToDatabase('my.event-Users.csv', 'Users', db);

// Sluit de databaseverbinding wanneer het proces is voltooid
db.close();
*/