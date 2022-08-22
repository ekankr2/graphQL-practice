import React, {useEffect, useRef, useState} from 'react';
import {Environment, Image, MeshReflectorMaterial, Text, useCursor} from "@react-three/drei";
import {Canvas, useFrame} from "@react-three/fiber";
import * as THREE from 'three'
import {useLocation, useRoute} from "wouter";
import getUuid from 'uuid-by-string'

// const pexel = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`
const pexel = (id: number) => `/images/${id}.png`

const images = [
    // Front
    { position: [-2.65, 0, 3.3], rotation: [0, -0.1, 0], url: pexel(1) },
    // Back
    { position: [-1.85, 0, 3], rotation: [0, -0.13, 0], url: pexel(2) },
    { position: [-1, 0, 2.7], rotation: [0, -Math.PI / 15, 0], url: pexel(3) },
    // Left
    { position: [-0.1, 0, 2.4], rotation: [0, -Math.PI / 12, 0], url: pexel(4) },
    { position: [0.8, 0, 2.1], rotation: [0, -Math.PI / 9, 0], url: pexel(5) },
    { position: [1.75, 0, 1.8], rotation: [0, -Math.PI / 7, 0], url: pexel(6) },
    // Right
    { position: [2.88, 0, 1.5], rotation: [0, -Math.PI / 5, 0], url: pexel(7) },
    { position: [4.1, 0, 1.2], rotation: [0, -Math.PI / 5, 0], url: pexel(8) },
    { position: [5.5, 0, 0.9], rotation: [0, -Math.PI / 5, 0], url: pexel(9) },
];

// const images = [
//     // Front
//     {position: [-2.5, 0, 3.3], rotation: [0, -0.05, 0], url: pexel(1103970)},
//     // Back
//     {position: [-1.63, 0, 3], rotation: [0, -Math.PI / 28, 0], url: pexel(416430)},
//     {position: [-0.8, 0, 2.7], rotation: [0, -Math.PI / 15, 0], url: pexel(310452)},
//     // Left
//     {position: [0.09, 0, 2.4], rotation: [0, -Math.PI / 12, 0], url: pexel(327482)},
//     {position: [1, 0, 2.1], rotation: [0, -Math.PI / 9, 0], url: pexel(325185)},
//     {position: [2, 0, 1.8], rotation: [0, -Math.PI / 6, 0], url: pexel(358574)},
//     // Right
//     {position: [3.15, 0, 1.5], rotation: [0, -Math.PI / 4.5, 0], url: pexel(227675)},
//     {position: [4.4, 0, 1.2], rotation: [0, -Math.PI / 3.2, 0], url: pexel(911738)},
//     {position: [5.5, 0, 0.9], rotation: [0, -Math.PI / 3.5, 0], url: pexel(1738986)}
// ]

const GOLDENRATIO = 1.61803398875

const GalleryCanvas = () => {
    return (
        <>
            <Canvas gl={{alpha: false}} dpr={[1, 1.5]} camera={{fov: 70, position: [0, 2, 15]}}>
                <color attach="background" args={['#191920']}/>
                <fog attach="fog" args={['#191920', 0, 15]}/>
                <Environment preset="city"/>
                <group position={[0, -0.5, 0]}>
                    <Frames images={images}/>
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                        <planeGeometry args={[50, 50]}/>
                        <MeshReflectorMaterial
                            blur={[300, 100]}
                            resolution={2048}
                            mixBlur={1}
                            mixStrength={40}
                            roughness={1}
                            depthScale={1.2}
                            minDepthThreshold={0.4}
                            maxDepthThreshold={1.4}
                            color="#101010"
                            metalness={0.5}
                            mirror={0.75}/>
                    </mesh>
                </group>
            </Canvas>
        </>
    );
};


function Frames({images, q = new THREE.Quaternion(), p = new THREE.Vector3()}: any) {
    const ref = useRef<any>(null)
    const clicked = useRef<any>(null)
    const [, params] = useRoute('/item/:id')
    const [, setLocation] = useLocation()
    useEffect(() => {
        clicked.current = ref.current.getObjectByName(params?.id)
        if (clicked.current) {
            clicked.current.parent.updateWorldMatrix(true, true)
            clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
            clicked.current.parent.getWorldQuaternion(q)
        } else {
            p.set(0, 0, 5.5)
            q.identity()
        }
    })
    useFrame((state, dt) => {
        state.camera.position.lerp(p, 0.025)
        state.camera.quaternion.slerp(q, 0.025)
    })
    return (
        <group
            ref={ref}
            onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))}
            onPointerMissed={() => setLocation('/')}>
            {images.map((props: any) => <Frame key={props.url} {...props} /> /* prettier-ignore */)}
        </group>
    )
}


function Frame({url, c = new THREE.Color(), ...props}: any) {
    const [hovered, hover] = useState(false)
    const [rnd] = useState(() => Math.random())
    const image = useRef<any>(null)
    const frame = useRef<any>(null)
    const name = getUuid(url)
    useCursor(hovered)
    useFrame((state) => {
        // image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
        image.current.scale.x = THREE.MathUtils.lerp(image.current.scale.x, 0.87, 0.1);
        image.current.scale.y = THREE.MathUtils.lerp(image.current.scale.y, 0.91, 0.1);
        frame.current.material.color.lerp(c.set(hovered ? '#100f0f' : '#100f0f'), 0.1)
    })
    return (
        <group {...props}>
            <mesh
                name={name}
                onPointerOver={(e) => (e.stopPropagation(), hover(true))}
                onPointerOut={() => hover(false)}
                scale={[1, GOLDENRATIO, 0.05]}
                position={[0, GOLDENRATIO / 2, 0]}>
                <boxGeometry/>
                <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2}/>
                <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
                    <boxGeometry/>
                    <meshBasicMaterial toneMapped={false} fog={false}/>
                </mesh>
                {/*@ts-ignore*/}
                <Image alt='organ images' scale={[1,1.8,1]} raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url}/>
            </mesh>
            {/*<Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO, 0]} fontSize={0.025}>*/}
            {/*    {name.split('-').join(' ')}*/}
            {/*</Text>*/}
        </group>
    )
}

export default GalleryCanvas;