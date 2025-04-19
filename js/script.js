/* Header Logo Styling */
.header-logo {
    height: 32px;
    opacity: 0.9;
    background: transparent;
    filter: hue-rotate(0deg) saturate(1.5); /* Adjust color to match #1E3A8A */
}

/* Loan Approval Styles */
.approval-step {
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.approval-step.active {
    display: block;
    opacity: 1;
}

.contract-logo-overlay {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
}

.logo-overlay {
    width: 50px;
    opacity: 0.7;
}

.contract-page {
    transition: transform 0.3s ease;
    cursor: zoom-in;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1), -2px -2px 5px rgba(0, 0, 0, 0.1);
    position: relative;
}

.contract-page::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background: linear-gradient(45deg, #f0f0f0, #ccc);
    clip-path: polygon(0 0, 100% 0, 100% 100%);
    z-index: 5;
}
