// js/conversion-dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('conversionsBody');
    const conversions = window.TalanScan?.state.conversions || [];

    if (!tbody) return;

    tbody.innerHTML = conversions.slice(0, 6).map(renderConversionRow).join('');
});

function renderConversionRow(conversion) {
    const statusHtml = {
        completed: '<span class="badge-status status-completed"><i class="fas fa-check"></i> Completed</span>',
        processing: '<span class="badge-status status-processing"><i class="fas fa-spinner fa-spin"></i> Processing</span>',
        failed: '<span class="badge-status status-failed"><i class="fas fa-triangle-exclamation"></i> Review Needed</span>'
    }[conversion.status] || '<span class="badge-status">Queued</span>';

    const confidence = conversion.confidence
        ? `<span class="${conversion.confidence >= 95 ? 'confidence-high' : conversion.confidence >= 80 ? 'confidence-med' : 'confidence-low'}">${conversion.confidence}%</span>`
        : '-';

    const assets = conversion.assets.map((asset) => `<span class="tag">${asset}</span>`).join(' ');
    const target = conversion.status === 'completed' ? 'generated-assets.html' : 'omr-analysis.html';

    return `
        <tr>
            <td><strong>${conversion.fileName}</strong><br><small class="text-muted font-mono">${conversion.id}</small></td>
            <td>${conversion.date}</td>
            <td>${statusHtml}</td>
            <td>${confidence}</td>
            <td>${assets}</td>
            <td>
                <button class="btn-icon" title="View Details" onclick="window.location.href='${target}'"><i class="fas fa-eye"></i></button>
                <button class="btn-icon" title="Download Assets" ${conversion.status !== 'completed' ? 'disabled' : ''}><i class="fas fa-download"></i></button>
            </td>
        </tr>
    `;
}
