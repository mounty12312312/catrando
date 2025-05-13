import React, { useState } from 'react';

export default function App() {
  const [catImageUrl, setCatImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomCat = async () => {
    setLoading(true);
    setError(null); // Сброс ошибки при новом запросе
    try {
      const response = await fetch('https://cataas.com/cat?json=true ');
      if (!response.ok) throw new Error('Failed to fetch cat image');
      const data = await response.json();
      // Используем URL-конструктор для правильного объединения базового URL и пути
      const fullImageUrl = new URL(data.url, 'https://cataas.com ').toString();
      setCatImageUrl(fullImageUrl);
    } catch (err) {
      console.error(err);
      setError('Oops! Something went wrong while fetching the cat image.');
      setCatImageUrl(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Random Cat Image Generator</h1>
      <button
        onClick={fetchRandomCat}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Get Random Cat
      </button>

      {loading && (
        <div className="mt-8">
          <div className="animate-pulse w-96 h-96 bg-gray-200 rounded-lg"></div>
        </div>
      )}

      {error && (
        <div className="mt-8 text-red-600 font-medium">
          {error}
        </div>
      )}

      {catImageUrl && !loading && (
        <div className="mt-8">
          <img
            src={catImageUrl}
            alt="Random Cat"
            className="w-full max-w-md rounded-lg shadow-lg object-cover aspect-square"
          />
        </div>
      )}
    </div>
  );
}