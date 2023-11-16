import styles from './FoldersList.module.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Folder } from '../folder/Folder';
import { Title } from '../title/Title';
import { TopBar } from '../top-bar/TopBar';
import { AddNewButton } from '../add-new-button/AddNewButton';

const Folders = ({ children }) => (
	<div className={styles['folders-column']}>{children}</div>
);
const UserCreatedFolders = ({ children }) => (
	<div role='list' className={styles['folders-list']}>
		{children}
	</div>
);

export function FoldersList() {
	const [folders] = useState([
		{
			name: 'Listy',
			id: 1,
		},
		{
			name: 'Przemyślenia',
			id: 2,
		},
	]);

	return (
		<Folders>
			<TopBar>
				<input
					className={styles['new-folder-input']}
					type='text'
					placeholder='Nazwa folderu'
				/>
				<AddNewButton type='submit'>+</AddNewButton>
			</TopBar>

			<Title>Foldery</Title>
			<UserCreatedFolders>
				{folders.map((folder, id) => (
					// wyswietlimy notatki z folderu o id = folderId
					<NavLink to={`/notes/${folder.id}`} key={id}>
						{/* isActive to funkcja, która zwraca true, jeśli ścieżka jest aktywna. W naszym przypadku ścieżka jest aktywna, jeśli folder.id jest równy folderId. Dzięki temu będziemy mogli zaznaczyć aktywny folder na liście */}
						{({ isActive }) => {
							return <Folder active={isActive}>{folder.name}</Folder>;
						}}

						{/* <Folder>{folder.name}</Folder> */}
					</NavLink>
				))}
			</UserCreatedFolders>
			{/* <Folder icon="archive">Archiwum</Folder> */}
		</Folders>
	);
}

export default FoldersList;
