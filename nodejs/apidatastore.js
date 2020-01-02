let jwt = require('jsonwebtoken');
let fs = require('fs');
var accounts = [
    {
        "id": 1,
        "name": "james Kim",
        "accountno": "2344354",
        "department": "BSA"
    },
    {
        "id": 2,
        "name": "Angel Lucy",
        "accountno": "4344542",
        "department": "CT"
    }
];
var userlogged = '';
exports.sKey='SECRET';

exports.getAccounts = function () {
    return accounts;
}
exports.addAccount = function (data_in) {//id,name,accountno,department) {
    accounts.push(data_in);
    return "success";
}
exports.login = function (user) {
    let localtoken = jwt.sign(user, "SECRET");
    if (user.username == 'sam' && user.password === "sam") {
        userlogged = user.username;
        return localtoken;
    } else {
        userlogged = '';
        return "error";
    }
}
exports.verifyAPI=function(user)
{
    if(user.username == 'sam' && user.password === "sam"){
        return true;
    }
    else
        return false;
}
