import React, { useState, useRef, useLayoutEffect } from 'react';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import Tab from './Tab';
import SortableTab from './SortableTab';
import TabDropdown from './TabDropdown';

function TabList({ tabs, activeTabId, onTabClick, onDeleteTabClick, onAddTabCLick, systemIcon, onPinTabClick }) {
    const [visibleCount, setVisibleCount] = useState(tabs.length);
    const containerRef = useRef(null);
    const dummyRef = useRef(null);

    const systemTab = {
        id: 'system',
        name: "",
        icon: systemIcon || <span>🏠</span>
    };

    useLayoutEffect(() => {
        const calculateVisibleTabs = () => {
            if (!containerRef.current || !dummyRef.current) return;

            const availableWidth = containerRef.current.offsetWidth - 120;
            const childNodes = dummyRef.current.children;

            let currentWidth = 0;
            let count = 0;

            for (let i = 0; i < childNodes.length; i++) {
                const tabWidth = childNodes[i].offsetWidth;
                if (currentWidth + tabWidth < availableWidth) {
                    currentWidth += tabWidth;
                    count++;
                } else {
                    break;
                }
            }

            setVisibleCount(count);
        };

        calculateVisibleTabs();

        const observer = new ResizeObserver(() => {
            calculateVisibleTabs();
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };

    }, [tabs]);

    const visibleTabs = tabs.slice(0, visibleCount);
    const hiddenTabs = tabs.slice(visibleCount);

    return (
        <div ref={containerRef} className="flex w-full bg-gray-50 border-b border-gray-200 items-center relative">

            <div ref={dummyRef} className="absolute top-0 left-0 invisible pointer-events-none flex">
                {tabs.map(tab => (
                    <div key={tab.id} className="px-4 py-3 border-r border-t-[3px] whitespace-nowrap font-medium text-sm flex items-center">
                        <span className="mr-2 w-5 h-5 block"></span>
                        <span>{tab.name}</span>
                        <span className="ml-3 w-4 h-4 block"></span>
                    </div>
                ))}
            </div>

            <Tab
                key="system"
                tab={systemTab}
                isActive={activeTabId === 'system'}
                onClick={onTabClick}
                onDelete={() => {}}
                onPin={() => {}}
            />

            <div className="flex-shrink flex overflow-hidden">
                <SortableContext items={visibleTabs} strategy={horizontalListSortingStrategy}>
                    {visibleTabs.map((tab) => (
                        <SortableTab
                            key={tab.id}
                            tab={tab}
                            isActive={activeTabId === tab.id}
                            onClick={onTabClick}
                            onDelete={onDeleteTabClick}
                            onPin={onPinTabClick}
                        />
                    ))}
                </SortableContext>
            </div>

            <TabDropdown
                hiddenTabs={hiddenTabs}
                onTabClick={onTabClick}
                activeTabId={activeTabId}
            />

            <button
                onClick={onAddTabCLick}
                className="flex items-center justify-center px-4 h-full border-r border-l border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-blue-500 transition-colors py-3 ml-auto"
                title="Додати вкладку"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>

            <div className="flex-grow border-b border-gray-200 bg-gray-50 min-w-[20px]"></div>
        </div>
    );
}

export default TabList;