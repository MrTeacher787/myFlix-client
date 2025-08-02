import React, { useState, useEffect } from 'react';
import { User, Edit2, Save, X, AlertTriangle, Loader2 } from 'lucide-react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthday: '',
    bio: ''
  });

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Replace with your actual API endpoint
      const response = await fetch('/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust auth method as needed
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const userData = await response.json();
      setUser(userData);
      
      // Initialize edit form with current user data
      setEditForm({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        birthday: userData.birthday || '',
        bio: userData.bio || ''
      });
    } catch (err) {
      setError('Failed to load user data. Please try again.');
      console.error('Error fetching user data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form to current user data if canceling
      setEditForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        birthday: user.birthday || '',
        bio: user.bio || ''
      });
    }
    setIsEditing(!isEditing);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      setError(null);

      const response = await fetch('/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to save changes. Please try again.');
      console.error('Error saving profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('/users/profile', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      // Handle successful account deletion (redirect, clear auth, etc.)
      localStorage.removeItem('token');
      window.location.href = '/'; // Adjust redirect as needed
    } catch (err) {
      setError('Failed to delete account. Please try again.');
      console.error('Error deleting account:', err);
    }
    setShowDeleteConfirm(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
          <div className="flex items-center space-x-2 text-red-600 mb-4">
            <AlertTriangle className="w-6 h-6" />
            <span className="font-semibold">Error</span>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchUserData}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-gray-600" />
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-bold">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-blue-100">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex items-center space-x-2 text-red-800">
                  <AlertTriangle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
              <button
                onClick={handleEditToggle}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={isSaving}
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editForm.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{user?.firstName || 'Not provided'}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editForm.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{user?.lastName || 'Not provided'}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{user?.email || 'Not provided'}</p>
                )}
              </div>

              {/* Birthday */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birthday
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    name="birthday"
                    value={editForm.birthday}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{user?.birthday || 'Not provided'}</p>
                )}
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={editForm.bio}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-900 py-2">{user?.bio || 'No bio provided'}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            )}

            {/* Danger Zone */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
              <p className="text-gray-600 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex items-center space-x-2 text-red-600 mb-4">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Confirm Account Deletion</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;