// components/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
	return (
		<div className="bg-gray-100 h-screen">
			{/* Header */}
			<header className="bg-blue-500 text-white py-4">
				<div className="container mx-auto">
					<h1 className="text-3xl font-bold">
						Career Guidance Information System
					</h1>
				</div>
			</header>

			{/* Main Content */}
			<div className="container mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
				<h2 className="text-2xl font-bold mb-4">
					Welcome to the Career Guidance System
				</h2>
				<p className="mb-4">
					Explore career paths, discover skills, certifications, and find
					valuable information for your professional growth.
				</p>

				<div className="flex space-x-4">
					<Link
						to="/careers"
						className="flex-1 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700 hover:text-white"
					>
						Explore Careers
					</Link>
					<Link
						to="/skills"
						className="flex-1 bg-green-500 text-white p-3 rounded-md hover:bg-green-700 hover:text-white"
					>
						Explore Skills
					</Link>
					<Link
						to="/certifications"
						className="flex-1 bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-700 hover:text-white"
					>
						Explore Certifications
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
