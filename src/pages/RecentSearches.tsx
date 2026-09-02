import { useNavigate } from 'react-router-dom';
import { Clock, Search, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { timeAgo } from '../utils/helpers';

export default function RecentSearches() {
  const { recentSearches, clearRecentSearches } = useApp();
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-700">Recent Searches</h1>
          <p className="text-sm text-gray-500">{recentSearches.length} searches</p>
        </div>
        {recentSearches.length > 0 && (
          <button
            onClick={clearRecentSearches}
            className="btn-secondary text-sm flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        )}
      </div>

      {recentSearches.length === 0 ? (
        <div className="text-center py-20 card">
          <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No recent searches</h3>
          <p className="text-sm text-gray-500 mb-4">Start searching to see your history here</p>
          <button onClick={() => navigate('/find-suppliers')} className="btn-primary">
            Search Now
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {recentSearches.map(search => (
            <button
              key={search.id}
              onClick={() => navigate(`/find-suppliers?q=${encodeURIComponent(search.query)}`)}
              className="w-full card p-4 flex items-center gap-4 hover:shadow-md transition-shadow text-left"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800">{search.query}</p>
                <p className="text-xs text-gray-400">{search.resultCount} results • {timeAgo(search.timestamp)}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
