import { Sequelize } from "sequelize";

import db from "../confing/Database.js";

const {DataTypes} = Sequelize;

const Categorys = db.define('categorys', {
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
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100],
            isAlpha: true,
        }
    },
    limite:{
        type: DataTypes.INTEGER,
        //asi se generara automaticamente por sequelize
        allowNull: false,
        validate:{
            isInt: true,
            notEmpty: true,
            max: 20,
            isNumeric: true
        }
    },
}, {
    freezeTableName: true
});

export default Categorys;