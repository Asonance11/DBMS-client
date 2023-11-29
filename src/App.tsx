// App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CareerDetail from './components/CareerDetail';
import CareerForm from './components/CareerForm';
import CareersList from './components/CareersList';
import CertificationDetail from './components/CertificationDetail';
import CertificationForm from './components/CertificationForm';
import CertificationsList from './components/CertificationsList';
import HomePage from './components/HomePage';
import Sidebar from './components/Sidebar';
import SkillDetail from './components/SkillDetail';
import SkillForm from './components/SkillForm';
import SkillsList from './components/SkillsList';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<div className="flex">
				<Sidebar />
				<div className="flex-1 p-4">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/skills" element={<SkillsList />} />
						<Route path="/skills/:id" element={<SkillDetail />} />
						<Route
							path="/skills/:id/edit"
							element={<SkillForm isEdit={true} />}
						/>
						<Route path="/skills/new" element={<SkillForm />} />

						<Route path="/certifications" element={<CertificationsList />} />
						<Route
							path="/certifications/:id"
							element={<CertificationDetail />}
						/>
						<Route
							path="/certifications/:id/edit"
							element={<CertificationForm isEdit />}
						/>
						<Route path="/certifications/new" element={<CertificationForm />} />

						<Route path="/careers" element={<CareersList />} />
						<Route path="/careers/:id" element={<CareerDetail />} />
						<Route
							path="/careers/:id/edit"
							element={<CareerForm isEdit={true} />}
						/>
						<Route path="/careers/new" element={<CareerForm />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
