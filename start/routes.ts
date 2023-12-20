/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('/users', async ({ response }) => {
  try {
    // const users = await Database.from('users').select('*')
    const users = await User.all()
    return response.status(200).json(users)
  } catch (error) {
    console.error(error)
    return response.status(400).json(error.message)
  }
})

Route.post('/users', async ({ response, request }) => {
  const { email, password, firtName, lastName } = request.all()

  try {
    // await Database.insertQuery()
    //   .table('users')
    //   .insert({ email: email, password: password, firt_name: firtName, last_name: lastName })

    const result = await User.storeUser({
      email: email,
      firtName: firtName,
      lastName: lastName,
      password: password,
    })
    return response.status(200).json(result)
  } catch (error) {
    console.error(error)
    return response.status(400).json(error.message)
  }
})

Route.put('/user/:id', async ({ response, params, request }) => {
  const { firtName } = request.all()
  const { id } = params
  try {
    await Database.from('users').where('id', id).update({ firt_name: firtName })
    return response.status(200).json('user update')
  } catch (error) {
    console.error(error)
    return response.status(400).json(error.message)
  }
})

Route.delete('/user/:id', async ({ request, response, params }) => {
  const { id } = params
  try {
    await Database.from('users').where('id', id).delete()
    return response.status(200).json('user delete')
  } catch (error) {
    console.error(error)
    return response.status(400).json(error.message)
  }
})

Route.get('users/raw', async ({ request, response }) => {
  try {
    const users = await Database.rawQuery('select * from users')
    return response.status(200).json(users)
  } catch (error) {
    console.error(error)
    return response.status(400).json(error.message)
  }
})
