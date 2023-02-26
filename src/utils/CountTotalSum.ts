import { IPizza } from '../Redux/Slices/CartSlice';

export const TotalPrice = (cart: IPizza[]): number => {
  return cart.reduce((sum, obj) => {
    return sum + obj.price * obj.quantity;
  }, 0);
};
