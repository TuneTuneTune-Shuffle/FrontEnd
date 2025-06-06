"use client";

// This is the app/signup/page.tsx

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { signup } from '@/lib/api';


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
    await signup(email, password);
    router.push('/');
  } catch (err: any) {
    setError(err.message);
  }
};

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 p-4 flex justify-between items-center shadow">
        <button
          onClick={() => router.push('/')}
          className="text-xl font-bold text-white hover:text-blue-400"
        >
          TuneTuneTune Shuffle
        </button>
        <div className="space-x-4">
          <Button variant="link" onClick={() => router.push('/login')}>
            Log In
          </Button>
          <Button variant="link" onClick={() => router.push('/signup')}>
            Sign Up
          </Button>
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
