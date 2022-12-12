import { useState } from 'react';

function Categories() {
  const [pizzaCategory, setPizzaCategory] = useState(0);
  const categories = ['All', 'Meat', 'Vege', 'Grill', 'Spicy', 'Calzone'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, id) => (
          <li onClick={() => setPizzaCategory(id)} className={pizzaCategory == id ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
