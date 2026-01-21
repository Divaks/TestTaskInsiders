import React from 'react';

const Tab = ({ tab, isActive, onClick, onDelete, onPin }) => {
    const isSystem = tab.id === 'system';

    return (
        <div
            onClick={() => onClick(tab.id)}
            className={`
                group relative flex items-center pl-4 pr-2 py-3 cursor-pointer select-none
                border-r border-gray-200 border-t-[3px] transition-colors duration-150
                
                ${isActive
                ? "bg-white border-t-blue-500 text-gray-800"
                : "bg-gray-50 border-t-transparent text-gray-500 hover:bg-gray-100"
            }
                
                ${tab.isPinned ? "bg-gray-50/80" : ""}
            `}
            style={{ maxWidth: '200px', minWidth: '120px' }}
        >

            <div
                className="flex items-center flex-grow overflow-hidden mr-1"
                style={{
                    maskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)'
                }}
            >
                <div className={`flex-shrink-0 ${tab.name ? "mr-2" : ""} ${isActive ? "text-gray-700" : "text-gray-400 group-hover:text-gray-600"}`}>
                    {tab.icon}
                </div>

                <span className="text-sm font-medium truncate">
                    {tab.name}
                </span>
            </div>

            {!isSystem && (
                <div className={`
                    flex items-center flex-shrink-0 ml-auto transition-opacity duration-200
                    ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                `}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onPin(tab.id);
                        }}
                        className={`
                            p-1 rounded-md transition-all duration-200 hover:bg-gray-200 mr-1
                            ${tab.isPinned
                            ? "text-blue-500 opacity-100"
                            : "text-gray-400 hover:text-gray-600"
                        }
                        `}
                        title={tab.isPinned ? "Відкріпити" : "Закріпити"}
                    >
                        <svg className={`w-3.5 h-3.5 fill-current transition-transform duration-200 ${tab.isPinned ? "rotate-45" : ""}`} viewBox="0 0 24 24">
                            <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
                        </svg>
                    </button>

                    {!tab.isPinned && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(tab.id);
                            }}
                            className="p-1 rounded-full hover:bg-red-100 hover:text-red-600 text-gray-400 transition-all duration-200"
                            title="Закрити вкладку"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Tab;