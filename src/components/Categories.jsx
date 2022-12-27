function Categories({ pizzaCategory, setPizzaCategory, setCurrentPage, currentPage }) {
  const categories = ['All', 'Meat', 'Vege', 'Grill', 'Spicy', 'Calzone'];
  function changeCategory(id) {
    setPizzaCategory(id)
    setCurrentPage(1)
    console.log('current page',currentPage)
  }
  return (
    <div className="categories">
      <ul>
        {categories.map((category, id) => (
          <li key={id} onClick={() => changeCategory(id)} className={pizzaCategory == id ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
