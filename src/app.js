const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    req.config = require('./config');
    next()
});

require('fs').readdirSync(path.join(__dirname + '/routes')).forEach(function(dir) {
    require('fs').readdirSync(path.join(__dirname + '/routes/' + dir)).forEach(function(file) {
        const route = require(path.join(__dirname + '/routes/' + dir + '/' + file));
        app[route.method.toLowerCase()](route.path, route.handler);
    });
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));

module.exports = app;