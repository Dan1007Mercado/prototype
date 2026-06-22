// js/generated-assets.js
document.addEventListener('DOMContentLoaded', () => {
    const latest = window.TalanScan?.state.conversions.find((item) => item.status === 'completed');
    document.querySelectorAll('[data-asset-file]').forEach((node) => {
        node.textContent = latest?.fileName || 'Latest conversion';
    });

    const saveTemplate = document.querySelector('[data-save-template]');
    if (saveTemplate) {
        saveTemplate.addEventListener('click', () => {
            saveTemplate.innerHTML = '<i class="fas fa-check"></i> Template Saved';
            saveTemplate.classList.add('btn-primary');
        });
    }

    const createSurvey = document.querySelector('[data-create-survey]');
    if (createSurvey) {
        createSurvey.addEventListener('click', () => {
            window.location.href = 'create-survey.html';
        });
    }
});
