import { getAllRecords, search } from '../controllers/Restaurant.js'
export default async function routes(fastify, options) {
  // gets all restaurant records
  fastify.get('/restaurant', async (request, reply) => {
    return await getAllRecords(request, reply)
  })

  // searches all fields (paths) for search term.
  fastify.get('/restaurant/search/:term', async (request, reply) => {
    return await search(request, reply)
  })
}
