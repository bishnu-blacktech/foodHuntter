import Image from '@components/ui/image';
import { useTranslation } from 'next-i18next';
import Text from '@components/ui/text';
import Heading from '@components/ui/heading';

const EmptyCart: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <div className="px-5 md:px-7 pt-8 pb-5 flex justify-center flex-col items-center dark:bg-darkBg">
      <div className="flex mx-auto w-[220px] md:w-auto dark:bg-darkBg">
        <Image
          src="/assets/images/empty-cart.png"
          alt={t('text-empty-cart')}
          width={270}
          height={240}
        />
      </div>
      <Heading variant="titleMedium" className="mb-1.5 pt-8 dark:text-darkText">
        {t('Your cart is empty')}
      </Heading>
      <Text className="dark:text-darkText">
        {t('Please add product to your cart list')}
      </Text>
    </div>
  );
};

export default EmptyCart;
