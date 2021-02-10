import React from 'react';

import Modal from './Modal';

export default {
	title: 'Example/Modal',
	component: Modal,
};

export const MainView = () => <Modal />;

MainView.storyName = 'Main View';

export const WithTitle = () => {
	const title = 'Title';

	return <Modal title={title} />;
};

WithTitle.storyName = 'With title';
