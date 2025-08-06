import React, { useState, useEffect } from 'react';

export const ProfileView = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthday: ''
  });
  const [loading, setLoading] = useState(true);

  // Fetch user data on mount
  useEffect(() => {
    fetch('/users')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setFormData({
          name: data.name,
          email: data.email,
          birthday: data.birthday
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch user:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    fetch('/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(updatedUser => {
        setUser(updatedUser);
        setEditing(false);
      })
      .catch(err => console.error('Failed to update user:', err));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      fetch('/users', {
        method: 'DELETE'
      })
        .then(res => {
          if (res.ok) {
            // Optional: Redirect to logout or home page
            window.location.href = '/';
          } else {
            throw new Error('Account deletion failed');
          }
        })
        .catch(err => console.error(err));
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>No user found.</p>;

  return (
    <div className="profile-view">
      <h2>My Profile</h2>

      {editing ? (
        <div>
          <label>
            Name:
            <input name="name" value={formData.name} onChange={handleChange} />
          </label><br />
          <label>
            Email:
            <input name="email" value={formData.email} onChange={handleChange} />
          </label><br />
          <label>
            Birthday:
            <input name="birthday" value={formData.birthday} onChange={handleChange} />
          </label><br />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Birthday:</strong> {user.birthday}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}

      <hr />

      <button onClick={handleDelete} style={{ color: 'red' }}>
        Delete Account
      </button>
    </div>
  );
};
