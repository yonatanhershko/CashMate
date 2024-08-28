import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { useState } from 'react'

export function AppHeader() {
	const navigate = useNavigate()
	const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false)
	const [isHamburgerMenuAnimating, setIsHamburgerMenuAnimating] = useState(false)


	function toggleHamburgerMenu() {
		if (isHamburgerMenuAnimating) return

		setIsHamburgerMenuAnimating(true)
		setIsHamburgerMenuOpen(!isHamburgerMenuOpen)

		if (!isHamburgerMenuOpen) {
			document.body.classList.add('no-scroll')
		} else {
			document.body.classList.remove('no-scroll')
		}

		setTimeout(() => {
			setIsHamburgerMenuAnimating(false)
		}, 500)
	}

	return (
		<header className="app-header main-layout ">
			<div className="header-info">
				<nav >
					<NavLink to="/" className="logo">
						Wallet
					</NavLink>
					<NavLink to="wallet" className="logo">
						My Wallet
					</NavLink>
					<article className="hamburger-container" onClick={toggleHamburgerMenu}>
						<div className={`hamburger ${isHamburgerMenuOpen ? 'is-open' : ''}`}>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</article>


				</nav>

			</div>

		</header>
	)
}
