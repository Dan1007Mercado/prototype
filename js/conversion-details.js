// js/conversion-details.js
document.addEventListener('DOMContentLoaded', () => {
    const conversion = window.TalanScan?.state.conversions[0];
    if (!conversion) return;

    setText('conversionFileName', conversion.fileName);
    setText('conversionJobMeta', `Job ID: ${conversion.id} - ${conversion.date}`);
    setText('conversionPages', `${conversion.pages} page${conversion.pages === 1 ? '' : 's'}`);
    setText('conversionConfidence', conversion.confidence ? `${conversion.confidence}%` : 'Pending');

    const status = document.getElementById('conversionStatus');
    if (status) {
        status.className = `badge-status ${conversion.status === 'completed' ? 'status-completed' : conversion.status === 'processing' ? 'status-processing' : 'status-failed'}`;
        status.innerHTML = `<i class="fas ${conversion.status === 'completed' ? 'fa-check-circle' : conversion.status === 'processing' ? 'fa-spinner fa-spin' : 'fa-triangle-exclamation'}"></i> ${conversion.status}`;
    }
});

function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
}
