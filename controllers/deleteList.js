function deleteListAPI(req, res) {
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
    deleteListAPI: deleteListAPI
  }