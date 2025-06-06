"use client";

import { useState , useRef} from 'react';
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
import {useReactMediaRecorder} from "react-media-recorder";

export default function Home() {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [mode, setMode] = useState<'upload' | 'record'>('upload'); // 'upload' or 'record'
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAudioUpload = async () => {
    if (!audioFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('audio', audioFile);

    try {
      const response = await fetch('/api/process-audio', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data.outputText);
    } catch (error) {
      setResult('Error processing audio.');
    } finally {
      setLoading(false);
    }
  };

  const handleAudioRecordedUpload = async () => {
  if (!mediaBlobUrl) return;
  setLoading(true);

  const blob = await fetch(mediaBlobUrl).then(r => r.blob());
  const formData = new FormData();
  formData.append('audio', blob, 'recording.webm');

  try {
    const response = await fetch('/api/process-audio', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setResult(data.outputText);
  } catch (error) {
    setResult('Error processing recorded audio.');
  } finally {
    setLoading(false);
  }
};

  const checkIfAlreadyLoggedIn = () => {
    // This function can be used to check if the user is already logged in
    // and redirect them accordingly. For now, it does nothing.

    // You can implement your logic here, such as checking cookies or local storage

  }

  const addAudioElement = (blob: Blob) => {
     const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  }

  const renderCardInteraction = () => {
    if (mode == 'upload')
      {
        return(
          <>
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
        </>
        )
      }
    else if (mode == 'record')
      {
        return(
          <>
          <CardContent className="p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Record Audio</h2>
            <p className="text-gray-400 mb-4">Click the button below to start recording your audio.</p>
            <Button onClick={startRecording}>Start Recording</Button>
            <Button onClick={stopRecording}>Stop Recording</Button>
          </div>
          {mediaBlobUrl && (
          <div className="mt-4 space-y-2">
            <audio src={mediaBlobUrl} controls />
            <div>
              <a href={mediaBlobUrl} download="recording.wav" className="text-blue-500 underline">
                Descargar grabación
              </a>
            </div>
            <Button onClick={handleAudioRecordedUpload} disabled={loading}>
              {loading ? 'Processing...' : 'Upload Recording'}
            </Button>
          </div>
        )}

        {result && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Result:</h2>
            <p className="text-green-400 whitespace-pre-line mt-2">{result}</p>
          </div>
        )}
          </CardContent>
          </>
        )
      }
  }

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
      <div className="text-center flex-auto flex-row mb-6 space-x-16">
        <Button
          onClick ={() => setMode('upload')}>
          Upload Audio File
        </Button>
        <Button
          onClick={() => setMode('record')}>
          Record Audio
        </Button>
      </div>
      <Card className="bg-gray-900 shadow-xl rounded-2xl">
        {renderCardInteraction()}
        {/* <CardContent className="p-6 space-y-4">
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
        </CardContent> */}
      </Card>

      <div className="text-center mt-8">
        <p className="text-gray-400">Need an account?</p>
        <Button variant="link" onClick={() => router.push('/signup')}>
          Sign Up Here
        </Button>
      </div>
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
