import GUI from 'lil-gui'
import * as THREE from 'three'
import { ShaderPass  } from 'three/examples/jsm/postprocessing/ShaderPass'
import { shader } from './shaderChunk'
import { uniform } from 'three/webgpu'


export class ColorMaskPass{
    pass!: ShaderPass

    constructor(private texture: THREE.Texture, private canvasAspect: number, private gui: GUI){
        this.init()
    }

    private init = () =>{
        const shader : THREE.Shader = {
            uniforms : {
                tDiffuse : { value : null },
                u_texture: { value: this.texture },
                u_uvScale: { value: this.calcCoveredTextureScale(this.texture, this.canvasAspect) },
                u_textureMix: { value: 1 }
            },

            vertexShader: shader:colorMaskVert,
            fragmentShader : sha
        }
    }
}