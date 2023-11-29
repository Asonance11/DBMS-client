// components/CertificationDetail.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import { Certification } from '../types';

const CertificationDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [certification, setCertification] = useState<Certification | null>(
		null
	);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCertification = async () => {
			try {
				const response = await axios.get<Certification>(
					`${BASE_URL}/api/certifications/${id}`
				);
				setCertification(response.data);
			} catch (error) {
				console.error('Error fetching certification:', error);
			}
		};

		fetchCertification();
	}, [id]);

	const handleDelete = async () => {
		try {
			await axios.delete(`${BASE_URL}/api/certifications/${id}`);
			navigate('/certifications');
		} catch (error) {
			console.error('Error deleting certification:', error);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
			{certification ? (
				<div>
					<h2 className="text-2xl font-bold mb-4">Certification Details</h2>
					<p>
						<span className="font-bold">ID:</span>{' '}
						{certification.certification_id}
					</p>
					<p>
						<span className="font-bold">Name:</span>{' '}
						{certification.certification_name}
					</p>
					<p>
						<span className="font-bold">Issuing Organization:</span>{' '}
						{certification.issuing_organization}
					</p>
					<p>
						<span className="font-bold">Description:</span>{' '}
						{certification.description}
					</p>

					<div className="flex flex-col gap-2 ">
						{/* Edit Button */}
						<Link
							to={`/certifications/${id}/edit`}
							className="bg-yellow-500 text-white py-2 px-4 rounded text-left hover:bg-yellow-700 hover:text-white"
						>
							Edit Certification
						</Link>

						{/* Delete Button */}
						<button
							onClick={handleDelete}
							className="bg-red-500 text-white py-2 px-4 rounded text-left hover:bg-red-700 hover:text-white"
						>
							Delete Certification
						</button>

						<Link
							to="/certifications"
							className="bg-blue-500 text-white py-2 px-4 rounded text-left hover:bg-blue-700 hover:text-white"
						>
							Back to Certifications
						</Link>
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default CertificationDetail;
