import React from 'react';
import { render } from '@testing-library/react';
import Modal from './Modal';

test('renders Modal component', () => {
	const result = render(<Modal />);
});

test('renders Modal title', () => {
	const { getByText } = render(<Modal title='hello' />);
	expect(getByText(/hello/i)).toBeInTheDocument();
});
