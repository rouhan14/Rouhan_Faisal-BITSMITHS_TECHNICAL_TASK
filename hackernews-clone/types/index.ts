export interface NewsItem {
  id: number;
  title: string;
  url: string;
  domain?: string;
  points: number;
  author: string;
  postedTime: string;
  commentCount: number;
}
  
export interface PaginationData {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}