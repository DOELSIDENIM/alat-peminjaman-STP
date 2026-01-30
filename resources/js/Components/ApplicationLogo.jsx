export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/storage/alats/logo_stp.png"
            alt="Logo STP"
            className={`object-contain ${props.className || ''}`}
        />
    );
}
