function helloAPI (req, res){
  res.status(200).json(
    {
      "success" : true
    }
  );
}


module.exports = {
  helloAPI: helloAPI
}