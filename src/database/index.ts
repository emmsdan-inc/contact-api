import {Sequelize} from 'sequelize-typescript';
// @ts-ignore
import config from './config/index'

import colorsCli from 'colors-cli/safe'


export default class Database {
    public sequelize!: Sequelize

    constructor(__app, __http) {
        this.sequelize = new Sequelize({
            ...config[process.env.NODE_ENV || 'development'],
            paranoid: true,
            freezeTableName: true,
            models: [__dirname + '/models'],
        });
        this.authentication()
    }

    authentication() {
       this.sequelize.authenticate().
           then(()=> {
               console.log(colorsCli.green_bbt.x16('Database Server started successfully.'))
           }).
           catch((error)=> {
           console.log(colorsCli.red_bt.bold('Database Server could not be started'))
           console.log(colorsCli.red(error.message))
       })
    }

}