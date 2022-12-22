import React, { useMemo } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useState } from 'react';
import MyLoader from '../components/Skeleton';

function Home() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sort, setSort] = useState('rating');

  const [pizzaCategory, setPizzaCategory] = useState(0);


  useEffect(() => {
    setIsLoading(true)
    const sortBy = sort ? `&sortBy=${sort}&order` : ''
    const category = pizzaCategory ? `category=${pizzaCategory}` : ''
    fetch(`https://639b4244d514150197507472.mockapi.io/pizzas?${category}${sortBy}`)
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
    window.scrollTo(0, 0);
    console.log(sort)
  }, [pizzaCategory, sort]);

  // const sortedPizza = useMemo(() => {
  //   if (sort == 0) {
  //     return [...list].sort((a, b) => a.rating < b.rating);
  //   } else if (sort == 1) {
  //     return [...list].sort((a, b) => a.price < b.price);
  //   } else if (sort == 2) {
  //     return [...list].sort((a, b) => a.title.localeCompare(b.title));
  //   } else {
  //     return [...list].sort((a, b) => -a.title.localeCompare(b.title));
  //   }
  // }, [sort, list]);

  // const sortedPizzaWithCategory = useMemo(() => {
  //   switch (pizzaCategory) {
  //     case 1:
  //       return [...sortedPizza].filter((pizza) => pizza.category == 1);
  //     case 2:
  //       return [...sortedPizza].filter((pizza) => pizza.category == 2);
  //     case 3:
  //       return [...sortedPizza].filter((pizza) => pizza.category == 3);
  //     case 4:
  //       return [...sortedPizza].filter((pizza) => pizza.category == 4);
  //     case 5:
  //       return [...sortedPizza].filter((pizza) => pizza.category == 5);
  //     default:
  //       return sortedPizza;
  //   }
  // }, [sortedPizza, pizzaCategory]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories pizzaCategory={pizzaCategory} setPizzaCategory={setPizzaCategory} />
        <Sort sort={sort} setSort={setSort} />
      </div>
      <h2 className="content__title">All</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map(() => <MyLoader />)
          : list.map((pizza) => <PizzaBlock {...pizza} />)}
      </div>
    </div>
  );
}

export default Home;
