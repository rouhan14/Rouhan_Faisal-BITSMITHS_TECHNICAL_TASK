import Link from 'next/link';
import { NewsItem } from '../types/index';

interface NewsItemProps {
  item: NewsItem;
  position: number;
}

export default function NewsItemComponent({ item, position }: NewsItemProps) {
  return (
    <li className="py-1">
      <div className="flex items-baseline">
        <span className="text-gray-500 text-sm">{position}.</span>
        <span className="pl-1 cursor-pointer">&uarr;</span>
        <div className="ml-1">
          <div>
            <Link href={item.url} className="text-black hover:underline">
              {item.title}
            </Link>
            {item.domain && (
              <span className="text-gray-500 text-xs ml-1">
                ({item.domain})
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500">
            {item.points} points by {item.author} {item.postedTime} | 
            <Link href={`/hide?id=${item.id}`} className="hover:underline ml-1 mr-1">hide</Link> | 
            <Link href={`/item?id=${item.id}`} className="hover:underline ml-1">
              {item.commentCount} comments
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}