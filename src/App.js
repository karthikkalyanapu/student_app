import React from 'react';
import './App.css';
import Select from 'react-select';
import { useState, useEffect } from 'react';
import axios from 'axios'
import DropDown from './components/dropDown';

function App() {

    const [studentName, setStudentName] = useState("");
	const [rollNo, setRollNo] = useState("");
	const [phone, setPhoneNo] = useState("");

	const [studentId, setStudentId] = useState({});
	const [editingStudentDetails, setEditingStudentDetails] = useState({studentName: '', rollNo: '', phone: ''});
	const [subjectId, setSubjectId] = useState("");
	const [marks, setMarks] = useState("");
	const [year, setYear] = useState(new Date().getFullYear()); //new Date().getFullYear()

// const [selectedSubject, setSelectedOption] = useState("");

	const [studentList, setStudentList] = useState([]);
	const [marksList, setMarksList] = useState([]);
	const [subjectList, setSubjectList] = useState([]);

	useEffect(() => getStudentsList(), [])

	useEffect(() => getMarksList(), [])

	useEffect(() => getSubjectsList(), [])


	const getStudentsList = () => {
		axios.get('http://localhost:5000/app/students').then((response) => {
			setStudentList(response.data)
			console.log("response from students", response.data)
		})
	}

	const getMarksList = () => {
		axios.get('http://localhost:5000/app/marks').then((response) => {
			setMarksList(response.data)
			console.log("response of student Marks", response.data)
		})
	}

	const getSubjectsList = () => {
		axios.get('http://localhost:5000/app/subjects').then((response) => {
			setSubjectList(response.data)
			console.log("response of subjects", response.data)
		})
	}

	const submitMarks = () => {
		console.log('subjectId: ', subjectId, 'subjectId: ', subjectId);
		axios.post('http://localhost:5000/app/marks',
			{
				student: studentId,
				subject: subjectId,
				marks: marks,
				year: year,
			}
		).then(() => {
			console.log("success")
		}).catch((err) => {
			console.log("err in the route", err)
		})
		// console.log(studentId + subjectId + marks + year)
	}


	const submitData = () => {
		axios.post('http://localhost:5000/app/students',
			{
				studentName: studentName,
				rollNo: rollNo,
				phone: phone,
			}
		).then(() => {
			console.log("success")
		}).catch((err) => {
			console.log("err in the route", err)
		})
		console.log(studentName + rollNo + phone)
	}

	const updateStudent = () => {
		axios.post(`http://localhost:5000/app/students/update/${editingStudentDetails._id}`,
			editingStudentDetails
		).then((response) => {

			console.log(" response update", response)
			// return response;
		}).catch((err => {
			console.log("error to update", err)
		})
			// alert("Your file has being updated!")
		)
	}

	const deleteStudent = (id) => {
		axios.delete(`http://localhost:5000/app/students/delete/${id}`).then(() => {
			console.log("successfully deleted")
			getStudentsList();
			getMarksList();
		}).catch((err) => {
			console.log("err in the delete route", err)
		})
		alert("Your file has  been  deleted!")
	}

	const options = subjectList.map((val, key) => ({
		value: val.name,
		label: val.name,
		...val
	}))

	const studentListOptions = studentList.map((el, key) => ({
			value: el.studentName,
			label: el.studentName,
			...el }));
	
	const handleStudentChange = selectedOption => {
		setStudentId(selectedOption._id);
		// console.log(`Option selected:`, selectedOption);
		console.log('studentId: ', studentId, selectedOption._id);
	};
	const handleSubjectChange = selectedOption => {
		setSubjectId(selectedOption._id);
		console.log('subjectId: ', subjectId, selectedOption._id);
		// console.log(`Option selected:`, selectedOption);
	};

	// const onChange = e => {
	// 	console.log("selected value for Year:", e.target.value);
	// };

	return (
		<div>
			<div className="container">
				<div className="table-responsive">
					<div className="table-wrapper">
						<div className="table-title">
							<div className="row">
								<div className="col-xs-3">
									<h2>Students <b>Data</b></h2>
								</div>
								<div className="col-xs-3">
									<a href="#addStudentModal" className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Student</span></a>
								</div>
								<div className="col-xs-3">
									<a href="#addMarksModal" className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add Marks Student</span></a>
								</div>
								<div className="col-xs-3">
									<button type="button" className="btn btn-primary " data-toggle="modal" data-target="#myModal">
										View Students
									</button>
								</div>
							</div>
						</div>
						<table className="table table-striped table-hover">
							<thead>
								<tr>
									<th>StudentName</th>
									<th>Roll no</th>
									<th>Phone No</th>
									<th>Actions</th>
								</tr>
							</thead>
							{
								studentList.map((val, key) => {
									return <tbody key={key}>
										<tr>
											<td>{val.studentName}</td>
											<td>{val.rollNo}</td>
											<td>{val.phone}</td>
											{/* <td>{val.phone}</td> */}
											<td>
												<a href="#editStudentModal" className="edit"
													onClick={() => setEditingStudentDetails(val)}
													data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
												<a href="#deleteStudentModal" className="delete" onClick={() => deleteStudent(val._id)} data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
											</td>
										</tr>
									</tbody>
								})
							}

						</table>
					</div>
				</div>
			</div>

			{/* <!-- ADD Modal HTML --> */}
			<div id="addStudentModal" className="modal fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<form>
							<div className="modal-header">
								<h4 className="modal-title">Add Student</h4>
								<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							</div>
							<div className="modal-body">
								<div className="form-group">
									<label>StudentName</label>
									<input type="text" className="form-control" required onChange={(e) => { setStudentName(e.target.value) }} />
								</div>
								<div className="form-group">
									<label>Roll No</label>
									<input type="text" className="form-control" required onChange={(e) => { setRollNo(e.target.value) }} />
								</div>
								<div className="form-group">
									<label>Phone No</label>
									<input type="text" className="form-control" required onChange={(e) => { setPhoneNo(e.target.value) }} />
								</div>
							</div>
							<div className="modal-footer">
								<input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
								<button type="submit" className="btn btn-success" value="Add" onClick={submitData}>Submit</button>
								{/* <input type="submit" className="btn btn-success" value="Add"  onClick={submitData}/> */}
							</div>
						</form>
					</div>
				</div>
			</div>

			{/* <!-- ADD  MarksModal HTML --> */}
			<div id="addMarksModal" className="modal fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<form>
							<div className="modal-header">
								<h4 className="modal-title">Add Marks</h4>
								<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							</div>
							<div className="modal-body">
								{/* <div className="form-group">
									<label>StudentName</label>
									<input type="text" className="form-control" required onChange={(e) => {setStudentMarkName(e.target.value)}} />
								</div> */}
								<div className="dropdown">
									<label>StudentName</label>
									<Select
										className="dropdown-basic"
										onChange={handleStudentChange}
										options={studentListOptions}
									// value={studentListOptions.label}
								/>
								</div>
								<br />
								<div className="row">
									<div className="col-xs-6">
										<div className="dropdown">
											<label>Subject</label>
											<Select
												className="dropdown-basic"

												// value={options.label}
												onChange={handleSubjectChange}
												options={options}
											/>
										</div>
									</div>

									<div className="col-xs-6">
										<div className="form-group">
											<label>Year</label>
											<div>
												<DropDown setYear={setYear} />
											</div>
											{/* <input type="text" className="form-control" required onChange={(e) => { setPhoneNo(e.target.value) }} /> */}
										</div>
									</div>
								</div>
								<div className="form-group">
									<label>Marks</label>
									<input type="text" className="form-control" required onChange={(e) => { setMarks(e.target.value) }} />
								</div>
							</div>
							<div className="modal-footer">
								<input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
								<button className="btn btn-success" value="Add" onClick={submitMarks}>Submit</button>
								{/* <input type="submit" className="btn btn-success" value="Add"  onClick={submitData}/> */}
							</div>
						</form>
					</div>
				</div>
			</div>

			{/* <!-- ADD  EditModel HTML --> */}

			<div id="editStudentModal" className="modal fade">
				<div className="modal-dialog">
					<div className="modal-content">
						<form>
							<div className="modal-header">
								<h4 className="modal-title">Edit Student</h4>
								<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							</div>
							<div className="modal-body">
								<div className="form-group">
									<label>StudentName</label>
									<input type="text" value={editingStudentDetails.studentName} className="form-control" onChange={(e) => { setEditingStudentDetails({ ...editingStudentDetails, studentName: e.target.value }); }} />
								</div>
								<div className="form-group">
									<label>RollNO</label>
									<input type="text" value={editingStudentDetails.rollNo} className="form-control" onChange={(e) => { setEditingStudentDetails({ ...editingStudentDetails, rollNo: e.target.value }); }} />
								</div>

								<div className="form-group">
									<label>Phone</label>
									<input type="number" value={editingStudentDetails.phone} className="form-control" onChange={(e) => { setEditingStudentDetails({ ...editingStudentDetails, phone: e.target.value }); }} />
								</div>
							</div>
							<div className="modal-footer">
								<input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
								<button type="submit" className="btn btn-info" value="Save" onClick={updateStudent}>Save</button>
								{/* <input type="submit" className="btn btn-info" value="Save" onClick={updateStudent} /> */}

							</div>
						</form>
					</div>
				</div>
			</div>

			{/* <!-- View Modal HTML --> */}

			<div className="modal" id="myModal">
				<div className="modal-dialogs">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Students Data
							</h4>
							<button type="button" className="close" data-dismiss="modal">&times;</button>
						</div>
						<div className="modal-body">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>StudentName</th>
										<th>Subject</th>
										<th>Marks</th>
										<th>Year</th>
									</tr>
								</thead>
								{
									marksList.map((val, key) => {
										return <tbody key={key}>
											<tr>
											<td>{val.student.studentName}</td> 
												<td>{val.subject.name}</td>
												<td>{val.marks}</td>
												<td>{val.year}</td>
												{/* <td>{new Date(val.year).getFullYear()}</td> */}
											</tr>
										</tbody>
									})
								}
							</table>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

}


export default App;
