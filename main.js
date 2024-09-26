// Three.js setup for the scorpion and GSAP animations
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const bodyGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
scene.add(body);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    body.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Barba.js for smooth page transitions
barba.init({
    transitions: [{
        leave(data) {
            return gsap.to(data.current.container, {
                opacity: 0,
                duration: 1,
            });
        },
        enter(data) {
            return gsap.from(data.next.container, {
                opacity: 0,
                duration: 1,
            });
        }
    }]
});

// Mouse move interaction with the scorpion
document.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    body.rotation.x = mouseY * Math.PI / 4;
    body.rotation.y = mouseX * Math.PI / 4;
});
