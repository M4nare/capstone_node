function tagAPI(req, res) {
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
    tagAPI: tagAPI 
  }