import Card from "./card.js";

export default class Content {

  getData = async(type)=> {
    const response = await fetch(`https://api.sampleapis.com/coffee/${type}`, {mode: 'cors'});
    const data = await response.json();
    return data;
  }

  /* 
    percorre toda a lista de cafés
    se o café tiver um titulo eu adiciono ele para a lista de cartas
    isso é para evitar a adição de cafés sem conteúdo
    e retorna uma lista de cartas
  */
  getCards = (coffeeList)=> {
    const cards = [];
    coffeeList.forEach((coffee)=>
      (coffee.title)? cards.push(new Card(coffee).getCard): null 
    );
    return cards;
  }

  putCoffes = async(type)=> {
    if(type !== 'hot' && type !== 'iced') return -1;
    const container = document.querySelector('.container');
    const coffeeList = await this.getData(type);
    const cards = this.getCards(coffeeList);
    cards.forEach((card)=> container.appendChild(card)); // adiciona as cartas a main
  }

}