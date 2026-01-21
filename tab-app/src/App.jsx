import { useState } from 'react'
import './App.css'
import TabList from './components/TabList'

function App() {
    const [tabs, setTabs] = useState([
        { id: 1, name: "Dashboard" },
        { id: 2, name: "Analytics" },
        { id: 3, name: "Transactions" },
        { id: 4, name: "Server Status" },
        { id: 5, name: "User Settings" },
        { id: 6, name: "Integrations" },
    ]);
    const [activeTab, setActiveTab] = useState(null);

  function handleTabClick(tab) {
      setActiveTab(tab);
  }

  function handleTabDeleteClick(tabToDelete){
      setTabs(tabs.filter(tab => tab !== tabToDelete));
  }

  return (
    <>
      <TabList
          tabs={tabs}
          onTabClick={handleTabClick}
          onDeleteTabClick={handleTabDeleteClick}
      />
    </>
  )
}

export default App
