import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader';
import { Mouse3d } from '../scripts/Mouse3d';
import { Assets, TCanvasBase } from '../scripts/TCanvasBase';
import { publicPath } from '../scripts/utils';
import { ColorMaskPass } from './ColorMaskPass';
import { FxaaPass } from './fxaaPass';
import { shaders } from './shaderChunk';
import { Simulator } from './Simulator';

export class TCanvas extends TCanvasBase {
    private WIDTH = 256 as const 
    private HEIGHT = 128 as const 

    private mouse3d! : Mouse3d
    private simulator! : Simulator
    private scaleUniforms : { [uniform: string] : THREE.IUniform<any> } = {
        u_positionTextue: { value: null },
        u_prevPositionTexture : { value : null }
    }

    peivate fxaa?: FxaaPass
    private colorMask ?: ColorMaskPass
    
    private datas = {
        visibleStats: false,
        stats : () => {
            this.datas.visibleStats = !this.datas.visibleStats
            this.visibleStats(this.datas.visibleStats ? 'visible' : 'hidden')
        },

        enableAnimation : true,
        toggleAnimation : () => (this.datas.enableAnimation = !this.datas.enableAnimation)
    }

    private assets: Assets = {
        envMap : {
            path: publicPath('/resources/studio_small_08_1k.hdr') },
		image: { path: publicPath('/resources/wlop5.jpg') }
        }

    constructor(parentNode : parentNode ){
        super(parentNode)
            this.loadAssets(this.assets).then(() => {
            this.setScene()
            this.createSimulator()
            this.creatrLight()
            this.createMesh()
            this.createPostProcessing()
            this.setResizeCallback()
            this.addEvent()
            this.setDispose()
            this.animate(this.update)
        })
    }

    private setScene = () => {
        this.scene.background = new THREE.Color('#fefefe')
        this.camera.position.set(0, 3, 15)
        const controls = this.setOrbitControls(0.1)
        controls.minAzimuthAngle = 0
    }
    
}