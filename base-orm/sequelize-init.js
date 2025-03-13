const { Sequelize, DataTypes } = require("sequelize");

// Configurar conexión a la base de datos SQLite
const sequelize = new Sequelize("sqlite:" + "./.data/TPI.db");

// Definición del modelo jugadores
const parte = sequelize.define(
  "parte",
  {
    IdParte: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NombreApellido: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre y apellido es requerido",
        },
        len: {
          args: [5, 60],
          msg: "Nombre y apellido debe ser tipo caracteres, entre 5 y 60 de longitud",
        },
      },
      unique: {
        args: true,
        msg: "este Nombre y apellido ya existe en la tabla!",
      },
    },
    IdSexo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Sexo es un campo requerido",
        },
      },
    },
    IdTipoDoc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Tipo Documento es requerido",
        },
      },
    },
    NroDocumento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "NroDocumento es requerido",
        },
      },
    },
    IdTipoDomicilio: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Domicilio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Localidad: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    MailContacto: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Telefono: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "parte",
    freezeTableName: true,
  }
);

const sexo = sequelize.define(
  "sexo",
  {
    IdSexo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Descripcion: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La descripción del sexo es requerida",
        },
        len: {
          args: [3, 20],
          msg: "La descripción del sexo debe tener entre 3 y 20 caracteres",
        },
      },
      unique: {
        args: true,
        msg: "Este tipo de sexo ya existe!",
      },
    },
  },
  {
    timestamps: false,
    tableName: "sexo",
    freezeTableName: true,
  }
);

const tipodocumento = sequelize.define(
  "tipodocumento",
  {
    IdTipoDoc: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Descripcion: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El tipo de documento es requerido",
        },
        len: {
          args: [2, 10],
          msg: "El tipo de documento debe tener entre 2 y 10 caracteres",
        },
      },
      unique: {
        args: true,
        msg: "Este tipo de documento ya existe!",
      },
    },
  },
  {
    timestamps: false,
    tableName: "tipodocumento",
    freezeTableName: true,
  }
);

const tipodomicilio = sequelize.define(
  "tipodomicilio",
  {
    IdTipoDomicilio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Descripcion: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El tipo de domicilio es requerido",
        },
        len: {
          args: [5, 20],
          msg: "El tipo de domicilio debe tener entre 5 y 20 caracteres",
        },
      },
      unique: {
        args: true,
        msg: "Este tipo de domicilio ya existe!",
      },
    },
  },
  {
    timestamps: false,
    tableName: "tipodomicilio",
    freezeTableName: true,
  }
);

parte.belongsTo(tipodocumento, { foreignKey: "IdTipoDoc" });
tipodocumento.hasOne(parte, { foreignKey: "IdTipoDoc" });

parte.belongsTo(tipodomicilio, { foreignKey: "IdTipoDomicilio" });
tipodomicilio.hasOne(parte, { foreignKey: "IdTipoDomicilio" });
parte.belongsTo(sexo, { foreignKey: "IdSexo" });
sexo.hasOne(parte, { foreignKey: "IdSexo" });

// Sincronizar modelos con la base de datos (opcional si se quiere crear automáticamente las tablas)
// sequelize.sync();

module.exports = {
  sequelize,
  parte,
  sexo,
  tipodocumento,
  tipodomicilio,
};
