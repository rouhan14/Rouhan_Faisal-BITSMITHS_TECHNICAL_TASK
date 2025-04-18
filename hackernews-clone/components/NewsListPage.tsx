'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NewsItem, PaginationData } from '../types/index';
import { fetchNews } from '../utils/api';
import NewsItemComponent from '../components/NewsItem';

export default function NewsListPage({ page = 1 }: { page: number }) {
  const router = useRouter();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: page,
    totalPages: 0,
    itemsPerPage: 30,
    totalItems: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetchNews(page)
      .then(({ items, pagination }) => {
        setNewsItems(items);
        setPagination(pagination);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  }, [page]);

  const handleMoreClick = () => {
    const nextPage = pagination.currentPage + 1;
    router.push(`/?page=${nextPage}`);
  };

  return (
    <>
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          <ol className="list-decimal pl-8 pr-4">
            {newsItems.map((item, index) => (
              <NewsItemComponent key={item.id} item={item} position={(pagination.currentPage - 1) * pagination.itemsPerPage + index + 1} />
            ))}
          </ol>
          
          {pagination.currentPage < pagination.totalPages && (
            <div className="py-4 text-center">
              <button 
                onClick={handleMoreClick}
                className="font-medium text-gray-700 hover:underline"
              >
                More
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
