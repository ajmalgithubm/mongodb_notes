const { MongoClient } = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'


const id = '7559842825';
const proId = '3';
//{ name: 'ajmal' }, { $push: { hobbie:'swimming'}}

const sampleDoc = {
    student: [
        { name: "ajmal", mark: [
            {
                term:'1',
                physics:90,
                maths:80,
                chemistry:50
            },
            {
                term:'2',
                physics:80,
                chemistry:100,
                maths:50
            }
        ] },
        { name: "amjed", mark: [
            {
                term: '1',
                physics: 50,
                maths: 70,
                chemistry: 40
            },
            {
                term: '2',
                physics: 90,
                chemistry: 90,
                maths: 60
            }
        ] }
    ]
}
const item = 4;

MongoClient.connect(url).then(client => {
    client.db('sample').collection('new').
    updateOne({'student.name':'ajmal', 'student.mark.term':'2'},{$set:{'student.$[outer].mark.$[inner].seminar':90}}, {
        arrayFilters:[
            {'outer.name':'ajmal'},
            {'inner.term' : '2'}
        ]
    })
    .then((doc) => {
        console.log(doc);
    })
})