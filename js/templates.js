// js/templates.js
document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('templatesBody');
    const templates = window.TalanScan?.state.templates || [];

    if (!tbody) return;

    tbody.innerHTML = templates.map((template) => {
        const sourceHtml = {
            'AI Converted': '<span class="badge-status status-completed"><i class="fas fa-magic"></i> AI Converted</span>',
            'System Default': '<span class="badge-status" style="background:#F1F5F9;color:#475569;">System</span>',
            'Manual Build': '<span class="badge-status" style="background:#E0E7FF;color:#3730A3;"><i class="fas fa-pen"></i> Manual Build</span>'
        }[template.source] || `<span class="badge-status">${template.source}</span>`;

        return `
            <tr>
                <td>
                    <strong>${template.name}</strong><br>
                    <small class="text-muted font-mono">${template.id}</small>
                </td>
                <td>${sourceHtml}</td>
                <td>${template.questions} items</td>
                <td>${template.updated}</td>
                <td>
                    <button class="btn-icon" title="Preview Template" onclick="window.location.href='template-editor.html'"><i class="fas fa-eye text-primary"></i></button>
                    <button class="btn-icon" title="Download .tsmpl"><i class="fas fa-download text-muted"></i></button>
                    <button class="btn-icon" title="Create Survey" onclick="window.location.href='create-survey.html'"><i class="fas fa-plus text-success"></i></button>
                </td>
            </tr>
        `;
    }).join('');
});
