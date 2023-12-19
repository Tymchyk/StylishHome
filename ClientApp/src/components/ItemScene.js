import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { OrbitControls,Html } from '@react-three/drei';


const RotatingObject = ({items}) => {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + '/scene/' + items.sceneValues.itemScene);
  const objectRef = useRef();

  return (
    <group ref={objectRef} scale={[items.sceneValues.x, items.sceneValues.y, items.sceneValues.z]} position={[0, -2, 0]}>
      <primitive object={gltf.scene} />
    </group>
  );
};


const ThreeScene = ({items}) => {
  return (
    <Canvas style={{ width: '800px', height: '800px' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <Suspense fallback={(
        <Html>
          <div>Loading...</div>
        </Html>
      )}>
        <RotatingObject items = {items} />
      </Suspense>
      <OrbitControls enableRotate={true} enablePan={true} enableZoom={false} />
    </Canvas>
  );
};

export default ThreeScene;