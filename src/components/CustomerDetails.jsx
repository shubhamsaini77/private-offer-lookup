import React from "react"
import "../css/customer-details.css"
import {Link } from 'react-router-dom'

 const CustomerDetails = () => {

    const submitHandler =() => {}

    return<React.Fragment>    
    <div className="container" >
        <span >
            <h3 className='text'>Customer Name & Address</h3>
        </span>
        <form onSubmit={submitHandler}>
            <div className="wd-100">
                <span className="wd-50 pr-5">   
                    <label  className='wd-100'>First Name</label>
                    <input className='input-bx'></input>
                </span>
                <span className="wd-50 pl-5">
                    <label  className='wd-100 pl-5'>Last Name</label>
                    <input className='input-bx'></input>
                </span>
            </div>
         
                 <div>
                    <label className='wd-100'>Address</label>
                    <input className='input-bx'></input>
                </div>
                <div>
                    <label className='wd-100'>City</label>
                    <input className='input-bx'></input>
                </div>
                <div className="wd-100">
                <span className="wd-50 pr-5">   
                    <label  className='wd-100'>State</label>
                    <input className='input-bx'></input>
                </span>
                <span className="wd-50 pl-5">
                    <label  className='wd-100 pl-5'>ZIP</label>
                    <input className='input-bx'></input>
                </span>
            </div>
            <Link to="/lookupMethod"><button className='buttonCancel'>CANCEL</button></Link>
            
            <button className='buttonContinue'>CONTINUE</button>
        </form>
    </div>
    </React.Fragment>
 }
 export default CustomerDetails;