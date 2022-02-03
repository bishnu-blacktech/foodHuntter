import Image from 'next/image';
import Link from '@components/ui/link';
import cn from 'classnames';
import { siteSettings } from '@settings/site-settings';
import { useLocalStorage } from '@utils/use-local-storage';

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  // href = siteSettings.logo.href,
  ...props
}) => {
  const [restaurant, setRestaurant] = useLocalStorage('restaurant');
  const [table, setTable] = useLocalStorage('table');

  const link = restaurant && table ? `/r/${restaurant}/${table}` : '/';
  return (
    <Link
      href={link}
      className={cn('inline-flex focus:outline-none', className)}
      {...props}
    >
      <Image
        src={siteSettings.logo.url}
        alt={siteSettings.logo.alt}
        height={siteSettings.logo.height}
        width={siteSettings.logo.width}
        layout="fixed"
        loading="eager"
      />
    </Link>
  );
};

export default Logo;
