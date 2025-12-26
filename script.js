const input = document.getElementById("textInput");
const output = document.getElementById("output");
const colorPicker = document.getElementById("colorPicker");
const glowRange = document.getElementById("glowRange");
const downloadBtn = document.getElementById("downloadBtn");

function updateText() {
    const color = colorPicker.value;
    const glow = glowRange.value;

    output.textContent = input.value || "Wexar1on";
    output.style.color = color;
    output.style.textShadow = `
        0 0 ${glow}px ${color},
        0 0 ${glow * 2}px ${color},
        0 0 ${glow * 3}px ${color}
    `;
}

input.addEventListener("input", updateText);
colorPicker.addEventListener("input", updateText);
glowRange.addEventListener("input", updateText);

// FIX: правильный захват PNG
downloadBtn.addEventListener("click", () => {
    const area = document.getElementById("captureArea");

    html2canvas(area, { backgroundColor: null }).then(canvas => {
        const link = document.createElement("a");
        link.download = "wexar1on_neon.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
});
