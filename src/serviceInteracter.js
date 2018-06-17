var currentId = 3
var index = require('./index')
var fs = require('fs');
var zlib = require('zlib')






const getData = (req, res) => {
  console.log("in get data")
    var sourceFileName = "ftp://ftp.ncdc.noaa.gov/pub/data/ghcn/daily/by_year/2017.csv.gz"
    var Client = require('ftp');
    var fs = require('fs');
    var csv = require('csv')
    var d = new Date();
    var n = d.getTime();

    let resultsArray = []

    let id = req.params.id;
    if (id.length == 0){
      res.json({hello: "hello"})
      return
    }
    var c = new Client();
    c.on('ready', function() {
      c.get('/pub/data/ghcn/daily/by_year/2017.csv.gz', function(err, stream) {
        if (err) throw err;
        const buffer = []
        stream
          .pipe(zlib.createGunzip())
          .pipe(csv.parse())
          .pipe(csv.transform(row => {
            //row is an array

            if (row[0] === id ){
              resultsArray.push(row)
            }
            if (new Date().getTime() - n > 15000){
              n = new Date().getTime();
              res.json({results: resultsArray})
              return
            }
            return row
          }))
          .pipe(csv.stringify())
          .pipe(process.stdout)
        stream.once('close', function() {
          c.end();
         });
      });
    });
    // connect to host as anonymous
    c.connect({
      host: 'ftp.ncdc.noaa.gov'
    });

}

const hello = (req, res) => {
  console.log("in hello")
  res.json({hello:"hello"})

}


module.exports = app => {
     app.get('/getData/:id', getData)
}
