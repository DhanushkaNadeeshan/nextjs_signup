import clientPromise from "./db.config"
// cname = collections name
export  function  insert(data,cname){

    return new Promise(async (resolve,reject)=>{

        
        try {
            
            const client = await clientPromise;
            const db = client.db();
            const collection = db.collection(cname);
            let res = await collection.insertOne({...data})
            resolve(res)
            
        } catch (error) {
            console.error(error)
            reject(error)
        }

    })

}