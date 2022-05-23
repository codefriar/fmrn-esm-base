import { getAllRecords, search } from '../controllers/Restaurant.js'
export default async function routes(fastify, options) {
  fastify.get('/restaurant', async (request, reply) => {
    return await getAllRecords(request, reply)
  })

  fastify.get('/restaurant/search/:term', async (request, reply) => {
    return await search(request, reply)
  })
}
