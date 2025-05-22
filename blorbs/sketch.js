<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fullscreen Blobs</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body, html {
            height: 100%;
            width: 100%;
            overflow: hidden;
            background-color: #000;
            cursor: none;
        }
        
        .container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
        }
        
        video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 1;
        }
        
        video::-webkit-media-controls {
            display: none !important;
        }
        
        video::-webkit-media-controls-panel {
            display: none !important;
        }
        
        .blob-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            mix-blend-mode: normal;
            filter: contrast(2);
            pointer-events: none;
            opacity: 0.8;
        }
        
        .blob-canvas.layer2 {
            z-index: 3;
            opacity: 0.6;
        }
        
        body.inverted .blob-canvas {
            filter: contrast(2) invert(1);
        }
    </style>
</head>
<body>
    <div class="container">
        <video id="video" autoplay loop muted playsinline>
            <source src="https://d2w9rnfcy7mm78.cloudfront.net/35681327/original_ba0ae2c5da2e52aebdca7dd1908a2539.mp4" type="video/mp4">
        </video>
        
        <canvas id="blobCanvas1" class="blob-canvas"></canvas>
        <canvas id="blobCanvas2" class="blob-canvas layer2"></canvas>
    </div>
    
    <script>
        try {
            // Random inversion on load
            if (Math.random() < 0.5) {
                document.body.classList.add('inverted');
            }
            
            // Ensure video plays
            const video = document.getElementById('video');
            video.play().catch(() => {
                document.addEventListener('click', () => video.play(), { once: true });
            });
            
            // Simple blob renderer using canvas drawing instead of pixel manipulation
            class SimpleBlobs {
                constructor(canvasId) {
                    this.canvas = document.getElementById(canvasId);
                    this.ctx = this.canvas.getContext('2d');
                    this.resize();
                    
                    this.blobs = [];
                    this.numBlobs = 4;
                    
                    // Create blobs
                    for (let i = 0; i < this.numBlobs; i++) {
                        this.blobs.push({
                            x: Math.random() * this.width,
                            y: Math.random() * this.height,
                            r: 100 + Math.random() * 200,
                            dx: (Math.random() - 0.5) * 2,
                            dy: (Math.random() - 0.5) * 2,
                            opacity: 0.3 + Math.random() * 0.4
                        });
                    }
                    
                    this.animate();
                }
                
                resize() {
                    this.width = window.innerWidth;
                    this.height = window.innerHeight;
                    this.canvas.width = this.width;
                    this.canvas.height = this.height;
                }
                
                update() {
                    for (let blob of this.blobs) {
                        blob.x += blob.dx;
                        blob.y += blob.dy;
                        
                        // Bounce off edges
                        if (blob.x <= 0 || blob.x >= this.width) blob.dx *= -1;
                        if (blob.y <= 0 || blob.y >= this.height) blob.dy *= -1;
                        
                        // Keep within bounds
                        blob.x = Math.max(0, Math.min(this.width, blob.x));
                        blob.y = Math.max(0, Math.min(this.height, blob.y));
                    }
                }
                
                draw() {
                    // Clear canvas
                    this.ctx.clearRect(0, 0, this.width, this.height);
                    
                    // Create gradient blobs
                    for (let blob of this.blobs) {
                        try {
                            const gradient = this.ctx.createRadialGradient(
                                blob.x, blob.y, 0,
                                blob.x, blob.y, blob.r
                            );
                            
                            gradient.addColorStop(0, `rgba(255, 255, 255, ${blob.opacity})`);
                            gradient.addColorStop(0.7, `rgba(255, 255, 255, ${blob.opacity * 0.3})`);
                            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                            
                            this.ctx.fillStyle = gradient;
                            this.ctx.fillRect(
                                blob.x - blob.r, blob.y - blob.r,
                                blob.r * 2, blob.r * 2
                            );
                        } catch (e) {
                            // Fallback to simple circle if gradient fails
                            this.ctx.fillStyle = `rgba(255, 255, 255, ${blob.opacity})`;
                            this.ctx.beginPath();
                            this.ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
                            this.ctx.fill();
                        }
                    }
                }
                
                animate() {
                    try {
                        this.update();
                        this.draw();
                        requestAnimationFrame(() => this.animate());
                    } catch (e) {
                        console.error('Animation error:', e);
                        // Try again after a delay
                        setTimeout(() => this.animate(), 100);
                    }
                }
            }
            
            // Initialize blob simulations
            let blob1, blob2;
            
            function initBlobs() {
                try {
                    blob1 = new SimpleBlobs('blobCanvas1');
                    blob2 = new SimpleBlobs('blobCanvas2');
                } catch (e) {
                    console.error('Failed to initialize blobs:', e);
                }
            }
            
            // Handle resize
            function resize() {
                try {
                    const container = document.querySelector('.container');
                    container.style.width = window.innerWidth + 'px';
                    container.style.height = window.innerHeight + 'px';
                    
                    if (blob1) blob1.resize();
                    if (blob2) blob2.resize();
                } catch (e) {
                    console.error('Resize error:', e);
                }
            }
            
            window.addEventListener('resize', resize);
            window.addEventListener('orientationchange', resize);
            
            // Initialize after DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initBlobs);
            } else {
                initBlobs();
            }
            
            resize();
            
        } catch (e) {
            console.error('Script error:', e);
            // Fallback: just show the video without blobs
            document.body.style.background = '#000';
        }
    </script>
</body>
</html>
