import React from 'react'

export default function Button({className, onClick, label, value}) {
  return (
    <button className={className} onClick={onClick} value={value}>{label}</button>
  )
}
