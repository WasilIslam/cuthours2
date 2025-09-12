'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface FileData {
    id: string;
    title: string;
    description: string;
    fileUrls: string[];
    authorId: string;
    authorEmail: string;
    publishedAt: any;
    status: string;
    isPublic: boolean;
}

export default function PublicFilePage() {
    const params = useParams();
    const fileId = params.id as string;
    const [fileData, setFileData] = useState<FileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFileData = async () => {
            try {
                const docRef = doc(db, 'published_files', fileId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.isPublic && data.status === 'published') {
                        setFileData({
                            id: docSnap.id,
                            ...data
                        } as FileData);
                    } else {
                        setError('This file is not publicly accessible.');
                    }
                } else {
                    setError('File not found.');
                }
            } catch (err) {
                console.error('Error fetching file:', err);
                setError('Error loading file.');
            } finally {
                setLoading(false);
            }
        };

        if (fileId) {
            fetchFileData();
        }
    }, [fileId]);

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'Unknown';
        try {
            return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Unknown';
        }
    };

    const getFileName = (url: string) => {
        try {
            const urlParts = url.split('/');
            const fileName = urlParts[urlParts.length - 1];
            return decodeURIComponent(fileName.split('?')[0]);
        } catch {
            return 'Download File';
        }
    };

    const downloadFile = (url: string, fileName: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading file...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
                    <div className="text-center">
                        <div className="text-red-500 text-5xl mb-4">⚠️</div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <a
                            href="/"
                            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                            Go Home
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    if (!fileData) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto py-8 px-4">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {fileData.title}
                            </h1>
                            <div className="flex items-center text-sm text-gray-500 space-x-4">
                                <span>Published on {formatDate(fileData.publishedAt)}</span>
                                <span>•</span>
                                <span>By {fileData.authorEmail}</span>
                            </div>
                        </div>
                        <div className="ml-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Public
                            </span>
                        </div>
                    </div>
                    
                    <div className="border-t pt-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {fileData.description}
                        </p>
                    </div>
                </div>

                {/* Files Section */}
                {fileData.fileUrls && fileData.fileUrls.length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Attached Files ({fileData.fileUrls.length})
                        </h2>
                        <div className="space-y-3">
                            {fileData.fileUrls.map((url, index) => {
                                const fileName = getFileName(url);
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="text-blue-500 text-2xl">
                                                📎
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {fileName}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Click to download
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => downloadFile(url, fileName)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                                            >
                                                Download
                                            </button>
                                            <a
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                                            >
                                                View
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="text-center mt-8">
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
