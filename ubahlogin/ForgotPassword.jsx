import InputError from "@/Components/InputError";
import { Head, useForm, Link } from "@inertiajs/react";
import { Button, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import colors from "@/Constants/colors";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <div
            className="flex min-h-screen flex-col items-center justify-center p-4"
            style={{
                background: `linear-gradient(135deg, ${colors.bgLight} 0%, #EAF0FA 50%, #FFFBE5 100%)`,
            }}
        >
            <Head title="Forgot Password" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border relative overflow-hidden"
                style={{ borderColor: colors.border }}
            >
                {/* Accent Background */}
                <div
                    className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-20 blur-3xl"
                    style={{
                        background: `radial-gradient(circle at 30% 30%, ${colors.accent}, transparent 70%)`,
                    }}
                ></div>

                {/* Title */}
                <div className="relative z-10 mb-6 text-center">
                    <h1
                        className="text-3xl font-extrabold mb-2"
                        style={{ color: colors.primary }}
                    >
                        Lupa Password?
                    </h1>
                    <p className="text-sm" style={{ color: colors.textMuted }}>
                        Masukkan email Anda dan kami akan mengirimkan link reset
                        password.
                    </p>
                </div>

                {/* Status */}
                {status && (
                    <div
                        className="mb-4 text-sm font-medium text-center p-3 rounded-md"
                        style={{
                            color: "#15803D",
                            background: "#DCFCE7",
                        }}
                    >
                        {status}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={submit} className="space-y-5 relative z-10">
                    <div>
                        <Input
                            size="large"
                            prefix={
                                <MailOutlined
                                    style={{ color: colors.textMuted }}
                                />
                            }
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Masukkan email Anda"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="!rounded-lg !h-[44px]"
                            style={{ borderColor: colors.border }}
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    <motion.div whileTap={{ scale: 0.97 }}>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            disabled={processing}
                            className="w-full py-2 font-semibold rounded-lg shadow-md"
                            style={{
                                background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
                                color: "#fff",
                            }}
                        >
                            Kirim Link Reset Password
                        </Button>
                    </motion.div>

                    <div className="text-center mt-4 text-sm">
                        <Link
                            href={route("login")}
                            className="font-medium hover:underline"
                            style={{ color: colors.primary }}
                        >
                            Kembali ke halaman login
                        </Link>
                    </div>
                </form>

                <p
                    className="mt-6 text-center text-xs"
                    style={{ color: colors.textMuted }}
                >
                    © 2025 Solo Technopark
                </p>
            </motion.div>
        </div>
    );
}
