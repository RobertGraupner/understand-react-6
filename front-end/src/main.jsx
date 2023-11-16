import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { NotesList } from './components/notes-list/NotesList';

const router = createBrowserRouter([
	{
		element: <App />,
		path: '/',
	},
	{
		path: '/notes',
		element: <NotesList />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
