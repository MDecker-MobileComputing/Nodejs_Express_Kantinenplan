const express = require("express");

const app = express();

const PORT_NUMMER = 8080;

/* "Datenbank" für Gerichte */
const datumZuGerichteArray = {

    "1900-01-01": [ "Spaghetti mit Tomatensoße", "Salamipizza" ],
    "1900-01-31": [ "Risi Bisi", "Spinat mit Salzkartoffeln" ],
};


// statische Dateien (z.B. index.html) aus Unterordner "public/" bereitstellen
app.use( express.static("public") );


app.listen( PORT_NUMMER,
            () => { console.log(`Web-Server lauscht auf Port ${PORT_NUMMER}`); }
          );
