import { FC } from "react";

type CategoriesProps = {
  pizzaCategory: number;
  setPizzaCategory: (arg: number) => void;
};

const Categories: FC<CategoriesProps> = ({ pizzaCategory, setPizzaCategory }: CategoriesProps) => {
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
