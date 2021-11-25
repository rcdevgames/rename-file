const db = require('./config');
var fs = require('fs');

db.serialize(function(){

    let sql = "SELECT mr.*, c.kode_pelanggan FROM meter_reading mr INNER JOIN customers c ON mr.id_pelanggan = c.id";
    db.all(sql, (err, rows) => {
        if (err) throw err;

        if(rows){
            // cetak isi rows
            rows.forEach(data => {
                const nameFile = data.foto_meter.split("/");
                const extension = data.foto_meter.split(".");
                console.log(`Rename from ${nameFile[nameFile.length - 1]} to ${data.kode_pelanggan}${+ "." + extension[extension.length - 1]}`);
                fs.rename(__dirname + "/Pictures/" + nameFile[nameFile.length - 1], __dirname + "/result/" + data.kode_pelanggan + "." + extension[extension.length - 1], function(err) {
                    if ( err ) console.log('ERROR: ' + err);
                });
            });
        } else {
            console.log("tidak ada data/hasil");
        }
    });

});

db.close();