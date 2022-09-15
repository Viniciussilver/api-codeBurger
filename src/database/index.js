import Sequelize from "sequelize"
import mongoose from "mongoose"

import Products from "../app/models/Products"
import User from "../app/models/User"
import Category from "../app/models/Category"

import configDatabase from "../config/database"

const models = [User, Products, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models
      .map((models) => models.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://localhost:27017/codeburger",
      {
        useNewUrlParser: true,
        useUnifiedTopoLogy: true,
      }
    )
  }
}

export default new Database()
