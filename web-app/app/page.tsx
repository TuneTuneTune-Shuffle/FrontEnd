"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
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

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 p-4 flex justify-between items-center shadow">
        <span className="text-xl font-bold text-white">TuneTuneTune Shuffle</span>
        <Button variant="link" onClick={() => router.push('/signup')}>
          Sign Up
        </Button>
      </nav>

      <div className="p-6">
        <motion.h1
          className="text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          TuneTuneTune Shuffle
        </motion.h1>

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

          <div className="text-center mt-8">
            <p className="text-gray-400">Need an account?</p>
            <Button variant="link" onClick={() => router.push('/signup')}>
              Sign Up Here
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
