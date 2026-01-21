import React, { useState, useRef, useLayoutEffect } from 'react';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import Tab from './Tab';
import SortableTab from './SortableTab';
import TabDropdown from './TabDropdown';

function TabList({ tabs, activeTabId, onTabClick, onDeleteTabClick, onAddTabCLick, systemIcon, onPinTabClick }) {

    const [visibleCount, setVisibleCount] = useState(tabs.length);

    const containerRef = useRef(null);
    const dummyRef = useRef(null);
    const systemTabRef = useRef(null);
    const addBtnRef = useRef(null);
    const dropdownBtnRef = useRef(null);

    const systemTab = {
        id: 'system',
        name: "",
        icon: systemIcon || <span>🏠</span>
    };

    useLayoutEffect(() => {
        const calculateVisibleTabs = () => {
            if (!containerRef.current || !dummyRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const systemWidth = systemTabRef.current?.getBoundingClientRect().width || 50;
            const addButtonWidth = addBtnRef.current?.getBoundingClientRect().width || 50;
            const moreButtonWidth = 48;

            const safetyBuffer = 2;

            const occupiedSpace = systemWidth + addButtonWidth + moreButtonWidth + safetyBuffer;
            const availableForTabs = containerWidth - occupiedSpace;

            const childNodes = dummyRef.current.children;
            let currentWidth = 0;
            let count = 0;

            for (let i = 0; i < childNodes.length; i++) {

                const minTabWidth = 120;

                const isPinned = tabs[i]?.isPinned;
                const tabWidth = isPinned ? childNodes[i].getBoundingClientRect().width : minTabWidth;

                if (currentWidth + tabWidth <= availableForTabs) {
                    currentWidth += tabWidth;
                    count++;
                } else {
                    break;
                }
            }
            setVisibleCount(Math.max(0, count));
        };

        calculateVisibleTabs();

        const observer = new ResizeObserver(() => {
            calculateVisibleTabs();
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();

    }, [tabs]);

    const visibleTabs = tabs.slice(0, visibleCount);
    const hiddenTabs = tabs.slice(visibleCount);

    return (
        <div ref={containerRef} className="flex w-full bg-gray-50 border-b border-gray-200 items-center relative">

            <div ref={dummyRef} className="absolute top-0 left-0 invisible pointer-events-none flex">
                {tabs.map(tab => (
                    <div key={tab.id} className="px-4 py-3 border-r border-t-[3px] whitespace-nowrap font-medium text-sm flex items-center box-border min-w-[120px]">
                        <span className="mr-2 w-5 h-5 block"></span>
                        <span>{tab.name}</span>
                    </div>
                ))}
            </div>

            <div ref={systemTabRef} className="flex-shrink-0">
                <Tab
                    key="system"
                    tab={systemTab}
                    isActive={activeTabId === 'system'}
                    onClick={onTabClick}
                    onDelete={() => {}}
                    onPin={() => {}}
                />
            </div>

            <div className="flex overflow-hidden relative">
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

            <div className="flex-shrink-0 flex items-center bg-gray-50 z-20">

                <div ref={dropdownBtnRef} className={`${hiddenTabs.length === 0 ? 'opacity-0 pointer-events-none w-[48px]' : 'w-[48px]'} flex justify-center border-l border-gray-200 h-full py-2`}>
                    <TabDropdown
                        hiddenTabs={hiddenTabs}
                        onTabClick={onTabClick}
                        activeTabId={activeTabId}
                    />
                </div>

                <button
                    ref={addBtnRef}
                    onClick={onAddTabCLick}
                    className="flex items-center justify-center w-[48px] h-full border-l border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-blue-500 transition-colors py-3"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            <div className="flex-grow border-b border-gray-200 bg-gray-50 h-full min-h-[46px]"></div>
        </div>
    );
}

export default TabList;