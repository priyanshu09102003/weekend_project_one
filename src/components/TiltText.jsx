import React from 'react'

const TiltText = (props) => {
  return (
     <div 
                        id='tilt-div' 
                        ref={props.handler}
                        style={{
                            transformStyle: 'preserve-3d',
                            transformOrigin: 'center center'
                        }}
                    >
                        <h1 className='text-[4.2vw] leading-[3.8vw] text-white uppercase font-bold font-compressed'>
                            I am <span className="text-black" style={{WebkitTextStroke: '1px white'}}>DARK MODE</span>
                        </h1>
                        <h1 className='text-[8.4vw] leading-[9vw] font-compressed text-white'>DESIGNER</h1>
                        <h1 className='text-[4.4vw] leading-[3.8vw] text-white uppercase font-bold font-compressed'>To be Hired</h1>
                    </div>
  )
}

export default TiltText
