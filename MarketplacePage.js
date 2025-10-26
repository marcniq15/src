import React from 'react';

// --- Reusable ItemCard Component ---
// In a real project, this component would be in its own file
// in the 'components' folder and imported here. For now, we redefine it.
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


// --- The Main MarketplacePage Component ---
function MarketplacePage() {
    // A larger list of placeholder data for the marketplace
    const marketplaceItems = [
        { id: 1, title: 'Item Title 1', price: 'RM 25.00', author: 'Seller Name 1' },
        { id: 2, title: 'Product Name 2', price: 'RM 150.50', author: 'Seller Name 2' },
        { id: 3, title: 'Placeholder Item 3', price: 'RM 99.99', author: 'Seller Name 3' },
        { id: 4, title: 'Generic Item 4', price: 'RM 12.00', author: 'Seller Name 4' },
        { id: 5, title: 'Sample Product 5', price: 'RM 300.00', author: 'Seller Name 5' },
        { id: 6, title: 'Item Title 6', price: 'RM 75.00', author: 'Seller Name 6' },
        { id: 7, title: 'Product Name 7', price: 'RM 49.90', author: 'Seller Name 7' },
        { id: 8, title: 'Another Item 8', price: 'RM 180.00', author: 'Seller Name 8' },
    ];

    return (
        <div className="marketplace-page">
            <h1 className="page-header">Marketplace</h1>

            <div className="items-grid">
                {/* We map over the data to render a grid of items */}
                {marketplaceItems.map(item => (
                    <ItemCard
                        key={item.id}
                        title={item.title}
                        price={item.price}
                        author={item.author}
                    />
                ))}
            </div>
        </div>
    );
}

export default MarketplacePage;