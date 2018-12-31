import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';

class App extends Component {
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

    this.flag = 1;
    //ADD sphere
    const sphereGeometry = new THREE.SphereGeometry(0.5, 10, 10);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: '#506000',
      wireframe: false,
    });
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.scene.add(this.sphere);

    //ADD TORUS
    const toursGeometry1 = new THREE.TorusGeometry(
      0.7,
      0.1,
      2,
      20,
      2 * Math.PI
    );

    const toursGeometry2 = new THREE.TorusGeometry(1, 0.1, 2, 20, 2 * Math.PI);

    const toursGeometry3 = new THREE.TorusGeometry(
      1.3,
      0.1,
      2,
      20,
      2 * Math.PI
    );
    const toursMaterial = new THREE.MeshBasicMaterial({
      color: '#506000',
      wireframe: false,
    });
    this.tours1 = new THREE.Mesh(toursGeometry1, toursMaterial);
    this.tours2 = new THREE.Mesh(toursGeometry2, toursMaterial);
    this.tours3 = new THREE.Mesh(toursGeometry3, toursMaterial);
    this.scene.add(this.tours1);
    this.scene.add(this.tours2);
    this.scene.add(this.tours3);
    this.tours1.rotateX(Math.PI / 2.0);
    this.tours2.rotateX(Math.PI / 2.0);
    this.tours3.rotateX(Math.PI / 2.0);
    this.tours1.rotateY(0.3);
    this.tours2.rotateY(0.3);
    this.tours3.rotateY(0.3);
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
    if (this.sphere.position.y > 2 || this.sphere.position.y < -2) {
      this.flag *= -1;
    }
    this.sphere.position.y += this.flag * 0.01;
    this.tours1.position.y += this.flag * 0.01;
    this.tours2.position.y += this.flag * 0.01;
    this.tours3.position.y += this.flag * 0.01;
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
