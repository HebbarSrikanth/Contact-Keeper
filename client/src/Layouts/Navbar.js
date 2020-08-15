import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'
import ContactContext from '../context/contacts/contactContext'


const Navbar = ({ title, icon }) => {

    const authContext = useContext(AuthContext)
    const { isAuthenticated, user, logout } = authContext

    const contactContext = useContext(ContactContext)
    const { clearContacts } = contactContext

    const handleLogout = () => {
        logout()
        clearContacts()
    }

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li><a href="#!" onClick={handleLogout}>Logout</a></li>
        </Fragment>
    )

    const guestLink = (
        <Fragment>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </Fragment>
    )

    return (
        <Fragment>
            <div className="navbar bg-primary">
                <h3><i className={icon} />{title}</h3>
                <ul>
                    {isAuthenticated ? authLinks : guestLink}
                </ul>
            </div>
        </Fragment>
    )
}

export default Navbar

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

Navbar.defaultProps = {
    title: 'Contact-Keeper',
    icon: 'fas fa-id-card-alt'
}
