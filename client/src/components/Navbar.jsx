import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBook,
    faUsers,
    faCogs,
    faUser,
    faBookOpen,
    faPerson,
    faMoneyBill,
    faMoneyCheck,
    faCertificate,
    faScaleBalanced,
    faUserAlt,
    faMoneyBill1Wave,
    faComputer,
    faBookOpenReader,
    faBan,
    faBuildingUser,
    faSwatchbook,
    faDiagramProject,
    faHourglass,
    faInfo
} from '@fortawesome/free-solid-svg-icons';

import profilePicture from '../assets/usuario.webp';

function Navbar() {
    const { logout, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState({});
    const drawerRef = useRef(null);

    const handleLogout = async () => {
        Cookies.remove('token');
        await logout();
        navigate('/login');
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(prevState => !prevState); // Alterna el estado del drawer
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                setIsDrawerOpen(false); // Cierra el drawer si se hace clic fuera
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleSection = (section) => {
        setExpandedSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section], // Alterna la sección seleccionada
        }));
    };

    return (
        <>
            <nav className="bg-white dark:bg-gray-800 flex justify-between items-center py-5 px-10">
                <div className="flex items-center">
                    {isAuthenticated && (
                        <button
                            className="text-white bg-transparent hover:bg-transparent focus:ring-4 focus:ring-transparent font-medium rounded-lg text-sm p-2.5 dark:bg-transparent dark:hover:bg-transparent focus:outline-none dark:focus:ring-transparent"
                            type="button"
                            onClick={toggleDrawer} // Abre o cierra el drawer
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    )}
                    <Link to={'/'}>
                        {/* <h1 className="text-2xl font-bold ml-2">UTN Cisco Academy Management System</h1> */}
                        <h1 className="text-2xl font-semibold ml-2"> UTN CMS <span className="text-sm">v 0.0.5</span> </h1>
                    </Link>
                </div>
                <ul className="flex gap-x-4">
                    {isAuthenticated ? (
                        <>
                            <li className="pt-1">
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                                    <img className="w-6 h-6 rounded-full " src={profilePicture} alt="Profile Image" />
                                    <span className="pl-3">{user.userExists.name}</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="px-4 text-red-500 font-semibold">Cerrar Sesión</button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to={"/login"} className="px-4 py-1 text-indigo-500 font-semibold">Iniciar Sesión</Link>
                        </li>
                    )}
                </ul>
                {/* <ul className="flex gap-x-4">
                    {isAuthenticated ? (
                        <>
                            <li className="pt-1">
                                <button type="button" className="flex items-center text-white bg-gray-800 hover:bg-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition">
                                    <img className="w-6 h-6 rounded-full" src={profilePicture} alt="Profile Image" />
                                    <span className="pl-3">{user.userExists.name}</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition">
                                    Cerrar Sesión
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login" className="px-4 py-2 bg-indigo-500 text-white rounded-md font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition">
                                Iniciar Sesión
                            </Link>
                        </li>
                    )}
                </ul> */}

            </nav>

            {isAuthenticated && (
                <div
                    ref={drawerRef}
                    className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} bg-white w-64 dark:bg-gray-800 `}
                    tabIndex="-1"
                >
                    <div className="pb-7 ">
                        <button
                            className="w-full text-l        eft text-gray-700 dark:text-gray-300 py-2 flex items-center"
                            onClick={() => toggleSection("cursos")}
                        >
                            <FontAwesomeIcon icon={faBook} className="mr-2" />
                            Gestión de Cursos
                        </button>
                        {expandedSections.cursos && (
                            <ul className="pl-4">
                                <li><Link to="/courses" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faDiagramProject} className="mr-2" />Cursos</Link></li>
                                <li><Link to="/details" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faSwatchbook} className="mr-2" />Detalle</Link></li>
                                <li><Link to="/chapters" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faBookOpen} className="mr-2" />Capítulos</Link></li>
                                <li><Link to="/participants" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faUser} className="mr-2" />Participante</Link></li>
                                <li><Link to="/participant-types" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faPerson} className="mr-2" />Tipos de Participante</Link></li>
                                <li><Link to="/infos_utn" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faInfo} className="mr-2" />Info UTN</Link></li>
                                <li><Link to="/instructors" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faUserAlt} className="mr-2" />Instructor</Link></li>
                                <li><Link to="/detail-values" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faMoneyBill1Wave} className="mr-2" />Detalle de Valores</Link></li>

                            </ul>
                        )}
                    </div>
                    <div className="pb-7">
                        <button
                            className="w-full text-left text-gray-700 dark:text-gray-300 py-2 flex items-center"
                            onClick={() => toggleSection("detail")}
                        >
                            <FontAwesomeIcon icon={faCogs} className="mr-2" />
                            Gestión de Detalle
                        </button>
                        {expandedSections.detail && (
                            <ul className="pl-4">

                                <li><Link to="/payments" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faMoneyBill} className="mr-2" />Pagos </Link></li>
                                <li><Link to="/payment-types" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faMoneyCheck} className="mr-2" />Tipo de Pagos </Link></li>

                                <li><Link to="/certificates" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faCertificate} className="mr-2" />Certificados</Link></li>
                                <li><Link to="/schedules" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faHourglass} className="mr-2" />Horarios</Link></li>
                                <li><Link to="/modalities" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faCogs} className="mr-2" />Modalidades</Link></li>


                            </ul>
                        )}
                    </div>
                    <div className="pb-7">
                        <button
                            className="w-full text-left text-gray-700 dark:text-gray-300 py-2 flex items-center"
                            onClick={() => toggleSection("usuarios")}
                        >
                            <FontAwesomeIcon icon={faUsers} className="mr-2" />
                            Gestión de Usuarios
                        </button>
                        {expandedSections.usuarios && (
                            <ul className="pl-4">
                                <li><Link to="/#" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faUser} className="mr-2" />Usuarios <span className="text-amber-400">( prox )</span></Link></li>
                                <li><Link to="/roles" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faBuildingUser} className="mr-2" />Roles</Link></li>
                                <li><Link to="/permissions" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faBan} className="mr-2" />Permisos</Link></li>
                            </ul>
                        )}
                    </div>

                    <div className="pb-7">
                        <button
                            className="w-full text-left text-gray-700 dark:text-gray-300 py-2 flex items-center"
                            onClick={() => toggleSection("adicional")}
                        >
                            <FontAwesomeIcon icon={faCogs} className="mr-2" />
                            Gestión Adicional
                        </button>
                        {expandedSections.adicional && (
                            <ul className="pl-4">
                                <li><Link to="#" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faBookOpenReader} className="mr-2" />Convenios <span className="text-amber-400">( prox )</span></Link></li>
                                <li><Link to="#" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faComputer} className="mr-2" />Activos <span className="text-amber-400">( prox )</span></Link></li>
                                <li><Link to="#" className="block py-1 text-gray-500 dark:hover:text-white" onClick={() => setIsDrawerOpen(false)}><FontAwesomeIcon icon={faScaleBalanced} className="mr-2" />Auditoria <span className="text-amber-400">( prox )</span></Link></li>
                            </ul>
                        )}
                    </div>

                </div>
            )}
        </>
    );
}

export default Navbar;
