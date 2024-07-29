/* eslint-disable prettier/prettier */
const bcrypt = require('bcryptjs');


bcrypt.hash("$tarK2504", 10).then(s => {
    console.log(s);
});