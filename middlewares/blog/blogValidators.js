// external imports
const { check, validationResult } = require("express-validator");

// blog form validator
const blogValidator = [
  check("title")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Title is required")
    .trim(),

  check("content")
    .isString()
    .notEmpty()
    .withMessage("Content is required")
    .trim(),

  check("date").notEmpty().withMessage("Time is required").trim(),
];

const blogCommentValidator = [
  check("name")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Name is required")
    .trim(),

  check("comment")
    .isString()
    .notEmpty()
    .withMessage("Comment is required")
    .trim(),
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

module.exports = {
  blogValidator,
  blogCommentValidator,
  blogValidatorMessageHandler,
};
