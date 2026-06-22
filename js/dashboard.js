document.addEventListener('DOMContentLoaded', () => {
    const current = location.pathname.split('/').pop();
    document.querySelectorAll('[data-nav]').forEach((link) => {
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });

    const state = window.TalanScan?.state;
    if (!state) return;

    setText('metricActiveSurveys', state.surveys.filter((survey) => survey.status === 'active').length);
    setText('metricResponses', state.responses.length.toLocaleString());
    setText('metricTemplates', state.templates.length);
    setText('metricConversions', state.conversions.length);

    const recentSurveys = document.getElementById('dashboardRecentSurveys');
    if (recentSurveys) {
        recentSurveys.innerHTML = state.surveys.slice(0, 4).map((survey) => `
            <tr>
                <td><strong>${survey.name}</strong><br><small class="text-muted">${survey.template}</small></td>
                <td><span class="badge-status ${survey.status === 'active' ? 'status-completed' : survey.status === 'draft' ? 'status-processing' : 'status-failed'}">${survey.status}</span></td>
                <td>${survey.responses.toLocaleString()}</td>
                <td>${survey.created}</td>
            </tr>
        `).join('');
    }

    const activity = document.getElementById('dashboardActivity');
    if (activity) {
        activity.innerHTML = state.activity.slice(0, 5).map((item) => `
            <div class="activity-item"><i class="fas ${item.icon} text-primary"></i> <strong>${item.title}</strong><br><span class="text-muted text-sm">${item.meta}</span></div>
        `).join('');
    }
});

function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
}
