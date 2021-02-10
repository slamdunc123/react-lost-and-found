import React, { useContext } from 'react';
import { BrandContext } from '../../../context/context';

// styles
import './Brand.scss';

const Brand = () => {
	const brand = useContext(BrandContext);
	return <div className='brand-container'>{brand.name}</div>;
};

export default Brand;
