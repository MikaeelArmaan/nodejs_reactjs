module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Cart",
        {
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            products: 
                {
                    type: DataTypes.JSON, // Use JSON type for an array of products
                    allowNull: false,
                },   
        },
        {
            tableName: "cart",
            paranoid: true,
            underscored: true,
            sequelize,
        }
    );
};
