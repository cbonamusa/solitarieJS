const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = ["A", "2", "3", "4" ,"5" ,"6" ,"7" ,"8" ,"9" ,"10" ,"J" ,"Q" ,"K"];
const PILETYPE = {
    ACCEPTALL: "all",
    ASCENDENTS: "asc",
    DESCENDENTS: "des"
}


export default class Deck {
    constructor(cards) {
       this.cards = cards || completeDeck();
    }
    /* Send to the end the card in the pile */
    push(card) {
        this.cards.push(card)
    }
    /* Shuffle the cards in random order */
    shuffle() {
        for ( let i = this.cards.length - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
}
 
class Pile {
    constructor(cards, identif, pileType) {
        this.cards = cards,
        this.pileType = pileType;
        //externalizar
        this.pileDiv = document.createElement('div');
        this.pileDiv.innerText = this.numberOfCards;
        this.pileDiv.classList.add('pile',`pile-${identif}`);
    }
    get numberOfCards() { return this.cards.length }
    createHTML() {
        return this.pileDiv
    }
    refresh() {
        this.pileDiv.innerText = this.numberOfCards;
    }
    pushCard(card) {
        this.cards.unshift(card);
        this.refresh();
    }
    popCard() {
        let retCard = this.cards.pop();
        this.refresh();
        return retCard;
    }
    pushAll(getCards){
        this.cards = getCards;
        this.refresh();
    }
    popAll(){
        let retCards = this.cards;
        this.cards =[];
        this.refresh();
        return retCards;
    }

    canPushCard(card) {
        let acceptedCard = false;
        switch(this.pileType) {
            case 'acceptAll':
                acceptedCard = true;
            break;
            case 'dontAccept':
                acceptedCard = false;
            break;
            case 'descendence':
                acceptedCard = card.color != this.cards[this.cards.length-1] && card.amount == this.cards[this.cards.length-1].amount -1 || this.cards.length == 0 && card.amount == 13;
            break;
            default:
                acceptedCard = card.suit == this.pileType && card.amount == this.cards[this.cards.length-1].amount +1;
            break;
        }
        this.pushCard(card);
        return acceptedCard;
    }
}

class Card {
    constructor (suit, value, amount) {
        this.suit = suit;
        this.value = value;
        this.amount = amount;
        this.color = suit === '♣' || suit === '♠' ? 'black' : 'red';
    }
    generateDOMElement(show) {
        const cardEl = document.createElement('li');
        cardEl.innerText = this.suit;
        cardEl.classList.add("card", this.color);
        cardEl.dataset.value = `${this.value} ${this.suit}`;
        cardEl.dataset.suit =`${this.suit}`;
        cardEl.setAttribute('draggable', true);
        cardEl.value = `${this.amount}`;
        show ? cardEl.dataset.show = 'show' : cardEl.dataset.show = 'hide';
        return cardEl
    }
}

function completeDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map((value, index) => {
            return new Card(suit, value, index+1)
        })
    })
}

export { Pile }