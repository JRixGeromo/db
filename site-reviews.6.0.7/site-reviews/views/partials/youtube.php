<?php defined('ABSPATH') || exit;
    if (empty($youtube_bg)) {
        $youtube_bg = sprintf('https://i.ytimg.com/vi/%s/maxresdefault.jpg', $youtube_id);
    }
?>
<div class="glsr-youtube" style="background-image: url(<?= $youtube_bg; ?>);">
    <button class='glsr-youtube-button' data-id="<?= $youtube_id; ?>" aria-label="Play">
        <svg viewBox="0 0 1024 721" height="48" width="68">
            <path fill="#FFF" d="M407 493l276-143-276-144v287z"/>
            <path opacity=".12" fill="#420000" d="M407 206l242 161.6 34-17.6-276-144z"/>
            <linearGradient id="btn-<?= $youtube_id; ?>" gradientUnits="userSpaceOnUse" x1="512.5" y1="719.7" x2="512.5" y2="1.2" gradientTransform="matrix(1 0 0 -1 0 721)">
                <stop offset="0" stop-color="#e52d27"/>
                <stop offset="1" stop-color="#bf171d"/>
            </linearGradient>
            <path fill="url(#btn-<?= $youtube_id; ?>)" d="M1013 156.3s-10-70.4-40.6-101.4C933.6 14.2 890 14 870.1 11.6 727.1 1.3 512.7 1.3 512.7 1.3h-.4s-214.4 0-357.4 10.3C135 14 91.4 14.2 52.6 54.9 22 85.9 12 156.3 12 156.3S1.8 238.9 1.8 321.6v77.5C1.8 481.8 12 564.4 12 564.4s10 70.4 40.6 101.4c38.9 40.7 89.9 39.4 112.6 43.7 81.7 7.8 347.3 10.3 347.3 10.3s214.6-.3 357.6-10.7c20-2.4 63.5-2.6 102.3-43.3 30.6-31 40.6-101.4 40.6-101.4s10.2-82.7 10.2-165.3v-77.5c0-82.7-10.2-165.3-10.2-165.3zM407 493V206l276 144-276 143z"/>
        </svg>
    </button>
    <span class="glsr-youtube-overlay">
        <svg viewBox="0 0 500 200" preserveAspectRatio="none">
            <radialGradient id="gradient-<?= $youtube_id; ?>" cx=".5" cy="1.25" r="1.15">
                <stop offset="50%" stop-color="#000000"></stop>
                <stop offset="56%" stop-color="#0a0a0a"></stop>
                <stop offset="63%" stop-color="#262626"></stop>
                <stop offset="69%" stop-color="#4f4f4f"></stop>
                <stop offset="75%" stop-color="#808080"></stop>
                <stop offset="81%" stop-color="#b1b1b1"></stop>
                <stop offset="88%" stop-color="#dadada"></stop>
                <stop offset="94%" stop-color="#f6f6f6"></stop>
                <stop offset="100%" stop-color="#ffffff"></stop>
            </radialGradient>
            <mask id="mask-<?= $youtube_id; ?>">
                <rect x="0" y="0" width="500" height="200" fill="url(#gradient-<?= $youtube_id; ?>)"></rect>
            </mask>
            <rect style="height:100%;width:100%;" x="0" width="500" height="250" fill="currentColor" mask="url(#mask-<?= $youtube_id; ?>)"></rect>
        </svg>
    </span>
</div>
