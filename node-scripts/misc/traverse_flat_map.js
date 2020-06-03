const traverse = require('traverse')

const example_document1 = {
    doc_root: {
        node_1:{
            child1:{
                message: "hey hello"
            }
        },
        node_2:{
            child1: {
                message: "this is second child"
            }
        }
    }
}

const example_document2 = {
    doc_root: {
        node_21:{
            child21:{
                message: "hey hello2"
            }
        },
        node_22:{
            child21: {
                message: "this is second child2"
            }
        }
    }
}

const traverse_and_map = ()=>{
   const arr = [{p:"name",q:["1","2"]},{p:"name1",q:["3","4"]},{p:"name2",q:["5","6"]}]
    var x = arr.map(val => {return val.q})
    console.log(x)
    var z = arr.flatMap((val,i) => { return val.q.map(t => parseInt(t)*2) })
    console.log(z)
}
traverse_and_map()