import { Router } from 'express'
import { getUsers, createUser, delUser, editUser, updateUser, authUser, privateRoute, verifyToken, requirePassword } from './controllers/UserController.js'
import { getEvents, createEvent, delEvent, editEvent } from './controllers/EventController.js'

const routes = Router()

routes.get('/users', requirePassword, getUsers)
routes.post('/users', createUser)
routes.post('/users/login', authUser)
routes.get('/users/:id', verifyToken, privateRoute)
routes.delete('/users/:id', requirePassword, delUser)
routes.put('/users/:id', editUser)
routes.patch('/users/:id', updateUser)//Aprender a colocar token pra fazer essa atualização

routes.get('/events', getEvents)
routes.post('/events', requirePassword, createEvent)
routes.delete('/events/:id', requirePassword, delEvent)
routes.put('/events/:id', editEvent)

export default routes