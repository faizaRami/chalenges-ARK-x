const app = require('express')();

const PORT = 3000;
app.listen(
    PORT,
    () => console.log(`Server is running on ${PORT}`)
)

app.get('/', (req, res)=>{
    res.send("Welcome to my Express.js server!")
})
// app.post('/postRequest', (req, res)=>{
//     res.send("Hi This is POST Method")
// })