const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = ["A", "2", "3", "4" ,"5" ,"6" ,"7" ,"8" ,"9" ,"10" ,"J" ,"Q" ,"K"];


export default class Deck {
    constructor(cards = completeDeck()) {
       this.cards = cards
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
        this.pileDiv = document.createElement('div');
        this.pileDiv.innerText = this.numberOfCards;
        this.pileDiv.classList.add('pile',`pile-${identif}`);
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
        this.cards.unshift(card);
        this.refresh();
    }
    popCard() {
        let retCard = this.cards.shift();
        this.refresh();
        return retCard;
    }
    pushAll(getCards){
        this.cards = getCards;
        this.refresh();
    }
    popAll(){
        let retCards = this.cards.reverse();
        this.cards =[];
        this.refresh();
        return retCards;
    }

    matchSuitAndNum() {
        // if (this.cards.suit == this.suit && this.cards.value) {
        //     this.pushCard();
        // }
    }
    matchNumAndColor(val, color) {

    }
}

class Card {
    constructor (suit, value, amount ) {
        this.suit = suit,
        this.value = value,
        this.amount = amount + 1,
        this.color = suit === '♣' || suit === '♠' ? 'black' : 'red';
        this.show = false;
    }
    getHTML() {
        const cardEl = document.createElement('li');
        cardEl.innerText = this.suit;
        cardEl.classList.add("card", this.color);
        cardEl.dataset.value = `${this.value} ${this.suit}`;
        cardEl.dataset.suit =`${this.suit}`;
        cardEl.setAttribute('draggable', true);
        cardEl.value = `${this.amount}`;
        return cardEl
    }
}

function completeDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map((value, amount) => {
            return new Card(suit, value, amount)
        })
    })
}

export { Pile }