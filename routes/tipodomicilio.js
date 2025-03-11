const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/tipodomicilio", async function (req, res, next) {
  let data = await db.tipodomicilio.findAll({
    attributes: ["IdTipoDomicilio", "Descripcion"],
  });
  res.json(data);
});

router.get("/api/tipodomicilio/:id", async function (req, res, next) {
  let data = await db.tipodomicilio.findAll({
    attributes: ["IdTipoDomicilio", "Descripcion"],
    where: { IdTipoDomicilio: req.params.id },
  });
  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({ mensaje: "No encontrado!!" });
});

module.exports = router;
