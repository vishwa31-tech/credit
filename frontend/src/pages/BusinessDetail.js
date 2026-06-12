import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { businessService } from '../services/api';

export default function BusinessDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  React.useEffect(() => {
    businessService.getById(id)
      .then(res => {
        setBusiness(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load business');
        setLoading(false);
      });
  }, [id]);

  const handleAddReview = () => {
    if (!reviewComment.trim()) {
      alert('Please enter a comment');
      return;
    }

    businessService.addReview(id, {
      comment: reviewComment,
      rating: reviewRating,
    })
      .then(res => {
        setBusiness(res.data);
        setReviewComment('');
        setReviewRating(5);
        alert('Review added successfully!');
      })
      .catch(err => alert('Failed to add review'));
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-12">{error}</div>;
  if (!business) return <div className="text-center py-12">Business not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <button onClick={() => navigate('/businesses')} className="text-blue-600 hover:text-blue-800 mb-6 font-semibold">
          ← Back to Services
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 h-80 flex items-center justify-center">
            <span className="text-white text-8xl">🏢</span>
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{business.name}</h1>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-yellow-500 text-2xl">{'⭐'.repeat(Math.round(business.rating))}</span>
              <span className="text-gray-600">({business.rating.toFixed(1)}) {business.reviews.length} reviews</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-700 mb-4">Business Information</h2>
                <div className="space-y-3">
                  <p><strong>Category:</strong> <span className="capitalize text-blue-600">{business.category}</span></p>
                  <p><strong>Email:</strong> {business.email}</p>
                  <p><strong>Phone:</strong> {business.phone}</p>
                  <p><strong>Address:</strong> {business.address}, {business.city}</p>
                  {business.website && <p><strong>Website:</strong> <a href={business.website} className="text-blue-600 hover:underline">{business.website}</a></p>}
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Pricing</h2>
                <div className="space-y-3">
                  <p><strong>Minimum Budget:</strong> <span className="text-2xl font-bold text-blue-600">${business.pricing?.minBudget || 'N/A'}</span></p>
                  <p><strong>Maximum Budget:</strong> <span className="text-2xl font-bold text-blue-600">${business.pricing?.maxBudget || 'N/A'}</span></p>
                </div>
              </div>
            </div>

            {business.description && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">{business.description}</p>
              </div>
            )}

            {business.services && business.services.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Services Offered</h2>
                <div className="flex flex-wrap gap-2">
                  {business.services.map(service => (
                    <span key={service} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>

              {business.reviews && business.reviews.length > 0 ? (
                <div className="space-y-6 mb-8">
                  {business.reviews.map((review, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-gray-800">{review.user?.name || 'Anonymous'}</span>
                        <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                      <p className="text-sm text-gray-500 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mb-8">No reviews yet. Be the first to review!</p>
              )}

              {/* Add Review Form */}
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Leave a Review</h3>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Rating:</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                    <option value={4}>⭐⭐⭐⭐ Good</option>
                    <option value={3}>⭐⭐⭐ Average</option>
                    <option value={2}>⭐⭐ Poor</option>
                    <option value={1}>⭐ Very Poor</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Comment:</label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share your experience..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows="4"
                  />
                </div>
                <button
                  onClick={handleAddReview}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700 transition"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
