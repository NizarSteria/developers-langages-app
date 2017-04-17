// Module dependencies
const mongoose = require('mongoose'),
   Developer = require('../models/developer'),
   State = require('../models/state'),
   dbConfig = require('./configLoader').databaseConfig,
   connectionString = `mongodb://${dbConfig.host}/${dbConfig.database}`,
   connection = null;

class DBSeeder {    

    init() {
        mongoose.connection.db.listCollections({name: 'developers'})
                .next((err, collinfo) => {
                    if (!collinfo) {
                        console.log('Starting dbSeeder...');
                        this.seed();
                    }
                });
    }
    
    seed() {

        console.log('Seeding data....');

        //developers
        var developerNames =
        [
            "Nizar,Aouissaoui,gmail.com",
            "Jesse,Smith,gmail.com",
            "Albert,Einstein,outlook.com",
            "Dan,Wahlin,yahoo.com",
            "John,Papa,gmail.com"
        ];
       

        var citiesStates =
        [
            "Tunis,TN,Tunisia",
            "Encinitas,CA,California",
            "Seattle,WA,Washington",
            "Carey,NC,North Carolina",
            "Orlando,FL,Florida"
        ];

     var citiesIds = [5, 9, 44, 5, 36, 17, 16, 9, 36, 14, 14, 6, 9, 24, 44, 36, 25, 19, 5, 14, 5, 23, 38, 17];

     
        Developer.remove({});

        var l = developerNames.length,
            i,
            j;

        for (i = 0; i < l; i++) {
            var nameGenderHost = developerNames[i].split(',');
            var cityState = citiesStates[i].split(',');
            var s = { 'id': citiesIds[i], 'abbreviation': cityState[1], 'name': cityState[2] };
            var developer = new Developer({
                'firstName': nameGenderHost[0]
                , 'lastName': nameGenderHost[1]
                , 'email': nameGenderHost[0] + '.' + nameGenderHost[1] + '@' + nameGenderHost[2]
                , 'state': s
                , 'stateId': citiesIds[i]
                , 'id': i + 1
                , 'orderCount': 0
            });
            
           

            developer.save(function (err, dev) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('inserted developer: ' + dev.firstName + ' ' + dev.lastName);
                }
            });
        }

        //States
        var states = [
        { "name": "Tunisia", "abbreviation": "TN" },
        { "name": "Montana", "abbreviation": "MT" },
        { "name": "Alaska", "abbreviation": "AK" },
        { "name": "Nebraska", "abbreviation": "NE" },
        { "name": "Arizona", "abbreviation": "AZ" },
        { "name": "Nevada", "abbreviation": "NV" },
        { "name": "Arkansas", "abbreviation": "AR" },
        { "name": "New Hampshire", "abbreviation": "NH" },
        { "name": "California", "abbreviation": "CA" },
        { "name": "New Jersey", "abbreviation": "NJ" },
        { "name": "Massachusetts", "abbreviation": "MA" }

        ];

        var l = states.length,
            i;

        State.remove({});

        for (i = 0; i < l; i++) {
            var state = new State ({ 'id': i + 1, 'name': states[i].name, 'abbreviation': states[i].abbreviation });
            state.save();
        }
    }
 }   
module.exports = new DBSeeder();


