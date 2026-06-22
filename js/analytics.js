// js/analytics.js
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Chart === 'undefined') return;

    const state = window.TalanScan?.state;
    if (!state) return;

    const totalResponses = state.surveys.reduce((sum, survey) => sum + survey.responses, 0);
    const activeSurveys = state.surveys.filter((survey) => survey.status === 'active').length;
    const avgConfidence = Math.round(
        state.conversions
            .filter((item) => item.confidence)
            .reduce((sum, item, _, arr) => sum + item.confidence / arr.length, 0)
    );

    setText('analyticsTotalResponses', totalResponses.toLocaleString());
    setText('analyticsActiveSurveys', activeSurveys);
    setText('analyticsAvgConfidence', `${avgConfidence}%`);

    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#64748B';

    const ctxResponses = document.getElementById('responsesChart');
    if (ctxResponses) {
        new Chart(ctxResponses, {
            type: 'bar',
            data: {
                labels: state.surveys.map((survey) => survey.name.replace(' Semester', '')),
                datasets: [{
                    label: 'Responses',
                    data: state.surveys.map((survey) => survey.responses),
                    backgroundColor: '#2563EB',
                    borderRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: '#E2E8F0' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    const ctxDemo = document.getElementById('demographicsChart');
    if (ctxDemo) {
        new Chart(ctxDemo, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Processing', 'Review Needed'],
                datasets: [{
                    data: [
                        state.conversions.filter((item) => item.status === 'completed').length,
                        state.conversions.filter((item) => item.status === 'processing').length,
                        state.conversions.filter((item) => item.status === 'failed').length
                    ],
                    backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } },
                cutout: '70%'
            }
        });
    }
});

function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
}
