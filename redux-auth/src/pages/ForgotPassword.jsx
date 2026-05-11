import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordThunk } from "../redux/slices/authSlice";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(forgotPasswordThunk({ email }));
        if (res.payload) {
            setSuccess(true);
            setError(null);
        } else {
            setError("Email không tồn tại trong hệ thống!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    Quên Mật Khẩu
                </h2>
                <p className="text-center text-sm text-gray-500 mb-6">
                    Nhập email của bạn, chúng tôi sẽ gửi link đặt lại mật khẩu
                </p>

                {success && (
                    <div className="bg-green-100 text-green-600 px-4 py-2 rounded mb-4 text-sm">
                        Email đặt lại mật khẩu đã được gửi! Vui lòng kiểm tra
                        hộp thư.
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="example@email.com"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || success}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Đang gửi..." : "Gửi email đặt lại mật khẩu"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    <Link to="/login" className="text-blue-500 hover:underline">
                        ← Quay lại đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
