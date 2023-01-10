import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const clientValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is invalid."),
  check("email").trim().isEmail().withMessage("E-mail is invalid."),
  check("telefone")
    .trim()
    .isLength({ min: 11, max: 11 })
    .withMessage("Telefone is invalid."),
  check("endereco").trim().not().isEmpty().withMessage("Endereco is invalid."),
  check("cpf")
    .trim()
    .isLength({ min: 11, max: 11 })
    .withMessage("cpf is invalid."),
  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    return next();
  },
];

export { clientValidator };
