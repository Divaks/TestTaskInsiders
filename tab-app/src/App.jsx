import React, { useState, useEffect } from 'react';
import TabList from './components/TabList';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    arrayMove,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
} from '@dnd-kit/core';

const Icons = {
    Home: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    Box: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    Dashboard: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    Doc: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
};

export default function App() {
    const navigate = useNavigate();
    const location = useLocation();

    const [tabs, setTabs] = useState(() => {
        try {
            const savedData = localStorage.getItem('my-app-tabs');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                return parsedData.map(tab => ({
                    ...tab,
                    icon: Icons[tab.iconKey] || Icons.Doc
                }));
            }
        } catch (e) {
            console.error("Помилка читання localStorage", e);
        }
        return [];
    });

    const activeTab = tabs.find(t => t.path === location.pathname);
    const activeTabId = location.pathname === '/' ? 'system' : (activeTab?.id || 'system');

    useEffect(() => {
        const tabsToSave = tabs.map(tab => ({
            id: tab.id,
            name: tab.name,
            path: tab.path,
            isPinned: tab.isPinned,
            iconKey: tab.iconKey || 'Doc'
        }));

        localStorage.setItem('my-app-tabs', JSON.stringify(tabsToSave));
    }, [tabs]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleTabClick = (id) => {
        if (id === 'system') navigate('/');
        else {
            const tab = tabs.find(t => t.id === id);
            if (tab) navigate(tab.path);
        }
    };

    const handleDeleteTab = (idToDelete) => {
        const newTabs = tabs.filter(tab => tab.id !== idToDelete);
        setTabs(newTabs);

        if (activeTabId === idToDelete) {
            if (newTabs.length > 0) {
                navigate(newTabs[newTabs.length - 1].path);
            } else {
                navigate('/');
            }
        }
    };

    const handleAddTab = () => {
        const newId = Date.now();
        const newPath = `/tab/${newId}`;

        const newTab = {
            id: newId,
            name: `New Tab ${tabs.length + 1}`,
            icon: Icons.Doc,
            iconKey: 'Doc',
            path: newPath,
            isPinned: false
        };

        setTabs([...tabs, newTab]);
        navigate(newPath);
    };

    const sortTabs = (tabsArr) => {
        return [...tabsArr].sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return 0;
        });
    };

    const togglePinTab = (id) => {
        setTabs((prevTabs) => {
            const updatedTabs = prevTabs.map((t) =>
                t.id === id ? { ...t, isPinned: !t.isPinned } : t
            );
            return sortTabs(updatedTabs);
        });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setTabs((items) => {
                const oldIndex = items.findIndex((t) => t.id === active.id);
                const newIndex = items.findIndex((t) => t.id === over.id);

                const reordered = arrayMove(items, oldIndex, newIndex);

                return sortTabs(reordered);
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans">
            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 min-h-[500px] flex flex-col">

                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <TabList
                        tabs={tabs}
                        activeTabId={activeTabId}
                        onTabClick={handleTabClick}
                        onDeleteTabClick={handleDeleteTab}
                        onAddTabCLick={handleAddTab}
                        onPinTabClick={togglePinTab}
                        systemIcon={Icons.Home}
                    />
                </DndContext>

                <div className="flex-grow p-8 bg-white flex flex-col items-center justify-center text-gray-500">
                    <div className="mb-4 px-3 py-1 bg-gray-100 rounded text-xs font-mono">
                        Current URL: {location.pathname}
                    </div>

                    {activeTabId === 'system' ? (
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Привіт!</h1>
                            <p>Це головна сторінка (/).</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-700">{activeTab?.name}</h1>
                            <p>ID: {activeTab?.id}</p>
                            <p className="mt-2 text-blue-500 font-mono">{activeTab?.path}</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}