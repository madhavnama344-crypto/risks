import React, { useState } from 'react';
import { Layers, BarChart3, TrendingUp, Filter, Download, ToggleLeft, ToggleRight, Table, Map } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Visualization = () => {
    // --- STATE AND DATA (No changes here) ---
    const [activeLayer, setActiveLayer] = useState('temperature');
    const [selectedDepth, setSelectedDepth] = useState(50);
    const [selectedTemperature, setSelectedTemperature] = useState([15, 25]);
    const [selectedFishType, setSelectedFishType] = useState('all');
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [viewMode, setViewMode] = useState('map');
    const [compareMode, setCompareMode] = useState(false);
    const [selectedDatasets, setSelectedDatasets] = useState(['dataset1']);

    const speciesRichnessData = [{ month: 'Jan', richness: 145 }, { month: 'Feb', richness: 132 }, { month: 'Mar', richness: 158 }, { month: 'Apr', richness: 167 }, { month: 'May', richness: 189 }, { month: 'Jun', richness: 201 }, { month: 'Jul', richness: 195 }, { month: 'Aug', richness: 188 }, { month: 'Sep', richness: 176 }, { month: 'Oct', richness: 163 }, { month: 'Nov', richness: 154 }, { month: 'Dec', richness: 141 }];
    const fishDistributionData = [{ region: 'Northern', tuna: 45, cod: 32, salmon: 28, mackerel: 67 }, { region: 'Central', tuna: 52, cod: 28, salmon: 15, mackerel: 89 }, { region: 'Southern', tuna: 38, cod: 41, salmon: 35, mackerel: 54 }, { region: 'Eastern', tuna: 61, cod: 19, salmon: 42, mackerel: 72 }, { region: 'Western', tuna: 44, cod: 36, salmon: 29, mackerel: 58 }];
    const biodiversityScatterData = [{ depth: 10, biodiversity: 8.2 }, { depth: 25, biodiversity: 7.8 }, { depth: 50, biodiversity: 6.5 }, { depth: 100, biodiversity: 5.2 }, { depth: 150, biodiversity: 4.1 }, { depth: 200, biodiversity: 3.8 }, { depth: 300, biodiversity: 2.9 }, { depth: 500, biodiversity: 2.1 }];
    const indianOceanHeatmapData = [{ lat: -5.0, lng: 75.0, temperature: 28, depth: 10, speciesCount: 32, salinity: 35.2, species: 'Thunnus thynnus' }, { lat: -10.0, lng: 80.0, temperature: 26, depth: 25, speciesCount: 28, salinity: 35.0, species: 'Gadus morhua' }, { lat: -15.0, lng: 85.0, temperature: 24, depth: 50, speciesCount: 25, salinity: 34.8, species: 'Salmo salar' }, { lat: -20.0, lng: 90.0, temperature: 22, depth: 100, speciesCount: 20, salinity: 34.5, species: 'Scomber scombrus' }, { lat: -25.0, lng: 95.0, temperature: 20, depth: 150, speciesCount: 18, salinity: 34.2, species: 'Pleuronectes platessa' }, { lat: 0.0, lng: 70.0, temperature: 29, depth: 10, speciesCount: 35, salinity: 35.5, species: 'Thunnus thynnus' }, { lat: -5.0, lng: 65.0, temperature: 27, depth: 25, speciesCount: 30, salinity: 35.3, species: 'Katsuwonus pelamis' }, { lat: -10.0, lng: 60.0, temperature: 25, depth: 50, speciesCount: 26, salinity: 35.0, species: 'Coryphaena hippurus' }, { lat: -15.0, lng: 55.0, temperature: 23, depth: 100, speciesCount: 22, salinity: 34.7, species: 'Xiphias gladius' }, { lat: -20.0, lng: 50.0, temperature: 21, depth: 150, speciesCount: 19, salinity: 34.4, species: 'Makaira nigricans' }];
    const topSpeciesData = [{ species: 'Atlantic Cod', count: 1247, percentage: 32.4 }, { species: 'Bluefin Tuna', count: 986, percentage: 25.6 }, { species: 'Atlantic Salmon', count: 743, percentage: 19.3 }, { species: 'Mackerel', count: 521, percentage: 13.5 }, { species: 'Herring', count: 356, percentage: 9.2 }];
    const abundantFishData = [{ type: 'Pelagic', count: 2847 }, { type: 'Demersal', count: 1923 }, { type: 'Benthic', count: 1456 }, { type: 'Anadromous', count: 892 }];
    const temperatureSpeciesData = [{ temp: '5-10°C', species: 45 }, { temp: '10-15°C', species: 67 }, { temp: '15-20°C', species: 89 }, { temp: '20-25°C', species: 72 }, { temp: '25-30°C', species: 34 }];

    // --- HELPER FUNCTIONS (No changes here) ---
    const HeatmapOverlay = ({ data }) => {
        useMap();
        return (<>{data.map((point, index) => (<CircleMarker key={index} center={[point.lat, point.lng]} radius={Math.max(5, point.speciesCount / 2)} pathOptions={{ fillColor: `rgba(60, 126, 219, ${point.speciesCount / 40})`, color: '#30345E', weight: 1, opacity: 0.8, fillOpacity: 0.6 }}><Popup><div className="text-sm"><div className="font-semibold text-[#30345E] mb-2">Marine Data Point</div><div><strong>Location:</strong> {point.lat.toFixed(2)}°, {point.lng.toFixed(2)}°</div><div><strong>Temperature:</strong> {point.temperature}°C</div><div><strong>Salinity:</strong> {point.salinity}</div><div><strong>Depth:</strong> {point.depth}m</div><div><strong>Species Count:</strong> {point.speciesCount}</div><div><strong>Dominant Species:</strong> <em>{point.species}</em></div></div></Popup></CircleMarker>))}</>);
    };
    const filteredHeatmapData = indianOceanHeatmapData.filter(point => point.depth <= selectedDepth && point.temperature >= selectedTemperature[0] && point.temperature <= selectedTemperature[1]);
    const downloadChart = (chartName) => {
        const chartData = { 'species-richness': speciesRichnessData, 'fish-distribution': fishDistributionData, 'depth-biodiversity': biodiversityScatterData, 'temperature-species': temperatureSpeciesData };
        const data = chartData[chartName] || [];
        const csvContent = Object.keys(data[0] || {}).join(',') + '\n' + data.map(row => Object.values(row).join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `${chartName}-data.csv`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    };
    const toggleDataset = (datasetId) => { setSelectedDatasets(prev => prev.includes(datasetId) ? prev.filter(id => id !== datasetId) : [...prev, datasetId]); };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* --- HEADER & TOP FILTERS (No changes here) --- */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-semibold text-ocean-800 mb-4 animate-float">Marine Data Visualization</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Interactive maps and analytics for comprehensive marine ecosystem analysis</p>
                    </div>
                    <div className="flex justify-center mb-6">
                        <div className="glass rounded-lg p-1 glow-soft inline-flex">
                            {[{ id: 'map', label: 'Map View', icon: Map }, { id: 'chart', label: 'Chart View', icon: BarChart3 }, { id: 'table', label: 'Table View', icon: Table }].map(({ id, label, icon: Icon }) => (<button key={id} onClick={() => setViewMode(id)} className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${viewMode === id ? 'glass-ocean text-black glow-soft' : 'text-gray-600 hover:bg-white/20'}`}><Icon className="w-4 h-4" /><span className="text-sm font-medium">{label}</span></button>))}
                        </div>
                    </div>
                    <div className="glass rounded-2xl p-4 mb-6 glow-soft">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center space-x-2"><Filter className="w-4 h-4 text-ocean-700" /><span className="text-sm font-medium text-ocean-700">Filters:</span></div>
                            <select value={selectedFishType} onChange={(e) => setSelectedFishType(e.target.value)} className="px-3 py-1 glass rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500/20"><option value="all">All Fish Types</option><option value="pelagic">Pelagic</option><option value="demersal">Demersal</option><option value="benthic">Benthic</option></select>
                            <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="px-3 py-1 glass rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ocean-500/20"><option value="all">All Regions</option><option value="northern">Northern</option><option value="central">Central</option><option value="southern">Southern</option></select>
                            <div className="flex items-center space-x-2"><span className="text-sm text-gray-600">Compare Datasets:</span><button onClick={() => setCompareMode(!compareMode)} className="flex items-center space-x-1">{compareMode ? (<ToggleRight className="w-5 h-5 text-ocean-600" />) : (<ToggleLeft className="w-5 h-5 text-gray-400" />)}</button></div>
                            {compareMode && (<div className="flex items-center space-x-2">{['dataset1', 'dataset2', 'dataset3'].map(dataset => (<label key={dataset} className="flex items-center space-x-1"><input type="checkbox" checked={selectedDatasets.includes(dataset)} onChange={() => toggleDataset(dataset)} className="rounded border-gray-300 text-ocean-600 focus:ring-ocean-500" /><span className="text-xs text-gray-600 capitalize">{dataset}</span></label>))}</div>)}
                        </div>
                    </div>

                    {/* --- NEW CORRECTED LAYOUT LOGIC --- */}
                    <div className="grid lg:grid-cols-4 gap-6">

                        {/* VIEW 1: MAP (Takes full width) */}
                        {viewMode === 'map' && (
                            <div className="lg:col-span-4">
                                <div className="glass rounded-2xl overflow-hidden glow-soft">
                                    <div className="p-6 border-b border-white/20">
                                        <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-semibold text-ocean-800">Indian Ocean Marine Map</h2><div className="flex items-center space-x-2"><Layers className="w-5 h-5 text-ocean-600" /><span className="text-sm font-medium text-ocean-600">Layers</span></div></div>
                                        <div className="flex flex-wrap gap-2">{['temperature', 'salinity', 'currents', 'species'].map((layer) => (<button key={layer} onClick={() => setActiveLayer(layer)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeLayer === layer ? 'glass-ocean text-black glow-soft' : 'glass text-gray-600 hover:glass-ocean hover:text-black glow-hover'}`}>{layer.charAt(0).toUpperCase() + layer.slice(1)}</button>))}</div>
                                    </div>
                                    <div className="h-[75vh]">
                                        <MapContainer center={[-10, 75]} zoom={4} style={{ height: '100%', width: '100%' }} className="rounded-b-2xl">
                                            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                            {activeLayer === 'temperature' && (<HeatmapOverlay data={filteredHeatmapData} />)}
                                        </MapContainer>
                                    </div>
                                    <div className="p-6 border-t border-white/20 glass-dark">
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div><label className="block text-sm font-medium text-ocean-700 mb-2">Max Depth: {selectedDepth}m</label><input type="range" min="10" max="500" value={selectedDepth} onChange={(e) => setSelectedDepth(Number(e.target.value))} className="w-full accent-ocean-600" /></div>
                                            <div><label className="block text-sm font-medium text-ocean-700 mb-2">Temperature Range: {selectedTemperature[0]}°C - {selectedTemperature[1]}°C</label><div className="flex space-x-2"><input type="range" min="5" max="35" value={selectedTemperature[0]} onChange={(e) => setSelectedTemperature([Number(e.target.value), selectedTemperature[1]])} className="flex-1 accent-ocean-600" /><input type="range" min="5" max="35" value={selectedTemperature[1]} onChange={(e) => setSelectedTemperature([selectedTemperature[0], Number(e.target.value)])} className="flex-1 accent-ocean-600" /></div></div>
                                            <div className="flex items-end"><button className="bg-ocean-800 text-white px-4 py-2 rounded-lg glow-hover transition-all duration-200 flex items-center space-x-2 w-full justify-center"><Filter className="w-4 h-4" /><span>Apply Filters</span></button></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* VIEW 2: CHART (Takes 3/4 + 1/4 layout) */}
                        {viewMode === 'chart' && (
                            <>
                                <div className="lg:col-span-3 space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="glass-sand p-6 rounded-2xl glow-soft"><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-ocean-800">Species Richness Over Time</h3><Download className="w-4 h-4 text-ocean-600 cursor-pointer hover:scale-110" onClick={() => downloadChart('species-richness')} /></div><ResponsiveContainer width="100%" height={250}><LineChart data={speciesRichnessData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="month" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip /><Line type="monotone" dataKey="richness" stroke="url(#oceanLineGradient)" strokeWidth={2} dot={{ r: 4 }} /><defs><linearGradient id="oceanLineGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#0ea5e9" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs></LineChart></ResponsiveContainer></div>
                                        <div className="glass-sand p-6 rounded-2xl glow-soft"><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-ocean-800">Fish Distribution by Region</h3><Download className="w-4 h-4 text-fishOrange-600 cursor-pointer hover:scale-110" onClick={() => downloadChart('fish-distribution')} /></div><ResponsiveContainer width="100%" height={250}><BarChart data={fishDistributionData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="region" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} /><Tooltip /><Bar dataKey="tuna" fill="#0ea5e9" /><Bar dataKey="cod" fill="#f07142" /><Bar dataKey="salmon" fill="#22c55e" /><Bar dataKey="mackerel" fill="#ff7b1a" /></BarChart></ResponsiveContainer></div>
                                        <div className="glass-sand p-6 rounded-2xl glow-soft"><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-ocean-800">Depth vs Biodiversity</h3><Download className="w-4 h-4 text-seaweed-600 cursor-pointer hover:scale-110" onClick={() => downloadChart('depth-biodiversity')} /></div><ResponsiveContainer width="100%" height={250}><ScatterChart data={biodiversityScatterData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="depth" name="Depth" unit="m" tick={{ fontSize: 12 }} /><YAxis dataKey="biodiversity" name="Biodiversity Index" tick={{ fontSize: 12 }} /><Tooltip cursor={{ strokeDasharray: '3 3' }} /><Scatter dataKey="biodiversity" fill="#22c55e" /></ScatterChart></ResponsiveContainer></div>
                                        <div className="glass-sand p-6 rounded-2xl glow-soft"><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-ocean-800">Temperature vs Species</h3><Download className="w-4 h-4 text-coral-600 cursor-pointer hover:scale-110" onClick={() => downloadChart('temperature-species')} /></div><ResponsiveContainer width="100%" height={250}><BarChart data={temperatureSpeciesData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="temp" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} /><Tooltip /><Bar dataKey="species" fill="#f07142" /></BarChart></ResponsiveContainer></div>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="glass-sand p-6 rounded-2xl glow-soft"><h3 className="text-lg font-semibold text-ocean-800 mb-4">Top Species</h3><div className="space-y-3">{topSpeciesData.slice(0, 3).map((species) => (<div key={species.species} className="flex items-center justify-between"><span className="text-gray-700 text-sm">{species.species}</span><div className="flex items-center space-x-2"><div className="w-16 bg-gray-200 rounded-full h-2"><div className="bg-gradient-to-r from-coral-500 to-fishOrange-500 h-2 rounded-full" style={{ width: `${species.percentage}%` }}></div></div><span className="text-ocean-700 font-mono text-xs">{species.percentage}%</span></div></div>))}</div></div>
                                        <div className="glass-sand p-6 rounded-2xl glow-soft"><h3 className="text-lg font-semibold text-ocean-800 mb-4">Most Abundant Fish Types</h3><ResponsiveContainer width="100%" height={150}><BarChart data={abundantFishData} layout="vertical"><XAxis type="number" tick={{ fontSize: 10 }} /><YAxis dataKey="type" type="category" tick={{ fontSize: 10 }} width={70} /><Tooltip /><Bar dataKey="count">{abundantFishData.map((_entry, index) => (<Cell key={`cell-${index}`} fill={['#0ea5e9', '#f07142', '#22c55e', '#ff7b1a'][index % 4]} />))}</Bar></BarChart></ResponsiveContainer></div>
                                        <div className="glass-sand p-6 rounded-2xl glow-soft"><h3 className="text-lg font-semibold text-ocean-800 mb-4">Temperature vs Species</h3><ResponsiveContainer width="100%" height={150}><LineChart data={temperatureSpeciesData}><XAxis dataKey="temp" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} /><Tooltip /><Line type="monotone" dataKey="species" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} /></LineChart></ResponsiveContainer></div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="glass-sand p-6 rounded-2xl glow-soft"><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-ocean-800">Species Richness</h3><Download className="w-4 h-4 text-ocean-600 cursor-pointer" onClick={() => downloadChart('species-richness')} /></div><ResponsiveContainer width="100%" height={200}><LineChart data={speciesRichnessData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="month" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip /><Line type="monotone" dataKey="richness" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} /></LineChart></ResponsiveContainer></div>
                                    <div className="glass-sand p-6 rounded-2xl glow-soft"><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-ocean-800">Fish Distribution</h3><BarChart3 className="w-4 h-4 text-fishOrange-600" /></div><ResponsiveContainer width="100%" height={250}><BarChart data={fishDistributionData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="region" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} /><Tooltip /><Bar dataKey="tuna" fill="#0ea5e9" /><Bar dataKey="cod" fill="#f07142" /><Bar dataKey="salmon" fill="#22c55e" /><Bar dataKey="mackerel" fill="#ff7b1a" /></BarChart></ResponsiveContainer></div>
                                    <div className="glass-sand p-6 rounded-2xl glow-soft"><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-ocean-800">Depth vs Biodiversity</h3><TrendingUp className="w-4 h-4 text-seaweed-600" /></div><ResponsiveContainer width="100%" height={200}><ScatterChart data={biodiversityScatterData}><CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /><XAxis dataKey="depth" name="Depth" unit="m" tick={{ fontSize: 12 }} /><YAxis dataKey="biodiversity" name="Biodiversity Index" tick={{ fontSize: 12 }} /><Tooltip cursor={{ strokeDasharray: '3 3' }} /><Scatter dataKey="biodiversity" fill="#22c55e" /></ScatterChart></ResponsiveContainer></div>
                                </div>
                            </>
                        )}

                        {/* VIEW 3: TABLE (Takes full width) */}
                        {viewMode === 'table' && (
                            <div className="lg:col-span-4">
                                <div className="glass rounded-2xl overflow-hidden glow-soft">
                                    <div className="p-6 border-b border-white/20"><h3 className="text-lg font-semibold text-ocean-800">Species Data Table</h3></div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="glass-dark"><tr><th className="px-4 py-3 text-left text-sm font-semibold text-ocean-800">Species</th><th className="px-4 py-3 text-left text-sm font-semibold text-ocean-800">Count</th><th className="px-4 py-3 text-left text-sm font-semibold text-ocean-800">Region</th><th className="px-4 py-3 text-left text-sm font-semibold text-ocean-800">Depth (m)</th><th className="px-4 py-3 text-left text-sm font-semibold text-ocean-800">Temperature (°C)</th></tr></thead>
                                            <tbody className="divide-y divide-white/20">{topSpeciesData.map((species, index) => (<tr key={index} className="transition-colors duration-200 hover:bg-white/10"><td className="px-4 py-3 font-medium text-ocean-800">{species.species}</td><td className="px-4 py-3 font-mono text-sm">{species.count}</td><td className="px-4 py-3 text-gray-600">Northern</td><td className="px-4 py-3 font-mono text-sm">{50 + index * 20}</td><td className="px-4 py-3 font-mono text-sm">{15 + index * 2}</td></tr>))}</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Visualization;