import Popup from "./Popup";
import { createRoot } from 'react-dom/client';
import React from 'react';

// popup.htmlへの挿入のみ行う
createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>
);