import GUI from 'lil-gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';


export type Assets = {
    [key in string] : {
        data? : THREE.Texture |  THREE.VideoTexture | GLTF
        path: string
        encoding? : boolean
        flipy ? : boolean
    }
}

export abstract class TCanvasBase{
    protected container : HTMLDivElement
    protected renderer! : THREE.WebGLRenderer
    protected scene! : THREE.Scene
    protected camera! : THREE.Camera
    protected clock! : THREE.Clock 
    protected resizeCallBack? :() => void
    protected disposeCallBack? :() => void

    private _orbitControls? : OrbitControls
    private _gui? : GUI
    private enableOrbitControlsDamping = false
    private animeId? :  number 
    private composer?: EffectComposer
    private stats?: Stats

    constructor(parentNode: ParentNode, containerClassName = 'three-container'){
        let container: HTMLDivElement | null
        try{
            cnstainer = parentNode 
        }
    }
}