import React, { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api.js";
import { useSelector } from "react-redux";
import { queryClient } from "../main.jsx";

const UrlForm = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [CustomSlug, setCustomSlug] = useState("")
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleSubmit = async () => {
    const shorturl = await createShortUrl(url, CustomSlug);
    setShortUrl(shorturl);
    queryClient.invalidateQueries({queryKey:['userUrls']})
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return <div className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          Enter your URL
        </label>
        <input type="url" id="url" value={url} onInput={event => setUrl(event.target.value)} placeholder="https://example.com" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <button onClick={handleSubmit} type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">
        Shorten URL
      </button>
      {/* {
        error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )
      } */}

      {isAuthenticated && <div className="mt-4">
          <label htmlFor="customUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Custom URL (Optional)
          </label>
          <input type="text" id="customeSlug" value={CustomSlug} onChange={event => setCustomSlug(event.target.value)} placeholder="Enter Custom Slug you want" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>}

      {shortUrl && <div className="mt-6">
          <h2 className="text-lg font-medium mb-2">Your shortened URL:</h2>
          <div className="flex items-center">
            <input type="text" readOnly value={shortUrl} className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray-50" />
            <button onClick={handleCopy} className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${copied ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-200 hover:bg-gray-300"}`}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>}
    </div>;
};

export default UrlForm;
