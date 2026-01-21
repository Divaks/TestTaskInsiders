import React from 'react';

// 1. Стилі (можна винести в окремий .css файл)
const styles = {
    container: {
        display: 'flex',
        gap: '12px',
        padding: '20px',
        fontFamily: '"Google Sans", Roboto, Arial, sans-serif', // Спроба імітувати шрифт Google
        background: '#f8f9fa', // Світлий фон як на скріні
    },
    tabButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px', // Відступ між іконкою і текстом
        padding: '10px 24px',
        border: 'none',
        background: 'transparent',
        borderRadius: '8px', // Закруглені кути
        cursor: 'pointer',
        color: '#5f6368', // Фірмовий сірий колір Google для неактивного тексту
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background 0.2s ease, color 0.2s ease',
        textDecoration: 'none',
    },
    // Цей об'єкт ми додамо, якщо кнопка активна або при наведенні
    activeOrHover: {
        color: '#202124', // Чорний колір для активного стану
        backgroundColor: '#e8f0fe', // Світло-блакитний (класика Google) або просто сірий #f1f3f4
    }
};

// 2. Сам компонент
const GoogleTab = ({ text, icon, isActive, onClick }) => {
    // Стан наведення мишки (щоб зробити ховер ефект через JS стилі)
    const [isHovered, setIsHovered] = React.useState(false);

    // Комбінуємо стилі: базові + активні/ховер
    const buttonStyle = {
        ...styles.tabButton,
        ...(isActive || isHovered ? { backgroundColor: '#f1f3f4', color: '#202124' } : {}),
    };

    return (
        <button
            style={buttonStyle}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Рендеримо іконку. Ми очікуємо, що сюди передадуть SVG */}
            <div style={{ display: 'flex', fontSize: '20px' }}>
                {icon}
            </div>
            <span>{text}</span>
        </button>
    );
};

// 3. Приклад використання (App)
export default function App() {
    const [activeTab, setActiveTab] = React.useState('Accounting');

    return (
        <div style={styles.container}>

            {/* Вкладка 1: Telefonie */}
            <GoogleTab
                text="Telefonie"
                isActive={activeTab === 'Telefonie'}
                onClick={() => setActiveTab('Telefonie')}
                icon={
                    // SVG іконка телефону
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.053 15.053 0 01-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1.01A11.36 11.36 0 018.59 3.91c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1c0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
                    </svg>
                }
            />

            {/* Вкладка 2: Accounting (Ця зараз виглядає як на скріні з курсором) */}
            <GoogleTab
                text="Accounting"
                isActive={activeTab === 'Accounting'}
                onClick={() => setActiveTab('Accounting')}
                icon={
                    // SVG іконка людини з плюсом
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                }
            />

        </div>
    );
}