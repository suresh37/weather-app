var syncAdded = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
             resolve(a+b);
            }
            else {
                reject('Arguments must be numbers')
            }
        }, 1500)
     })
}
syncAdded(1,2)
.then((data) => {
    console.log('Result: '+data)
    return syncAdded(data,4)
})
.then(data => console.log(data))
.catch((err) =>  console.log(err))

var somePromise = new Promise((resolve, reject) => {
    var num = Math.random()
    if (num > 0.5) {
        resolve('Resolve: Number is above 0.5')
    }
    else {
        reject('Reject: Number is less than 0.5')
    }
})

let promise = somePromise;
 promise.then((data) => console.log(data))
    .catch((data) => console.log(data))  