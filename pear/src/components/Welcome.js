import React, { Component } from 'react'

const Welcome = ({user, onSignOut}) => {
  // This is a dumb "stateless" component
  return (
    <div>
   Welcome <strong>{user.username}</strong>!
      <button type="button" className="btn btn-danger ribbon" onClick={onSignOut} >Sign Out</button>
    </div>
  )
}
export default Welcome
