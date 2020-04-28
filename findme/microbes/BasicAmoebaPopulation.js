
class BasicAmoebaPopulation {

	constructor (scene, number) {
		this.scene = scene;
		this.number = number;

		var shader = FINDME.FresnelShader;
		var uniforms = THREE.UniformsUtils.clone( shader.uniforms );

		var material = new THREE.ShaderMaterial( {
			uniforms: uniforms,
			vertexShader: shader.vertexShader,
			fragmentShader: shader.fragmentShader
		} );

		for(let i = 0; i < this.number; i++) {
			let geometry = new THREE.SphereGeometry( 1, 13, 13 );
			let gg = new THREE.Mesh( geometry, material );
			gg.position.x = (worldEnd - worldStart) * (Math.random() - 0.5);
			gg.position.y = (worldEnd - worldStart) * (Math.random() - 0.5);
			gg.position.z = (worldEnd - worldStart) * (Math.random() - 0.5);
			this.scene.add( gg );
		}
	}

}

this.FINDME.BasicAmoebaPopulation = BasicAmoebaPopulation