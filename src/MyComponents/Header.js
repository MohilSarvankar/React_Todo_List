import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";

export default function Header(props) {
    let navigate = useNavigate();

    const logout = () => {
        props.setAuth(false);
        navigate("/login", { replace: true });
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {props.auth ?
                    <><Link className="navbar-brand" to="/home">{props.title}</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/todos">List of Todos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/randomTodo">Random Todo</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login" onClick={logout}>Logout</Link>
                                </li>
                            </ul>
                            {props.searchbar ? <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form> : ""}
                            <div className="form-check form-switch">
                                <input className="form-check-input" onChange={()=>{props.setLogState(!props.logState)}} type="checkbox" role="switch" id="logEnable"/>
                                    <label className="form-check-label" htmlFor="logEnable">Enable Logs</label>
                            </div>
                        </div></> :
                    <><Link className="navbar-brand" to="/login">{props.title}</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/signup">Signup</Link>
                                </li>
                            </ul>
                        </div></>
                }
            </div>
        </nav>
    )
}

Header.defaultProps = {
    title: "Your Title Here",
    searchbar: true,
}

Header.propTypes = {
    title: PropTypes.string,
    searchbar: PropTypes.bool.isRequired,
}

