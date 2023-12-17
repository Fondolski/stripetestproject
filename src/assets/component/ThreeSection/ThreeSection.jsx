
import {useState, useEffect, useRef, useLayoutEffect} from 'react'
import {PerspectiveCamera, OrbitControls, Environment} from '@react-three/drei'
import {TextureLoader} from 'three/src/loaders/TextureLoader'
import {useLoader, useFrame,  extend} from '@react-three/fiber'
import angleToRadians from '../../utils/angleToRadians'
import * as THREE from 'three'
import {gsap} from 'gsap'
//import ThreePointsSection from './ThreePointsSection'
import ThreeGlobe from 'three-globe'
import countries from '../../../files/custom.geo.json'
import map from '../../../files/map.json'


extend({ ThreeGlobe })

const Globe = (props) => {


    const mapData = map.maps.map((item)=> {
        return{
            lat: item.lat,
            lng: item.lng,
            maxR: 20,
            propagationSpeed: 20
        }
    })

    const [newArcsData, setNewArcsData] = useState([])
    const [ripplesData, setRipplesData] = useState([])
    const [labelsData, setLabelsData] = useState([])
    

  // This reference will give us direct access to the ThreeGlobe class
  const globeRef = useRef()

  useFrame((state)=> {

    

  

     if(globeRef) {
       //globe rotation animation
      gsap.timeline({repeat: -1}).to(globeRef.current.rotation, {y: 20, duration: 800})

   //globe features

      globeRef.current.hexPolygonsData(countries.features)
      globeRef.current.hexPolygonResolution(4)
      globeRef.current.hexPolygonMargin(0.7)
      
    
    }

    if(globeRef && newArcsData.length > 0) {
       //lines features

            globeRef.current.arcsData(newArcsData)
            
            globeRef.current.arcColor('color')
            globeRef.current.arcDashLength(50)
            globeRef.current.arcDashGap(50)
            globeRef.current.arcDashInitialGap(10)
            
            globeRef.current.arcsTransitionDuration(1);
            globeRef.current.arcDashAnimateTime(100);

            //points features
            const colorInterpolator = t => `rgba(255,100,50,${1-t})`;
          globeRef.current.ringsData(ripplesData)
          globeRef.current.ringColor(() => colorInterpolator)
          globeRef.current.ringMaxRadius('maxR')
          globeRef.current.ringPropagationSpeed('propagationSpeed')
          globeRef.current.ringRepeatPeriod('repeatPeriod');
   
        }
   
    
       
 })





 useEffect(()=> {
    setInterval(handleAnimation, 2000)
    setInterval(handleRemove, 4000)
    
 },[])


 const handleRemove = () => {
  //removing lines and points
    newArcsData.shift()
    ripplesData.shift()
    ripplesData.shift()
 }

 const handleAnimation = () => {

  //animating points and lines
    
  //getting random places

    var randomStartPlace = map.maps[Math.floor(Math.random() * map.maps.length)];
    var randomEndPlace = map.maps[Math.floor(Math.random() * map.maps.length)];

    if(JSON.stringify(randomStartPlace) != JSON.stringify(randomEndPlace) ) {
        

      //adding random places

         newArcsData.push(
            {startLat: randomStartPlace.lat,
            startLng: randomStartPlace.lng,
            endLat: randomEndPlace.lat,
            endLng: randomEndPlace.lng,
            color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
        }
        )

        
        ripplesData.push(
            {lat: randomStartPlace.lat,
            lng: randomStartPlace.lng,
            maxR: 1,
            propagationSpeed: 0.6,
            repeatPeriod: Math.random() * 2000 + 200},
            
        ),
        ripplesData.push({
            lat: randomEndPlace.lat,
            lng: randomEndPlace.lng,
            maxR: 1,
            propagationSpeed: 0.6,
            repeatPeriod: Math.random() * 2000 + 200})

         
    }

    

 
 }




  

  // This is a ThreeGlobe object but represented in JSX.
  // Any valid properties of that class are valid props
  return <threeGlobe  {...props} ref={globeRef}  />
}



export default function ThreeSection() {

    const worldRef = useRef(null)
    
    const orbitControlsRef = useRef(null)
    
   

    useFrame((state)=> {

        if(orbitControlsRef.current) {

          //disabling zoom
            orbitControlsRef.current.enableZoom = false
            
            orbitControlsRef.current.update()

        }
       
        
    })



    return(
        <>
        
        <PerspectiveCamera makeDefault position={[0, 0, 250]} />
        <OrbitControls ref={orbitControlsRef}/>
        <Environment background>
            <mesh>
            <sphereGeometry args={[100, 200, 200]} />
            <meshBasicMaterial color='#1f3b4d'   side={THREE.BackSide}/>
            </mesh>
        </Environment>
        <group ref={worldRef}>
           
              <Globe  />
              <ambientLight args={['#003366', 10]}/>
        </group>
      
        </>
    )
}