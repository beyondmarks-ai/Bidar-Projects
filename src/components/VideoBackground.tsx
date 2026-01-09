
const VideoBackground = () => {
    return (
        <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-black/40 z-10" /> {/* Lighter Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10" />
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-90"
            >
                <source src="/hero-background.mp4" type="video/mp4" />
            </video>
        </div>
    );
};

export default VideoBackground;
