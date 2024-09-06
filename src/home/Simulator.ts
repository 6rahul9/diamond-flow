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

    
}