function locationAPI(req, res) {
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
    locationAPI: locationAPI
  }