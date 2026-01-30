import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Checkbox, Input } from "antd";
import { GoogleOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import colors from "@/Constants/colors";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
            preserveScroll: true,
        });
    };

    return (
        <div
            className="flex min-h-screen flex-col items-center justify-center p-4"
            style={{
                background: `linear-gradient(135deg, ${colors.bgLight} 0%, #EAF0FA 50%, #FFFBE5 100%)`,
            }}
        >
            <Head title="Login" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border relative overflow-hidden"
                style={{ borderColor: colors.border }}
            >
                {/* Background gradient accent */}
                <div
                    className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-20 blur-3xl"
                    style={{
                        background: `radial-gradient(circle at 30% 30%, ${colors.accent}, transparent 70%)`,
                    }}
                ></div>

                {/* Logo */}
                <div className="flex flex-col items-center mb-6 relative z-10">
                    <motion.img
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        src="/images/logo-blue.png"
                        alt="STP Logo"
                        className="w-32 h-20 object-contain mb-3 hover:scale-105 transition-transform duration-300"
                    />
                    <h1
                        className="text-3xl font-extrabold mb-1"
                        style={{ color: colors.primary }}
                    >
                        Selamat Datang 👋
                    </h1>
                    <p className="mt-1" style={{ color: colors.textMuted }}>
                        Masuk ke <b>STP Training</b> untuk mulai berkolaborasi.
                    </p>
                </div>

                {/* Status Message */}
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
                        <InputLabel
                            htmlFor="email"
                            value="Email"
                            className="font-semibold"
                            style={{ color: colors.textDark }}
                        />
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
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="Masukkan email anda"
                            className="!w-full !h-[44px] !rounded-lg transition-all"
                            style={{
                                borderColor: colors.border,
                            }}
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="font-semibold"
                            style={{ color: colors.textDark }}
                        />
                        <Input.Password
                            size="large"
                            prefix={
                                <LockOutlined
                                    style={{ color: colors.textMuted }}
                                />
                            }
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="Masukkan password anda"
                            className="!w-full !h-[44px] !rounded-lg transition-all"
                            style={{
                                borderColor: colors.border,
                            }}
                        />
                        <InputError
                            message={errors.password}
                            className="mt-1"
                        />
                    </div>

                    {/* Remember & Reset */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                style={{ accentColor: colors.primary }}
                            />
                            <span style={{ color: colors.textMuted }}>
                                Ingat saya
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="font-medium hover:underline transition-colors"
                                style={{
                                    color: colors.primary,
                                }}
                            >
                                Lupa password?
                            </Link>
                        )}
                    </div>

                    {/* Tombol Login */}
                    <motion.div whileTap={{ scale: 0.97 }}>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            disabled={processing}
                            className="w-full py-2 font-semibold rounded-lg shadow-md transition-all duration-300 border-none"
                            style={{
                                background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
                                color: "#fff",
                            }}
                        >
                            Masuk
                        </Button>
                    </motion.div>

                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <div
                            className="flex-grow border-t"
                            style={{ borderColor: colors.border }}
                        ></div>
                        <span
                            className="px-3 text-sm"
                            style={{ color: colors.textMuted }}
                        >
                            atau
                        </span>
                        <div
                            className="flex-grow border-t"
                            style={{ borderColor: colors.border }}
                        ></div>
                    </div>

                    {/* Google Login */}
                    <motion.div whileTap={{ scale: 0.97 }}>
                        <a href={route("google.redirect")} className="w-full">
                            <Button
                                icon={<GoogleOutlined />}
                                size="large"
                                className="w-full border transition-all duration-300 rounded-lg font-medium"
                                style={{
                                    borderColor: colors.border,
                                    color: colors.textDark,
                                }}
                            >
                                Login dengan Google
                            </Button>
                        </a>
                    </motion.div>
                </form>

                {/* Footer */}
                <div
                    className="mt-8 text-center text-sm"
                    style={{ color: colors.textMuted }}
                >
                    <p>
                        Belum punya akun?{" "}
                        <Link
                            href={route("register")}
                            className="font-semibold hover:underline"
                            style={{ color: colors.primary }}
                        >
                            Daftar disini
                        </Link>
                    </p>
                    <p className="mt-4 text-xs" style={{ color: "#9CA3AF" }}>
                        © 2025 Solo Technopark
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
