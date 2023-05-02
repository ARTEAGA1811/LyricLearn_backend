import "dotenv/config"
import express from "express"
import cors from "cors"
import {router} from "./routes"
import bd from "./config/mongo.db";
import cookieParser from "cookie-parser";

const app = express()

const PORT = process.env.PORT || 3001

//app.use(cors())
app.use(cors({
    origin: 'http://127.0.0.1:3000',
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use(router)


//Conexión a la BD
bd()
    .then(() => console.log("Conexión a la BD lista"))
    .catch(e => console.error(`Error al conectar la BD ${e}`))


app.listen(PORT, () => console.log(`Escuchando desde el puerto ${PORT}`));
