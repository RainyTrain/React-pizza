import { FC } from 'react';

type CategoriesPropsType = {
  pizzaCategory: number;
  setPizzaCategory: (arg: number) => void;
};

const Categories: FC<CategoriesPropsType> = ({ pizzaCategory, setPizzaCategory }) => {
  const categories = ['All', 'Meat', 'Vege', 'Grill', 'Spicy', 'Calzone'];
  return (
    <div className="categories">
      <ul>
        {categories.map((category, id) => (
          <li
            key={id}
            onClick={() => setPizzaCategory(id)}
            className={pizzaCategory == id ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
