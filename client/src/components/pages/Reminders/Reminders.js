import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import RemindersForm from './RemindersForm';
import { useHistory } from 'react-router-dom';
import {
	getReminders,
	createReminder,
	deleteReminder,
	updateReminder,
} from '../../../redux/actions/reminderActions';
import { resetAlerts } from '../../../redux/actions/alertActions';
import Modal from '../../partials/Modal/Modal';

const Reminders = ({ location }) => {
	const alerts = useSelector((state) => state.alertReducer);
	console.log(location);
	const { token, isAuthenticated, user } = useSelector(
		(state) => state.authReducer
	);
	const reminders = useSelector((state) => state.reminderReducer.reminders); //gets from rootReducer which has reminderReducer imported
	const loading = useSelector((state) => state.reminderReducer.loading); //gets from rootReducer which has reminderReducer imported

	const dispatch = useDispatch();

	const [isEditing, setIsEditing] = useState(false);
	const [editedReminder, setEditedReminder] = useState({
		id: '',
		name: '',
		date: '',
	});
	const [updatedReminder, setUpdatedReminder] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const [reminderId, setReminderId] = useState();

	const getUserId = () => {
		console.log(user);
		let userId;
		if (user !== null) {
			userId = user._id;
		} else {
			userId = localStorage.getItem('userId');
		}
		return userId;
	};
	// console.log(user._id);

	const getItemId = () => {
		return location.itemId;
	};

	const handleCreate = (formData) => {
		setShowModal(false);
		setIsEditing(false);
		dispatch(createReminder(formData, getUserId(), getItemId()));
	};

	const handleAdd = () => {
		console.log('add reminder clicked');
		setShowModal(true);
		setIsEditing(false);
		setModalTitle('add');
	};

	const handleUpdate = (id, formData) => {
		setShowModal(false);
		setIsEditing(false);
		setUpdatedReminder(true);
		dispatch(updateReminder(id, formData));
	};

	const handleEdit = (id, name, date) => {
		setShowModal(true);
		setModalTitle('edit');
		setIsEditing(true);
		setEditedReminder({
			id: id,
			name: name,
			date: date,
		});
	};

	const handleDelete = () => {
		setShowModal(false);
		dispatch(deleteReminder(reminderId));
	};

	const handleRemove = (id) => {
		setReminderId(id);
		setShowModal(true);
		setModalTitle('delete');
	};

	const getModalBody = () => {
		return modalTitle === 'delete' ? (
			<>
				<h3>Are you sure?</h3>
				<hr />
				<button className='btn btn-danger' onClick={handleDelete}>
					Delete
				</button>
			</>
		) : (
			<RemindersForm
				isEditing={isEditing}
				editedReminder={editedReminder}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
			/>
		);
	};

	const getModal = () => {
		return (
			<Modal
				title={modalTitle}
				body={getModalBody()}
				setShowModal={setShowModal}
			/>
		);
	};

	useEffect(() => {
		dispatch(resetAlerts());
		dispatch(getReminders(getUserId(), getItemId()));
		setUpdatedReminder(false);
	}, [updatedReminder, dispatch]);

	return (
		<div className='container'>
			{showModal ? getModal() : false}
			<h3>Reminders</h3>
			<button
				className='btn'
				disabled={alerts.length > 0}
				onClick={handleAdd}
			>
				<i className='fas fa-plus-circle fa-lg text-success'></i>
			</button>
			<div className='table-responsive'>
				<table className='table'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{console.log(reminders)}
						{reminders.length > 0
							? reminders.map((item) => {
									return (
										<tr key={item._id}>
											<td>{item.name}</td>
											<td>
												{moment(item.date).format(
													'DD-MMM-yyyy'
												)}
											</td>
											<td>
												<button
													onClick={() =>
														handleEdit(
															item._id,
															item.name,
															item.date
														)
													}
													className='btn'
													disabled={alerts.length > 0}
												>
													<i className='fas fa-pencil-alt text-warning'></i>
												</button>
												<button
													onClick={() =>
														handleRemove(item._id)
													}
													className='btn'
													disabled={alerts.length > 0}
												>
													<i className='fas fa-trash text-danger'></i>
												</button>
											</td>
										</tr>
									);
							  })
							: 'No reminders for this item'}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Reminders;
