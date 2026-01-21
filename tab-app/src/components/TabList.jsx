function TabList({tabs, onTabClick, onDeleteTabClick}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    onClick={() => onTabClick(tab)}
                    className="group relative overflow-hidden
            bg-zinc-900/80 backdrop-blur-sm             // Напівпрозорий фон
            border border-zinc-800/50 rounded-2xl       // Тонкий бордер
            p-6
            cursor-pointer
            transition-all duration-300 ease-out        // Плавна анімація
            hover:-translate-y-1                        // Картка 'спливає' вверх
            hover:shadow-2xl hover:shadow-red-900/20    // Тінь з червоним відтінком
            hover:border-red-500/30"                    // Бордер стає червоним
                >
                    {/* Декоративний градієнт на фоні при ховері */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 via-red-600/0 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative flex justify-between items-start z-10">
                        <div>
                            {/* ID або Label (маленький текст зверху) */}
                            <span className="text-xs font-mono text-zinc-500 mb-2 block group-hover:text-red-400 transition-colors">
                        #{tab.id.toString().padStart(2, '0')}
                    </span>

                            {/* Заголовок з градієнтом */}
                            <h3 className="text-2xl font-bold text-zinc-100 tracking-tight group-hover:text-white">
                                {tab.name}
                            </h3>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteTabClick(tab.id);
                            }}
                            className="
                    flex items-center gap-2
                    px-4 py-1.5
                    rounded-full
                    text-xs font-medium tracking-wide uppercase
                    text-zinc-400 bg-zinc-800/50
                    border border-zinc-700/50
                    opacity-0 translate-x-4                // Приховано і зміщено вправо
                    group-hover:opacity-100 group-hover:translate-x-0 // Виїжджає при наведенні
                    transition-all duration-300 delay-75
                    hover:!bg-red-600 hover:!text-white hover:!border-red-500 hover:shadow-lg hover:shadow-red-600/20"
                        >
                            Видалити
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TabList;