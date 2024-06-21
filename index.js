const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const config = require('./config/config');
require('dotenv').config();

const app= express();

//routes
const routes= require('./routes/index');

//Middlewares
app.use(morgan());
app.use(helmet());
app.use(express.json());
app.use(compression());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/uploads',express.static('uploads'));

app.use(cors({
    origin: '*'
}));

// const corsOptions = {
//     origin: 'https://yourtrusteddomain.com',
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

   // Rate Limiting
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

    //  Session Management
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     cookie: {
//         secure: true, // Set to true if using HTTPS
//         httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
//         maxAge: 1000 * 60 * 60 * 24 // 1 day
//     }
// }));

     // CSRF Protection
// const csrfProtection = csrf({ cookie: true });
// app.use(csrfProtection);

// Database Connection

mongoose.connect(config.mongoURI)
.then(()=>console.log('MongoDB connected'))
.catch(err=> console.log(err));

app.use('/',routes);


module.exports= app