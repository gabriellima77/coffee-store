import Card from "./card.js";

export default class Content {

  removeTags = ()=> {
    const tagsContainer = document.querySelector('.tags');
    const tagsList = [...document.querySelectorAll('.tag')];
    tagsList.forEach(tag=> tagsContainer.removeChild(tag));
  }

  putTags = (coffeeList)=> {
    this.removeTags();
    const tagsContainer = document.querySelector('.tags');
    let allTags = [];
    // Pega todos os ingredientes, com várias repetições;
    coffeeList.forEach((coffee)=> {
      if(coffee.ingredients){
        const ingredients = [...coffee.ingredients];
        allTags = [...allTags, ...ingredients];
      } 
    });
    // Pega apenas as tags unicas
    const uniqueTags = [...new Set(allTags)];
    uniqueTags.forEach(tag=> {
      const divTag = document.createElement('div');
      divTag.classList.add('tag');
      divTag.textContent = tag;
      divTag.title = tag;
      divTag.addEventListener('click', ()=> this.filterCoffees(coffeeList, tag, 'tag'));
      tagsContainer.appendChild(divTag);
    })
  }

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

  putCoffeesByType = async(type) => {
    if(type !== 'hot' && type !== 'iced') return -1;
    this.removeCoffees();
    const coffeeList = await this.getData(type);
    console.log(coffeeList);
    this.putTags(coffeeList);
    this.putCoffees(coffeeList);
  }

  putCoffees = (coffeeList)=> {
    const container = document.querySelector('.container');
    const cards = this.getCards(coffeeList);
    cards.forEach((card)=> container.appendChild(card)); // adiciona as cartas a main
  }

  // remove todas as cartas de café
  removeCoffees() {
    const container = document.querySelector('.container');
    const cards = [...document.querySelectorAll('.card')];
    console.log(cards);
    cards.forEach(card => container.removeChild(card));
  }
  /* 
    Filtra a lista de cafés baseados no tipo de evento
    Eventos: Tag e pesquisa
  */
  filterCoffees(coffeeList, text, type) {
    let filteredList;
    if(type === 'tag') {
      filteredList = coffeeList.filter(coffee=> (coffee.ingredients)
        ?coffee.ingredients.includes(text): null
      );
    } else {
      filteredList = coffeeList.filter(coffee=> {
        const upperCaseInput = text.toUpperCase();
        if(coffee.title.toUpperCase().contains(upperCaseInput)){
          return coffee;
        }
      });
    }
    this.removeCoffees();
    this.putCoffees(filteredList);
  }

}