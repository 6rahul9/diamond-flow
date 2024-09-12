import * as THREE from 'three';


export class Mouse3d{
    private ray = new THREE.Ray()
    private mouse = new THREE.Vector2(0, 0)

    constructor(private camera: THREE.Camera){
        window.addEventListener('mousemove', this.handleMouseMove)
        window.addEventListener('touchmove', this.handleMouseMove)
    }
}