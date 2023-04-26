//Es como el manager de las rutas
//Ahora las rutas tomarás el nombre del archivo que se le da.
//Excluyendo este, por supuesto.

import {Router} from "express";
import {readdirSync} from "fs"


const PATH_ROUTER = `${__dirname}`
const router = Router();

const cleanFileName = (filename: string) => {
    //Le quito el nombre del archivo ".ts"
    const myFile = filename.split(".")[0]
    return myFile

}

//Va a escanear y ver cuantos archivos o directorios disponibles hay
readdirSync(PATH_ROUTER).filter((filename) => {
    const myFile = cleanFileName(filename)
    //El index no cuenta.
    if (myFile != "index") {
        //Importación dinámica
        import(`./${myFile}`).then((moduleRouter) => {
            console.log(myFile)
            router.use(`/${myFile}`, moduleRouter.router)
        })
    }
})
export {router}