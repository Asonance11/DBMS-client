// components/CareersList.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import { Career } from '../types';

const CareersList: React.FC = () => {
	const [careers, setCareers] = useState<Career[]>([]);

	useEffect(() => {
		const fetchCareers = async () => {
			try {
				const response = await axios.get<Career[]>(`${BASE_URL}/api/careers`);
				setCareers(response.data);
			} catch (error) {
				console.error('Error fetching careers:', error);
			}
		};

		fetchCareers();
	}, []);

	return (
		<div className="max-w-md mx-auto mt-8 p-4 border rounded shadow bg-white">
			<h2 className="text-2xl font-bold mb-4">Careers List</h2>
			<ul>
				{careers.map((career) => (
					<li key={career.career_id} className="mb-2">
						<Link
							to={`/careers/${career.career_id}`}
							className="block p-3 border rounded hover:bg-blue-100 transition duration-300"
						>
							{career.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CareersList;
