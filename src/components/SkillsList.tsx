// components/SkillsList.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import { Skill } from '../types';

const SkillsList: React.FC = () => {
	const [skills, setSkills] = useState<Skill[]>([]);

	useEffect(() => {
		const fetchSkills = async () => {
			try {
				const response = await axios.get<Skill[]>(`${BASE_URL}/api/skills`);
				setSkills(response.data);
			} catch (error) {
				console.error('Error fetching skills:', error);
			}
		};

		fetchSkills();
	}, []);

	return (
		<div className="max-w-2xl mx-auto mt-8">
			<h2 className="text-2xl font-bold mb-4">Skills List</h2>
			<ul>
				{skills.map((skill) => (
					<li key={skill.skill_id} className="mb-2">
						<Link
							to={`/skills/${skill.skill_id}`}
							className="block bg-white p-4 rounded shadow-md transition duration-300 hover:bg-gray-100"
						>
							{skill.skill_name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SkillsList;
