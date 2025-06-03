"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PieChart, BarChart } from '@mui/x-charts';
import { ArrowLeft, PlaylistAddCheck, Shuffle, Timeline, LibraryMusic } from '@mui/icons-material';

// Mock data
const mockPlaylists = [
  { id: 1, name: 'Workout Mix', songCount: 42, duration: '2h 18m', lastUpdated: '2 days ago' },
  { id: 2, name: 'Chill Vibes', songCount: 28, duration: '1h 45m', lastUpdated: '1 week ago' },
  { id: 3, name: 'Focus Flow', songCount: 35, duration: '2h 5m', lastUpdated: '3 days ago' },
];

const organizationResults = {
  moodDistribution: [
    { id: 0, value: 35, label: 'Energetic' },
    { id: 1, value: 25, label: 'Chill' },
    { id: 2, value: 20, label: 'Happy' },
    { id: 3, value: 15, label: 'Melancholic' },
    { id: 4, value: 5, label: 'Angry' },
  ],
  genreDistribution: [
    { id: 0, value: 40, label: 'Electronic' },
    { id: 1, value: 25, label: 'Pop' },
    { id: 2, value: 15, label: 'Rock' },
    { id: 3, value: 10, label: 'Hip Hop' },
    { id: 4, value: 10, label: 'Other' },
  ],
  recommendedChanges: [
    "Remove 5 duplicate tracks",
    "Add 3 transition songs between moods",
    "Balance genre distribution",
    "Adjust volume levels on 2 tracks"
  ]
};

export default function PlaylistOrganizerPage() {
  const router = useRouter();
  const [selectedPlaylist, setSelectedPlaylist] = useState<number | null>(null);
  const [isOrganizing, setIsOrganizing] = useState(false);
  const [organizationComplete, setOrganizationComplete] = useState(false);

  const handleOrganize = () => {
    if (!selectedPlaylist) return;
    
    setIsOrganizing(true);
    
    // Simulate organization process
    setTimeout(() => {
      setIsOrganizing(false);
      setOrganizationComplete(true);
    }, 2000);
  };

  const whiteTextChartSx = {
    '& .MuiChartsAxis-tickLabel': { fill: '#ffffff !important' },
    '& .MuiChartsAxis-label': { fill: '#ffffff !important' },
    '& .MuiChartsLegend-series': { fill: '#ffffff !important' },
    '& .MuiChartsAxis-line': { stroke: '#ff6b6b' },
    '& .MuiChartsAxis-tick': { stroke: '#4ecdc4' },
    '& .MuiChartsTooltip-cell': { color: '#ffffff !important' },
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center mb-6">
          <Button
            onClick={() => router.back()}
            className="text-white hover:bg-gray-800/50 mr-4"
          >
            <ArrowLeft className="mr-2" />
            Back
          </Button>
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white flex-1 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PlaylistAddCheck className="inline mr-2 align-middle" />
            Playlist Organizer
          </motion.h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Playlist Selection Panel */}
          <Card className="bg-gray-800 border-gray-700">
            <div>
              <h2 className="text-white flex items-center">
                <Shuffle className="mr-2" />
                Select Playlist
              </h2>
            </div>
            <CardContent>
              <div className="space-y-3">
                {mockPlaylists.map((playlist) => (
                  <div
                    key={playlist.id}
                    onClick={() => setSelectedPlaylist(playlist.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedPlaylist === playlist.id
                        ? 'ring-2 ring-purple-500 bg-gray-700'
                        : 'bg-gray-700/50 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{playlist.name}</h3>
                        <p className="text-sm text-gray-400">
                          {playlist.songCount} songs • {playlist.duration}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">
                        Updated {playlist.lastUpdated}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleOrganize}
                disabled={!selectedPlaylist || isOrganizing}
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
              >
                {isOrganizing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Organizing...
                  </>
                ) : (
                  <>
                    <LibraryMusic className="mr-2" />
                    Organize Playlist
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <div className="space-y-6">
            {organizationComplete ? (
              <>
                <Card className="bg-gray-800 border-gray-700">
                  <div>
                    <h2 className="text-white flex items-center">
                      <Timeline className="mr-2" />
                      Organization Results
                    </h2>
                  </div>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Selected Playlist</p>
                        <p className="text-xl font-semibold text-white">
                          {mockPlaylists.find(p => p.id === selectedPlaylist)?.name}
                        </p>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Recommended Changes</p>
                        <p className="text-xl font-semibold text-white">
                          {organizationResults.recommendedChanges.length}
                        </p>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-3">Mood Distribution</h3>
                    <PieChart
                      series={[{ 
                        data: organizationResults.moodDistribution,
                        innerRadius: 30,
                        outerRadius: 100,
                      }]}
                      height={300}
                      colors={['#ff6b6b', '#4ecdc4', '#feca57', '#a55eea', '#1dd1a1']}
                      sx={whiteTextChartSx}
                      slotProps={{
                        legend: {
                          direction: 'horizontal',
                          position: { vertical: 'bottom', horizontal: 'center' },
                        },
                      }}
                    />

                    <h3 className="text-lg font-semibold text-white mb-3 mt-6">Genre Distribution</h3>
                    <BarChart
                      xAxis={[{
                        data: organizationResults.genreDistribution.map(g => g.label),
                        scaleType: 'band',
                      }]}
                      series={[{
                        data: organizationResults.genreDistribution.map(g => g.value),
                      }]}
                      height={300}
                      colors={['#8884d8']}
                      sx={whiteTextChartSx}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <div>
                    <h2 className="text-white">Recommended Changes</h2>
                  </div>
                  <CardContent>
                    <ul className="space-y-2">
                      {organizationResults.recommendedChanges.map((change, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          <span className="text-gray-300">{change}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                      Apply Changes
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-gray-800 border-gray-700 h-full flex items-center justify-center">
                <CardContent className="text-center p-6">
                  <Timeline className="text-gray-500 mx-auto mb-4" style={{ fontSize: '4rem' }} />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    {selectedPlaylist ? 'Ready to organize' : 'Select a playlist'}
                  </h3>
                  <p className="text-gray-500">
                    {selectedPlaylist
                      ? 'Click "Organize Playlist" to analyze and optimize your selection'
                      : 'Choose a playlist from the left to begin organization'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}