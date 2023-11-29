// components/SkillForm.tsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import { Skill } from '../types';

export interface SkillFormProps {
	isEdit?: boolean;
	skill?: Skill;
}

const SkillForm: React.FC<SkillFormProps> = ({ isEdit = false, skill }) => {
	const [formData, setFormData] = useState<Skill>({
		skill_name: '',
		description: '',
		...skill,
	});

	const { id } = useParams();

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (isEdit) {
				await axios.put(`${BASE_URL}/api/skills/${id}`, formData);
			} else {
				await axios.post(`${BASE_URL}/api/skills`, formData);
			}
			navigate('/skills');
		} catch (error) {
			console.error('Error submitting skill form:', error);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	return (
		<div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
			<h2 className="text-2xl font-bold mb-4">
				{isEdit ? 'Edit Skill' : 'Add Skill'}
			</h2>
			<form onSubmit={handleSubmit}>
				<label className="block mb-2">
					Name:
					<input
						className="form-input mt-1 p-2 border rounded w-full"
						type="text"
						name="skill_name"
						value={formData.skill_name}
						onChange={handleChange}
					/>
				</label>
				<label className="block mb-2">
					Description:
					<input
						className="form-input mt-1 p-2 border rounded w-full"
						type="text"
						name="description"
						value={formData.description}
						onChange={handleChange}
					/>
				</label>
				<button
					type="submit"
					className="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
				>
					{isEdit ? 'Update Skill' : 'Add Skill'}
				</button>
			</form>
		</div>
	);
};

export default SkillForm;
