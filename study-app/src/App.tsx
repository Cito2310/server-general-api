import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MateriasPage } from './materias/MateriasPage';
import { UnidadesPage } from './unidades/UnidadesPage';
import { TemasPage } from './temas/TemasPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MateriasPage />} />
                <Route path="/materias/:materiaId" element={<UnidadesPage />} />
                <Route path="/unidades/:unidadId" element={<TemasPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
