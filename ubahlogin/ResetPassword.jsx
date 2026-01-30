import InputError from "@/Components/InputError";
import { Head, useForm, Link } from "@inertiajs/react";
import { Button, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import colors from "@/Constants/colors";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email ?? "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div
            className="flex min-h-screen flex-col items-center justify-center p-4"
            style={{
                background: `linear-gradient(135deg, ${colors.bgLight} 0%, #EAF0FA 50%, #FFFBE5 100%)`,
            }}
        >
            <Head title="Reset Password" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border relative overflow-hidden"
                style={{ borderColor: colors.border }}
            >
                {/* Accent bubble */}
                <div
                    className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-20 blur-3xl"
                    style={{
                        background: `radial-gradient(circle at 30% 30%, ${colors.accent}, transparent 70%)`,
                    }}
                />

                {/* Header */}
                <div className="text-center mb-6 relative z-10">
                    <h1
                        className="text-3xl font-extrabold"
                        style={{ color: colors.primary }}
                    >
                        Reset Password
                    </h1>
                    <p
                        className="mt-1 text-sm"
                        style={{ color: colors.textMuted }}
                    >
                        Buat password baru untuk akun Anda.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="relative z-10 space-y-5">
                    {/* Email */}
                    <div>
                        <Input
                            size="large"
                            prefix={
                                <MailOutlined
                                    style={{ color: colors.textMuted }}
                                />
                            }
                            type="email"
                            name="email"
                            disabled
                            value={data.email}
                            className="!rounded-lg !h-[44px] bg-gray-100 cursor-not-allowed"
                            style={{
                                borderColor: colors.border,
                                color: colors.textMuted,
                            }}
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    {/* Password */}
                    <div>
                        <Input.Password
                            size="large"
                            prefix={
                                <LockOutlined
                                    style={{ color: colors.textMuted }}
                                />
                            }
                            id="password"
                            name="password"
                            placeholder="Password baru"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="!rounded-lg !h-[44px]"
                            style={{ borderColor: colors.border }}
                        />
                        <InputError
                            message={errors.password}
                            className="mt-1"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <Input.Password
                            size="large"
                            prefix={
                                <LockOutlined
                                    style={{ color: colors.textMuted }}
                                />
                            }
                            id="password_confirmation"
                            name="password_confirmation"
                            placeholder="Konfirmasi password baru"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="!rounded-lg !h-[44px]"
                            style={{ borderColor: colors.border }}
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-1"
                        />
                    </div>

                    {/* Submit Button */}
                    <motion.div whileTap={{ scale: 0.97 }}>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            disabled={processing}
                            className="w-full py-2 font-semibold rounded-lg shadow-md border-none"
                            style={{
                                background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
                                color: "#fff",
                            }}
                        >
                            Reset Password
                        </Button>
                    </motion.div>

                    <div className="text-center mt-3 text-sm">
                        <Link
                            href={route("login")}
                            className="font-medium hover:underline"
                            style={{ color: colors.primary }}
                        >
                            Kembali ke Login
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
