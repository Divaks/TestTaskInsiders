import React, { useState, useRef, useEffect } from 'react';

export default function TabDropdown({ hiddenTabs, onTabClick, activeTabId }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event){
            if (menuRef.current && menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    },[]);

    if (hiddenTabs.length === 0) return null;

    const isActiveInDropdown = hiddenTabs.some(t => t.id === activeTabId);

    return (
        <div className="relative h-full flex items-center" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center justify-center px-3 py-2 mx-1 rounded-md
                    transition-colors duration-200
                    ${isActiveInDropdown
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }
                `}
            >
                <span className="font-bold mb-1">...</span>
                {isActiveInDropdown && <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></div>}
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden py-1">
                    {hiddenTabs.map(tab => (
                        <div
                            key={tab.id}
                            onClick={() => {
                                onTabClick(tab.id);
                                setIsOpen(false);
                            }}
                            className={`
                                flex items-center px-4 py-3 cursor-pointer text-sm
                                hover:bg-gray-50
                                ${activeTabId === tab.id ? "bg-blue-50 text-blue-700" : "text-gray-700"}
                            `}
                        >
                            <div className="mr-3 text-gray-400">
                                {tab.icon}
                            </div>
                            <span className="truncate">{tab.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}