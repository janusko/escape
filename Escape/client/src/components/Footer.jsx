import React from 'react'
import '../styles/footer.css'
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div className="footer">
            <p>© 2022 Escape by Lee .D | Jingwen .L | Ryan .J | Caroline .D</p>
            <Link to="/chatHome" id='chat'>CHAT</Link>
        </div>
    )
}

