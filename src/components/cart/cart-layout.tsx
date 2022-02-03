import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import { IoClose } from 'react-icons/io5';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import { useEffect, useState } from 'react';
import { useLocalStorage } from '@utils/use-local-storage';
import base from '@framework/utils/baseUrl';
import { TrashIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';

type data = {
  itemId: string | number;
  variantId: string | number;
  menuId: any;
  quantity: number;
};

const CartLayout: React.FC = ({ children }) => {
  const { t } = useTranslation('common');
  const { closeDrawer } = useUI();
  const { total, isEmpty, items, resetCart } = useCart();
  const [dataToSend, setDataToSend] = useState<data[]>([]);
  const [menuId] = useLocalStorage('menuId');
  const [restaurant] = useLocalStorage('restaurant');
  const [table] = useLocalStorage('table');
  const { width } = useWindowSize();

  const removeDataFromCart = () => {
    resetCart();
    setDataToSend([]);
  };
  useEffect(() => {
    setDataToSend(
      items.map((dat: any) => {
        return {
          itemId: dat.id,
          variantId: dat.variantId,
          menuId: menuId,
          quantity: dat.quantity,
        };
      })
    );
  }, [items]);

  const proceedToCheckout = () => {
    base
      .post(`/${restaurant}/table/${table}/order`, {
        orders: dataToSend,
      })
      .then((res) => {
        if (res.status === 200) {
          toast('Order Placed', {
            progressClassName: 'fancy-progress-bar',
            position: width! > 768 ? 'bottom-right' : 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          resetCart();
          closeDrawer();
          setDataToSend([]);
        }
      });
  };

  return (
    <div className="flex flex-col w-full h-full justify-between">
      <div className="w-full flex justify-between items-center relative ps-5 md:ps-7 border-b border-skin-base dark:bg-darkBg dark:border-b dark:border-darkSeperatingBorder">
        <Heading variant="titleMedium">
          <div className="dark:text-darkText">{t('Shopping Cart')}</div>
        </Heading>
        <div className="flex items-center">
          {!isEmpty && (
            <button
              className="flex flex-shrink items-center text-15px transition duration-150 ease-in focus:outline-none text-skin-base opacity-50 hover:opacity-100 -me-1.5"
              aria-label={t('Clear All')}
              onClick={removeDataFromCart}
            >
              <TrashIcon className="h-5 dark:text-darkText" />
              <span className="ps-1 dark:text-darkText">{t('Clear All')}</span>
            </button>
          )}

          <button
            className="flex text-2xl items-center justify-center px-4 md:px-6 py-6 lg:py-7 focus:outline-none transition-opacity text-skin-base hover:opacity-60"
            onClick={closeDrawer}
            aria-label="close"
          >
            <IoClose className="dark:text-darkText" />
          </button>
        </div>
      </div>

      {children}

      <div className="border-skin-base px-5 md:px-7 pt-1 md:pt-6 pb-5 md:pb-6 dark:bg-darkBg bottom-40 border-t border-darkSeperatingBorder">
        <div className="flex pb-5 md:pb-7 mt-3">
          <div className="pe-3">
            <Heading className="mb-2.5 dark:text-darkText">
              {t('Total')}:
            </Heading>
          </div>
          <div className="flex-shrink-0 font-semibold text-base md:text-lg text-skin-base -mt-0.5 min-w-[80px] text-end dark:text-darkText ml-auto">
            Rs.{total}
          </div>
        </div>
        <div
          className="flex flex-col -mt-5 cursor-pointer"
          onClick={proceedToCheckout}
        >
          <div
            className={cn(
              'w-full px-5 py-3 md:py-4 flex items-center justify-center bg-heading rounded font-semibold text-sm sm:text-15px text-skin-inverted bg-skin-primary focus:outline-none transition duration-300 hover:bg-opacity-90',
              {
                'cursor-not-allowed !text-opacity-25 bg-[#202529]': isEmpty,
              }
            )}
          >
            <span className="text-white py-0.5">
              {t('Proceed To Checkout')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
