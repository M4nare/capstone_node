function userListAPI(req, res) {
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
    userListAPI: userListAPI 
  }