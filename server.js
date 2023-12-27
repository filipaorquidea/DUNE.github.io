const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
const path = require('path')

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const getArticle = require('./loaders/getArticle');

// Ignore requests for favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


app.all('*', function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/:type/:num?', function (req, res) {
    const type = req.params.type;
    const num = req.params.num || 1;

    if (num === undefined || isNaN(num) || num <= 0) {
        // Handle the case where num is not a valid positive number
        res.status(400).json({ error: 'Bad Request: num parameter must be a valid positive number.' });
        return;
    }

    // Log the request parameters
    console.log('Request received:', { type, num });

    // Call your getArticle function and send the response
    res.status(200).send(getArticle.getRandom(type, num));

    // Log the data you are sending in response
    console.log('Sending response:', { type, num });
});



app.get('/:type/id/:id?', function (req, res) {
    res.status(200).send(getArticle.getArticle(req.params.type, req.params.id || 1));
});


app.listen(PORT, function () {
    console.log('Server running on port', PORT);
});

//const CONNECTION_URL = 'mongodb+srv://yashwalia:yashwalia1002@cluster0.4e5gp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

/*mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false);*/