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
            container = parentNode .querySelector<HTMLDivElement>(`${containerClassName}`)
            if(!container)throw new Error(`undefined container : (${containerClassName}`)
        }catch(e){
            console.error(e)
            throw(e)
        }
        this.container = container!
        this.init()
        this.addEvents()
    }

    // ------------------------------------------------------
	// initialize

    private init = () => {
        const{width, height, aspect} = this.size
        //renderer
        this.renderer = THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(width, height)
        this.renderer.shadowMap.enabled = true
        this.renderer.outputEncoding = THREE.sRGBEncoding

        // ↓ with unreal bloom effect
		// renderer.toneMapping = THREE.ACESFilmicToneMapping
		// append canvas element

        this.container.appendChild(this.renderer.domElement)

        // scene
        this.scene  = new THREE.Scene()

        //camera
        this.camera = new THREE.PerspectiveCamera(50, aspect, 0.01, 1000)
        this.camera.position.set(0, 0, 5)

        this.clock = new THREE.Clock()
    }

    	// ------------------------------------------------------
	// utils

    protected get gui(){
        if(!this.gui)
    }
}