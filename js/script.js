document.addEventListener('DOMContentLoaded', () => {
    // Initialize Medium Zoom for contract images
    mediumZoom('[data-zoomable]', {
        margin: 20,
        background: 'rgba(0, 0, 0, 0.8)'
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const menuItems = document.querySelector('.menu-items');
    hamburger.addEventListener('click', () => {
        console.log('Hamburger clicked');
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        menuItems.classList.toggle('hidden');
    });

    // Menu Navigation
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            showSection(targetId);
            menuItems.classList.add('hidden');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Partner Logos Interaction
    document.querySelectorAll('.partner-logo').forEach(logo => {
        logo.addEventListener('click', () => {
            const partner = logo.getAttribute('data-partner');
            document.querySelectorAll('.partner-details p').forEach(detail => {
                detail.classList.add('hidden');
            });
            document.getElementById(`${partner}-detail`).classList.remove('hidden');
        });
    });

    // Award Cards Interaction
    document.querySelectorAll('.award-card').forEach(card => {
        card.addEventListener('click', () => {
            const award = card.getAttribute('data-award');
            document.querySelectorAll('.award-details').forEach(detail => {
                detail.classList.add('hidden');
            });
            document.getElementById(`${award}-details`).classList.remove('hidden');
        });
    });

    // Testimonial Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slider-item');
    const totalSlides = slides.length;
    const sliderPrev = document.querySelector('[data-slider-prev]');
    const sliderNext = document.querySelector('[data-slider-next]');

    function showSlide(index) {
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;
    }

    sliderPrev.addEventListener('click', () => {
        currentSlide = (currentSlide === 0) ? totalSlides - 1 : currentSlide - 1;
        showSlide(currentSlide);
    });

    sliderNext.addEventListener('click', () => {
        currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1;
        showSlide(currentSlide);
    });

    showSlide(currentSlide);

    // Promo Slider
    let currentPromoSlide = 0;
    const promoSlides = document.querySelectorAll('.promo-slider-item');
    const totalPromoSlides = promoSlides.length;
    const promoSliderPrev = document.querySelector('[data-promo-slider-prev]');
    const promoSliderNext = document.querySelector('[data-promo-slider-next]');

    function showPromoSlide(index) {
        promoSlides.forEach(slide => slide.style.display = 'none');
        promoSlides[index].style.display = 'block';
    }

    promoSliderPrev.addEventListener('click', () => {
        currentPromoSlide = (currentPromoSlide === 0) ? totalPromoSlides - 1 : currentPromoSlide - 1;
        showPromoSlide(currentPromoSlide);
    });

    promoSliderNext.addEventListener('click', () => {
        currentPromoSlide = (currentPromoSlide === totalPromoSlides - 1) ? 0 : currentPromoSlide + 1;
        showPromoSlide(currentPromoSlide);
    });

    showPromoSlide(currentPromoSlide);

    // Register Now Buttons
    document.querySelectorAll('.register-now-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Register Now button clicked');
            showRegisterForm();
        });
    });

    // Calculate Loan Buttons
    document.querySelectorAll('.calculate-loan-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('Calculate Loan button clicked');
            showLoanCalculator();
        });
    });

    // Loan Calculator Form
    document.getElementById('calculatorForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const loanAmount = parseFloat(document.getElementById('calcLoanAmount').value);
        const loanTerm = parseInt(document.getElementById('calcLoanTerm').value);
        const loanType = document.getElementById('calcLoanType').value;
        const calcResult = document.getElementById('calcResult');
        const calcInterestRate = document.getElementById('calcInterestRate');
        const calcMonthlyPayment = document.getElementById('calcMonthlyPayment');
        const notification = document.getElementById('calculator-notification');

        if (!loanAmount || !loanTerm || !loanType) {
            notification.textContent = 'Vui lòng điền đầy đủ thông tin';
            notification.style.color = 'red';
            return;
        }

        notification.textContent = '';

        const interestRate = loanType === 'Vay tiêu dùng' ? 18 : 5.89;
        const monthlyRate = interestRate / 100 / 12;
        const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm));

        calcInterestRate.textContent = interestRate.toFixed(2);
        calcMonthlyPayment.textContent = monthlyPayment.toFixed(0);
        calcResult.style.display = 'block';
    });

    // Loan Form Submission
    document.getElementById('loanForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const phone = document.getElementById('phone').value;
        const job = document.getElementById('job').value;
        const idNumber = document.getElementById('idNumber').value;
        const currentJob = document.getElementById('currentJob').value;
        const monthlyIncome = document.getElementById('monthlyIncome').value;
        const loanAmount = document.getElementById('loanAmount').value;
        const loanTerm = document.getElementById('loanTerm').value;
        const bankAccount = document.getElementById('bankAccount').value;
        const bankName = document.getElementById('bankName').value;
        const loanType = document.getElementById('loanType').value;
        const notes = document.getElementById('notes').value;

        const notification = document.getElementById('register-notification');
        if (!fullName || !phone || !job || !idNumber || !currentJob || !monthlyIncome || !loanAmount || !loanTerm || !bankAccount || !bankName || !loanType) {
            notification.textContent = 'Vui lòng điền đầy đủ thông tin';
            notification.style.color = 'red';
            return;
        }

        if (!/^\d{10}$/.test(phone)) {
            document.getElementById('phone-error').textContent = 'Số điện thoại phải có 10 chữ số';
            document.getElementById('phone-error').classList.add('active');
            return;
        }

        const interestRate = loanType === 'Vay tiêu dùng' ? 18 : 5.89;
        const monthlyRate = interestRate / 100 / 12;
        const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm));

        const formData = { fullName, phone, job, idNumber, currentJob, monthlyIncome, loanAmount, loanTerm, bankAccount, bankName, loanType, interestRate, monthlyPayment, notes };
        localStorage.setItem('formData', JSON.stringify(formData));

        emailjs.init("YOUR_USER_ID");
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            to_name: fullName,
            to_email: "recipient@example.com",
            from_name: "Shinhan Finance",
            message: `Đăng ký vay thành công!\nHọ và tên: ${fullName}\nSố tiền vay: ${loanAmount} VNĐ\nThời hạn: ${loanTerm} tháng\nLãi suất: ${interestRate}%/năm\nThanh toán hàng tháng: ${monthlyPayment.toFixed(0)} VNĐ`
        }).then(() => {
            notification.textContent = 'Đăng ký thành công! Đơn của bạn đã được duyệt.';
            notification.style.color = 'green';
        }, (error) => {
            notification.textContent = 'Có lỗi khi gửi email. Vui lòng thử lại.';
            console.error('EmailJS error:', error);
        });

        document.getElementById('interestRate').textContent = interestRate.toFixed(2);
        document.getElementById('monthlyPayment').textContent = monthlyPayment.toFixed(0);
        document.getElementById('interestResult').style.display = 'block';

        setTimeout(() => {
            showLoanApproval();
        }, 1000);
    });

    // Contact Form Submission
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;
        const notification = document.getElementById('contact-notification');

        if (!name || !email || !message) {
            notification.textContent = 'Vui lòng điền đầy đủ thông tin';
            notification.style.color = 'red';
            return;
        }

        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            to_name: "Shinhan Finance",
            from_name: name,
            from_email: email,
            message: message
        }).then(() => {
            notification.textContent = 'Tin nhắn đã được gửi thành công!';
            notification.style.color = 'green';
            document.getElementById('contactForm').reset();
        }, (error) => {
            notification.textContent = 'Có lỗi khi gửi tin nhắn. Vui lòng thử lại.';
            console.error('EmailJS error:', error);
        });
    });

    // Contract Carousel Navigation
    const contractPages = document.querySelectorAll('.contract-page');
    const contractPrevBtn = document.getElementById('contract-prev');
    const contractNextBtn = document.getElementById('contract-next');
    const contractPageNumber = document.getElementById('contract-page-number');
    let currentContractPage = 1;

    function showContractPage(page) {
        contractPages.forEach((pageElement, index) => {
            pageElement.style.display = (index + 1 === page) ? 'block' : 'none';
        });
        contractPageNumber.textContent = page;
        currentContractPage = page;
        contractPrevBtn.disabled = (page === 1);
        contractNextBtn.disabled = (page === 3);
    }

    contractPrevBtn.addEventListener('click', () => {
        if (currentContractPage > 1) {
            showContractPage(currentContractPage - 1);
        }
    });

    contractNextBtn.addEventListener('click', () => {
        if (currentContractPage < 3) {
            showContractPage(currentContractPage + 1);
        }
    });

    showContractPage(1);

    // Set Contract Date
    document.getElementById('contract-date').textContent = new Date().toLocaleDateString('vi-VN');

    // Download Contract as PDF
    document.getElementById('download-contract').addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.addImage('assets/images/logo.png', 'PNG', 10, 10, 30, 10);
        doc.setFontSize(16);
        doc.setTextColor(30, 58, 138);
        doc.text('HỢP ĐỒNG VAY VỐN', 70, 20);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Ngày: ${new Date().toLocaleDateString('vi-VN')}`, 170, 20);

        const formData = JSON.parse(localStorage.getItem('formData'));
        if (formData) {
            doc.setFontSize(12);
            doc.setTextColor(0);
            doc.text('THÔNG TIN KHÁCH HÀNG', 10, 40);
            doc.setFontSize(10);
            const details = [
                `Họ và tên: ${formData.fullName}`,
                `Số điện thoại: ${formData.phone}`,
                `Công việc: ${formData.job}`,
                `Số CCCD/CMND: ${formData.idNumber}`,
                `Công việc hiện tại: ${formData.currentJob}`,
                `Thu nhập hàng tháng: ${formData.monthlyIncome} VNĐ`,
                `Số tiền vay: ${formData.loanAmount} VNĐ`,
                `Thời hạn vay: ${formData.loanTerm} tháng`,
                `Số tài khoản: ${formData.bankAccount}`,
                `Ngân hàng: ${formData.bankName}`,
                `Loại vay: ${formData.loanType}`,
                `Lãi suất: ${formData.interestRate}%/năm`,
                `Số tiền trả hàng tháng: ${formData.monthlyPayment.toFixed(0)} VNĐ`,
                `Ghi chú: ${formData.notes || 'Không có'}`,
                `Điều kiện giải ngân: Số dư tối thiểu 10%, không thu phí giải ngân`
            ];
            details.forEach((line, index) => {
                doc.text(line, 10, 50 + (index * 8));
            });

            doc.setLineWidth(0.5);
            doc.line(10, 140, 60, 140);
            doc.line(150, 140, 200, 140);
            doc.text('Đại diện Shinhan Finance', 10, 150);
            doc.text('Khách hàng', 150, 150);
            doc.setFontSize(8);
            doc.text('(Ký và ghi rõ họ tên)', 10, 155);
            doc.text('(Ký và ghi rõ họ tên)', 150, 155);
        }

        doc.save(`HopDongVayVon_${formData.fullName}_${new Date().toISOString().split('T')[0]}.pdf`);

        showConfirmationModal();
    });

    // Image Preview for File Uploads
    ['cccdFront', 'cccdBack', 'atmFront', 'atmBack'].forEach(id => {
        document.getElementById(id).addEventListener('change', function(event) {
            const existingPreview = this.parentElement.querySelector('.preview-img');
            if (existingPreview) {
                existingPreview.remove();
            }
            const preview = document.createElement('img');
            preview.className = 'preview-img';
            preview.src = URL.createObjectURL(event.target.files[0]);
            this.parentElement.appendChild(preview);
        });
    });

    // Reset Calculator Form
    window.resetCalculatorForm = function() {
        document.getElementById('calculatorForm').reset();
        document.getElementById('calcResult').style.display = 'none';
        document.getElementById('calculator-notification').textContent = '';
    };

    // Show Confirmation Modal
    function showConfirmationModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <p class="text-center text-sm">Hợp đồng đã được tải về. Vui lòng liên hệ qua Messenger để được hỗ trợ giải ngân.</p>
                <div class="text-center mt-4">
                    <a href="https://m.me/shinhanfinancer" class="btn-secondary inline-flex items-center">
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 2.118.664 4.086 1.789 5.698l-1.54 5.698 5.698-1.54A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm-1.29 15.293l-2.586-2.586-4.293 2.586 4.793-5.086 2.586 2.586 4.293-2.586-4.793 5.086z"/></svg>
                        Liên hệ ngay
                    </a>
                    <button class="btn-secondary mt-2" onclick="this.parentElement.parentElement.parentElement.remove()">Đóng</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
});

// Navigation Functions
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => section.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
}

function showHome() {
    showSection('home-content');
    updateProgress('home');
}

function showRegisterForm() {
    console.log('Showing Register Form');
    document.querySelectorAll('.content-section, #register-form, #loan-approval').forEach(section => section.classList.add('hidden'));
    document.getElementById('register-form').classList.remove('hidden');
    updateProgress('register');
}

function showLoanCalculator() {
    console.log('Showing Loan Calculator');
    document.querySelectorAll('.content-section, #register-form, #loan-approval').forEach(section => section.classList.add('hidden'));
    document.getElementById('loan-calculator-modal').classList.remove('hidden');
}

function closeLoanCalculator() {
    document.getElementById('loan-calculator-modal').classList.add('hidden');
    showHome();
}

function showLoanApproval() {
    const formData = JSON.parse(localStorage.getItem('formData'));
    if (formData) {
        document.getElementById('approval-details').innerHTML = `
            <p><strong>Họ và tên:</strong> ${formData.fullName}</p>
            <p><strong>Số điện thoại:</strong> ${formData.phone}</p>
            <p><strong>Công việc:</strong> ${formData.job}</p>
            <p><strong>Số CCCD/CMND:</strong> ${formData.idNumber}</p>
            <p><strong>Công việc hiện tại:</strong> ${formData.currentJob}</p>
            <p><strong>Thu nhập hàng tháng:</strong> ${formData.monthlyIncome} VNĐ</p>
            <p><strong>Số tiền vay:</strong> ${formData.loanAmount} VNĐ</p>
            <p><strong>Thời hạn vay:</strong> ${formData.loanTerm} tháng</p>
            <p><strong>Số tài khoản:</strong> ${formData.bankAccount}</p>
            <p><strong>Ngân hàng:</strong> ${formData.bankName}</p>
            <p><strong>Loại vay:</strong> ${formData.loanType}</p>
            <p><strong>Lãi suất:</strong> ${formData.interestRate}%/năm</p>
            <p><strong>Số tiền trả hàng tháng:</strong> ${formData.monthlyPayment.toFixed(0)} VNĐ</p>
            <p><strong>Ghi chú:</strong> ${formData.notes || 'Không có'}</p>
            <p><strong>Điều kiện giải ngân:</strong> Số dư tối thiểu 10%, không thu phí giải ngân</p>
        `;
    }
    document.querySelectorAll('.content-section, #register-form, #loan-approval').forEach(section => section.classList.add('hidden'));
    document.getElementById('loan-approval').classList.remove('hidden');
    updateProgress('approval');
}

function updateProgress(step) {
    const progress = document.getElementById('progress');
    const steps = { 'home': 0, 'register': 50, 'approval': 100 };
    progress.style.width = steps[step] + '%';
}
