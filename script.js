import Content from './src/content.js';

window.onload = ()=> {
  const content = new Content();
  const burger = document.querySelector('.burger');

  const links = [...document.querySelectorAll('nav li')];
  const searchBar = document.querySelector('.search');
  const start = async()=> {
    // Começa na seção de cafés quentes
    content.putCoffeesByType('hot');
    searchBar.addEventListener('keyup', (e)=> content.filterCoffees(e.target.value, 'search'));
    // Evento para o menu de hamburger
    burger.addEventListener('click', ()=> {
      const header = document.querySelector('header');
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.toggle('active');
      burger.classList.toggle('active');
      const hasPanel = document.querySelector('.panel');
      if(navLinks.classList.contains('active')){
        header.style.position = 'fixed';
        if(hasPanel) hasPanel.style.display = 'none';
      } else {
        header.style.position = null;
        if(hasPanel) hasPanel.style.display = 'flex';
      }
    });
    // Adiciona evento para cada link, para pegar os dados e listar os itens
    links.forEach(link =>{
      const type = link.textContent.toLowerCase();
      link.addEventListener('click', ()=> {
        const header = document.querySelector('header');
        const hasActive = document.querySelector('nav .active');
        const isMenuActive = document.querySelector('.nav-links.active');
        if(isMenuActive) {
          isMenuActive.classList.remove('active');
          burger.classList.remove('active');
          header.style.position = null;
        }
        if(hasActive) hasActive.classList.remove('active');
        link.classList.add('active');
        content.putCoffeesByType(type);
      });
    });
  }

  start();
  
}