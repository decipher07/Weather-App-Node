const express = require ('express')
const path = require ('path')
const hbs = require ('hbs')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast');

const app = express ()

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
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        message: 'For Your Help',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather-App',
        name: 'Andrew Mead'
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
        name: 'Andrew Mead',
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
        name: 'Andrew Mead',
        errorMessage: 'Page Not Found'
    })
})

app.listen (3000, () => {
    console.log('Server is up on port 3000');   
})


    // res.send ({
    //     forecast: 'It is Snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address  
    // })

// app.get ('', (req, res) => {
//     res.send ('Hello Express!')
// })


// app.get ('/help', (req, res) => {
//         res.send ([{
//             name: 'Andrew',
//             age : 27
//         },
//         {
//             name: 'Doctor',
//             age: 29
//         }
//     ]);
// })

// app.get ('/about', (req, res) => {
//     res.send ('<h1>About Page</h1>');
// })
