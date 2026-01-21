import React, { useState } from 'react';
import TabList from './components/TabList';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

const Icons = {
    Box: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    Dashboard: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    Doc: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
};

export default function App() {
    const [tabs, setTabs] = useState([]);

    const [activeTabId, setActiveTabId] = useState(2);

    const handleTabClick = (id) => {
        setActiveTabId(id);
    };

    const handleDeleteTab = (idToDelete) => {
        const newTabs = tabs.filter(tab => tab.id !== idToDelete);
        setTabs(newTabs);

        if (activeTabId === idToDelete) {
            if (newTabs.length > 0) {
                setActiveTabId(newTabs[newTabs.length - 1].id);
            } else {
                setActiveTabId('system');
            }
        }
    };

    const handleAddTab = () => {
        const newId = Date.now();
        const newTab = {
            id: newId,
            name: `New Tab ${tabs.length}`,
            icon: Icons.Doc,
        };

        setTabs([...tabs, newTab]);
        setActiveTabId(newId);
    };

    const activeTab = activeTabId === 'system'
        ? { id: 'system', name: "System Home" }
        : tabs.find(t => t.id === activeTabId);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setTabs((items) => {
                const oldIndex = items.findIndex((t) => t.id === active.id);
                const newIndex = items.findIndex((t) => t.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 min-h-[500px] flex flex-col">

                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <TabList
                        tabs={tabs}
                        activeTabId={activeTabId}
                        onTabClick={handleTabClick}
                        onDeleteTabClick={handleDeleteTab}
                        onAddTabCLick={handleAddTab}
                        systemIcon={Icons.Home}
                    />
                </DndContext>

                <div className="flex-grow p-8 bg-white">
                    {activeTab ? (
                        <div className="text-center mt-20">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                {activeTab.name || "System Home"}
                            </h1>
                            <p className="text-gray-500">
                                Це вміст вкладки ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{activeTab.id}</span>
                            </p>
                            <div className="mt-8 text-gray-400">
                                Тут буде твій інтерфейс для {activeTab.name}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            Немає активних вкладок. Додайте нову (+).
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}