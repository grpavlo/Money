const  Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')

router.post('/registration', (req, res) => {
    userController.registration(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.post('/login', (req, res) => {
    userController.login(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.post('/forgot', (req, res) => {
    userController.forgot(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.post('/getId', (req, res) => {
    userController.getId(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.post('/money', (req, res) => {
    userController.money(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.post('/total', (req, res) => {
    userController.total(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.post('/income', (req, res) => {
    userController.income(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.post('/totalIncome', (req, res) => {
    userController.totalIncome(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

router.delete('/delete', (req, res) => {
    userController.deleteDB(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})


module.exports = router