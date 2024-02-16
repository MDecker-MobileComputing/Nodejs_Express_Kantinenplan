const express = require("express");
const moment = require('moment'); // für Überprüfung von Datumsformat

const PORT_NUMMER = 8080;

/* "Datenbank" für Gerichte an einzelnen Tagen */
const datumZuGerichteMap = {

    "1900-01-01": [ "Spaghetti mit Tomatensoße", "Salamipizza", "Schokoladenpudding" ],
    "1900-01-31": [ "Risi Bisi", "Spinat mit Salzkartoffeln" ],
};

const DATUMSFORMAT = "YYYY-MM-DD";

/**
 * Überprüft, ob ein String ein gültiges Datum im Format `YYYY-MM-DD` ist.
 * Verwendet dazu die Bibliothek "moment". Funktion erkennt ungültiges
 * Format (z.B. fehlender Zahl für Monat) oder unmögliches Datum
 * (z.B. 32. Februar).
 *
 * @param {*} Zu überprüfendes Datum
 * @returns {boolean} `true`, wenn Datumsformat gültig ist, sonst `false`
 */
function istDatumGueltig(datumsString) {

    const m = moment(datumsString, DATUMSFORMAT, true); // true=strict
    return m.isValid();
}


const app = express();

// Damit Body von HTTP-POST-Request als JSON interpretiert wird
app.use( express.json() );

// statische Dateien (z.B. index.html) aus Unterordner "public/" bereitstellen
app.use( express.static("public") );


/*
 * Endpunkt für HTTP-GET-Request zur Abfrage der Gerichte für einen Tag.
 * Datum wird als Pfad-Parameter übergeben.
 */
app.get("/kantinenplan/v1/abfrage/:datum", (req, res) => {

    const datum = req.params.datum;

    if ( !istDatumGueltig(datum) ) {

        res.status(400)
           .json({
                "datum"    : datum,
                "erfolg"   : false,
                "nachricht": "Ungültiges Datum",
                "gerichte" : []
            });
        return;
    }

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


/*
 * Endpunkt für HTTP-POST-Request zum Einplanen eines Gerichts für einen Tag.
 */
app.post("/kantinenplan/v1/einplanen/", (req, res) => {

    const datum = req.body.datum;

    if ( !istDatumGueltig(datum) ) {

        res.status(400)
           .json({
                "datum"    : datum,
                "erfolg"   : false,
                "nachricht": "Ungültiges Datum"
           });
        return;
    }

    const gericht = req.body.gericht;

    let nachricht = "";
    const gerichte = datumZuGerichteMap[datum];
    if (!gerichte) {

        datumZuGerichteMap[datum] = [ gericht ];
        nachricht = "Erstes Gericht für Tag eingeplant";

    } else {

        gerichte.push(gericht);
        nachricht = `Gericht als ${gerichte.length}. Gericht für Tag eingeplant`;
    }

    res.status(201)
       .json({
            "datum"    : datum,
            "erfolg"   : true,
            "nachricht": nachricht
        });
});



// Web-Server starten
app.listen( PORT_NUMMER,
            () => { console.log(`Web-Server lauscht auf Port ${PORT_NUMMER}`); }
          );
