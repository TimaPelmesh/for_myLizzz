const DRIVE_LINK = "https://drive.google.com/drive/folders/1W4G2lj8QjkcRW4EK0RUVJ859gxTI_zNk?usp=sharing";

const canvas = document.getElementById("backdrop");
const ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const particles = Array.from({ length: Math.min(140, Math.floor((width * height) / 12000)) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2.4 + 0.6,
    speedX: (Math.random() - 0.5) * 0.25,
    speedY: (Math.random() - 0.5) * 0.25,
    hue: Math.random() * 360
}));

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener("resize", resizeCanvas);

function draw() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.radius * 3
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 90%, 72%, 0.85)`);
        gradient.addColorStop(1, "rgba(10, 12, 18, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();
    });

    requestAnimationFrame(draw);
}

draw();

const button = document.getElementById("downloadBtn");
if (button) {
    button.addEventListener("click", () => {
        button.classList.add("btn-cta--pulse");
        setTimeout(() => button.classList.remove("btn-cta--pulse"), 600);
        window.open(DRIVE_LINK, "_blank", "noopener");
    });
}

