import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCardById } from '../services/cardService';
import PreviewCardOne from '../components/PreviewCardOne';
import PreviewCardTwo from '../components/PreviewCardTwo';

const CardViewer = () => {
    const { cardId } = useParams();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await getCardById(cardId);
                setCard(response.data);
                console.log('Fetched card data:', response.data); // Debug log
            } catch (err) {
                setError(err.response?.data?.message || 'Card not found');
            } finally {
                setLoading(false);
            }
        };

        if (cardId) {
            fetchCard();
        }
    }, [cardId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-sm sm:text-base">Loading card...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="text-center">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Card Not Found</h1>
                    <p className="text-gray-600 text-sm sm:text-base">{error}</p>
                </div>
            </div>
        );
    }

    if (!card) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="text-center">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Invalid Card</h1>
                    <p className="text-gray-600 text-sm sm:text-base">This card does not exist or is not public.</p>
                </div>
            </div>
        );
    }

    // Use template from saved card data - check if templateId was saved during card creation
    const getTemplateComponent = () => {
        console.log('Card templateId:', card.templateId); // Debug log
        console.log('Card selectedProfileCardStyle:', card.selectedProfileCardStyle); // Debug log
        console.log('Card selectedColor:', card.selectedColor); // Debug log
        console.log('Card full data:', card); // Debug log

        // If card was created from dashboard/1, use PreviewCardOne
        // If card was created from dashboard/2 or no specific template, use PreviewCardTwo
        // templateId should be saved as the dashboard route when card is created
        const usePreviewCardOne = card.templateId === "1" || card.templateId === 1;

        // Get template-based default colors
        const getTemplateDefaultColors = (templateId) => {
            if (templateId === "1" || templateId === 1) {
                return {
                    cardBg: "#d9f1fe",
                    buttonColor: "#058ef1",
                    cardText: "#000000",
                    buttonText: "#ffffff",
                };
            } else {
                return {
                    cardBg: "#efcdcc",
                    buttonColor: "#d97d7d",
                    cardText: "#ffffff",
                    buttonText: "#000000",
                };
            }
        };

        const cardProps = {
            profileImage: card.profileImage,
            coverImage: card.coverImage,
            name: card.name,
            jobRole: card.jobTitle,
            company: card.company,
            industry: card.industry,
            bio: card.bio || (card.jobTitle && card.company ? `${card.jobTitle} at ${card.company}` : ""),
            phone: card.phone,
            email: card.email,
            address: card.address,
            website: card.website,
            selectedFont: card.selectedFont || "Inter",
            alignment: card.alignment || "center",
            fullScreen: card.fullScreen || false,
            autoDownload: card.autoDownload || false,
            enabled: card.enabled || false,
            floatingSave: card.floatingSave !== false,
            selected: card.selected || "gradient",
            selectedColor: card.selectedColor || getTemplateDefaultColors(card.templateId),
            selectedProfileCardStyle: card.selectedProfileCardStyle || 1
        };

        return usePreviewCardOne ? <PreviewCardOne {...cardProps} /> : <PreviewCardTwo {...cardProps} />;
    };

    return (
        <div className="min-h-screen bg-gray-100 py-4 sm:py-8 px-4">
            <div className="max-w-sm sm:max-w-md mx-auto">
                {getTemplateComponent()}
            </div>
        </div>
    );
};

export default CardViewer;