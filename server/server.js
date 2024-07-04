import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
//importamos la conexion para poder sincronizar el modelo
//y generar la tabla automaticamente
import db from "./confing/Database.js";


import UserRoute from "./routes/UserRoute.js";
import EventsRoute from "./routes/EventRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import TeamRoute from "./routes/TeamRoute.js";
import CategoryRoutes from "./routes/CategoryRoute.js";

//funcion
dotenv.config();

const app = express();
app.disable('x-powered-by');
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});


//metodo asincrono
/*(async()=>{
    await db.sync();
})();*/


//definicion de session
//secreto
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    //se puede usar false o true dependiendo de si se usa el protocolo http o https
    //dejare que sea automaticamente detectado
    cookie: {
        secure: 'auto'
    }
}));


//middleware

//credenciales instanciado en verdadero
//para que la interfaz pueda enviar solicitudes 
//junto con cookjies al incluir credenciales
//
app.use(cors({
    credentials: true,
    //si quisiera permitir mas de un dominio uso []
    origin: 'http://localhost:3000'
}));

//recibir datos en formato json
app.use(express.json());
app.use(UserRoute);
app.use(EventsRoute);
app.use(AuthRoute);
app.use(TeamRoute);
app.use(CategoryRoutes);

//store.sync();

app.listen(process.env.APP_PORT, ()=>{
    console.log('server up and running...')
});