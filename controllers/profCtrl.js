const Prof = require("../models/prof");
const profValidation = require("../Validation/profValidation");
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwt.utils");

exports.getAll = (req, res) => {
  Prof
    .findAll
    // {attributes: {
    //   exclude: ["createdAt", "updatedAt"],
    // },}
    ()
    .then((Profs) => {
      res.status(200).json(Profs);
    })
    .catch((error) => res.status(500).json(error));
};

exports.getOne = (req, res) => {
  const { id } = req.params;
  Prof.findByPk(id)
    .then((Prof) => {
      if (!Prof) return res.status(404).json({ msg: "Not Found" });
      res.status(200).json(Prof);
    })
    .catch((error) => res.status(500).json(error));
};

exports.createOne = (req, res) => {
  const { body } = req;
  const { password } = body;
  const { error } = profValidation(body);

  if (error) return res.status(401).json(error.details[0].message);
  bcrypt.hash(password, 5, (err, encrypted) => {
    Prof.create({ ...body, password: encrypted })
      .then(() => {
        res.status(201).json({ msg: "Created Ressource" });
      })
      .catch((err) => res.status(500).json(err));
  });
};

exports.updateOne = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { password } = body;

  bcrypt.hash(password, 5, (err, encrypted) => {
    Prof.findByPk(id)
      .then((Prof) => {
        if (!Prof) return res.status(404).json({ msg: "Not Found" });
        Prof = { ...body, password: encrypted };
        Prof.save()
          .then(() => res.status(201).json({ msg: "Updated Ressource" }))
          .catch((error) => res.status(500).json(error));
      })
      .catch();
  });
};

exports.deleteOne = (req, res) => {
  const { id } = req.params;

  Prof.destroy({ where: { id: id } })
    .then((ressource) => {
      if (ressource == 0) return res.status(404).json({ msg: "Not Found" });
      res.status(200).json({ msg: "Deleted Ressource" });
    })
    .catch((error) => res.status(500).json(error));
};

exports.login = (req, res) => {
  const { lastname, password } = req.body;

  if (lastname == null || password == null) {
    res.status(409).json({
      status: "error",
      message: "Données incompletes pour authentification",
    });
    return;
  }

  Prof.findOne({ where: { lastname: lastname } }).then((profFound) => {
    if (profFound) {
      bcrypt.compare(password, profFound.password, (err, resBcrypt) => {
        if (resBcrypt) {
          res.status(200).json({
            status: "success",
            profId: profFound.id,
            token: jwtUtils.generateTokenForUser(profFound),
          });
          return;
        } else {
          res.status(403).json({
            status: "error",
            message: "donnees de connexion invalides",
          });
        }
      });
    } else {
      res.status(403).json({
        status: "error",
        message: "donnees de connexion invalides",
      });
    }
  });
};
