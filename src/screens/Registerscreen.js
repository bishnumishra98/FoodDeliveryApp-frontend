import React, {useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/userActions';
import Loading from '../components/Loading';
import Success from '../components/Success';
import Error from '../components/Error';

export default function Registerscreen() {
	const [name, setname] = useState('');
	const [email, setemail] = useState('');
	const [password, setpassword] = useState('');
	const [cpassword, setcpassword] = useState('');
	const registerstate = useSelector(state => state.registerUserReducer);
	const {error, loading, success} = registerstate;

	const dispatch = useDispatch();

	function register() {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if(!emailPattern.test(email)) {
			alert("Please enter a valid email");
		} else if(password !== cpassword) {
			alert("Passwords do not match");
		} else {
			const user = {
				name,
				email,
				password
			}
			console.log(user);
			dispatch(registerUser(user));
		}
	}

	return (
		<div>
			<div className="row justify-content-center mt-5">
				<div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-white rounded">
					{loading && (<Loading/>)}
					{success && (<Success success = 'User registered successfully. Please login now.'/>)}
					{error && (<Error error = 'This email is already registered'/>)}
					<h2 className='text-center m-3' style={{fontSize: '33px'}}>Register</h2>
					<div>
						<input required type="text" placeholder='Name' className='form-control' value={name} onChange={(e) => {setname(e.target.value)}} />
						<input required type="text" placeholder='Email' className='form-control' value={email} onChange={(e) => {setemail(e.target.value)}} />
						<input required type="text" placeholder='Password' className='form-control' value={password} onChange={(e) => {setpassword(e.target.value)}} />
						<input required type="text" placeholder='Confirm password' className='form-control' value={cpassword} onChange={(e) => {setcpassword(e.target.value)}} />
						<button className='btn mt-3 mb-3' onClick={register}>Sign up</button>
						<br />
						<a style={{color:'black'}} href="/login">Already have an account? Click here to login</a>
					</div>
				</div>
			</div>
		</div>
  	)
}
