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
import { setCategoryId } from '../Redux/Slices/FilterSlice';

function Home() {
  const pizzaCategory = useSelector(state => state.filterReducer.categoryId)
  const dispatch = useDispatch()
  console.log('selector',pizzaCategory)

  const { searchQuery } = useContext(myContext);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sort, setSort] = useState('rating');

  //const [pizzaCategory, setPizzaCategory] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const setPizzaCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  useEffect(() => {
    setIsLoading(true);
    const sortBy = sort ? `&sortBy=${sort}&order` : '';
    const category = pizzaCategory ? `category=${pizzaCategory}` : '';
    axios
      .get(
        `https://639b4244d514150197507472.mockapi.io/pizzas?${category}${sortBy}&page=${currentPage}&limit=4`,
      )
      .then((response) => {
        setList(response.data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, [pizzaCategory, sort, currentPage]);

  const pizzas = useMemo(() => {
    return searchQuery != ''
      ? list.filter((pizza) => {
          return pizza.title.toLowerCase().includes(searchQuery.toLowerCase());
        })
      : list;
  });

  console.log('home page -', currentPage);
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
      <div className="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={(e) => setCurrentPage(e.selected + 1)}
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
