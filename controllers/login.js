function loginAPI(req, res) {
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
    loginAPI: loginAPI
  }

  