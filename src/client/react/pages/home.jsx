import React from 'react';
import { createRoot } from 'react-dom/client';


const HomePage = () => {
    
};


window.onload = () => {
    const root = createRoot(document.getElementById('content'));

    root.render(<HomePage />);
};
