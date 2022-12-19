function Categories({ pizzaCategory, setPizzaCategory }) {
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
