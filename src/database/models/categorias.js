module.exports = (sequelize, DataTypes) => {
    let alias = 'Categoria';
    let columns = {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    };
    let config = {
      tableName: 'categorias',
      timestamps: false,
    };
  
    let Categoria = sequelize.define(alias, columns, config);
  
    Categoria.associate = (models) => {
      Categoria.hasMany(models.Producto, {
        as: "Productos",
        foreignKey: 'category_id'
      });
    }
  
    return Categoria;
  };
  