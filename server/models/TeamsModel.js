import { Sequelize } from "sequelize";
import Categorys from "./CategoryModel.js"
import db from "../confing/Database.js";


const {DataTypes} = Sequelize;

const Teams = db.define('Teams', {
    uuid:{
        type: DataTypes.STRING,
        //asi se generara automaticamente por sequelize
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100],
            isAlpha: true
        }
    },
    ciudadRepresentante:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len:[1, 20],
            isAlpha: true
        }
    },
}, {
    //NOMBRE DE LA TABLA IGUAL AL MISMO NOMBRE DEL MODELO
    freezeTableName: true
});

Categorys.hasMany(Teams);

export default Teams;