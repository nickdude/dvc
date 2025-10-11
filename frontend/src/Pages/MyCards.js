import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyCards, deleteCard } from '../services/cardService';
import { Edit, Trash2, Share, QrCode, Eye } from 'lucide-react';
import QRCodeGenerator from '../components/QRCodeGenerator';
import CardShare from '../components/CardShare';

const MyCards = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [showQRCode, setShowQRCode] = useState(false);
    const [showShare, setShowShare] = useState(false);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            const response = await getMyCards();
            setCards(response.data || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load cards');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCard = async (cardId) => {
        if (window.confirm('Are you sure you want to delete this card?')) {
            try {
                await deleteCard(cardId);
                setCards(cards.filter(card => card._id !== cardId));
            } catch (err) {
                alert('Failed to delete card');
            }
        }
    };

    const handleShareCard = (card) => {
        setSelectedCard(card);
        setShowShare(true);
    };

    const handleShowQRCode = (card) => {
        setSelectedCard(card);
        setShowQRCode(true);
    };

    const handleEditCard = (cardId) => {
        navigate(`/dashboard/1?cardId=${cardId}`);
    };

    const handleViewCard = (cardId) => {
        window.open(`/card/${cardId}`, '_blank');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p>Loading your cards...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Digital Cards</h1>
                        <p className="text-gray-600 mt-2 text-sm sm:text-base">Manage and share your digital business cards</p>
                    </div>
                    <button
                        onClick={() => navigate('/template')}
                        className="bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base w-full sm:w-auto"
                    >
                        Create New Card
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm sm:text-base">
                        {error}
                    </div>
                )}

                {cards.length === 0 ? (
                    <div className="text-center py-12 sm:py-16 px-4">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <QrCode size={32} className="text-gray-400 sm:w-10 sm:h-10" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No cards yet</h3>
                        <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-md mx-auto">Create your first digital business card to get started</p>
                        <button
                            onClick={() => navigate('/template')}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
                        >
                            Create Your First Card
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">{cards.map((card, index) => (
                        <div
                            key={card._id}
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Enhanced Card Header */}
                            <div className="relative h-32 sm:h-36 overflow-hidden">
                                {card.coverImage ? (
                                    <img
                                        src={card.coverImage}
                                        alt="Cover"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                                        style={{
                                            background: card.selectedColor?.cardBg ?
                                                `linear-gradient(135deg, ${card.selectedColor.cardBg}, ${card.selectedColor.buttonColor || '#3b82f6'})` :
                                                'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                                        }}
                                    ></div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                                {/* Status Badge */}
                                <div className="absolute top-3 right-3">
                                    <div className="bg-green-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                        <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                                        Active
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Card Content */}
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    {card.profileImage ? (
                                        <img
                                            src={card.profileImage}
                                            alt="Profile"
                                            className="w-14 h-14 rounded-xl object-cover mr-3 border-3 border-white shadow-md -mt-10 relative z-10"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border-3 border-white shadow-md -mt-10 relative z-10 flex items-center justify-center">
                                            <span className="text-gray-600 font-bold text-lg">
                                                {card.name?.charAt(0)?.toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                    )}
                                    <div className={card.profileImage ? '' : '-mt-8'}>
                                        <h3 className="font-bold text-lg text-gray-900">{card.name}</h3>
                                        <p className="text-gray-600 text-sm font-medium">{card.jobTitle}</p>
                                    </div>
                                </div>

                                {/* Enhanced Info Display */}
                                <div className="space-y-2 mb-5">
                                    {card.company && (
                                        <p className="text-gray-700 text-sm font-medium flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                            {card.company}
                                        </p>
                                    )}
                                    {card.email && (
                                        <p className="text-gray-600 text-sm flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                            {card.email}
                                        </p>
                                    )}
                                    {card.phone && (
                                        <p className="text-gray-600 text-sm flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                            {card.phone}
                                        </p>
                                    )}
                                </div>

                                {/* Enhanced Action Buttons */}
                                <div className="flex gap-2 mb-3">
                                    <button
                                        onClick={() => handleEditCard(card._id)}
                                        className="flex-1 bg-blue-50 text-blue-600 py-2.5 px-3 rounded-xl text-sm font-semibold hover:bg-blue-100 transition-all duration-200 flex items-center justify-center gap-1.5"
                                    >
                                        <Edit size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleViewCard(card._id)}
                                        className="flex-1 bg-green-50 text-green-600 py-2.5 px-3 rounded-xl text-sm font-semibold hover:bg-green-100 transition-all duration-200 flex items-center justify-center gap-1.5"
                                    >
                                        <Eye size={16} />
                                        View
                                    </button>
                                </div>

                                {/* Secondary Actions */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleShowQRCode(card)}
                                        className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-1"
                                    >
                                        <QrCode size={14} />
                                        QR
                                    </button>
                                    <button
                                        onClick={() => handleShareCard(card)}
                                        className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-1"
                                    >
                                        <Share size={14} />
                                        Share
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCard(card._id)}
                                        className="bg-red-50 text-red-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-100 transition-all duration-200 flex items-center justify-center"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Subtle Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/0 to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
                        </div>
                    ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            {selectedCard && (
                <>
                    <QRCodeGenerator
                        cardData={{
                            id: selectedCard._id,
                            name: selectedCard.name,
                            ...selectedCard
                        }}
                        isOpen={showQRCode}
                        onClose={() => {
                            setShowQRCode(false);
                            setSelectedCard(null);
                        }}
                    />
                    <CardShare
                        cardData={{
                            id: selectedCard._id,
                            name: selectedCard.name,
                            ...selectedCard
                        }}
                        isOpen={showShare}
                        onClose={() => {
                            setShowShare(false);
                            setSelectedCard(null);
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default MyCards;