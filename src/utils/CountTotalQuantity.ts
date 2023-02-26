import { IPizza } from '../Redux/Slices/CartSlice';

export const TotalQuantity = (cart: IPizza[]): number => {
  return cart.reduce((sum, obj) => {
    return sum + obj.quantity;
  }, 0);
};
