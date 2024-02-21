import { FoldersList } from './components/folders-list/FoldersList';
import { Layout } from './components/layout/Layout';
import { Outlet } from 'react-router-dom';
import { useNavigation } from 'react-router-dom';
import { Loader } from './components/loader/Loader';

export function App() {
	// useNavigation zwraca obiekt, który zawiera informacje o aktualnym stanie nawigacji
	const { state } = useNavigation();
	// Outlet to komponent, który wyrenderuje komponent, który pasuje do aktualnej ścieżki. W naszym przypadku, jeśli ścieżka pasuje do /notes/:folderId, to wyrenderowany zostanie komponent NotesList
	return (
		<Layout>
			{(state === 'loading' || state === 'submitting') && <Loader />}
			<FoldersList />
			<Outlet />
		</Layout>
	);
}
