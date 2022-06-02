const express = require('express');
const app = express();
const PORT = 8000;
// const urlencodedParser = express.urlencoded({extended: false});
const jsonParser = express.json();
const middleware = require('./middlewares.js');

app.use(express.static(__dirname));//  папка public

app.post('/meetings', jsonParser, middleware);
app.post('/participants', jsonParser, middleware);

app.listen(PORT, () => {
    console.log(`server has been started on port ${PORT}...`);
});