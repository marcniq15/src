import React from 'react';

// --- Reusable SettingsItem Component ---
// This component renders a single row in our settings list.
const SettingsItem = ({ icon, title, subtitle, isLogout = false }) => {
    // We conditionally add the 'logout' class for special styling
    const itemClasses = `settings-item ${isLogout ? 'logout' : ''}`;

    return (
        <div className={itemClasses}>
            <span className="settings-item-icon">{icon}</span>
            <div className="settings-item-content">
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>
            <span className="settings-item-action">›</span>
        </div>
    );
};


// --- The Main SettingsPage Component ---
function SettingsPage() {
    return (
        <div className="settings-page">
            <h1 className="page-header" style={{ padding: '24px 16px 0 16px' }}>Settings</h1>

            {/* --- Account Section --- */}
            <div className="settings-group">
                <div className="settings-group-title">Account</div>
                <SettingsItem
                    icon="👤"
                    title="Edit Profile"
                    subtitle="Update your name and profile picture"
                />
                <SettingsItem
                    icon="🔒"
                    title="Change Password"
                    subtitle="Update your account security"
                />
            </div>

            {/* --- App Settings Section --- */}
            <div className="settings-group">
                <div className="settings-group-title">App Settings</div>
                <SettingsItem
                    icon="🔔"
                    title="Notifications"
                    subtitle="Manage push notifications"
                />
                <SettingsItem
                    icon="🎨"
                    title="Appearance"
                    subtitle="Switch between light and dark mode"
                />
            </div>

            {/* --- Actions Section --- */}
            <div className="settings-group">
                <div className="settings-group-title">Actions</div>
                <SettingsItem
                    icon="➡️"
                    title="Logout"
                    subtitle="Sign out of your account"
                    isLogout={true} // This prop triggers the special red styling
                />
            </div>
        </div>
    );
}

export default SettingsPage;