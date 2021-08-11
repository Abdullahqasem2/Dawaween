const {User} = require('../models/user.model')
const {Trip} = require('../models/trip.model')

module.exports.findAllUsers = (req, res) => {
    User.find()
        .then(allUsers => res.json(allUsers))
        .catch(err => res.json(err))
}
 
module.exports.findOneSingleUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(oneSingleUser => res.json(oneSingleUser))
        .catch(err => res.json(err))
}

//check this one
module.exports.findUsersByTrip = (req, res) => {
    Trip.findOne({ _id: req.params.id })
        .then(oneSingleTrip => res.json(oneSingleTrip.users))
        .catch(err => res.json(err))
}

module.exports.createNewUser = (req, res) => {
    User.create(req.body)
        .then(newlyCreatedUser => res.json(newlyCreatedUser))
        .catch(err => res.status(400).json(err))
}
 
module.exports.updateExistingUser = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(400).json(err));
}
 
module.exports.deleteAnExistingUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.joinTrip = async (req, res) =>{
    try{   
    let trip = await Trip.findOne({_id:req.params.idt})
    let user = await User.findOneAndUpdate({_id: req.params.idu},{
                 $push:{trips: trip}
            })
    let joinedTrip = await Trip.findOneAndUpdate({_id:req.params.idt},{
                $push:{users: user}
            })
            return res.json()
        }
        catch (err){
            console.log("catch")
            return res.status(400).json(err)
        };
}

module.exports.unjoinTrip = async (req, res) =>{
    try{   
    let trip = await Trip.findOne({_id:req.params.idt})
    let user = await User.findOneAndUpdate({_id: req.params.idu},{
                 $pull:{trips: trip}
            })
    let joinedTrip = await Trip.findOneAndUpdate({_id:req.params.idt},{
                $pull:{users: user}
            })
            return res.json()
        }
        catch (err){
            console.log("catch")
            return res.status(400).json(err)
        };
}