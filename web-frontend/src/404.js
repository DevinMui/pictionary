import React from 'react'
import {Link} from 'react-router-dom'
const NotFound = () =>
<Link to="/" >
    <h1>Not found</h1>
    Click <span style={{color:'blue'}}>here</span> to go back to the home page.
</Link>
export default NotFound