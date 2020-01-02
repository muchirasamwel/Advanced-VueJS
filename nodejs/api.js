let express = require('express');
let apidata = require("./apidatastore");
let bodypaser = require('body-parser');
let corrs = require('cors');
let app = express();
let port = 8000;
let jwt = require('jsonwebtoken');
//app.use(corrs);
app.use(bodypaser.json());
app.use(bodypaser.urlencoded({extended: false}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
// app.use(function(req, res) {
//     let err = new Error('Not Found');
//     err.status = 404;
//     console.log("No image in this path, throw error");
//     res.sendFile("./pages/404.html",{ root: __dirname });
// });
app.get("/smb_api/accounts", (req, resp) => {
    var token = req.headers['access-token'];
    if (!token) return resp.json('No token Provided');
    const payload = jwt.verify(token, apidata.sKey);

    if (apidata.verifyAPI(payload)) {
        resp.json(apidata.getAccounts());
    } else {
        resp.json('Failed to authenticate token.');
    }
});
app.get("/smb_api/accounts/:id", (req, resp) => {
    var token = req.headers['access-token'];
    if (!token) return resp.json('No token Provided');
    const payload = jwt.verify(token, apidata.sKey);

    if (apidata.verifyAPI(payload)) {
        const accountId = Number(req.params.id);
        const getAccount = apidata.accounts.find((account) => account.id === accountId);

        if (!getAccount) {
            resp.status(500).send('Account not found.')
        } else {
            resp.send(getAccount);
        }
    } else {
        resp.json('Failed to authenticate token.');
    }

});
app.post("/smb_api/accounts/add", (req, resp) => {
    var token = req.headers['access-token'];
    if (!token) return resp.json('No token Provided');
    const payload = jwt.verify(token, apidata.sKey);

    if (apidata.verifyAPI(payload)) {
        let mydata = req.body;
        resp.send(apidata.addAccount(mydata));
    } else {
        resp.json('Failed to authenticate token.');

    }
});
app.post("/smb_api/accounts/login", (req, resp) => {
    let mydata = req.body;
    resp.send(apidata.login(mydata));
});
app.listen(port, function () {
    console.log('NODE SERVER RUNNING on localhost:' + port);
})