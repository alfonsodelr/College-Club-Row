/////////Postgress helpful tips///////////////////////////
//start db: C:\Program Files\PostgreSQL\14>postgres -D data
// \l: show all db
// \c changelab:    connect to changelab db
// \dt:  list all tables
// SELECT * FROM clients
//////////////////////////////////////////////////////////
const DB = require('./db.js')
var ClubModle = require("../db/model/club.js")

const newDB = new DB();
const connection = newDB.init();
var Club = ClubModle(connection);
newDB.isConnected(connection)
module.exports = { connection, Club };
