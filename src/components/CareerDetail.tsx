// components/CareerDetail.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import { Career } from '../types';

const CareerDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [career, setCareer] = useState<Career | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCareer = async () => {
			try {
				const response = await axios.get<Career>(
					`${BASE_URL}/api/careers/${id}`
				);
				setCareer(response.data);
			} catch (error) {
				console.error('Error fetching career:', error);
			}
		};

		fetchCareer();
	}, [id]);

	const handleDelete = async () => {
		try {
			await axios.delete(`${BASE_URL}/api/careers/${id}`);
			navigate('/careers');
		} catch (error) {
			console.error('Error deleting career:', error);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
			{career ? (
				<div>
					<h2 className="text-2xl font-bold mb-4">Career Details</h2>
					<p className="mb-2">
						<span className="font-semibold">ID:</span> {career.career_id}
					</p>
					<p className="mb-2">
						<span className="font-semibold">Title:</span> {career.title}
					</p>
					<p className="mb-2">
						<span className="font-semibold">Description:</span>{' '}
						{career.description}
					</p>
					<p className="mb-2">
						<span className="font-semibold">Salary Range:</span>{' '}
						{career.salary_range}
					</p>
					<p className="mb-2">
						<span className="font-semibold">Education Requirement:</span>{' '}
						{career.education_requirement}
					</p>
					{Array.isArray(career.skills) && career.skills.length > 0 && (
						<div>
							<p className="mb-2">
								<span className="font-semibold">Skills:</span>{' '}
								{career.skills
									.filter((skill) => typeof skill === 'object')
									.map((skill) => (skill as any).skill_name) // Assuming any type for skill_name
									.join(', ')}
							</p>
						</div>
					)}
					{Array.isArray(career.certifications) &&
						career.certifications.length > 0 && (
							<div>
								<p className="mb-2">
									<span className="font-semibold">Certifications:</span>{' '}
									{career.certifications
										.filter(
											(certification) => typeof certification === 'object'
										)
										.map(
											(certification) =>
												(certification as any).certification_name // Assuming any type for certification_name
										)
										.join(', ')}
								</p>
							</div>
						)}
					{/* Link to Edit Career */}
					<Link
						to={`/careers/${id}/edit`}
						className="inline-block mr-4 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 hover:text-white"
					>
						Edit Career
					</Link>

					{/* Button to Delete Career */}
					<button
						onClick={handleDelete}
						className="inline-block p-2 bg-red-500 text-white rounded hover:bg-red-700 hover:text-white"
					>
						Delete Career
					</button>

					<Link
						to="/careers"
						className="block mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 hover:text-white"
					>
						Back to Careers
					</Link>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default CareerDetail;
