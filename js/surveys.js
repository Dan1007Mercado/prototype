// js/surveys.js
document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('surveysBody');
    const surveys = window.TalanScan?.state.surveys || [];

    if (!tbody) return;

    tbody.innerHTML = surveys.map((survey) => {
        const statusBadge = {
            active: '<span class="badge-status status-completed">Active</span>',
            draft: '<span class="badge-status status-processing">Draft</span>',
            closed: '<span class="badge-status status-failed">Closed</span>'
        }[survey.status] || '<span class="badge-status">Unknown</span>';

        return `
            <tr>
                <td>
                    <strong>${survey.name}</strong><br>
                    <small class="text-muted font-mono">${survey.id}</small>
                </td>
                <td><span class="tag"><i class="fas fa-file-alt text-primary"></i> ${survey.template}</span></td>
                <td>${statusBadge}</td>
                <td><strong>${survey.responses.toLocaleString()}</strong></td>
                <td>${survey.created}</td>
                <td>
                    <button class="btn-icon" title="View Analytics" onclick="window.location.href='analytics.html'"><i class="fas fa-chart-bar text-primary"></i></button>
                    <button class="btn-icon" title="Edit Survey" onclick="window.location.href='survey-details.html'"><i class="fas fa-edit text-muted"></i></button>
                    <button class="btn-icon" title="More Options"><i class="fas fa-ellipsis-v text-muted"></i></button>
                </td>
            </tr>
        `;
    }).join('');
});
