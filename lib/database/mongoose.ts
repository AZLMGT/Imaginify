import mongoose , { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL

interface MongooseConnection {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null
}

let cahced: MongooseConnection = (global as any).mongoose

if(!cahced){
    cahced = (global as any).mongoose = {
        conn: null, promise:null
    }
}

export const connectToDatabase = async () => {
    if(cahced.conn) return cahced.conn

    if(!MONGODB_URL) throw new Error('Missing MONGODB_URL')

    cahced.promise = cahced.promise || mongoose.connect(MONGODB_URL, 
        {dbName: 'Imaginify', bufferCommands:false})

    cahced.conn = await cahced.promise

    return cahced.conn
}