import React from 'react';
import BacksideofCard from './image/piratecard.jpg';
import "./Card.css";

const Card = ({card, handleChoice, TurnAroundCard, pause}) => {
   
const handleClick = () => {
        if(!pause){
            handleChoice(card);
  }
        
}

return (
  <div className="Card">   
        
  <div className={TurnAroundCard ? "TurnAroundCard" : ""}>
   <img src={`${card.image}`} alt="Framsida" className="FrontOfCardimage"/>
   <img src={`${BacksideofCard}`} alt="Baksida" onClick={handleClick} className="BackOfCardimage" />
    </div>
         
    </div>
    );
};


export default Card;

