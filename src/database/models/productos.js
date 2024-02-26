module.exports = (sequelize, DataTypes) => {
    let alias = 'Producto';
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Categoria',
                key: 'id',
            },
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
    };
    let config = {
        tableName: 'productos',
        timestamps: false,
    };

    let Producto = sequelize.define(alias, columns, config);
    Producto.associate = (models) => {
        Producto.belongsTo(models.Categoria, {
          as: "Categoria", // Usa el nombre del modelo correctamente
          foreignKey: 'category_id'
        });
      };

    return Producto;
};
