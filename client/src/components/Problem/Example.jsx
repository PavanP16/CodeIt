/* eslint-disable react/prop-types */
import React from 'react'
import CopyCode from '../ui/CopyCode'

const Example = ({siteCase,id}) => {
  return (
    <div className=''>
      <p className='text-sm font-semibold'>Example {id + 1}</p>
      <div className="m-4">
        <p className='text-sm font-semibold tracking-wider'>Input:<span className='font-light ml-2'>{siteCase?.input} </span></p>
        <p className='text-sm font-semibold tracking-wider'>Output:<span className='font-light ml-2'>{siteCase?.output}  </span></p>
      </div>
    </div>
  )
}

export default Example
