// Importing dependencies
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// Establishing the connection to the database
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initializing an instance of the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Setting up the Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Setting up sessions (to expire after 24hrs)
const sess = {
    secret: process.env.SECRET,
    cookie: {
        maxAge: 86400000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// Telling the app to use the session parameters specified above
app.use(session(sess));

// Informing Express.js of which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Enabling the use of json and url encoded data, as well as convenient access to static assets
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Setting up the routes 
app.use(routes);

// Starts the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App now listening at port ${PORT}`))
});