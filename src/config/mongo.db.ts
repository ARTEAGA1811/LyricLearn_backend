import "dotenv/config"
import {connect} from "mongoose"

async function dbConnect(): Promise<void> {
    const DB_USER = encodeURIComponent(<string>process.env.DB_USER)
    const DB_PASSWORD = encodeURIComponent(<string>process.env.DB_PASSWORD)
    const DB_NAME = encodeURIComponent(<string>process.env.DB_NAME)
    const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.p9rsckk.mongodb.net/${DB_NAME}`
    await connect(DB_URI);

}


export default dbConnect;