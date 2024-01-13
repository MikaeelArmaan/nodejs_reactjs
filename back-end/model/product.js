module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Product",
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            productLink: {
                type: DataTypes.TEXT,
                unique: true,
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            attributes: {
                type: DataTypes.ARRAY(DataTypes.DECIMAL),
                allowNull: true,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            created_by: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            updated_by: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            deleted_by: {
                type: DataTypes.UUID,
                allowNull: true,
            },
        },
        {
            tableName: "product",
            paranoid: true,
            underscored: true,
            sequelize,
        }
    );
};
