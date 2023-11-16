import { FoldersList } from './components/folders-list/FoldersList';
import { Layout } from './components/layout/Layout';
import { Outlet } from 'react-router-dom';

export function App() {
	return (
		<Layout>
			<FoldersList />
			<Outlet />
		</Layout>
	);
}
