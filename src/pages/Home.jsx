import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useState } from 'react';
import MyLoader from '../components/Skeleton';

function Home() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://639b4244d514150197507472.mockapi.io/pizzas')
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
      window.scrollTo(0,0)
  }, []);
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(9)].map(() => <MyLoader />)
          : list.map((pizza) => <PizzaBlock {...pizza} />)}
      </div>
    </div>
  );
}

export default Home;
