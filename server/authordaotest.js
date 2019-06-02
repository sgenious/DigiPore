

/*
function getDao(server) {
    return {
        getAll(cb){
            server.query("select * from author", result => cb(result));
        }
    }
}
*/

let authorDaoFactory=require('./authordao');

let dbserver=require('./mysqlhelper');
let dao=authorDaoFactory(dbserver);

dao.getAll(({rows}) => console.log(rows));
/*
dbserver.insert("INSERT INTO author SET ?",{lastName:'Linna',firstName:'Väinö'},
                    ({data}) => console.log(data.insertId));
*/