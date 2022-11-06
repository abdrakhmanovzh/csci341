import React from 'react'

const EditableRow = ({editFormData, handleEditFormChange, handleCancelClick}) => {
  return (
    <tr>
        <td>
            <input 
              type="text" 
              required="required" 
              placeholder='enter email' 
              name='email' 
              onChange={handleEditFormChange}
              value={editFormData.email}>
            </input>
        </td>
        <td>
            <input 
              type="text" 
              required="required" 
              placeholder='enter password' 
              name='password' 
              onChange={handleEditFormChange}
              value={editFormData.password}>
            </input>
        </td>
        <td>
            <input 
              type="text" 
              required="required" 
              placeholder='enter role' 
              name='role' 
              onChange={handleEditFormChange}
              value={editFormData.role}>
            </input>
        </td> 
        <td>
          <button type='submit'>Save</button>
          <button type='button' onClick={handleCancelClick}>Cancel</button>
        </td>
    </tr>
  )
}

export default EditableRow