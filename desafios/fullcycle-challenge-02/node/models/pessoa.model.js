module.exports = (sequelize, Sequelize) => {
    const Pessoa = sequelize.define("people", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
    }, 
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    return Pessoa;
};