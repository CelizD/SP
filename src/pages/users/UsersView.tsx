import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const UsersView: React.FC = () => {
  const { users, setUsers, setEditingUser } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo
  React.useEffect(() => {
    const exampleUsers = [
      { id: '1', username: 'admin', email: 'admin@example.com', role: 'admin' as const },
      { id: '2', username: 'profesor1', email: 'teacher@example.com', role: 'teacher' as const },
      { id: '3', username: 'estudiante1', email: 'student@example.com', role: 'student' as const },
      { id: '4', username: 'profesor2', email: 'teacher2@example.com', role: 'teacher' as const },
      { id: '5', username: 'estudiante2', email: 'student2@example.com', role: 'student' as const },
    ];
    setUsers(exampleUsers);
  }, [setUsers]);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (user: any) => {
    setEditingUser(user);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'teacher': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'student': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="users-view">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">👥 Gestión de Usuarios</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Administra los usuarios del sistema
          </p>
        </div>
        
        <button className="mt-4 md:mt-0 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          + Nuevo Usuario
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
          <div className="absolute left-3 top-3 text-gray-400">
            🔍
          </div>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="font-medium dark:text-white">
                          {user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium dark:text-white">
                          {user.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-white">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                      {user.role === 'admin' && 'Administrador'}
                      {user.role === 'teacher' && 'Profesor'}
                      {user.role === 'student' && 'Estudiante'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                    >
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersView;