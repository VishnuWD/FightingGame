
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')


const updateGame = (p1,p2,gameState) => {

  p1NameDiv.innerText = p1.name
  p2NameDiv.innerText = p2.name
  p1HealthDiv.innerText = p1.health
  p2HealthDiv.innerText = p2.health

  
    if(p1.health <= 0 || p2.health <= 0){
      game.isOver = true
        gameState = game.isOver
        resultDiv.innerText= game.declareWinner(game.isOver, p1, p2)
        return gameState
    }
}

class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }
 
  strike (player, enemy, attackDmg) {
    
    let damageAmount = Math.floor(Math.random()* attackDmg + 1)
    
    enemy.health -= damageAmount

    updateGame(p1, p2, game.isOver)

    return `${player.name} attacks ${enemy.name} for ${damageAmount} damage`

  }
  // ** Heal the player for random number from  1 to 5 **
  heal (player) {
    
    const hpAmount = Math.floor(Math.random()*5 + 1)

    player.health += hpAmount
    updateGame(p1, p2, game.isOver)
    return `${player.name} heals for ${hpAmount} hp`

  }
}

// ** Create the Game class with all it's attributes and methods to run a match **
class Game {
  constructor() {
    this.isOver = false;
  }

  declareWinner(isOver, p1, p2) {
    
    let message = "TIE!"
    if (isOver == true && p1.health <= 0) {
      message = `${p2.name} WINS!`;
    }
    else if(isOver == true && p2.health <= 0) {
      message = `${p1.name} WINS!`
    } 
    
    document.getElementById('victory').play()
    return message
  }

  // ** Reset the players health back to it's original state and isOver to FALSE **
  reset(p1,p2) {
     p1.health = 100
     p2.health = 100
     isOver = false
     resultDiv.innerText = ""
     updateGame(p1, p2, game.isOver)
  }
  
  // ** Simulates the whole match untill one player runs out of health **
  play(p1, p2) {
    // Reset to make sure player health is back to full before starting
    this.reset(p1, p2)


    while (!this.isOver) {
      p1.strike(p1, p2, p1.attackDmg)
      p2.heal(p2)
      p2.strike(p2, p1, p2.attackDmg)
      p1.heal(p1)
      
    }
    return this.declareWinner(this.isOver, p1, p2)
    
  }

}


const player1 = new Player("Frasag", 100, 10)
const player2 = new Player("Vishnu", 100, 10)


let p1 = player1;
let p2 = player2;

// ** Create the game object from the Game class **

let game = new Game()

updateGame(p1, p2, isOver = false)

let gameState = isOver;


playButton.onclick = () => resultDiv.innerText = game.play(p1, p2)

// ** Player 1 Controls **
document.addEventListener('keydown', function(e) {

  if(e.key == "q" && p1.health >= 0 && isOver == false){
    p1.strike(p1, p2, p1.attackDmg)
    document.getElementById("p1attack").play()
}


});

document.addEventListener('keydown', function(e) {
  
  if(e.key == "a" && p1.health >= 0 && isOver == false){
    p1.heal(p1)
    document.getElementById("p1heal").play()
}

});

// ** Player 2 Controls **
document.addEventListener('keydown', function(e) {
  
  if(e.key == "p" && p2.health >= 0 && isOver == false){
    p2.strike(p2, p1 , p2.attackDmg)
    document.getElementById("p2attack").play()
}

});

document.addEventListener('keydown', function(e) {

  if(e.key == "l" && p2.health >= 0 && isOver == false){
      p2.heal(p2)
      document.getElementById("p2heal").play()
  }

});

