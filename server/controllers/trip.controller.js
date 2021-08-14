const { model } = require("mongoose");
const {Trip}=require("../models/trip.model");
const { User } = require("../models/user.model");

module.exports.createTrip = async (request, response) => {
        const { location,description,startDate,endDate } = request.body;
        try{
            let newTrip =await Trip.create({location,description,startDate,endDate})
            let user= await User.findByIdAndUpdate({'_id':request.params.uid},{$push:{trips:newTrip}})
            let addedtripToUser=await Trip.findByIdAndUpdate({'_id':newTrip._id},{$push:{users:user}})
            return response.json(addedtripToUser)
        }
        catch{err => response.status(400).json(err)}
}
module.exports.getAllTrip = (request, response) => {
        Trip.find({}).populate('users')
            .then(trips => response.json(trips))
            .catch(err => response.status(400).json(err))
    }
module.exports.getTrip = (request, response) => {
        Trip.findOne({_id:request.params.id}).populate('users')
            .then(trip => response.json(trip))
            .catch(err => response.status(400).json(err))
    }
module.exports.updateTrip = (request, response) => {
        Trip.findOneAndUpdate({_id: request.params.id}, request.body)
            .then(updatedTrip => response.json(updatedTrip))
            .catch(err => response.status(400).json(err))
    }
module.exports.deleteTrip = (request, response) => {
        Trip.deleteOne({ _id: request.params.id })
            .then(deleteTrip => response.json(deleteTrip))
            .catch(err => response.status(400).json(err))
    }
module.exports.findByLocation=(request,response)=>{
        Trip.find({location:location})
         .then(findLocation => response.json(findLocation))
         .catch(err => response.status(400).json(err))
    }
