const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

//? Handlebars set-up
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

//? express set-up
app.set('view engine', 'hbs');
//? express middlewares
app.use((request, response, next) => {
    let now = new Date().toString();
    let log = `${now}: ${request.method} ${request.url}`;
    
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');

    next();
});

//? public 
app.use(express.static(__dirname + '/public'));
//? express request handlers
app.get('/', (request, respond) => {
   respond.render('home.hbs', {
       pageTitle: 'Home Page',
       welcomeMsg: 'Hi th3r3!'
   });
});

app.get('/about', (request, respond) => {
    respond.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (request, respond) => {
    respond.render('projects.hbs', {
        pageTitle: 'Portfolio',
    });
});

app.get('/bad', (request, respond) => {
    respond.send({
        errorMessage: 'BAD REQUEST'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
