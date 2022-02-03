import Layout from '@components/layout/layout-two';
import Container from '@components/ui/container';
import DownloadApps from '@components/common/download-apps';
import HeroBannerCard from '@components/hero/hero-banner-card';
import BestSellerGroceryProductFeed from '@components/product/feeds/best-seller-grocery-product-feed';
import { homeSixHeroBanner as heroBanner } from '@framework/static/banner';
import Seo from '@components/seo/seo';
import { useRouter } from 'next/router';
import { useLocalStorage } from '@utils/use-local-storage';
import { useEffect } from 'react';

const Table = (results: any, links: any) => {
  const router = useRouter();
  const [restaurant, setRestaurant] = useLocalStorage('restaurant');
  const [table, setTable] = useLocalStorage('table');
  const routdata = router.query;

  useEffect(() => {
    setRestaurant(routdata.r);
    setTable(routdata.t);
  }, [routdata]);

  const link = restaurant && table ? `/r/${restaurant}/${table}` : '/';

  return (
    <>
      <Seo title=" " description="FoodHunter" path={link} />
      <HeroBannerCard
        banner={heroBanner}
        className="hero-banner-six max-h-[100px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[650px] py-20 py:pt-24 mb-5 2xl:bg-center"
      />
      <Container>
        <BestSellerGroceryProductFeed id={results.results} />
      </Container>
      <DownloadApps />
    </>
  );
};

Table.Layout = Layout;

export default Table;

export async function getServerSideProps(context: any) {
  const { params } = context;

  return {
    props: {
      results: params.r,
    },
  };
}
