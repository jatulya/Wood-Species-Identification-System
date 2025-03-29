import { useEffect, useState } from "react";
import { Download, Save } from "lucide-react";
import { useLocation } from "react-router-dom";

const Description = () => {
    const location = useLocation();
    const [result, setResult] = useState(location.state?.result || null);
    const [imageUrl, setImageUrl] = useState(location.state?.imageUrl || null);

    // Fallback: Load from localStorage if missing
    useEffect(() => {
        if (!result) {
            const savedResult = localStorage.getItem("woodResult");
            if (savedResult) setResult(JSON.parse(savedResult));
        }

        if (!imageUrl) {
            const savedImage = localStorage.getItem("woodImage");
            if (savedImage) setImageUrl(savedImage);
        }
    }, []);

    const handleDownload = () => {
        if (imageUrl) {
            const link = document.createElement("a");
            link.href = imageUrl;
            link.download = "wood_species_result.jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleSave = () => {
        alert("Save functionality to be implemented");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-[500px] bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center mb-4">
                    Wood Species Identification Result
            </h2>
                {result ? (
                    <>
                        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
                            Identified Species: {result.species}
                        </h2>

                        {imageUrl && (
                            <img src={imageUrl} alt="Uploaded" className="w-full rounded-lg shadow-md mb-4" />
                        )}

                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Scientific Name:</strong> {result.scientificName || "Unknown"}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Common Name:</strong> {result.commonName || "Unknown"}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>Areas Found:</strong> {result.areasFound || "Unknown"}
                            </p>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-600 dark:text-gray-300">No result found.</p>
                )}

                <div className="flex justify-between mt-6">
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        onClick={handleSave}
                    >
                        <Save className="w-5 h-5" /> Save
                    </button>

                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
                        onClick={handleDownload}
                    >
                        <Download className="w-5 h-5" /> Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Description;
