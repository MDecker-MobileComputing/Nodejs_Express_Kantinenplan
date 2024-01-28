const express = require("express");

const app = express();

const PORT_NUMMER = 8080;

/* "Datenbank" für Gerichte */
const datumZuGerichteMap = {

    "1900-01-01": [ "Spaghetti mit Tomatensoße", "Salamipizza", "Schokoladenpudding" ],
    "1900-01-31": [ "Risi Bisi", "Spinat mit Salzkartoffeln" ],
};


/*
 * Endpunkt für HTTP-GET-Request zur Abfrage der Gerichte für einen Tag.
 * Datum wird als Pfad-Parameter übergeben.
 */
app.get("/kantinenplan/abfrage/:datum", (req, res) => {

    const datum    = req.params.datum;
    const gerichte = datumZuGerichteMap[datum];

    if (gerichte) {

        res.status(200)
           .json({
                "datum"    : datum,
                "erfolg"   : true,
                "nachricht": `${gerichte.length} Gericht(e) gefunden`,
                "gerichte" : gerichte,
            });

    } else {

        res.status(404)
           .json({
                "datum"    : datum,
                "erfolg"   : false,
                "nachricht": "Keine Gerichte für diesen Tag gefunden",
                "gerichte" : []
            });
    }
});

// Damit Body von HTTP-POST-Request als JSON interpretiert wird
app.use( express.json() );

app.post("/kantinenplan/einplanen/", (req, res) => {

    const datum = req.body.datum;
    const gericht = req.body.gericht;

    datumZuGerichteMap[datum] = [ gericht ];

    res.status(201)
       .json({
            "datum"    : datum,
            "erfolg"   : true,
            "nachricht": "Gericht wurde eingeplant"
        });
});


// statische Dateien (z.B. index.html) aus Unterordner "public/" bereitstellen
app.use( express.static("public") );

// Web-Server starten
app.listen( PORT_NUMMER,
            () => { console.log(`Web-Server lauscht auf Port ${PORT_NUMMER}`); }
          );
