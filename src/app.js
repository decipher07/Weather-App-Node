const express = require ('express')
const path = require ('path')
const hbs = require ('hbs')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast');

const app = express ()
const port = process.env.PORT || 3000 

// Define Paths For Express Config 
const publicDirectoryPath = path.join (__dirname , '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join (__dirname, '../templates/partials');

// Setup Handlebars Engine And Views Locations
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup Static Directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'DJ'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        message: 'For Your Help',
        title: 'Help',
        name: 'DJ'
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather-App',
        name: 'DJ'
    })
})


app.get ('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "Send Back An Valid Address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if (error){
            return res.send({error});
        }

        forecast (latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get ('/help/*', (req, res) => {
    //res.send ('Help Article Not Found')
    res.render('404', {
        title: '404',
        name: 'DJ',
        errorMessage: 'Help Article Page Not Found'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send ({
            error: "You Must Provide A Search"
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get ('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'DJ',
        errorMessage: 'Page Not Found'
    })
})

app.listen (port, () => {
    console.log('Server is up on port ' + port);   
})

