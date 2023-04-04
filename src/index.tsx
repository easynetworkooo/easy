import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss'
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { App, AppProvider } from "./components";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <AppProvider>
        <App/>
    </AppProvider>
);
