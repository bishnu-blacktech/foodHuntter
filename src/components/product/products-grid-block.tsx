import SectionHeader from '@components/common/section-header';
import ProductCard from '@components/product/product-cards/product-card';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import { Menu, MenuItemList, Product } from '@framework/types';
import Alert from '@components/ui/alert';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '@utils/use-local-storage';

interface ProductsProps {
  sectionHeading: string;
  sectionSubHeading?: string;
  headingPosition?: 'left' | 'center';
  className?: string;
  products: Product | undefined;
  loading: boolean;
  error?: string;
  limit?: number;
  uniqueKey?: string;
}

const ProductsGridBlock: React.FC<ProductsProps> = ({
  sectionHeading,
  sectionSubHeading,
  headingPosition = 'center',
  className = 'mb-12 lg:mb-14 xl:mb-16',
  products,
  loading,
  error,
  limit,
  uniqueKey,
}) => {
  const [menuItems, setMenuItems] = useState<MenuItemList[]>([]);
  const [menu, setMenu] = useState<Menu>();
  const [menuId, setMenuId] = useLocalStorage('menuId');

  useEffect(() => {
    setMenuItems(products ? products.menuItemList : []);
    setMenu(products?.menu);
  }, [products]);

  useEffect(() => {
    setMenuId(menu?._id);
  }, [menu]);

  return (
    <div className={`${className}`}>
      <SectionHeader
        sectionHeading={sectionHeading}
        sectionSubHeading={sectionSubHeading}
        headingPosition={headingPosition}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-3 md:gap-4 2xl:gap-5">
        {error ? (
          <Alert message={error} className="col-span-full" />
        ) : loading && !menuItems?.length ? (
          Array.from({ length: limit! }).map((_, idx) => (
            <ProductCardLoader
              key={`${uniqueKey}-${idx}`}
              uniqueKey={`${uniqueKey}-${idx}`}
            />
          ))
        ) : (
          menuItems?.map((item: any) => {
            return (
              <ProductCard
                key={`${uniqueKey}-${item.items._id}`}
                product={item.items}
                menu={menu}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProductsGridBlock;
