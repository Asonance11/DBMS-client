// types.ts

export interface Skill {
	skill_id?: number;
	skill_name: string;
	description?: string;
}

export interface Certification {
	certification_id?: number;
	certification_name: string;
	issuing_organization: string;
	description: string;
}

export interface Career {
	career_id?: number;
	title: string;
	description?: string;
	salary_range?: string;
	education_requirement?: string;
	skills?: number[]; // Array of skill IDs associated with the career
	certifications?: number[]; // Array of certification IDs associated with the career
}

/*
	DUMMY DATA
	{
    title: 'Project Manager',
    description: 'Plan, execute, and close projects within defined constraints',
    salary_range: '$90,000 - $130,000',
    education_requirement: 'Bachelor\'s degree in Project Management',
    skills: [2],
    certifications: [2],
  },
  {
    title: 'Data Scientist',
    description: 'Analyze and interpret complex data sets to inform business decision-making',
    salary_range: '$100,000 - $140,000',
    education_requirement: 'Master\'s degree in Data Science',
    skills: [1, 3],
    certifications: [3],
  },
*/
