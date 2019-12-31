let express=require('express');
let apidata=require("./apidatastore");
let bodypaser=require('body-parser');
let corrs = require('cors');
let app=express();
let port=8000;

//app.use(corrs);
app.use(bodypaser.json());
app.use(bodypaser.urlencoded({extended:false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.use(function(req, res) {
//     let err = new Error('Not Found');
//     err.status = 404;
//     console.log("No image in this path, throw error");
//     res.sendFile("./pages/404.html",{ root: __dirname });
// });
app.get("/smb_api/accounts", (req, resp) => {
    resp.json(apidata.getAccounts());
});
app.get("/smb_api/accounts/:id", (req, resp) => {
    const accountId = Number(req.params.id);
    const getAccount = apidata.accounts.find((account) => account.id === accountId);

    if (!getAccount) {
        resp.status(500).send('Account not found.')
    } else {
        resp.send(getAccount);
    }
});
app.post("/smb_api/accounts/add", (req, resp) => {
    let mydata=req.body;
    //console.log(mydata);
    resp.send(apidata.addAccount(mydata));
});
app.post("/smb_api/accounts/login", (req, resp) => {
    let mydata=req.body;
   // console.log(mydata);
    resp.send(apidata.login(mydata));
});
app.listen(port, function() {
    console.log('NODE SERVER RUNNING on localhost:'+port);
})