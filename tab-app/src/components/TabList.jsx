import React, { useState, useRef, useLayoutEffect } from 'react';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import Tab from './Tab';
import SortableTab from './SortableTab';
import TabDropdown from './TabDropdown';

function TabList({ tabs, activeTabId, onTabClick, onDeleteTabClick, onAddTabCLick, systemIcon, onPinTabClick }) {

    const [visibleCount, setVisibleCount] = useState(0);

    const containerRef = useRef(null);
    const dummyRef = useRef(null);
    const systemTabRef = useRef(null);
    const addBtnRef = useRef(null);

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
            const addButtonWidth = addBtnRef.current?.getBoundingClientRect().width || 48;


            const dropdownTriggerWidth = 48;

            const SAFETY_BUFFER = 5;

            const maxAvailableSpace = containerWidth - systemWidth - addButtonWidth - SAFETY_BUFFER;

            const childNodes = dummyRef.current.children;
            const tabWidths = [];

            let totalRequiredWidth = 0;

            for (let i = 0; i < childNodes.length; i++) {
                const contentWidth = childNodes[i].getBoundingClientRect().width;
                const isPinned = tabs[i]?.isPinned;

                const effectiveWidth = isPinned
                    ? contentWidth
                    : Math.max(contentWidth, 120);

                tabWidths.push(effectiveWidth);
                totalRequiredWidth += effectiveWidth;
            }

            if (totalRequiredWidth <= maxAvailableSpace) {
                setVisibleCount(tabs.length);
                return;
            }

            const spaceWithDropdown = maxAvailableSpace - dropdownTriggerWidth;

            let currentWidth = 0;
            let visibleTabs = 0;

            for (let i = 0; i < tabWidths.length; i++) {
                const w = tabWidths[i];

                if (currentWidth + w <= spaceWithDropdown) {
                    currentWidth += w;
                    visibleTabs++;
                } else {
                    break;
                }
            }

            setVisibleCount(visibleTabs);
        };

        calculateVisibleTabs();

        const observer = new ResizeObserver(calculateVisibleTabs);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => observer.disconnect();

    }, [tabs, systemIcon]);

    const visibleTabs = tabs.slice(0, visibleCount);
    const hiddenTabs = tabs.slice(visibleCount);
    const hasHiddenTabs = hiddenTabs.length > 0;

    return (
        <div ref={containerRef} className="flex w-full bg-gray-50 border-b border-gray-200 items-center relative h-[46px]">

            <div ref={dummyRef} className="absolute top-0 left-0 invisible pointer-events-none flex">
                {tabs.map(tab => (
                    <div key={tab.id} className="pl-4 pr-2 py-3 border-r border-t-[3px] whitespace-nowrap font-medium text-sm flex items-center box-border">
                        <div className="mr-2 w-5 h-5 inline-block"></div>
                        <span>{tab.name}</span>
                        <div className="ml-2 w-6 h-6 inline-block"></div>
                    </div>
                ))}
            </div>

            <div ref={systemTabRef} className="flex-shrink-0 h-full z-30 bg-gray-50">
                <Tab
                    key="system"
                    tab={systemTab}
                    isActive={activeTabId === 'system'}
                    onClick={onTabClick}
                    onDelete={() => {}}
                    onPin={() => {}}
                />
            </div>

            <div className="flex flex-grow overflow-hidden relative h-full">
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

            <div className="flex-shrink-0 flex items-center bg-gray-50 h-full border-l border-gray-200 z-20">

                <div className={`${hasHiddenTabs ? 'flex' : 'hidden'} w-[48px] h-full items-center justify-center relative`}>
                    <TabDropdown
                        hiddenTabs={hiddenTabs}
                        onTabClick={onTabClick}
                        activeTabId={activeTabId}
                    />
                </div>

                {hasHiddenTabs && <div className="h-1/2 w-px bg-gray-200"></div>}

                <button
                    ref={addBtnRef}
                    onClick={onAddTabCLick}
                    className="flex items-center justify-center w-[48px] h-full text-gray-400 hover:bg-gray-100 hover:text-blue-500 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default TabList;