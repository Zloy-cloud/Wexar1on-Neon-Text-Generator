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

// --- FIX: html2canvas ломается на прозрачном фоне ---
// --- Поэтому временно ставим фон, рендерим, убираем ---
downloadBtn.addEventListener("click", () => {
    const area = document.getElementById("captureArea");

    // временный фон, чтобы html2canvas не ломался
    const oldBg = area.style.background;
    area.style.background = "#000";

    html2canvas(area, {
        backgroundColor: "#000",
        scale: 3, // высокое качество PNG
    }).then(canvas => {

        // возвращаем фон обратно
        area.style.background = oldBg;

        const link = document.createElement("a");
        link.download = "wexar1on_neon.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
});

