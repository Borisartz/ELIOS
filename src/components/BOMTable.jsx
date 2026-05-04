import { useState, useMemo } from 'react';
import { bomData, categories } from '../data/bomData';

const BOMTable = () => {
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('All');

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
    let data = [...bomData];

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
        comparison = a[sortColumn].localeCompare(b[sortColumn]);
      } else {
        comparison = a[sortColumn] - b[sortColumn];
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return data;
  }, [sortColumn, sortDirection, selectedCategory]);

  const totalCost = useMemo(() => {
    return bomData.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  }, []);

  const SortIcon = ({ column }) => {
    if (sortColumn !== column) {
      return <span className="ml-1 text-gray-300">↕</span>;
    }
    return <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>;
  };

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
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-semibold opacity-90">Total Project Cost</h3>
              <p className="text-sm opacity-75">All components included</p>
            </div>
            <div className="text-3xl font-bold">{formatCurrency(totalCost)}</div>
          </div>
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
            >
              All
            </button>
            {categories.map((category) => (
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
                  onClick={() => handleSort('id')}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  ID <SortIcon column="id" />
                </th>
                <th 
                  onClick={() => handleSort('category')}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  Category <SortIcon column="category" />
                </th>
                <th 
                  onClick={() => handleSort('component')}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  Component <SortIcon column="component" />
                </th>
                <th 
                  onClick={() => handleSort('quantity')}
                  className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  Qty <SortIcon column="quantity" />
                </th>
                <th 
                  onClick={() => handleSort('unitPrice')}
                  className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  Unit Price <SortIcon column="unitPrice" />
                </th>
                <th 
                  onClick={() => handleSort('totalPrice')}
                  className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  Total <SortIcon column="totalPrice" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredAndSortedData.map((item, index) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.component}
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 slide-up">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary">{bomData.length}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary">{categories.length}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary">
              {bomData.reduce((sum, item) => sum + item.quantity, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Components</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary">{formatCurrency(totalCost)}</div>
            <div className="text-sm text-gray-600">Total Cost</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BOMTable;
