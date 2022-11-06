import React from 'react'

const ReadOnlyRow = ({user, index, handleEditClick, handleDeleteClick}) => {
  return (
    <tr key={user.id}>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>{user.role}</td>
      <td>
        <button type='button' onClick={(e)=> handleEditClick(e, user)}>Edit</button>
        <button type='button' onClick={()=> handleDeleteClick(user.id)}>Delete</button>
      </td>
    </tr>
  )
}

export default ReadOnlyRow