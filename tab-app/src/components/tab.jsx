import React from 'react';

const Tab = ({ tab, isActive, onClick, onDelete }) => {
    return (
        <div
            onClick={() => onClick(tab.id)}

            className={`
                group relative
                flex items-center
                px-5 py-3
                cursor-pointer select-none
                border-r border-gray-200
                border-t-[3px]
                transition-colors duration-150
                whitespace-nowrap
                
                ${isActive
                ? "bg-white border-t-blue-500 text-gray-800"
                : "bg-gray-50 border-t-transparent text-gray-500 hover:bg-gray-100"
            }
            `}
        >
            <div className={`
                ${tab.name ? "mr-2" : ""} 
                ${isActive ? "text-gray-700" : "text-gray-400 group-hover:text-gray-600"}
            `}>
                {tab.icon}
            </div>

            <span className="text-sm font-medium">
                {tab.name}
            </span>


            {tab.name && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(tab.id);
                    }}
                    className={`
                        ml-3 p-0.5 rounded-full
                        hover:bg-red-100 hover:text-red-600
                        transition-all duration-200
                        ${isActive
                        ? "opacity-100 text-gray-400"
                        : "opacity-0 group-hover:opacity-100 text-gray-400"
                    }
                    `}
                    title="Закрити вкладку"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default Tab;