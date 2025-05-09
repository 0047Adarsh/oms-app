'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import DataTable from '@/components/DataTable';
import SearchIcon from '@mui/icons-material/Search';
import '@/styles/userTable.css';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('http://localhost:4000/api/users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Failed to load users:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleSave = async () => {
    try {
      const method = editingId === 'new' ? 'POST' : 'PATCH';
      const url = editingId === 'new'
        ? `http://localhost:4000/api/users`
        : `http://localhost:4000/api/users/${editingId}`;
  
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: editedUser.customer_name,
          phone: editedUser.phone,
          moq: editedUser.moq,
          buffer_days: editedUser.buffer_days,
          bottle_volumes: editedUser.bottle_volumes
        })
      });
  
      if (!res.ok) throw new Error(`${method} failed`);
  
      const updatedUser = await res.json();
  
      if (method === 'POST') {
        setUsers(prev => [...prev, updatedUser]);
      } else {
        setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
      }
  
      setEditingId(null);
    } catch (err) {
      alert('Failed to save changes. Check console.');
      console.error(err);
    }
  };
  

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setEditedUser({ ...user });
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleVolumeToggle = (vol) => {
    setEditedUser(prev => {
      const volumes = editedUser.bottle_volumes.includes(vol)
        ? prev.bottle_volumes.filter(v => v !== vol)
        : [...prev.bottle_volumes, vol];

      return { ...prev, bottle_volumes: volumes };
    });
  }

  // const handleSave = async () => {
  //   try {
  //     const res = await fetch(`http://localhost:4000/api/users/${editingId}`, {
  //       method: 'PATCH',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         customer_name: editedUser.customer_name,
  //         phone: editedUser.phone,
  //         moq: editedUser.moq,
  //         buffer_days: editedUser.buffer_days,
  //         bottle_volumes: editedUser.bottle_volumes
  //       })
  //     });

  //     if (!res.ok) throw new Error('Update failed');

  //     const updatedUser = await res.json();
  //     setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
  //     setEditingId(null);
  //   } catch (err) {
  //     alert('Failed to save changes. Check console.');
  //     console.error(err);
  //   }
  // };


  const filteredUsers = users.filter(u =>
    u.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };


  const columns = [
    {
      header: 'Customer Name',
      accessor: 'customer_name',
      render: (row) => {
        const isEditing = editingId === row.id;

        if (isEditing) {
          return (
            <input
              type="text"
              name="customer_name"
              defaultValue={row.customer_name}
              onChange={handleFieldChange}
              className="table-input"
            />
          );
        }

        return row.customer_name;
      }
    },
    {
      header: 'Phone',
      accessor: 'phone',
      render: (row) => {
        const isEditing = editingId === row.id;

        if (isEditing) {
          return (
            <input
              type="text"
              name="phone"
              defaultValue={row.phone}
              onChange={handleFieldChange}
              className="table-input"
            />
          );
        }

        return row.phone;
      }
    },
    {
      header: 'MOQ',
      accessor: 'moq',
      render: (row) => {
        const isEditing = editingId === row.id;

        if (isEditing) {
          return (
            <input
              type="number"
              name="moq"
              defaultValue={row.moq}
              onChange={handleFieldChange}
              className="table-input w-20"
            />
          );
        }

        return row.moq;
      }
    },
    {
      header: 'Buffer Days',
      accessor: 'buffer_days',
      render: (row) => {
        const isEditing = editingId === row.id;

        if (isEditing) {
          return (
            <input
              type="number"
              name="buffer_days"
              defaultValue={row.buffer_days}
              onChange={handleFieldChange}
              className="table-input w-20"
            />
          );
        }

        return row.buffer_days;
      }
    },
    {
      header: 'Bottle Volumes',
      accessor: 'bottle_volumes',
      render: (row) => {
        const isEditing = editingId === row.id;
        const volumeOptions = ['250ml', '500ml', '750ml'];

        if (isEditing) {
          return (
            <div className="volume-badges flex flex-wrap gap-2 mt-1">
              {volumeOptions.map(vol => (
                <label key={vol} className={`volume-badge ${editedUser.bottle_volumes.includes(vol) ? 'active' : ''}`}>
                  <input
                    type="checkbox"
                    name={vol}
                    checked={editedUser.bottle_volumes.includes(vol)}
                    onChange={() => handleVolumeToggle(vol)}
                    className="hidden peer"
                  />
                  <span className="peer-checked:text-white"> {vol}</span>
                </label>
              ))}
            </div>
          );
        }

        return (
          <div className="flex flex-wrap gap-2">
            {row.bottle_volumes.map(vol => (
              <span key={vol} className="volume-badge">{vol}</span>
            ))}
          </div>
        );
      }
    },
    {
      header: 'Actions',
      render: (row) => {
        const isEditing = editingId === row.id;

        if (!isEditing) {
          return (
            <button
              onClick={() => handleEditClick(row)}
              className="btn-sm btn-outline"
            >
              ✏️ Edit
            </button>
          );
        }

        return (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
            >
              ✔️ Save
            </button>

            <button
              onClick={() => setEditingId(null)}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md"
            >
              ❌ Cancel
            </button>
          </div>
        );
      }
    }
  ];

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="admin-users-page p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">User Management</h2>

      
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative search-container">
          <input
            type="text"
            placeholder="Search by name or phone"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon"><SearchIcon/></span>
        </div>

        <button
          onClick={() => {
            setEditingId('new');
            setEditedUser({
              customer_name: '',
              phone: '',
              moq: '',
              buffer_days: '',
              bottle_volumes: []
            });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md add-user-btn"
        >
          <PersonAddIcon/> Add User
        </button>

      </div>

      

      {/* Users Table */}
      <Card title="All Users" className="overflow-hidden">
        <DataTable columns={columns} data={filteredUsers} />
      </Card>
    </div>
  );
}