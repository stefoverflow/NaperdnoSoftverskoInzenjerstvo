const express = require('express')
const prisoners = require('../models/Prisoners');
// const uuid = require('uuid')
const router = express.Router();

router.get('/', function (req, res) {
    res.json(prisoners);
  });

router.get('/:name', function (req, res) {
    const found = prisoners.some(prisoner => prisoner.name === req.params.name);
    if (found) {
        res.json(prisoners.filter(prisoner => prisoner.name === req.params.name));
    } else {
        res.status(400).json({ msg: `No prisoner with name: ${req.params.name}`});
    }
  });

router.post('/', function(req, res) {
    const newPrisoner = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }

    if (!newPrisoner.name || !newPrisoner.email || !newPrisoner.age) {
        res.status(400).json({ msg: 'Please include all information'});
        return;
    }

    prisoners.push(newPrisoner)

    res.json(prisoners)
  });

router.put('/:name', function (req, res) {
    const found = prisoners.some(prisoner => prisoner.name === req.params.name);
    if (found) {
        const updPrisoner = req.body;
        prisoners.forEach(prisoner => {
            if(prisoner.name === req.params.name) {
                prisoner.name = updPrisoner.name ? updPrisoner.name : prisoner.name;
                prisoner.email = updPrisoner.email ? updPrisoner.email : prisoner.email;
                prisoner.age = updPrisoner.age ? updPrisoner.age : prisoner.age;

                res.json({ msg: 'Prisoner updated', prisoner})
            }
        })
    } else {
        res.status(400).json({ msg: `No prisoner with name: ${req.params.name}`});
    }
  });

router.delete('/:name', function (req, res) {
    const found = prisoners.find(prisoner => prisoner.name === req.params.name);
    if (found) {
        const index = prisoners.indexOf(found);
        prisoners.splice(index, 1);
        res.json({ msg: 'Prisoner deleted', prisoners: prisoners.filter(prisoner => prisoner.name !== req.params.name)});
    } else {
        res.status(400).json({ msg: `No prisoner with name: ${req.params.name}`});
    }
  });

module.exports = router;