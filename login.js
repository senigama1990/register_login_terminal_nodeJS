const fs = require('fs/promises')
const [, , username, password] = process.argv
const createHash = require('./lib/hash.js')
const { instance } = require('./lib/crypt.js')

; (async () => {
    try {
        let users = await fs.readFile('./database/users.json', 'UTF-8')
        if (users) {
            users = JSON.parse(users)
            let found = users.find(user => user.username === username && user.password === createHash(password))
            if (found) {
                console.log('You logged in successfully');
                console.log('Your token >  ', instance.crypt(username));
            } else {
                throw 'Incorrect username or password'
            }
        } else {
            throw 'Incorrect username or password'
        }
    } catch (error) {
        console.log(error);
    }
})()