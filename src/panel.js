
export default class Panel {
  showDetails = ({title, description, ingredients})=> {
    const container = document.querySelector('.container');
    this.removeCoffees();
    container.style.gridTemplateColumns = 'none';
    const panel = document.createElement('div');
    const returnBtn = document.createElement('button');
    const h3 = document.createElement('h3');
    const img = document.createElement('img');
    const desc = document.createElement('p');
    const ingr = document.createElement('p');

    panel.classList.add('panel');
    h3.classList.add('title');
    img.classList.add('panelImg');
    desc.classList.add('description');
    ingr.classList.add('ingredients');

    title.textContent = title;
    description.textContent = description;
    const startText = (ingredients.length > 1)?'Os ingredientes são ': 'O ingrediente é ';
    ingredients.textContent =  startText + ingredients.join(', ');
    
    img.src = '../assets/coffee-cup.png';

    panel.appendChild(returnBtn);
    panel.appendChild(h3);
    panel.appendChild(ingredients);
    panel.appendChild(img);
    panel.appendChild(ingredients);
  }
}