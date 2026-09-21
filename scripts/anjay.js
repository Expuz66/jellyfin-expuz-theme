(() => {
    if (window.__expuzAnnouncementLoaded) return;
    window.__expuzAnnouncementLoaded = true;

    const STORAGE_KEY = "expuzAnnouncementShown";

    // Deteksi halaman login
    const isLoginPage = () => {
        return location.hash.includes("#/login");
    };

    // Tandai popup sudah pernah ditampilkan
    const markAsShown = () => {
        sessionStorage.setItem(STORAGE_KEY, "true");
    };

    // Cek apakah sudah pernah ditampilkan
    const alreadyShown = () => {
        return sessionStorage.getItem(STORAGE_KEY) === "true";
    };

    const showAnnouncement = () => {
        // Jangan tampilkan kalau sudah pernah muncul
        if (alreadyShown()) return;

        // Jangan tampilkan kalau bukan Home
        if (!location.hash.includes("#/home")) return;

        // Jangan duplikat
        if (document.getElementById("expuz-announcement")) return;

        // Tandai SEBELUM popup dibuat
        markAsShown();

        const overlay = document.createElement("div");
        overlay.id = "expuz-announcement";

        overlay.innerHTML = `
            <div class="expuz-announcement-box">
                <button
                    class="expuz-announcement-close"
                    type="button"
                    aria-label="Tutup"
                >×</button>

                <div class="expuz-announcement-icon"></div>

                <h2>Pengumuman</h2>

                <div class="expuz-announcement-content">
                    <h3>Selamat datang di Expuz Stream!</h3>

                    <p>
                        Selamat menikmati berbagai film,
                        anime, series, dan konten lainnya.
                    </p>
                </div>

                <button
                    class="expuz-announcement-button"
                    type="button"
                >
                    TUTUP
                </button>
            </div>
        `;

        document.body.appendChild(overlay);
      document.documentElement.style.overflow = "hidden";
document.body.style.overflow = "hidden";

        requestAnimationFrame(() => {
            overlay.classList.add("expuz-announcement-visible");
        });

        const close = () => {
    overlay.classList.remove("expuz-announcement-visible");

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

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

        overlay.addEventListener("click", (event) => {
            if (event.target === overlay) {
                close();
            }
        });
    };

    let lastUrl = location.href;

    const checkPage = () => {
        const currentUrl = location.href;

        // Kalau user kembali ke halaman login,
        // reset supaya login berikutnya mendapat announcement lagi.
        if (isLoginPage()) {
            sessionStorage.removeItem(STORAGE_KEY);
        }

        // URL berubah
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;

            if (currentUrl.includes("#/home")) {
                setTimeout(showAnnouncement, 700);
            }
        }
    };

    // Pantau navigasi Jellyfin
    setInterval(checkPage, 500);

    // Kalau script dijalankan ketika sudah berada di Home
    if (location.hash.includes("#/home") && !alreadyShown()) {
        setTimeout(showAnnouncement, 1200);
    }
})();
