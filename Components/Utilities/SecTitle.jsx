import React from 'react'

const SecTitle = ({ subTitle, title }) => {
  return (
    <div className='mb-[40px]'>
      <div className='text-[17px] font-[600] mb-[22px] text-[#98C1D9] capitalize'>{subTitle}</div>
      <h3 className='text-[38px] leading-[1.3] capitalize font-[600]'>{title}</h3>
    </div>
  )
}

export default SecTitle
