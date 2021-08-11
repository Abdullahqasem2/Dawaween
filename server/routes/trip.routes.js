const tripController=require("../controllers/trip.controller")
module.exports = function(app){   

    app.post("/api/trip",tripController.createTrip);
    app.get("/api/trip",tripController.getAllTrip);
    app.get('/api/trip/:id',tripController.getTrip);
    app.put('/api/trip/:id', tripController.updateTrip);
    app.delete('/api/trip/:id', tripController.deleteTrip);
    app.delete('/api/trip/:location', tripController.findByLocation);



}