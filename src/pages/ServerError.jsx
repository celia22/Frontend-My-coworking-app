import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/Errors.css"

export default function InternalError() {
    return (
        <div >
          <Link to="/">
                <button>
                  Back
                </button>
            </Link>
            <h1>505 Internal Server Error</h1>
            <h2>It`s our fault (sorry)</h2>
            <img className="img_404"src="/images/errors/404.png" alt="page not found" />
            
        </div>
    )
}