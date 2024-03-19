import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import '../css/navbar.css'

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'transparent', outline: 'none' }}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex">
                        <Link to="/">
                            <Button variant="text" style={{ color: 'black' }}>{'𝐡⃥⃒̸𝐨⃥⃒̸𝐦⃥⃒̸𝐞⃥⃒̸'.toLowerCase()}</Button>
                        </Link>
                        <Link to="/about">
                            <Button variant="text" style={{ color: 'black' }}>{'𝐚⃥⃒̸𝐛⃥⃒̸𝐨⃥⃒̸𝐮⃥⃒̸𝐭⃥⃒̸'.toLowerCase()}</Button>
                        </Link>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;