import { Outlet } from 'react-router-dom';
import './RootLayout.css';

export default function RootLayout() {
    return (
        <main>
            <Outlet />
        </main>
    );
}