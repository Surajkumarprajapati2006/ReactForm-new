import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../context/ContextProvider'

function Sidebar() {
  const { user, isAuthenticated, logout } = useContext(userContext)

  // Role-keyed configuration for tabs. Keep this in-file per your request.
  const tabsByRole = {
    admin: [
      { key: 'adminDashboard', label: 'Admin Dashboard', to: '/adminDashboard' },
      { key: 'allUsers', label: 'All Users', to: '/adminDashboard/allusers' },
    ],
    owner: [
      { key: 'ownerDashboard', label: 'Owner Dashboard', to: '/ownerDashboard' },
      { key: 'addTurf', label: 'Add Turf', to: '/ownerDashboard/addturf' },
      { key: 'myTurfs', label: 'My Turfs', to: '/ownerDashboard/viewturf' },
    ],
    user: [
      { key: 'userDashboard', label: 'User Dashboard', to: '/userDashboard' },
      { key: 'viewTurfs', label: 'View Turfs', to: '/userDashboard/viewturf' },
      { key: 'myBooking', label: 'My Booking', to: '/userDashboard/mybooking' },
    ],
  
  }

  const role = user?.role || 'guest'

  // Fallback: show role-specific tabs if defined, otherwise show guest tabs
  const visibleTabs = tabsByRole[role] || tabsByRole['guest']

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Navigation</h2>
      </div>

      <ul className="space-y-1">
        {visibleTabs.map((tab) => (
          <li key={tab.key}>
            <Link to={tab.to} className="block px-3 py-2">{tab.label}</Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t pt-4">
        {isAuthenticated ? (
          <>
            <p className="text-sm mb-2">Signed in as <strong>{user?.email}</strong></p>
            <button onClick={logout} className="px-3 py-2 bg-red-600 text-white rounded">Logout</button>
          </>
        ) : (
          <div className="space-x-2">
            <Link to="/login" className="px-3 py-2 bg-blue-600 text-white rounded">Login</Link>
            <Link to="/register" className="px-3 py-2 border rounded">Register</Link>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar;
