const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const studentValidationRules = () => {
    return [   
        body("firstName")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("First name must be specified.")
            .isAlphanumeric()
            .withMessage("First name has non-alphanumeric characters."),

        body("lastName")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Last name must be specified.")
            .isAlphanumeric()
            .withMessage("Last name has non-alphanumeric characters."),

        body("class")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Class must be specified.")
            .isAlphanumeric()
            .withMessage("Class must has non-alphanumeric characters."),

        body("email").isEmail().withMessage("Invalid email"),

        body("dateOfBirth", "Invalid date of birth")
            .optional({ checkFalsy: true })
            .isISO8601()
            .toDate()
    ]
}

const paramIdValidationRule = () => {
    return [
        param("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Id must be specified.")
            .isNumeric()
            .withMessage("Id must be a number.")
    ]
};

const bodyIdValidationRule = () => {
    return [
        body("id")
            .trim()
            .isLength({ min: 1 })
            .escape()
            .withMessage("Id must be specified.")
            .isNumeric()
            .withMessage("Id must be a number.")
    ]
};

// Méthode de vérification de la conformité de la requête  
const checkValidity = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(400).json({
        errors: extractedErrors,
    })
}

// Create
exports.create = [bodyIdValidationRule(), studentValidationRules(), checkValidity, (req, res, next) => {
    return res.status(201).json("CREATE !");
}];

// Read
exports.getAll = (req, res, next) => {
    return res.status(200).json("GET ALL!");
};

exports.getById = [paramIdValidationRule(), checkValidity, (req, res, next) => {
    return res.status(200).json("GET BY ID !");
}];

// Update
exports.update = [paramIdValidationRule(), studentValidationRules(), checkValidity,(req, res, next) => {
    return res.status(200).json("UPDATE !");
}];

// Delete
exports.delete = [paramIdValidationRule(), studentValidationRules(), checkValidity,(req, res, next) => {
    return res.status(200).json("DELETE !");
}];