const bcrypt = require('bcrypt');
const { Usuario } = require('../database/models');

const userService = {
    getAllUsuarios: async () => {
        try {
          return await Usuario.findAll({
            attributes: ['id', 'first_name', 'last_name', 'email', 'image', 'rol_id']
          });
        } catch (error) {
          console.error('Error al obtener todos los usuarios:', error);
          throw new Error('Error al obtener todos los usuarios');
        }
      },
  getUsuarioByEmail: async (email) => {
    try {
      return await Usuario.findOne({ 
        where: { email },
        attributes: ['id', 'first_name', 'last_name', 'email', 'image', 'rol_id']
      });
    } catch (error) {
      console.error('Error al obtener usuario por email:', error);
      throw new Error('Error al obtener usuario por email');
    }
  },

  createUser: async (userData) => {
    try {
      const { firstName, lastName, email, password, rol_id, image } = userData;
      
      await Usuario.create({
        first_name: firstName,
        last_name: lastName,
        email,
        password: bcrypt.hashSync(password, 12),
        image,
        rol_id
      });
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw new Error('Error al crear usuario');
    }
  },

  getUsuarioById: async (id) => {
    try {
      return await Usuario.findByPk(id);
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      throw new Error('Error al obtener usuario por ID');
    }
  },

  updateUser: async (id, userData) => {
    try {
      const { firstName, lastName, email, password, rol_id, image } = userData;

      await Usuario.update({
        first_name: firstName,
        last_name: lastName,
        email,
        password: bcrypt.hashSync(password, 12),
        image,
        rol_id
      }, {
        where: { id },
      });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw new Error('Error al actualizar usuario');
    }
  },
  getUsuariosByRol: async (rolId) => {
    try {
      const usuarios = await Usuario.findAll({
        where: { rol_id: rolId }
      });
      return usuarios;
    } catch (error) {
      console.error('Error al obtener usuarios por rol desde la base de datos:', error);
      throw new Error('Error al obtener usuarios por rol desde la base de datos');
    }
  }
};



module.exports = userService;
