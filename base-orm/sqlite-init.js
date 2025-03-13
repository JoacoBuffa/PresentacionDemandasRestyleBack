const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // Abrir base de datos, crearla si no existe
  await db.open("./.data/TPI.db");

  let existe = false;
  let res = null;

  // Verificar si la tabla sexo existe
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'sexo'",
    []
  );
  if (res.contar > 0) existe = true;

  if (!existe) {
    // Crear tabla sexo
    await db.run(`
      CREATE TABLE sexo( 
          IdSexo INTEGER PRIMARY KEY AUTOINCREMENT,
          Descripcion TEXT NOT NULL
      );
    `);

    console.log("Tabla sexo creada!");

    await db.run(`
      INSERT INTO sexo (IdSexo, Descripcion) VALUES
      (1, 'Desconocido'),
      (2, 'Masculino'),
      (3, 'Femenino');
    `);

    // Verificar si la tabla tipodocumento existe
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'tipodocumento'",
      []
    );
    if (res.contar > 0) existe = true;

    if (!existe) {
      // Crear tabla tipodocumento
      await db.run(`
          CREATE TABLE tipodocumento( 
              IdTipoDoc INTEGER PRIMARY KEY AUTOINCREMENT,
              Descripcion TEXT NOT NULL
          );
        `);

      console.log("Tabla tipodocumento creada!");

      await db.run(`
          INSERT INTO tipodocumento (IdTipoDoc, Descripcion) VALUES
          (1, 'DNI'),
          (2, 'CUIT'),
          (3, 'CUIL'),
          (4, 'CF');
        `);
    }

    // Verificar si la tabla tipodomicilio existe
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'tipodomicilio'",
      []
    );
    if (res.contar > 0) existe = true;

    if (!existe) {
      // Crear tabla tipodomicilio
      await db.run(`
          CREATE TABLE tipodomicilio( 
              IdTipoDomicilio INTEGER PRIMARY KEY AUTOINCREMENT,
              Descripcion TEXT NOT NULL
          );
        `);

      console.log("Tabla tipodomicilio creada!");

      await db.run(`
          INSERT INTO tipodomicilio (IdTipoDomicilio, Descripcion) VALUES
          (1, 'DomicilioReal'),
          (2, 'DomicilioDeclarado'),
          (3, 'DomicilioFicticio');
        `);
    }

    // Verificar si la tabla parte existe
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'parte'",
      []
    );
    if (res.contar > 0) existe = true;

    if (!existe) {
      // Crear tabla parte
      await db.run(`
          CREATE TABLE parte( 
              IdParte INTEGER PRIMARY KEY AUTOINCREMENT,
              NombreApellido TEXT NOT NULL,
              IdSexo INTEGER NOT NULL,
              IdTipoDoc INTEGER NOT NULL,
              NroDocumento INTEGER NOT NULL UNIQUE,
              IdTipoDomicilio INTEGER NOT NULL,
              Domicilio TEXT,
              Localidad TEXT,
              MailContacto TEXT,
              Telefono INTEGER,
              FOREIGN KEY (IdSexo) REFERENCES sexo(IdSexo),
              FOREIGN KEY (IdTipoDoc) REFERENCES tipodocumento(IdTipoDoc),
              FOREIGN KEY (IdTipoDomicilio) REFERENCES tipodomicilio(IdTipoDomicilio)
          );
        `);

      console.log("Tabla parte creada!");

      await db.run(`
          INSERT INTO parte (IdParte, NombreApellido, IdSexo, IdTipoDoc, NroDocumento, IdTipoDomicilio, Domicilio, Localidad, MailContacto, Telefono) VALUES
          (1, 'Juan Fernando Quintero', 2, 1, 40003000, 2, 'Calle Falsa 123', 'Medellín', 'juan@example.com', 123456789),
          (2, 'Radamel Falcao Garcia', 2, 2, 40003001, 2, 'Av. Principal 456', 'Bogotá', 'falcao@example.com', 987654321),
          (3, 'James Rodriguez', 2, 3, 40003002, 1, 'Carrera 78 #20-10', 'Cúcuta', 'james@example.com', 111222333),
          (4, 'David Ospina', 2, 1, 40003003, 1, 'Calle 50 Sur', 'Medellín', 'ospina@example.com', 444555666),
          (5, 'Yerry Mina', 2, 1, 40003004, 3, 'Calle 100 Norte', 'Guachené', 'yerry@example.com', 777888999),
          (6, 'Alexis McAllister', 2, 1, 40003005, 3, 'Av. Libertador', 'Santa Rosa', 'alexis@example.com', 112233445),
          (7, 'Lionel Messi', 2, 3, 40003006, 2, 'Rosario 78', 'Rosario', 'messi@example.com', 556677889),
          (8, 'Neymar Jr', 2, 3, 40003007, 3, 'Rua Brasil 45', 'Sao Paulo', 'neymar@example.com', 998877665),
          (9, 'Kylian Mbappe', 2, 2, 40003008, 2, 'Paris 30', 'Paris', 'mbappe@example.com', 223344556),
          (10, 'Cristiano Ronaldo', 2, 1, 40003009, 1, 'Madeira 12', 'Funchal', 'cr7@example.com', 334455667);
        `);

      console.log("Datos insertados en la tabla parte!");
    }
  }
  // Cerrar la base de datos
  await db.close();
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;
