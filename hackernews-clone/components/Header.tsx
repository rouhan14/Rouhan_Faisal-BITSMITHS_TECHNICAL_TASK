import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-orange-500 text-black p-2 flex items-center">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <span className="inline-block w-6 h-6 text-white text-center bg-white border border-white mr-1">
            <span className="text-orange-500 font-bold">Y</span>
          </span>
          <span className="font-bold mr-4">Hacker News</span>
        </Link>
        
        <nav className="flex space-x-2 text-sm">
          <Link href="/newest" className="hover:underline">new</Link>
          <span>|</span>
          <Link href="/past" className="hover:underline">past</Link>
          <span>|</span>
          <Link href="/comments" className="hover:underline">comments</Link>
          <span>|</span>
          <Link href="/ask" className="hover:underline">ask</Link>
          <span>|</span>
          <Link href="/show" className="hover:underline">show</Link>
          <span>|</span>
          <Link href="/jobs" className="hover:underline">jobs</Link>
          <span>|</span>
          <Link href="/submit" className="hover:underline">submit</Link>
        </nav>
      </div>
      
      <div className="ml-auto">
        <Link href="/login" className="hover:underline text-sm">login</Link>
      </div>
    </header>
  );
}
