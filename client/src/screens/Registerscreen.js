import React, {useState, useEffect} from 'react';

export default function Registerscreen() {
	const [name, setname] = useState('');
	const [email, setemail] = useState('');
	const [password, setpassword] = useState('');
	const [cpassword, setcpassword] = useState('');

	function register() {
		if(password !== cpassword) {
			alert("Passwords do not match");
		} else {
			const user = {
				name,
				email,
				password
			}
			console.log(user);
		}
	}

	return (
		<div>
			<div className="row justify-content-center mt-5">
				<div className="col-md-5 mt-5 text-start">
					<h2 className='text-center m-3' style={{fontSize: '33px'}}>Register</h2>
					<div>
						<input required type="text" placeholder='Name' className='form-control' value={name} onChange={(e) => {setname(e.target.value)}} />
						<input required type="text" placeholder='Email' className='form-control' value={email} onChange={(e) => {setemail(e.target.value)}} />
						<input required type="text" placeholder='Password' className='form-control' value={password} onChange={(e) => {setpassword(e.target.value)}} />
						<input required type="text" placeholder='Confirm password' className='form-control' value={cpassword} onChange={(e) => {setcpassword(e.target.value)}} />
						<button className='btn mt-3' onClick={register}>Sign up</button>
					</div>
				</div>
			</div>
		</div>
  )
}
