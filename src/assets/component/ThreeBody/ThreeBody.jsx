import {  Suspense} from 'react'
import {Canvas} from '@react-three/fiber'
import {Physics} from '@react-three/rapier'
import ThreeSection from '../ThreeSection/ThreeSection'


export default function ThreeBody() {

   
  
    return (
      <div className="h-screen w-full">
            <Canvas shadows>
                <Suspense fallback={null}>
                  <Physics>
                  <ThreeSection>
  
                  </ThreeSection>
                  </Physics>
                </Suspense>
              </Canvas>
      </div>
    )
  }