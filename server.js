const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// server listen to Port

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

// GET method route
app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    res.send({ quote: randomQuote });
  });

// Get method all routes

app.get('/api/quotes', (req, res) => {
    const nameCheck = quotes.filter(name => {
        return name.person === req.query.person;
    });
    if (req.query.person) {
        res.send({ quotes: nameCheck });
    } else {
    res.send({ quotes: quotes });
    }
});

//post method call

app.post('/api/quotes', (req, res) => {
    const newQuote = req.query.quote;
    const newPerson = req.query.person;
    if(newQuote != '' && newPerson != '') {
        quotes.push({ quote: newQuote, person: newPerson });
        res.send({ quote: { quote: newQuote, person: newPerson } });
    } else {
        res.sendStatus(400);
    }
});