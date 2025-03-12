const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // Abrir base de datos, crearla si no existe
  await db.open("./.data/TPI.db");

  let existe = false;
  let res = null;

  // Verificar si la tabla TipoEntrenador existe, si no existe, crearla
  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'tipoEntrenador'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE tipoEntrenador( 
              id_tipoEntrenador INTEGER PRIMARY KEY AUTOINCREMENT,
              nombreTipoEntrenador TEXT NOT NULL 
            );`
    );
    console.log("Tabla tipoEntrenador creada!");

    await db.run(
      `INSERT INTO tipoEntrenador VALUES 
      
        (1, 'Director Técnico'),
        (2, 'Preparador Físico'),
        (3, 'Ayudante de Campo'),
        (4, 'Analista de Juego'),
        (5, 'Fisioterapeuta');`
    );
  }

  // Verificar si la tabla entrenadores existe, si no existe, crearla
  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'entrenadores'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE TABLE entrenadores( 
              id_Entrenador INTEGER PRIMARY KEY AUTOINCREMENT,
              nombreEntrenador TEXT NOT NULL UNIQUE,
              fechaNacimiento TEXT NOT NULL,
              añosExperiencia INTEGER NOT NULL,
              id_tipoEntrenador INTEGER,
              tieneClub BOOLEAN,
              clubActual TEXT,
              Activo BOOLEAN,
              FOREIGN KEY (id_tipoEntrenador) REFERENCES TipoEntrenador(id_tipoEntrenador)
            );`
    );
    console.log("Tabla entrenadores creada!");
    // Insertar entrenadores
    await db.run(
      `INSERT INTO entrenadores (id_Entrenador, nombreEntrenador, fechaNacimiento, añosExperiencia, id_tipoEntrenador, tieneClub, clubActual, Activo)
    VALUES
      (1, 'Diego Simeone', '1970-04-28', 15, 1, 1, 'Atletico de Madrid', 1),
      (2, 'Marcelo Bielsa', '1955-07-21', 25, 1, 1, 'Leeds United', 1),
      (3, 'Pep Guardiola', '1971-01-18', 20, 1, 1, 'Manchester City', 1),
      (4, 'Juan Carlos Osorio', '1961-06-08', 22, 2, 1, 'Atletico Nacional', 1),
      (5, 'Francisco Ayestaran', '1963-02-22', 18, 3, 0, 'Barcelona', 1),
      (6, 'Jorge Desio', '1976-08-15', 12, 4, 1, 'Real Madrid', 1),
      (7, 'Carlos Velasco Carballo', '1971-03-17', 10, 5, 0, 'Racing', 1),
      (8, 'Rafael Guerrero', '1980-09-12', 8, 2, 1, 'Sevilla FC', 1),
      (9, 'Pepe Conde', '1985-11-05', 5, 3, 0, 'Talleres', 1),
      (10, 'Marta López', '1990-07-30', 3, 5, 0, 'Independiente', 1);`
    );
  }

  // CIUDADES

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'ciudades'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table ciudades( idCiudad INTEGER PRIMARY KEY AUTOINCREMENT, nombreCiudad text NOT NULL UNIQUE);"
    );
    console.log("tabla ciudades creada!");
    await db.run(
      `insert into ciudades values
      (1, 'Buenos Aires'),
      (2, 'Madrid'),
      (3, 'Barcelona'),
      (4, 'Turin'),
      (5, 'Manchester'),
      (6, 'Munich'),
      (7, 'Paris'),
      (8, 'Rio de Janeiro'),
      (9, 'Londres'),
      (10, 'Montevideo')
      ;`
    );
  }

  // CLUBES

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'clubes'",
    []
  );
  if (res.contar > 0) existe = true;

  if (!existe) {
    await db.run(
      `CREATE table clubes( 
              idClub INTEGER PRIMARY KEY AUTOINCREMENT
            , nombreClub text NOT NULL UNIQUE
            , fechaCreacion text
            , torneosGanados integer
            , activo boolean
            , idCiudad integer
            , FOREIGN KEY (idCiudad) REFERENCES ciudades(idCiudad)
            );`
    );
    console.log("tabla clubes creada!");

    await db.run(
      `insert into clubes values
      (1, 'Club Atlético Boca Juniors', '1905-04-03', 68, 1, 1),
      (2, 'Club Atlético River Plate', '1901-05-25', 66, 1, 1),
      (3, 'Club de Fútbol Barcelona', '1899-11-29', 96, 1, 3),
      (4, 'Real Madrid Club de Fútbol', '1902-03-06', 101, 1, 2),
      (5, 'Manchester United Football Club', '1878-10-15', 66, 1, 5),
      (6, 'Juventus Football Club', '1897-11-01', 69, 1, 4),
      (7, 'Bayern Munich', '1900-02-27', 76, 1, 6),
      (8, 'Paris Saint-Germain', '1970-08-12', 43, 1, 7),
      (9, 'Flamengo', '1895-11-17', 43, 1, 8),
      (10, 'Club Atlético de Madrid', '1903-04-26', 42, 1, 2)
      ;`
    );
  }

  // Verificar si la tabla ciudades existe

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

  // TEMPORADAS

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'temporadas'",
    []
  );
  if (res.contar > 0) existe = true;

  if (!existe) {
    await db.run(
      `CREATE table temporadas( 
                 Id_Temporada INTEGER PRIMARY KEY AUTOINCREMENT
               , Año text NOT NULL UNIQUE
               , FechaDesde text
               , FechaHasta text
               );`
    );
    console.log("tabla temporadas creada!");

    await db.run(
      `insert into temporadas values
         (1, '2023/2024', '2023-07-01','2024-06-30'),
         (2, '2022/2023', '2022-07-01', '2023-06-30'),
         (3, '2021/2022', '2021-07-01','2022-06-30'),
         (4, '2020/2021', '2020-07-01','2021-06-30'),
         (5, '2019/2020', '2019-07-01','2020-06-30'),
         (6, '2018/2019', '2018-07-01','2019-06-30'),
         (7, '2017/2018', '2017-07-01','2018-06-30'),
         (8, '2016/2017', '2016-07-01','2017-06-30'),
         (9, '2015/2016', '2015-07-01','2016-06-30'),
         (10, '2014/2015', '2014-07-01','2015-06-30')
         ;`
    );
  }

  // TORNEOS

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'torneos'",
    []
  );
  if (res.contar > 0) existe = true;

  if (!existe) {
    await db.run(
      `CREATE table torneos( 
               ID_Torneo INTEGER PRIMARY KEY AUTOINCREMENT
             , Nombre_torneo text NOT NULL UNIQUE
             , fechaDeFinal text
             , PromedioGoles integer
             , Finalizado boolean
             , Id_Temporada integer
             , FOREIGN KEY (Id_Temporada) REFERENCES temporadas(Id_Temporada)
             );`
    );
    console.log("tabla torneos creada!");

    await db.run(
      `insert into torneos values
       (1, 'Copa America', '1905-04-03', 4.3, 1, 4),
       (2, 'Champions League', '1901-05-25', 66, 1, 1),
       (3, 'Copa Argentina', '1899-11-29', 96, 1, 3),
       (4, 'Premier League', '1902-03-06', 101, 1, 2),
       (5, 'Europa League', '1878-10-15', 66, 1, 5),
       (6, 'Brasileirao', '1897-11-01', 69, 1, 4),
       (7, 'Escudetto', '1900-02-27', 76, 1, 6),
       (8, 'Liga Profesional', '1970-08-12', 43, 1, 7),
       (9, 'Copa del Mundo', '1895-11-17', 43, 1, 8),
       (10, 'Eurocopa', '1903-04-26', 42, 1, 2)
       ;`
    );
  }

  // Cerrar la base de datos
  await db.close();
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;
