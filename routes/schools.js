'use strict'

// Router
const express = require('express')
let router = express.Router()

// Connection
const connection = require('../database/bookshelf')
const functions = require('../functions')

// Repository
const SchoolRepository = require('../repositories/school-repository');
const Schools = new SchoolRepository();

// ROUTES
// GET ALL ------------------
const getSchools = () => {
    return Schools.getAll()
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.get('/', async (req, res) => {
    getSchools()
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.end(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(JSON.stringify(
            {
                "error": err.message,
                "code": err.code
            })
        )
    })
})


// GET ONE ------------------
const getSchool = (id) => {
    return Schools.getOne(id)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.get('/:id/', async (req, res) => {
    getSchool(req.params.id)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.end(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(JSON.stringify(
            {
                "error": err.message,
                "code": err.code
            })
        )
    })
})


// GET SPELLS FROM ONE ------------------
const getSpellsFromOne = (id) => {
    return Schools.getSpellsFromOne(id)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.get('/:id/spells', async (req, res) => {
    getSpellsFromOne(req.params.id)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.end(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(JSON.stringify(
            {
                "error": err.message,
                "code": err.code
            })
        )
    })
})


// CREATE ONE ------------------
const addSchool = (s) => {
    return Schools.addOne(s)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.post('/', async (req, res) => {
    addSchool(req.body)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.send(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(JSON.stringify(
            {
                "error": err.message,
                "code": err.code
            })
        )
    })
})

// UPDATE ONE ------------------
const updateSchool = (id, s) => {
    return Schools.updateOne(id, s)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.put('/:id/', async (req, res) => {
    updateSchool(req.params.id, req.body)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.send(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(JSON.stringify(
            {
                "error": err.message,
                "code": err.code
            })
        )
    })
})


// DELETE ONE ------------------
const deleteSchool = (id) => {
    return Schools.deleteOne(id)
    .catch(err => {
        console.log(err)
        throw err
    })
}
router.delete('/:id/', async (req, res) => {
    deleteSchool(req.params.id)
    .then(v => {
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.send(JSON.stringify(v))
    })
    .catch(err => {
        res.status(err.code).send(JSON.stringify(
            {
                "error": err.message,
                "code": err.code
            })
        )
    })
})

// Param validations
router.param('id', functions.paramIntCheck)

module.exports = router