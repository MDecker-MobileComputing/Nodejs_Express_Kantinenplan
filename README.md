# REST-API mit Nodejs und Express: Kantinenplan #

<br>

Einfacher Kantinenplan mit [Nodejs](https://nodejs.org) und [Express](https://expressjs.com):
Für ein Datum können mehrere Gerichte eingeplant werden.

<br>

Die Daten werden nicht persistiert, sondern nur im RAM gespeichert, gehen also beim Herunterfahren
der Anwendung verloren.

<br>

----

## Verwendung ##

<br>

Nach Klonen/Download des Repos: `npm install`

Webserver mit REST-API starten: `npm start`

<br>

----

## REST-Endpunkte ##

<br>

Datumswerte haben immer das Format `YYYY-MM-DD`, z.B. `2024-01-31`.

<br>

### Gerichte für ein Datum abfragen ###

* Request-Typ: `HTTP-GET`
* Endpunkt: `/kantinenplan/v1/abfrage/{datum}`
* Pfadvariable `{datum}` im Format `YYYY-MM-DD`, z.B. `2024-01-31`.
* HTTP-Status-Codes:
  * Bei Erfolg: `200 OK`
  * Ungültiges Datum: `400 BAD REQUEST`
  * Keine Gerichte für Datum hinterlegt: `404 NOT FOUND`

<br>

Antwort im JSON-Format für den Erfolgsfall:
```
{
    "datum": "2024-01-31",
    "erfolg": true,
    "nachricht: "2 Gericht(e) gefunden",
    "gerichte": [ "Spaghetti mit Tomatensoße", "Salamipizza" ]
}
```

<br>

Wenn für den Tag nur ein Gericht eingeplant ist, dann referenziert
`gerichte` einen Array mit nur einem Element.
Wenn für den Tag kein Gericht eingeplant ist, dann referenziert
`gerichte` einen leeren Array.


<br>

Antwort im JSON-Format für den Fehlerfall (1):
```
{
    "datum": "2024-01-31",
    "erfolg": false,
    "nachricht: "Keine Gerichte für diesen Tag gefunden",
    "gerichte": []
}
```

<br>

Antwort im JSON-Format für den Fehlerfall (2):
```
{
    "datum": "2024-02-31",
    "erfolg": false,
    "nachricht: "Ungültiger Datumswert übergeben",
    "gerichte": []
}
```

<br>

Der Schlüssel `nachricht` referenziert also eine Fehlermeldung,
wenn die Abfrage nicht erfolgreich war.

<br>


<br>

### Ein Gericht für bestimmtes Datum hinzufügen ###

* Request-Typ: `HTTP-POST`
* Endpunkt: `/kantinenplan/v1/einplanen/`
* HTTP-Status-Codes:
  * Bei Erfolg: `201 CREATED`
  * Ungültiger Request: `400 BAD REQUEST`

<br>

Payload im JSON-Format:
```
{
    "datum": "2024-01-31",
    "gericht": "Spaghetti mit Tomatensoße"
}
```

Der Endpunkt kann für ein Datum mehrfach aufgerufen werden, nämlich um mehrere
Gerichte für den Tag zu definieren.

<br>

----

## License ##

<br>

See the [LICENSE file](LICENSE.md) for license rights and limitations (BSD 3-Clause License)
for the files in this repository.

<br>
