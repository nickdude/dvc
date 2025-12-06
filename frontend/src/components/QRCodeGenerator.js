import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';

/**
 * QRCodeGenerator
 * Supports two modes:
 * - Modal mode: pass `isOpen`, `onClose`, and `cardData` (existing behavior)
 * - Inline mode: pass `value` (string URL) and optional `size` to render an inline QR image with download
 */
const QRCodeGenerator = ({ cardData, isOpen, onClose, value, size = 256 }) => {
    const [qrCodeURL, setQrCodeURL] = useState('');
    const [loading, setLoading] = useState(false);
    const mountedRef = useRef(true);

    const generateQRCode = async (source) => {
        setLoading(true);
        try {
            const qrCodeDataURL = await QRCode.toDataURL(source, {
                width: size,
                margin: 2,
                color: { dark: '#000000', light: '#FFFFFF' }
            });

            if (mountedRef.current) setQrCodeURL(qrCodeDataURL);
        } catch (error) {
            console.error('Error generating QR code:', error);
            if (mountedRef.current) setQrCodeURL('');
        } finally {
            if (mountedRef.current) setLoading(false);
        }
    };

    const downloadQRCode = (filename) => {
        if (qrCodeURL) {
            const link = document.createElement('a');
            link.download = filename || `${(cardData && cardData.name) || 'card'}-qr-code.png`;
            link.href = qrCodeURL;
            link.click();
        }
    };

    useEffect(() => {
        mountedRef.current = true;
        const shouldOpenModal = !!isOpen && !!cardData;
        if (shouldOpenModal) {
            // If cardData contains an externalUrl (created via external API), prefer that URL
            const cardURL = cardData?.externalUrl ? cardData.externalUrl : `${window.location.origin}/#/card/${cardData.id || 'preview'}`;
            generateQRCode(cardURL);
        }

        // inline value mode
        if (!isOpen && value) {
            generateQRCode(value);
        }

        return () => { mountedRef.current = false };
    }, [isOpen, cardData, value, size]);

    // Modal mode
    if (isOpen) {
        if (!isOpen) return null; // safety

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">QR Code for Your Card</h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                    </div>

                    <div className="text-center">
                        {loading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                        ) : qrCodeURL ? (
                            <div>
                                <img src={qrCodeURL} alt="QR Code" className="mx-auto mb-4 border rounded" />
                                <p className="text-sm text-gray-600 mb-4">Scan this QR code to view your digital business card</p>
                                <div className="flex gap-2 justify-center">
                                    <button onClick={() => downloadQRCode()} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Download QR Code</button>
                                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Close</button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-red-500">Failed to generate QR code</div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Inline (non-modal) mode
    return (
        <div className="text-center">
            {loading ? (
                <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            ) : qrCodeURL ? (
                <div>
                    <img src={qrCodeURL} alt="QR Code" className="mx-auto mb-2 border rounded" style={{ width: size, height: size }} />
                    <div className="flex gap-2 justify-center">
                        <button onClick={() => downloadQRCode('card-qr.png')} className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Download QR</button>
                    </div>
                </div>
            ) : (
                <div className="text-red-500">Failed to generate QR code</div>
            )}
        </div>
    );
};

export default QRCodeGenerator;