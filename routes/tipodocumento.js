const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/tipodocumento", async function (req, res, next) {
  let data = await db.tipodocumento.findAll({
    attributes: ["IdTipoDoc", "Descripcion"],
  });
  res.json(data);
});

router.get("/api/tipodocumento/:id", async function (req, res, next) {
  let data = await db.tipodocumento.findAll({
    attributes: ["IdTipoDoc", "Descripcion"],
    where: { IdTipoDoc: req.params.id },
  });
  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({ mensaje: "No encontrado!!" });
});

module.exports = router;
