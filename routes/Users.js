// Controlador de ruta via acceso
const express = require("express");

const { Router } = require("express");

const {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
} = require("../controllers/user");

const router = Router();

router.get("/", userGet);
router.post("/", userPost);
router.put("/", userPut);
router.patch("/", userPatch);
router.delete("/", userDelete);

module.exports = router;