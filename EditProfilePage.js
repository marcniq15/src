import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';
import { uploadData, getUrl } from 'aws-amplify/storage';
import { generateClient } from 'aws-amplify/api';

import { getUserProfile } from '../graphql/queries';
import { createUserProfile, updateUserProfile } from 
'../graphql/mutations';

import { FaUserCircle } from 'react-icons/fa';

const client = generateClient();

const EditProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    class: '',
    bio: '',
    links: '',
  });
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = 
useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cognitoUser = await getCurrentUser();
        setUser(cognitoUser);

        const profileData = await client.graphql({
          query: getUserProfile,
          variables: { id: cognitoUser.userId }
        });
        
        const existingProfile = profileData.data.getUserProfile;
        if (existingProfile) {
          setProfile(existingProfile);
          setFormData({
            fullName: existingProfile.fullName || '',
            class: existingProfile.class || '',
            bio: existingProfile.bio || '',
            links: existingProfile.links || '',
          });
          if (existingProfile.profilePictureKey) {
            const urlResult = await getUrl({ key: 
existingProfile.profilePictureKey });
            setProfilePicturePreview(urlResult.url);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setIsLoading(false);
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePictureFile(file);
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    let pictureKey = profile ? profile.profilePictureKey : null;

    if (profilePictureFile) {
      try {
        const result = await uploadData({
          key: `${user.userId}-profile-picture`,
          data: profilePictureFile,
        }).result;
        pictureKey = result.key;
      } catch (error) {
        console.log('Error uploading file: ', error);
        setIsLoading(false);
        return;
      }
    }

    const profileInput = {
      id: user.userId,
      username: user.username,
      fullName: formData.fullName,
      class: formData.class,
      bio: formData.bio,
      links: formData.links,
      profilePictureKey: pictureKey,
    };

    try {
      if (profile) {
        await client.graphql({
          query: updateUserProfile,
          variables: { input: profileInput }
        });
      } else {
        await client.graphql({
          query: createUserProfile,
          variables: { input: profileInput }
        });
      }
      alert('Profile saved successfully!');
      navigate('/profile');
    } catch (error) {
      console.error("Error saving profile:", error);
      alert('Error saving profile. Please check the console.');
      setIsLoading(false);
    }
  };

  if (isLoading && !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-profile-page">
      <h1 className="edit-profile-title">Edit Profile</h1>

      <form onSubmit={handleSave} className="edit-profile-form">
        <div className="profile-picture-section">
          {profilePicturePreview ? (
            <img src={profilePicturePreview} alt="Profile" 
className="profile-picture-preview" />
          ) : (
            <FaUserCircle className="profile-picture-placeholder" />
          )}
          <label htmlFor="file-upload" className="custom-file-upload">
            Change Photo
          </label>
          <input id="file-upload" type="file" accept="image/*" 
onChange={handleFileChange} />
        </div>

        <label>Matrix ID</label>
        <input type="text" value={user ? user.username : ''} disabled 
/>

        <label>Full Name</label>
        <input type="text" name="fullName" value={formData.fullName} 
onChange={handleInputChange} />

        <label>Class</label>
        <input type="text" name="class" value={formData.class} 
onChange={handleInputChange} />
        
        <label>Bio</label>
        <textarea name="bio" value={formData.bio} 
onChange={handleInputChange} rows="4"></textarea>

        <label>Links</label>
        <textarea name="links" placeholder="e.g., portfolio.com, 
linkedin.com/in/..." value={formData.links} 
onChange={handleInputChange} rows="3"></textarea>
        
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => 
navigate('/profile')}>Cancel</button>
          <button type="submit" className="save-btn" 
disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
