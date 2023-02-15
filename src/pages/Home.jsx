import React, { useMemo } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useState, useContext } from 'react';
import MyLoader from '../components/Skeleton';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { myContext } from '../components/Context';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../Redux/Slices/FilterSlice';
import { useSearchParams } from 'react-router-dom';

function Home() {
  const pizzaCategory = useSelector((state) => state.filterReducer.categoryId);
  const sortType = useSelector((state) => state.filterReducer.sortType);
  const currentPage = useSelector((state) => state.filterReducer.currentPage);

  const dispatch = useDispatch();

  const { searchQuery } = useContext(myContext);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams({});

  const setPizzaCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);
    const sortBy = sortType ? `&sortBy=${sortType}&order` : '';
    const category = pizzaCategory ? `category=${pizzaCategory}` : '';
    axios
      .get(
        `https://639b4244d514150197507472.mockapi.io/pizzas?${category}&${sortBy}&page=${currentPage}&limit=4`,
      )
      .then((response) => {
        setList(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch((e) => console.log(e));
  }, [pizzaCategory, sortType, currentPage]);

  useEffect(() => {
    setSearchParams({
      sortType,
      pizzaCategory,
      currentPage,
    });
  }, [pizzaCategory, sortType, currentPage]);

  const pizzas = useMemo(() => {
    return searchQuery != ''
      ? list.filter((pizza) => {
          return pizza.title.toLowerCase().includes(searchQuery.toLowerCase());
        })
      : list;
  }, [list, searchQuery]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories pizzaCategory={pizzaCategory} setPizzaCategory={setPizzaCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map(() => <MyLoader />)
          : pizzas.map((pizza, id) => <PizzaBlock key={id} {...pizza} />)}
      </div>
      <div className="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
          pageRangeDisplayed={4}
          pageCount={3}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default Home;
