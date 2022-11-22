const express = require('express');
const router= express.Router();
const Location = require('../models/travelSchema.js');
const Attraction = require('../models/attractions.js');



// ----- new route 

router.get('/locations/new', (req, res) => {
    Location.find({}, (err, newLocation) => {
        res.render(
            'location/new.ejs',
            {
                locations: newLocation
            }
        )
    })
})

// ----- post route 

router.post('/locations', (req, res) => {

    // add attractions key value to new destination 
    req.body.attractions = []

    Location.create(req.body, (error, createdLocation) => {
        res.redirect('/locations')
    })
})

//  -------- show route 

router.get('/locations/:id', (req, res) => {
    Location.findById(req.params.id, (err, foundLocation) => {
        res.render(
            'location/locationShow.ejs',
            {
                locations: foundLocation
            }
        )
    });
})

// router.get('/locations/spots/:id', (req, res) => {
//     Location.find({touristicSpots: req.params.id}, (err,foundSpots) => {
//         console.log(foundSpots)
//         res.render(
//             'location/touristicShow.ejs',
//             {
//                 locations: foundSpots
//             }

//         )
//     })
// })

// ----- index route 

router.get('/', (req, res) => {
    res.render('index.ejs');
})

router.get('/locations', (req, res) => {
    Location.find({}, (err, data) => {
        res.render(
            'location/index2.ejs',
            {
                locations: data
            }
        );
    })
})

// ----- delete route 

router.delete('/locations/:id', (req, res) => {
    Location.findByIdAndRemove(req.params.id, (err, data) => {
        const attractionIDs = []
        for (let i= 0; i < data.attractions.length; i++) {
            attractionIDs.push(data.attractions[i].id)
        }
        Attraction.findByIdAndRemove(
            {
                _id: {
                    $in: attractionIDs
                }

            }, (err, data) => {
                res.redirect('/locations')
            }
        )
        
    })
})

// ----- edit route 

router.put('/locations/:id', (req, res) => {
    Location.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, uptadedLocation) => {
        res.redirect('/locations')
    })
})

router.get('/locations/:id/edit', (req, res) => {
    Location.findById(req.params.id, (err, foundLocation) => {
        res.render('location/edit.ejs',
            {
                locations: foundLocation
            }
        )
    })
})



module.exports = router;

