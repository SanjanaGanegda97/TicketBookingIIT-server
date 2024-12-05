const ShowModel = require('../../models/ShowModel')
const path = require('path');

const saveShow = async (req, res) => {
    // Log the incoming file and form data
    console.log("File received:", req.file);
    console.log("Form data received:", req.body);

    const eventDetails = req.body;
    if (!eventDetails) {
        return res.status(400).json({ error: 'Event details are missing' });
    }

    try {
        if (!req.file) {
            return res.status(400).json({ error: 'File upload failed' });
        }

        const thumbnailPath = path.join('public/images', req.file.filename);
        console.log("Thumbnail path: ", thumbnailPath);

        const event = new ShowModel({
            userID: eventDetails.userID,
            name: eventDetails.name,
            eventTitle: eventDetails.eventTitle,
            eventDate: new Date(eventDetails.eventDate),
            eventTime: eventDetails.eventTime,
            location: eventDetails.location,
            capacity: eventDetails.capacity,
            description: eventDetails.description,
            thumbnail: thumbnailPath,
            promotionType: eventDetails.promotionType,
            appliedOn: new Date(eventDetails.appliedOn),
            musicBand: eventDetails.musicBand,
            ticketPrice: eventDetails.ticketPrice
        });

        const savedEvent = await event.save();
        res.status(200).json({ message: "Event saved successfully", event: savedEvent });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const getMyShows = async (req, res) => {
    try {
        
        const userID = req.query.userID;
        console.log("ss",userID)
        //Convert to ObjectId and query the shows
        const shows = await ShowModel.find({ userID: userID }).sort({ appliedOn: -1 });

        res.status(200).json({ shows });
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

const getAllShows = async (req, res) => {
    try {
        const shows = await ShowModel.find().sort({ appliedOn: 1 });

        res.status(200).json({ shows });
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}
  
  module.exports = { saveShow, getMyShows, getAllShows }