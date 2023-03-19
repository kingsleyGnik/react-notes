// account.js
const express = require("express")
const authRoutes = express.Router();
const fs = require('fs');
const dataPath = 'data/account.json' // path to our JSON file

// util functions
const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)
    // return new Promise((resolve, reject) => {
    //     fs.readFile(dataPath, (err, data) => {
    //         var users = JSON.parse(Buffer.from(data).toString());
    //         resolve(users);
    //     });
    // });
}
const isUserExist = (existAccounts, currentUser) => {

    var exist = false
    for (const key in existAccounts) {
        // if (population.hasOwnProperty(key)) {
        //   console.log(`${key}: ${existAccounts[key]}`);
        // }
        if (existAccounts[key].username === currentUser.username) {
            exist = true
        }
        console.log(existAccounts[key]);
    }

    return exist
}
const getUser = (existAccounts, currentUser) => {

    var exist = {}
    for (const key in existAccounts) {
        // if (population.hasOwnProperty(key)) {
        //   console.log(`${key}: ${existAccounts[key]}`);
        // }
        if (existAccounts[key].username === currentUser.username) {
            exist = key
        }
        console.log(existAccounts[key]);
    }

    return exist
}

authRoutes.post('/login', async (req, res) => {
    try {
        var existAccounts = await getAccountData()
        var checkUser = isUserExist(existAccounts, req.body)
        var user = getUser(existAccounts, req.body)
        console.log("checkUser", req.body, user, checkUser)

        if (checkUser) {
            var temp = { ...existAccounts[user], "userId": user }
            console.log(temp, "app ")
            res.send(temp)
        } else {
            res.send("Login Failure  . Please try Again !! ");
        }

    } catch (err) {
        res.status(500).json(err);
    }

})

authRoutes.post('/register', async (req, res) => {

    try {
        var existAccounts = getAccountData()
        const newAccountId = Math.floor(100000 + Math.random() * 900000)

        existAccounts[newAccountId] = req.body

        console.log(existAccounts);
        saveAccountData(existAccounts);

        var temp = { ...existAccounts[newAccountId], userId: newAccountId }
        res.send(temp)
    } catch (err) {
        res.status(500).json(err);
    }

    // var existAccounts = getAccountData()
    // const newAccountId = Math.floor(100000 + Math.random() * 900000)

    // existAccounts[newAccountId] = req.body

    // console.log(existAccounts);
    // saveAccountData(existAccounts);
    // res.send({ success: true, msg: 'account added successfully' })
})


module.exports = authRoutes