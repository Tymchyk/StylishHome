import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { OrbitControls,Html } from '@react-three/drei';
import { ClipLoader } from 'react-spinners';


const RotatingObject = ({items}) => {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/scene/' + items.sceneValues.itemScene);
  const objectRef = useRef();

  return (
    <group ref={objectRef} scale={[items.sceneValues.x, items.sceneValues.y, items.sceneValues.z]} position={[-1, -0.5, 0]}>
      <primitive object={gltf.scene} />
    </group>
  );
};


const ThreeScene = ({items}) => {
  return (
    <Canvas style={{ width: '650px', height: '650px',marginLeft:"100px" }}>
      <ambientLight />
      <pointLight position={[-5, -5, -5]} />

      <Suspense fallback={(
        <Html>
          <div style={{ marginTop: '-500px' }}>
          <div className="spinner">
          <ClipLoader color="#3498db" size={50} />
          <p className="loading-text">Loading</p>
        </div>
        </div>
        </Html>
      )}>
        <RotatingObject items = {items} />
      </Suspense>
      <OrbitControls enableRotate={true} enablePan={true} enableZoom={false} />
    </Canvas>
  );
};

export default ThreeScene;