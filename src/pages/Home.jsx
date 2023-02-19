import React, { useMemo } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect } from 'react';
import MyLoader from '../components/Skeleton';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../Redux/Slices/FilterSlice';
import { useSearchParams } from 'react-router-dom';
import { fetchPizzas } from '../Redux/Slices/PizzaSlice';

function Home() {
  const pizzaCategory = useSelector((state) => state.filterReducer.categoryId);
  const sortType = useSelector((state) => state.filterReducer.sortType);
  const currentPage = useSelector((state) => state.filterReducer.currentPage);
  const getPizza = useSelector((state) => state.pizzaReducer.items);
  const isLoading = useSelector((state) => state.pizzaReducer.isLoading);
  const searchQuery = useSelector((state) => state.filterReducer.searchQuery);

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams({});

  const setPizzaCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    const sortBy = sortType ? `&sortBy=${sortType}&order` : '';
    const category = pizzaCategory ? `category=${pizzaCategory}` : '';
    dispatch(fetchPizzas({ category, sortBy, currentPage }));
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
      ? getPizza.filter((pizza) => {
          return pizza.title.toLowerCase().includes(searchQuery.toLowerCase());
        })
      : getPizza;
  }, [getPizza, searchQuery]);

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
