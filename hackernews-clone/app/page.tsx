import NewsListPage from '../components/NewsListPage';

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  
  return <NewsListPage page={page} />;
}
