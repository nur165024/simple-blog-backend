// external imports
const { check, validationResult } = require("express-validator");

// blog form validator
const blogValidator = [
  check("title")
    .isString()
    .withMessage("Title is required")
    .isLength({ min: 2 })
    .trim(),

  check("content")
    .isString()
    .notEmpty()
    .withMessage("content is required")
    .trim(),

  check("date").notEmpty().withMessage("experience Time is required").trim(),
];

// blog validator message and response handler
const blogValidatorMessageHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = { blogValidator, blogValidatorMessageHandler };
