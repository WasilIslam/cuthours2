'use client';

import AuthWrapper from '@/components/AuthWrapper';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, doc, deleteDoc, updateDoc, query, where, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

interface FileCreatorComponentProps {}

function FileCreatorComponent({}: FileCreatorComponentProps) {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [publicLink, setPublicLink] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles([...files, ...selectedFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const uploadFilesToStorage = async () => {
        const uploadedUrls: string[] = [];

        for (const file of files) {
            const storageRef = ref(storage, `files/${user?.uid}/${Date.now()}_${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            uploadedUrls.push(downloadURL);
        }

        return uploadedUrls;
    };

    const publishFile = async () => {
        if (!title.trim() || !description.trim()) {
            setMessage('Please fill in title and description');
            return;
        }

        setUploading(true);
        setMessage('');
        setPublicLink('');

        try {
            // Upload files to Firebase Storage
            const fileUrls = await uploadFilesToStorage();

            // Save to Firestore
            const docRef = await addDoc(collection(db, 'published_files'), {
                title: title.trim(),
                description: description.trim(),
                fileUrls,
                authorId: user?.uid,
                authorEmail: user?.email,
                publishedAt: serverTimestamp(),
                status: 'published',
                isPublic: true
            });

            const publicUrl = `${window.location.origin}/public/file/${docRef.id}`;
            setPublicLink(publicUrl);
            setMessage('File published successfully!');
            
            // Reset form
            setTitle('');
            setDescription('');
            setFiles([]);
        } catch (error) {
            console.error('Error publishing file:', error);
            setMessage('Error publishing file. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">File Upload</h2>
                <p className="text-gray-600">Upload files with title and description to make them publicly accessible</p>
            </div>

            {message && (
                <div className={`mb-4 p-3 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {message}
                </div>
            )}

            {publicLink && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Public Link Generated:</h3>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={publicLink}
                            readOnly
                            className="flex-1 px-3 py-2 bg-white border rounded text-sm"
                        />
                        <button
                            onClick={() => navigator.clipboard.writeText(publicLink)}
                            className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                        >
                            Copy
                        </button>
                        <a
                            href={publicLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                        >
                            View
                        </a>
                    </div>
                </div>
            )}

            <div className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter file title"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter file description"
                    />
                </div>


                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Attach Files
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="w-full"
                            accept="*/*"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            Choose files to upload (multiple files allowed)
                        </p>
                    </div>

                    {files.length > 0 && (
                        <div className="mt-4 space-y-2">
                            <p className="text-sm font-medium text-gray-700">Selected Files:</p>
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-600">📎</span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFile(index)}
                                        className="text-red-500 hover:text-red-700 p-1"
                                        title="Remove file"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Publish Button */}
                <div className="pt-4">
                    <button
                        onClick={publishFile}
                        disabled={uploading || !title.trim() || !description.trim()}
                        className="w-full px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {uploading ? 'Uploading...' : 'Publish File'}
                    </button>
                </div>
            </div>
        </div>
    );
}

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

function FileManagerComponent() {
    const { user } = useAuth();
    const [files, setFiles] = useState<FileData[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingFile, setEditingFile] = useState<FileData | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    const fetchFiles = async () => {
        try {
            const q = query(
                collection(db, 'published_files'),
                where('authorId', '==', user?.uid)
            );
            const querySnapshot = await getDocs(q);
            const filesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as FileData[];
            
            // Sort by publishedAt in memory (newest first)
            filesData.sort((a, b) => {
                if (!a.publishedAt || !b.publishedAt) return 0;
                return b.publishedAt.seconds - a.publishedAt.seconds;
            });
            
            setFiles(filesData);
        } catch (error) {
            console.error('Error fetching files:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.uid) {
            fetchFiles();
        }
    }, [user?.uid]);

    const handleEdit = (file: FileData) => {
        setEditingFile(file);
        setEditTitle(file.title);
        setEditDescription(file.description);
    };

    const handleUpdate = async () => {
        if (!editingFile || !editTitle.trim() || !editDescription.trim()) return;

        setUpdating(true);
        try {
            await updateDoc(doc(db, 'published_files', editingFile.id), {
                title: editTitle.trim(),
                description: editDescription.trim(),
                updatedAt: serverTimestamp()
            });

            setFiles(files.map(file => 
                file.id === editingFile.id 
                    ? { ...file, title: editTitle.trim(), description: editDescription.trim() }
                    : file
            ));

            setEditingFile(null);
            setEditTitle('');
            setEditDescription('');
        } catch (error) {
            console.error('Error updating file:', error);
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async (fileData: FileData) => {
        if (!confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
            return;
        }

        setDeleting(fileData.id);
        try {
            // Delete files from storage
            for (const fileUrl of fileData.fileUrls) {
                try {
                    const fileRef = ref(storage, fileUrl);
                    await deleteObject(fileRef);
                } catch (error) {
                    console.error('Error deleting file from storage:', error);
                }
            }

            // Delete document from Firestore
            await deleteDoc(doc(db, 'published_files', fileData.id));
            
            setFiles(files.filter(file => file.id !== fileData.id));
        } catch (error) {
            console.error('Error deleting file:', error);
        } finally {
            setDeleting(null);
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'Unknown';
        try {
            return new Date(timestamp.seconds * 1000).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Unknown';
        }
    };

    const copyPublicLink = (fileId: string) => {
        const publicUrl = `${window.location.origin}/public/file/${fileId}`;
        navigator.clipboard.writeText(publicUrl);
        setCopied(fileId);
        setTimeout(() => setCopied(null), 2000);
    };

    if (loading) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your files...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">File Manager</h2>
                <p className="text-gray-600">Manage your uploaded files - edit, delete, or get public links</p>
            </div>

            {files.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <div className="text-gray-400 text-6xl mb-4">📁</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No files uploaded yet</h3>
                    <p className="text-gray-500">Upload your first file to see it here</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Files
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Published
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {files.map((file) => (
                                    <tr key={file.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                                {file.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500 max-w-xs truncate">
                                                {file.description}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {file.fileUrls.length} file{file.fileUrls.length !== 1 ? 's' : ''}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(file.publishedAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <button
                                                onClick={() => copyPublicLink(file.id)}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="Copy public link"
                                            >
                                                {copied === file.id ? '✅' : '🔗'}
                                            </button>
                                            <a
                                                href={`/public/file/${file.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:text-green-900"
                                                title="View public page"
                                            >
                                                👁️
                                            </a>
                                            <button
                                                onClick={() => handleEdit(file)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(file)}
                                                disabled={deleting === file.id}
                                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                                title="Delete"
                                            >
                                                {deleting === file.id ? '⏳' : '🗑️'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editingFile && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit File</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-3 mt-6">
                                <button
                                    onClick={handleUpdate}
                                    disabled={updating || !editTitle.trim() || !editDescription.trim()}
                                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                                >
                                    {updating ? 'Updating...' : 'Update'}
                                </button>
                                <button
                                    onClick={() => {
                                        setEditingFile(null);
                                        setEditTitle('');
                                        setEditDescription('');
                                    }}
                                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const functions = [
    {
        name: 'File Creator',
        description: 'Create and publish files with title, description, and attachments',
        component: <FileCreatorComponent />
    },
    {
        name: 'File Manager',
        description: 'View, edit, and delete your uploaded files - full CRUD operations',
        component: <FileManagerComponent />
    }
]

export default function AdminPage() {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFunction, setSelectedFunction] = useState<typeof functions[0] | null>(null);

    const filteredFunctions = functions.filter(func =>
        func.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        func.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedFunction) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-6xl mx-auto p-6">
                    <div className="mb-6">
                        <button
                            onClick={() => setSelectedFunction(null)}
                            className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors"
                        >
                            ← Back to Functions
                        </button>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg">
                        {selectedFunction.component}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
                    <div className="relative">
                        <input
                            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            type="text"
                            placeholder="Search functions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute left-3 top-3.5 text-gray-400">
                            🔍
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredFunctions.map((func) => (
                        <div
                            key={func.name}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
                            onClick={() => setSelectedFunction(func)}
                        >
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {func.name}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {func.description}
                                </p>
                                <div className="mt-4 text-blue-600 text-sm font-medium">
                                    Click to open →
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredFunctions.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No functions found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}