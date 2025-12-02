// Add this to your script.js file (at the beginning)
(function() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoader);
    } else {
        initLoader();
    }
    
    function initLoader() {
        // Create loading overlay
        const loadingHTML = `
            <div class="websifyapp-loader-overlay" id="websifyappLoadingOverlay">
                <div class="websifyapp-loader-content">
                    <div class="websifyapp-loader-logo">
                        <img src="logo.png" alt="Websifyapp Logo">
                    </div>
                    
                    <div class="websifyapp-loader-progress">
                        <div class="websifyapp-percentage-display">
                            <span class="websifyapp-percentage-text">Loading</span>
                            <span class="websifyapp-percentage-value" id="websifyappLoadingPercentage">0%</span>
                        </div>
                        <div class="websifyapp-progress-container">
                            <div class="websifyapp-progress-bar" id="websifyappLoadingBar"></div>
                        </div>
                    </div>
                    
                    <div class="websifyapp-loader-status" id="websifyappLoadingStatus">
                        Initializing
                        <span class="websifyapp-status-dots">
                            <span>.</span><span>.</span><span>.</span>
                        </span>
                    </div>
                    
                    <div class="websifyapp-loader-stats">
                        <div class="websifyapp-stat">
                            <span class="websifyapp-stat-value" id="websifyappStatProjects">0</span>
                            <span class="websifyapp-stat-label">Projects</span>
                        </div>
                        <div class="websifyapp-stat">
                            <span class="websifyapp-stat-value" id="websifyappStatClients">0</span>
                            <span class="websifyapp-stat-label">Clients</span>
                        </div>
                        <div class="websifyapp-stat">
                            <span class="websifyapp-stat-value" id="websifyappStatExperience">0</span>
                            <span class="websifyapp-stat-label">Years</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert loading overlay at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', loadingHTML);
        
        const loaderOverlay = document.getElementById('websifyappLoadingOverlay');
        const loadingBar = document.getElementById('websifyappLoadingBar');
        const loadingPercentage = document.getElementById('websifyappLoadingPercentage');
        const loadingStatus = document.getElementById('websifyappLoadingStatus');
        const statProjects = document.getElementById('websifyappStatProjects');
        const statClients = document.getElementById('websifyappStatClients');
        const statExperience = document.getElementById('websifyappStatExperience');
        
        // Status messages
        const statusMessages = [
            { percent: 0, message: "Initializing systems..." },
            { percent: 10, message: "Loading assets..." },
            { percent: 25, message: "Setting up environment..." },
            { percent: 40, message: "Loading components..." },
            { percent: 55, message: "Optimizing performance..." },
            { percent: 70, message: "Almost there..." },
            { percent: 85, message: "Finalizing..." },
            { percent: 100, message: "Ready!" }
        ];
        
        // Animate stats counter
        function animateStat(element, target, duration = 1000) {
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start);
                }
            }, 16);
        }
        
        // Simulate loading progress
        let progress = 0;
        const totalSteps = 100;
        const stepDuration = 30; // ms per step
        
        function updateProgress() {
            if (progress < totalSteps) {
                progress++;
                
                // Update progress bar and percentage
                const percent = progress;
                loadingBar.style.width = `${percent}%`;
                loadingPercentage.textContent = `${percent}%`;
                
                // Update status message
                const currentStatus = statusMessages.find(msg => msg.percent <= percent);
                if (currentStatus) {
                    loadingStatus.innerHTML = `${currentStatus.message} <span class="websifyapp-status-dots"><span>.</span><span>.</span><span>.</span></span>`;
                }
                
                // Update stats at certain percentages
                if (percent === 25) {
                    animateStat(statProjects, 1500);
                }
                if (percent === 50) {
                    animateStat(statClients, 500);
                }
                if (percent === 75) {
                    animateStat(statExperience, 7);
                }
                
                // Continue loading
                setTimeout(updateProgress, stepDuration);
            } else {
                // Loading complete
                setTimeout(() => {
                    loaderOverlay.classList.add('websifyapp-fade-out');
                    
                    // Remove from DOM after animation
                    setTimeout(() => {
                        if (loaderOverlay && loaderOverlay.parentNode) {
                            loaderOverlay.remove();
                        }
                    }, 500);
                }, 500); // Small delay before fade out
            }
        }
        
        // Start loading progress
        setTimeout(updateProgress, 500); // Initial delay
    }
})();