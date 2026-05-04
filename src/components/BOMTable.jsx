import { useState, useMemo, useEffect, useCallback } from 'react';
import { bomDataFallback } from '../data/bomData';

const CACHE_KEY = 'bom_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const BOMTable = () => {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchData = useCallback(async (bypassCache = false) => {
    if (bypassCache) {
      sessionStorage.removeItem(CACHE_KEY);
    } else {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setRawData(data);
            setLastUpdated(new Date(timestamp));
            setLoading(false);
            setError(false);
            return;
          }
        } catch (e) {
          // invalid cache
        }
      }
    }

    setLoading(true);
    setError(false);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const url = import.meta.env.VITE_BOM_API_URL;
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error('Network response was not ok');
      const apiData = await response.json();
      
      const mappedData = apiData.map((item, index) => ({
        id: index + 1,
        category: item.category,
        component: item.name,
        specification: item.specification || '',
        description: item.description || '',
        quantity: item.quantity || 0,
        unitPrice: item.unit_price || 0,
        link: item.link || '',
      }));

      const timestamp = Date.now();
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: mappedData, timestamp }));
      
      setRawData(mappedData);
      setLastUpdated(new Date(timestamp));
      setError(false);
    } catch (err) {
      console.warn("API fetch failed, using fallback data:", err);
      setRawData(bomDataFallback);
      setError(true);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const categories = useMemo(() => {
    return [...new Set(rawData.map(item => item.category))];
  }, [rawData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let data = [...rawData];

    // Filter by category
    if (selectedCategory !== 'All') {
      data = data.filter(item => item.category === selectedCategory);
    }

    // Sort
    data.sort((a, b) => {
      let comparison = 0;
      
      if (sortColumn === 'totalPrice') {
        comparison = (a.quantity * a.unitPrice) - (b.quantity * b.unitPrice);
      } else if (typeof a[sortColumn] === 'string') {
        comparison = (a[sortColumn] || '').localeCompare(b[sortColumn] || '');
      } else {
        comparison = (a[sortColumn] || 0) - (b[sortColumn] || 0);
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return data;
  }, [rawData, sortColumn, sortDirection, selectedCategory]);

  const totalCost = useMemo(() => {
    return rawData.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  }, [rawData]);

  const SortIcon = ({ column }) => {
    if (sortColumn !== column) {
      return <span className="ml-1 text-gray-300">↕</span>;
    }
    return <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>;
  };

  const formattedTime = lastUpdated ? lastUpdated.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <section id="bom" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Bill of Materials</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete list of components and specifications used in the ELIO robot
          </p>
        </div>

        {/* Total Cost Summary */}
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 rounded-xl shadow-lg mb-8 slide-up">
          {loading ? (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 animate-pulse">
              <div className="w-48">
                <div className="h-6 bg-white/20 rounded mb-2"></div>
                <div className="h-4 bg-white/20 rounded w-32"></div>
              </div>
              <div className="h-10 w-40 bg-white/20 rounded"></div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold opacity-90">Total Project Cost</h3>
                <div className="flex items-center gap-2">
                  <p className="text-sm opacity-75">All components included</p>
                  <span className="text-xs opacity-60 px-2 py-0.5 bg-black/10 rounded-full">
                    {error ? "Showing cached data" : `Updated ${formattedTime}`}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold">{formatCurrency(totalCost)}</div>
                <button 
                  onClick={() => fetchData(true)}
                  title="Refresh data"
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-6 slide-up">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === 'All'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              disabled={loading}
            >
              All
            </button>
            {!loading && categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 slide-up">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  onClick={() => !loading && handleSort('id')}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  ID <SortIcon column="id" />
                </th>
                <th 
                  onClick={() => !loading && handleSort('category')}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  Category <SortIcon column="category" />
                </th>
                <th 
                  onClick={() => !loading && handleSort('component')}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  Component <SortIcon column="component" />
                </th>
                <th 
                  onClick={() => !loading && handleSort('quantity')}
                  className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  Qty <SortIcon column="quantity" />
                </th>
                <th 
                  onClick={() => !loading && handleSort('unitPrice')}
                  className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  Unit Price <SortIcon column="unitPrice" />
                </th>
                <th 
                  onClick={() => !loading && handleSort('totalPrice')}
                  className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  Total <SortIcon column="totalPrice" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <tr key={`skeleton-${index}`} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-6"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-20"></div></td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-32 mb-1.5"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-8 mx-auto"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24 ml-auto"></div></td>
                  </tr>
                ))
              ) : (
                filteredAndSortedData.map((item, index) => (
                  <tr 
                    key={item.id}
                    className="hover:bg-green-50/50 transition-colors duration-150"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="font-medium text-gray-900">
                        {item.component}
                        {item.link && (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" title="External link">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {item.specification}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold text-right">
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 slide-up">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={`stat-skel-${index}`} className="bg-gray-50 p-4 rounded-lg text-center animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
              </div>
            ))
          ) : (
            <>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{rawData.length}</div>
                <div className="text-sm text-gray-600">Total Items</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{categories.length}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">
                  {rawData.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Components</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary">{formatCurrency(totalCost)}</div>
                <div className="text-sm text-gray-600">Total Cost</div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BOMTable;
