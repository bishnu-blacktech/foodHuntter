import { FC } from 'react';
import { useBestSellerGroceryProductsQuery } from '@framework/product/get-all-best-seller-grocery-products';
import ProductsGridBlock from '../products-grid-block';

interface ProductFeedProps {
  className?: string;
  id: string;
}

const BestSellerGroceryProductFeed: FC<ProductFeedProps> = ({
  className,
  id,
}) => {
  const { data, error } = useBestSellerGroceryProductsQuery(id as string);

  return (
    <ProductsGridBlock
      sectionHeading="All Dishes"
      className={className}
      products={data ? data : undefined}
      loading={false}
      error={error?.message}
      uniqueKey="best-sellers"
    />
  );
};
export default BestSellerGroceryProductFeed;
