import mongoose from "mongoose";
import 'dotenv/config'

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

async function connectDb(){
    await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@gatherspherecluster.jssxneu.mongodb.net/?retryWrites=true&w=majority`)
}

export default connectDb