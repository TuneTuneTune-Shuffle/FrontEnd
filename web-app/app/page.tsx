"use client";

// This is the main app/page.tsx

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {BarChart, LineChart} from '@mui/x-charts';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import PlaylistIcon from '@mui/icons-material/PlaylistPlay';
import Link from 'next/link';
import jwtDecode from "jwt-decode";
import { useEffect } from "react"
import { useAuth } from '@/hooks/useAuth';
import { processAudio } from '@/lib/api';

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { userEmail, logout, isReady } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);



  const handleAudioUpload = async () => {
    if (!audioFile) return;
    setLoading(true);

    try { 
      console.log("Calling processAudio...");
      const data = await processAudio(audioFile);
      console.log("Received:", data);
      setResult(`Genre: ${data.genre} (Confidence: ${(data.confidence * 100).toFixed(2)}%)`);
    } catch (error: any) {
      setResult(error.message);
    } finally {
      setLoading(false);
    }
  };

  const whiteTextChartSx = {
  '& .MuiChartsAxis-line': {
    stroke: '#ff6b6b',
  },
  '& .MuiChartsAxis-tick': {
    stroke: '#4ecdc4',
  },
  '& .MuiChartsAxis-tickLabel': {
    fill: '#ffffff',
  },
  '& .MuiChartsAxis-title': {
    fill: '#ffffff',
  },
  '& .MuiChartsLegend-series text': {
    fill: '#ffffff',
  },
  '& .MuiChartsTooltip-paper': {
    backgroundColor: '#1f2937',
    color: '#ffffff',
  },
  '& .MuiChartsGrid-line': {
    stroke: '#feca57',
    strokeOpacity: 0.5,
  },
};

  if (!isReady) return null;  
  return (
    <main className="min-h-screen bg-gre-500">
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
  <div className="flex-1 flex justify-end relative">
    {!userEmail ? (
      <div className="flex space-x-4">
        <Link 
          href="/login"
          className="border border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-4 py-2 rounded-lg transition-all duration-200"
        >
          Log In
        </Link>
        <Link 
          href="/signup"
          className="border border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-4 py-2 rounded-lg transition-all duration-200"
        >
          Sign Up
        </Link>
      </div>
    ) : (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 border border-white/20 text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-200"
        >
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold">U</div>
          <span>{userEmail}</span>
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-600 rounded shadow-lg z-10">
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    )}
  </div>

</nav>

  <div className="p-6">
    <motion.h1
      className="text-4xl font-bold mb-6 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      TuneTuneTune Shuffle
    </motion.h1>

    {/* Upload section - constrained width */}
    <div className="max-w-xl mx-auto">
      <Card className="bg-gray-900 shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <Input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
          />
          <Button
            onClick={handleAudioUpload}
            disabled={loading || !audioFile}
            className="w-full"
          >
            {loading ? 'Processing...' : 'Upload & Process'}
          </Button>

          {result && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Result:</h2>
              <p className="text-green-400 whitespace-pre-line mt-2">{result}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {!userEmail && (
        <div className="text-center mt-8">
          <p className="text-gray-400">Need an account?</p>
          <Button variant="link" onClick={() => router.push('/signup')}>
            Sign Up Here
          </Button>
        </div>
      )}

    </div>

    {/* Charts section - full width */}
    <div className="mt-8 w-[50%] h-[65%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LineChart
          className='bg-blue-50 rounded-lg shadow-lg w-full'
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          height={300}
          grid={{ vertical: true, horizontal: true }}
          sx={whiteTextChartSx}
        />
        <BarChart
          className='bg-blue-50 rounded-lg shadow-lg w-full'
          xAxis={[{ data: ['A', 'B', 'C', 'D', 'E'] }]}
          series={[
            {
              data: [5, 10, 15, 20, 25],
            },
          ]}
          height={300}
          sx={whiteTextChartSx}
        />
      </div>
    </div>
  </div>
</main>
  );
}
