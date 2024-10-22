const express = require('express')
const bodyPaser = require('body-parser')
const cors = require('cors')

const PORT = 5000
const app = express()

app.use(bodyPaser.json())
app.use(cors())

let courses = [
    {
        name: "Web Development",
        duration: "40 hours",
        fees: 'Rs 500'
    },
    {
        name: "Ethical Hacking",
        duration: "20 hours",
        fees: 'Rs 800'
    },
    {
        name: "Data Analysis",
        duration: "30 hours",
        fees: 'Rs 500'
    },
    {
        name: "Artificial Intelligence",
        duration: "30 hours",
        fees: 'Rs 900'
    },
]

app.get("/", (req, res) => {
    res.json(courses)
})

app.post('/inquire', (req, res) => {
    const {name, message} = req.body

    if(!name || !message){
        return res.status(400).send("Please fill all the details")
    }

    const inquiry = {
        name: name,
        message: message,
    }

    console.log(inquiry)

    return res.status(200).json(inquiry)

})

app.listen(PORT, () => {
    console.log("Server is running ", PORT)
})