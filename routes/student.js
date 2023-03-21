// (Étape 1) Import de express
const express = require('express');

// (Étape 1) Définition du router
const router = express.Router();

// Import du Contrôleur student
const student_controller = require("../controllers/student");

// (Étape 2) Ajout de la route qui permet d'ajouter un étudiant
router.post("/", student_controller.create);

// (Étape 2) Ajout de la route qui permet d'afficher tous les étudiants
router.get("/", student_controller.getAll);

// (Étape 2) Ajout de la route qui permet d'afficher un seul étudiant grâce à son identifant
router.get("/:id", student_controller.getById);

// (Étape 2) Ajout de la route qui permet de modifier un seul étudiant grâce à son identifant
router.put("/:id", student_controller.update);

// (Étape 2) Ajout de la route qui permet de supprimer un seul étudiant grâce à son identifant
router.delete("/:id", student_controller.delete);

// (Étape 1) Export du router
module.exports = router;