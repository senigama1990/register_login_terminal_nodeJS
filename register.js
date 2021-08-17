const fs = require('fs/promises')
const [,, username, password, age, gender] = process.argv
const createHash = require('./lib/hash.js')
const { instance} = require('./lib/crypt.js')

; (async () => {
    try {
        let users = await fs.readFile('./database/users.json', 'UTF-8')
        let user
        if (!users) {
            users = []
            user = {
                userId: 1,
                username,
                password: createHash(password),
                age,
                gender
            }
        } else {
            users = JSON.parse(users)
            let found = users.find(user => user.username === username)
            if (found) throw 'The user already exists'
            user = {
                userId: users[users.length - 1].userId + 1,
                username,
                password: createHash(password),
                age,
                gender
            }
        }
        users.push(user)
        await fs.writeFile('./database/users.json', JSON.stringify(users, null, 4))
        console.log('You registered successfully');
        console.log('Your token >  ', instance.crypt(username));
    } catch (error) {
        console.log(error);
    }
})()