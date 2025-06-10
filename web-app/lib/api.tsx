// This is the lib/api.tsx

const BASE_URL = process.env.NEXT_PUBLIC_URL!;

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
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    let message = 'Login failed';
    try {
      const data = await response.json();
      if (response.status === 401) {
        message = 'Invalid email or password';
      } else if (response.status === 500) {
        message = 'Server error, please try again later';
      } else if (data.message) {
        message = data.message;
      }
    } catch {
      message = 'Unexpected error during login';
    }
    throw new Error(message);
  }

  return await response.json();
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login"; // redirect to login page
}

export async function processAudio(audioFile: File) {
//   console.log("Using BASE_URL:", BASE_URL); // 🔍 Debug here

  const formData = new FormData();
  formData.append("file", audioFile); // must match 'file' param in FastAPI

  const response = await fetch(`${BASE_URL}/api/predict`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail || "Audio processing failed");
  }

  return await response.json(); // { genre, confidence }
}
