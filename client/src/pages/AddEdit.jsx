import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom"
import "./AddEdit.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState = {
	name: "",
	lastname: "",
	contacts: "",
	wins: "",
	losses: "",
};

const AddEdit = () =>{
	const [state, setState]= useState(initialState);

	const {name, lastname, contacts, wins, losses} = state;

	const history = useNavigate();
	const {id} = useParams();

	useEffect(()=>{
		axios.get(`http://localhost:5000/api/get/${id}`).then((resp)=> setState({...resp.data[0]}));
	},[id]);

	const handleSubmit = (e) =>{
		e.preventDefault();
		// const nav = useNavigate()
		if (!name || !lastname || !contacts || !wins || !losses){
			toast.error("Please Provide value into each input field");
		} else {
		 if(!id){
			axios
				.post("http://localhost:5000/api/post", {
					name,
					lastname,
					contacts,
					wins,
					losses
			})
			.then(()=>{
				setState({name: "", lastname: "", contacts: "", wins: "", losses: ""});
				window.location('http://localhost:5000/')
			}).catch((err)=> toast.error(err.response.data));
			// nav(, { replace: true })
			

			toast.success("Player added successfully");
		 } else {
			axios
				.put(`http://localhost:5000/api/update/${id}`, {
					name,
					lastname,
					contacts,
					wins,
					losses
			})
			.then(()=>{
				setState({name: "", lastname: "", contacts: "", wins: "", losses: ""});
			}).catch((err)=> toast.error(err.response.data));

			toast.success("Player Updated successfully");
		 }
				
			setTimeout(()=>history.push("/"), 500);
		 } 
			
	};
	

	const handleInputChange = (e)=>{
		const {name, value} = e.target;
		setState({...state, [name]: value});
	};

	return (
		<div style={{marginTop: "100px"}}>
			<form style={{
					margin : "auto",
					padding : "15px",
					maxWidth : "520px",
					alignContent : "center"
				}} onSubmit={handleSubmit}>
				
				<div>
					<h1>Enter player stats down below</h1>
				</div>
				<div className="name">
					<label htmlFor="name">Name: </label>
					<input type="text" id="name" name="name" placeholder="Enter your name..." value={name || ""} onChange={handleInputChange}/>
				</div>

				<div className="name">
					<label htmlFor="lastname">Lastname: </label>
					<input type="lastname" id="lastname" name="lastname" placeholder="Enter your lastname..." value={lastname || ""} onChange={handleInputChange}/>
				</div>

				<div className="name">
					<label htmlFor="contacts">Contacts: </label>
					<input type="number" id="contacts" name="contacts" placeholder="Enter your contact..." value={contacts || ""} onChange={handleInputChange}/>
				</div>

				<div className="name">
					<label htmlFor="wins">Wins: </label>
					<input type="number" id="wins" name="wins" placeholder="Enter your wins scores..." value={wins || ""} onChange={handleInputChange}/>
				</div>


				<div className="name">
					<label htmlFor="losses">Losses: </label>
					<input type="number" id="losses" name="losses" placeholder="Enter your losses scores..." value={losses || ""} onChange={handleInputChange}/>
				</div>
				
				<div className="button">
					{/* <Link to ="/"> */}
					<input type="submit" value={id ? "Update" : "Save"}/>
					{/* </Link> */}
					<Link to ="/">
						<input type="button" value="Go Back" style={{width: "250px"}}/>
					</Link>
				</div>
			</form>
		</div>
	);
}

export default AddEdit;