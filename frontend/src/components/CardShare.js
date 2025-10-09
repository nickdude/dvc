import React, { useState } from 'react';
import { Share, Copy, Mail, MessageCircle, Send } from 'lucide-react';

const CardShare = ({ cardData, isOpen, onClose }) => {
    const [copied, setCopied] = useState(false);

    const cardURL = `${window.location.origin}/card/${cardData.id || 'preview'}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(cardURL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const shareVia = (platform) => {
        const shareText = `Check out my digital business card: ${cardData.name || 'Digital Card'}`;

        switch (platform) {
            case 'email':
                window.open(`mailto:?subject=My Digital Business Card&body=${shareText}%0A%0A${cardURL}`);
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(shareText + '\n\n' + cardURL)}`);
                break;
            case 'telegram':
                window.open(`https://t.me/share/url?url=${encodeURIComponent(cardURL)}&text=${encodeURIComponent(shareText)}`);
                break;
            case 'sms':
                window.open(`sms:?body=${encodeURIComponent(shareText + '\n\n' + cardURL)}`);
                break;
            default:
                break;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Share size={20} />
                        Share Your Card
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Copy Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card URL
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={cardURL}
                                readOnly
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
                            />
                            <button
                                onClick={copyToClipboard}
                                className={`px-3 py-2 rounded-md flex items-center gap-1 ${copied
                                        ? 'bg-green-500 text-white'
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                            >
                                <Copy size={16} />
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>

                    {/* Share Options */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Share via
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => shareVia('email')}
                                className="flex items-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                <Mail size={18} />
                                Email
                            </button>
                            <button
                                onClick={() => shareVia('whatsapp')}
                                className="flex items-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                <MessageCircle size={18} />
                                WhatsApp
                            </button>
                            <button
                                onClick={() => shareVia('telegram')}
                                className="flex items-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                <Send size={18} />
                                Telegram
                            </button>
                            <button
                                onClick={() => shareVia('sms')}
                                className="flex items-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                <MessageCircle size={18} />
                                SMS
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardShare;