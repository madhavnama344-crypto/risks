import React, { useState } from 'react';
import { Search, ChevronRight, ChevronDown, TreePine, Fish, Waves, Loader2 } from 'lucide-react';
import { aiService } from '../services/aiService';

const Taxonomy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNodes, setExpandedNodes] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [aiSearchResults, setAiSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const taxonomyTree = [
    {
      id: 'chordata',
      name: 'Chordata',
      level: 'phylum',
      children: [
        {
          id: 'actinopterygii',
          name: 'Actinopterygii',
          level: 'class',
          children: [
            {
              id: 'perciformes',
              name: 'Perciformes',
              level: 'order',
              children: [
                {
                  id: 'scombridae',
                  name: 'Scombridae',
                  level: 'family',
                  children: [
                    { id: 'thunnus', name: 'Thunnus thynnus', level: 'species', common: 'Atlantic Bluefin Tuna' }
                  ]
                }
              ]
            },
            {
              id: 'gadiformes',
              name: 'Gadiformes',
              level: 'order',
              children: [
                {
                  id: 'gadidae',
                  name: 'Gadidae',
                  level: 'family',
                  children: [
                    { id: 'gadus', name: 'Gadus morhua', level: 'species', common: 'Atlantic Cod' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  const sampleSearchResults = [
    { species: 'Thunnus thynnus', common: 'Atlantic Bluefin Tuna', confidence: 98, family: 'Scombridae', order: 'Perciformes', genus: 'Thunnus' },
    { species: 'Gadus morhua', common: 'Atlantic Cod', confidence: 94, family: 'Gadidae', order: 'Gadiformes', genus: 'Gadus' },
    { species: 'Salmo salar', common: 'Atlantic Salmon', confidence: 89, family: 'Salmonidae', order: 'Salmoniformes', genus: 'Salmo' },
    { species: 'Scomber scombrus', common: 'Atlantic Mackerel', confidence: 87, family: 'Scombridae', order: 'Perciformes', genus: 'Scomber' },
    { species: 'Pleuronectes platessa', common: 'European Plaice', confidence: 85, family: 'Pleuronectidae', order: 'Pleuronectiformes', genus: 'Pleuronectes' },
    { species: 'Hippoglossus hippoglossus', common: 'Atlantic Halibut', confidence: 83, family: 'Pleuronectidae', order: 'Pleuronectiformes', genus: 'Hippoglossus' }
  ];

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const performSearch = async (term) => {
    if (term.length < 1) {
      setSearchResults([]);
      setAiSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      // AI/ML enhanced search for marine species
      const aiResponse = await aiService.sendMessage([{
        role: 'user',
        content: `Search for marine species matching: "${term}". Return results in this exact format for each species found:

Species: [Scientific name]
Common Name: [Common name]
Family: [Family name]
Order: [Order name]
Genus: [Genus name]
Habitat: [Marine habitat]
Distribution: [Geographic distribution]
Conservation Status: [Status if known]

Focus on fish and marine species. Provide up to 5 most relevant matches. Be precise and factual.`
      }]);

      // Parse AI response and create structured results
      const aiParsedResults = parseAIResponse(aiResponse);
      setAiSearchResults(aiParsedResults);

      // Also filter existing sample results for fallback
      const basicResults = sampleSearchResults.filter(result => {
        const searchLower = term.toLowerCase();
        const speciesMatch = result.species.toLowerCase().includes(searchLower);
        const commonMatch = result.common.toLowerCase().includes(searchLower);
        const familyMatch = result.family.toLowerCase().includes(searchLower);
        const genusMatch = result.genus.toLowerCase().includes(searchLower);
        return speciesMatch || commonMatch || familyMatch || genusMatch;
      });

      setSearchResults(basicResults);
    } catch (error) {
      console.error('Search error:', error);
      setAiSearchResults([]);
      const basicResults = sampleSearchResults.filter(result => 
        result.species.toLowerCase().includes(term.toLowerCase()) ||
        result.common.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(basicResults);
    } finally {
      setIsSearching(false);
    }
  };

  const parseAIResponse = (response) => {
    const results = [];
    const sections = response.split('\n\n');
    
    sections.forEach(section => {
      if (section.includes('Species:')) {
        const lines = section.split('\n');
        const result = {};
        
        lines.forEach(line => {
          if (line.startsWith('Species:')) result.species = line.replace('Species:', '').trim();
          if (line.startsWith('Common Name:')) result.common = line.replace('Common Name:', '').trim();
          if (line.startsWith('Family:')) result.family = line.replace('Family:', '').trim();
          if (line.startsWith('Order:')) result.order = line.replace('Order:', '').trim();
          if (line.startsWith('Genus:')) result.genus = line.replace('Genus:', '').trim();
          if (line.startsWith('Habitat:')) result.habitat = line.replace('Habitat:', '').trim();
          if (line.startsWith('Distribution:')) result.distribution = line.replace('Distribution:', '').trim();
          if (line.startsWith('Conservation Status:')) result.conservation = line.replace('Conservation Status:', '').trim();
        });
        
        if (result.species && result.common) {
          results.push({
            ...result,
            confidence: 95 // AI results get high confidence
          });
        }
      }
    });
    
    return results;
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setSearchResults([]);
    setAiSearchResults([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchTerm.trim()) {
        performSearch(searchTerm);
      }
    }
  };

  const handleEnterSearch = () => {
    if (searchTerm.trim()) {
      performSearch(searchTerm);
    }
  };


  const renderTreeNode = (node, level = 0) => {
    const isExpanded = expandedNodes[node.id];
    const hasChildren = node.children && node.children.length > 0;

    const levelColors = {
      phylum: 'text-coral-800 bg-coral-100',
      class: 'text-ocean-800 bg-ocean-100',
      order: 'text-seaweed-800 bg-seaweed-100',
      family: 'text-fishOrange-800 bg-fishOrange-100',
      species: 'text-ocean-800 glass-ocean'
    };

    return (
      <div key={node.id} style={{ marginLeft: `${level * 24}px` }}>
        <div 
          className="flex items-center py-2 px-3 rounded-lg cursor-pointer group transition-all duration-200"
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          <div className="flex items-center space-x-2 flex-1">
            {hasChildren ? (
              isExpanded ? <ChevronDown className="w-4 h-4 text-ocean-600" /> : <ChevronRight className="w-4 h-4 text-ocean-600" />
            ) : (
              <div className="w-4 h-4" />
            )}
            
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${levelColors[node.level]}`}>
              {node.level}
            </span>
            
            <div className="flex-1">
              <div className="font-medium text-ocean-800 italic">{node.name}</div>
              {node.common && <div className="text-sm text-gray-600">{node.common}</div>}
            </div>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="border-l-2 border-white/30 ml-6">
            {node.children.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="py-12 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-ocean-800 mb-4 animate-float">Species Taxonomy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore marine species classification and search our comprehensive taxonomic database
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Search Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-ocean-800">Species Search</h2>
            
            {/* Search Input */}
            <div className="glass rounded-2xl p-6 glow-soft">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by species name or common name..."
                  className="w-full pl-12 pr-4 py-4 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500/20"
                  value={searchTerm}
                  onChange={handleSearch}
                  onKeyPress={handleKeyPress}
                />
              </div>
                <button
                  onClick={handleEnterSearch}
                  disabled={!searchTerm.trim() || isSearching}
                  className="bg-ocean-800 text-white px-6 py-4 rounded-lg glow-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSearching ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  <span>{isSearching ? 'Searching...' : 'Search'}</span>
                </button>
              </div>
              
              {searchTerm && (
                <div className="mt-4 text-sm text-gray-600">
                  {isSearching ? 'Searching...' : `Results for: `}
                  {!isSearching && <span className="font-medium text-ocean-700">"{searchTerm}"</span>}
                </div>
              )}
            </div>

            {/* Search Results */}
            {(aiSearchResults.length > 0 || searchResults.length > 0) && (
              <div className="glass rounded-2xl p-6 glow-soft">
                <h3 className="text-lg font-semibold text-ocean-800 mb-4">
                  Search Results {aiSearchResults.length > 0 && <span className="text-sm font-normal text-gray-600">(AI Enhanced)</span>}
                </h3>
                <div className="space-y-3">
                  {/* Show AI results first if available */}
                  {aiSearchResults.map((result, index) => (
                    <div key={index} className="glass-dark rounded-lg p-4 transition-all duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="font-medium text-ocean-800 italic text-lg mb-1">{result.species}</div>
                          <div className="text-sm text-gray-700 font-medium mb-2">{result.common}</div>
                          
                          {/* Enhanced taxonomic information in bullet format */}
                          <div className="space-y-1 text-sm">
                            {result.order && (
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-ocean-600 rounded-full"></span>
                                <span className="text-gray-600"><strong>Order:</strong> {result.order}</span>
                              </div>
                            )}
                            {result.family && (
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-ocean-600 rounded-full"></span>
                                <span className="text-gray-600"><strong>Family:</strong> {result.family}</span>
                              </div>
                            )}
                            {result.genus && (
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-ocean-600 rounded-full"></span>
                                <span className="text-gray-600"><strong>Genus:</strong> {result.genus}</span>
                              </div>
                            )}
                            {result.habitat && (
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-ocean-600 rounded-full"></span>
                                <span className="text-gray-600"><strong>Habitat:</strong> {result.habitat}</span>
                              </div>
                            )}
                            {result.distribution && (
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-ocean-600 rounded-full"></span>
                                <span className="text-gray-600"><strong>Distribution:</strong> {result.distribution}</span>
                              </div>
                            )}
                            {result.conservation && (
                              <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-ocean-600 rounded-full"></span>
                                <span className="text-gray-600"><strong>Conservation:</strong> {result.conservation}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-lg font-semibold text-ocean-700">{result.confidence}%</div>
                          <div className="text-xs text-gray-500">match</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-gradient-to-r from-ocean-500 to-aqua-500 h-1 rounded-full transition-all duration-500"
                          style={{ width: `${result.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Show sample results if no AI results */}
                  {aiSearchResults.length === 0 && searchResults.map((result, index) => (
                    <div key={index} className="glass-dark rounded-lg p-4 transition-all duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="font-medium text-ocean-800 italic text-lg mb-1">{result.species}</div>
                          <div className="text-sm text-gray-700 font-medium mb-2">{result.common}</div>
                          
                          {/* Key taxonomic information in bullet format */}
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center space-x-2">
                              <span className="w-2 h-2 bg-ocean-600 rounded-full"></span>
                              <span className="text-gray-600"><strong>Order:</strong> {result.order}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="w-2 h-2 bg-ocean-600 rounded-full"></span>
                              <span className="text-gray-600"><strong>Family:</strong> {result.family}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="w-2 h-2 bg-ocean-600 rounded-full"></span>
                              <span className="text-gray-600"><strong>Genus:</strong> {result.genus}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-lg font-semibold text-ocean-700">{result.confidence}%</div>
                          <div className="text-xs text-gray-500">match</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-gradient-to-r from-ocean-500 to-aqua-500 h-1 rounded-full transition-all duration-500"
                          style={{ width: `${result.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {searchTerm && aiSearchResults.length === 0 && searchResults.length === 0 && !isSearching && (
              <div className="glass rounded-2xl p-6 text-center glow-soft">
                <div className="w-16 h-16 bg-gradient-to-br from-ocean-100 to-aqua-200 rounded-full flex items-center justify-center mx-auto mb-4 glow-soft">
                  <Fish className="w-8 h-8 text-ocean-700 animate-pulse-soft" />
                </div>
                <p className="text-gray-500">No species found matching "{searchTerm}"</p>
                <p className="text-sm text-gray-400 mt-1">Try different keywords or check spelling</p>
              </div>
            )}
          </div>

          {/* Taxonomy Tree */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-semibold text-ocean-800">Taxonomic Tree</h2>
              <TreePine className="w-6 h-6 text-ocean-600" />
            </div>
            
            <div className="glass rounded-2xl p-6 max-h-[600px] overflow-y-auto glow-soft">
              <div className="space-y-1">
                {taxonomyTree.map(node => renderTreeNode(node))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-4 text-center glow-soft">
                <div className="w-12 h-12 bg-gradient-to-br from-ocean-100 to-aqua-200 rounded-full flex items-center justify-center mx-auto mb-2 glow-soft">
                  <Fish className="w-6 h-6 text-ocean-700" />
                </div>
                <div className="text-2xl font-bold text-ocean-800">2,847</div>
                <div className="text-sm text-gray-600">Species Cataloged</div>
              </div>
              <div className="glass rounded-xl p-4 text-center glow-soft">
                <div className="w-12 h-12 bg-gradient-to-br from-aqua-100 to-aqua-200 rounded-full flex items-center justify-center mx-auto mb-2 glow-soft">
                  <Waves className="w-6 h-6 text-aqua-700" />
                </div>
                <div className="text-2xl font-bold text-ocean-800">156</div>
                <div className="text-sm text-gray-600">Families</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taxonomy;