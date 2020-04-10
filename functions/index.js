const admin = require('firebase-admin');
const functions = require('firebase-functions');
require('dotenv').config();
const app = require('express')();
const cors = require('cors');
app.use(cors());
const {
    validateRequestPayload,
    validateGrammerlets
} = require('./util/util');
const {
    addData,
    getData
} = require('./helper/firestore');

admin.initializeApp();

const db = admin.firestore();
const regionalFunctions = functions.region('asia-northeast1');

app.get('/v1/categories/:category_id', async (req, res) => {
    const categoryId = req.params.category_id;
    let category = {};
    try{
        category = await getData(db, categoryId)
    } catch (e) {
        console.error('An error occurred while fetching data', JSON.stringify(e));
        return res.status(500).send({
            message: 'an error occurred',
            error: e
        });
    }

    return res.status(200).send(category)

});

app.post('/v1/categories', async (req, res) => {
    const requestPayload = req.body;

    const errors = validateRequestPayload(requestPayload);
    if (errors.length > 0) {
        return res.status(400).send(errors);
    }

    try {
        validateGrammerlets(requestPayload.grammerlets);
    } catch (error) {
        return res.status(400).send({
            message: 'an error occurred',
            error: error.msg
        });
    }

    let response;
    try {
        response = await addData(db, requestPayload);
    } catch (e) {
        console.error('An error occurred while adding data', JSON.stringify(e));
        return res.status(500).send({
            message: 'an error occurred',
            error: e
        });
    }
    return res.status(200).send(response);

});

exports.api = regionalFunctions.https.onRequest(app);
