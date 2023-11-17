import styles from './FoldersList.module.css';
import { NavLink, useLoaderData, Form, redirect } from 'react-router-dom';
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

// funkcja createFolder będzie wywoływana, gdy użytkownik utworzy nowy folder. W tym celu musimy przekazać ją jako parametr do ścieżki / w pliku front-end/src/main.jsx. W funkcji createFolder pobieramy dane z formularza i wysyłamy je do serwera.
export async function createFolder(args) {
	// args.request to obiekt request, który zawiera informacje o żądaniu HTTP. W tym przypadku chcemy pobrać dane z formularza, który został wysłany przez użytkownika
	const data = await args.request.formData();
	const folderName = data.get('folder-name');
	return fetch('http://localhost:3000/folders', {
		method: 'POST',
		body: JSON.stringify({
			name: folderName,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then((newFolder) => {
			return redirect(`/notes/${newFolder.id}`);
		});
}

export function FoldersList() {
	const folders = useLoaderData();
	// useLoaderData() zwraca dane, które zostały zwrócone przez funkcję loader przypisaną do ścieżki. W naszym przypadku jest to tablica folderów

	return (
		<Folders>
			<TopBar>
				<Form method='POST' action='/'>
					<input
						className={styles['new-folder-input']}
						type='text'
						placeholder='Nazwa folderu'
						name='folder-name'
					/>
					<AddNewButton type='submit'>+</AddNewButton>
				</Form>
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
