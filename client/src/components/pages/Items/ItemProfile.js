import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ItemsForm from './ItemsForm';
import Modal from '../../partials/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	getItems,
	deleteItem,
	updateItem,
} from '../../../redux/actions/itemActions';
import { resetAlerts } from '../../../redux/actions/alertActions';

const ItemProfile = () => {
	const dispatch = useDispatch();
	const items = useSelector((state) => state.itemReducer.items);
	const alerts = useSelector((state) => state.alertReducer);
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [editedItem, setEditedItem] = useState({
		id: '',
		name: '',
		desc: '',
	});
	const [updatedItem, setUpdatedItem] = useState(false);
	const [itemId, setItemId] = useState();

	const history = useHistory();
	const { location: pathname } = history;
	const pathUrl = pathname.pathname;
	const pathUrlLastItem = pathUrl.substring(pathUrl.lastIndexOf('/') + 1);
	console.log(pathUrlLastItem);

	const getUserId = () => {
		const userId = localStorage.getItem('userId');
		return userId;
	};

	const handleUpdate = (id, formData) => {
		setShowModal(false);
		setIsEditing(false);
		setUpdatedItem(true);
		dispatch(updateItem(id, formData));
	};

	const handleEdit = (id, name, desc, age, dob) => {
		setShowModal(true);
		setModalTitle('edit');
		setIsEditing(true);
		setEditedItem({
			id: id,
			name: name,
			desc: desc,
			age: age,
			dob: dob,
		});
	};

	const handleDelete = () => {
		setShowModal(false);
		dispatch(deleteItem(itemId));
		history.push('/items');
	};

	const handleRemove = (id) => {
		setItemId(id);
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
			<ItemsForm
				isEditing={isEditing}
				editedItem={editedItem}
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

	//TODO: not clear why this is fixing the refresh issue on a selected item profile page
	let item;
	if (items !== []) {
		item = items.find((item) => item._id === pathUrlLastItem);
	}

	useEffect(() => {
		dispatch(resetAlerts());
		dispatch(getItems(getUserId()));
		setUpdatedItem(false);
	}, [updatedItem, dispatch]);

	return (
		<>
			<div>Item Profile</div>
			{showModal ? getModal() : false}
			{item !== undefined ? (
				<div className='card'>
					<div className='text-center'>
						{item.imageFile ? (
							<img
								src={item.imageFile}
								alt=''
								class='rounded-circle'
								width='100'
								height='100'
							/>
						) : (
							<i className='fas fa-box-open fa-4x text-primary'></i>
						)}
					</div>
					<div className='card-body'>
						<h5 className='card-title text-center'>{item.name}</h5>
						<p className='card-text'>{item.desc}</p>
						<div className='row justify-content-center'>
							<button
								onClick={() =>
									handleEdit(
										item._id,
										item.name,
										item.desc,
										item.age,
										item.dob
									)
								}
								className='btn'
								disabled={alerts.length > 0}
							>
								<i className='fas fa-pencil-alt text-warning'></i>
							</button>
							<button
								onClick={() => handleRemove(item._id)}
								className='btn'
								disabled={alerts.length > 0}
							>
								<i className='fas fa-trash text-danger'></i>
							</button>
							<Link
								// className='badge badge-primary'
								className='btn'
								title='reminders'
								to={{
									pathname: '/reminders',
									itemId: pathUrlLastItem,
								}}
							>
								<i className='fas fa-clock text-info'></i>
							</Link>
						</div>
					</div>
				</div>
			) : (
				false
			)}
		</>
	);
};

export default ItemProfile;
