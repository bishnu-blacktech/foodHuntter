import Scrollbar from '@components/ui/scrollbar';
import { useCart } from '@contexts/cart/cart.context';
import CartItem from './cart-item';
import EmptyCart from './empty-cart';

export default function Cart() {
  const { items, isEmpty } = useCart();

  return (
    <>
      {!isEmpty ? (
        <Scrollbar className="cart-scrollbar w-full flex-grow dark:bg-darkBg ">
          <div className="w-full px-5 md:px-7">
            {items?.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
        </Scrollbar>
      ) : (
        <div className="dark:bg-darkBg h-full">
          <EmptyCart />
        </div>
      )}
    </>
  );
}
