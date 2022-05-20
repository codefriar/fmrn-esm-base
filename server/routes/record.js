import { getAllRecords, createRecord } from '../controllers/record.js'
export default async function routes(fastify, options) {
  // diagnostic route.
  fastify.get('/', async (request, reply) => {
    reply.send({
      message: { hello: 'world' }
    })
  })

  fastify.get('/record', async (request, reply) => {
    return await getAllRecords(request, reply)
  })

  fastify.post('/record/add', async (request, reply) => {
    return await createRecord(request, reply)
  })
}
