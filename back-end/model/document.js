module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Document",
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            documentLink: {
                type: DataTypes.TEXT,
                unique: true,
                allowNull: false,
            },
            department: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            documentType: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            geography: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            technology: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            domain: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            client: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            fileType: {
                type: DataTypes.STRING,
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
            tableName: "document",
            paranoid: true,
            underscored: true,
            sequelize,
        }
    );
};
