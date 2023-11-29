// components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
	return (
		<div className="bg-blue-800 text-white p-4 min-h-screen">
			<h2 className="text-xl font-bold mb-4">Navigation</h2>
			<ul className="space-y-2">
				<li>
					<Link
						to="/skills"
						className="block p-2 text-white hover:text-white hover:bg-blue-700"
					>
						Skills
					</Link>
				</li>
				<li>
					<Link
						to="/certifications"
						className="block p-2 text-white hover:text-white hover:bg-blue-700"
					>
						Certifications
					</Link>
				</li>
				<li>
					<Link
						to="/careers"
						className="block p-2 text-white hover:text-white hover:bg-blue-700"
					>
						Careers
					</Link>
				</li>
				<li>
					<Link
						to="/careers/new"
						className="block p-2 text-white hover:text-white hover:bg-blue-700"
					>
						Create Career
					</Link>
				</li>
				<li>
					<Link
						to="/skills/new"
						className="block p-2 text-white hover:text-white hover:bg-blue-700"
					>
						Create Skills
					</Link>
				</li>
				<li>
					<Link
						to="/certifications/new"
						className="block p-2 text-white hover:text-white hover:bg-blue-700"
					>
						Create Certifications
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
