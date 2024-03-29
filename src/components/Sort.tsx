import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useTypedSelector } from '../Hooks';
import { setSort, sorting } from '../Redux/Slices/FilterSlice';

const Sort = () => {
  const sort = useTypedSelector((state) => state.filterReducer.sortType);
  const dispatch = useAppDispatch();

  const [active, setActive] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  const setSortingValue = (value: string) => {
    dispatch(setSort(value));
    setActive(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setActive(false);
      }
    };
    document.body.addEventListener('click', handleClick);
    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, [active]);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={active ? 'active' : ''}
          onClick={() => setActive(!active)}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span>{sort}</span>
      </div>
      {active && (
        <div className="sort__popup">
          <ul>
            {sorting.map((sorting, id) => (
              <li
                key={id}
                onClick={() => setSortingValue(sorting.value)}
                className={sort == sorting.value ? 'active' : ''}>
                {sorting.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
