import mongoose from "mongoose";
import 'dotenv/config'

async function connectDb(){
    await mongoose.connect(`mongodb+srv://jfgomes458:PlwWGMFKEvXG8EUm@gatherspherecluster.jssxneu.mongodb.net/?retryWrites=true&w=majority`)
}

export default connectDb