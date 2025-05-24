  // 'use client';

  // import { useEffect, useState } from 'react';
  // import Card from '@/components/Card';
  // import DataTable from '@/components/DataTable';
  // import SearchIcon from '@mui/icons-material/Search';
  // import '@/styles/userTable.css';
  // import PersonAddIcon from '@mui/icons-material/PersonAdd';

  // export default function AdminCustomersPage() {
  //   const [customers, setCustomers] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [editingId, setEditingId] = useState(null);
  //   const [editedUser, setEditedUser] = useState(null);
  //   const [searchQuery, setSearchQuery] = useState('');


  //   useEffect(() => {
  //     async function fetchCustomers() {
  //       try {
  //         const res = await fetch('http://localhost:4000/api/customers');
  //         const data = await res.json();
  //         setCustomers(data);
  //       } catch (err) {
  //         console.error('Failed to load users:', err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }

  //     fetchCustomers();
  //   }, []);

  //   const handleSave = async () => {
  //     try {
  //       const method = editingId === 'new' ? 'POST' : 'PATCH';
  //       const url = editingId === 'new'
  //         ? `http://localhost:4000/api/customers`
  //         : `http://localhost:4000/api/customers/${editingId}`;
    
  //       const res = await fetch(url, {
  //         method,
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           customer_name: editedUser.customer_name,
  //           phone: editedUser.phone,
  //           moq: editedUser.moq,
  //           buffer_days: editedUser.buffer_days,
  //           bottle_volumes: editedUser.bottle_volumes
  //         })
  //       });
    
  //       if (!res.ok) throw new Error(`${method} failed`);
    
  //       const updatedUser = await res.json();
    
  //       if (method === 'POST') {
  //         setCustomers(prev => [...prev, updatedUser]);
  //       } else {
  //         setCustomers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  //       }
    
  //       setEditingId(null);
  //     } catch (err) {
  //       alert('Failed to save changes. Check console.');
  //       console.error(err);
  //     }
  //   };
    

  //   const handleEditClick = (user) => {
  //     setEditingId(user.id);
  //     setEditedUser({ ...user });
  //   };

  //   const handleFieldChange = (e) => {
  //     const { name, value } = e.target;
  //     setEditedUser(prev => ({ ...prev, [name]: value }));
  //   };

  //   const handleVolumeToggle = (vol) => {
  //     setEditedUser(prev => {
  //       const volumes = editedUser.bottle_volumes.includes(vol)
  //         ? prev.bottle_volumes.filter(v => v !== vol)
  //         : [...prev.bottle_volumes, vol];

  //       return { ...prev, bottle_volumes: volumes };
  //     });
  //   }

  //   // const handleSave = async () => {
  //   //   try {
  //   //     const res = await fetch(`http://localhost:4000/api/users/${editingId}`, {
  //   //       method: 'PATCH',
  //   //       headers: { 'Content-Type': 'application/json' },
  //   //       body: JSON.stringify({
  //   //         customer_name: editedUser.customer_name,
  //   //         phone: editedUser.phone,
  //   //         moq: editedUser.moq,
  //   //         buffer_days: editedUser.buffer_days,
  //   //         bottle_volumes: editedUser.bottle_volumes
  //   //       })
  //   //     });

  //   //     if (!res.ok) throw new Error('Update failed');

  //   //     const updatedUser = await res.json();
  //   //     setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
  //   //     setEditingId(null);
  //   //   } catch (err) {
  //   //     alert('Failed to save changes. Check console.');
  //   //     console.error(err);
  //   //   }
  //   // };


  //   const filteredCustomers = customers.filter(u =>
  //     u.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     u.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  //   const formatDate = (dateString) => {
  //     const options = { year: 'numeric', month: 'short', day: 'numeric' };
  //     return new Date(dateString).toLocaleDateString('en-US', options);
  //   };


  //   const columns = [
  //     {
  //       header: 'Customer Name',
  //       accessor: 'customer_name',
  //       render: (row) => {
  //         const isEditing = editingId === row.id;

  //         if (isEditing) {
  //           return (
  //             <input
  //               type="text"
  //               name="customer_name"
  //               defaultValue={row.customer_name}
  //               onChange={handleFieldChange}
  //               className="table-input"
  //             />
  //           );
  //         }

  //         return row.customer_name;
  //       }
  //     },
  //     {
  //       header: 'Phone',
  //       accessor: 'phone',
  //       render: (row) => {
  //         const isEditing = editingId === row.id;

  //         if (isEditing) {
  //           return (
  //             <input
  //               type="text"
  //               name="phone"
  //               defaultValue={row.phone}
  //               onChange={handleFieldChange}
  //               className="table-input"
  //             />
  //           );
  //         }

  //         return row.phone;
  //       }
  //     },
  //     {
  //       header: 'MOQ',
  //       accessor: 'moq',
  //       render: (row) => {
  //         const isEditing = editingId === row.id;

  //         if (isEditing) {
  //           return (
  //             <input
  //               type="number"
  //               name="moq"
  //               defaultValue={row.moq}
  //               onChange={handleFieldChange}
  //               className="table-input w-20"
  //             />
  //           );
  //         }

  //         return row.moq;
  //       }
  //     },
  //     {
  //       header: 'Buffer Days',
  //       accessor: 'buffer_days',
  //       render: (row) => {
  //         const isEditing = editingId === row.id;

  //         if (isEditing) {
  //           return (
  //             <input
  //               type="number"
  //               name="buffer_days"
  //               defaultValue={row.buffer_days}
  //               onChange={handleFieldChange}
  //               className="table-input w-20"
  //             />
  //           );
  //         }

  //         return row.buffer_days;
  //       }
  //     },
  //     {
  //       header: 'Bottle Volumes',
  //       accessor: 'bottle_volumes',
  //       render: (row) => {
  //         const isEditing = editingId === row.id;
  //         const volumeOptions = ['250mL', '500mL', '750mL'];

  //         if (isEditing) {
  //           return (
  //             <div className="volume-badges flex flex-wrap gap-2 mt-1">
  //               {volumeOptions.map(vol => (
  //                 <label key={vol} className={`volume-badge ${editedUser.bottle_volumes.includes(vol) ? 'active' : ''}`}>
  //                   <input
  //                     type="checkbox"
  //                     name={vol}
  //                     checked={editedUser.bottle_volumes.includes(vol)}
  //                     onChange={() => handleVolumeToggle(vol)}
  //                     className="hidden peer"
  //                   />
  //                   <span className="peer-checked:text-white"> {vol}</span>
  //                 </label>
  //               ))}
  //             </div>
  //           );
  //         }

  //         return (
  //           <div className="flex flex-wrap gap-2">
  //             {row.bottle_volumes.map(vol => (
  //               <span key={vol} className="volume-badge">{vol}</span>
  //             ))}
  //           </div>
  //         );
  //       }
  //     },
  //     {
  //       header: 'Actions',
  //       render: (row) => {
  //         const isEditing = editingId === row.id;

  //         if (!isEditing) {
  //           return (
  //             <button
  //               onClick={() => handleEditClick(row)}
  //               className="btn-sm btn-outline"
  //             >
  //               ✏️ Edit
  //             </button>
  //           );
  //         }

  //         return (
  //           <div className="flex gap-2">
  //             <button
  //               onClick={handleSave}
  //               className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
  //             >
  //               ✔️ Save
  //             </button>

  //             <button
  //               onClick={() => setEditingId(null)}
  //               className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md"
  //             >
  //               ❌ Cancel
  //             </button>
  //           </div>
  //         );
  //       }
  //     }
  //   ];

  //   if (loading) return <p>Loading users...</p>;

  //   return (
  //     <div className="admin-users-page p-6 max-w-7xl mx-auto">
  //       <h2 className="text-3xl font-bold mb-6">User Management</h2>

        
  //       <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
  //         <div className="relative search-container">
  //           <input
  //             type="text"
  //             placeholder="Search by name or phone"
  //             value={searchQuery}
  //             onChange={(e) => setSearchQuery(e.target.value)}
  //             className="search-input"
  //           />
  //           <span className="search-icon"><SearchIcon/></span>
  //         </div>

  //         <button
  //           onClick={() => {
  //             setEditingId('new');
  //             setEditedUser({
  //               customer_name: '',
  //               phone: '',
  //               moq: '',
  //               buffer_days: '',
  //               bottle_volumes: [],
  //               password:''
  //             });
  //           }}
  //           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md add-user-btn"
  //         >
  //           <PersonAddIcon/> Add User
  //         </button>

  //       </div>

        

  //       {/* Users Table */}
  //       <Card title="All Users" className="overflow-hidden">
  //         <DataTable columns={columns} data={filteredCustomers} />
  //       </Card>
  //     </div>
  //   );
  // }

  'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import DataTable from '@/components/DataTable';
import SearchIcon from '@mui/icons-material/Search';
import '@/styles/userTable.css';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await fetch('http://localhost:4000/api/customers');
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        console.error('Failed to load users:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  const handleSave = async () => {
    if (!editedUser.customer_name || (editingId === 'new' && !editedUser.password)) {
      alert('Customer name and password are required');
      return;
    }

    try {
      const method = editingId === 'new' ? 'POST' : 'PATCH';
      const url = editingId === 'new'
        ? `http://localhost:4000/api/customers`
        : `http://localhost:4000/api/customers/${editingId}`;

      const body = {
        customer_name: editedUser.customer_name,
        phone: editedUser.phone,
        moq: editedUser.moq,
        buffer_days: editedUser.buffer_days,
        bottle_volumes: editedUser.bottle_volumes
      };

      

      if (method === 'POST') {
        body.password = editedUser.password;
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `${method} failed`);
      }

      const updatedUser = await res.json();

      if (method === 'POST') {
        setCustomers(prev => [...prev, updatedUser]);
      } else {
        setCustomers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
      }

      setEditingId(null);
    } catch (err) {
      alert(`Failed to save changes: ${err.message}`);
      console.error('Save error:', err);
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
  };

  const filteredCustomers = customers.filter(u =>
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
        const volumeOptions = ['250mL', '500mL', '750mL'];

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

  // --- MODAL FOR ADDING NEW USER ---
  const isAddingNewUser = editingId === 'new';

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
          <span className="search-icon"><SearchIcon /></span>
        </div>

        <button
          onClick={() => {
            setEditingId('new');
            setEditedUser({
              customer_name: '',
              phone: '',
              moq: '',
              buffer_days: '',
              bottle_volumes: [],
              password: ''
            });
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <PersonAddIcon /> Add User
        </button>
      </div>

      {/* USERS TABLE */}
      <Card title="All Users" className="overflow-hidden">
        <DataTable columns={columns} data={filteredCustomers} />
      </Card>

    
      {/* {isAddingNewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4">Add New Customer</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Customer Name</label>
                <input
                  type="text"
                  name="customer_name"
                  value={editedUser.customer_name}
                  onChange={handleFieldChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editedUser.phone}
                  onChange={handleFieldChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={editedUser.password}
                  onChange={handleFieldChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">MOQ (Minimum Order Quantity)</label>
                <input
                  type="number"
                  name="moq"
                  value={editedUser.moq}
                  onChange={handleFieldChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="e.g. 10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Buffer Days</label>
                <input
                  type="number"
                  name="buffer_days"
                  value={editedUser.buffer_days}
                  onChange={handleFieldChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="e.g. 3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bottle Volumes</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {['250mL', '500mL', '750mL'].map(vol => (
                    <label key={vol} className={`volume-badge ${editedUser.bottle_volumes.includes(vol) ? 'active' : ''}`}>
                      <input
                        type="checkbox"
                        name={vol}
                        checked={editedUser.bottle_volumes.includes(vol)}
                        onChange={() => handleVolumeToggle(vol)}
                        className="hidden peer"
                      />
                      <span className="peer-checked:text-white">{vol}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditingId(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save User
              </button>
            </div>
          </div>
        </div>
      )} */}

      {isAddingNewUser && (
  <div className="modal-overlay">
    <div className="modal-container">
      <h3 className="modal-header">Add New Customer</h3>

      <div className="space-y-4">
        <div className="form-group">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            name="customer_name"
            value={editedUser.customer_name}
            onChange={handleFieldChange}
            className="form-input"
            placeholder="Full name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            value={editedUser.phone}
            onChange={handleFieldChange}
            className="form-input"
            placeholder="Phone number"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={editedUser.password}
            onChange={handleFieldChange}
            className="form-input"
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <label className="form-label">MOQ (Minimum Order Quantity)</label>
          <input
            type="number"
            name="moq"
            value={editedUser.moq}
            onChange={handleFieldChange}
            className="form-input"
            placeholder="e.g. 10"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Buffer Days</label>
          <input
            type="number"
            name="buffer_days"
            value={editedUser.buffer_days}
            onChange={handleFieldChange}
            className="form-input"
            placeholder="e.g. 3"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Bottle Volumes</label>
          <div className="volume-badges">
            {['250mL', '500mL', '750mL'].map(vol => (
              <label key={vol} className={`volume-badge ${editedUser.bottle_volumes.includes(vol) ? 'active' : ''}`}>
                <input
                  type="checkbox"
                  name={vol}
                  checked={editedUser.bottle_volumes.includes(vol)}
                  onChange={() => handleVolumeToggle(vol)}
                  className="hidden peer"
                />
                <span>{vol}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="modal-actions">
        <button
          onClick={() => setEditingId(null)}
          className="modal-btn-cancel"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="modal-btn-save"
        >
          Save User
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}