// This is the lib/api.tsx

const BASE_URL = process.env.NEXT_PUBLIC_NGINX_URL!;

export async function signup(email: string, password: string) {
    const response = await fetch(`${BASE_URL}/api/signup`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Signup failed');
    }

    return await response.json();
}

export async function login(email: string, password: string) {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
    }

    return await response.json();
} 

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login"; // redirect to login page
}
