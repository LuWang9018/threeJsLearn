import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';

class App extends Component {
  genOneTours() {
    const rad = this.randomInRange(0.1, 0.5);
    const toursGeometry = new THREE.TorusGeometry(
      rad,
      rad / 3.0,
      20,
      20,
      2 * Math.PI
    );
    const toursMaterial = new THREE.MeshBasicMaterial({
      color: Math.random() * 0xffffff,
      wireframe: false,
    });
    const tours = new THREE.Mesh(toursGeometry, toursMaterial);

    return tours;
  }

  randomInRange(from, to) {
    let x = Math.random() * (to - from);
    return x + from;
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

    this.numberOfDonut = 20;
    this.tours = [];
    for (var i = 0; i < this.numberOfDonut; i++) {
      this.tours.push(this.genOneTours());
      this.scene.add(this.tours[i]);
      this.tours[i].position.x = this.randomInRange(-3, 8);
      this.tours[i].position.y = this.randomInRange(-3, 3);
    }
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
    for (var i = 0; i < this.numberOfDonut; i++) {
      const speed = this.randomInRange(0.01, 0.1);
      this.tours[i].position.y -= speed;
      this.tours[i].position.x -= speed;
      if (this.tours[i].position.y < -3 || this.tours[i].position.x < -3) {
        this.tours[i].position.x = this.randomInRange(-3, 8);
        this.tours[i].position.y = 3;
      }
    }
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
