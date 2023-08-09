const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017'

const sampleFun = ()=>{
    return new Promise(async (resolve, reject) => {
        const client = await MongoClient.connect(url);
        const doc = await client.db('shopping').collection('cart').aggregate([
            {
                $match:{
                    userId:'64d083728ac351ff5fb7e10f'
                }
            },{
                $unwind:'$productList'
            },{
                $set:{
                    quantity:'$productList.quantity',
                    proId:'$productList.proId'
                }
            },{
                $project:{
                    
                    productList:0,
                    
                }
            },{
                $lookup:{
                    from:'product',
                    localField:'proId',
                    foreignField:'_id',
                    as:'productDetails'
                }
            }
        ]).toArray()
        client.close()
        resolve(doc)
    })
}
sampleFun().then((result) => {
    console.log(result[0].productDetails[0]);
})




// const sampleFun = () => {
//     return new Promise(async (resolve, reject) => {
//         const client = await MongoClient.connect(url)
//         const db = client.db('sample');
//         const studentCollection = db.collection('student');
//         const markCollection = db.collection('mark');
//         const aggregationPipeline = [
//            {
//                 $lookup:{
//                     from:'mark',
//                     localField:'rollNo',
//                     foreignField:'RegisterNumber',
//                     as:'markList'
//                 }
//             }
            
//         ];
//         const doc = await studentCollection.aggregate(aggregationPipeline).toArray()
//         resolve(doc)
//     })
// }
// sampleFun({
   
// }).then((response) => {
//     console.log(response);
// })





// const addToCart = (userId,proId) => {
//     return new Promise(async (resolve, reject) =>{
//         const client = await MongoClient.connect(url)
//         const user = await client.db('sample').collection('new').findOne({userId:userId})
//         if(user){
//             // if user is exist
//             let productExist = false;
//             user.productList.map(product => {
//                 if(product.proId === proId){
//                     productExist= true
//                 }
//             })
//             if(productExist){
//                 const doc = await client.db('sample').collection('new').updateOne({userId:userId}, {
//                     $inc:{
//                         'productList.$[outer].quantity':1
//                     }
//                 },{
//                     arrayFilters:[
//                         {'outer.proId': proId}
//                     ]
//                 })
//                 client.close()
//                 resolve('Product and user exist')
//             }else{
//                 // user only exist product Not contain
//                 const doc = await client.db('sample').collection('new').updateOne({userId:userId}, {
//                     $push:{
//                         'productList':{
//                             proId:proId,
//                             quantity:1
//                         }
//                     }
//                 })
//                 client.close()
//                 resolve('User only exist')
//             }
//         }else{
//             //user doesNot exist
//             const newDoc = {
//                 userId:userId,
//                 productList:[{ proId:proId, quantity:1}]
//             }
//             const doc = await client.db('sample').collection('new').insertOne(newDoc);
//             client.close()
//             resolve('User doesnot exist')
//         }
//     })
// }

// addToCart(6, "P2").then((user) => {
//     console.log(user);
// })


//{ name: 'ajmal' }, { $push: { hobbie:'swimming'}}

// const sampleDoc = {
//     student: [
//         { name: "ajmal", mark: [
//             {
//                 term:'1',
//                 physics:90,
//                 maths:80,
//                 chemistry:50
//             },
//             {
//                 term:'2',
//                 physics:80,
//                 chemistry:100,
//                 maths:50
//             }
//         ] },
//         { name: "amjed", mark: [
//             {
//                 term: '1',
//                 physics: 50,
//                 maths: 70,
//                 chemistry: 40
//             },
//             {
//                 term: '2',
//                 physics: 90,
//                 chemistry: 90,
//                 maths: 60
//             }
//         ] }
//     ]
// }
// const item = 4;

// MongoClient.connect(url).then(client => {
//     client.db('sample').collection('new').
//     updateOne({'student.name':'ajmal', 'student.mark.term':'2'},{$set:{'student.$[outer].mark.$[inner].seminar':90}}, {
//         arrayFilters:[
//             {'outer.name':'ajmal'},
//             {'inner.term' : '2'}
//         ]
//     })
//     .then((doc) => {
//         console.log(doc);
//     })
// })
// let school = {
//     teachers:{
//         mechanical:[
//             {
//                 name:'Shahid',
//                 phoneNumber:'5634624674',
//                 place:'calicut'
//             },
//             {
//                 name: 'Rekha L',
//                 phoneNumber: '5634624674',
//                 place: 'trivandrum'
//             },
//             {
//                 name: 'Manmohan cm',
//                 phoneNumber: '5634624674',
//                 place: 'kasargod'
//             }
//         ],
//         civil:[
//             {
//                 name: 'Uma K',
//                 phoneNumber: '5634624674',
//                 place: 'thrissur'
//             },
//             {
//                 name: 'Alex',
//                 phoneNumber: '5634624674',
//                 place: 'trivandrum'
//             },
//             {
//                 name: 'Akhil',
//                 phoneNumber: '5634624674',
//                 place: 'kasargod'
//             }
//         ]
//     },
//     students:{
//         mechanical: [
//             {
//                 name: 'Amjed ali',
//                 phoneNumber: '5634624674',
//                 place: 'calicut'
//             },
//             {
//                 name: 'Ajmal M',
//                 phoneNumber: '5634624674',
//                 place: 'malappuram'
//             },
//             {
//                 name: 'Ismail',
//                 phoneNumber: '5634624674',
//                 place: 'Kondotty'
//             }
//         ],
//         civil: [
//             {
//                 name: 'Shahul',
//                 phoneNumber: '5634624674',
//                 place: 'Kozhikode'
//             },
//             {
//                 name: 'Shadil',
//                 phoneNumber: '5634624674',
//                 place: 'Malappuram'
//             },
//             {
//                 name: 'Faheem',
//                 phoneNumber: '5634624674',
//                 place: 'malappuram'
//             }
//         ]
//     }
// }


// const sampleDoc = {
//     items: [
//         { name: "item1", sizes: ["S", "M"] },
//         { name: "item2", sizes: ["L", "XL"] }
//     ]
// }



// MongoClient.connect(url).then((client) => {
//     client.db('sample').collection('new').
//     updateOne(
//         {},
//         {
//             $set:{
//                 'items.$[outer].name':'newItem'
//             },
//             $push:{
//                 'items.$[outer].colors':'red'
//             }
//         },
//         {
//             arrayFilters:[
//                 {
//                     'outer.name':'item1'
//                 }
//             ]
//         }
//     )
//     .then((doc) => {
//         console.log(sampleDoc);
//         client.close()
//     })
// })
