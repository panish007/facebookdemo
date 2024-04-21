const axios = require('axios');
const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Enter the Page Access Token from the previous step
const FACEBOOK_PAGE_ACCESS_TOKEN = 'p7pcrtdfgnD6uZBua0aNAmfLB50SFL8ElHxoHmUH9vFFhZAJ7XvL37ZAC8KD8h3At0nCE2PPsSnj60AaBlZAur43UZAP7VHZB29ZBjMbPRnVdf9nGIYzZAadyOquMTJpx3jJj3bZA513hLckJ1YZD';

// Accept JSON POST body
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("hello this api is calling to you")
})

// GET /webhook
app.get('/webhook', (req, res) => {
    // Facebook sends a GET request
    // To verify that the webhook is set up
    // properly, by sending a special challenge that
    // we need to echo back if the "verify_token" is as specified
    if (req.query['hub.verify_token'] === 'CUSTOM_WEBHOOK_VERIFY_TOKEN') {
        res.send(req.query['hub.challenge']);
        return;
    }
})

// POST /webhook
app.post('/webhook', async (req, res) => {
    console.log(req.body)
    // Facebook will be sending an object called "entry" for "leadgen" webhook event
    // if (!req.body.entry) {
    //     return res.status(500).send({ error: 'Invalid POST data received' });
    // }

    // // Travere entries & changes and process lead IDs
    // for (const entry of req.body.entry) {
    //     for (const change of entry.changes) {
    //         // Process new lead (leadgen_id)
    //         await processNewLead(change.value.leadgen_id);
    //     }
    // }

    // Success
    res.send(req.body);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

