const User = require('../models/users');

exports.getAllUsers = (req, res, next) => {
    User.findAll().then(users => {
        res.status(200).json({
            "message": "success",
            "data": users[0]
        });
    }).catch(error => {
        res.status(500).json({
            "message": error
        });
    });
}

exports.addUser = (req, res, next) => {
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Email = req.body.Email;
    const Password = req.body.Password;
    
    const user = new User(null, FirstName, LastName, Email, Password);
    user.save().then(() => {
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

exports.loginUsers = (req, res, next) => {
    const { Email, Password } = req.body;
  
    User.login(Email, Password)
      .then(([users]) => {
        if (users.length > 0) {
          res.status(200).json({
            message: "success",
            data: users[0]
          });
        } else {
          res.status(401).json({
            message: "Invalid email or password"
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "An error occurred",
          error: error
        });
      });
  };
  

// exports.getEditLicensePlate = (req, res, next) => {
//     const id = req.params.id;
//     LicensePlate.findById(id).then((plates) => {
//         res.status(200).json({
//             "message": "success",
//             "data": plates[0]
//         });
//     }).catch((error) => {
//         res.status(500).json({
//             "message": error
//         });
//     });
// }

// exports.editLicensePlate = (req, res, next) => {
//     const id = req.body.id;
//     const plate = req.body.plate;
//     const timestamp = req.body.timestamp;
//     const image = req.body.image;
    
//     const licensePlate = new LicensePlate(id, plate, timestamp, image);
//     licensePlate.save().then(() => {
//         res.status(200).json({
//             "message": "success",
//             "result": true
//         });
//     }).catch((error) => {
//         res.status(200).json({
//             "message": error,
//             "result": false
//         });
//     });
// }

// exports.deleteLicensePlate = (req, res, next) => {
//     const id = req.query.id;
//     LicensePlate.delById(id).then(() => {
//         res.status(200).json({
//             "message": "success",
//             "result": true
//         });
//     }).catch((error) => {
//         res.status(500).json({
//             "message": error,
//             "result": false
//         });
//     });
// }
