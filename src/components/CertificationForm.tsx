// components/CertificationForm.tsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config/config';
import { Certification } from '../types';

export interface CertificationFormProps {
	isEdit?: boolean;
	certification?: Certification;
}

const CertificationForm: React.FC<CertificationFormProps> = ({
	isEdit = false,
	certification,
}) => {
	const [formData, setFormData] = useState<Certification>({
		certification_name: '',
		issuing_organization: '',
		description: '',
		...certification,
	});

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			if (isEdit) {
				await axios.put(
					`${BASE_URL}/api/certifications/${formData.certification_id}`,
					formData
				);
			} else {
				await axios.post(`${BASE_URL}/api/certifications`, formData);
			}
			navigate('/certifications');
		} catch (error) {
			console.error('Error submitting certification form:', error);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	return (
		<div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
			<h2 className="text-2xl font-bold mb-4">
				{isEdit ? 'Edit Certification' : 'Add Certification'}
			</h2>
			<form onSubmit={handleSubmit}>
				<label className="block mb-2">
					Name:
					<input
						type="text"
						name="certification_name"
						value={formData.certification_name}
						onChange={handleChange}
						className="form-input mt-1 p-2 border rounded w-full"
					/>
				</label>
				<label className="block mb-2">
					Issuing Organization:
					<input
						type="text"
						name="issuing_organization"
						value={formData.issuing_organization}
						onChange={handleChange}
						className="form-input mt-1 p-2 border rounded w-full"
					/>
				</label>
				<label className="block mb-2">
					Description:
					<input
						type="text"
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="form-input mt-1 p-2 border rounded w-full"
					/>
				</label>
				<button
					type="submit"
					className="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
				>
					{isEdit ? 'Update Certification' : 'Add Certification'}
				</button>
			</form>
		</div>
	);
};

export default CertificationForm;
