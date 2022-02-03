import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Items, Menu, Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import PlusIcon from '@components/icons/plus-icon';
import { useCart } from '@contexts/cart/cart.context';
import { AddToCart } from '@components/product/add-to-cart';
import { useTranslation } from 'next-i18next';
import { productPlaceholder } from '@assets/placeholders';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface ProductProps {
  product: Items;
  className?: string;
  menu?: Menu;
}

// function RenderPopupOrAddToCart({ data }: { data: Product }) {
function RenderPopupOrAddToCart({ product, menu }: ProductProps) {
  const { t } = useTranslation('common');
  const { _id, itemName, variants } = product;
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const iconSize = width! > 1024 ? '19' : '17';
  const { systemTheme, theme, setTheme } = useTheme();
  // const outOfStock = isInCart(id) && !isInStock(id);

  // useEffect(() => {
  //   variants.map((itm) => {
  //     setVariantId(itm._id);
  //   });
  // }, [variants]);

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }

  // if (Number(quantity) < 1 || outOfStock) {
  //   return (
  //     <span className="text-[11px] md:text-xs font-bold text-skin-inverted uppercase inline-block bg-skin-red rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
  //       {t('text-out-stock')}
  //     </span>
  //   );
  // }
  // if (product_type === 'variable') {
  // if (variants?.length > 1) {
  if (false) {
    return (
      <button
        className="inline-flex bg-skin-primary rounded-full w-8 lg:w-10 h-8 lg:h-10 text-skin-inverted text-4xl items-center justify-center focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handlePopupView}
      >
        <PlusIcon width={iconSize} height={iconSize} opacity="1" />
      </button>
    );
  }
  return <AddToCart data={product} menu={menu} />;
}

const ProductCard: React.FC<ProductProps> = ({ product, className, menu }) => {
  const { _id, images, itemName, variants } = product ?? {};
  const { openModal } = useModalAction();
  const router = useRouter();
  const { t } = useTranslation('common');
  const [displayPrice, setDisplayPrice] = useState<number>();

  useEffect(() => {
    variants.map((itm) => {
      setDisplayPrice(itm.price);
    });
  }, []);

  function navigateToProductPage() {
    router.push(`/products/${product._id}`);
  }
  return (
    <article
      className={cn(
        'flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full dark:border dark:border-darkBorder',
        className
      )}
      onClick={navigateToProductPage}
      title={itemName}
    >
      <div className="relative flex-shrink-0">
        <div className="flex overflow-hidden max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <Image
            src={images.length ? images[0] : productPlaceholder}
            alt={itemName || 'Product Image'}
            width={230}
            height={200}
            quality={100}
            className="object-cover bg-skin-thumbnail"
          />
        </div>
        <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          <div className="inline-block product-count-button-position">
            <RenderPopupOrAddToCart product={product} menu={menu} />
          </div>
        </div>
      </div>

      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
        <div className="space-s-2 mb-1 lg:mb-1.5">
          <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-base dark:text-darkText">
            {itemName}
          </span>
        </div>
        <h2 className="text-skin-base text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5 dark:text-darkText">
          Rs.{displayPrice}
        </h2>
      </div>
    </article>
  );
};

export default ProductCard;
