import db from '../db/db.js'
import recordModel from '../models/record.js'

// basic check for db access
const testController = async (req, res) => {
  if (!db) {
    res.status = 500
    res.send('No DB Connection available')
  }
  res.send({ status: 'Mongo database connection established' })
}

// GET all records.
const modelRecords = db.model('record', recordModel)
const getAllRecords = async (req, res) => {
  var data = await modelRecords.find({}).lean().select('timestamp ip')
  return data
}

// Add a new record.
const createRecord = async (req, res) => {
  const newRecord = new modelRecords({
    timestamp: new Date(),
    ip: req.ip
  })
  return await newRecord.save()
}

export { getAllRecords, createRecord, testController }
