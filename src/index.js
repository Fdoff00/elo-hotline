const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const { nextTick } = require('process');
const flash = require('connect-flash');
const  session = require('express-session');
const MySQLStore = require('express-mysql-session');
const {database} = require('./keys');

// initializations Me quedé instalando la base de datos. :3
const app = express();

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); //Ruta de views.
app.engine('.hbs', exphbs({//Configuramos el handlebars.
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// Middlewares
/*
app.use(session({
    secret: 'fastmysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());*/
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


// Global Variables
app.use((req,res,next) =>{
    //app.locals.success = req.flash('success');
    next();
});

// Routes
app.use(require('./routes'));
app.use(require('./routes/autentication'));
app.use('/links',require('./routes/links'));


// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});