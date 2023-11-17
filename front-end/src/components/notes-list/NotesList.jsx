import styles from './NotesList.module.css';
import { Title } from '../title/Title';
import { AddNewButton } from '../add-new-button/AddNewButton';
import { TopBar } from '../top-bar/TopBar';
import { ShortNote } from '../short-note/ShortNote';
import {
	useLoaderData,
	NavLink,
	Outlet,
	Form,
	redirect,
} from 'react-router-dom';

const NotesContainer = ({ children }) => (
	<div className={styles['notes-container']}>{children}</div>
);

const Notes = ({ children }) => (
	<div className={styles['notes-list']} role='list'>
		{children}
	</div>
);

export function createNote({ params }) {
	return fetch(`http://localhost:3000/notes`, {
		method: 'POST',
		body: JSON.stringify({
			folderId: Number(params.folderId),
			title: 'Nowa notatka',
			body: 'Treść notatki',
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then((newNote) => {
			return redirect(`/notes/${newNote.folderId}/note/${newNote.id}`);
		});
}

export function NotesList() {
	const notes = useLoaderData();

	return (
		<NotesContainer>
			<Notes>
				<TopBar>
					<Title>Notatki</Title>
					<Form method='POST'>
						<AddNewButton>+</AddNewButton>
					</Form>
				</TopBar>

				{notes.map((note) => (
					<NavLink key={note.id} to={`/notes/${note.folderId}/note/${note.id}`}>
						{({ isActive }) => (
							<ShortNote active={isActive} role='listitem' note={note} />
						)}
					</NavLink>
				))}
			</Notes>
			<Outlet />
		</NotesContainer>
	);
}
