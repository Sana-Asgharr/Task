import React from 'react';
import { useRef } from 'react';
// import { WebView } from 'react-native-webview';

export default function GlobeWebView({ onCountrySelect,route }) {
  const webViewRef = useRef(null);
  const countryName = route?.params?.name || "";  
  // const htmlContent = `
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <title>Interactive Globe with Raycasting</title>
    //         <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    //         <script src="https://cdn.jsdelivr.net/npm/three-geojson-geometry@0.7.3"></script>
    //         <style>
    //             body, html {
    //                 margin: 0;
    //                 padding: 0;~
    //                 overflow: hidden;
    //                 height: 100%;
    //                 background-color: #000;
    //                 display: flex;
    //                 justify-content: center;
    //                 align-items: center;
    //             }
    //             #globe-container {
    //                 width: 100vw;
    //                 height: 100vh;
    //             }
    //             #country-name {
    //                 position: absolute;
    //                 top: 10px;
    //                 left: 10px;
    //                 color: white;
    //                 font-size: 18px;
    //                 font-family: Arial, sans-serif;
    //             }
    //         </style>
    //     </head>
    //     <body>
    //         <div id="globe-container"></div>
    //         <div id="country-name"></div>
    //         <script>
    //             function logMessage(message) {
    //                 window.ReactNativeWebView.postMessage(message);
    //             }
                
    //             logMessage('Initializing Three.js with Country Outlines and Raycasting...');

    //             let scene, camera, renderer, globe, raycaster, mouse;
    //             const countryNameDiv = document.getElementById('country-name');

    //             function init() {
    //                 logMessage('Setting up scene, camera, and renderer...');
                    
    //                 scene = new THREE.Scene();
    //                 camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //                 camera.position.z = 3;

    //                 renderer = new THREE.WebGLRenderer({ antialias: true });
    //                 renderer.setSize(window.innerWidth, window.innerHeight);
    //                 document.getElementById('globe-container').appendChild(renderer.domElement);

    //                 raycaster = new THREE.Raycaster();
    //                 mouse = new THREE.Vector2();

    //                 const textureLoader = new THREE.TextureLoader();
    //                 textureLoader.load(
    //                     'https://threejsfundamentals.org/threejs/resources/images/wall.jpg', // Placeholder texture
    //                     (texture) => {
    //                         logMessage('Texture loaded successfully');
    //                         const geometry = new THREE.SphereGeometry(1, 64, 64);
    //                         const material = new THREE.MeshBasicMaterial({ map: texture });
    //                         globe = new THREE.Mesh(geometry, material);
    //                         scene.add(globe);
    //                         loadCountryOutlines();
    //                         animate();
    //                     },
    //                     undefined,
    //                     (error) => {
    //                         logMessage('Texture failed to load: ' + error.message);
    //                     }
    //                 );

    //                 window.addEventListener('resize', onWindowResize, false);
    //                 window.addEventListener('click', onMouseClick, false);
    //             }

    //             function loadCountryOutlines() {
    //                 fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
    //                     .then(response => response.json())
    //                     .then(data => {
    //                         const geoJsonGeometry = new THREE.GeoJsonGeometry(data);
    //                         const countryMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    //                         const countryMesh = new THREE.Mesh(geoJsonGeometry, countryMaterial);
    //                         countryMesh.name = 'countries';
    //                         scene.add(countryMesh);
    //                         logMessage('Country outlines added.');
    //                     })
    //                     .catch(error => logMessage('Failed to load country outlines: ' + error.message));
    //             }

    //             function onWindowResize() {
    //                 const width = window.innerWidth;
    //                 const height = window.innerHeight;
    //                 renderer.setSize(width, height);
    //                 camera.aspect = width / height;
    //                 camera.updateProjectionMatrix();
    //             }

    //             function onMouseClick(event) {
    //                 event.preventDefault();
    //                 mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //                 mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    //                 raycaster.setFromCamera(mouse, camera);
                    
    //                 const intersects = raycaster.intersectObjects(scene.children, true);
    //                 if (intersects.length > 0) {
    //                     const country = intersects[0].object;
    //                     if (country.name === 'countries') {
    //                         logMessage('Country clicked');
    //                         const countryName = intersects[0].object.userData?.properties?.name || "Unknown";
    //                         countryNameDiv.innerText = 'Country: ' + countryName;
    //                     }
    //                 }
    //             }

    //             function animate() {
    //                 requestAnimationFrame(animate);
    //                 if (globe) globe.rotation.y += 0.005; // Rotate globe slowly
    //                 renderer.render(scene, camera);
    //             }

    //             init();
    //         </script>
    //     </body>
    //     </html>
    // `;


    const htmlContent =`<!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
        <script src="https://unpkg.com/react-globe.gl"></script>
        <style>
          body { margin: 0; overflow: hidden; }
          #globeViz { width: 100vw; height: 100vh; }
        </style>
      </head>
      <body>
        <div id="globeViz"></div>
        <script>
          const { useState, useEffect } = React;

      let globeInstance;
      
      function highlightCountry(name) {

    // Locate country data by name
    const country = countries.features.find(
        (feature) => feature.properties.ADMIN === name
    );

    if (country) {
        const lat = country.properties.latitude;
        const lng = country.properties.longitude;
        if (globeInstance) {
            globeInstance.pointOfView({ lat, lng }, 1000); // Smooth center on country
        } else {
            console.log("Globe instance not initialized yet.");
        }
    } else {
        console.log("Country not found:", name);
    }
}

          function GlobeVisualization() {
            // Sample data - replace with your actual data
            const [countries, setCountries] = useState({ features: [] });
 
            useEffect(() => {
              // Fetch country data
              fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
                .then(res => res.json())
                .then(setCountries);
            }, []);

            //  useEffect(() => {
            //   // Fetch country data
            //   fetch('https://raw.githubusercontent.com/vasturiano/globe.gl/refs/heads/master/example/datasets/ne_110m_populated_places_simple.geojson')
            //     .then(res => res.json())
            //     .then(setCountries);
            // }, []);

            // return React.createElement(Globe, {
            //   globeImageUrl: 'https://unpkg.com/three-globe/example/img/earth-day.jpg',
            //   backgroundImageUrl: 'https://unpkg.com/three-globe/example/img/night-sky.png',
            //   lineHoverPrecision: 0,

            //   polygonsData: countries.features,
            //   polygonAltitude: 0.01,
            //   polygonCapColor: () => 'rgba(200, 0, 0, 0.6)',
            //   polygonSideColor: () => 'rgba(0, 100, 0, 0.15)',
            //   polygonLabel: ({ properties: d }) =>
            //     \`<b>\${d.ADMIN} (\${d.ISO_A2})</b>\`,

            //   onPolygonClick: ({ properties: d }) => {
            //     // Send message to React Native
            //     window.ReactNativeWebView.postMessage(JSON.stringify({
            //       type: 'COUNTRY_CLICK',
            //       country: d.ADMIN
            //     }));
            //   },
            // });

              return React.createElement(Globe, {
              globeImageUrl: 'https://unpkg.com/three-globe/example/img/earth-night.jpg',
              backgroundImageUrl: 'https://unpkg.com/three-globe/example/img/night-sky.png',
              lineHoverPrecision: 0,

              labelsData: countries.features,
              labelLat:(d) => d.properties.latitude,
              labelLng:(d) =>d.properties.longitude,
              labelText:(d) => d.properties.name,
              labelSize:(d) => Math.sqrt(d.properties.pop_max) * 4e-4,
              labelDotRadius:(d) => Math.sqrt(d.properties.pop_max) * 4e-4,
              labelColor: () => 'rgba(255, 165, 0, 0.75)',
              lineHoverPrecision: 0,

              polygonsData: countries.features,
              polygonAltitude: 0.01,
              polygonCapColor: () => 'rgba(200, 0, 0, 0.6)',
              polygonSideColor: () => 'rgba(0, 100, 0, 0.15)',
              polygonLabel: ({ properties: d }) => 
              \`<b>\${d.ADMIN} (\${d.ISO_A2})</b>\`,
          
              onPolygonClick: ({ properties: d }) => {
              // Send message to React Native
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'COUNTRY_CLICK',
                country: d.ADMIN
              }));


            }

          })
        }

          // Mount the React component
          const root = ReactDOM.createRoot(document.getElementById('globeViz'));
          root.render(React.createElement(GlobeVisualization));
        </script>
      </body>
    </html>
    `;
    const handleMessage = (event) => {
      try {
          const data = JSON.parse(event.nativeEvent.data);
          if (data.type === 'COUNTRY_CLICK') {
              onCountrySelect(data.country);
          }
      } catch (error) {
          console.error('Error parsing message:', error);
      }
  };
  
    
        const injectedJavaScript = `
          // Add any additional JavaScript you want to inject
          true;
        `;
        setTimeout(() => {
          webViewRef.current?.injectJavaScript(`
              highlightCountry("${countryName}");
          `);
      }, 500); 
      
        const handleWebViewLoadEnd = () => {
          if (countryName && webViewRef.current) {
              webViewRef.current.injectJavaScript(`
                  highlightCountry("${countryName}");
              `);
          }
        }

    //   React.useEffect(() => {
    //     if (countryName && webViewRef.current) {
    //         setTimeout(() => {
    //             if (webViewRef.current) {
    //                 webViewRef.current.injectJavaScript(`
    //                     highlightCountry("${countryName}");
    //                 `);
    //             }
    //         }, 100); 
    //     }
    // }, [countryName]);
    return (
        // <WebView
        //     originWhitelist={['*']}
        //     source={{ html: htmlContent }}
        //     style={{ flex: 1 }}
        //     javaScriptEnabled={true}
        //     // onMessage={(event) => console.log('WebView message:', event.nativeEvent.data)}
        //     onMessage={handleMessage}
        //     onLoad={handleWebViewLoadEnd} 

        // />
    
          // <WebView
          //     originWhitelist={['*']}
          //     source={{ html: htmlContent }}
          //     style={{ flex: 1 }}
          //     javaScriptEnabled={true}
          //     ref={webViewRef}
          //     onMessage={handleMessage}
          //     injectedJavaScript={injectedJavaScript}
          //     onLoadEnd={handleWebViewLoadEnd}
          // />
          <></>

    );
}
