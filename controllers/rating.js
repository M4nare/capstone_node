function ratingAPI(req, res) {
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
    ratingAPI: ratingAPI
  }