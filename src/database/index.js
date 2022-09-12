import Sequelize from "sequelize"

import Products from "../app/models/Products"
import User from "../app/models/User"
import Category from "../app/models/Category"

import configDatabase from "../config/database"

const models = [User, Products, Category]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models.map((models) => models.init(this.connection))
  }
}

export default new Database()
