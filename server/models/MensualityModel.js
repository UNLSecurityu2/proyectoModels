import { Sequelize } from "sequelize";

import db from "../confing/Database.js";


const {DataTypes} = Sequelize;

const Mensualitys = db.define('mensualitys', {
    uuid:{
        type: DataTypes.STRING,
        //asi se generara automaticamente por sequelize
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len:[3, 20],
            isAlpha: true
        }
    },
    valor:{
        type: DataTypes.FLOAT,
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            notEmpty: true,
            len:[3, 20],
            isNumeric: true
        }
    }
}, {
    freezeTableName: true
});

export default Mensualitys;

