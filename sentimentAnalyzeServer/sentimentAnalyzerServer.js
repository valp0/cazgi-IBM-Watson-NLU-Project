const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/", (req, res) => {
    res.render('index.html');
});

app.get("/url/emotion", (req, res) => {
    let nlu = getNLUInstance();
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'emotion': {}
        }
    };

    nlu.analyze(analyzeParams).then(analysisResults => {
        let output = analysisResults.result.emotion.document.emotion;
        // let output = analysisResults;
        console.log(output);
        return res.send(output);
    }).catch(err => {
        console.log('Error: ' + err);
        return res.send("Error: " + err.toString());
    });
});

app.get("/url/sentiment", (req, res) => {
    let nlu = getNLUInstance();
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'sentiment': {}
        }
    };

    nlu.analyze(analyzeParams).then(analysisResults => {
        let output = analysisResults.result.sentiment.document;
        console.log(output);
        return res.send(output);
    }).catch(err => {
        console.log('Error: ' + err);
        return res.send("Error: " + err.toString());
    });
});

app.get("/text/emotion", (req, res, next) => {
    let nlu = getNLUInstance();

    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'emotion': {
            }
        }
    };

    nlu.analyze(analyzeParams).then(analysisResults => {
        let output = analysisResults.result.emotion.document.emotion;
        // let output = analysisResults;
        console.log(output);
        return res.send(output);
    }).catch(err => {
        console.log('Error: ' + err);
        return res.send("Error: " + err.toString());
    });

});

app.get("/text/sentiment", (req, res) => {
    let nlu = getNLUInstance();
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'sentiment': {}
        }
    };

    nlu.analyze(analyzeParams).then(analysisResults => {
        let output = analysisResults.result.sentiment.document;
        console.log(output);
        return res.send(output);
    }).catch(err => {
        console.log('Error: ' + err);
        return res.send("Error: " + err.toString());
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    const NLUV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const nlu = new NLUV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key
        }),
        serviceUrl: api_url
    });

    return nlu;
}
