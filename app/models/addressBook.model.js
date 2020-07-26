module.exports = (sequelize, Sequelize) => {
    const addressBook = sequelize.define("addressbookinfo", { 
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false
        },
        birthday: {
            type: Sequelize.JSON,
            allowNull: false
        },
        address: {
            type: Sequelize.JSONB,
            allowNull: false
        }
    }, {
        createdAt: false,
        updatedAt: false
    });
  
    return addressBook;
};

//JSONB => https://sequelize.org/master/manual/other-data-types.html. JSONB is used when any query operations are intended on JSON value