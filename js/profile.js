// js/profile.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const user = window.TalanScan?.state.user;
    if (!form || !user) return;

    const [nameInput, emailInput] = form.querySelectorAll('input');
    if (nameInput) nameInput.value = user.name;
    if (emailInput) emailInput.value = user.email;

    form.querySelector('button')?.addEventListener('click', () => {
        user.name = nameInput.value.trim() || user.name;
        user.email = emailInput.value.trim() || user.email;
        user.initials = user.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
        window.TalanScan.save();
        form.querySelector('button').textContent = 'Profile Saved';
    });
});
