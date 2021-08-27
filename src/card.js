// Classe para lidar os dados de um dos elementos da lista de cafés
export default class Card {
  constructor(title, description, ingredients, id) {
    this._title = title;
    this._description = description;
    this._ingredients = ingredients;
    this._id = id;
  }

  // Retorna a carta com todo o conteudo da api
  get getCard() {
    const card = document.createElement('div');
    const title = document.createElement('h3');
    const description = document.createElement('p');
    const ingredients = document.createElement('p');

    card.classList.add('card');
    title.classList.add('title');
    description.classList.add('description');
    ingredients.classList.add('ingredients');

    title.textContent = this._title;
    description.textContent = this._description;
    ingredients.textContent = this._ingredients;

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(ingredients);

    return card;
  }
}