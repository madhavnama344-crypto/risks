import React, { useState } from 'react';
import { Code, Download, Copy, ChevronDown, ChevronRight, Database, Fish, Dna as Dna2, Map } from 'lucide-react';

const APIDocs = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleDownloadManual = () => {
    const manualContent = `# Shark API Documentation

## Overview
The Shark API provides programmatic access to marine datasets, species identification services, and analysis tools.

## Authentication
All API requests require authentication using an API key in the Authorization header.

## Endpoints
- GET /api/v1/datasets - Retrieve all available datasets
- GET /api/v1/species/search - Search for species
- POST /api/v1/edna/analyze - Submit eDNA sample for analysis

For complete documentation, visit our online portal.`;

    const blob = new Blob([manualContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shark-api-manual.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Database },
    { id: 'datasets', label: 'Datasets API', icon: Database },
    { id: 'species', label: 'Species API', icon: Fish },
    { id: 'edna', label: 'eDNA API', icon: Dna2 },
    { id: 'geospatial', label: 'Geospatial API', icon: Map }
  ];

  const apiEndpoints = {
    datasets: [
      {
        method: 'GET',
        endpoint: '/api/v1/datasets',
        description: 'Retrieve all available datasets',
        response: `{
  "datasets": [
    {
      "id": "ocean_001",
      "name": "Atlantic Ocean Temperature Data",
      "type": "oceanographic",
      "size": "2.4MB",
      "records": 15420,
      "updated": "2025-01-15T10:30:00Z"
    }
  ]
}`
      },
      {
        method: 'GET',
        endpoint: '/api/v1/datasets/{id}',
        description: 'Get specific dataset information',
        response: `{
  "id": "ocean_001",
  "name": "Atlantic Ocean Temperature Data",
  "description": "Temperature measurements from Atlantic Ocean monitoring stations",
  "metadata": {
    "spatial_extent": "North Atlantic",
    "temporal_extent": "2023-2024",
    "variables": ["temperature", "salinity", "depth"]
  }
}`
      }
    ],
    species: [
      {
        method: 'GET',
        endpoint: '/api/v1/species/search',
        description: 'Search for species by name or taxonomy',
        params: '?q=cod&limit=10',
        response: `{
  "results": [
    {
      "species": "Gadus morhua",
      "common_name": "Atlantic Cod",
      "taxonomy": {
        "kingdom": "Animalia",
        "phylum": "Chordata",
        "class": "Actinopterygii",
        "family": "Gadidae"
      },
      "confidence": 0.96
    }
  ]
}`
      }
    ],
    edna: [
      {
        method: 'POST',
        endpoint: '/api/v1/edna/analyze',
        description: 'Submit eDNA sample for analysis',
        request: `{
  "sample_id": "edna_001",
  "sequence_data": "base64_encoded_data",
  "metadata": {
    "collection_date": "2025-01-15",
    "location": {"lat": 45.5, "lng": -60.2},
    "depth": 50
  }
}`,
        response: `{
  "analysis_id": "analysis_123",
  "status": "processing",
  "estimated_completion": "2025-01-15T12:00:00Z"
}`
      }
    ]
  };

  const renderEndpoint = (endpoint) => (
    <div key={endpoint.endpoint} className="glass-dark rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-2 mb-3">
        <span className={`px-3 py-1 rounded text-xs font-semibold ${
          endpoint.method === 'GET' ? 'glass-ocean text-ocean-800' :
          endpoint.method === 'POST' ? 'glass-aqua text-aqua-800' :
          'glass text-deepBlue-800'
        }`}>
          {endpoint.method}
        </span>
        <code className="glass px-3 py-1 rounded font-mono text-sm text-ocean-800">
          {endpoint.endpoint}{endpoint.params || ''}
        </code>
      </div>
      
      <p className="text-gray-700 mb-3">{endpoint.description}</p>
      
      {endpoint.request && (
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-ocean-800 mb-2">Request Body:</h4>
          <div className="glass rounded border p-3">
            <pre className="text-xs font-mono text-gray-800 overflow-x-auto">
              {endpoint.request}
            </pre>
          </div>
        </div>
      )}
      
      <div>
        <h4 className="text-sm font-semibold text-ocean-800 mb-2">Response:</h4>
        <div className="glass rounded border p-3 relative group">
          <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:glass-dark rounded">
            <Copy className="w-4 h-4 text-gray-500" />
          </button>
          <pre className="text-xs font-mono text-gray-800 overflow-x-auto">
            {endpoint.response}
          </pre>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-12 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-ocean-800 mb-4 animate-float">API Documentation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive API reference for accessing marine data programmatically
          </p>
        </div>

        <div className="glass rounded-2xl overflow-hidden glow-soft">
          {/* Tab Navigation */}
          <div className="border-b border-white/20">
            <nav className="flex space-x-8 px-6 py-4 overflow-x-auto">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                    activeTab === id
                      ? 'border-ocean-500 text-ocean-700 glow-soft'
                      : 'border-transparent text-gray-500 hover:text-ocean-700 hover:border-ocean-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-ocean-800 mb-4">Getting Started</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 mb-4">
                      The Marine Insights API provides programmatic access to our comprehensive marine datasets, 
                      species identification services, and analysis tools. All API requests require authentication.
                    </p>
                    
                    <div className="glass-dark rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-ocean-800 mb-2">Base URL</h3>
                      <code className="glass px-3 py-1 rounded font-mono text-sm">
                        https://api.marineinsights.com/v1
                      </code>
                    </div>

                    <div className="glass-dark rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-ocean-800 mb-2">Authentication</h3>
                      <p className="text-gray-700 mb-2">Include your API key in the Authorization header:</p>
                      <code className="glass px-3 py-1 rounded font-mono text-sm block">
                        Authorization: Bearer your_api_key_here
                      </code>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="glass-dark rounded-lg p-4">
                        <h3 className="font-semibold text-ocean-800 mb-2">Rate Limits</h3>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li>• Free tier: 1000 requests/hour</li>
                          <li>• Pro tier: 10,000 requests/hour</li>
                          <li>• Enterprise: Custom limits</li>
                        </ul>
                      </div>
                      
                      <div className="glass-dark rounded-lg p-4">
                        <h3 className="font-semibold text-ocean-800 mb-2">Response Format</h3>
                        <ul className="text-gray-700 text-sm space-y-1">
                          <li>• All responses in JSON</li>
                          <li>• ISO 8601 timestamps</li>
                          <li>• Consistent error format</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <button 
                    onClick={handleDownloadManual}
                    className="glass-ocean text-white px-6 py-3 rounded-lg glow-hover transition-all duration-200 flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Complete API Manual</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'datasets' && (
              <div>
                <h2 className="text-2xl font-semibold text-ocean-800 mb-6">Datasets API</h2>
                <p className="text-gray-700 mb-6">
                  Access and manage marine datasets including oceanographic, fisheries, and biodiversity data.
                </p>
                {apiEndpoints.datasets.map(renderEndpoint)}
              </div>
            )}

            {activeTab === 'species' && (
              <div>
                <h2 className="text-2xl font-semibold text-ocean-800 mb-6">Species Identification API</h2>
                <p className="text-gray-700 mb-6">
                  Search and identify marine species using our comprehensive taxonomic database.
                </p>
                {apiEndpoints.species.map(renderEndpoint)}
              </div>
            )}

            {activeTab === 'edna' && (
              <div>
                <h2 className="text-2xl font-semibold text-ocean-800 mb-6">Environmental DNA API</h2>
                <p className="text-gray-700 mb-6">
                  Submit and analyze environmental DNA samples for species detection and biodiversity assessment.
                </p>
                {apiEndpoints.edna.map(renderEndpoint)}
              </div>
            )}

            {activeTab === 'geospatial' && (
              <div>
                <h2 className="text-2xl font-semibold text-ocean-800 mb-6">Geospatial API</h2>
                <p className="text-gray-700 mb-6">
                  Access location-based marine data and spatial analysis tools.
                </p>
                <div className="glass-dark rounded-lg p-8 text-center">
                  <Map className="w-12 h-12 text-ocean-600 mx-auto mb-3 animate-pulse-soft" />
                  <p className="text-gray-600">Geospatial API documentation coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SDK Examples */}
        <div className="mt-8 glass rounded-2xl p-6 glow-soft">
          <h2 className="text-2xl font-semibold text-ocean-800 mb-4">SDK Examples</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-ocean-800 mb-3">JavaScript/Node.js</h3>
              <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                <code>{`const marine = require('marine-insights-sdk');

const client = new marine.Client({
  apiKey: 'your_api_key'
});

const datasets = await client.datasets.list();
console.log(datasets);`}</code>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-ocean-800 mb-3">Python</h3>
              <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                <code>{`import marine_insights

client = marine_insights.Client(
  api_key='your_api_key'
)

datasets = client.datasets.list()
print(datasets)`}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocs;