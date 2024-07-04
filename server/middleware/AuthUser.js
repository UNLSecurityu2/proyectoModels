import User from "../models/UserModel.js"
//Cadena de responsabilidad (Chain of Responsibility): El controlador verifyUser actúa como un filtro o cadena de responsabilidad 
//para verificar si un usuario está autenticado antes de permitir el acceso a ciertas rutas. Si el usuario no está autenticado, 
//se devuelve un mensaje de error; de lo contrario, la solicitud se pasa al siguiente middleware o controlador.


export const verifyUser = async (req, res, next)=>{
    if(!req.session.userId){
        return res.status(401).json({msg:"inicia sesion por favor"});
    }
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({msg: "usuario no encontrado"});
    req.userId = user.id;
    req.role = user.role;
    next();
}

export const onlyAdmin = async (req, res, next)=>{
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({msg: "usuario no encontrado"});
    //403 prohibido
    if (user.role !=="admin") return res.status(403).json({msg: "no permitido, fuchi!"});
    next();
}