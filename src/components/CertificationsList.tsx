// components/CertificationsList.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import { Certification } from '../types';

const CertificationsList: React.FC = () => {
	const [certifications, setCertifications] = useState<Certification[]>([]);

	useEffect(() => {
		const fetchCertifications = async () => {
			try {
				const response = await axios.get<Certification[]>(
					`${BASE_URL}/api/certifications`
				);
				setCertifications(response.data);
			} catch (error) {
				console.error('Error fetching certifications:', error);
			}
		};

		fetchCertifications();
	}, []);

	return (
		<div className="max-w-md mx-auto mt-8 p-4 border rounded shadow bg-white">
			<h2 className="text-2xl font-bold mb-4">Certifications List</h2>
			<ul className="list-disc pl-4">
				{certifications.map((certification) => (
					<li key={certification.certification_id} className="mb-2">
						<Link
							to={`/certifications/${certification.certification_id}`}
							className="block p-3 border rounded hover:bg-blue-100 transition duration-300"
						>
							{certification.certification_name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CertificationsList;
