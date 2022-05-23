import db from '../db/db.js'
import { RestaurantSchema } from '../models/Restaurant.js'

const restaurants = db.model('product', RestaurantSchema, 'restaurants')
// GET all records.
const getAllRecords = async (req, res) => {
  var data = await restaurants.find({}).lean().limit(100)
  return data
}

// SEARCH using Atlas Search
const search = async (req, res) => {
  var data = await restaurants.aggregate().search({
    index: 'cuisine',
    text: {
      query: req.params.term,
      path: {
        wildcard: '*'
      }
    }
  })
  return data
}

export { getAllRecords, search }
