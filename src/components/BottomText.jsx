import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'

const BottomText = () => {
    useGSAP(function(){
        gsap.to('#banner' , {
            rotate: 360,
            duration: 8,
            repeat: -1,
            ease: 'linear'

        })
    })
  return (
    <div className='absolute left-0 p-24 flex items-end justify-between bottom-0 w-full'>

        <div>
            <h2 className='text-3xl font-medium font-stage text-white'>BRAND DESIGN | APP DESIGN</h2>
                <h3 className='text-2xl font-stage text-gray-400'>GENERATIVE AI</h3>    
        </div>

        <div id='banner'>

            <img src="https://static.wixstatic.com/media/f1c650_ed71078001ef401889b71537cca76dc4~mv2.png/v1/fill/w_142,h_142,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cssda-wotd-white.png" alt="image" />

        </div>
      
    </div>
  )
}

export default BottomText
