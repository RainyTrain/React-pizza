import { FC, useState } from 'react';
import { useAppDispatch } from '../Hooks';
import { setItem } from '../Redux/Slices/CartSlice';

type PizzaBlockPropsType = {
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  id: number;
  imageUrl: string;
  quantity: number;
};

const PizzaBlock: FC<PizzaBlockPropsType> = (props) => {
  const [count, setCount] = useState<number>(0);
  const [type, setType] = useState<number>(0);
  const [size, setSize] = useState<number>(0);

  const dispatch = useAppDispatch();

  const pizzaType = ['Thin', 'Traditional'];

  const addPizza = () => {
    setCount((prev) => prev + 1);
    const item = {
      title: props.title,
      price: props.price,
      id: Date.now(),
      imageUrl: props.imageUrl,
      type: pizzaType[type],
      size: props.sizes[size],
      quantity: 1,
    };
    dispatch(setItem(item));
  };
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={props.imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{props.title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {props.types.map((typeOfPizza, id) => (
              <li key={id} onClick={() => setType(id)} className={type == id ? 'active' : ''}>
                {pizzaType[typeOfPizza]}
              </li>
            ))}
          </ul>
          <ul>
            {props.sizes.map((pizzaSize, id) => (
              <li key={id} onClick={() => setSize(id)} className={size == id ? 'active' : ''}>
                {pizzaSize} cm
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{props.price}$</div>
          <button onClick={addPizza} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Add</span>
            <i>{count}</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
