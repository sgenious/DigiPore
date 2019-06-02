

module.exports=function(server) {
    return {
        getAll(cb){
            server.query("select * from person", result => cb(result));
        }
        ,
        get(id, cb){
            server.query("select person.id,person.name,address,image,email,company_id,company.name cname from person INNER JOIN company ON person.company_id=company.id where person.id="+id, result => cb(result));
        },
        insert(person,cb){
            server.insert("INSERT INTO person SET ?", person, result => cb(result));
        },
        update(person,cb){
            server.insert("update person SET name=?,address=?,image=?,email=?,company_id=? where id=?", [person.name, person.address, person.image, person.email, person.company_id, person.id], result => cb(result));
        },
        delete(id,cb){
            server.query("delete from person WHERE id="+id, result => cb(result));
        }
    }
}