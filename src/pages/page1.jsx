import React, { useRef, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import gsap from 'gsap'
import BottomText from '../components/BottomText'
import { useGSAP } from '@gsap/react'
import TiltText from '../components/TiltText'

const Page1 = () => {
    const tiltRef = useRef(null)
    const [xVal, setXVal] = useState(0);
    const [yVal, setYVal] = useState(0);
    
    const mouseMoving = (e) => {
        
        setXVal((e.clientX - tiltRef.current.getBoundingClientRect().x - tiltRef.current.getBoundingClientRect().width/2)/30);
        setYVal(-(e.clientY - tiltRef.current.getBoundingClientRect().y - tiltRef.current.getBoundingClientRect().height/2)/25);
    }
    
    useGSAP(function(){
        gsap.to(tiltRef.current, {
            transform: `rotateX(${yVal}deg) rotateY(${xVal}deg)`,
            duration: 0.8, 
            ease: 'power4.out' 
        })
    }, [xVal, yVal])
    
    // Reset animation when mouse leaves
    const handleMouseLeave = () => {
        gsap.to(tiltRef.current, {
            transform: `rotateX(0deg) rotateY(0deg)`,
            duration: 1.2,
            ease: 'power2.out'
        })
    }
    
    return (
        <div 
            className='h-screen p-7 bg-white cursor-pointer' 
            onMouseMove={(e) => {
                mouseMoving(e)
            }}
            onMouseLeave={handleMouseLeave}
        >
            <div id='page-1-in' className='shadow-2xl p-24 shadow-gray-800 h-full w-full rounded-[50px] bg-[linear-gradient(to_right,rgba(0,0,0,0.6),rgba(0,0,0,0.2),transparent),url("./src/assets/ai-gen.jpg")] bg-cover bg-right bg-no-repeat relative'>
                
                {/* SVG Logo */}
                <div className="absolute top-8 left-8 w-16 h-16">
                    <svg 
                        preserveAspectRatio="xMidYMid meet"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1608 1279"
                        className="w-full h-full"
                        role="img"
                        aria-label="Anzo.Studio Brand Identity and Logo Design"
                    >
                        <g>
                            <path
                                fill="#FAFAFA"
                                d="M661.18 1279C274.682 1279 0 992.076 0 639.5S274.682 0 661.18 0c384.07 0 656.32 286.924 656.32 639.5S1045.25 1279 661.18 1279Zm0-282.061c209.05 0 357.33-162.914 357.33-357.439 0-194.525-148.28-357.439-357.33-357.439-211.48 0-362.19 162.914-362.19 357.439 0 194.525 150.71 357.439 362.19 357.439Z"
                            />
                            <path
                                fill="#FAFAFA"
                                d="M1454.86 1279c-85.08 0-153.14-68.08-153.14-153.19 0-85.1 68.06-153.186 153.14-153.186 85.08 0 153.14 68.086 153.14 153.186 0 85.11-68.06 153.19-153.14 153.19Z"
                            />
                        </g>
                    </svg>
                </div>
                
                {/* Main Text Content */}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 pl-8">
                   <TiltText handler = {tiltRef} />
                </div>
                
                {/* Bottom Text */}
                <BottomText />
                
            </div>
        </div>
    )
}

export default Page1