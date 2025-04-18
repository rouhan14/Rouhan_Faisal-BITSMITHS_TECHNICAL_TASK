import { NewsItem, PaginationData } from '../types/index';

const API_BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export async function fetchNews(page: number = 1, itemsPerPage: number = 30): Promise<{
  items: NewsItem[];
  pagination: PaginationData;
}> {
  try {
    const topStoriesResponse = await fetch(`${API_BASE_URL}/topstories.json`);
    if (!topStoriesResponse.ok) {
      throw new Error('Failed to fetch top stories');
    }
    
    const storyIds: number[] = await topStoriesResponse.json();
    const totalItems = storyIds.length;
    
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const pageStoryIds = storyIds.slice(startIndex, endIndex);
    
    // Fetch details for each story in the current page
    const storyPromises = pageStoryIds.map(id => 
      fetch(`${API_BASE_URL}/item/${id}.json`)
        .then(response => {
          if (!response.ok) {
            console.error(`Failed to fetch item ${id}`);
            return null;
          }
          return response.json();
        })
    );
    
    const stories = await Promise.all(storyPromises);
    const validStories = stories.filter(story => story !== null) as NewsItem[];
    
    // Extract domain from URL
    const storiesWithDomain = validStories.map(story => {
      if (story.url) {
        try {
          const url = new URL(story.url);
          return {
            ...story,
            domain: url.hostname.replace('www.', '')
          };
        } catch (error) {
          return story;
        }
      }
      return story;
    });
    
    // Prepare pagination data
    const paginationData: PaginationData = {
      currentPage: page,
      totalPages: Math.ceil(totalItems / itemsPerPage),
      itemsPerPage,
      totalItems
    };
    
    return {
      items: storiesWithDomain,
      pagination: paginationData
    };
  } catch (error) {
    console.error('Error fetching from Hacker News API:', error);
    throw error;
  }
}

// Helper function to format time
// export function formatTime(timestamp: number): string {
//   const now = new Date();
//   const time = new Date(timestamp * 1000);
//   const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);
  
//   if (diffInSeconds < 60) {
//     return `${diffInSeconds} seconds ago`;
//   }
  
//   const diffInMinutes = Math.floor(diffInSeconds / 60);
//   if (diffInMinutes < 60) {
//     return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
//   }
  
//   const diffInHours = Math.floor(diffInMinutes / 60);
//   if (diffInHours < 24) {
//     return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
//   }
  
//   const diffInDays = Math.floor(diffInHours / 24);
//   return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
// }