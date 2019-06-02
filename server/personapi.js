module.exports=function(app,dbserver){
    let dao=require('./persondao')(dbserver);

    app.get("/api/person",function(req,resp){
        dao.getAll(function({error,rows}){
            resp.json(rows);
        });
    });

    app.get("/api/person/:id",function(req,resp){
        let id = Number(req.params.id);
        dao.get(id,function({error,rows}){
            resp.json(rows[0]);
        });
    });

    app.delete("/api/person/:id",function(req,resp){
        var id = Number(req.params.id);
        dao.delete(id,function({error,sucess}){
            resp.send('{"success":"Deleted"}');
        });
      });

           

    app.post("/api/person",function(req,resp){
        dao.insert(req.body,function({error,rows}){
        resp.json(req.body);
    });
});

    app.put("/api/person/:id",function(req,resp){
        dao.update(req.body,function({error,rows}){
            resp.json(req.body);
        });
    });
    
}