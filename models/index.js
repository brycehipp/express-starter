const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const _ = require('lodash')

const basename = path.join(__dirname, path.basename(__filename))
const config = require('../config/config')

const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  )
}

const walkSync = d =>
  fs.statSync(d).isDirectory()
    ? fs.readdirSync(d).map(f => walkSync(path.join(d, f)))
    : d

function importModel(file) {
  if (file.indexOf('.js') === -1 || file === basename) return
  const model = sequelize.import(file)
  db[model.name] = model
}

_.forEach(walkSync(__dirname), libraries => {
  // avoid to include files inside the same folder
  if (_.isArray(libraries)) {
    _.forEach(_.flattenDeep(libraries), lib => importModel(lib))
  } else {
    importModel(libraries)
  }
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
