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
    this.change = -0.01;
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
    //ADD AXES
    this.axes = new THREE.AxesHelper(5);

    this.scene.add(this.axes);

    //Geometry
    let geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, 0)); //vertices[0]
    geometry.vertices.push(new THREE.Vector3(1, 0.2, 0)); //vertices[1]
    geometry.vertices.push(new THREE.Vector3(0.2, 0.2, 0.5)); //vertices[2]
    geometry.vertices.push(new THREE.Vector3(0.2, 0.2, -0.5)); //vertices[3]

    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.faces.push(new THREE.Face3(0, 1, 3));

    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      wireframe: true,
    });
    this.shape = new THREE.Mesh(geometry, material);
    this.shape.rotateY(0.5);
    this.scene.add(this.shape);
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
    if (
      this.shape.geometry.vertices[3].y < -0.1 ||
      this.shape.geometry.vertices[3].y > 0.5
    ) {
      this.change *= -1;
    }
    this.shape.geometry.vertices[3].y += this.change;
    this.shape.geometry.vertices[2].y += this.change;
    this.shape.geometry.verticesNeedUpdate = true;

    //this.shape.rotateY(0.01);
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
