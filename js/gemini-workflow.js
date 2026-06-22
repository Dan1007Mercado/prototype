// js/gemini-workflow.js
document.addEventListener('DOMContentLoaded', () => {
    const conversion = window.TalanScan?.state.conversions[0];
    const reviewPanel = document.querySelector('.conversion-grid aside.card');
    if (!conversion || !reviewPanel) return;

    const confidence = conversion.confidence || 92;
    reviewPanel.innerHTML = `
        <h3>Gemini Workflow</h3>
        <span class="badge confidence-${confidence >= 95 ? 'high' : confidence >= 80 ? 'med' : 'low'}">${confidence}% confidence</span>
        <p class="text-muted">Document structure, OMR fields, and review recommendations are linked to the current conversion queue item.</p>
        <a class="btn btn-outline mt-3" href="conversion-details.html">View Telemetry</a>
    `;
});
