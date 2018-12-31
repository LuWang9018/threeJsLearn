import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';

class App extends Component {
  genOneTours() {
    const toursGeometry = new THREE.TorusGeometry(
      0.5,
      0.1,
      20,
      20,
      2 * Math.PI
    );
    const toursMaterial = new THREE.MeshBasicMaterial({
      color: '#000000',
      wireframe: true,
    });
    const tours = new THREE.Mesh(toursGeometry, toursMaterial);

    return tours;
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    //ADD SCENE
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xababab);
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(30, width / height, 1, 1000);
    this.camera.position.z = 10;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#000000');
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    //ADD CUBE
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: '#433F81' });
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    this.scene.add(this.cube);

    //ADD AXES
    this.axes = new THREE.AxesHelper(5);
    this.scene.add(this.axes);

    //ADD sphere
    const sphereGeometry = new THREE.SphereGeometry(0.5, 10, 10);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: '#000000',
      wireframe: true,
    });
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.scene.add(this.sphere);
    this.sphere.position.x = -2;

    //ADD TORUS
    const toursGeometry = new THREE.TorusGeometry(
      0.5,
      0.1,
      20,
      20,
      2 * Math.PI
    );
    const toursMaterial = new THREE.MeshBasicMaterial({
      color: '#000000',
      wireframe: true,
    });
    this.tours = new THREE.Mesh(toursGeometry, toursMaterial);
    this.scene.add(this.tours);
    this.tours.position.x = 2;

    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div
        style={{ width: '400px', height: '400px' }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default App;
