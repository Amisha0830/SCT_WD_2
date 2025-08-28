
        class Stopwatch {
            constructor() {
                this.startTime = 0;
                this.elapsedTime = 0;
                this.timerInterval = null;
                this.isRunning = false;
                
                this.timeDisplay = document.getElementById('timeDisplay');
                this.startBtn = document.getElementById('startBtn');
                this.stopBtn = document.getElementById('stopBtn');
                this.restartBtn = document.getElementById('restartBtn');
                this.container = document.getElementById('stopwatchContainer');
            }

            formatTime(milliseconds) {
                const totalSeconds = Math.floor(milliseconds / 1000);
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                const ms = Math.floor((milliseconds % 1000) / 10);
                
                return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
            }

            updateDisplay() {
                const currentTime = this.isRunning ? 
                    this.elapsedTime + (Date.now() - this.startTime) : 
                    this.elapsedTime;
                    
                this.timeDisplay.textContent = this.formatTime(currentTime);
            }

            start() {
                if (!this.isRunning) {
                    this.startTime = Date.now();
                    this.isRunning = true;
                    
                    this.timerInterval = setInterval(() => {
                        this.updateDisplay();
                    }, 10);
                    
                    this.startBtn.disabled = true;
                    this.stopBtn.disabled = false;
                    this.startBtn.textContent = 'Start';
                    this.container.classList.add('running');
                }
            }

            stop() {
                if (this.isRunning) {
                    this.isRunning = false;
                    this.elapsedTime += Date.now() - this.startTime;
                    
                    clearInterval(this.timerInterval);
                    
                    this.startBtn.disabled = false;
                    this.stopBtn.disabled = true;
                    this.startBtn.textContent = 'Resume';
                    this.container.classList.remove('running');
                }
            }

            restart() {
                this.isRunning = false;
                this.elapsedTime = 0;
                this.startTime = 0;
                
                clearInterval(this.timerInterval);
                this.updateDisplay();
                
                this.startBtn.disabled = false;
                this.stopBtn.disabled = true;
                this.startBtn.textContent = 'Start';
                this.container.classList.remove('running');
            }
        }

        // Initialize stopwatch
        const stopwatch = new Stopwatch();

        // Button event handlers
        function startStopwatch() {
            stopwatch.start();
        }

        function stopStopwatch() {
            stopwatch.stop();
        }

        function restartStopwatch() {
            stopwatch.restart();
        }
    