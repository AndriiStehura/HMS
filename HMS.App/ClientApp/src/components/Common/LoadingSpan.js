import React from "react"
import Spinner from "reactstrap/lib/Spinner"


const LoadingSpan = () =>
    <div className="d-flex justify-content-center">
        <Spinner animation="border">
            <span className="sr-only">Loading...</span>
        </Spinner>
    </div>

export default LoadingSpan