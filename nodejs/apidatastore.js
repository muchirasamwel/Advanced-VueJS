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
exports.getAccounts = function () {
    if (userlogged != "") {
        return accounts;
    }
    else
    {
        return "Auth FAiled";
    }
}
exports.addAccount = function (data_in) {//id,name,accountno,department) {
    accounts.push(data_in);
    return "success";
}
exports.login = function (user) {
    if (user.username == 'sam' && user.password === "sam") {
        userlogged = user.username;
        return "success";
    } else {
        userlogged = '';
        return "login failed";
    }
}
