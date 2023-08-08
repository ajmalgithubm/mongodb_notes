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
let school = {
    teachers:{
        mechanical:[
            {
                name:'Shahid',
                phoneNumber:'5634624674',
                place:'calicut'
            },
            {
                name: 'Rekha L',
                phoneNumber: '5634624674',
                place: 'trivandrum'
            },
            {
                name: 'Manmohan cm',
                phoneNumber: '5634624674',
                place: 'kasargod'
            }
        ],
        civil:[
            {
                name: 'Uma K',
                phoneNumber: '5634624674',
                place: 'thrissur'
            },
            {
                name: 'Alex',
                phoneNumber: '5634624674',
                place: 'trivandrum'
            },
            {
                name: 'Akhil',
                phoneNumber: '5634624674',
                place: 'kasargod'
            }
        ]
    },
    students:{
        mechanical: [
            {
                name: 'Amjed ali',
                phoneNumber: '5634624674',
                place: 'calicut'
            },
            {
                name: 'Ajmal M',
                phoneNumber: '5634624674',
                place: 'malappuram'
            },
            {
                name: 'Ismail',
                phoneNumber: '5634624674',
                place: 'Kondotty'
            }
        ],
        civil: [
            {
                name: 'Shahul',
                phoneNumber: '5634624674',
                place: 'Kozhikode'
            },
            {
                name: 'Shadil',
                phoneNumber: '5634624674',
                place: 'Malappuram'
            },
            {
                name: 'faheem',
                phoneNumber: '5634624674',
                place: 'malappuram'
            }
        ]
    }
}

MongoClient.connect(url).then((client) => {
    client.db('sample').collection('new').
        updateOne({ 'students.civil.name':'Shadil'},
         {$set:{
            'students.civil.$[outer].place':'Wandoor'
         }}, 
         {
            arrayFilters:[
                {'outer.name': 'Shadil'}
            ]
         }).
    then((doc) => {
        console.log(doc);
    })
})
