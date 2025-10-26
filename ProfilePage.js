import React, { useState, useEffect } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { getUrl } from 'aws-amplify/storage';
import { FaUserCircle } from 'react-icons/fa';

import { getUserProfile } from '../graphql/queries';
import { productsByOwner } from '../graphql/queries';
import './ProfilePage.css';

const client = generateClient();

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [userProducts, setUserProducts] = useState([]);
    const [profilePictureUrl, setProfilePictureUrl] = useState(null);
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
                const userProfile = profileData.data.getUserProfile;
                if (userProfile) {
                    setProfile(userProfile);
                    if (userProfile.profilePictureKey) {
                        const urlResult = await getUrl({ key: 
userProfile.profilePictureKey });
                        setProfilePictureUrl(urlResult.url);
                    }
                }

                const userProductsData = await client.graphql({
                    query: productsByOwner,
                    variables: { ownerId: cognitoUser.userId }
                });
                
setUserProducts(userProductsData.data.productsByOwner.items);

            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <div className="profile-page">
            <header className="profile-header">
                <div className="profile-avatar-container">
                    {profilePictureUrl ? (
                        <img src={profilePictureUrl} alt="Profile" 
className="profile-avatar-img" />
                    ) : (
                        <FaUserCircle className="profile-avatar-icon" 
/>
                    )}
                </div>
                <div className="profile-header-right">
                    <h2 className="profile-username">{user ? 
user.username : '...'}</h2>
                    <div className="profile-actions">
                        <button className="profile-btn" onClick={() => 
navigate('/profile/edit')}>Edit Profile</button>
                        <button className="profile-btn">Share 
Profile</button>
                    </div>
                </div>
            </header>

            <section className="profile-info">
                <p className="profile-fullname">{profile ? 
profile.fullName : 'Your Name'}</p>
                <p className="profile-bio">{profile ? profile.bio : 
'Your bio goes here.'}</p>
                <a href={profile ? profile.links : '#'} 
className="profile-link" target="_blank" rel="noopener noreferrer">
                    {profile ? profile.links : 'your.link.com'}
                </a>
            </section>
            
            <section className="profile-stats">
                <div className="stat-item">
                    <span 
className="stat-number">{userProducts.length}</span>
                    <span className="stat-label">Posts</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">125</span>
                    <span className="stat-label">Followers</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">150</span>
                    <span className="stat-label">Following</span>
                </div>
            </section>

            <main className="profile-content">
                <div className="posts-grid">
                    {userProducts.map(product => (
                        <div key={product.id} className="grid-item">
                            <img 
src={`https://your-s3-bucket-url/${product.imageKey}`} 
alt={product.name} />
                        </div>
                    ))}
                </div>
            </main>

            <button onClick={handleSignOut} 
className="sign-out-btn">Sign Out</button>
        </div>
    );
};

export default ProfilePage;
