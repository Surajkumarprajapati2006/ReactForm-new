import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../context/ContextProvider'
import axios from 'axios'

function AdminDashboard() {
  const { allUsers, loading } = useContext(userContext)
  const [filteredUsers, setFilteredUsers] = useState([])
  const [owner, setOwner] = useState(null)

  // Dialog States
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [newName, setNewName] = useState("")

  useEffect(() => {
    if (allUsers && allUsers.length > 0) {
      const ownerData = allUsers.find(
        (user) => user.role === "owner" || user.role === "admin"
      )
      setOwner(ownerData)
      const usersOnly = allUsers.filter((user) => user.role === "user")
      setFilteredUsers(usersOnly)
    }
  }, [allUsers])

  // Confirm delete
  const confirmDelete = async () => {
    if (!selectedUser) return
    try {
      await axios.delete(`/api/user/deleteUser/${selectedUser._id}`)
      alert("User deleted successfully!")
      setFilteredUsers(filteredUsers.filter((user) => user._id !== selectedUser._id))
      setShowDeleteDialog(false)
      setSelectedUser(null)
    } catch (error) {
      console.error(error)
      alert("Error deleting user")
    }
  }

  // Confirm update
  const confirmUpdate = async () => {
    console.log(newName)
    if (!selectedUser || !newName) return
    try {
      await axios.put(`/api/user/updateUser/${selectedUser._id}`, { name: newName })
      alert("User updated successfully!")
      setFilteredUsers(
        filteredUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, name: newName } : user
        )
      )
      setShowUpdateDialog(false)
      setSelectedUser(null)
      setNewName("")
    } catch (error) {
      console.error(error)
      alert("Error updating user")
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Admin Dashboard
      </h2>

      {/* Owner Section */}
      {owner && (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-2">Owner Information</h3>
          <p><span className="font-bold">Name:</span> {owner.name}</p>
          <p><span className="font-bold">Email:</span> {owner.email}</p>
          <p><span className="font-bold">Role:</span> {owner.role}</p>
        </div>
      )}

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {!loading && filteredUsers.length === 0 && (
        <p className="text-center text-gray-500">No users found</p>
      )}

      {/* User Table */}
      {!loading && filteredUsers.length > 0 && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-blue-600 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-blue-50 transition">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize">{user.role}</td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user)
                        setNewName(user.name)
                        setShowUpdateDialog(true)
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1.5 rounded-md transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUser(user)
                        setShowDeleteDialog(true)
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1.5 rounded-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-bold">{selectedUser?.name}</span>?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Dialog */}
      {showUpdateDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Update User</h3>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Name:
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-6 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={confirmUpdate}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
              <button
                onClick={() => setShowUpdateDialog(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard;



