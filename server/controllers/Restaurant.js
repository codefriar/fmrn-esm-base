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
  var data = await restaurants
    .aggregate()
    .search({
      autocomplete: {
        // adding facets to add categories
        query: req.params.term,
        fuzzy: {
          maxEdits: 2,
          prefixLength: 3
        },
        path: 'name'
      }
    })
    .addFields({
      avgScore: {
        $map: {
          input: '$grades.grade',
          in: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: ['$$this', 'A']
                  },
                  then: 5
                },
                {
                  case: {
                    $eq: ['$$this', 'B']
                  },
                  then: 4
                },
                {
                  case: {
                    $eq: ['$$this', 'C']
                  },
                  then: 3
                },
                {
                  case: {
                    $eq: ['$$this', 'D']
                  },
                  then: 2
                }
              ],
              default: 1
            }
          }
        }
      }
    })
    .addFields({
      avgScore: {
        $round: [
          {
            $avg: '$avgScore'
          }
        ]
      }
    })
    .addFields({
      avgScoreLetter: {
        $switch: {
          branches: [
            {
              case: {
                $eq: ['$avgScore', 5]
              },
              then: 'A'
            },
            {
              case: {
                $eq: ['$avgScore', 4]
              },
              then: 'B'
            },
            {
              case: {
                $eq: ['$avgScore', 3]
              },
              then: 'C'
            },
            {
              case: {
                $eq: ['$avgScore', 2]
              },
              then: 'D'
            }
          ],
          default: 'F'
        }
      }
    })
  return data
}

export { getAllRecords, search }
