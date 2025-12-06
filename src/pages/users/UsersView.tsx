import React, { useState, useEffect } from 'react';
import { useAppContext, User } from '../../contexts/AppContext'; // <--- AQUÍ ESTABA EL ERROR (Faltaba "User")
import * as Icons from 'lucide-react';

const UsersView: React.FC = () => {
  const { users, setUsers, setEditingUser } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  // Datos de ejemplo
  useEffect(() => {
    // Ahora "User" ya está importado y no dará error
    const exampleUsers: User[] = [
      { id: '1', username: 'admin.sistema', email: 'admin@empresa.com', role: 'admin', status: 'active', lastLogin: 'Hace 2 min' },
      { id: '2', username: 'j.perez', email: 'juan.perez@escuela.edu', role: 'teacher', status: 'active', lastLogin: 'Hace 1 hora' },
      { id: '3', username: 'm.gonzalez', email: 'maria.g@alumno.edu', role: 'student', status: 'active', lastLogin: 'Ayer' },
      { id: '4', username: 'r.sanchez', email: 'roberto.s@escuela.edu', role: 'teacher', status: 'inactive', lastLogin: 'Hace 5 días' },
      { id: '5', username: 'l.torres', email: 'luis.t@alumno.edu', role: 'student', status: 'active', lastLogin: 'Hace 3 horas' },
    ];
    setUsers(exampleUsers);
  }, [setUsers]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100"><Icons.Shield className="w-3 h-3" /> Admin</span>;
      case 'teacher':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"><Icons.BookOpen className="w-3 h-3" /> Profesor</span>;
      case 'student':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100"><Icons.GraduationCap className="w-3 h-3" /> Estudiante</span>;
      default: return null;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Icons.Users className="w-6 h-6 text-blue-600" />
            Gestión de Usuarios
          </h1>
          <p className="text-slate-500 mt-1">Administración de cuentas y permisos del sistema.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-medium">
          <Icons.UserPlus className="w-4 h-4" /> Nuevo Usuario
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* COLUMNA IZQUIERDA: Tabla (Ocupa 3 columnas) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Barra de Filtros */}
          <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex gap-3">
            <div className="relative flex-1">
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select 
              className="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="all">Todos los roles</option>
              <option value="admin">Administradores</option>
              <option value="teacher">Profesores</option>
              <option value="student">Estudiantes</option>
            </select>
          </div>

          {/* Tabla */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Usuario</th>
                  <th className="px-6 py-3">Rol</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{user.username}</div>
                          <div className="text-slate-500 text-xs flex items-center gap-1">
                              <Icons.Mail className="w-3 h-3" /> {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active' ? 'text-green-700 bg-green-50' : 'text-slate-600 bg-slate-100'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                        {user.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingUser(user)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Editar">
                          <Icons.Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Eliminar">
                          <Icons.Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                No se encontraron usuarios con estos filtros.
              </div>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA: Resumen */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Tarjeta de Resumen */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Icons.Users className="w-4 h-4 text-slate-400" />
              Resumen
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-sm text-slate-600">Total Usuarios</span>
                <span className="font-bold text-slate-900 text-lg">{users.length}</span>
              </div>
              
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Por Rol</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 flex items-center gap-2"><Icons.Shield className="w-3 h-3 text-purple-500"/> Admin</span>
                    <span className="font-medium text-slate-900">{users.filter(u => u.role === 'admin').length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 flex items-center gap-2"><Icons.BookOpen className="w-3 h-3 text-blue-500"/> Profesores</span>
                    <span className="font-medium text-slate-900">{users.filter(u => u.role === 'teacher').length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 flex items-center gap-2"><Icons.GraduationCap className="w-3 h-3 text-emerald-500"/> Estudiantes</span>
                    <span className="font-medium text-slate-900">{users.filter(u => u.role === 'student').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersView;