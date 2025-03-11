const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/sexo", async function (req, res, next) {
  let data = await db.sexo.findAll({
    attributes: ["IdSexo", "Descripcion"],
  });
  res.json(data);
});

router.get("/api/sexo/:id", async function (req, res, next) {
  let data = await db.sexo.findAll({
    attributes: ["IdSexo", "Descripcion"],
    where: { IdSexo: req.params.id },
  });
  if (data.length > 0) res.json(data[0]);
  else res.status(404).json({ mensaje: "No encontrado!!" });
});

module.exports = router;
