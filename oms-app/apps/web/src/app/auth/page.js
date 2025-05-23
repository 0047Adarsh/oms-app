'use client';

import '../../styles/Login.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  // const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const email = formData.get('email');
  //   const pwd = formData.get('password');

  //   if (!email || !pwd) {
  //     alert('Please enter both email and password.');
  //     return;
  //   }
  //   router.push('/admin/orders');
  //   console.log({ email, password: pwd });
  //   alert('Logged in successfully (mock)');
  // };

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   const validEmail = 'admin@example.com';
  //   const validPassword = 'password123';

  //   const formData = new FormData(e.target);
  //   const email = formData.get('email');
  //   const pwd = formData.get('password');

  //   if (email === validEmail && password === validPassword) {
  //     document.cookie = 'isAdminLoggedIn=true; path=/';
  //     router.push('/admin/orders');
  //   } else {
  //     setError('Invalid credentials. Try admin@example.com / password123');
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // if (res.status === 401 || res.status === 400) {
    //   setError('Invalid credentials');
    //   return;
    // }

    // router.push('/admin/orders');
    if (res.ok) {
      alert("Working")
      router.push('/');
    } else {
      setError('Invalid credentials');
    }
  } catch (err) {
    setError('Something went wrong. Please try again.');
  }
};

  return (
    <div className="login-container">
      <div className="login-split">
      
        <div className="login-welcome">
          <h1 className="login-welcome-title">Welcome Back</h1>
          <p className="login-welcome-text">Sign in to manage orders and complaints</p>
        </div>

        <div className="login-form-wrapper">
          <form onSubmit={handleLogin} className="login-form">
          {/* <form action="/login" method="POST" className="login-form"> */}
            <h2 className="login-title">Sign In</h2>

            <div>
              <label htmlFor="email" className="login-label">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="login-input"
                placeholder="you@example.com" 
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* <div className="password-field">
              <label htmlFor="password" className="login-label">Password</label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="login-input"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div> */}
            <div className="password-field">
                <label htmlFor="password" className="login-label">Password</label>

                <div className="password-input-relative">
                    <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="login-input login-input-password"
                    placeholder="••••••••"
                    />

                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle-btn-top"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                    {showPassword ? '🙈' : '👁️'}
                    </button>
                </div>
                </div>

            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>
          {error && <p className="login-error">{error}</p>}

          <p className="login-footer">
            © {new Date().getFullYear()} Order Management System
          </p>
        </div>
      </div>
    </div>
  );
}