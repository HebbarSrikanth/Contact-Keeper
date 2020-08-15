import React, { useContext, useEffect } from 'react'
import Contact from '../components/contact/Contact'
import ContactForm from '../components/contact/ContactForm'
import ContactFilter from '../components/contact/ContactFilter'
import AuthContext from '../context/auth/authContext'

const Home = () => {

    const authContext = useContext(AuthContext)
    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='grid-2'>
            <div>
                <ContactForm />
            </div>
            <div className='card'>
                <ContactFilter />
                <Contact />
            </div>
        </div>
    )
}

export default Home
