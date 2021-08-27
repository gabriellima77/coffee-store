import Content from './src/content.js';

window.onload = ()=> {
  const content = new Content();
  const links = [...document.querySelectorAll('nav li')];
  const searchBar = document.querySelector('.search');
  const start = async()=> {
    content.putCoffeesByType('hot');
    searchBar.addEventListener('keyup', (e)=> content.filterCoffees(e.target.value, 'search'));
    links.forEach(link =>{
      const type = link.textContent.toLowerCase();
      link.addEventListener('click', ()=> {
        const hasActive = document.querySelector('nav .active');
        if(hasActive) hasActive.classList.remove('active');
        link.classList.add('active');
        content.putCoffeesByType(type);
      });
    });
  }

  start();
  
}