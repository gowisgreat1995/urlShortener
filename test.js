 var mongo = require('mongodb').MongoClient;
    mongo.connect('mongodb://gowisgreat1995:dontdarehackme123*@cluster0-shard-00-00-1hsjf.mongodb.net:27017,cluster0-shard-00-01-1hsjf.mongodb.net:27017,cluster0-shard-00-02-1hsjf.mongodb.net:27017/Cluster0?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
                  
                  function(err, db) {

        db.createCollection("urls");
        var urls=db.collection("urls");
        
        if(db.collection("urls"))
            console.log("collection exists");
    urls.insert({
            urlOriginal:"www.google.com",
            urlShort:"www.gmail.com"
            
        },function(err,docs){
            console.log("success");
        });
        } );
        
       
   

