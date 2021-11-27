import { useState, useEffect } from 'react';
import Card from './Components/Card';
import './App.css';


function App() {

  const [card, setCard] = useState([]); 
  const [card1, setCard1] = useState();
  const [card2, setCard2] = useState();
  const [pause, setPause] = useState()
  

 
  useEffect(() => { // UseEffect ser till att aktivera korten.
    //Hämtar korten och lägger till dem.
    fetchData(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
 


    async function fetchData(url) {
      const res1 = await fetch(url) 
      const deck = await res1.json();
      const res = await fetch (`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=52`);
      const data = await res.json();
      console.log(data);
      setCard(data);

      
    setCard(prevCard => {
      return prevCard.cards.map(card => { //"map använder man alltid när man ska läsa in flera saker i en array. 
          card.matched=false;
          return card;      
    })
  });
}
    fetchData();
  }, []);

  // Sätter korten till antingen kort1 eller kort2 för att förhindra att ha för många aktiva. 
  const handleChoice = (card) => {
    card1 ? setCard2(card) : setCard1(card);
  }

  useEffect(() => {
    
    if(card1 && card2) {
      setPause(true); // Pausa så du bara kan vända på två kort samtidigt.
    if(card1.value === card2.value) { // kollar om det stämmer.
      setCard(prevCard => { // Om dom stämmer överens, så ändra till true.

    return prevCard.map(card => { //"map använder man alltid när man ska läsa in flera saker i en array.
            if(card.code === card1.code || card.code === card2.code){
    return {...card, matched: true}

    } else {
    return card;

        }
      })
    })

    
    handleRestart(); // Har en reset funktion så vi kan ha två nya kort efter man valt de första två.
      } else {
        
    setTimeout(() => handleRestart(), 2000); // Har en fördröjning så det tar längre tid att se vilka kort man har valt.
      }
    }
  }, [card1, card2]);


  const handleRestart = () => {
    setCard1();
    setCard2();
    setPause(false);
  
  };


  return (
    <div className="App">

    <header className="header">
      <h1>Yarrr, välkommen till Pirate memory spelet.</h1>
      <div>
      Törs du spela din landkrabba? Annars kan du gå på plankan hehehe.
      </div>
    </header>

      <div className="container"> 

    {/* Lägger ut korten. */}
     {card.length === 52 ? 
     (card.map(card => ( //"map använder man alltid när man ska läsa in flera saker i en array. I vårt fall så är det korten då det är inte bara ett kort som ska läsas in."

        <Card 
        card={card}
        key = {card.code}
        handleChoice = {handleChoice}
        TurnAroundCard={card === card1 || card === card2 || card.matched === true}
        pause={pause}
        ></Card>
      
     ))):  
     (<p></p> )
     
     }

    </div>
     </div>

  );

     }

export default App;

    