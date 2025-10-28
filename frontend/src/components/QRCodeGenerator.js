import React, { useState, useRef } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = ({ cardData, isOpen, onClose }) => {
    const [qrCodeURL, setQrCodeURL] = useState('');
    const [loading, setLoading] = useState(false);
    const canvasRef = useRef(null);

    const generateQRCode = async () => {
        setLoading(true);
        try {
            // Create a shareable URL for the card
            const cardURL = `${window.location.origin}/#/card/${cardData.id || 'preview'}`;

            // Generate QR code
            const qrCodeDataURL = await QRCode.toDataURL(cardURL, {
                width: 256,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });

            setQrCodeURL(qrCodeDataURL);
        } catch (error) {
            console.error('Error generating QR code:', error);
        } finally {
            setLoading(false);
        }
    };

    const downloadQRCode = () => {
        if (qrCodeURL) {
            const link = document.createElement('a');
            link.download = `${cardData.name || 'card'}-qr-code.png`;
            link.href = qrCodeURL;
            link.click();
        }
    };

    React.useEffect(() => {
        if (isOpen && cardData) {
            generateQRCode();
        }
    }, [isOpen, cardData]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">QR Code for Your Card</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="text-center">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : qrCodeURL ? (
                        <div>
                            <img
                                src={qrCodeURL}
                                alt="QR Code"
                                className="mx-auto mb-4 border rounded"
                            />
                            <p className="text-sm text-gray-600 mb-4">
                                Scan this QR code to view your digital business card
                            </p>
                            <div className="flex gap-2 justify-center">
                                <button
                                    onClick={downloadQRCode}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Download QR Code
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-red-500">Failed to generate QR code</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QRCodeGenerator;