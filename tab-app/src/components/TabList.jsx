import React from 'react';
import Tab from './Tab';

const SystemIcon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;

function TabList({ tabs, activeTabId, onTabClick, onDeleteTabClick, onAddTabCLick }) {

    const systemTab = { id: 'system', name: "", icon: SystemIcon };

    return (
        <div className="flex w-full bg-gray-50 border-b border-gray-200 overflow-x-auto">

            <Tab
                key="system"
                tab={systemTab}
                isActive={activeTabId === 'system'}
                onClick={onTabClick}
                onDelete={() => {}}
            />

            {tabs.map((tab) => (
                <Tab
                    key={tab.id}
                    tab={tab}
                    isActive={activeTabId === tab.id}
                    onClick={onTabClick}
                    onDelete={onDeleteTabClick}
                />
            ))}

            <button
                onClick={onAddTabCLick}
                className="
                    flex items-center justify-center px-4
                    border-r border-b border-gray-200
                    text-gray-400 hover:bg-gray-100 hover:text-blue-500
                    transition-colors
                "
                title="Додати вкладку"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>

            <div className="flex-grow border-b border-gray-200 bg-gray-50"></div>
        </div>
    );
}

export default TabList;