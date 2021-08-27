import Card from "./card.js";

export default class Content {

  removeTags = ()=> {
    const tagsContainer = document.querySelector('.tags');
    const tagsList = [...document.querySelectorAll('.tag')];
    tagsList.forEach(tag=> tagsContainer.removeChild(tag));
  }

  putTags = ()=> {
    this.removeTags();
    const tagsContainer = document.querySelector('.tags');
    let allTags = [];
    // Pega todos os ingredientes, com várias repetições;
    this.coffeeList.forEach((coffee)=> {
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
      divTag.addEventListener('click', ()=> this.filterCoffees(tag, 'tag'));
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
    coffeeList.forEach((coffee)=>{
      if(coffee.title){
        const newCard = new Card(coffee).getCard;
        newCard.addEventListener('click', ()=> this.showDetails(coffee));
        cards.push(newCard);
      }
    }
    );
    return cards;
  }

  putCoffeesByType = async(type) => {
    if(type !== 'hot' && type !== 'iced') return -1;
    const panel = document.querySelector('.panel');
    if(panel){
      panel.parentElement.removeChild(panel);
      this.removeContainerStyles();
    }
    this.removeCoffees();
    const coffeeList = await this.getData(type);
    this.coffeeList = coffeeList;
    this.putTags();
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
    cards.forEach(card => container.removeChild(card));
  }
  /* 
    Filtra a lista de cafés baseados no tipo de evento
    Eventos: Tag e pesquisa
  */
  filterCoffees(text, type) {
    const panel = document.querySelector('.panel');
    if(panel){
      panel.parentElement.removeChild(panel);
      this.removeContainerStyles();
    }
    let filteredList;
    if(type === 'tag') {
      filteredList = this.coffeeList.filter(coffee=> (coffee.ingredients)
        ?coffee.ingredients.includes(text): null
      );
    } else {
      filteredList = this.coffeeList.filter(coffee=> {
        const upperCaseInput = text.toUpperCase();
        if(coffee.title){
          const upperCaseTitle = coffee.title.toUpperCase();
          return (upperCaseTitle.includes(upperCaseInput))
            ? coffee: null;
        }
      });
    }
    this.removeCoffees();
    this.putCoffees(filteredList);
  }

  showDetails = ({title, description, ingredients})=> {
    const container = document.querySelector('.container');
    this.removeCoffees();
    container.style.gridTemplateColumns = 'none';
    container.style.placeItems = 'center';
    const panel = document.createElement('div');
    const returnBtn = document.createElement('button');
    const h3 = document.createElement('h3');
    const img = document.createElement('img');
    const desc = document.createElement('p');
    const ingr = document.createElement('p');

    panel.classList.add('panel');
    returnBtn.classList.add('return');
    h3.classList.add('title');
    img.classList.add('panelImg');
    desc.classList.add('description');
    ingr.classList.add('ingredients');

    h3.textContent = title;
    desc.textContent = description;
    const startText = (ingredients.length > 1)?'The ingredients are ': 'The ingredient is ';
    ingr.textContent =  startText + ingredients.join(', ') + '.';
    
    img.src = '../assets/coffee-cup.png';

    returnBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    returnBtn.addEventListener('click', ()=>{
      panel.parentElement.removeChild(panel);
      this.removeContainerStyles();
      this.putCoffees(this.coffeeList);
    });

    panel.appendChild(returnBtn);
    panel.appendChild(h3);
    panel.appendChild(ingr);
    panel.appendChild(img);
    panel.appendChild(desc);

    container.appendChild(panel);
  }

  removeContainerStyles = ()=> {
    const container = document.querySelector('.container');
    container.style = null;
  }
}