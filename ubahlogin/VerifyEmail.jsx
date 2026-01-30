import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "antd";
import { motion } from "framer-motion";
import colors from "@/Constants/colors";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <div
            className="flex min-h-screen flex-col items-center justify-center p-4"
            style={{
                background: `linear-gradient(135deg, ${colors.bgLight} 0%, #EAF0FA 50%, #FFFBE5 100%)`,
            }}
        >
            <Head title="Verifikasi Email" />

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
                        Verifikasi Email
                    </h1>
                    <p
                        className="text-sm mt-1"
                        style={{ color: colors.textMuted }}
                    >
                        Silakan verifikasi email Anda untuk melanjutkan.
                    </p>
                </div>

                {/* Status message */}
                {status === "verification-link-sent" && (
                    <div
                        className="mb-4 text-sm font-medium p-3 text-green-700 rounded-md"
                        style={{ background: "#DCFCE7" }}
                    >
                        Link verifikasi baru telah dikirim ke email Anda.
                    </div>
                )}

                {/* Form */}
                <form onSubmit={submit} className="relative z-10 space-y-5">
                    {/* Resend button */}
                    <motion.div whileTap={{ scale: 0.97 }}>
                        <Button
                            size="large"
                            htmlType="submit"
                            disabled={processing}
                            className="w-full py-2 font-semibold rounded-lg shadow-md border-none"
                            style={{
                                background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
                                color: "#fff",
                            }}
                        >
                            Kirim Ulang Email Verifikasi
                        </Button>
                    </motion.div>

                    {/* Logout */}
                    <div className="text-center mt-3 text-sm">
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="font-medium hover:underline"
                            style={{ color: colors.primary }}
                        >
                            Keluar
                        </Link>
                    </div>
                </form>

                {/* Footer */}
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
