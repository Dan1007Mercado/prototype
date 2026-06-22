// js/conversion-history.js
document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('historyBody');
    const conversions = window.TalanScan?.state.conversions || [];

    if (!tbody) return;

    tbody.innerHTML = conversions.map((item) => {
        const statusHtml = {
            completed: '<span class="badge-status status-completed">Completed</span>',
            processing: '<span class="badge-status status-processing">Processing</span>',
            failed: '<span class="badge-status status-failed">Failed</span>'
        }[item.status] || '<span class="badge-status">Queued</span>';

        const confHtml = item.confidence
            ? `<span class="${item.confidence >= 95 ? 'confidence-high' : item.confidence >= 80 ? 'confidence-med' : 'confidence-low'}">${item.confidence}%</span>`
            : '-';

        return `
            <tr>
                <td class="text-muted font-mono text-sm">${item.id}</td>
                <td><strong>${item.fileName}</strong></td>
                <td class="text-muted text-sm">${item.date}</td>
                <td>${statusHtml}</td>
                <td>${confHtml}</td>
                <td>${item.pages}</td>
                <td>
                    <button class="btn-icon text-primary" title="View" onclick="window.location.href='conversion-details.html'"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon" title="Open Assets" onclick="window.location.href='generated-assets.html'"><i class="fas fa-layer-group"></i></button>
                </td>
            </tr>
        `;
    }).join('');
});
