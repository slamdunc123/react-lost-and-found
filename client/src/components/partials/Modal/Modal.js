import React from 'react';

const Modal = ({ title, body, setShowModal }) => {
	return (
		<div
			className='modal-backdrop'
			tabIndex='-1'
			role='dialog'
			style={{ display: 'block' }}
		>
			<div
				className='modal-dialog shadow 
                animate__animated
                animate__faster
			    animate__fadeInDown'
				role='document'
			>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>{title}</h5>
						<button
							type='button'
							className='close'
							data-dismiss='modal'
							aria-label='Close'
							onClick={() => setShowModal(false)}
						>
							<span aria-hidden='true'>&times;</span>
						</button>
					</div>
					<div className='modal-body'>
						<div className='col-12'>{body}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
