import { IPizza } from '../Redux/Slices/CartSlice';
import { TotalQuantity } from './CountTotalQuantity';
import { TotalPrice } from './CountTotalSum';

export const ParseFromLS = () => {
  const data = window.localStorage.getItem('cart');
  const items: IPizza[] = data ? JSON.parse(data) : [];
  const totalPrice = TotalPrice(items);
  const count = TotalQuantity(items);
  return {
    items,
    totalPrice,
    count,
  };
};
