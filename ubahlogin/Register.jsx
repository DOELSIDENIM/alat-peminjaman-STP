import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Input } from "antd";
import { motion } from "framer-motion";
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    PhoneOutlined,
    HomeOutlined,
    BankOutlined,
    GoogleOutlined,
} from "@ant-design/icons";
import colors from "@/Constants/colors";

export default function Register() {
    const { data, setData, post, processing, errors, reset, setError } =
        useForm({
            name: "",
            email: "",
            phone: "",
            institution: "",
            city_origin: "",
            password: "",
            password_confirmation: "",
        });

    const submit = (e) => {
        e.preventDefault();

        if (data.password !== data.password_confirmation) {
            setError("password", "Password tidak cocok");
            setError("password_confirmation", "Password tidak cocok");
            return;
        }

        post(route("register"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div
            className="flex min-h-screen flex-col items-center justify-center p-4"
            style={{
                background: `linear-gradient(135deg, ${colors.bgLight} 0%, #EAF0FA 40%, #FFFBE5 100%)`,
            }}
        >
            <Head title="Register" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border relative overflow-hidden"
                style={{ borderColor: colors.border }}
            >
                {/* Background Accent */}
                <div
                    className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl"
                    style={{
                        background: `radial-gradient(circle at 30% 30%, ${colors.accent}, transparent 70%)`,
                    }}
                ></div>

                {/* Header */}
                <div className="flex flex-col items-center mb-6 relative z-10">
                    <motion.img
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        src="/images/logo-blue.png"
                        alt="STP Logo"
                        className="w-24 h-20 object-contain mb-3 drop-shadow-md hover:scale-105 transition-transform duration-300"
                    />
                    <h1
                        className="text-3xl font-extrabold mb-1 text-center"
                        style={{ color: colors.primary }}
                    >
                        Buat Akun Baru ✨
                    </h1>
                    <p
                        className="text-center mt-1"
                        style={{ color: colors.textMuted }}
                    >
                        Daftar untuk mulai menggunakan <b>STP Training</b>
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={submit}
                    className="space-y-5"
                    autoComplete="off"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Nama */}
                        <div>
                            <InputLabel
                                htmlFor="name"
                                value="Nama Lengkap"
                                className="font-semibold"
                                style={{ color: colors.textDark }}
                            />
                            <Input
                                size="large"
                                prefix={
                                    <UserOutlined
                                        style={{ color: colors.textMuted }}
                                    />
                                }
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Masukkan nama anda"
                                className="!w-full !h-[44px] !rounded-lg transition-all"
                                style={{ borderColor: colors.border }}
                            />
                            <InputError
                                message={errors.name}
                                className="mt-1"
                            />
                        </div>

                        {/* Email */}
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
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="Masukkan email anda"
                                autoComplete="off"
                                className="!w-full !h-[44px] !rounded-lg transition-all"
                                style={{ borderColor: colors.border }}
                            />
                            <InputError
                                message={errors.email}
                                className="mt-1"
                            />
                        </div>

                        {/* Telepon */}
                        <div>
                            <InputLabel
                                htmlFor="phone"
                                value="Nomor Telepon"
                                className="font-semibold"
                                style={{ color: colors.textDark }}
                            />
                            <Input
                                size="large"
                                prefix={
                                    <PhoneOutlined
                                        style={{ color: colors.textMuted }}
                                    />
                                }
                                id="phone"
                                type="tel"
                                name="phone"
                                value={data.phone}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        setData("phone", value);
                                    }
                                }}
                                placeholder="Masukkan nomor telepon anda"
                                className="!w-full !h-[44px] !rounded-lg transition-all"
                                style={{ borderColor: colors.border }}
                            />
                            <InputError
                                message={errors.phone}
                                className="mt-1"
                            />
                        </div>

                        {/* Instansi */}
                        <div>
                            <InputLabel
                                htmlFor="institution"
                                value="Nama Instansi"
                                className="font-semibold"
                                style={{ color: colors.textDark }}
                            />
                            <Input
                                size="large"
                                prefix={
                                    <BankOutlined
                                        style={{ color: colors.textMuted }}
                                    />
                                }
                                id="institution"
                                type="text"
                                name="institution"
                                value={data.institution}
                                onChange={(e) =>
                                    setData("institution", e.target.value)
                                }
                                placeholder="Masukkan nama instansi"
                                className="!w-full !h-[44px] !rounded-lg transition-all"
                                style={{ borderColor: colors.border }}
                            />
                            <InputError
                                message={errors.institution}
                                className="mt-1"
                            />
                        </div>

                        {/* Kota Asal */}
                        <div className="sm:col-span-2">
                            <InputLabel
                                htmlFor="city_origin"
                                value="Kota Asal"
                                className="font-semibold"
                                style={{ color: colors.textDark }}
                            />
                            <Input
                                size="large"
                                prefix={
                                    <HomeOutlined
                                        style={{ color: colors.textMuted }}
                                    />
                                }
                                id="city_origin"
                                type="text"
                                name="city_origin"
                                value={data.city_origin}
                                onChange={(e) =>
                                    setData("city_origin", e.target.value)
                                }
                                placeholder="Masukkan kota asal anda"
                                className="!w-full !h-[44px] !rounded-lg transition-all"
                                style={{ borderColor: colors.border }}
                            />
                            <InputError
                                message={errors.city_origin}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    {/* Password */}
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
                            autoComplete="new-password"
                            placeholder="Masukkan password anda"
                            className="!w-full !h-[44px] !rounded-lg transition-all"
                            style={{ borderColor: colors.border }}
                        />
                        <InputError
                            message={errors.password}
                            className="mt-1"
                        />
                    </div>

                    {/* Konfirmasi Password */}
                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Konfirmasi Password"
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
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            placeholder="Konfirmasi password anda"
                            className="!w-full !h-[44px] !rounded-lg transition-all"
                            style={{ borderColor: colors.border }}
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-1"
                        />
                    </div>

                    {/* Tombol Submit */}
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
                            Daftar
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

                    {/* Link ke Login */}
                    <div className="mt-4 text-center">
                        <p
                            className="text-sm"
                            style={{ color: colors.textMuted }}
                        >
                            Sudah punya akun?{" "}
                            <Link
                                href={route("login")}
                                className="font-medium hover:underline"
                                style={{ color: colors.primary }}
                            >
                                Masuk di sini
                            </Link>
                        </p>
                    </div>
                </form>

                {/* Footer */}
                <div
                    className="mt-8 text-center text-xs"
                    style={{ color: "#9CA3AF" }}
                >
                    <p>© 2025 Solo Technopark</p>
                </div>
            </motion.div>
        </div>
    );
}
