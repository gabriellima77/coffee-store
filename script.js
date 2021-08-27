window.onload = ()=> {
  const URL = {
    hot: 'https://api.sampleapis.com/coffee/hot',
    iced: 'https://api.sampleapis.com/coffee/iced'
  };

  const getData = async(url)=> {
    const response = await fetch(url, {mode: 'cors'});
    const data = await response.json();
    console.log(data);
  }

  getData(URL.hot);
}