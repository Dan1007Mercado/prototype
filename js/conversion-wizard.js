// js/conversion-wizard.js
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.step').forEach((step, index) => {
        step.dataset.stepIndex = String(index + 1);
    });

    const generateLink = document.querySelector('a[href="generated-assets.html"]');
    if (generateLink) {
        generateLink.addEventListener('click', () => {
            window.TalanScan?.completeLatestConversion();
        });
    }
});
