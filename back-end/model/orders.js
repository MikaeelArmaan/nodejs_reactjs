module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Orders",
        {
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            products: {
                type: DataTypes.JSON, // Use JSON type for an array of products
                allowNull: false,
            },
            amount: {
                type: DataTypes.FLOAT,
                required: true
            },
            address: {
                type: DataTypes.TEXT,
                required: true
            },
            status: {
                type: DataTypes.ENUM,
                values: ["pending", "hold", "progress", "rejected", "cancel"],
                defaultValue: "pending",
                allowNull: false,
            }
        },
        {
            tableName: "orders",
            paranoid: true,
            underscored: true,
            sequelize,
        }
    );
};
