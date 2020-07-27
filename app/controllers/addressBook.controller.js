const db = require("../models");
const addressBook = db.addressBook;
const { Op, DataTypes } = require("sequelize");

exports.findUserAddress = (req, res) => {
    addressBook.findByPk(req.params.id)
        .then(data => {
            res.send(data);
        })
        .catch(() => {
            res.send({ errMsg: "invalid id" })
    });
};

exports.updateUserAddress = (req, res) => {
    const userAddress = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        birthday: JSON.parse(req.body.birthday),
        address: JSON.parse(req.body.address)
    };

    addressBook.update(userAddress, {
        where: { id: req.body.id }
    })
    .then(data => {
        res.status(200).json({
            message: "User info is updated successfully"
        });
    })
};

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
    const userAddress = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        birthday: JSON.parse(req.body.birthday),
        address: JSON.parse(req.body.address)
    }; //string is turned into object before saving
    
    addressBook.create(userAddress)
        .then (data => {
            res.status(200).json({
                message: "Submitted and registered successfully"
            });
        })
}