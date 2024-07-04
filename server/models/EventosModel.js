import { Sequelize } from "sequelize";
import db from "../confing/Database.js";
import Users from "./UserModel.js";
import Teams from "./TeamsModel.js"
import Sponsors from "./SponsorsModel.js";

const { DataTypes } = Sequelize;

const Events = db.define('events', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        validate: {
            isDate: true,
        }
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            notEmpty: true,
            max: 250,
        }
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pendiente',
        validate: {
            isIn: [['activo', 'inactivo', 'pendiente', 'cancelado']]
        }
    },
    aceptado: {
        type: DataTypes.BOOLEAN,
        allowNull: true, 
        defaultValue: null 
    },
    justificacion: {
        type: DataTypes.TEXT,
        allowNull: true, 
    }
}, {
    freezeTableName: true
});

Users.hasMany(Events);
Teams.hasMany(Events);
Sponsors.hasMany(Events);

export default Events;
