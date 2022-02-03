import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { LinkProps } from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { getDirection } from '@utils/get-direction';
import cn from 'classnames';
import { categoryPlaceholder } from '@assets/placeholders';

interface Props {
  item: any;
  href: LinkProps['href'];
  className?: string;
}

const CategoryCard: React.FC<Props> = ({ item, href, className }) => {
  const { t } = useTranslation('common');
  const { name, image } = item ?? {};
  const { locale } = useRouter();
  const dir = getDirection(locale);
  return (
    <Link
      href={href}
      className={cn('group block w-full text-center', className)}
    >
      <div className="flex max-w-[178px] max-h-[178px] mb-3.5 xl:mb-4 mx-auto rounded-full overflow-hidden bg-skin-thumbnail">
        <div className={'flex flex-shrink-0  w-full h-full'}>
          <Image
            src={image?.original ?? categoryPlaceholder}
            alt={name || t('text-card-thumbnail')}
            width={178}
            height={178}
            quality={100}
            className="object-cover rounded-full"
          />
        </div>
      </div>
      <h3 className="capitalize text-skin-base text-sm sm:text-15px lg:text-base truncate dark:text-darkText">
        {name}
      </h3>
    </Link>
  );
};

export default CategoryCard;
