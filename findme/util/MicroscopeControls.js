
this.FINDME.MicroscopeControls = function ( camera, domElement ) {

	if ( domElement === undefined ) {

		console.warn( 'THREE.FlyControls: The second parameter "domElement" is now mandatory.' );
		domElement = document;

	}

	this.domElement = domElement;
	this.camera = camera;

	this.movementSpeed = 1.0;
	this.focusSpeed = 0.5;

	this.tmpQuaternion = new THREE.Quaternion();

	this.moveState = { 
		up: 0, 
		down: 0, 
		left: 0, 
		right: 0, 
		forward: 0, 
		back: 0, 
		focusIncrease: 0,
		focusDecrease: 0
	};
	this.moveVector = new THREE.Vector3( 0, 0, 0 );


	this.keydown = function ( event ) {

		if ( event.altKey ) {
			return;
		}

		switch ( event.keyCode ) {

			// case 16: /* shift */ this.movementSpeedMultiplier = .1; break;

			case 87: /*W*/ this.moveState.forward = 1; break;
			case 83: /*S*/ this.moveState.back = 1; break;

			case 65: /*A*/ this.moveState.left = 1; break;
			case 68: /*D*/ this.moveState.right = 1; break;

			case 81: /*Q*/ this.moveState.up = 1; break;
			case 69: /*E*/ this.moveState.down = 1; break;

			case 38: /*up*/ this.moveState.focusIncrease = 1; break;
			case 40: /*down*/ this.moveState.focusDecrease = 1; break;

			// case 37: /*left*/ this.moveState.yawLeft = 1; break;
			// case 39: /*right*/ this.moveState.yawRight = 1; break;

			// case 81: /*Q*/ this.moveState.rollLeft = 1; break;
			// case 69: /*E*/ this.moveState.rollRight = 1; break;

		}

		this.updateMovementVector();

	};

	this.keyup = function ( event ) {

		if ( event.altKey ) {
			return;
		}

		switch ( event.keyCode ) {

			// case 16: /* shift */ this.movementSpeedMultiplier = .1; break;

			case 87: /*W*/ this.moveState.forward = 0; break;
			case 83: /*S*/ this.moveState.back = 0; break;

			case 65: /*A*/ this.moveState.left = 0; break;
			case 68: /*D*/ this.moveState.right = 0; break;

			case 81: /*Q*/ this.moveState.up = 0; break;
			case 69: /*E*/ this.moveState.down = 0; break;

			case 38: /*up*/ this.moveState.focusIncrease = 0; break;
			case 40: /*down*/ this.moveState.focusDecrease = 0; break;

			// case 37: /*left*/ this.moveState.yawLeft = 1; break;
			// case 39: /*right*/ this.moveState.yawRight = 1; break;

			// case 81: /*Q*/ this.moveState.rollLeft = 1; break;
			// case 69: /*E*/ this.moveState.rollRight = 1; break;

		}

		this.updateMovementVector();

	};

	this.updateMovementVector = function () {

		var forward = ( this.moveState.forward || ( this.autoForward && ! this.moveState.back ) ) ? 1 : 0;

		this.moveVector.x = ( - this.moveState.left + this.moveState.right );
		this.moveVector.y = ( - this.moveState.down + this.moveState.up );
		this.moveVector.z = ( - forward + this.moveState.back );

	};

	this.update = function ( delta ) {

		var moveMult = delta * this.movementSpeed;
		var rotMult = delta * this.rollSpeed;

		this.camera.translateX( this.moveVector.x * moveMult );
		this.camera.translateY( this.moveVector.y * moveMult );
		this.camera.translateZ( this.moveVector.z * moveMult );

		if( this.post_proc ) {
			this.post_proc.controls.focus += this.focusSpeed * (this.moveState.focusIncrease - this.moveState.focusDecrease);
			this.post_proc.update();
		}
	};

	this.setFocusControls = function (post_proc) {
		this.post_proc = post_proc;
	}

	function bind( scope, fn ) {
		return function () {
			fn.apply( scope, arguments );
		};
	}

	function contextmenu( event ) {
		event.preventDefault();
	}

	this.dispose = function () {

		this.domElement.removeEventListener( 'contextmenu', contextmenu, false );

		window.removeEventListener( 'keydown', _keydown, false );
		window.removeEventListener( 'keyup', _keyup, false );

	};

	var _keydown = bind( this, this.keydown );
	var _keyup = bind( this, this.keyup );

	this.domElement.addEventListener( 'contextmenu', contextmenu, false );

	window.addEventListener( 'keydown', _keydown, false );
	window.addEventListener( 'keyup', _keyup, false );

	this.updateMovementVector();

}