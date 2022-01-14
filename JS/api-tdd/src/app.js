var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
const { appPort } = require('../config.js').microPort;
const { url: appUrl } = require('../config.js').frontApp;
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var clubRouter = require("./routes/club.js")
const { sequelize } = require('./db/index.js')
const cors = require("cors");
var app = express()

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())


async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}


async function init() {
    await assertDatabaseConnectionOk();
    console.log(`Starting Sequelize + Express example on port ${appPort}...`);
    app.listen(appPort, () => {
        console.log(`Express server started on port ${appPort}.`);
    });
}

app.use(cors({
    origin: `${appUrl}`,
    // allowedHeaders: ['Content-Type', 'Set-Cookie'],
    // credentials: true,
    // methods: ['POST']
}))

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.disable("x-powered-by");
// app.use(express.static(path.join(__dirname, 'public')));
// app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/', indexRouter);
app.use('/club', clubRouter)
app.get('*', function (req, res) {
    res.status(404).send('Joey: How YOU doin?? ');
});

init();

module.exports = app;
