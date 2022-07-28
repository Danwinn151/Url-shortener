const express = require("express")
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl")
const favicon = require('serve-favicon');


mongoose.connect("mongodb://localhost/urlshrinker", {
    useNewUrlParser: true, useUnifiedTopology: false
})
const app = express();

app.use(express.urlencoded({extended: false}))



app.use(favicon(__dirname + "/views/link-favicon.png"));

app.set('view engine', "ejs")
app.get("/", async (req, resp) => {
    const shortUrls = await ShortUrl.find()
    resp.render('index', {shortUrls})
})

app.post("/shortUrls", async (req, resp) => {
  await ShortUrl.create({fullUrl:req.body.fullurl})
  resp.redirect("/")
})
app.get('/:shortUrl', async (req, resp) => {
 const shortUrl = await ShortUrl.findOne({shortUrl:req.params.shortUrl})
 
 if(shortUrl == null) return resp.sendStatus('404')
   shortUrl.clicks++
   shortUrl.save();
   resp.redirect(shortUrl.fullUrl)
})



app.listen(process.env.PORT || 5000, () => {
    console.log("the server is listening on PORT 3000")
})