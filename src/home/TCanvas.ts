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
        u_positionTexture: { value: null },
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
        controls.maxAzimuthAngle = 0
        controls.maxPolarAngle = Math.PI / 2
        controls.enablePen = false
        controls.minDistance = 3
        controls.maxDistance = 16
        this.mouse3d = new Mouse3d(this.camera)
        
        this.setStats()
        this.VisibleStats('hidden')
        this.gui.open(false)
        this.gui.add(this.datas, 'stats').name('Stats')
    }

    private createSimulator = () => {
        this.simulator = new this.simulator(this.renderer, this.WIDTH, this.HEIGHT)
    }

    private createLight = () => {
        const directionalLight = new THREE.DirectionalLight()
        directionalLight.intensity = 1 
        directionalLight.position.set(0, 10, 0)
        directionalLight.castShadow = true
        directionalLight.shadow.camera.far = 30
        const edgeX = 30
        const edgeY = 30
        directionalLight.shadow.camera.top = edgeY / 2
        directionalLight.shadow.camera.bottom = -edgeY / 2
        directionalLight.shadow.camera.left = -edgeY / 2
        directionalLight.shadow.camera.right= edgeY / 2
        directionalLight.name = 'directionalLight'
        this.scene.add(directionalLight)

        // const helper = new THREE.CameraHelper(directionalLight.shadow.camera)
		// this.scene.add(helper)
    }

    private customMaterial = (material: THREE.Material, isDepthMaterial = false) =>{
        material.onBeforeCompile = shader => {
            //UNIFORMS
            shader.uniforms.u_positionTexture = this.scaleUniforms.u_positionTexture
            shader.uniforms.u_prevPositionTexture = this.scaleUniforms.u_prevPositionTexture
            //VERTEX

            shaders.vertexShader = shader.vertexShader.replace('#include <common>', shaders.vertDefine)
            shaders.vertexShader = shader.vertexShader.replace('#include <uv_vertex>', shaders.vertCalcPosition)

            if(!isDepthMaterial){
                shaders.vertexShader = shader.vertexShader.replace('#include <uv_vertex>', shaders.vertCalcNormal)
                shaders.vertexShader = shader.vertexShader.replace('#include <beginormal_vertex>', shaders.vertReplaceNormal)
            }
            shaders.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', shaders.vertReplacePosition)
            //FRAGMENT
            if(!isDepthMaterial){
                shader.fragementShader = shader.fragmentShader.replace('#define STANDARD', shaders.fragDefine)
                shader.fragementShader = shader.fragmentShader.replace('#include <output_fragment>', shaders.fragParts)
            }
        }
    }

    private createMesh = () => {
        const amount = this.WIDTH * this.HEIGHT
        const scale = 0.07
        const geometry = new THREE.OctahedronGeometry()
        geometry.applyMatrix4(new THREE.Matrix4().makeScale(1 * scale, 1 * scale, 6 * scale))
        geometry.setAttribute('simulataorUv', this.simulator.uv)
    }
}