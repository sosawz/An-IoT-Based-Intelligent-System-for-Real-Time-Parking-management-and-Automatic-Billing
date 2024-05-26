const LicensePlate = require('../models/plates');

exports.getAllLicensePlates = (req, res, next) => {
    LicensePlate.findAll().then(plates => {
        res.status(200).json({
            "message": "success",
            "data": plates[0]
        });
    }).catch(error => {
        res.status(500).json({
            "message": error
        });
    });
}

exports.addLicensePlate = (req, res, next) => {
    const plate = req.body.plate;
    const timestamp = req.body.timestamp;
    const image = req.body.image;
    
    const licensePlate = new LicensePlate(null, plate, timestamp, image);
    licensePlate.save().then(() => {
        res.status(200).json({
            "message": "success",
            "result": true
        });
    }).catch((error) => {
        res.status(200).json({
            "message": error,
            "result": false
        });
    });
}

exports.getEditLicensePlate = (req, res, next) => {
    const id = req.params.id;
    LicensePlate.findById(id).then((plates) => {
        res.status(200).json({
            "message": "success",
            "data": plates[0]
        });
    }).catch((error) => {
        res.status(500).json({
            "message": error
        });
    });
}

exports.editLicensePlate = (req, res, next) => {
    const id = req.body.id;
    const plate = req.body.plate;
    const timestamp = req.body.timestamp;
    const image = req.body.image;
    
    const licensePlate = new LicensePlate(id, plate, timestamp, image);
    licensePlate.save().then(() => {
        res.status(200).json({
            "message": "success",
            "result": true
        });
    }).catch((error) => {
        res.status(200).json({
            "message": error,
            "result": false
        });
    });
}

exports.deleteLicensePlate = (req, res, next) => {
    const id = req.query.id;
    LicensePlate.delById(id).then(() => {
        res.status(200).json({
            "message": "success",
            "result": true
        });
    }).catch((error) => {
        res.status(500).json({
            "message": error,
            "result": false
        });
    });
}
