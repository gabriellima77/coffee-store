// Classe para lidar os dados de um dos elementos da lista de cafés
export default class Card {
  constructor({ title, description, ingredients, id }) {
    this._title = title;
    this._description = description;
    this._ingredients = ingredients;
    this._id = id;
    this.imgSrc = './assets/coffee-cup.png';
  }

  // Retorna a carta com todo o conteudo da api
  get getCard() {
    const card = document.createElement('div');
    const title = document.createElement('h3');
    const img = document.createElement('img');
    const ingredients = document.createElement('p');

    card.classList.add('card');
    title.classList.add('title');
    img.classList.add('cardImg');
    ingredients.classList.add('ingredients');
    

    title.textContent = this._title;
    const start = (this._ingredients.length > 1)? 'Ingredients: ': 'Ingredient: '
    ingredients.textContent = start + this._ingredients.join(', ') + '.';

    img.alt = 'Coffee';
    img.src = this.imgSrc;

    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(ingredients);

    return card;
  }
}