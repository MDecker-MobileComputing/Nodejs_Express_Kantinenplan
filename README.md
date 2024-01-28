# REST-API mit Nodejs und Express: Kantinenplan #

<br>

Einfacher Kantinenplan mit [Nodejs](https://nodejs.org) und [Express](https://expressjs.com):
Für ein Datum können mehrere Gerichte eingeplant werden.

<br>

Die Daten werden nicht persistiert, sondern nur im RAM gespeichert, gehen also beim Herunterfahren
der Anwendung verloren.

<br>

----

## REST-Endpunkte ##

<br>

Datumswerte haben immer das Format `YYYY-MM-DD`, z.B. `2024-01-31`.

<br>

### Gerichte für ein Datum abfragen ###

* Request-Typ: `HTTP-GET`
* Endpunkt: `/kantinenplan/abfrage/{datum}`
* Pfadvariable `{datum}` im Format `YYYY-MM-DD`, z.B. `2024-01-31`.
* HTTP-Status-Codes:
  * Bei Erfolg: `200 OK`
  * Ungültiges Datum: `400 BAD REQUEST`
  * Keine Gerichte für Datum hinterlegt: `404 NOT FOUND`

<br>

Antwort im JSON-Format:
```
{
    "datum": "2024-01-31",
    "gerichte": [ "Spaghetti mit Tomatensoße", "Salamipizza" ]
}
```

Wenn für den Tag nur ein Gericht eingeplant ist, dann referenziert
`gerichte` einen Array mit nur einem Element.
Wenn für den Tag kein Gericht eingeplant ist, dann referenziert
`gerichte` einen leeren Array.

<br>

### Ein Gericht für bestimmtes Datum hinzufügen ###

* Request-Typ: `HTTP-POST`
* Endpunkt: `/kantinenplan/einplanen/`
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


