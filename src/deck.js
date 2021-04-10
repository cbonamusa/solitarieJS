const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = ["A", "2", "3", "4" ,"5" ,"6" ,"7" ,"8" ,"9" ,"10" ,"J" ,"Q" ,"K"];

export default class Deck {
    constructor(cards = completeDeck()) {
       this.cards = cards
    }
    get numberOfCards() {
        return this.cards.length
    }
    /* Shows the first card of the deck pile */
    // pop() {
    //     return this.cards.shift()
    // }
    /* Send to the end the card in the pile */
    push(card) {
        this.cards.push(card)
    }
    /* Shuffle the cards in random order */
    shuffle() {
        for ( let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
}
 
class Pile {
    constructor(cards, pileDiv) {
        this.cards = cards,
        this.pileDiv = document.createElement('div');
        this.pileDiv.innerText = this.numberOfCards;
        this.pileDiv.classList.add(`pile`);
    }
    
    get numberOfCards() {
        return this.cards.length
    }
    createHTML() {
        return this.pileDiv
    }

    refresh() {
        this.pileDiv.innerText = this.numberOfCards;
    }

    pushCard(card) {
        this.refresh();
        this.cards.unshift(card);
    }
    /* Shows the first card of the deck pile */
    popCard(card) {
        this.refresh();
        return this.cards.shift();
        this.cards.pushCard(card);
    }

    validateCard() {

    }

}

class Card {
    constructor (suit, value, amount ) {
        this.suit = suit,
        this.value = value,
        this.amount = amount + 1,
        this.color = suit === '♣' || suit === '♠' ? 'black' : 'red';
    }
    
    getHTML() {
        const cardDiv = document.createElement('div');
        cardDiv.innerText = this.suit;
        cardDiv.classList.add("card", this.color);
        cardDiv.dataset.value = `${this.value} ${this.suit}`;
        cardDiv.value = `${this.amount}`;
        return cardDiv
    }
}

function completeDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map((value, amount) => {
            return new Card(suit, value, amount)
        })
    })
}

// function pilesOfCards() {
//     let pile = new Array();
//     for ( let i = 1; i <= 7; i++ ) { 
//         pile.push(new Deck(deck.cards.splice(0,i))); 
//     }
// }

export { Pile }