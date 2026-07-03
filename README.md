# Expuz Stream Theme

Final upload folder for the Expuz Stream Jellyfin web theme branding fork.

Import from your server with:

```css
@import url("https://your-server.example/expuz-theme/theme.css");
```

Local branding assets:

- `logos/expuz-stream-logo.png`
- `images/expuz-background.jpg`

Main branding files:

- `theme.css` sets `--theme-name: 'Expuz Stream'` and imports local `loginpage.css` plus local default color preset.
- `loginpage.css` places the login logo, login background, and login footer text.
- `colors/jellyblue.css` defines the local Expuz logo/background/footer variables.
- `scripts/title.js` changes the browser title to `Expuz Stream`.

Optional add-on CSS files, including `arr-tags-links.css`, are intentionally not packaged here.