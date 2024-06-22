import { UsePopupModel } from "./PopupModel";
import Popup from "./Popup";
import { createRoot } from 'react-dom/client';
import React from 'react';

// popup.htmlへの挿入とPopupModelとPopupの紐付けのみ行う

createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <UsePopupModel>
            <Popup />
        </UsePopupModel>
    </React.StrictMode>
);