import express from 'express'
import fs from 'fs/promises'

const app = express(); 

const port = process.env.PORT || 3001

let jsonData; 
let roster; 

// reading in our JSON file using the fs library 
const readJson = async () => {
    const data = await fs.readFile('data.json', 'utf-8');
    jsonData = JSON.parse(data)
    roster = jsonData.roster;
}

// calling the readJson function and then setting up our app to listen on our port 
readJson().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})
// set up endpoint to send all roster data 
app.get('/roster', (req, res) => {
    res.send(jsonData)
})

// set up endpoint for requests about age 
app.get('/age', (req, res) => {
    //[url]/age?max=30
    const reqAge = req.query.max; //  get the age requested

    let selectedPlayers = []; 

    roster.forEach((player) => {
        if(player.age <= reqAge){
            selectedPlayers.push(player.last_name)
            console.log(player.last_name)
        }
    })
    res.send(selectedPlayers)
    
})

app.get('/yearsActive', (req, res) => {
    ///yearsActive?min=5
    const minYearsActive = req.query.min; // getting the value that the user requested
  

    let selectedPlayers = []; 
    roster.forEach((player) => {
        if (player.years_active >= minYearsActive){
            selectedPlayers.push(player.last_name)
        }
    })

    res.send(selectedPlayers)
    
})
// set up endpoint for a requesting a specific player 
app.get('/player/:player', (req, res) => {

    // getting the player that was requested 
    const reqPlayer = req.params.player.substring(1);
    //const roster = jsonData.roster; 

    roster.forEach((player,index) => {
        if(player.last_name == reqPlayer){
            console.log(index)
            const reqPlayerData = roster[index]; 
            res.send(reqPlayerData)
        }
    })
    
})