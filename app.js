const express = require("express");

const app = express();

const PORT_NUMMER = 8080;



app.listen( PORT_NUMMER,
            () => { console.log(`Web-Server lauscht auf Port ${PORT_NUMMER}`); }
          );
