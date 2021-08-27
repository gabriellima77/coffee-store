import Content from './src/content.js';

window.onload = ()=> {
  const content = new Content();
  const links = [...document.querySelectorAll('nav li')];
  const searchBar = document.querySelector('.search');
  const start = async()=> {
    content.putCoffeesByType('hot');
    searchBar.addEventListener('keyup', (e)=> content.filterCoffees(e.target.value, 'search'));
    links.forEach(link =>{
      const type = (link.textContent === 'Quente')? 'hot': 'iced';
      link.addEventListener('click', ()=> content.putCoffeesByType(type));
    });
  }

  start();
  
}