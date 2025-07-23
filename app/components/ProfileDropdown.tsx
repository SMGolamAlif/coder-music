import { useState, useRef, useEffect } from "react";
import { UserCircleIcon, KeyIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useApiKey } from "~/context/ApiKeyContext";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const { apiKey, removeApiKey, setShowApiKeyModal } = useApiKey();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate dropdown position to match sidebar width
  const calculateDropdownPosition = () => {
    if (!buttonRef.current) return;
    
    // Make dropdown same width as sidebar (w-64 = 16rem = 256px)
    // Position it to align with the sidebar's right edge
    setDropdownStyle({
      right: 0,
      width: '16rem', // Same as sidebar w-64
    });
  };

  const handleToggleDropdown = () => {
    if (!isOpen) {
      calculateDropdownPosition();
    }
    setIsOpen(!isOpen);
  };

  const handleEditApiKey = () => {
    setShowApiKeyModal(true);
    setIsOpen(false);
  };

  const handleRemoveApiKey = () => {
    removeApiKey();
    setIsOpen(false);
  };

  const maskedApiKey = apiKey ? `${apiKey.slice(0, 8)}...${apiKey.slice(-4)}` : '';

  if (!isMounted) {
    return (
      <div className="p-2">
        <div className="w-6 h-6 bg-gray-700 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={handleToggleDropdown}
        className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        title="Profile & API Settings"
      >
        <UserCircleIcon className="w-6 h-6 text-gray-300 hover:text-white" />
      </button>

      {isOpen && (
        <div 
          className="absolute mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10"
          style={dropdownStyle}
        >
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <UserCircleIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Coder Music User</h3>
                <p className="text-gray-400 text-sm">API Settings</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-900 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">YouTube API Key</span>
                  <KeyIcon className="w-4 h-4 text-gray-400" />
                </div>
                {apiKey ? (
                  <div>
                    <p className="text-xs text-gray-400 font-mono bg-gray-800 px-2 py-1 rounded">
                      {maskedApiKey}
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={handleEditApiKey}
                        className="flex items-center space-x-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <PencilIcon className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={handleRemoveApiKey}
                        className="flex items-center space-x-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                      >
                        <TrashIcon className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleEditApiKey}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Add API Key
                  </button>
                )}
              </div>

              <div className="border-t border-gray-700 pt-3">
                <div className="text-xs text-gray-400 space-y-1">
                  <p>• API key is stored locally in your browser</p>
                  <p>• Free quota: 10,000 units/day</p>
                  <p>• Your data never leaves your device</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
