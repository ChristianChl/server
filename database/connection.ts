import { Sequelize } from "sequelize";

//DEV

const db = new Sequelize('interview_db' , 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    // logggin: false,
});


//PRO

// const db = new Sequelize(process.env.DB_DATABASE||'interview_db' , process.env.DB_USER||'interview', process.env.DB_PASSWORD||'interview123', {
//     host: process.env.DB_HOST||'movistardb.cjcmv3tc2pyq.us-east1.rds.amazonaws.com',
//     dialect: 'mysql',
//     logging: true,
//     // port: 3306,
// });


export default db;