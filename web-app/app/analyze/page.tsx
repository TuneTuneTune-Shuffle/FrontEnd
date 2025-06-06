"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import StatsIcon from '@mui/icons-material/QueryStats';
import { ArrowLeft } from '@mui/icons-material';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import PlaylistIcon from '@mui/icons-material/PlaylistPlay';

// Mock user data - replace with real data from your backend
const mockUserStats = {
  totalSongs: 128,
  favoriteGenre: 'Electronic',
  topArtists: ['Daft Punk', 'The Weeknd', 'Kavinsky'],
  moodDistribution: [
    { id: 0, value: 35, label: 'Energetic' },
    { id: 1, value: 25, label: 'Chill' },
    { id: 2, value: 20, label: 'Happy' },
    { id: 3, value: 15, label: 'Melancholic' },
    { id: 4, value: 5, label: 'Angry' },
  ],
  weeklyPlays: [12, 19, 15, 8, 10, 15, 12],
  genreDistribution: [
    { id: 0, value: 40, label: 'Electronic' },
    { id: 1, value: 25, label: 'Pop' },
    { id: 2, value: 15, label: 'Rock' },
    { id: 3, value: 10, label: 'Hip Hop' },
    { id: 4, value: 10, label: 'Other' },
  ],
};

export default function AnalyzePage() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAudioUpload = async () => {
    if (!audioFile) return;
    setLoading(true);

    // In a real app, you would send this to your backend API
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock analysis result
      const mockResult = {
        bpm: 122,
        key: "D minor",
        energy: 0.87,
        danceability: 0.76,
        mood: "Energetic",
        similarTracks: ["Around the World", "One More Time", "Harder Better Faster Stronger"]
      };
      
      setAnalysisResult(mockResult);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const whiteTextChartSx = {
    '& .MuiChartsAxis-tickLabel': {
        fill: '#ffffff !important',
        fontSize: '0.75rem',
    },
    '& .MuiChartsAxis-label': {
        fill: '#ffffff !important',
        fontSize: '0.875rem',
    },
    '& .MuiChartsLegend-series': {
        fill: '#ffffff !important',
    },
    '& .MuiChartsTooltip-cell': {
        color: '#ffffff !important',
    },
    '& .MuiChartsAxis-line': {
        stroke: '#ff6b6b',
    },
    '& .MuiChartsAxis-tick': {
        stroke: '#4ecdc4',
    },
    backgroundColor: 'rgba(31, 41, 55, 0.7)', // gray-800 with transparency
    borderRadius: '0.5rem',
  };

  return (
    <main className="min-h-screen bg-gray-900">
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 flex items-center shadow-lg border-b border-gray-700">
        {/* Logo/Brand - Left section */}
        <div className="flex-1">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold text-white">TuneTuneTune Shuffle</span>
          </Link>
        </div>
        
        {/* Navigation Links - Center section */}
        <div className="flex-1 flex justify-center">
          <div className="hidden md:flex space-x-1">
            <Link 
              href="/"
              className="text-white hover:text-blue-400 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-gray-800/50 font-medium flex items-center"
            >
              <HomeIcon className="inline mr-1" />
              Home
            </Link>
            <Link 
              href="/analyze"
              className="text-white hover:text-green-400 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-gray-800/50 font-medium flex items-center"
            >
              <BarChartIcon className="inline mr-1" />
              Analyze
            </Link>
            <Link 
              href="/organize-playlist"
              className="text-white hover:text-purple-400 transition-all duration-200 px-4 py-2 rounded-lg hover:bg-gray-800/50 font-medium flex items-center"
            >
              <PlaylistIcon className="inline mr-1" />
              Organize Playlist
            </Link>
          </div>
        </div>
        {/* Right side - Sign Up */}
        <div className="flex-1 flex justify-end">
          <Link 
            href="/signup"
            className="border border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-4 py-2 rounded-lg transition-all duration-200"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className='ml-4 border border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-4 py-2 rounded-lg transition-all duration-200'>
            Log In 
          </Link>
        </div>
      </nav>
      <div className="p-6 max-w-7xl mx-auto md:p-6">
        <div className="flex items-center mb-4">
          <Button
            onClick={() => router.back()}
            className="text-white hover:bg-gray-800/50 mr-4"
          >
            <ArrowLeft className="mr-2" />
            Go Back
          </Button>
          <motion.h1
            className="text-4xl font-bold text-center text-white flex-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <EqualizerIcon className="mr-2" fontSize="large" />
            Music Analysis Dashboard
          </motion.h1>
        </div>
        {/* Audio Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gray-800 shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
                <MusicNoteIcon className="mr-2" />
                Analyze New Track
              </h2>
              <div className="space-y-4">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                  className="block w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                />
                <Button
                  onClick={handleAudioUpload}
                  disabled={loading || !audioFile}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    "Analyze Track"
                  )}
                </Button>
              </div>

              {analysisResult && (
                <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-white">Analysis Results</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-600 p-3 rounded">
                      <p className="text-gray-300">BPM</p>
                      <p className="text-2xl font-bold text-blue-400">{analysisResult.bpm}</p>
                    </div>
                    <div className="bg-gray-600 p-3 rounded">
                      <p className="text-gray-300">Key</p>
                      <p className="text-2xl font-bold text-purple-400">{analysisResult.key}</p>
                    </div>
                    <div className="bg-gray-600 p-3 rounded">
                      <p className="text-gray-300">Energy</p>
                      <p className="text-2xl font-bold text-green-400">{analysisResult.energy.toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-600 p-3 rounded">
                      <p className="text-gray-300">Mood</p>
                      <p className="text-2xl font-bold text-yellow-400">{analysisResult.mood}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="font-medium text-white">Similar Tracks:</p>
                    <ul className="list-disc list-inside text-gray-300">
                      {analysisResult.similarTracks.map((track: string, i: number) => (
                        <li key={i}>{track}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* User Statistics */}
          <Card className="bg-gray-800 shadow-xl rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-white flex items-center">
                <StatsIcon className="mr-2" />
                Your Music Statistics
              </h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Total Songs</p>
                  <p className="text-3xl font-bold text-white">{mockUserStats.totalSongs}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Favorite Genre</p>
                  <p className="text-3xl font-bold text-white">{mockUserStats.favoriteGenre}</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2 text-white">Top Artists</h3>
              <div className="flex space-x-2 mb-6">
                {mockUserStats.topArtists.map((artist, index) => (
                  <span key={index} className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-sm">
                    {artist}
                  </span>
                ))}
              </div>

              <PieChart
                series={[{ data: mockUserStats.moodDistribution }]}
                height={200}
                sx={whiteTextChartSx}
                slotProps={{
                  legend: {
                    sx: {
                      color: '#ffffff',
                      fontSize: '0.875rem',
                    },
                  },
                  }}
                className="mb-8"
              />
            </CardContent>
          </Card>
        </div>

        {/* Detailed Statistics Section */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <EqualizerIcon className="mr-2" />
            Detailed Analytics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800 p-4">
              <h3 className="text-lg font-semibold mb-4 text-white">Weekly Plays</h3>
              <LineChart
                xAxis={[{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }]}
                series={[{ data: mockUserStats.weeklyPlays, color: '#4ecdc4' }]}
                height={300}
                sx={whiteTextChartSx}
              />
            </Card>
            
            <Card className="bg-gray-800 p-4">
              <h3 className="text-lg font-semibold mb-4 text-white">Genre Distribution</h3>
              <BarChart
                xAxis={[{ 
                  data: mockUserStats.genreDistribution.map(g => g.label),
                  scaleType: 'band' 
                }]}
                series={[{ 
                  data: mockUserStats.genreDistribution.map(g => g.value),
                  color: '#ff6b6b' 
                }]}
                height={300}
                sx={whiteTextChartSx}
              />
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}