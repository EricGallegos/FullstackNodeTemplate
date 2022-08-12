const path        = require('path');
const express     = require('express');
const mongoose    = require('mongoose');
const dotenv      = require('dotenv');
const morgan      = require('morgan');                  //Log handling
const exphbs      = require('express-handlebars');      // view engine
const passport    = require('passport');                // auth
const session     = require('express-session');         //
const MongoStore  = require('connect-mongo');
const connectDB   = require('./config/db');

// Load Config
dotenv.config({ path: './config/config.env'})

// Passport config
require('./config/passport')(passport);

connectDB();
const app = express();

// Body Parser
app.use(express.urlencoded( {extended: false} ))

// Logging
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

// Handlebars Helpers
const { formatDate } = require('./helpers/hbs')

// Handlebars
app.engine('.hbs', exphbs.engine({
  helpers: {
    formatDate,
  },
  defaultLayout: 'main',
  extname: '.hbs',
}));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    mongoUrl: process.env.MONGO_URI,
   }),
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/content', require('./routes/content'))

const PORT = process.env.PORT || 3001;

app.listen(PORT,
   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
 )
