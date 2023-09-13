// module.exports = {
//     secret: "quiz",
//     development: {
//         user: 'karuniya',
//         passwd: 'Pwd07kn2019',
//         db: "quizdb",
//         host: '192.168.1.101',
//         dialect: 'mysql',
//         // logging: false
//     }
// };

const env = {
    secret: "quiz",
    isLive: true,
   // 'UAT':{
   //   database: 'quizdb',
  //    username: 'karuniya',
  //    password: 'Pwd07kn2019',
 //     host: '192.168.1.101',
 //     dialect: 'mysql',
 //     ssl:true,
 //     dialectOptions: { ssl: { require: true } } ,
//      pool: {
 //       max: 5,
 //       min: 0,
 //       acquire: 30000, 
 //       idle: 10000
 //     },
 //     secret: "quiz",
 //   },
  
    'LIVE':{
      database: 'quizdb',
      username: 'dravidam',
      password: 'REt4f34@d',
      host: '43.204.14.85',
      dialect: 'mysql',
      ssl:true,
      dialectOptions: { ssl: { require: true } } ,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000, 
        idle: 10000
      },
      secret: "quiz",
    }
  };
   
  module.exports = env.isLive ? env.LIVE : env.UAT;
