import React from 'react';

export default function LoadingMessage() {
  return (
    <div className="flex items-center justify-center mt-10 space-x-3">
      <svg
        className="w-6 h-6 animate-spin text-red-700"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
      </svg>
      <p className="text-lg font-medium text-gray-700">
        This will take some time, please wait
      </p>
    </div>
  );
}
