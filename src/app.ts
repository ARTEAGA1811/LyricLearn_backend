import "dotenv/config"
import express from "express"
import cors from "cors"
import {router} from "./routes"
import bd from "./config/mongo.db";

const app = express()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(router)


//Conexión a la BD
bd()
    .then(() => console.log("Conexión a la BD lista"))
    .catch(e => console.error(`Error al conectar la BD ${e}`))


app.listen(PORT, () => console.log(`Escuchando desde el puerto ${PORT}`));
