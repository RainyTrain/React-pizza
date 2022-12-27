import React, { useMemo } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useState } from 'react';
import MyLoader from '../components/Skeleton';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function Home({ searchQuery }) {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sort, setSort] = useState('rating');

  const [pizzaCategory, setPizzaCategory] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const sortBy = sort ? `&sortBy=${sort}&order` : '';
    const category = pizzaCategory ? `category=${pizzaCategory}` : '';
    axios
      .get(`https://639b4244d514150197507472.mockapi.io/pizzas?${category}${sortBy}`)
      .then((response) => {
        setList(response.data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
    window.scrollTo(0, 0);
  }, [pizzaCategory, sort]);

  const pizzas = useMemo(() => {
    return searchQuery != ''
      ? list.filter((pizza) => {
          return pizza.title.toLowerCase().includes(searchQuery.toLowerCase());
        })
      : list;
  });

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
          : pizzas.map((pizza) => <PizzaBlock {...pizza} />)}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        // onPageChange={handlePageClick}
        onPageChange={(e) => console.log(e)}
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default Home;
