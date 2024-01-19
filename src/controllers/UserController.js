import Users from "../models/Users.js";
import * as bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

async function getUsers(request, response){
    const users = await Users.find()
    return response.status(200).json(users)
}

async function createUser(request, response){
    const { password } = request.body
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    const user = request.body
    user['password'] = passwordHash
    const newUser = await Users.create(user)
    return response.status(201).json(newUser)
}

async function delUser(request, response){
    const id = request.params.id
    await Users.findByIdAndDelete({ _id: id })
    return response.status(200).json({ response: 'User deleted' })
}

async function editUser(request, response){
    const id = request.params.id
    await Users.replaceOne({ _id: id }, request.body)
    return response.status(200).json({ response: 'User edited' })
}

async function updateUser(request, response){
    const id = request.params.id
    await Users.updateOne({ _id: id}, request.body)
    return response.status(200).json({ response: 'User updated' })
}

async function authUser(request, response){
    const { email, password } = request.body
    const user = await Users.findOne({ email: email })
    if (!user){
        return response.status(404).json({ response: 'User not found' })
    }
    const verifyPassword = await bcrypt.compare(password, user.password)
    if (!verifyPassword){
        return response.status(422).json({ response: 'Wrong password' })
    }
    try{
        const secret = 'OIASJasddLKDJASLKDJASDLKASJDlkjdlkasdASLKDJASDLKAWJDOIA'
        const token = jwt.sign({
            id: user._id
        }, secret)
        const id = user._id
        response.status(200).json({ response: 'Login successful', token, id, user })
    }
    catch(err){
        console.log(err)
    }
}

async function privateRoute(request, response){
    const id = request.params.id
    const user = await Users.findById(id, '-password')
    if (!user){
        return response.status(404).json({ response: 'User not found' })
    }
    response.status(200).json({ user })
}

function verifyToken(request, response, next){
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token){
        return response.status(401).json({ response: 'Access denied' })
    }
    try{
        const secret = 'OIASJasddLKDJASLKDJASDLKASJDlkjdlkasdASLKDJASDLKAWJDOIA'
        jwt.verify(token, secret)
        next()
    }
    catch(err){
        response.status(400).json({ response: 'Invalid access token' })
    }
}

function requirePassword(request, response, next){
    const passwordHeader = request.headers['authorization']
    const password = passwordHeader && passwordHeader.split(' ')[1]
    if (!password){
        return response.status(401).json({ response: 'Access denied' })
    } else {
        if (password == 'uwGfQquUX1ndfROQjZSVXFx9Ky4BnXhj9tIIkSctzvs9Z6waBQ'){
            next()
        } else {
            response.status(400).json({ response: 'Invalid password' })
        }
    }
}

export { getUsers, createUser, delUser, editUser, updateUser, authUser, privateRoute, verifyToken, requirePassword }