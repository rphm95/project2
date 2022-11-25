const { response } = require('express');
const express = require('express');
const app = express();

const seedLocation = require('./models/travelSeed.js')
const seedAttractions = require('./models/attractionsSeed.js')


const mongoose = require('mongoose');
const methodOverride = require('method-override');


app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.use(express.json());

const locationsController = require('./controllers/locations.js');
app.use(locationsController);

const attractionsController = require('./controllers/attractions.js');
app.use(attractionsController);

app.use(express.static('public'))


const Location = require('./models/travelSchema.js') // --- on controllers folder
const Attractions = require('./models/attractions.js'); // --- on controllers folder
// const Attraction = require('./models/attractions.js');

// HOROKU HAS A ENVORIMENT VARIABLE, and port is a port that horoku will set up... so we create a variable PORT 3000, so if im running locally it runs on PORT 3000 but if its on horoku we assing PORT=process.env.PORT
let PORT= 3000
if(process.env.PORT){
    PORT=process.env.PORT
}


// ============== SEED =============
app.get('/seed', (req, res) => {
    // create Rio de Janeiro
    Location.create(
        {
            img: "https://upload.wikimedia.org/wikipedia/commons/9/98/Cidade_Maravilhosa.jpg",
            location: "Rio de Janeiro",
            food: ["Feijoada", "Moqueca"],
            flightPrice: "1000",
            attractions: [],
            hotelPrice: "150",
            description: "The most attractive tourist city in South America, a place that is a symbol of fun, games, great atmosphere. Today, the former capital of Brazil and the Portuguese Empire is the center of the most famous carnival in the world. This destination guards the most giant statue of Christ and boasts one of the most famous beaches in the world: Copacabana. Our site is dedicated to a detailed description of all the most important parts of travel to this fabulous city.",
            bookingLink: "https://www.expedia.com/Cheap-Flights-To-Rio-De-Janeiro.d178301.Travel-Guide-Flights"
        },
        (error, data) => {}
    );

    // create Paris 
    Location.create(
        {
            img: "https://www.fodors.com/wp-content/uploads/2018/10/HERO_UltimateParis_Heroshutterstock_112137761.jpg",
            location: "Paris",
            food: ["Croissants", "Brioches"],
            flightPrice: "1000",
            attractions: [],
            hotelPrice: "150",
            description: "Paris was founded in the 3rd century B.C. on île de la Cité by a community of Celts. They were a group of tribal fishermen called the Parisii who, pushed by emigration towards the banks of the Seine, made a permanent settlement there and profited from the area’s fertility and temperate climate. Furthermore, the islands on the Seine seemed the perfect place for this little community to establish their capital.",
            bookingLink: "https://www.expedia.com/Cheap-Flights-To-Rio-De-Janeiro.d178301.Travel-Guide-Flights"
    
        },
        (error, data) => {}
    );

    //create New York
    Location.create(
        {
            img: "https://www.fodors.com/wp-content/uploads/2022/03/Hero-UltimateNYC-shutterstock_327064844.jpg",
            location: "New York",
            food: ["Pizza", "Baggle"],
            flightPrice: "200",
            attractions: [],
            hotelPrice: "250",
            description: "One of the greatest cities in the world, New York is always a whirlwind of activity, with famous sites at every turn and never enough time to see them all. Some people come here to enjoy the Broadway shows; others come specifically to shop and dine; and many come simply to see the sites: the Statue of Liberty, Empire State Building, Brooklyn Bridge, Central Park, historic neighborhoods, and numerous world famous museums.",
            bookingLink: "https://www.expedia.com/Cheap-Flights-To-New-York.d178293.Travel-Guide-Flights"
        },
        (error, data) => {}
    );
    res.redirect('/');
})

app.get('/seed/spots', (req, res) => {
    // Create first attraction and give it to RIO DE JANEIRO
    Attractions.create(
        {
            place: "Christ the Redeemer", 
            image: "https://bookaweb.s3.eu-central-1.amazonaws.com/media/26546/chr5.jpg",
            descriptionOfPlace: "Cristo Redentor is an Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil, created by French sculptor Paul Landowski and built by Brazilian engineer Heitor da Silva Costa, in collaboration with the French engineer Albert Caquot. Romanian sculptor Gheorghe Leonida fashioned the face. Constructed between 1922 and 1931, the statue is 30 meters high, excluding its 8-meter pedestal. The arms stretch 28 meters wide. It is made of reinforced concrete and soapstone. A symbol of Christianity around the world, the statue has also become a cultural icon of both Rio de Janeiro and Brazil and was voted one of the New Seven Wonders of the World.",
            price: "You can get to the statue for free, except that you have to pay for transport. There are several tours that provide you with some sightseeing and tour guides, and their prices start at 20 USD."
        },
        (error, createdAttraction) => {
            Location.findOne({location: "Rio de Janeiro"}, (error, foundLocation) => {
                foundLocation.attractions.push(createdAttraction);
                foundLocation.save((error, savedNewAttraction) => {} );
            })
        }
    );
    
    Attractions.create(
        {
            place: "Sugarloaf Mountain",
            image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/70/2f/44.jpg",
            descriptionOfPlace: "Different histories justify the name of this touristic side; the most popular says that during the centuries XVI and XVIII, at the peak of the production of sugar cane, the producers stored sugar blocks in little boxes to be exported, and the resemblance of the object with Sugar loaf mountain gave origin to the name. Inaugurated in 1912, the little tram of the Sugar loaf was the first Brazilian cable car and the third in the world, linking the Urca hill to the Sugar loaf mountain. Since then, more than 40 million of people have already used that cable cars.",
            price: "The average cost for the ticket is US$30 and you can book online."
        },
        (error, createdAttraction) => {
            Location.findOne({location: "Rio de Janeiro"}, (error, foundLocation) => {
                foundLocation.attractions.push(createdAttraction);
                foundLocation.save((error, savedNewAttraction) => {} );
            })
        }
    )
    
    Attractions.create(
        {
            place: "Copacabana Beach",
            image: "https://d3lwdlarraoj4i.cloudfront.net/br/studio-praia-copacabana-beach14.webp",
            descriptionOfPlace: "Copacabana is a gorgeous neighborhood in the southern part of Rio de Janeiro, mostly known for its stunning balneairo beach. This Atlantic shore beach is around 4 km long, with an iconic black and white promenade. Copacabana's history began in 1970 thanks to a landfill that influenced the beach area. Today, it extends from Avenida Atlantica to the famous Copacabana Fortress you ought to see. An abundance of things to do and see makes this beach an item on many bucket lists.",
            price: "FREE"
        },
        (error, createdAttraction) => {
            Location.findOne({location: "Rio de Janeiro"}, (error, foundLocation) => {
                foundLocation.attractions.push(createdAttraction);
                foundLocation.save((error, savedNewAttraction) => {} );
            })
        }
    )

    // create attractions for PARIS
    Attractions.create(
        {
            place: "The Arc de Triomphe",
            image: "https://www.westend61.de/images/0001202278pw/arc-de-triomphe-over-traffic-at-night-paris-ile-de-france-france-MINF12388.jpg",
            descriptionOfPlace: "Sitting at the top of the Champs-Elysees is the Arc de Triomphe. From the top of the Arc you get one of the best views of Paris. Look down the Champs-Elysees to the Louvre, out to La Defense, and over the rooftops to the Eiffel Tower. At night, you can watch Paris (and the Eiffel Tower) sparkle…quite the sight to see.",
            price: "Book online a skip the line ticket for around US$ 14"
        }, 
        (error, createdAttraction) => {
            Location.findOne({location: "Paris"}, (error, foundLocation) => {
                foundLocation.attractions.push(createdAttraction);
                foundLocation.save((error, savedNewAttraction) => {} );
            })
        }
    );
    
    Attractions.create(
        {
            place: "The Louvre",
            image: "https://cdn.getyourguide.com/img/tour/5d4c31d4123d3.jpeg/99.jpg",
            descriptionOfPlace: "The Louvre is the world's largest art museum. This building was once the home to French Kings, including Louis XIV. During the French Revolution in the 18th century, the Louvre was converted to a museum. The Louvre is massive and you could literally spend days here. However, you can see the highlights (Mona Lisa, Venus de Milo, and the Winged Victory) in just an hour or two.",
            price: "Book your tickets online in advance. On the official Louvre website, you can purchase your tickets in advance. These cost €17 and the website advertises less than a 30 minute wait if you purchase your tickets in advance."
        },
        (error, createdAttraction) => {
            Location.findOne({location: "Paris"}, (error, foundLocation) => {
                foundLocation.attractions.push(createdAttraction);
                foundLocation.save((error, savedNewAttraction) => {} );
            })
        }
    )
    
    Attractions.create(
        {
            place: "The Champs-Elysees",
            image: "https://www.discoverwalks.com/blog/wp-content/uploads/2021/08/1600px-avenue_des_champs-elysees_en_heure_bleue.jpg",
            descriptionOfPlace: "This is one of the most recognizable streets in the world, running from Place de la Concorde to the Arc de Triomphe. Along the way, pop into Laduree for macarons, another must do while in Paris.",
            price: "FREE"
        },
        (error, createdAttraction) => {
            Location.findOne({location: "Paris"}, (error, foundLocation) => {
                foundLocation.attractions.push(createdAttraction);
                foundLocation.save((error, savedNewAttraction) => {} );
            })
        }
    )

    // Create New York Attractions 
    Attractions.create(
        {
            place: "Central Park",
            image: "https://www.planetware.com/photos-large/USNY/new-york-city-central-park-lake-bridge-boats.jpg",
            descriptionOfPlace: "A walk, pedal, or carriage ride through the crisscrossing pathways of Central Park is a must-do on anyone's New York City itinerary. In winter, you can even lace up your skates and glide across Wollman Rink. This huge park in the city center, a half-mile wide and 2.5 miles long, is one of the things that makes New York such a beautiful and livable city.",
            price: "FREE"
        },
        (error, createdAttraction) => {
            Location.findOne({location: "New York"}, (error, foundLocation) => {
                foundLocation.attractions.push(createdAttraction);
                foundLocation.save((error, savedNewAttraction) => {} );
            })
        }
    );
    
    Attractions.create(
        {
            place: "Statue of Liberty",
            image: "https://www.planetware.com/photos-large/USNY/new-york-city-statue-of-liberty.jpg",
            descriptionOfPlace: "America's most iconic sight, the Statue of Liberty is at the top of every first-time visitor's list of things to do in New York. It was France's gift to America. Built in 1886, it remains a world symbol of freedom and is one of the top attractions in America.",
            price: "FREE"
        },
        (error, createdAttraction) => {
            Location.findOne({location: "New York"}, (error, foundLocation) => {
                foundLocation.attractions.push(createdAttraction);
                foundLocation.save((error, savedNewAttraction) => {} );
            })
        }
    )
    res.redirect('/')
})

app.get('/', (req, res) => {
    res.render(
        'index.ejs'
    )
})

//  ======================== MY ROUTES ================= 
// they are in controllers folder



//==================== my local port 

app.listen(PORT, () =>{
    console.log('listening...');
})

mongoose.connect('mongodb+srv://rphm95:R160589867@sei.7r3v4df.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('connected to mongo')
})