import { useState } from "react";
import axios from "axios";

const WoodClassifier = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [result, setResult] = useState<{ species: string; confidence: number } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select an image file first.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post("http://localhost:8000/predict/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResult(response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error processing the image.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Wood Species Identification</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
            <button
                onClick={handleUpload}
                disabled={!selectedFile || loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
            >
                {loading ? "Processing..." : "Upload & Identify"}
            </button>

            {result && (
                <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                    <p className="text-lg font-medium">Prediction: {result.species}</p>
                    <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
                </div>
            )}
        </div>
    );
};

export default WoodClassifier;
