
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

    //console.log(mapData)

     if(globeRef) {
       // console.log(globeRef.current)
        //console.log(globeRef.current.hexPolygonsData)
 gsap.timeline({repeat: -1}).to(globeRef.current.rotation, {y: 20, duration: 800})
   globeRef.current.hexPolygonsData(countries.features)
   globeRef.current.hexPolygonResolution(4)
   globeRef.current.hexPolygonMargin(0.7)
   //console.log(newArcsData)
    
    }

    if(globeRef && newArcsData.length > 0) {
       // console.log(globeRef.current, 'globe')
       //console.log(newArcsData)
     /** */   globeRef.current.arcsData(newArcsData)
            
            globeRef.current.arcColor('color')
            globeRef.current.arcDashLength(50)
            globeRef.current.arcDashGap(50)
            globeRef.current.arcDashInitialGap(10)
            
            globeRef.current.arcsTransitionDuration(1);
            globeRef.current.arcDashAnimateTime(100);

            const colorInterpolator = t => `rgba(255,100,50,${1-t})`;
    globeRef.current.ringsData(ripplesData)
    globeRef.current.ringColor(() => colorInterpolator)
    globeRef.current.ringMaxRadius('maxR')
    globeRef.current.ringPropagationSpeed('propagationSpeed')
    globeRef.current.ringRepeatPeriod('repeatPeriod');
   
        }
    //console.log( globeRef.current)
    
       
 })

 if(globeRef && ripplesData.length > 0) {

    

   }

  /**  if(globeRef && labelsData.length > 0) {
    globeRef.current.labelsData(labelsData)
    globeRef.current.labelSize('size')
    globeRef.current.labelDotRadius(5)
    globeRef.current.labelColor('color');
   }*/




 useEffect(()=> {
    //setInterval(handleAnimation, 3000)
    //setInterval(handleRemove, 7000)
    //handleAnimation()
 },[])


 const handleRemove = () => {
    newArcsData.shift()
    ripplesData.shift()
    ripplesData.shift()
 }

 const handleAnimation = () => {

    
    var randomStartPlace = map.maps[Math.floor(Math.random() * map.maps.length)];
    var randomEndPlace = map.maps[Math.floor(Math.random() * map.maps.length)];

    if(JSON.stringify(randomStartPlace) != JSON.stringify(randomEndPlace) ) {
        

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

          /**   labelsData.push({
                lat: randomStartPlace.lat,
                lng: randomStartPlace.lng,
                size: 1,
                color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
            })

            labelsData.push({
                lat: randomEndPlace.lat,
                lng: randomEndPlace.lng,
                size: 1,
                color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]})
                */
    }

    

    console.log(randomStartPlace, randomEndPlace)
 }

  
  // An effect that runs after three.js elements are created but before render
 //useLayoutEffect(() => {
    // Configure the globe
   // globeRef.current.globeImageUrl('./textures/globefuel.jpg')
   // globeRef.current.bumpImageUrl('./textures/globefuel.jpg')
 // }, [])


   useEffect(()=> {
    /**if(globeRef && newArcsData.length > 0) {
    console.log(globeRef.current, 'globe')
    globeRef.current.arcsData(newArcsData)
        
        globeRef.current.arcColor('color')
        globeRef.current.arcDashLength(0.4)
        globeRef.current.arcDashGap(0.1)
        globeRef.current.arcDashInitialGap(3)
        globeRef.current.arcDashAnimateTime(5000);
    }*/
  },[globeRef, newArcsData])


  useEffect(()=> {
     if(globeRef && ripplesData.length > 0) {
    
        const colorInterpolator = t => `rgba(255,100,50,${1-t})`;
        globeRef.current.ringsData(ripplesData)
        globeRef.current.ringColor(() => colorInterpolator)
        globeRef.current.ringMaxRadius('maxR')
        globeRef.current.ringPropagationSpeed('propagationSpeed')
        globeRef.current.ringRepeatPeriod('repeatPeriod');
        
        console.log('three')

       }
  },[ripplesData])
  

  // This is a ThreeGlobe object but represented in JSX.
  // Any valid properties of that class are valid props
  return <threeGlobe  {...props} ref={globeRef}  />
}



export default function ThreeSection() {

    const worldRef = useRef(null)
    const planetRef = useState(null)
    const orbitControlsRef = useRef(null)
    const torusRef = useRef(null)

    const lineRef = useRef(null)
    const linePointRef = useRef(null)
   
    const trailRef = useRef(null)
   

    //const colorMap = useLoader(TextureLoader, './textures/globeblack.jpg')

    //const path = new CustomSinCurve( 10 )

    /**const lat = -1.283
    const lng = 36.81 */
/** 
    const latK = 27.133
    const lngK = 13.68


    const pointArray = [
        {
            lat: -1.283,
            lng: 36.81},
        {
            lat: 30.033333,
            lng: 31.233334},
        {
            lat:51.509865,
            lng: -0.118092
        }
    ]
    */

    

  //const lat = 	25.276987 - 27.133
   // const lng = 55.296249 - 13.68

   //const lat = 		52.520008 - 27.133
  //  const lng = 	13.404954 - (13.68)

 // const lat = 	48.864716 - 27.133
  //  const lng = 2.349014  - (13.68)

  //  const latNext = -1.283 - 27.133
   // const lngNext = 36.81 - 13.68
//
  //   const lat = -1.283 - 27.133
 //  const lng = 36.81 - 13.68

  
 const lat = 40.730610 + 27.133
    const lng = -73.935242 + 13.68


    //const latNext = 48.864716 - 27.133
   // const lngNext = 2.349014 - 13.68
//
 // const latNext = 40.730610 - 27.133
  //  const lngNext = -73.935242 - 13.68

   // const latNext = 62.3 - 27.133
   // const lngNext = -97 - 13.68

 const latNext = 39.916668 + 27.133
    const lngNext = 116.383331 + 13.68

    //  const latNext = -15.730610 - 27.133
   // const lngNext = -47 - 13.68
    
    /**const ThreeGlobeComponent = new Globe({
        waitForGlobeReady: true,
        animateIn: true
    })  */
    

    /**const phi = angleToRadians(90 - lat)
    const theta = angleToRadians(180 + lng)
    const x = -((30) * Math.sin(phi) * Math.cos(theta))
    const y= ((30) * Math.cos(phi))
    const z = ((30) * Math.sin(phi) * Math.sin(theta))

    const phiNext = angleToRadians(90 - latNext)
    const thetaNext = angleToRadians(180 + lngNext)
    const xNext = -((30) * Math.sin(phiNext) * Math.cos(thetaNext))
    const yNext= ((30) * Math.cos(phiNext))
    const zNext = ((30) * Math.sin(phiNext) * Math.sin(thetaNext))

    const coord = new THREE.Vector3(x, y, z)
    const newCoord = new THREE.Vector3(xNext, yNext, zNext)
    const coordTrial = new THREE.Vector3((xNext + x)/2, (yNext + y)/2 , (zNext + z)/2)
    const coordTrialNew = new THREE.Vector3((xNext + x), (yNext + y), (zNext + z))
    

    */

    useFrame((state)=> {

       // console.log(state)
        if(orbitControlsRef.current) {

          //  orbitControlsRef.current.enableZoom = false
           // orbitControlsRef.current.update()

        }
        if(linePointRef.current) {
          //  console.log(linePointRef.current)
          //linePointRef.current.setFromPoints(pointsLine)
         // console.log(pointsLine, 780)
         // console.log(linePointRef.current)
        }
        if(trailRef.current) {
          //  console.log(trailRef.current, 'trail')
        }
        if(lineRef.current) {

           // gsap.to(lineRef.current.scale, {
          //      y: 0, 
           //     transformOrigin: "bottom center",
           //     duration: 50
           //   });
          // console.log(lineRef.current)
          //  console.log(lineRef.current)
          // lineRef.current.setPoints(coord, coordTrial, newCoord)
         // gsap.to(lineRef.current.rotation, {
         //   y: angleToRadians(-90),
        //    duration: 1
      //   })
        }
        if(torusRef.current) {
          //  console.log(torusRef.current)

          
        }

       // console.log(coord.angleTo(newCoord), 856)
    })


   

    useEffect(()=> {

        //console.log(worldRef)

        if(worldRef) {
          //  gsap.timeline([10]).to(worldRef.current.rotation, 2, {
           //     x: 44,
           //     duration: 5
           //   })
           //   gsap.timeline({repeat: -1}).to(worldRef.current.rotation, {y: 20, duration: 100})
          }

    },[worldRef])

    useEffect(()=> {

        if(orbitControlsRef.current) {
            orbitControlsRef.current.enableZoom = false
            orbitControlsRef.current.update()
          //  console.log(orbitControlsRef.current)
        }

    },[orbitControlsRef])

    // start={[-20, 20, 0]}    
   
    

        /** <CatmullRomLine
         points={[[0, 0, 0], ...]}       // Array of Points
        closed={false}                  // Default
        curveType="centripetal"         // One of "centripetal" (default), "chordal", or "catmullrom"
        tension={0.5}                   // Default (only applies to "catmullrom" curveType)
        color="black"                   // Default
        lineWidth={1}                   // In pixels (default)
        dashed={false}                  // Default
        vertexColors={[[0, 0, 0], ...]} // Optional array of RGB values for each point
        {...lineProps}                  // All THREE.Line2 props are valid
        {...materialProps}              // All THREE.LineMaterial props are valid
        />*/



        


        
        useEffect(()=> {
            
            
        },[linePointRef])

        

        useEffect(()=> {

        },[])

        


        useEffect(()=> {
            if(linePointRef) {

            console.log(linePointRef, 'point')
            console.log(linePointRef.current)
            }
        },[linePointRef])

    return(
        <>
        
        <PerspectiveCamera makeDefault position={[0, 0, 60]} />
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