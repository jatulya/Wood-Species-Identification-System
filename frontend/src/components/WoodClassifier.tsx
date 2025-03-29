import { useState, useEffect } from "react";
import { UploadCloud, X } from "lucide-react";
import { FaQuestionCircle } from "react-icons/fa";
import axios from "axios";

const WoodClassifier = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ species: string; confidence: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file)); // Create image preview
            setUploadProgress(null);
            setResult(null);
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setLoading(true);
        setUploadProgress(0);
        setError(null);

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post("http://localhost:8000/predict/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percent);
                    }
                },
            });
            setResult(response.data);
        } catch (err) {
            setError("Error processing the image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreview(null);
        setUploadProgress(null);
        setResult(null);
        setError(null);
    };

    // Cleanup URL to prevent memory leaks
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-[700px] bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 text-center mb-5">
                    Wood Species Identification
                </h2>

                {/* Drag & Drop Box */}
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-200 dark:border-gray-600 rounded-lg p-8 cursor-pointer hover:border-blue-500 transition">
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    <UploadCloud className="w-20 h-20 text-blue-800 dark:text-gray-500 mb-2  hover:text-blue-600 transition" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                        Drag & Drop image here or <span className="text-blue-500">Choose file</span>
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Supported: JPG, PNG (Max: 10MB)</p>
                </label>

                {/* Selected File Preview */}
                {selectedFile && (
                    <div className="mt-4 flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        {preview && (
                            <img src={preview} alt="Preview" className="w-16 h-16 rounded-lg object-cover shadow-md" />
                        )}
                        <div className="flex-1">
                            <p className="font-medium text-gray-800 dark:text-gray-200">{selectedFile.name}</p>
                            <p className="text-xs text-gray-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                        <button onClick={handleRemoveFile} className="text-gray-500 hover:text-red-500 transition">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Upload Progress Bar */}
                {uploadProgress !== null && (
                    <div className="mt-4 w-full">
                        <div className="relative w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                            <div
                                className="absolute left-0 top-0 h-full bg-blue-500 rounded-full transition-all"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-1 text-center">{uploadProgress}%</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mt-4 p-4 bg-red-100 dark:bg-red-800 rounded-lg text-center text-red-700 dark:text-red-300">
                        {error}
                    </div>
                )}

                {/* Prediction Result */}
                {result && (
                    <div className="mt-4 p-4 bg-green-100 dark:bg-green-800 rounded-lg text-center">
                        <p className="text-lg font-semibold text-green-700 dark:text-green-300">
                            Prediction: {result.species}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                            Confidence: {(result.confidence * 100).toFixed(2)}%
                        </p>
                    </div>
                )}

                {/* Buttons */}
                <div className="mt-6 flex flex-col items-center">
                    {!selectedFile && (
                        <button
                            className="px-6 py-2 bg-blue-800 text-white rounded-lg transition hover:bg-blue-900 disabled:opacity-50"
                            onClick={handleUpload}
                            disabled={!selectedFile || loading}
                        >
                            Upload
                        </button>
                    )}

                    {selectedFile && (
                        <div className="flex w-full justify-center mt-4 gap-4">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50 transition hover:bg-gray-600"
                                onClick={handleRemoveFile}
                                disabled={!selectedFile || loading}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-800 text-white rounded-lg disabled:opacity-50 transition hover:bg-blue-900"
                                onClick={handleUpload}
                                disabled={!selectedFile || loading}
                            >
                                {loading ? "Processing..." : "Get Result"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Help Icon */}
                {selectedFile && (
                    <div className="w-full flex justify-end mt-4">
                        <button className="p-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400 transition">
                            <FaQuestionCircle size={24} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WoodClassifier;
