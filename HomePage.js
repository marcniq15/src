import React from 'react';

// --- Reusable ItemCard Component ---
// We define this here for use in our HomePage.
// This component displays a single item for sale.
const ItemCard = ({ title, price, author }) => {
    return (
        <div className="item-card">
            <div className="item-card-image">
                <span>📷</span> {/* Placeholder for the image */}
                <div className="gradient-overlay"></div>
                <span className="favorite-icon">♡</span> {/* Placeholder for favorite icon */}
            </div>
            <div className="item-card-details">
                <h3>{title}</h3>
                <p className="author">Posted by {author}</p>
                <p className="price">{price}</p>
            </div>
        </div>
    );
};


// --- The Main HomePage Component ---
function HomePage() {
    // Placeholder data that will be used to render the components
    const announcement = {
        title: 'Important Announcement',
        content: 'This is a placeholder for an important announcement from a lecturer or warden.',
        author: 'Admin'
    };

    const featuredItems = [
        { id: 1, title: 'Featured Item 1', price: 'RM 110.00', author: 'Seller A' },
        { id: 2, title: 'Featured Item 2', price: 'RM 85.50', author: 'Seller B' },
        { id: 3, title: 'Featured Item 3', price: 'RM 499.00', author: 'Seller C' },
        { id: 4, title: 'Featured Item 4', price: 'RM 25.00', author: 'Seller D' },
    ];

    return (
        <div className="home-page">
            {/* 
              This is a placeholder for the custom gradient AppBar.
              In a real React app, you would create a <HomeAppBar /> component
              and place it in a shared layout file. For this single page,
              we will just use a simple header.
            */}
            <div className="section-header" style={{ marginTop: '20px' }}>
                Welcome Back, Username!
            </div>

            {/* --- Announcement Section --- */}
            <div className="announcement-card">
                <div className="announcement-header">
                    <span className="icon">📢</span>
                    <span>{announcement.title}</span>
                </div>
                <p className="announcement-content">{announcement.content}</p>
                <p className="announcement-author">Posted by {announcement.author}</p>
            </div>

            {/* --- Featured Items Section --- */}
            <h2 className="section-header">Featured Items</h2>
            <div className="featured-items-container">
                {/* 
                  We use the .map() method to loop over our placeholder data
                  and create an ItemCard for each one. This is the core of
                  how dynamic lists are built in React.
                */}
                {featuredItems.map(item => (
                    <ItemCard
                        key={item.id} // The 'key' is important for React's performance
                        title={item.title}
                        price={item.price}
                        author={item.author}
                    />
                ))}
            </div>
        </div>
    );
}

export default HomePage;