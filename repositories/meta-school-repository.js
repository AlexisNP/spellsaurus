'use strict'
// Bookshelf
const bookshelf = require('../database/bookshelf').bookshelf
const model = require('../models/meta-school-model')

// Model validation
const Validator = require('jsonschema').Validator
const v = new Validator()
const MetaSchoolValidation = require("../validations/MetaSchoolValidation")
v.addSchema(MetaSchoolValidation, "/MetaSchoolValidation")

// Validations
const regexXSS = RegExp(/<[^>]*script/)

// Error handling
const { HttpError } = require('../validations/Errors')

class MetaSchoolRepository {

    constructor() {
    }

    getAll() {
        return new Promise((resolve, reject) => {
            model.forge()
            .fetchAll({ withRelated: ['schools'] })
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject(new HttpError(500, "Couldn't get meta schools"))
            })
        })
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            model.forge()
            .where({ 'id' : id })
            .fetch({ withRelated: ['schools']})
            .then(v => {
                resolve(v.toJSON({ omitPivot: true }))
            })
            .catch(err => {
                console.log(err)
                reject(new HttpError(500, "Couldn't get meta school"))
            })
        })
    }

    // Check if object is null
    isEmptyObject = (obj) => {
        if (Object.keys(obj).length === 0 && obj.constructor === Object) {
            return true
        } else {
            return false
        }
    }

    // Check if script injection attempt
    isXSSAttempt = (string) => {
        if (regexXSS.test(string)) {
            return true
        } else {
            return false
        }
    }

}

module.exports = MetaSchoolRepository