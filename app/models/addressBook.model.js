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
            type: Sequelize.DATE,
            allowNull: false
        },
        address: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: false
        }
    });
  
    return addressBook;
  };