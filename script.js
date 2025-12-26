const input = document.getElementById("textInput");
const output = document.getElementById("output");
const colorPicker = document.getElementById("colorPicker");
const glowRange = document.getElementById("glowRange");
const fontSizeRange = document.getElementById("fontSizeRange");
const imgWidthInput = document.getElementById("imgWidth");
const imgHeightInput = document.getElementById("imgHeight");
const downloadBtn = document.getElementById("downloadBtn");
const canvas = document.getElementById("renderCanvas");

function updatePreview() {
    const color = colorPicker.value;
    const glow = glowRange.value;
    const fontSize = fontSizeRange.value;

    output.textContent = input.value || "Wexar1on";
    output.style.color = color;
    output.style.fontSize = fontSize + "px";
    output.style.textShadow = `
        0 0 ${glow}px ${color},
        0 0 ${glow * 1.7}px ${color},
        0 0 ${glow * 2.4}px ${color}
    `;
}

input.addEventListener("input", updatePreview);
colorPicker.addEventListener("input", updatePreview);
glowRange.addEventListener("input", updatePreview);
fontSizeRange.addEventListener("input", updatePreview);

updatePreview();

// Генерация PNG через canvas
downloadBtn.addEventListener("click", () => {
    const text = input.value || "Wexar1on";
    const color = colorPicker.value;
    const glow = parseInt(glowRange.value, 10);

    const imgWidth = parseInt(imgWidthInput.value || "1200", 10);
    const imgHeight = parseInt(imgHeightInput.value || "400", 10);

    canvas.width = imgWidth;
    canvas.height = imgHeight;

    const ctx = canvas.getContext("2d");

    // фон
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, imgWidth, imgHeight);

    // настройки текста
    const fontSize = Math.floor(imgHeight * 0.45); // авто‑подбор размера
    ctx.font = `bold ${fontSize}px "Segoe UI", system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const x = imgWidth / 2;
    const y = imgHeight / 2;

    // неон-глоу через множественные тени
    for (let i = 0; i < 6; i++) {
        const blur = glow * (0.6 + i * 0.35);
        ctx.shadowColor = color;
        ctx.shadowBlur = blur;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }

    // основной текст без сильной тени
    ctx.shadowBlur = glow * 0.3;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);

    const link = document.createElement("a");
    link.download = "wexar1on_neon.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});


