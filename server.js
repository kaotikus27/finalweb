if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const stripeSecretKey= process.env.STRIPE_SECRET_KEY
const stripePublicKey= process.env.STRIPE_PUBLIC_KEY

console.log(stripePublicKey, stripeSecretKey)

const express = require ('express')
const app = express ()
const fs = require('fs')
const stripe = require('stripe')(stripeSecretKey)

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))

app.get('/hondaa', function (req, res){
    fs.readFile('items.json', function(error,data){
        if (error) {
            res.status(500).end()
        }else{
            res.render('hondaa.ejs', {
                stripePublicKey: stripePublicKey,
                items: JSON.parse(data)
            })
        }
    })
})

app.post('/purchase', function (req, res){
    fs.readFile('items.json', function(error,data){
        if (error) {
            res.status(500).end()
        }else{
         const itemsJson= JSON.parse(data)
         const itemsArray= itemsJson.bike.concat(itemsJson.merch)
         let total = 0
         req.body.items.forEach(function(item) {
             const itemJson = itemsArray.find(function(i) {
                 return i.id == item.id
             })
             total = total + itemJson.price * item.quantity
         })
         stripe.charges.create({
             amount: total,
             source: req.body.stripeTokenId,
             currency: 'usd'
         }).then(function() {
             console.log('charge succesully')
             res.json({ message: 'successfully purchase items'})
         }).catch(function() {
             console.log('cCharge Fail')
             res.status(500).end()
         })
        }
    })
})

app.get('/suzukii', function (req, res){
    fs.readFile('suzuki.json', function(error,data){
        if (error) {
            res.status(500).end()
        }else{
            res.render('suzukii.ejs', {
                stripePublicKey: stripePublicKey,
                suzuki: JSON.parse(data)
            })
        }
    })
})

app.post('/purchase', function (req, res){
    fs.readFile('suzuki.json', function(error,data){
        if (error) {
            res.status(500).end()
        }else{
         const itemsJson= JSON.parse(data)
         const itemsArray= itemsJson.bike.concat(itemsJson.merch)
         let total = 0
         req.body.suzuki.forEach(function(item) {
             const itemJson = itemsArray.find(function(i) {
                 return i.id == item.id
             })
             total = total + itemJson.price * item.quantity
         })
         stripe.charges.create({
             amount: total,
             source: req.body.stripeTokenId,
             currency: 'usd'
         }).then(function() {
             console.log('charge succesully')
             res.json({ message: 'successfully purchase items'})
         }).catch(function() {
             console.log('cCharge Fail')
             res.status(500).end()
         })
        }
    })
})

app.get('/yamahaa', function (req, res){
    fs.readFile('yamaha.json', function(error,data){
        if (error) {
            res.status(500).end()
        }else{
            res.render('yamahaa.ejs', {
                stripePublicKey: stripePublicKey,
                yamaha: JSON.parse(data)
            })
        }
    })
})

app.post('/purchase', function (req, res){
    fs.readFile('yamaha.json', function(error,data){
        if (error) {
            res.status(500).end()
        }else{
         const itemsJson= JSON.parse(data)
         const itemsArray= itemsJson.bike.concat(itemsJson.merch)
         let total = 0
         req.body.yamaha.forEach(function(item) {
             const itemJson = itemsArray.find(function(i) {
                 return i.id == item.id
             })
             total = total + itemJson.price * item.quantity
         })
         stripe.charges.create({
             amount: total,
             source: req.body.stripeTokenId,
             currency: 'usd'
         }).then(function() {
             console.log('charge succesully')
             res.json({ message: 'successfully purchase items'})
         }).catch(function() {
             console.log('cCharge Fail')
             res.status(500).end()
         })
        }
    })
})


app.listen(3000)