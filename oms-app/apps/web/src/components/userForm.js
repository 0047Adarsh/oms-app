// components/UserForm.js

'use client';

import { useState } from 'react';
import '@/styles/userForm.css';

export default function UserForm({ onCreate }) {
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    moq: 10,
    buffer_days: 3,
    bottle_volumes: ['250ml'],
    password: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        bottle_volumes: checked
          ? [...prev.bottle_volumes, name]
          : prev.bottle_volumes.filter(v => v === name)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to save user');

      const newUser = await res.json();
      onCreate?.(newUser);
    } catch (err) {
      alert('Failed to create user');
      console.error(err);
    }
  };

  const volumeOptions = ['250ml', '500ml', '750ml'];

  return (
    // <form onSubmit={handleSubmit} className="space-y-6">
    //   {/* Customer Name + Phone */}
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //     <div>
    //       <label className="block text-sm font-medium mb-2">Customer Name</label>
    //       <input
    //         type="text"
    //         name="customer_name"
    //         value={formData.customer_name}
    //         onChange={handleChange}
    //         className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label className="block text-sm font-medium mb-2">Phone</label>
    //       <input
    //         type="text"
    //         name="phone"
    //         value={formData.phone}
    //         onChange={handleChange}
    //         className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
    //       />
    //     </div>
    //   </div>

    //   {/* Password + Bottle Volumes */}
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //     <div>
    //       <label className="block text-sm font-medium mb-2">Password</label>
    //       <input
    //         type="password"
    //         name="password"
    //         value={formData.password}
    //         onChange={handleChange}
    //         className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label className="block text-sm font-medium mb-2">Bottle Volumes</label>
    //       <div className="flex flex-wrap gap-4 mt-2">
    //         {volumeOptions.map(vol => (
    //           <label key={vol} className="inline-flex items-center gap-2">
    //             <input
    //               type="checkbox"
    //               name={vol}
    //               checked={formData.bottle_volumes.includes(vol)}
    //               onChange={handleChange}
    //               className="w-4 h-4"
    //             />
    //             {vol}
    //           </label>
    //         ))}
    //       </div>
    //     </div>
    //   </div>

    //   {/* MOQ + Buffer Days */}
    //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //     <div>
    //       <label className="block text-sm font-medium mb-2">Minimum Order Qty (MOQ)</label>
    //       <input
    //         type="number"
    //         name="moq"
    //         value={formData.moq}
    //         onChange={handleChange}
    //         className="w-full px-4 py-2 border rounded-md"
    //       />
    //     </div>

    //     <div>
    //       <label className="block text-sm font-medium mb-2">Buffer Days</label>
    //       <input
    //         type="number"
    //         name="buffer_days"
    //         value={formData.buffer_days}
    //         onChange={handleChange}
    //         className="w-full px-4 py-2 border rounded-md"
    //       />
    //     </div>
    //   </div>

    //   {/* Submit Button */}
    //   <div className="mt-6 flex justify-end">
    //     <button
    //       type="submit"
    //       className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-200"
    //     >
    //       Save User
    //     </button>
    //   </div>
    // </form>
    <form onSubmit={handleSubmit} className="space-y-6">
  {/* Customer Name */}
  <div className="floating-label">
    <input
      type="text"
      name="customer_name"
      id="customer_name"
      required
      className="input-futuristic"
      placeholder=" "
      value={formData.customer_name}
      onChange={handleChange}
    />
    <label htmlFor="customer_name">Customer Name</label>
  </div>

  {/* Phone */}
  <div className="floating-label">
    <input
      type="text"
      name="phone"
      id="phone"
      className="input-futuristic"
      placeholder=" "
      value={formData.phone}
      onChange={handleChange}
    />
    <label htmlFor="phone">Phone</label>
  </div>

  {/* Password */}
  <div className="floating-label">
    <input
      type="password"
      name="password"
      id="password"
      required
      className="input-futuristic"
      placeholder=" "
      value={formData.password}
      onChange={handleChange}
    />
    <label htmlFor="password">Password</label>
  </div>

  {/* Bottle Volumes */}
  <div className="mt-2">
    <label className="block text-sm font-medium mb-2">Bottle Volumes</label>
    <div className="flex flex-wrap gap-3">
      {volumeOptions.map(vol => (
        <div key={vol} className="volume-badge">
          <input
            type="checkbox"
            name={vol}
            checked={formData.bottle_volumes.includes(vol)}
            onChange={handleChange}
            className="hidden peer"
          />
          <label htmlFor={vol} className="peer-checked:volume-badge--active">
            {vol}
          </label>
        </div>
      ))}
    </div>
  </div>

  {/* MOQ & Buffer Days */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="floating-label">
      <input
        type="number"
        name="moq"
        id="moq"
        className="input-futuristic"
        placeholder=" "
        value={formData.moq}
        onChange={handleChange}
      />
      <label htmlFor="moq">Minimum Order Qty (MOQ)</label>
    </div>

    <div className="floating-label">
      <input
        type="number"
        name="buffer_days"
        id="buffer_days"
        className="input-futuristic"
        placeholder=" "
        value={formData.buffer_days}
        onChange={handleChange}
      />
      <label htmlFor="buffer_days">Buffer Days</label>
    </div>
  </div>

  {/* Submit Button */}
  <div className="mt-6 flex justify-end">
    <button type="submit" className="btn-futuristic">
      Save User
    </button>
  </div>
</form>
  );
}