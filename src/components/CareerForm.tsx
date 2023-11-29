// components/CareerForm.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import { Career } from '../types';

export interface CareerFormProps {
	isEdit?: boolean;
	career?: Career;
}

const CareerForm: React.FC<CareerFormProps> = ({ isEdit = false, career }) => {
	const [formData, setFormData] = useState<Career>({
		title: '',
		description: '',
		salary_range: '',
		education_requirement: '',
		skills: [],
		certifications: [],
		...career,
	});

	const [allSkills, setAllSkills] = useState<
		{ skill_id: number; skill_name: string }[]
	>([]);
	const [allCertifications, setAllCertifications] = useState<
		{ certification_id: number; certification_name: string }[]
	>([]);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchSkillsAndCertifications = async () => {
			try {
				const [skillsResponse, certificationsResponse] = await Promise.all([
					axios.get<{ skill_id: number; skill_name: string }[]>(
						`${BASE_URL}/api/skills`
					),
					axios.get<{ certification_id: number; certification_name: string }[]>(
						`${BASE_URL}/api/certifications`
					),
				]);
				setAllSkills(skillsResponse.data);
				setAllCertifications(certificationsResponse.data);
			} catch (error) {
				console.error('Error fetching skills and certifications:', error);
			}
		};

		fetchSkillsAndCertifications();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (isEdit) {
				await axios.put(`/api/careers/${formData.career_id}`, formData);
			} else {
				// Modify the structure of the data before sending
				const dataToSend = {
					...formData,
					skills: formData.skills || [], // Ensure skills is an array
					certifications: formData.certifications || [], // Ensure certifications is an array
				};

				const response = await axios.post(
					`${BASE_URL}/api/careers`,
					dataToSend
				);
				navigate(`/careers/${response.data.career_id}`);
			}
		} catch (error) {
			console.error('Error submitting career form:', error);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, options } = e.target;
		const selectedOptions = Array.from(options)
			.filter((option) => option.selected)
			.map((option) => Number(option.value)); // Convert the values to numbers
		setFormData((prevData) => ({ ...prevData, [name]: selectedOptions }));
	};

	return (
		<div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
			<h2 className="text-2xl font-bold mb-4">
				{isEdit ? 'Edit Career' : 'Add Career'}
			</h2>
			<form onSubmit={handleSubmit}>
				<label className="block mb-2">
					Title:
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						className="w-full mt-1 p-2 border rounded"
					/>
				</label>
				<br />
				<label className="block mb-2">
					Description:
					<input
						type="text"
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="w-full mt-1 p-2 border rounded"
					/>
				</label>
				<br />
				<label className="block mb-2">
					Salary Range:
					<input
						type="text"
						name="salary_range"
						value={formData.salary_range}
						onChange={handleChange}
						className="w-full mt-1 p-2 border rounded"
					/>
				</label>
				<br />
				<label className="block mb-2">
					Education Requirement:
					<input
						type="text"
						name="education_requirement"
						value={formData.education_requirement}
						onChange={handleChange}
						className="w-full mt-1 p-2 border rounded"
					/>
				</label>
				<br />
				<label className="block mb-2">
					Skills:
					<select
						name="skills"
						multiple
						className="w-full mt-1 p-2 border rounded"
						value={(formData.skills || []).map(String)}
						onChange={handleSelectChange}
					>
						{allSkills.map((skill) => (
							<option key={skill.skill_id} value={Number(skill.skill_id)}>
								{skill.skill_name}
							</option>
						))}
					</select>
				</label>
				<br />
				<label className="block mb-2">
					Certifications:
					<select
						name="certifications"
						multiple
						className="w-full mt-1 p-2 border rounded"
						value={(formData.certifications || []).map(String)}
						onChange={handleSelectChange}
					>
						{allCertifications.map((certification) => (
							<option
								key={certification.certification_id}
								value={Number(certification.certification_id)}
							>
								{certification.certification_name}
							</option>
						))}
					</select>
				</label>
				<br />
				<button
					type="submit"
					className="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
				>
					{isEdit ? 'Update Career' : 'Add Career'}
				</button>
			</form>
		</div>
	);
};

export default CareerForm;
