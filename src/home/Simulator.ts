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

    
}