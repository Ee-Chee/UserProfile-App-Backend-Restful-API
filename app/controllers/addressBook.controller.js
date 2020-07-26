const db = require("../models");
const addressBook = db.addressBook;
const { Op, DataTypes } = require("sequelize");
const { query } = require("express");

// exports.initializeQuantity = (req, res) => {
//     Quantity.create({userid: req.session.userId, quantity_array: req.body.quantityArray})
//     .then(data => {
//         res.status(200).json({
//             message: "initialization completed"
//         });
//     });
// };

// exports.findQuantity = (req, res) => {
//     Quantity.findOne({ where: {userid: req.session.userId} })
//     .then(data => {
//         res.send(data);
//     })
//     .catch((err) => {
//         console.log("err1", err);
//         res.send({ errMsg: "Wrong!" })
//     });
// };

// exports.updateQuantity = (req, res) => {
//     Quantity.update({ quantity_array : req.body.quantityArray }, {
//         where: { userid: req.session.userId }
//     })
//     .then(data => {
//         res.status(200).json({
//             message: "update completed"
//         });
//         //A response data is absolutely necessary here although no data is returned, because it makes data update process faster (from FE to BE to SQL and then from QSL to BE to FE).
//         //There two methods in FE, check home.component.
//         //Otherwise, the data update is slow, SQL wouldnt be able to catch up user's clicking (e.g. subunit substraction), clicking 5 times but only 2 is substracted. It has to wait longer time to save this 5 times clicking.
//         //Comment out the lines to check the difference. Try refreshing the page too. 
//         //console.log(data); => no data returned
//     })
//     .catch((err) => {
//         console.log("err2", err);
//         res.send({ errMsg: "Wrong2!" })
//     });
// };

exports.findAllUserAddresses = (req, res) => {
    const searchKeyword = req.query.search;
    var condition = searchKeyword ? {
        [Op.or]: [
            {
                firstname: {
                    [Op.iLike]: `%${searchKeyword}%`
                }
            },
            {
                lastname: {
                    [Op.iLike]: `%${searchKeyword}%`
                }
            },
            {
                address: {
                    street: {
                        [Op.iLike]: `%${searchKeyword}%`
                    }
                }
            },
            {
                address: {
                    postcode: {
                        [Op.iLike]: `%${searchKeyword}%`
                    }
                }
            },
            {
                address: {
                    city: {
                        [Op.iLike]: `%${searchKeyword}%`
                    }
                }
            }
        ]
    } : null; 
    //Op is not defined in Sequelize v. 6 by default. Need to import Op from Sequelize manuelly first.
    //https://sequelize.org/master/manual/model-querying-basics.html
    //https://www.w3schools.com/sql/sql_like.asp

    // Some important notes on JSONB/JSON data type:
    // When the object first saved to db as JSON DataType, its value is automatically stringified. Thus, it has to be parsed first (already stringified in FE) before running saving query. 
    // Otherwise, the value is double stringified/double encoded. This adds escaping backslash in the string value in db which it is not intended for accessing the desired key's value of JSON string data later.
    // Raw query statement for accessing JSONB data key's value: SELECT address -> 'street' AS streetcol FROM addressbookinfos WHERE address #>> '{street}' = 'Ofenstraße';
    // https://sequelize.org/master/manual/other-data-types.html
    // https://stackoverflow.com/questions/39634035/slashes-in-json-returned-from-node
    // https://www.postgresql.org/docs/current/functions-json.html
    // https://www.postgresqltutorial.com/postgresql-json/

    
    addressBook.findAll({ 
        where: condition  
    }).then (data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Data retrieving failed"
            });
        });
};

exports.createUserAddress = (req, res) => {
    const userAdress = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        birthday: JSON.parse(req.body.birthday),
        address: JSON.parse(req.body.address)
    }; //string is turned into object before saving
    
    addressBook.create(userAdress)
        .then (data => {
            res.status(200).json({
                message: "Submitted and registered successfully"
            });
        })
}