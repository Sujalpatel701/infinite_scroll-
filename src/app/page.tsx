'use client';

import { useState, useEffect } from 'react';
import { fetchWines } from '../utils/api';
import './style.css';

export default function Home() {
  const [wines, setWines] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5; // Wines per page

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await fetchWines();
      const paginatedWines = data.slice((page - 1) * limit, page * limit);

      setWines((prev) => [...prev, ...paginatedWines]);
      if (paginatedWines.length < limit) setHasMore(false);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching wines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore(); // Initial data load
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      loadMore();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="container">
      <h1>Red Wines</h1>
      <ul>
        {wines.map((wine) => (
          <li key={wine.id}>
            <img src={wine.image} alt={wine.wine} />
            <div>
              <p><strong>{wine.winery}</strong></p>
              <p>{wine.wine}</p>
              <p>Rating: {wine.rating.average} ({wine.rating.reviews})</p>
              <p>Location: {wine.location}</p>
            </div>
          </li>
        ))}
      </ul>
      {loading && <p className="loading">Loading more wines...</p>}
      {!hasMore && <p className="no-more">No more wines to load.</p>}
    </div>
  );
}
