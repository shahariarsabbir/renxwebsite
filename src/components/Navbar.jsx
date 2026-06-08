import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoHomeOutline } from 'react-icons/io5'
import { MdContactSupport } from 'react-icons/md'
import { IoMdContacts } from 'react-icons/io'

/* ─────────────────────────────────────────────
   Inline styles are kept as JS objects so the
   component stays dependency-light (no extra
   CSS file needed). Chakra's <Box>/<Text> have
   been replaced with plain elements so the nav
   works even if Chakra is removed later.
───────────────────────────────────────────── */

const LINKS = [
	{ to: '/home', label: 'Home', icon: <IoHomeOutline /> },
	{ to: '/courses', label: 'Courses', icon: <MdContactSupport /> },
	{ to: '/contact', label: 'Contact', icon: <IoMdContacts /> },
]

const BLUE = '#3182CE'
const BLUE_LIGHT = '#63B3ED'
const BLUE_ALPHA = 'rgba(49,130,206,0.2)'
const BLUE_BORDER = 'rgba(49,130,206,0.4)'

export default function Navbar() {
	const location = useLocation()
	const [scrolled, setScrolled] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const menuRef = useRef(null)

	/* ── scroll effect ── */
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 50)
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	/* ── viewport detection ── */
	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth < 768)
		check()
		window.addEventListener('resize', check)
		return () => window.removeEventListener('resize', check)
	}, [])

	/* ── close menu on route change ── */
	useEffect(() => {
		setMenuOpen(false)
	}, [location.pathname])

	/* ── close menu on outside click ── */
	useEffect(() => {
		if (!menuOpen) return
		const handler = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setMenuOpen(false)
			}
		}
		document.addEventListener('mousedown', handler)
		return () => document.removeEventListener('mousedown', handler)
	}, [menuOpen])

	/* ── lock body scroll when mobile menu open ── */
	useEffect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [menuOpen])

	const isActive = (to) => location.pathname === to

	/* ─── Shared nav bar wrapper ─── */
	const navStyle = {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		zIndex: 1000,
		transition:
			'background-color 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease',
		backgroundColor: scrolled || menuOpen ? ' transparent' : 'transparent',
		backdropFilter: scrolled || menuOpen ? 'blur(14px)' : 'none',
		WebkitBackdropFilter: scrolled || menuOpen ? 'blur(14px)' : 'none',
		borderBottom:
			scrolled || menuOpen ? '1px solid rgba(255,255,255,0.07)' : 'none',
		boxShadow: scrolled ? '0 4px 28px rgba(0,0,0,0.35)' : 'none',
	}

	const innerStyle = {
		maxWidth: '1100px',
		margin: '0 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: isMobile ? '0.875rem 1.25rem' : '1rem 2rem',
	}

	/* ─── Logo ─── */
	const Logo = () => (
		<Link to="/home" style={{ textDecoration: 'none', flexShrink: 0 }}>
			<span
				style={{
					fontSize: isMobile ? '1.4rem' : '1.6rem',
					fontWeight: 900,
					color: '#fff',
					letterSpacing: '-0.03em',
					fontFamily: "'Sora', 'DM Sans', sans-serif",
					userSelect: 'none',
				}}
			>
				REN
				<span
					style={{
						color: BLUE_LIGHT,
						textShadow: `0 0 18px ${BLUE_ALPHA}`,
					}}
				>
					X
				</span>
			</span>
		</Link>
	)

	/* ─── A single nav link pill ─── */
	const NavLink = ({ to, label, icon, onClick }) => {
		const active = isActive(to)
		const [hovered, setHovered] = useState(false)
		return (
			<Link to={to} onClick={onClick} style={{ textDecoration: 'none' }}>
				<span
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '0.4rem',
						padding: isMobile ? '0.75rem 1.25rem' : '0.5rem 1rem',
						borderRadius: '999px',
						fontSize: isMobile ? '0.95rem' : '0.9rem',
						fontWeight: 600,
						color: active ? '#fff' : hovered ? '#fff' : 'rgba(255,255,255,0.6)',
						backgroundColor: active
							? BLUE_ALPHA
							: hovered
								? 'rgba(255,255,255,0.08)'
								: 'transparent',
						border: `1px solid ${active ? BLUE_BORDER : 'transparent'}`,
						transition: 'all 0.2s ease',
						cursor: 'pointer',
						whiteSpace: 'nowrap',
						width: isMobile ? '100%' : 'auto',
					}}
				>
					<span style={{ fontSize: '1.05rem', flexShrink: 0 }}>{icon}</span>
					{label}
				</span>
			</Link>
		)
	}

	/* ─── CTA button ─── */
	const CTAButton = ({ fullWidth = false }) => {
		const [hovered, setHovered] = useState(false)
		return (
			<Link
				to="/courses"
				style={{
					textDecoration: 'none',
					display: fullWidth ? 'block' : 'inline-block',
				}}
			>
				<span
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '0.35rem',
						padding: fullWidth ? '0.875rem 1.25rem' : '0.5rem 1.25rem',
						borderRadius: '999px',
						background: hovered
							? `linear-gradient(135deg, #2b6cb0, ${BLUE_LIGHT})`
							: `linear-gradient(135deg, ${BLUE}, ${BLUE_LIGHT})`,
						color: '#fff',
						fontWeight: 700,
						fontSize: fullWidth ? '1rem' : '0.9rem',
						cursor: 'pointer',
						boxShadow: hovered
							? '0 6px 22px rgba(49,130,206,0.55)'
							: '0 4px 14px rgba(49,130,206,0.38)',
						transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
						transition: 'all 0.2s ease',
						whiteSpace: 'nowrap',
						width: fullWidth ? '100%' : 'auto',
					}}
				>
					Get Started <span style={{ fontSize: '1rem' }}>→</span>
				</span>
			</Link>
		)
	}

	/* ─── Hamburger icon ─── */
	const Hamburger = () => (
		<button
			onClick={() => setMenuOpen((v) => !v)}
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={menuOpen}
			style={{
				background: 'none',
				border: '1px solid rgba(255,255,255,0.15)',
				borderRadius: '10px',
				padding: '0.45rem 0.55rem',
				cursor: 'pointer',
				display: 'flex',
				flexDirection: 'column',
				gap: '5px',
				alignItems: 'center',
				justifyContent: 'center',
				transition: 'border-color 0.2s',
			}}
		>
			{[0, 1, 2].map((i) => (
				<span
					key={i}
					style={{
						display: 'block',
						width: '20px',
						height: '2px',
						borderRadius: '2px',
						backgroundColor: '#fff',
						transition: 'transform 0.3s ease, opacity 0.3s ease',
						transform: menuOpen
							? i === 0
								? 'translateY(7px) rotate(45deg)'
								: i === 2
									? 'translateY(-7px) rotate(-45deg)'
									: 'scaleX(0)'
							: 'none',
						opacity: menuOpen && i === 1 ? 0 : 1,
					}}
				/>
			))}
		</button>
	)

	/* ─── Mobile drawer ─── */
	const MobileMenu = () => (
		<>
			{/* Backdrop */}
			<div
				onClick={() => setMenuOpen(false)}
				style={{
					position: 'fixed',
					inset: 0,
					zIndex: 998,
					backgroundColor: 'rgba(0,0,0,0.45)',
					opacity: menuOpen ? 1 : 0,
					pointerEvents: menuOpen ? 'auto' : 'none',
					transition: 'opacity 0.3s ease',
				}}
			/>

			{/* Drawer panel */}
			<div
				style={{
					position: 'fixed',
					top: 0,
					right: 0,
					height: '100dvh',
					width: 'min(280px, 82vw)',
					zIndex: 999,
					backgroundColor: 'rgba(8,12,26,0.97)',
					backdropFilter: 'blur(20px)',
					WebkitBackdropFilter: 'blur(20px)',
					borderLeft: '1px solid rgba(255,255,255,0.08)',
					boxShadow: '-12px 0 40px rgba(0,0,0,0.5)',
					transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
					transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
					display: 'flex',
					flexDirection: 'column',
					padding: '1.5rem 1.25rem',
					gap: '0.5rem',
					overflowY: 'auto',
				}}
			>
				{/* Drawer header */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						marginBottom: '1.5rem',
					}}
				>
					<Logo />
					<button
						onClick={() => setMenuOpen(false)}
						aria-label="Close menu"
						style={{
							background: 'rgba(255,255,255,0.07)',
							border: '1px solid rgba(255,255,255,0.1)',
							borderRadius: '8px',
							color: '#fff',
							width: '36px',
							height: '36px',
							fontSize: '1.1rem',
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						✕
					</button>
				</div>

				{/* Nav links */}
				{LINKS.map(({ to, label, icon }) => (
					<NavLink
						key={to}
						to={to}
						label={label}
						icon={icon}
						onClick={() => setMenuOpen(false)}
					/>
				))}

				{/* Divider */}
				<div
					style={{
						height: '1px',
						backgroundColor: 'rgba(255,255,255,0.08)',
						margin: '0.5rem 0',
					}}
				/>

				{/* CTA */}
				<CTAButton fullWidth />

				{/* Footer note */}
				<p
					style={{
						marginTop: 'auto',
						paddingTop: '2rem',
						fontSize: '0.75rem',
						color: 'rgba(255,255,255,0.25)',
						textAlign: 'center',
						lineHeight: 1.5,
					}}
				>
					© {new Date().getFullYear()} RENX. All rights reserved.
				</p>
			</div>
		</>
	)

	/* ─── Render ─── */
	return (
		<>
			<nav style={navStyle} ref={menuRef}>
				<div style={innerStyle}>
					<Logo />

					{isMobile ? (
						/* Mobile: logo + hamburger */
						<Hamburger />
					) : (
						/* Desktop: inline links + CTA */
						<div
							style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
						>
							{LINKS.map(({ to, label, icon }) => (
								<NavLink key={to} to={to} label={label} icon={icon} />
							))}
							<div style={{ marginLeft: '0.75rem' }}>
								<CTAButton />
							</div>
						</div>
					)}
				</div>
			</nav>

			{/* Mobile slide-in drawer (rendered outside nav for correct stacking) */}
			{isMobile && <MobileMenu />}
		</>
	)
}
