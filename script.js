import Content from './src/content.js';

window.onload = ()=> {
  const content = new Content();
  const start = async()=> {
    content.putCoffes('hot');
  }

  start();
  
}