module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            name :{
                type :DataTypes.STRING(20),
                allowNull: true,
            },
            lastname :{
                type :DataTypes.STRING(20),
                allowNull: true,
            },
            avatar :{
                type :DataTypes.STRING(100),
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING(50),
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            account_type: {
                type: DataTypes.ENUM,
                values: ["Admin", "User"],
                defaultValue: "User",
                allowNull: false,
            },
            provider: {
                type: DataTypes.STRING,
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
        },
        {
            tableName: "user",
            paranoid: true,
            underscored: true,
            sequelize,
        }
    );
};
