import React, { useState } from 'react';
import { Download, Eye, Quote, Search, Filter, Calendar } from 'lucide-react';

const Datasets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDataset, setSelectedDataset] = useState(null);

  const datasets = [
    {
      name: 'ocean_sample.csv',
      type: 'Ocean',
      source: 'NetCDF',
      uploadDate: '2025-09-15',
      size: '2.4 MB',
      records: '15,420'
    },
    {
      name: 'fish_catch_data.csv',
      type: 'Fisheries',
      source: 'Field Survey',
      uploadDate: '2025-08-22',
      size: '1.8 MB',
      records: '8,760'
    },
    {
      name: 'biodiversity_index.json',
      type: 'Biodiversity',
      source: 'eDNA Analysis',
      uploadDate: '2025-09-10',
      size: '890 KB',
      records: '3,240'
    },
    {
      name: 'temperature_salinity.nc',
      type: 'Ocean',
      source: 'Satellite Data',
      uploadDate: '2025-09-18',
      size: '5.2 MB',
      records: '25,680'
    },
    {
      name: 'species_taxonomy.csv',
      type: 'Biodiversity',
      source: 'Laboratory',
      uploadDate: '2025-08-30',
      size: '1.2 MB',
      records: '4,320'
    }
  ];

  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || dataset.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const handleDownload = (dataset) => {
    // Simulate file download
    const blob = new Blob([`Dataset: ${dataset.name}\nType: ${dataset.type}\nSize: ${dataset.size}\nRecords: ${dataset.records}`], 
      { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = dataset.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleView = (dataset) => {
    setSelectedDataset(dataset);
  };

  const handleCite = (dataset) => {
    const citation = `${dataset.name}. ${dataset.source}. Retrieved ${dataset.uploadDate}. Shark Marine Platform.`;
    navigator.clipboard.writeText(citation);
    alert('Citation copied to clipboard!');
  };

  return (
    <div className="py-12 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-ocean-800 mb-4 animate-float">Marine Datasets</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access comprehensive marine data from oceanographic surveys, fisheries monitoring, and biodiversity studies
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="glass rounded-2xl p-6 mb-8 glow-soft">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Search datasets..."
                className="w-full pl-10 pr-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                className="px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="ocean">Ocean</option>
                <option value="fisheries">Fisheries</option>
                <option value="biodiversity">Biodiversity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Datasets Table */}
        <div className="glass rounded-2xl overflow-hidden glow-soft">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="glass-dark">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-ocean-800">Dataset Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-ocean-800">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-ocean-800">Source</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-ocean-800">Upload Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-ocean-800">Size</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-ocean-800">Records</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-ocean-800">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {filteredDatasets.map((dataset, index) => (
                  <tr key={index} className="transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="font-medium text-ocean-800 font-mono text-sm">{dataset.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        dataset.type === 'Ocean' ? 'glass-ocean text-ocean-800' :
                        dataset.type === 'Fisheries' ? 'glass-coral text-coral-800' :
                        'glass-seaweed text-seaweed-800'
                      }`}>
                        {dataset.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#4B5563]">{dataset.source}</td>
                    <td className="px-6 py-4 text-[#4B5563] flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {dataset.uploadDate}
                    </td>
                    <td className="px-6 py-4 text-[#4B5563] font-mono text-sm">{dataset.size}</td>
                    <td className="px-6 py-4 text-[#4B5563] font-mono text-sm">{dataset.records}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleDownload(dataset)}
                          className="bg-ocean-800 text-white p-2 rounded-lg glow-hover transition-all duration-200"
                          title="Download dataset"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleView(dataset)}
                          className="bg-ocean-800 text-white p-2 rounded-lg glow-hover transition-all duration-200"
                          title="View dataset details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleCite(dataset)}
                          className="bg-ocean-800 text-white p-2 rounded-lg glow-hover transition-all duration-200"
                          title="Copy citation"
                        >
                          <Quote className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredDatasets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-700 text-lg">No datasets found matching your criteria.</p>
          </div>
        )}

        {/* Dataset Detail Modal */}
        {selectedDataset && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="glass rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto glow-soft">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-ocean-800">Dataset Details</h2>
                <button 
                  onClick={() => setSelectedDataset(null)}
                  className="text-gray-700 hover:text-gray-900"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-ocean-700">Name</h3>
                  <p className="text-gray-700">{selectedDataset.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-ocean-700">Type</h3>
                  <p className="text-gray-700">{selectedDataset.type}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-ocean-700">Source</h3>
                  <p className="text-gray-700">{selectedDataset.source}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-ocean-700">Upload Date</h3>
                  <p className="text-gray-700">{selectedDataset.uploadDate}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-ocean-700">Size</h3>
                  <p className="text-gray-700">{selectedDataset.size}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-ocean-700">Records</h3>
                  <p className="text-gray-700">{selectedDataset.records}</p>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button 
                    onClick={() => handleDownload(selectedDataset)}
                    className="bg-ocean-800 text-white px-4 py-2 rounded-lg glow-hover transition-all duration-200"
                  >
                    Download
                  </button>
                  <button 
                    onClick={() => handleCite(selectedDataset)}
                    className="bg-ocean-800 text-white px-4 py-2 rounded-lg glow-hover transition-all duration-200"
                  >
                    Copy Citation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Datasets;