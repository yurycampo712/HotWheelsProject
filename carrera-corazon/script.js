// Motor de Audio de Aceleración V12 Realista
class RealisticRacingAudio {
    constructor() {
        this.ctx = null;
        this.motorOsc = null;
        this.motorFilter = null;
        this.motorGain = null;
        this.isMotorRunning = false;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    conteoBeep(freq = 300) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.18);
    }

    // Aceleración continua realista de motor V12 con cambios de marcha
    iniciarMotorContinuo() {
        if (!this.ctx || this.isMotorRunning) return;
        this.isMotorRunning = true;

        this.motorOsc = this.ctx.createOscillator();
        const oscSub = this.ctx.createOscillator();
        this.motorFilter = this.ctx.createBiquadFilter();
        this.motorGain = this.ctx.createGain();

        this.motorOsc.type = 'sawtooth';
        oscSub.type = 'square';

        const now = this.ctx.currentTime;

        // Frecuencia inicial de ralentí acelerando
        this.motorOsc.frequency.setValueAtTime(70, now);
        oscSub.frequency.setValueAtTime(35, now);

        // Subida de revoluciones con simulación de cambios de velocidad
        this.motorOsc.frequency.exponentialRampToValueAtTime(180, now + 1.5);
        this.motorOsc.frequency.setValueAtTime(120, now + 1.51);
        this.motorOsc.frequency.exponentialRampToValueAtTime(260, now + 3.5);
        this.motorOsc.frequency.setValueAtTime(180, now + 3.51);
        this.motorOsc.frequency.exponentialRampToValueAtTime(340, now + 8.0);

        this.motorFilter.type = 'lowpass';
        this.motorFilter.frequency.setValueAtTime(350, now);
        this.motorFilter.frequency.exponentialRampToValueAtTime(2200, now + 8.0);

        this.motorGain.gain.setValueAtTime(0.12, now);

        this.motorOsc.connect(this.motorFilter);
        oscSub.connect(this.motorFilter);
        this.motorFilter.connect(this.motorGain);
        this.motorGain.connect(this.ctx.destination);

        this.motorOsc.start();
        oscSub.start();
    }

    // Rugido potente al rebasar a un rival
    rebaseAceleracion() {
        if (!this.ctx || !this.motorOsc) return;
        const now = this.ctx.currentTime;
        this.motorOsc.frequency.cancelScheduledValues(now);
        this.motorOsc.frequency.setValueAtTime(220, now);
        this.motorOsc.frequency.exponentialRampToValueAtTime(450, now + 0.8);
        this.motorOsc.frequency.exponentialRampToValueAtTime(260, now + 1.8);

        if (this.motorFilter) {
            this.motorFilter.frequency.cancelScheduledValues(now);
            this.motorFilter.frequency.setValueAtTime(1400, now);
            this.motorFilter.frequency.exponentialRampToValueAtTime(3800, now + 0.8);
            this.motorFilter.frequency.exponentialRampToValueAtTime(1800, now + 1.8);
        }
    }

    // Efecto Super Nitro de Hyper-Velocidad (Sonido potente)
    efectoNitro() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        // Sub-bass drop potente y pesado
        const subOsc = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(280, now);
        subOsc.frequency.exponentialRampToValueAtTime(20, now + 0.8);

        subGain.gain.setValueAtTime(0.9, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        subOsc.connect(subGain);
        subGain.connect(this.ctx.destination);
        subOsc.start(now);
        subOsc.stop(now + 0.8);

        // Ráfaga de turbina de nitro potente
        const bufferSize = this.ctx.sampleRate * 1.2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(700, now);
        filter.frequency.exponentialRampToValueAtTime(6000, now + 1.2);
        filter.Q.value = 3.5;

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);

        if (this.motorGain) {
            this.motorGain.gain.setValueAtTime(0.25, now);
        }
    }

    detenerMotor() {
        if (this.motorGain && this.ctx) {
            this.motorGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
            this.isMotorRunning = false;
        }
    }

    // EXPLOSIÓN SÚPER POTENTE DE BOMBA DE VICTORIA + APLAUSOS Y BANDERAS
    bullaVictoria() {
        this.detenerMotor();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;

        // 1. Golpe Sub-Bass Ultrasónico Masivo (Sub-Bass Impact)
        const subBoom = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        subBoom.type = 'sine';
        subBoom.frequency.setValueAtTime(320, now);
        subBoom.frequency.exponentialRampToValueAtTime(15, now + 1.4);

        subGain.gain.setValueAtTime(1.5, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

        subBoom.connect(subGain);
        subGain.connect(this.ctx.destination);
        subBoom.start(now);
        subBoom.stop(now + 1.4);

        // 2. Ruido Estruendoso de Bomba / Explosión de Cohete (Detonation Wave)
        const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 2.0, this.ctx.sampleRate);
        const noiseData = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseData.length; i++) {
            noiseData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.25));
        }
        const boomSource = this.ctx.createBufferSource();
        boomSource.buffer = noiseBuffer;

        const boomFilter = this.ctx.createBiquadFilter();
        boomFilter.type = 'lowpass';
        boomFilter.frequency.setValueAtTime(5500, now);
        boomFilter.frequency.exponentialRampToValueAtTime(30, now + 2.0);

        const boomGain = this.ctx.createGain();
        boomGain.gain.setValueAtTime(1.8, now);
        boomGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

        boomSource.connect(boomFilter);
        boomFilter.connect(boomGain);
        boomGain.connect(this.ctx.destination);
        boomSource.start(now);

        // 3. Retumbo / Eco Prolongado de la Explosión
        const rumbleBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 3.0, this.ctx.sampleRate);
        const rumbleData = rumbleBuffer.getChannelData(0);
        for (let i = 0; i < rumbleData.length; i++) {
            rumbleData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.8));
        }
        const rumbleSource = this.ctx.createBufferSource();
        rumbleSource.buffer = rumbleBuffer;

        const rumbleFilter = this.ctx.createBiquadFilter();
        rumbleFilter.type = 'lowpass';
        rumbleFilter.frequency.setValueAtTime(200, now);

        const rumbleGain = this.ctx.createGain();
        rumbleGain.gain.setValueAtTime(0.8, now);
        rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

        rumbleSource.connect(rumbleFilter);
        rumbleFilter.connect(rumbleGain);
        rumbleGain.connect(this.ctx.destination);
        rumbleSource.start(now);

        // 4. Ovación Masiva con Aplausos
        const crowdBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 4.0, this.ctx.sampleRate);
        const crowdData = crowdBuffer.getChannelData(0);
        for (let i = 0; i < crowdData.length; i++) {
            crowdData[i] = Math.random() * 2 - 1;
        }
        const crowdSource = this.ctx.createBufferSource();
        crowdSource.buffer = crowdBuffer;

        const crowdFilter = this.ctx.createBiquadFilter();
        crowdFilter.type = 'bandpass';
        crowdFilter.frequency.setValueAtTime(1100, now);
        crowdFilter.Q.value = 1.2;

        const crowdGain = this.ctx.createGain();
        crowdGain.gain.setValueAtTime(0.4, now);
        crowdGain.gain.exponentialRampToValueAtTime(0.001, now + 4.0);

        crowdSource.connect(crowdFilter);
        crowdFilter.connect(crowdGain);
        crowdGain.connect(this.ctx.destination);
        crowdSource.start(now);

        // 5. Fanfarria de Acordes Triunfales
        const notas = [261.63, 329.63, 392.00, 523.25, 659.25];
        notas.forEach((freq, idx) => {
            setTimeout(() => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

                gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.5);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 2.5);
            }, idx * 110);
        });
    }
}

const audio = new RealisticRacingAudio();

// Sistema de Confeti en Canvas
function dispararConfeti() {
    const canvas = document.getElementById("confettiCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetis = [];
    const colores = ["#ff0033", "#ffd700", "#ffffff", "#00d2ff", "#ff00a0"];

    for (let i = 0; i < 160; i++) {
        confetis.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 120,
            color: colores[Math.floor(Math.random() * colores.length)],
            tilt: Math.random() * 10 - 10,
            tiltAngleIncremental: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        });
    }

    function renderConfeti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetis.forEach((p) => {
            p.tiltAngle += p.tiltAngleIncremental;
            p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
            p.tilt = Math.sin(p.tiltAngle) * 15;

            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
            ctx.stroke();
        });
        requestAnimationFrame(renderConfeti);
    }
    renderConfeti();
}

// Generador Dinámico Continuo de Elementos Flotantes (Banderas, Llantas, Carritos y Corazones)
function generarParticulasDinamicas() {
    const contenedor = document.getElementById("particulasAmor");
    if (!contenedor) return;

    const simbolos = ["🏁", "🏎️", "🛞", "❤️", "💖", "🏆", "✨", "💕"];
    
    setInterval(() => {
        const item = document.createElement("div");
        item.className = "burbuja-animada";
        item.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
        item.style.left = Math.random() * 90 + "%";
        item.style.animationDuration = (Math.random() * 2 + 4) + "s";
        item.style.fontSize = (Math.random() * 12 + 20) + "px";
        
        contenedor.appendChild(item);

        setTimeout(() => {
            item.remove();
        }, 6000);
    }, 450);
}

// Función global para iniciar la carrera
function iniciarCarreraDesdeBoton() {
    audio.init();
    const pantallaInicio = document.getElementById("pantallaInicio");
    const pantallaCarrera = document.getElementById("pantallaCarrera");
    if (pantallaInicio && pantallaCarrera) {
        pantallaInicio.style.display = "none";
        pantallaCarrera.style.display = "block";
        if (typeof window.iniciarCuentaRegresiva === "function") {
            window.iniciarCuentaRegresiva();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const botonComenzar = document.getElementById("botonComenzar");
    const contador = document.getElementById("contador");
    const mensajeCarrera = document.getElementById("mensajeCarrera");
    const posicion = document.getElementById("posicion");
    const estado = document.getElementById("estado");
    const finalAmor = document.getElementById("finalAmor");
    const celebracionMeta = document.getElementById("celebracionMeta");
    const pistaAsfalto = document.getElementById("pistaAsfalto");
    const parrillaSalida = document.getElementById("parrillaSalida");

    const carroJugador = document.getElementById("carroJugador");
    const fuegoEscape = document.getElementById("fuegoEscape");
    const rival1 = document.getElementById("rival1");
    const rival2 = document.getElementById("rival2");

    const obsCono = document.getElementById("obsCono");
    const obsAceite = document.getElementById("obsAceite");
    const obsBarrera = document.getElementById("obsBarrera");
    const obsNitro = document.getElementById("obsNitro");
    const lineaMeta = document.getElementById("lineaMeta");

    let carritolineas = [];
    let animacionID;
    let carreraActiva = false;
    let velocidad = 0;

    // Carriles exactos en porcentaje (%)
    // Rival 2: IZQ (10%), Rival 1: CENTRO (42%), Jugador: DER (74%)
    const LANES = {
        IZQ: 10,
        CENTRO: 42,
        DER: 74
    };

    // Crear líneas divisorias de carril
    if (pistaAsfalto) {
        for (let i = 0; i < 6; i++) {
            const lineaIzq = document.createElement("div");
            lineaIzq.className = "lineaCarretera";
            lineaIzq.style.left = "33%";
            lineaIzq.style.top = (i * 130) + "px";
            pistaAsfalto.appendChild(lineaIzq);
            carritolineas.push(lineaIzq);

            const lineaDer = document.createElement("div");
            lineaDer.className = "lineaCarretera";
            lineaDer.style.left = "66%";
            lineaDer.style.top = (i * 130) + "px";
            pistaAsfalto.appendChild(lineaDer);
            carritolineas.push(lineaDer);
        }
    }

    if (botonComenzar) {
        botonComenzar.addEventListener("click", () => {
            iniciarCarreraDesdeBoton();
        });
    }

    // ALINEACIÓN INICIAL DE PARRILLA SIN SOLAPAMIENTO
    function posicionarEnParrilla() {
        if (rival2) { rival2.style.left = LANES.IZQ + "%"; rival2.style.top = "360px"; }
        if (rival1) { rival1.style.left = LANES.CENTRO + "%"; rival1.style.top = "360px"; }
        if (carroJugador) { carroJugador.style.left = LANES.DER + "%"; carroJugador.style.top = "360px"; }

        if (obsCono) { obsCono.style.left = LANES.DER + "%"; obsCono.style.top = "-250px"; }
        if (obsAceite) { obsAceite.style.left = LANES.CENTRO + "%"; obsAceite.style.top = "-250px"; }
        if (obsBarrera) { obsBarrera.style.left = LANES.DER + "%"; obsBarrera.style.top = "-250px"; }
        if (obsNitro) { obsNitro.style.left = LANES.CENTRO + "%"; obsNitro.style.top = "-250px"; }
        if (lineaMeta) { lineaMeta.style.top = "-250px"; }
    }

    posicionarEnParrilla();

    window.iniciarCuentaRegresiva = function() {
        let num = 3;
        if (contador) contador.textContent = num;
        if (mensajeCarrera) mensajeCarrera.textContent = "¡PARRILLA DE SALIDA LISTA!";
        audio.conteoBeep(300);

        const cuenta = setInterval(() => {
            num--;
            if (num > 0) {
                if (contador) contador.textContent = num;
                audio.conteoBeep(300);
            } else if (num === 0) {
                if (contador) contador.textContent = "¡GO!";
                if (mensajeCarrera) mensajeCarrera.textContent = "¡ACELERA A FONDO!";
                audio.conteoBeep(600);
                clearInterval(cuenta);
                setTimeout(() => {
                    if (contador) contador.style.display = "none";
                }, 800);
                iniciarCarrera();
            }
        }, 1000);
    };

    function setMensaje(texto) {
        if (mensajeCarrera) {
            mensajeCarrera.style.opacity = "1";
            mensajeCarrera.textContent = texto;
        }
    }

    function ocultarObstaculo(elem) {
        if (elem) {
            elem.classList.add("pasado");
        }
    }

    function iniciarCarrera() {
        carreraActiva = true;
        let tiempo = 0;

        if (parrillaSalida) {
            parrillaSalida.style.transition = "top 2s linear";
            parrillaSalida.style.top = "900px";
        }

        function animar() {
            if (!carreraActiva) return;

            carritolineas.forEach(linea => {
                let top = parseFloat(linea.style.top);
                top += velocidad;
                if (top > 750) top = -130;
                linea.style.top = top + "px";
            });

            animacionID = requestAnimationFrame(animar);
        }

        velocidad = 22;
        audio.iniciarMotorContinuo();
        animar();

        // COREOGRAFÍA DE CARRERA LARGA Y ESQUIVE
        const cronograma = setInterval(() => {
            tiempo++;
            if (estado) estado.textContent = `VELOCIDAD: ${160 + tiempo * 8} KM/H`;

            // T+1s: Salida. Rival 2 (IZQ) y Rival 1 (CENTRO) toman delantera
            if (tiempo === 1) {
                setMensaje("¡ARRANCA LA COMPETENCIA!");
                if (rival2) { rival2.style.transition = "top 1.8s ease-out"; rival2.style.top = "140px"; }
                if (rival1) { rival1.style.transition = "top 1.8s ease-out"; rival1.style.top = "220px"; }
                if (carroJugador) { carroJugador.style.transition = "top 1.8s ease-out"; carroJugador.style.top = "380px"; }
                if (posicion) posicion.textContent = "POSICIÓN: 3°";
            }

            // T+3s: Tu auto acelera en carril DERECHA y rebasa limpiamente a Rival 1 (CENTRO)
            if (tiempo === 3) {
                setMensaje("¡REBASANDO A RIVAL 1 POR LA VÍA!");
                audio.rebaseAceleracion();
                if (carroJugador) carroJugador.style.top = "200px";
                if (rival1) { rival1.style.transition = "top 2s ease-in-out"; rival1.style.top = "850px"; }
                if (posicion) posicion.textContent = "POSICIÓN: 2°";
            }

            // T+6s: ESQUIVE 1 - Conos en carril DERECHA -> Te mueves al CENTRO
            if (tiempo === 6) {
                setMensaje("⚠️ ¡CONOS EN PISTA! CAMBIO A CARRIL CENTRO");
                if (carroJugador) carroJugador.style.left = LANES.CENTRO + "%";
                if (obsCono) { obsCono.style.transition = "top 1.5s linear"; obsCono.style.top = "900px"; }
            }

            // T+9s: ESQUIVE 2 - Aceite en carril CENTRO -> Te mueves a DERECHA
            if (tiempo === 9) {
                ocultarObstaculo(obsCono);
                setMensaje("⚠️ ¡ACEITE DERRAMADO! ESQUIVANDO A LA DERECHA");
                if (carroJugador) carroJugador.style.left = LANES.DER + "%";
                if (obsAceite) { obsAceite.style.transition = "top 1.5s linear"; obsAceite.style.top = "900px"; }
            }

            // T+12s: ESQUIVE 3 - Barrera en carril DERECHA -> Te mueves al CENTRO
            if (tiempo === 12) {
                ocultarObstaculo(obsAceite);
                setMensaje("⚠️ ¡PELIGRO BARRERA! RETORNANDO AL CENTRO");
                if (carroJugador) carroJugador.style.left = LANES.CENTRO + "%";
                if (obsBarrera) { obsBarrera.style.transition = "top 1.5s linear"; obsBarrera.style.top = "900px"; }
            }

            // T+15s: NITRO PAD en carril CENTRO -> Lo agarras perfectamente en el CENTRO
            if (tiempo === 15) {
                ocultarObstaculo(obsBarrera);
                setMensaje("🚀 ¡ACTIVANDO SUPER NITRO HYPER-VELOCITY!");
                audio.efectoNitro();
                if (obsNitro) { obsNitro.style.transition = "top 1.2s linear"; obsNitro.style.top = "900px"; }
                if (fuegoEscape) fuegoEscape.classList.add("super-nitro");
                velocidad = 42;
            }

            // T+18s: Aceleración máxima por carril CENTRO libre mientras Rival 2 está en la IZQUIERDA
            if (tiempo === 18) {
                ocultarObstaculo(obsNitro);
                setMensaje("🔥 ¡CERRANDO DISTANCIA SOBRE EL LÍDER!");
                audio.rebaseAceleracion();
            }

            // T+20s: ADELANTAMIENTO DEL LÍDER - Tu auto sube a top: 90px en CENTRO, superando a Rival 2 (IZQ)
            if (tiempo === 20) {
                setMensaje("👑 ¡ADELANTAMIENTO LEGENDARIO POR EL 1ER LUGAR!");
                if (carroJugador) carroJugador.style.top = "90px";
                if (rival2) { rival2.style.transition = "top 2s ease-in-out"; rival2.style.top = "850px"; }
                if (posicion) posicion.textContent = "POSICIÓN: 1°";
            }

            // T+23s: Aparece la línea de meta
            if (tiempo === 23) {
                setMensaje("🏁 ¡LÍNEA DE META! ¡VICTORIA INMINENTE!");
                if (lineaMeta) { lineaMeta.style.transition = "top 1.2s linear"; lineaMeta.style.top = "850px"; }
            }

            // T+25s: SÚPER EXPLOSIÓN DE VICTORIA + CONFETI + APLAUSOS
            if (tiempo === 25) {
                if (celebracionMeta) celebracionMeta.classList.add("mostrar");
                audio.bullaVictoria();
                dispararConfeti();
            }

            // T+29s: Transición final a la tarjeta romántica con partículas animadas
            if (tiempo >= 29) {
                clearInterval(cronograma);
                carreraActiva = false;
                cancelAnimationFrame(animacionID);

                document.body.style.transition = "background 0.5s ease";
                document.body.style.background = "#ffffff";

                setTimeout(() => {
                    const pantallaCarrera = document.getElementById("pantallaCarrera");
                    if (pantallaCarrera) pantallaCarrera.style.display = "none";
                    document.body.style.background = "#030303";
                    if (finalAmor) {
                        finalAmor.classList.add("mostrar");
                        generarParticulasDinamicas();
                    }
                }, 500);
            }

        }, 1000);
    }
});