// js/settings.js
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    if (!cards.length || !window.TalanScan) return;

    cards.forEach((card) => {
        if (!card.querySelector('button')) {
            const button = document.createElement('button');
            button.className = 'btn btn-outline mt-3';
            button.type = 'button';
            button.textContent = 'Configure';
            button.addEventListener('click', () => {
                window.TalanScan.state.activity.unshift({
                    icon: 'fa-gear',
                    title: `${card.querySelector('h3')?.textContent || 'Settings'} updated`,
                    meta: 'Workspace preference saved'
                });
                window.TalanScan.save();
                button.textContent = 'Saved';
            });
            card.appendChild(button);
        }
    });
});
