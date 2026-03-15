import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SubjectsPage } from './subjects/SubjectsPage';
import { UnitsPage } from './units/UnitsPage';
import { TopicsPage } from './topics/TopicsPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SubjectsPage />} />
                <Route path="/subjects/:subjectId" element={<UnitsPage />} />
                <Route path="/units/:unitId" element={<TopicsPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
