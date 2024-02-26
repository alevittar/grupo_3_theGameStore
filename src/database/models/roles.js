// roles.js
module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define('Rol', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    tableName: 'roles',
    timestamps: false,
  });

  // Definir asociaciones con otros modelos si es necesario
  Rol.associate = (models) => {
    Rol.hasMany(models.Usuario, {
      foreignKey: 'rol_id',
      onDelete: 'CASCADE',
    });
  };

  return Rol;
};
