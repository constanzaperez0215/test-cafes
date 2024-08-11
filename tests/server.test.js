const request = require("supertest");
const server = require("../index");
import { describe, test, expect } from 'vitest'

const id = Math.floor(Math.random() * 999)
const cafe = { id, nombre: "fake_coffe" }


describe("Operaciones CRUD de cafes", () => {
  test('REQ1 [GET /cafes] | debe retornar un status code 200 y un array con almenos 1 elemento', async () => {
    const response = await request(server).get('/cafes').send()

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)
  })

  test('REQ2 [DELETE /cafe/:id] | Debería retornar un error 404 cuando el id no exista', async () => {
    const res = await request(server)
      .delete('/cafe/random_cafe')
      .set('Authorization', 'fake_token')
      .send()

    expect(res.status).toBe(404)
  })

  test('REQ extra [DELETE /cafe/:id] | Debería retornar un error 40 cuando el trae el jwt', async () => {
    const res = await request(server).delete('/cafe/random_cafe').send()

    expect(res.status).toBe(404)
  })

  test('REQ3 [POST /cafes] | debe agregar un nuevo cafe y obtener un codigo 201', async () => {
    const res = await request(server).post('/cafes').send(cafe)

    expect(res.status).toBe(201)
    expect(res.body).toContainEqual(cafe)
  })

  test('REQ4, [PUT /cafes/:id] | Debería retornar un 400 al actualizar un params id que no corresponda al payload id', async () => {
    const res = await request(server).put('/cafes/fake_id').send()

    expect(res.status).toBe(400)
  })
});
