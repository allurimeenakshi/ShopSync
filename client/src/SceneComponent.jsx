import { useEffect, useRef } from "react";
import { Engine, Scene, SceneLoader, Mesh, Vector3, HemisphericLight, FreeCamera } from "@babylonjs/core";

export default ({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest }) => {
  const reactCanvas = useRef(null);

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
    const scene = new Scene(engine, sceneOptions);

    // Create a camera
    const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());

    // Create a light
    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

    // Load your 3D model
    SceneLoader.ImportMesh("", "../models/side_table/", "sidetable.gltf", scene, function (newMeshes, particleSystems, skeletons) {
      // Handle loaded model
      // You can access the loaded meshes using newMeshes
      // For example, to position the model:
      newMeshes[0].position.set(0, 0, 0); // Adjust position as needed
    });

    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === "function") onRender(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady]);

  return <canvas ref={reactCanvas} {...rest} />;
};