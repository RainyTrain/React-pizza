import logo from './logo.svg';
import '../src/scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import { useEffect, useState } from 'react';
import MyLoader from './components/Skeleton';

function App() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetch('https://639b4244d514150197507472.mockapi.io/pizzas')
      .then((res) => res.json())
      .then((data) => {
        setList(data)
        setIsLoading(false)
      })
      .catch((e) => console.log(e))
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">All</h2>
            <div className="content__items">
              {isLoading
                ? [...new Array(9)].map(() => <MyLoader />)
                : list.map((pizza) => <PizzaBlock {...pizza} />)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
