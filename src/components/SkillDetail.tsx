// components/SkillDetail.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import { Skill } from '../types';

const SkillDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [skill, setSkill] = useState<Skill | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchSkill = async () => {
			try {
				const response = await axios.get<Skill>(`${BASE_URL}/api/skills/${id}`);
				setSkill(response.data);
			} catch (error) {
				console.error('Error fetching skill:', error);
			}
		};

		fetchSkill();
	}, [id]);

	const handleDelete = async () => {
		try {
			await axios.delete(`${BASE_URL}/api/skills/${id}`);
			navigate('/skills');
		} catch (error) {
			console.error('Error deleting skill:', error);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-8">
			{skill ? (
				<div className="bg-white p-6 rounded shadow">
					<h2 className="text-2xl font-bold mb-4">Skill Details</h2>
					<p className="mb-2">
						<span className="font-bold">ID:</span> {skill.skill_id}
					</p>
					<p className="mb-2">
						<span className="font-bold">Name:</span> {skill.skill_name}
					</p>
					<p className="mb-4">
						<span className="font-bold">Description:</span> {skill.description}
					</p>

					{/* Update Button */}
					<Link
						to={`/skills/${id}/edit`}
						className="bg-yellow-500 text-white py-2 px-4 rounded mr-2 hover:bg-yellow-700 hover:text-white"
					>
						Update Skill
					</Link>

					{/* Delete Button */}
					<button
						onClick={handleDelete}
						className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 hover:text-white"
					>
						Delete Skill
					</button>

					<Link
						to="/skills"
						className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 ml-2 hover:text-white"
					>
						Back to Skills
					</Link>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default SkillDetail;
