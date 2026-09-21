(() => {
    // Jangan tampilkan lebih dari sekali dalam satu sesi login
    if (window.__expuzAnnouncementShown) return;

    // Tunggu sampai halaman Home Jellyfin selesai dimuat
    const showAnnouncement = () => {
        if (window.__expuzAnnouncementShown) return;

        // Hanya tampil di halaman Home
        if (!location.hash.includes("#/home")) return;

        window.__expuzAnnouncementShown = true;

        const overlay = document.createElement("div");
        overlay.id = "expuz-announcement";

        overlay.innerHTML = `
            <div class="expuz-announcement-box">
                <button class="expuz-announcement-close" aria-label="Close">×</button>

                <div class="expuz-announcement-title">
                    📢 Pengumuman
                </div>

                <div class="expuz-announcement-content">
                    <h3>Selamat datang di Expuz Stream!</h3>
                    <p>
                        Selamat menikmati koleksi film, anime, series,
                        dan berbagai konten yang tersedia.
                    </p>
                </div>

                <button class="expuz-announcement-button">
                    TUTUP
                </button>
            </div>
        `;

        document.body.appendChild(overlay);

        const close = () => {
            overlay.classList.add("expuz-announcement-hidden");

            setTimeout(() => {
                overlay.remove();
            }, 250);
        };

        overlay
            .querySelector(".expuz-announcement-close")
            .addEventListener("click", close);

        overlay
            .querySelector(".expuz-announcement-button")
            .addEventListener("click", close);
    };

    // Jellyfin kadang membutuhkan waktu setelah navigasi
    const check = setInterval(() => {
        if (
            location.hash.includes("#/home") &&
            document.body
        ) {
            clearInterval(check);
            setTimeout(showAnnouncement, 500);
        }
    }, 500);

    // Jangan cek selamanya
    setTimeout(() => clearInterval(check), 15000);
})();
