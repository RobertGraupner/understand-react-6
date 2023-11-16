import styles from './NotesList.module.css';
import { useState } from 'react';
import { Title } from '../title/Title';
import { AddNewButton } from '../add-new-button/AddNewButton';
import { TopBar } from '../top-bar/TopBar';
import { ShortNote } from '../short-note/ShortNote';
import { Note } from '../note/Note';

const NotesContainer = ({ children }) => (
	<div className={styles['notes-container']}>{children}</div>
);

const Notes = ({ children }) => (
	<div className={styles['notes-list']} role='list'>
		{children}
	</div>
);

export function NotesList() {
	const [notes] = useState([
		{
			id: 5,
			folderId: 2,
			title: 'Albert Einstein',
			body: 'Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.',
		},
		{
			id: 7,
			title: 'Sun Tzu',
			folderId: 2,
			body: 'Osiągnąć sto zwycięstw w stu bitwach nie jest szczytem umiejętności. Szczytem umiejętności jest pokonanie przeciwnika bez walki.',
		},
		{
			title: 'Lista zakupów na wakacje',
			body: '\nKup ubezpieczenie, \nKup bilety, \nZarezerwuj hotel',
			folderId: 1,
			id: 8,
		},
		{
			title: 'Lista zakupów',
			body: '\n1. Masło, \n2. Chleb, \n3. Mleko',
			folderId: 1,
			id: 10,
		},
		{
			title: 'Praca',
			body: '\n1. Zadanie 1, \n2. Zadanie 2, \n3. Zadanie 3',
			folderId: 1,
			id: 15,
		},
		{
			title: 'Nowa notatka',
			body: 'Tutaj wpisz treść swojej notatki',
			folderId: 1,
			id: 17,
		},
	]);

	const folderId = 2;

	return (
		<NotesContainer>
			<Notes>
				<TopBar>
					<Title>Notatki</Title>

					<AddNewButton>+</AddNewButton>
				</TopBar>

				{notes
					.filter((note) => note.folderId === folderId)
					.map((note, idx) => (
						<ShortNote role='listitem' key={idx} note={note}></ShortNote>
					))}
			</Notes>
			<Note />
		</NotesContainer>
	);
}
