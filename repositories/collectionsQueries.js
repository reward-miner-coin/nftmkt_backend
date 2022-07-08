import client from "../db/db.js";

class CollectionQueries {
    GetAllCollections(){
        return client.queryArray(
          "Select * from collections"
        )
    }
    GetAlSingleCollection(name){
        return client.queryObject(
            "Select * from collections where LOWER(collection_name) = $1", [name]
        )
    }
}

export default new CollectionQueries();