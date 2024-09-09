import * as THREE from 'three';
import { GPUComputationRenderer, Variable } from 'three/examples/jsm/misc/GPUComputationRenderer';
import simulatorFrag from './shaders/simulatorFrag.glsl';

type TextureData = { material?: THREE.ShaderMaterial; variable?: Variable}

export class Simulator {
    public uv!: THREE.InstancedBufferAttribute
    private gpuCompute !: GPUComputationRenderer
    private position : TextureData = {}

    constructor(private gl : THREE.WebGLRenderer, private width: number, private height : number){
        this.init()
        this.setTexturePosition()
        this.setVariableDependencies()
        this.gpuCompute.init()
    }

    private init = () => {
        this.gpuCompute = new GPUComputationRenderer(this.height, this.width, this.gl)
        if(this.gl.capabilities.isWebGL2 === false){
            this.gpuCompute.setDataType(THREE.HalfFloatType)
        }

        const _uv = []
        const [dx, dy] = [(1 / this.width) * 0.5 /(1 / this.width) * 0.5 ]
        for(let x=0; x< this.width; x++){
            for(let y=0; x< this.height; y++){
                _uv.push(x / this.width + dx, y/ this.height+ dy)
            }
        }

        this.uv = new THREE.InstancedBufferAttribute(Float32Array.from(_uv),2)
    }    
    
    private set
}