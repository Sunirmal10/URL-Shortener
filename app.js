const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const mongoose= require('mongoose');
const ShortUrl = require('./UrlSchema');

const port = process.env.PORT || 3000;
const URL = process.env.URL;

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(URL, {useNewUrlParser: true}).then(console.log("mongo connected")).catch(err=>{console.log(err)});

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))

app.get('/', async (req,res)=>{
    const shortUrls = await ShortUrl.find()
    res.render('index', {short: shortUrls});
})

app.post('/shorturl', async (req, res)=>{

    // shortening the url //
     await ShortUrl.create({fullurl: req.body.url});
     console.log("data stored")

     res.redirect('/');
})

app.get('/delete/:url', async(req, res)=>{
    const delshorturl = await ShortUrl.findOneAndDelete({
        shorturl: req.params.url
    })

console.log(delshorturl)

res.redirect('/');

})

// should be at last //
app.get('/:urlshort', async (req, res)=>{
const surl = await ShortUrl.findOne({shorturl: req.params.urlshort})

if(surl == null){res.sendStatus(404)}

surl.clicks++
surl.save()


res.redirect(surl.fullurl)
})



app.listen(port, (req,res)=>{
    console.log('server running on port:', port);
});