import Layout from '@components/layout/layout-two';
import Cart from '@components/cart/cart';

const index = () => {
  return (
    <div>
      <Cart />
    </div>
  );
};

index.Layout = Layout;

export default index;
