import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';

class App extends Component {
  randomInRange(from, to) {
    let x = Math.random() * (to - from);
    return x + from;
  }

  componentDidMount() {
    this.speed = 0.01;
    this.flag = 1;
    this.frame = 0;
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
    //ADD AXES
    this.axes = new THREE.AxesHelper(5);
    this.scene.add(this.axes);

    //ADD light
    this.directionalLightUp = new THREE.DirectionalLight(0xffffff);
    this.scene.add(this.directionalLightUp);
    //this.directionalLightUp.position = new THREE.Vector3(0, 1, 0);
    //ADD sphere
    let sphereGeometry = new THREE.SphereGeometry(0.5, 20, 20);

    //ADD CUBE
    let cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    let cubeGeometry2 = new THREE.BoxGeometry(1, 1, 1);

    //Particles
    this.particlesGeometry = new THREE.Geometry();

    for (let i = 0; i < 100; i++) {
      let x = this.randomInRange(-0.5, 0.5);
      let y = this.randomInRange(-0.5, 0.5);
      let z = this.randomInRange(-0.5, 0.5);

      this.particlesGeometry.vertices.push(new THREE.Vector3(x, y, z));
    }
    //MeshNormalMaterial
    const cubeMaterial1 = new THREE.MeshNormalMaterial({
      color: 0xff0040,
      transparent: true,
      opacity: 0.8,
    });

    //LineBasicMaterial
    const LineBasicMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 2,
    });

    //LineDashedMaterial
    const LineDashedMaterial = new THREE.LineDashedMaterial({
      color: 0xffffff,
      linewidth: 1,
      dashSize: 0.5,
      gapSize: 0.5,
      scale: 2,
    });

    //Point Material
    const PointMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
    });

    //Lanbert Material
    const LambertMaterial = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      color: 0x7fc5f9,
      emissive: 0x25673d,
      emissiveIntensity: 0.5,
    });

    //Meshpong Material
    const MeshpongMaterial = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      color: 0x7fc5f9,
      emissive: 0x25673d,
      emissiveIntensity: 0.5,
      shininess: 100,
      specular: 0x9d0a00,
    });

    //standard Material
    const StandardMaterial = new THREE.MeshStandardMaterial({
      side: THREE.DoubleSide,
      color: 0xf0f0f0,
      emissive: 0xe0e0e0,
      emissiveIntensity: 0.4,
      metalness: 1,
      roughness: 0.6,
    });

    //costum geometry
    this.geometryT_1 = new THREE.Geometry();
    this.geometryT_2 = new THREE.Geometry();
    this.geometryT_3 = new THREE.Geometry();
    this.geometryT_4 = new THREE.Geometry();
    this.geometryB_1 = new THREE.Geometry();
    this.geometryB_2 = new THREE.Geometry();
    this.geometryB_3 = new THREE.Geometry();
    this.geometryB_4 = new THREE.Geometry();

    this.geometryT_1.vertices.push(new THREE.Vector3(0, 1, 0)); //top
    this.geometryT_2.vertices.push(new THREE.Vector3(0, 1, 0)); //top
    this.geometryT_3.vertices.push(new THREE.Vector3(0, 1, 0)); //top
    this.geometryT_4.vertices.push(new THREE.Vector3(0, 1, 0)); //top

    this.geometryT_1.vertices.push(new THREE.Vector3(1, 0, 1)); //1
    this.geometryT_1.vertices.push(new THREE.Vector3(-1, 0, 1)); //2

    this.geometryT_2.vertices.push(new THREE.Vector3(-1, 0, 1)); //2
    this.geometryT_2.vertices.push(new THREE.Vector3(-1, 0, -1)); //3

    this.geometryT_3.vertices.push(new THREE.Vector3(-1, 0, -1)); //3
    this.geometryT_3.vertices.push(new THREE.Vector3(1, 0, -1)); //4

    this.geometryT_4.vertices.push(new THREE.Vector3(1, 0, -1)); //4
    this.geometryT_4.vertices.push(new THREE.Vector3(1, 0, 1)); //1

    this.geometryB_1.vertices.push(new THREE.Vector3(0, -1, 0)); //bot
    this.geometryB_2.vertices.push(new THREE.Vector3(0, -1, 0)); //bot
    this.geometryB_3.vertices.push(new THREE.Vector3(0, -1, 0)); //bot
    this.geometryB_4.vertices.push(new THREE.Vector3(0, -1, 0)); //bot

    this.geometryB_1.vertices.push(new THREE.Vector3(1, 0, 1)); //1
    this.geometryB_1.vertices.push(new THREE.Vector3(-1, 0, 1)); //2

    this.geometryB_2.vertices.push(new THREE.Vector3(-1, 0, 1)); //2
    this.geometryB_2.vertices.push(new THREE.Vector3(-1, 0, -1)); //3

    this.geometryB_3.vertices.push(new THREE.Vector3(-1, 0, -1)); //3
    this.geometryB_3.vertices.push(new THREE.Vector3(1, 0, -1)); //4

    this.geometryB_4.vertices.push(new THREE.Vector3(1, 0, -1)); //4
    this.geometryB_4.vertices.push(new THREE.Vector3(1, 0, 1)); //1

    this.geometryT_1.faces.push(new THREE.Face3(0, 1, 2));
    this.geometryT_2.faces.push(new THREE.Face3(0, 1, 2));
    this.geometryT_3.faces.push(new THREE.Face3(0, 1, 2));
    this.geometryT_4.faces.push(new THREE.Face3(0, 1, 2));
    this.geometryB_1.faces.push(new THREE.Face3(0, 1, 2));
    this.geometryB_2.faces.push(new THREE.Face3(0, 1, 2));
    this.geometryB_3.faces.push(new THREE.Face3(0, 1, 2));
    this.geometryB_4.faces.push(new THREE.Face3(0, 1, 2));

    this.geometryT_1.computeFaceNormals();
    this.geometryT_2.computeFaceNormals();
    this.geometryT_3.computeFaceNormals();
    this.geometryT_4.computeFaceNormals();
    this.geometryB_1.computeFaceNormals();
    this.geometryB_2.computeFaceNormals();
    this.geometryB_3.computeFaceNormals();
    this.geometryB_4.computeFaceNormals();
    this.geometryT_1.computeVertexNormals();
    this.geometryT_2.computeVertexNormals();
    this.geometryT_3.computeVertexNormals();
    this.geometryT_4.computeVertexNormals();
    this.geometryB_1.computeVertexNormals();
    this.geometryB_2.computeVertexNormals();
    this.geometryB_3.computeVertexNormals();
    this.geometryB_4.computeVertexNormals();
    this.T1 = new THREE.Mesh(this.geometryT_1, MeshpongMaterial);
    this.T2 = new THREE.Mesh(this.geometryT_2, MeshpongMaterial);
    this.T3 = new THREE.Mesh(this.geometryT_3, MeshpongMaterial);
    this.T4 = new THREE.Mesh(this.geometryT_4, MeshpongMaterial);
    this.B1 = new THREE.Mesh(this.geometryB_1, MeshpongMaterial);
    this.B2 = new THREE.Mesh(this.geometryB_2, MeshpongMaterial);
    this.B3 = new THREE.Mesh(this.geometryB_3, MeshpongMaterial);
    this.B4 = new THREE.Mesh(this.geometryB_4, MeshpongMaterial);

    this.scene.add(this.T1);
    this.scene.add(this.T2);
    this.scene.add(this.T3);
    this.scene.add(this.T4);
    this.scene.add(this.B1);
    this.scene.add(this.B2);
    this.scene.add(this.B3);
    this.scene.add(this.B4);
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
    if (this.frame < 0 || this.frame > 300) {
      this.flag *= -1;
    }

    this.T1.position.z += this.speed * this.flag * 2;
    this.T1.position.y += this.speed * this.flag;
    this.T1.rotation.x += this.speed * this.flag * 2;

    this.T2.position.x += -1 * this.speed * this.flag * 2;
    this.T2.position.y += this.speed * this.flag;
    this.T2.rotation.z += this.speed * this.flag * 2;

    this.T3.position.z += -1 * this.speed * this.flag * 2;
    this.T3.position.y += this.speed * this.flag;
    this.T3.rotation.x += -1 * this.speed * this.flag * 2;

    this.T4.position.x += this.speed * this.flag * 2;
    this.T4.position.y += this.speed * this.flag;
    this.T4.rotation.z += -1 * this.speed * this.flag * 2;

    this.B1.position.z += this.speed * this.flag * 2;
    this.B1.position.y += -1 * this.speed * this.flag;
    this.B1.rotation.x += -1 * this.speed * this.flag * 2;

    this.B2.position.x += -1 * this.speed * this.flag * 2;
    this.B2.position.y += -1 * this.speed * this.flag;
    this.B2.rotation.z += -1 * this.speed * this.flag * 2;

    this.B3.position.z += -1 * this.speed * this.flag * 2;
    this.B3.position.y += -1 * this.speed * this.flag;
    this.B3.rotation.x += this.speed * this.flag * 2;

    this.B4.position.x += this.speed * this.flag * 2;
    this.B4.position.y += -1 * this.speed * this.flag;
    this.B4.rotation.z += this.speed * this.flag * 2;

    //this.partiles.geometry.verticesNeedUpdate = true;

    this.frame += 1 * this.flag;
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
