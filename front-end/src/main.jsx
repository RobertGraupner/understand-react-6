import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { NotesList } from './components/notes-list/NotesList';

const router = createBrowserRouter([
	{
		element: <App />,
		path: '/',
		children: [
			{
				// sparametryzowana ścieżka, która oczekuje parametru o nazwie folderId. Dzieki temu, że jest to ścieżka zagnieżdżona w ścieżce /notes, to oznacza, że parametr folderId będzie dostępny w komponencie NotesList
				path: '/notes/:folderId',
				element: <NotesList />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
