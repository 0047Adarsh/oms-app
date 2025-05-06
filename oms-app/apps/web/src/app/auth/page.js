'use client';

import '../../styles/Login.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const pwd = formData.get('password');

    if (!email || !pwd) {
      alert('Please enter both email and password.');
      return;
    }
    router.push('/admin/orders');
    console.log({ email, password: pwd });
    alert('Logged in successfully (mock)');
  };

  return (
    <div className="login-container">
      <div className="login-split">
      
        <div className="login-welcome">
          <h1 className="login-welcome-title">Welcome Back</h1>
          <p className="login-welcome-text">Hello Welcome@</p>
        </div>

        <div className="login-form-wrapper">
          <form onSubmit={handleLogin} className="login-form">
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
          <p className="login-footer">
            © {new Date().getFullYear()} Order Management System
          </p>
        </div>
      </div>
    </div>
  );
}