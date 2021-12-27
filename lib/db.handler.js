import clientPromise from "./db.config"
// cname = collections name
export  function  insert(data,cname){

    return new Promise(async (resolve,reject)=>{

        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection(cname);

        try {

            let res = await collection.insertOne({...data})
            resolve(res)
            
        } catch (error) {
            reject(error)
        }

    })

}