"use client";

// This is the app/signup/page.tsx

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { signup, login } from '@/lib/api';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import PlaylistIcon from '@mui/icons-material/PlaylistPlay';


export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signup(email, password); // intenta crear el usuario
      const loginResponse = await login(email, password); // login automático

      // Guardar token en localStorage
      localStorage.setItem("token", loginResponse.token);

      router.push('/');
    } catch (err: any) {
      setError(err.message); // puede venir de signup o login
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
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
        <div className="max-w-md mx-auto mt-10">
          <Card className="bg-gray-900 shadow-xl rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <h1 className="text-2xl font-bold text-center">Sign Up</h1>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button className="w-full" onClick={handleSignup}>
                Create Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
