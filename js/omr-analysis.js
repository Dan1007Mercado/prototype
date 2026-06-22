// js/omr-analysis.js
document.addEventListener('DOMContentLoaded', () => {
    const fileName = sessionStorage.getItem('currentConversionFile') || window.TalanScan?.state.conversions[0]?.fileName || 'Uploaded Document';
    document.querySelectorAll('[data-current-file]').forEach((node) => {
        node.textContent = fileName;
    });

    document.querySelectorAll('[data-complete-conversion]').forEach((button) => {
        button.addEventListener('click', () => {
            window.TalanScan?.completeLatestConversion();
            window.location.href = 'generated-assets.html';
        });
    });
});
