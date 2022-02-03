import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import ProductSingleDetails from '@components/product/product';
import DownloadApps from '@components/common/download-apps';
import Breadcrumb from '@components/ui/breadcrumb';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Divider from '@components/ui/divider';
import { useProductQuery } from '@framework/product/get-product';
import { useRouter } from 'next/router';

export default function ProductPage() {
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const { data, isLoading, isError } = useProductQuery(slug as string);

  return (
    <>
      <Divider />
      <div className="pt-6 lg:pt-7">
        <Container>
          <Breadcrumb name={data?.item.itemName} id={data?.item._id} />

          {isLoading && <div>Loading.....</div>}
          {isError && <div>Product doesn't exist</div>}
          {data && <ProductSingleDetails data={data} />}
        </Container>
      </div>

      <DownloadApps />
    </>
  );
}

ProductPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
