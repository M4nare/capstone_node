var mysql = require("mysql");

module.exports = function(app, pool) {
    // >> POST
    app.post("/login", function(req, res) {
        var result = {};
        var user = req.body.user;
         if (user == undefined) {
            result = returnResult(new Error("user is empty."), res);
        } else {
            // db에 연결하여 sql 수행
            pool.getConnection(function(err, conn) {
                var sql = "SELECT * from  User WHERE user = \"" + user + "\";";
                var sql2 = "INSERT INTO User (user) VALUES (\"" + user + "\");";
                console.log("SQL: " + sql);
                conn.query(sql, function(err, rows) {
                    console.log("SQL: " + rows);
                    
                    if(rows == 0)
                    {
                        conn.query(sql2, function(err) {
                            result = returnResult(err, res);
                            conn.release();
                            console.log("SQL: " + sql2);

                        });
                    }
                    else{
                        result = returnResult(err, res);
                    conn.release();

                    }

                });
            });
            result.message = "Success";
       }
        res.send(result);
    });
 
    // >> GET INFO DETAIL

    app.get("/location/:id", function(req, res) {
        var result = {};
       
        var id = mysql.escape(req.params.id);
        
        // db에 연결하여 sql 수행
        pool.getConnection(function(err, conn) {
        	var sql = "select l.*, round(avg(r.rating), 1) as avg, count(*) as cnt from locationinfo as l join rating as r ON l.id = r.id where l.id like"+id+";";
            conn.query(sql, function(err, rows) {
                var result = returnResult(err, res);
                
                if (rows) {
                    result.infodetail = rows;
                    console.log("SQL: " + sql);
                }
                conn.release();
                result.status = res.statusCode;
                res.send(result);
            });
        });
    });

   

   



    // >> TAG POST

    app.post("/tag", function(req, res) {
        var result = {};
        var tag = req.body.tag;
 
        if (tag == undefined) {
            result = returnResult(new Error("Tag is empty."),res);
            result.status = res.statusCode;
            res.send(result);
        } else {
            // db에 연결하여 sql 수행
            pool.getConnection(function(err, conn) {
                var sql = "select l.*, w.Thunderstorm, w.Drizzle, w.Rain, w.Snow, w.Atmosphere, w.Clear, w.Clouds from location as l join weather as w ON l.id = w.id where l.tag like \"%"+tag+"%\";";
                //var sql = "select * from location as l join weather as w ON l.id = w.id where l.tag like \"%"+tag+"%\";";
                console.log("SQL: " + sql);
                conn.query(sql, function(err, rows) {
                    console.log("SQL: " + rows);
                    result = returnResult(err, res);
                    result.info = rows;
                    conn.release();
                    result.status = res.statusCode;
                    res.send(result);
                });
            });
        }
     
    });

    // >> RANDOM POST
    

    app.post("/random", function(req, res) {
        var result = {};
        var weather = req.body.weather;

 
        if (weather == undefined) {
            result = returnResult(new Error("random is empty."),res);
            result.status = res.statusCode;
            res.send(result);
        } else {
            // db에 연결하여 sql 수행
            pool.getConnection(function(err, conn) {
                var sql = "select l.*, w."+weather+" from location as l join weather as w ON l.id = w.id where w."+weather+">=3";
                console.log("SQL: " + sql);
                conn.query(sql, function(err, rows) {
                    console.log("SQL: " + rows);
                    result = returnResult(err, res);
                    result.info = rows;
                    conn.release();
                    result.status = res.statusCode;
                    res.send(result);
                });
            });
        }
    });


    // >> list POST

    app.post("/list", function(req, res) {
        var result = {};
        var id = req.body.id;
        var userid = req.body.userid;
   

        if (id == undefined) {
            result = returnResult(new Error("empty."),res);
            result.status = res.statusCode;
            res.send(result);
            
        } else {
            // db에 연결하여 sql 수행
            pool.getConnection(function(err, conn) {
                var sql = "SELECT * from userlist where id="+id+" AND userid=\""+userid+"\";";
                var sql2 = "SELECT * from location where id="+id+";";
                console.log("SQL: " + sql);
                conn.query(sql, function(err, rows) {
                    console.log("SQL: " + rows);
                    if(rows == 0){
                        conn.query(sql2, function(err, rows) {
                            console.log("SQL: " + sql2);
                            console.log(rows[0]);
                            if(rows[0] == undefined)
                            {
                                result.message = "Not found";
                                res.send(result);
                                conn.release();
                            }
                            else{

        
                            var name =  JSON.stringify(rows[0].name);
                            var img =  JSON.stringify(rows[0].img);
                            var tag =  JSON.stringify(rows[0].tag);
                            var addr =  JSON.stringify(rows[0].addr);
                            

                            var sql1= "INSERT INTO userlist VALUES ("+id+",  "+ userid +" , "+name+", "+addr+", "+img+", "+tag+");";
                            conn.query(sql1, function(err) {
                                result = returnResult(err, res);
                                console.log("SQL: " + sql1);
                                result.message = "Success";
                                res.send(result);
                                conn.release();
                            });
                            

                            }

                        });
                    
                        
                    }

                    else{
                        result.message = "Duplicate values";
                        res.send(result);

                    }
    
                });
            });
        }
    });


    // >> GET MYLIST DETAIL

    app.get("/list/:userid", function(req, res) {
        var result = {};
       
        var userid = mysql.escape(req.params.userid);
        
        // db에 연결하여 sql 수행
        pool.getConnection(function(err, conn) {
        	var sql = "select userlist.id, userlist.name, userlist.addr, userlist.img, userlist.tag from userlist where userid = "+userid+";";
            conn.query(sql, function(err, rows) {
                var result = returnResult(err, res);
                
                if (rows) {
                    result.listdetail = rows;
                    console.log("SQL: " + sql);
                }
                conn.release();
                result.status = res.statusCode;
                res.send(result);
            });
        });
    });


     // >>  DELETE MYLIST

     app.delete("/list", function(req, res) {
        var result = {};
        var id = req.body.id;
        var userid = req.body.userid;
        

        if (userid == undefined) {
            result = returnResult(new Error("userid is empty."),res);
            result.status = res.statusCode;
            res.send(result);
        } else {
            // db에 연결하여 sql 수행
            pool.getConnection(function(err, conn) {
                var sql = "DELETE FROM userlist where id ="+id+" AND userid="+userid+";";
                console.log("SQL: " + sql);
                conn.query(sql, function(err) {
                    result.status = res.statusCode;
                    result.message = "Success";
                    conn.release();
                    res.send(result);
                });
            });
        }
     
    });



     // >> RATING POST

     app.put("/rating", function(req, res) {
        var result = {};
        var id = req.body.id;
        var user = req.body.user;
        var rating = req.body.rating;
 
        if (id == undefined) {
            result = returnResult(new Error("id is empty."),res);
            result.status = res.statusCode;
            res.send(result);
            
        } else {
            // db에 연결하여 sql 수행
            pool.getConnection(function(err, conn) {
                var sql = "SELECT * from rating where id="+id+" AND user=\""+user+"\";";
                var sql1 = "UPDATE rating SET rating ="+rating+" WHERE id = "+id+" AND user=\""+user+"\";";
                var sql2 = "INSERT INTO rating (id, user, rating) VALUES ("+id+", \"" + user + "\", "+rating+");";
                console.log("SQL: " + sql);
                conn.query(sql, function(err, rows) {
                    console.log("SQL: " + rows);

                    if(rows == 0){
                        conn.query(sql2, function(err) {
                            result = returnResult(err, res);
                            conn.release();
                            console.log("SQL: " + sql2);
                        });

                    }
                    else{
                        conn.query(sql1, function(err) {
                            result = returnResult(err, res);
                            conn.release();
                            console.log("SQL: " + sql1);
                        });

                    }
    
                });
            });
            result.message = "Success";
        }
        res.send(result);
    });


}
 
var returnResult = function(err, res) {
    // 결과를 눈으로 보기 쉽게하기 위해 result 객체 생성
    var result = {};
    if (err) {
        res.status(400);
        result.message = err.stack;
    } else {
        res.status(200);
    }
    return result;
}


