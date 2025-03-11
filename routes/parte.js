const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/parte", async function (req, res) {
  try {
    let where = {};
    if (
      req.query.NombreApellido != undefined &&
      req.query.NombreApellido !== ""
    ) {
      where.NombreApellido = {
        [Op.like]: "%" + req.query.NombreApellido + "%",
      };
    }
    const Pagina = req.query.Pagina || 1;
    const TamañoPagina = 10;
    const { count, rows } = await db.parte.findAndCountAll({
      attributes: [
        "IdParte",
        "NombreApellido",
        "IdSexo",
        "IdTipoDoc",
        "NroDocumento",
        "IdTipoDomicilio",
        "Domicilio",
        "Localidad",
        "MailContacto",
        "Telefono",
      ],
      order: [["NombreApellido", "ASC"]],
      where,
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });

    return res.json({ Items: rows, RegistrosTotal: count });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener las partes" });
  }
});

router.get("/api/parte/:id", async function (req, res, next) {
  let items = await db.parte.findOne({
    attributes: [
      "IdParte",
      "NombreApellido",
      "IdSexo",
      "IdTipoDoc",
      "NroDocumento",
      "IdTipoDomicilio",
      "Domicilio",
      "Localidad",
      "MailContacto",
      "Telefono",
    ],
    where: { IdParte: req.params.id },
  });
  res.json(items);
});

router.post("/api/parte/", async (req, res) => {
  try {
    let data = await db.parte.create({
      NombreApellido: req.body.NombreApellido,
      IdSexo: req.body.IdSexo,
      IdTipoDoc: req.body.IdTipoDoc,
      NroDocumento: req.body.NroDocumento,
      IdTipoDomicilio: req.body.IdTipoDomicilio,
      Domicilio: req.body.Domicilio,
      Localidad: req.body.Localidad,
      MailContacto: req.body.MailContacto,
      Telefono: req.body.Telefono,
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = "";
      err.errors.forEach(
        (x) => (messages += (x.path ?? "campo") + ": " + x.message + "\n")
      );
      res.status(400).json({ message: messages });
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.put("/api/parte/:id", async (req, res) => {
  try {
    let item = await db.parte.findOne({
      attributes: [
        "IdParte",
        "NombreApellido",
        "IdSexo",
        "IdTipoDoc",
        "NroDocumento",
        "IdTipoDomicilio",
        "Domicilio",
        "Localidad",
        "MailContacto",
        "Telefono",
      ],
      where: { IdParte: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Parte no encontrada" });
      return;
    }
    item.NombreApellido = req.body.NombreApellido;
    item.IdSexo = req.body.IdSexo;
    item.IdTipoDoc = req.body.IdTipoDoc;
    item.NroDocumento = req.body.NroDocumento;
    item.IdTipoDomicilio = req.body.IdTipoDomicilio;
    item.Domicilio = req.body.Domicilio;
    item.Localidad = req.body.Localidad;
    item.MailContacto = req.body.MailContacto;
    item.Telefono = req.body.Telefono;
    await item.save();

    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = "";
      err.errors.forEach((x) => (messages += x.path + ": " + x.message + "\n"));
      res.status(400).json({ message: messages });
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.delete("/api/parte/:id", async (req, res) => {
  try {
    const numFilasEliminadas = await db.parte.destroy({
      where: { IdParte: req.params.id },
    });
    if (numFilasEliminadas === 1) {
      res.json({ message: "Parte eliminada correctamente" });
    } else {
      res.status(404).json({ error: "Parte no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar La Parte" });
  }
});

module.exports = router;
