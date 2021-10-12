const express = require('express')
const app = express()
const axios = require('axios')

const cors = require('cors');
require('dotenv').config();
app.use(cors())


app.get('/findLanguages', getProgrammingLanguages)

function getProgrammingLanguages(req, res) {

    let url = "https://ltuc-asac-api.herokuapp.com/programmingLangData"

    axios.get(url).then(pLanguages =>{ 
        res.send(pLanguages.data) 
    })
}


//seeding


app.listen(3001, console.log('listening'))