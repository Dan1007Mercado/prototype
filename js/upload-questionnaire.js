// js/upload-questionnaire.js

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const startBtn = document.getElementById('startConversionBtn');
    let uploadedFile = null;

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop zone
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('dragover');
        }, false);
    });

    // Handle dropped files
    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }, false);

    // Handle clicked files
    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            
            // Validate file type and size (Max 10MB)
            const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                alert('Invalid file type. Please upload a PDF, JPG, or PNG.');
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                alert('File is too large. Maximum size is 10MB.');
                return;
            }

            uploadedFile = file;
            updateUI(file);
        }
    }

    function updateUI(file) {
        dropZone.innerHTML = `
            <i class="fas fa-file-check upload-icon text-success" style="color: #10B981;"></i>
            <h3 style="color: var(--text-main);">${file.name}</h3>
            <p class="text-muted">${(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            <button class="btn btn-outline mt-3" onclick="document.getElementById('fileInput').click()">Change File</button>
        `;
        startBtn.disabled = false;
    }

    // Start Conversion Action
    startBtn.addEventListener('click', () => {
        if (!uploadedFile) return;
        
        // Simulate uploading state
        startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
        startBtn.disabled = true;

        // Simulate network request to AI backend, then redirect
        setTimeout(() => {
            if (window.TalanScan) {
                window.TalanScan.addConversion(uploadedFile.name);
            }
            sessionStorage.setItem('currentConversionFile', uploadedFile.name);
            window.location.href = 'omr-analysis.html';
        }, 1500);
    });
});
