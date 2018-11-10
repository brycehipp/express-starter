const express = require('express')

const router = express.Router()
const mainController = require('../controllers/mainController')

const attachRoutes = (routerObj, routes) => {
  routes.forEach(route => {
    routerObj[route.method](route.path, route.controller)
  })
}

router.get('/', mainController.homePage)

module.exports = router
