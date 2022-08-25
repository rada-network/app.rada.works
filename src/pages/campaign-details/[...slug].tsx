import { GetStaticPaths, NextPage } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CampaignDetailTmpl from '../../components/templates/campaignDetailTmpl';

const CampaignDetailPage: NextPage = () => {
  const router = useRouter();
  const query = router?.query?.slug;
  const slug = query?.[0] ?? '';
  return <CampaignDetailTmpl slug={slug} />;
};

export default CampaignDetailPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'campaign_details']))
      // Will be passed to the page component as props
    }
  };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  };
};
