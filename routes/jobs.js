const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

router.get("/test", (req, res) => {
  res.send("deu certo.");
});

//detalhe da vaga
router.get("/view/:id", (req, res) =>
  Job.findOne({
    where: { id: req.params.id },
  })
    .then((job) => {
      res.render("view", {
        job,
      });
    })
    .catch((err) => console.log(err))
);

// add job
router.get("/add", (req, res) => {
  res.render("add");
});

//create
router.post("/add", (req, res) => {
  let { title, salary, company, description, email, new_job } = req.body;
  Job.create({
    title,
    salary,
    company,
    description,
    email,
    new_job,
  })
    .then(() => res.redirect("/"))
    .catch((err) => console.lor(err));
});

// formulário de edição
router.get('/edit/:id', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).send('Vaga não encontrada');
 
    res.render('edit', { job });
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao carregar vaga para edição');
  }
});

// atualiza uma vaga
router.post('/edit/:id', async (req, res) => {
  try {
    const { title, salary, company, description, email, new_job } = req.body;
 
    await Job.update(
      { title, salary, company, description, email, new_job },
      { where: { id: req.params.id } }
    );
 
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao atualizar a vaga');
  }
});

// exclui uma vaga
router.get('/delete/:id', async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).send('Vaga não encontrada');
 
    res.render('delete', { job });
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao carregar vaga para edição');
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    await Job.destroy({ where: { id: req.params.id } });
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erro ao excluir a vaga');
  }
});

module.exports = router;
