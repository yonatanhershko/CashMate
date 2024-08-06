import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function AppHeader() {
	const navigate = useNavigate()

	return (
		<header className="app-header ">
			<div className='header-info main-layout'>
				<nav >
					<NavLink to="/" className="logo">
						Wallet
					</NavLink>
					<NavLink to="wallet" className="logo">
						My Wallet
					</NavLink>

				</nav>

			</div>

		</header>
	)
}
