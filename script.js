import Card from './src/card.js';

window.onload = ()=> {
  const URL = {
    hot: 'https://api.sampleapis.com/coffee/hot',
    iced: 'https://api.sampleapis.com/coffee/iced'
  };

  const getData = async(url)=> {
    const response = await fetch(url, {mode: 'cors'});
    const data = await response.json();
    return data;
  }

  /* 
    percorre toda a lista de cafés
    se o café tiver um titulo eu adiciono ele para a lista de cartas
    isso é para evitar a adição de cafés sem conteúdo
    e retorna uma lista de cartas
  */
  const getCards = (coffeeList)=> {
    const cards = [];
    coffeeList.forEach((coffee)=>
      (coffee.title)? cards.push(new Card(coffee).getCard): null 
    );
    return cards;
  }

  const start = async()=> {
    const main = document.querySelector('main');
    const coffeeList = await getData(URL.hot);
    const cards = getCards(coffeeList);
    console.log(coffeeList);
  }

  start();
  
}