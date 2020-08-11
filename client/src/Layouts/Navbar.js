import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const Navbar = ({ title, icon }) => {
    return (
        <Fragment>
            <div className="navbar bg-primary">
                <h3><i className={icon} />{title}</h3>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
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
