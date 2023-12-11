import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header id="header" role='banner'>
            <div className='left'>
                <h1>webs</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>

                        </li>
                        <li>
                            <Link to="/List">Home</Link>

                        </li>
                        <li>
                            <Link to="/Write">Write</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='right'>
                <ul>
                    <li>
                        <Link to="/login">login</Link>
                    </li>
                    <li>
                        <Link to="/Join">join</Link>
                    </li>
                    <li>
                        <Link to="/logout">logout</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header
