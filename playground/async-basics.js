console.log('starting app')

setTimeout( () => {
   console.log('inside callback 1')
},2000)

setTimeout( () => {
    console.log('inside callback 2')
 },0)

console.log('finishing up')