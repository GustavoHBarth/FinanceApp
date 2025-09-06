import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import SideBar from '../SideBar/sideBar';

export default function AppLayout() {
	return (
		<div className="container">
			<Header />
			<main style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 'calc(100vh - 64px)' }}>
				<SideBar />
				<div style={{ padding: 16 }}>
					<Outlet />
				</div>
			</main>
		</div>
	)
}


