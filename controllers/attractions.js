const express = require('express');
const router = express.Router();

// const session = require('express-session')

const Location = require('../models/travelSchema.js');
const Attraction = require('../models/attractions.js');
const attractionsSeed = require('../models/attractionsSeed.js');

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next()
    } else {
      res.redirect('/sessions/new')
    }
}

// ----- new route

router.get('/attractions/new', (req, res) => {
    Location.find({}, (error, allLocations) => {
        res.render('attractions/new.ejs', 
            {   
                location: allLocations,
                currentUser: req.session.currentUser // adding session  .currentUser
            }
        )   
    })
})

// ---- post route

router.post('/attractions', (req, res) => {
    Location.findById(req.body.locationId, (error, foundLocation) => {
        Attraction.create(req.body, (error, createAttraction) => {
            foundLocation.attractions.push(createAttraction)
            foundLocation.save((error, data) => {
                res.redirect('/locations')
            })
        })
    })
})


// ----- index route

router.get('/attractions', (req, res) => { 
    if(req.query.sortBy === "mostRecent"){  // if statement for sorting by most recent
        Attraction.find({}, (err, foundAttraction) => {
            res.render(
                'attractions/index.ejs',
                {
                    attractions: foundAttraction,
                    select: "recent",
                    currentUser: req.session.currentUser // adding session  .currentUser
                }
            )
        }).sort({updatedAt: 1})

    } else if (req.query.sortBy === "locationName") { // else if statement for sorting by attractions name alphabetically
        Attraction.find({}, (err, foundAttraction) => {
            res.render(
                'attractions/index.ejs',
                {
                    attractions: foundAttraction,
                    select: "alphabetically",
                    currentUser: req.session.currentUser // adding session  .currentUser
                }
            )
        }).sort({place: 1})
         
    } else { // else statement in case nothing is selected 
        Attraction.find({}, (err, data) => {
            res.render(
                'attractions/index.ejs',
                {
                    attractions: data,
                    select: "none",
                    currentUser: req.session.currentUser // adding session  .currentUser
                }
            );
        })
    }

})

// ----- show route

router.get('/attractions/:id', (req, res) => {
    Attraction.findById(req.params.id, (err, attraction) => {
        Location.findOne({'attractions._id': req.params.id}, (err, foundLocation) => {
            res.render('attractions/show.ejs', 
                {
                    attractions: attraction,
                    currentUser: req.session.currentUser // adding session  .currentUser
                    // location: foundLocation
                }
            )

        });
    })
})

// ----- delete route

router.delete('/attractions/:id', isAuthenticated, (req, res) => {
    Attraction.findByIdAndRemove(req.params.id, (err, foundAttraction) => {
        Location.findOne({'attractions._id': req.params.id}, (err, foundLocation) => { 
            foundLocation.attractions.id(req.params.id).remove();
            foundLocation.save((err, data) => {
                res.redirect('/locations')
            })
        })
    })
})

// ------ edit route

router.put('/attractions/:id', isAuthenticated, (req, res) => {
    Attraction.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, uptadedAttraction) => {
        Location.findOne({'attractions._id': req.params.id}, (err, foundLocation) => {
            if(foundLocation._id.toString() !== req.body.locationsId) {
                foundLocation.attractions.id(req.params.id).remove();
                foundLocation.save((err, data) => {
                    Location.findByIdAndRemove(req.body.locationsId, (error, newLocation) =>{
                        newLocation.attractions.push(uptadedAttraction)
                        newLocation.save((error, data) => {
                            res.redirect('/attractions/' + req.params.id)
                        })

                    })
                })
            } else {
                foundLocation.attractions.id(req.params.id).remove();
                foundLocation.attractions.push(uptadedAttraction)
                foundLocation.save((error, data) => {
                    res.redirect('/attractions/' + req.params.id)
                })

            }
        })
    })
})


router.get('/attractions/:id/edit', (req, res) => {
    Attraction.findById(req.params.id, (err, foundAttraction) => {
        Location.find({}, (err, allLocations) => {
            Location.findOne({'attractions._id': req.params.id}, (err, foundLocationAttraction) => {
                res.render('attractions/edit.ejs',
                    {
                        attractions: foundAttraction,
                        locations: allLocations,
                        locationAttraction: foundLocationAttraction,
                        currentUser: req.session.currentUser // adding session  .currentUser

                    }
                )
            })
        })

    })
})










// ------ export route
module.exports = router;