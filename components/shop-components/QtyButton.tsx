'use client';

import { useState } from 'react';
import { Button } from '../shadcn/ui/button';

const QtyButton = () => {
	const [qty, setQty] = useState(1);

	const changeQty = (change: string) => {
		if (change === 'minus' && qty > 1) {
			setQty(qty - 1);
		} else if (change === 'plus') {
			setQty(qty + 1);
		} else {
			setQty(1);
		}
	};

	return (
		<>
			<Button
				onClick={() => changeQty('minus')}
				className='w-1/3 rounded-l-full px-3 bg-gray-200 text-black font-bold'>
				-
			</Button>
			<p className='w-1/3 text-center'>{qty}</p>
			<Button
				onClick={() => changeQty('plus')}
				className='w-1/3 rounded-r-full px-3 bg-gray-200 text-black font-bold'>
				+
			</Button>
		</>
	);
};
export default QtyButton;
