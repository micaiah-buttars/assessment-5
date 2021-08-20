const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

let complimentID = 4
const compliments = [
  { id: 1,
    text: "Gee, you're a smart cookie!"},
  { id: 2,
    text: "Cool shirt!"},
  { id: 3,
    text: "Your Javascript skills are stellar."},
];

app.get("/api/compliment", (req, res) => {

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get("/api/fortune", (req, res) => {
  const fortune = ["Observation: This is a GREAT opportunity for slaughter.",
					 "Query: Would you rather be caught with contraband that is 'very' illegal, or just a little illegal?",
					 "Defiant Statement: There is nothing you can do to me. Do your worst.",
           "Cautionary: Oh, no, master. In fact, that is the worst thing you can do.",
           "Answer: Kill their allies, or place them in jeopardy."
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * fortune.length);
  let randomFortune = fortune[randomIndex];

  res.status(200).send(randomFortune);
  
});

app.post("/api/compliment", (req, res) => {
  let {text} = req.body
  compliments.push({
    id: complimentID,
    text: text
  })
  complimentID++
  res.status(200).send(compliments[compliments.length - 1].text);

})

app.get("/api/compliments", (req, res) => {
  res.status(200).send(compliments)
})

app.delete("/api/compliment/:id", (req, res) => {
  let {id} = req.params.id
  let index = compliments.findIndex(e => e.id === +id)
  compliments.splice(index, 1)
  res.status(200).send(compliments);

})

app.listen(4000, () => console.log("Server running on 4000"));
