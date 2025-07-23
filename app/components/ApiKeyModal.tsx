import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon, KeyIcon, InformationCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useApiKey } from "~/context/ApiKeyContext";

type ModalView = 'setup' | 'instructions';

export default function ApiKeyModal() {
  const { showApiKeyModal, setApiKey, setShowApiKeyModal } = useApiKey();
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [currentView, setCurrentView] = useState<ModalView>('setup');
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) {
      setError("Please enter a valid API key");
      return;
    }
    
    // Basic validation for YouTube API key format
    if (apiKeyInput.length < 35 || !apiKeyInput.startsWith('AIza')) {
      setError("Invalid API key format. YouTube API keys should start with 'AIza' and be at least 35 characters long.");
      return;
    }

    setError("");
    setApiKey(apiKeyInput.trim());
  };

  const handleClose = () => {
    if (apiKeyInput.trim()) {
      setShowApiKeyModal(false);
    }
  };

  const renderSetupView = () => (
    <div className="space-y-6">
      <div className="text-center">
        <KeyIcon className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Setup YouTube API Key</h2>
        <p className="text-gray-400">
          To use Coder Music, you need to provide your own YouTube Data API v3 key.
          This ensures unlimited access and better performance.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-2">
            YouTube API Key
          </label>
          <input
            type="text"
            id="apiKey"
            value={apiKeyInput}
            onChange={(e) => {
              setApiKeyInput(e.target.value);
              setError("");
            }}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="AIzaSy..."
            required
          />
          {error && (
            <p className="mt-2 text-sm text-red-400">{error}</p>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Save API Key
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('instructions')}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <InformationCircleIcon className="w-5 h-5" />
            <span>How to get API Key</span>
          </button>
        </div>
      </form>

      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <InformationCircleIcon className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-300">
            <p className="font-medium mb-1">Why do I need my own API key?</p>
            <p>YouTube API has usage limits. By using your own key, you get full access without restrictions and ensure the best experience.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInstructionsView = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setCurrentView('setup')}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 text-gray-400" />
        </button>
        <h2 className="text-2xl font-bold text-white">How to Get YouTube API Key</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Quick Access Links</h3>
          <div className="space-y-2">
            <a
              href="https://console.cloud.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg transition-colors"
            >
              Open Google Cloud Console
            </a>
            <a
              href="https://console.cloud.google.com/apis/library/youtube.googleapis.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 px-4 rounded-lg transition-colors"
            >
              Enable YouTube Data API v3
            </a>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Video Tutorial</h3>
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/LLAZUTbc97I?si=4qBOLwKay9NtBTNZ"
              title="YouTube API Key Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Step-by-Step Instructions</h3>
          <ol className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
              <div>
                <p className="font-medium">Go to Google Cloud Console</p>
                <p className="text-sm text-gray-400">Visit console.cloud.google.com and sign in with your Google account</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
              <div>
                <p className="font-medium">Create or Select a Project</p>
                <p className="text-sm text-gray-400">Create a new project or select an existing one from the dropdown</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
              <div>
                <p className="font-medium">Enable YouTube Data API v3</p>
                <p className="text-sm text-gray-400">Go to APIs & Services → Library → Search for "YouTube Data API v3" → Enable it</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
              <div>
                <p className="font-medium">Create API Key</p>
                <p className="text-sm text-gray-400">Go to APIs & Services → Credentials → Create Credentials → API Key</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">5</span>
              <div>
                <p className="font-medium">Copy Your API Key</p>
                <p className="text-sm text-gray-400">Copy the generated API key and paste it in the input field above</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="bg-yellow-900 border border-yellow-600 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <InformationCircleIcon className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-200">
              <p className="font-medium mb-1">Important Notes:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Keep your API key secure and don't share it publicly</li>
                <li>The API key gives you 10,000 free quota units per day</li>
                <li>You can restrict the API key to YouTube Data API for security</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isMounted || !showApiKeyModal) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            {currentView === 'setup' && (
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                disabled={!apiKeyInput.trim()}
              >
                <XMarkIcon className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {currentView === 'setup' ? renderSetupView() : renderInstructionsView()}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
