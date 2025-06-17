import StatusPanel from '../src/components/StatusPanel'
import InventoryPanel from '../src/components/InventoryPanel';
import HistoryPanel from '../src/components/HistoryPanel'
import ChatPanel from '../src/components/ChatPanel'

export default function Home() {
    return (
        <main className="flex h-screen p-4 bg-gray-100 gap-4">
            <div className="w-1/4">
                <StatusPanel />
                <InventoryPanel />
            </div>
            <div className="w-2/4 flex flex-col">
                <ChatPanel />
            </div>

            <div className="w-1/4">
                <HistoryPanel />
            </div>
        </main>
    );
}
