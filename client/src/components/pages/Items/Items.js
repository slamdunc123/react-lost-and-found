import React, { useState, useEffect } from 'react';
import Spinner from '../../partials/Spinner/Spinner';
import ItemsForm from './ItemsForm';
import ItemRecord from './ItemRecord';
import ItemsTable from './ItemsTable';

import { useDispatch, useSelector } from 'react-redux';
import {
	getItems,
	createItem,
	deleteItem,
	updateItem,
} from '../../../redux/actions/itemActions';
import { resetAlerts } from '../../../redux/actions/alertActions';
import Modal from '../../partials/Modal/Modal';

const Items = () => {
	const alerts = useSelector((state) => state.alertReducer);
	const { token, isAuthenticated, user } = useSelector(
		(state) => state.authReducer
	);
	const items = useSelector((state) => state.itemReducer.items); //gets from rootReducer which has itemReducer imported
	const loading = useSelector((state) => state.itemReducer.loading); //gets from rootReducer which has itemReducer imported
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [editedItem, setEditedItem] = useState({
		id: '',
		name: '',
		desc: '',
		dob: '',
		age: '',
	});
	const [updatedItem, setUpdatedItem] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const [itemId, setItemId] = useState();
	const [display, setDisplay] = useState('records');

	const getUserId = () => {
		let userId;
		if (user !== null) {
			userId = user._id;
		} else {
			userId = localStorage.getItem('userId');
		}
		return userId;
	};

	const handleCreate = (formData) => {
		setShowModal(false);
		setIsEditing(false);
		dispatch(createItem(formData, getUserId()));
	};

	const handleAdd = () => {
		setShowModal(true);
		setIsEditing(false);
		setModalTitle('add');
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

	const handleDisplay = (e) => {
		const { value } = e.target;
		setDisplay(value);

		console.log(e.target.value);
	};

	const getItemRecordsDisplay = () => {
		return items.map((item) => (
			<div key={item._id} className='col-lg-4 col-sm-6 mb-4'>
				<ItemRecord
					item={item}
					handleRemove={handleRemove}
					handleEdit={handleEdit}
					handleAdd={handleAdd}
				/>
			</div>
		));
	};

	const getItemTableDisplay = () => (
		<ItemsTable
			items={items}
			handleRemove={handleRemove}
			handleEdit={handleEdit}
			handleAdd={handleAdd}
		/>
	);

	const getDisplay = () => {
		if (display === 'records') {
			return getItemRecordsDisplay();
		} else {
			return getItemTableDisplay();
		}
	};

	useEffect(() => {
		dispatch(resetAlerts());
		dispatch(getItems(getUserId()));
		setUpdatedItem(false);
	}, [updatedItem, dispatch]);

	return (
		<div className='container'>
			{showModal ? getModal() : false}
			<h3>Items</h3>
			<button
				className='btn'
				disabled={alerts.length > 0}
				onClick={handleAdd}
			>
				<i className='fas fa-plus-circle fa-lg text-success'></i>
			</button>
			<div className='custom-control custom-radio custom-control-inline'>
				<input
					type='radio'
					id='rd_1'
					name='rd'
					className='custom-control-input'
					value='records'
					onClick={handleDisplay}
					checked={display === 'records'}
				/>
				<label className='custom-control-label' htmlFor='rd_1'>
					Records
				</label>
			</div>
			<div className='custom-control custom-radio custom-control-inline'>
				<input
					type='radio'
					id='rd_2'
					name='rd'
					className='custom-control-input'
					value='table'
					onClick={handleDisplay}
					checked={display === 'table'}
				/>
				<label className='custom-control-label' htmlFor='rd_2'>
					Table
				</label>
			</div>
			<div className='row mt-4'>
				{loading ? (
					<Spinner />
				) : items.length > 0 ? (
					getDisplay()
				) : (
					<p>No items to display - please add one</p>
				)}
			</div>
		</div>
	);
};

export default Items;
