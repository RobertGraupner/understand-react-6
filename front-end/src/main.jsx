import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { NotesList } from './components/notes-list/NotesList';
import { Note } from './components/note/Note';
import { createFolder } from './components/folders-list/FoldersList';
import { createNote } from './components/notes-list/NotesList';
import { updateNote } from './components/note/Note';
import { deleteNote } from './components/note/Note';
import { NotFound } from './components/not-found/NotFound';

const router = createBrowserRouter([
	{
		element: <App />,
		path: '/',
		errorElement: <NotFound />,
		action: createFolder,
		shouldRevalidate: ({ formAction }) => {
			if (formAction === '/') {
				return true;
			} else {
				return false;
			}
		},
		loader: () => {
			// react router konwertuje json na obiekt javascriptowy
			return fetch('http://localhost:3000/folders');
		},
		children: [
			{
				// sparametryzowana ścieżka, która oczekuje parametru o nazwie folderId. Dzieki temu, że jest to ścieżka zagnieżdżona w ścieżce /notes, to oznacza, że parametr folderId będzie dostępny w komponencie NotesList
				path: '/notes/:folderId',
				element: <NotesList />,
				action: createNote,
				loader: ({ params }) => {
					return fetch(
						// params.folderId to id folderu, który został wybrany
						`http://localhost:3000/notes?folderId=${params.folderId}`
					);
				},
				children: [
					{
						path: 'note/:noteId',
						element: <Note />,
						action: updateNote,
						shouldRevalidate: ({ formAction }) => {
							if (formAction) {
								return false;
							} else {
								return true;
							}
						},
						errorElement: <NotFound />,
						loader: async ({ params }) => {
							const result = await fetch(
								`http://localhost:3000/notes/${params.noteId}`
							);
							if (result.status === 404) {
								throw new Error();
							} else {
								return result.json();
							}
						},
						children: [
							{
								path: 'delete',
								action: deleteNote,
							},
						],
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
