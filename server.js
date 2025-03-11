require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const passport = require("passport");
const findOrCreate = require('mongoose-findorcreate');
const https = require('node:https');

// Configuración express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));

// Configuración de sesión
app.use(session({
    secret: "Nuestro pequeño secreto.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// ENTRADAS ////////////////////////////////////
// Ejemplo de datos de entradas
const todasEntradas = [
    { fecha: "11/03/2025", titulo: "Entrada 1", contenido: "Contenido de la entrada 1" },
    { fecha: "12/03/2025", titulo: "Entrada 2", contenido: "Contenido de la entrada 2" }
];

// serializar - deserializar /////////////////
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});
// serializar - deserializar /////////////////

// Configuración de fecha /////////
let date = new Date();
let dia = date.getDate();
let mes = date.getMonth() + 1;
let año = date.getFullYear();
let fechaCompleta = dia + "/" + mes + "/" + año;
// Configuración de fecha /////////

// home
app.route("/")
.get(function(req, res) {
    res.render("home", { todasEntradas: todasEntradas });
});


// sobre nosotros
app.get("/nosotros", function(req, res) {
    res.render("nosotros");
});

// Gracias
app.get("/gracias", function(req, res) {
    res.render("gracias");
});

// Manejo de errores
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, function() {
    console.log("servidor iniciado en puerto 3000");
});