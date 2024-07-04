import { Sequelize } from "sequelize";
//Sequelize proporciona una interfaz para trabajar con estas bases de datos de 
//manera sencilla y eficiente, utilizando el patrón de mapeo objeto-relacional (ORM).
//nueva secuencia donde estara el nombre de la base de datos
//y pasamos el usuario y clave

class Database {
  constructor() {
    this.sequelize = new Sequelize('auth_db1', 'root', '',{
      host: "localhost",
      dialect: "mysql"
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance.sequelize;
  }
}

export default Database.getInstance();
