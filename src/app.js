const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define path for Express config
const publicDirPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//set up hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    //render converts it to html
    res.render('index', {
        title: 'Weather',
        name: 'Donna Tolentino'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Donnna Tolentino'
    })
})

app.get('/help', (req, res)  => {
    res.render('help',  {
        title: 'Help page',
        message: 'This is some helpful text.',
        name: 'Donna Tolentino'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    
    })

   
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req,res) => {
    res.render('notFound', {
        title: 404,
        errMessage: 'Help article not found.',
        name: 'Donna Tolentino'
    })
})
app.get('*', (req, res) => {
    res.render('notFound', {
        title: 404,
        errMessage: 'Page not found.',
        name: 'Donna Tolentino'
    })
})
//start server up
app.listen(4000, () => {
    console.log('Server is up on port 4000')
})