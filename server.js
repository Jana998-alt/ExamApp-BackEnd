const express = require('express')
const app = express()
const axios = require('axios')


const cors = require('cors');
require('dotenv').config();
app.use(cors())
const mongoose = require('mongoose');
main().catch(err => console.log(err));
app.use(express.json())


app.get('/findLanguages', getProgrammingLanguages)

function getProgrammingLanguages(req, res) {

    let url = "https://ltuc-asac-api.herokuapp.com/programmingLangData"

    axios.get(url).then(pLanguages => {
        res.send(pLanguages.data)
    })
}

async function main() {
    await mongoose.connect('mongodb://localhost:27017/programminglanguages', { useNewUrlParser: true, useUnifiedTopology: true });
}

//schemas & models
//language schema
const pLanguagesSchema = new mongoose.Schema({
    id: Number,
    title: String,
    imageUrl: String,
});

//user schema
const userSchema = new mongoose.Schema({
    email: String,
    favLang: [pLanguagesSchema],
});


const PLanguage = mongoose.model('PLanguage', pLanguagesSchema);
const User = mongoose.model('User', userSchema);

//seeding  
function seeding() {
    const RazanUser = new User({
        email: 'quraanrazan282@gmail.com',
        favLang: [{
            "id": 1,
            "title": "Python",
            "imageUrl": "https://spng.pngfind.com/pngs/s/62-626208_python-logo-png-transparent-background-python-logo-png.png"
        }]
    });
    const JanaUser = new User({
        email: 'janaosama1300@gmail.com',
        favLang: [{
            "id": 1,
            "title": "Python",
            "imageUrl": "https://spng.pngfind.com/pngs/s/62-626208_python-logo-png-transparent-background-python-logo-png.png"
        }]
    });
    
    // JanaUser.save()

}

// seeding();


//add to fav 
app.post('/addtofav', addtofav)

function addtofav (req,res) {

    let {email,id,title,dateCreated,description,imageUrl} = req.body;
    let newFavLang = {
        id: id,
        title: title,
        imageUrl: imageUrl,
    }

    User.find({email: email}, (err, element)=>{
        element[0].favLang.push(newFavLang);
        console.log(element[0]);
        element[0].save();
        res.send(element[0]);
    })

    
}

app.get('/getFavLang', getFavLang);

function getFavLang (req, res){

    let email = req.query.email;

    User.find({email: email}, (err, element)=>{
        res.send(element[0]);
    })

}


app.post('/deletefromfav', deletefromfav)

function deletefromfav (req,res) {

    let {email,idx} = req.body;
    
    
    User.find({email: email}, (err, element)=>{

        element[0].favLang.splice(idx, 1);
        element[0].save();
        res.send(element[0]);
    })

    
}


app.listen(3001, console.log('listening'))