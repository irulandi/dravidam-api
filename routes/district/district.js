const express = require('express');
const router = express.Router();
const db = require('./../../database/models');
const DISTRICT = db.district;


router

    .get('/getDistrict', (req, res) => {
        DISTRICT.findAll()
            .then((result) => {
                if (Object.keys(result).length !== 0) {
                    res.status(200).json({
                        isValid: true,
                        message: 'Success',
                        district: result
                    })
                }
                else {
                    res.status(201).json({
                        isValid: false,
                        message: 'No data found.'
                    })
                }
            })
            .catch((err) => {
                res.status(433).json({
                    isSuccessful: false,
                    err: err.message,
                    message: "Unable to get data."
                })
            })
    })


    .post('/addDistrict', (req, res) => {
        let data = {
            districtName: req.body.districtName,
            isActive: req.body.isActive
        }

        DISTRICT.create({
            districtName: req.body.districtName,
            isActive: true
        })
            .then((result) => {
                if (result) {
                    res.status(200).json({
                        isValid: true,
                        districtID: result.id,
                        message: "District created successfully."
                    })
                }
                else {
                    res.status(201).json({
                        isValid: false,
                        message: 'Error in adding data.'
                    })
                }
            })
            .catch((err) => {
                res.status(433).json({
                    isSuccessful: false,
                    err: err.message,
                    message: "Unable to add the District"
                })
            })
    })

    .put('/updateDistrict/:id', (req, res) => {
        let id = req.params.id
        console.log(req.body)
        DISTRICT.update({
            districtName: req.body.districtName,
            isActive: req.body.isActive
        }, {
            where: {
                id: id
            }
        })
            .then((result) => {
                if (result) {
                    res.status(200).json({
                        isValid: true,
                        district: result.id,
                        message: "District updated successfully"
                    })
                }
                else {
                    res.status(201).json({
                        isValid: false,
                        message: 'Error in undating data.'
                    })
                }
            })
            .catch((err) => {
                res.status(433).json({
                    isSuccessful: false,
                    err: err.message,
                    message: "Unable to update the district."
                })
            })
    })

module.exports = router