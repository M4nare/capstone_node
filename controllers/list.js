function listAPI(req, res) {
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
                        if(rows[0] == undefined){
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

module.exports = {
    listAPI: listAPI
  }