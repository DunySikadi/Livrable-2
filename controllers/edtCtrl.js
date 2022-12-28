const Edt = require("../models/edt");
const edtValidation = require("../Validation/edtValidation");

exports.getAll = (req, res) => {
  Edt
    .findAll
    // {attributes: {
    //   exclude: ["createdAt", "updatedAt"],
    // },}
    ()
    .then((Edts) => {
      res.status(200).json(Edts);
    })
    .catch((error) => res.status(500).json(error));
};

exports.getOne = (req, res) => {
  const { id } = req.params;
  Edt.findByPk(id)
    .then((edt) => {
      if (!edt) return res.status(404).json({ msg: "Not Found" });
      res.status(200).json(edt);
    })
    .catch((error) => res.status(500).json(error));
};

exports.createOne = (req, res) => {
  const { body } = req;
  const { error } = edtValidation(body);
  if (error) return res.status(401).json(error.details[0].message);

  Edt.create({ ...body })
    .then(() => {
      res.status(201).json({ msg: "Created Ressource" });
    })
    .catch((error) => res.status(500).json(error));
};

exports.updateOne = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  Edt.findByPk(id)
    .then((edt) => {
      if (!edt) return res.status(404).json({ msg: "Not Found" });
      edt.teacher = body.teacher;
      edt
        .save()
        .then(() => res.status(201).json({ msg: "Updated Ressource" }))
        .catch((error) => res.status(500).json(error));
    })
    .catch();
};

exports.deleteOne = (req, res) => {
  const { id } = req.params;

  Edt.destroy({ where: { id: id } })
    .then((ressource) => {
      if (ressource == 0) return res.status(404).json({ msg: "Not Found" });
      res.status(200).json({ msg: "Deleted Ressource" });
    })
    .catch((error) => res.status(500).json(error));
};
