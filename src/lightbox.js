// src/lightbox.js

// --- DOM 元素 ---
let lightboxOverlay = null;
let lightboxImage = null;
let lightboxPrevBtn = null;
let lightboxNextBtn = null;
let lightboxCounter = null;

// --- 狀態變數 ---
let images = [];
let currentIndex = 0;

// --- 函式 ---
function createLightbox() {
    if (document.getElementById('lightboxOverlay')) return;

    const lightboxHTML = `
        <div id="lightboxOverlay" class="lightbox-overlay" aria-hidden="true" role="dialog" aria-modal="true">
            <button class="lightbox-close-button" aria-label="Close image view">&times;</button>
            <button class="lightbox-nav-button prev" aria-label="Previous image">&#10094;</button>
            <div class="lightbox-content">
                <img src="" alt="" class="lightbox-image">
            </div>
            <button class="lightbox-nav-button next" aria-label="Next image">&#10095;</button>
            <div class="lightbox-counter"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    // 快取 DOM 元素
    lightboxOverlay = document.getElementById('lightboxOverlay');
    lightboxImage = lightboxOverlay.querySelector('.lightbox-image');
    lightboxPrevBtn = lightboxOverlay.querySelector('.prev');
    lightboxNextBtn = lightboxOverlay.querySelector('.next');
    lightboxCounter = lightboxOverlay.querySelector('.lightbox-counter');
    const lightboxCloseBtn = lightboxOverlay.querySelector('.lightbox-close-button');

    // 綁定事件
    lightboxCloseBtn.addEventListener('click', hideLightbox);
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            hideLightbox();
        }
    });
    lightboxPrevBtn.addEventListener('click', showPrevImage);
    lightboxNextBtn.addEventListener('click', showNextImage);
    document.addEventListener('keydown', handleKeydown);
}

function showImage(index) {
    if (index < 0 || index >= images.length) return;

    currentIndex = index;
    lightboxImage.src = images[currentIndex];

    // 更新計數器和按鈕狀態
    lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    lightboxPrevBtn.style.display = (currentIndex === 0) ? 'none' : 'flex';
    lightboxNextBtn.style.display = (currentIndex === images.length - 1) ? 'none' : 'flex';
}

function showNextImage() {
    showImage(currentIndex + 1);
}

function showPrevImage() {
    showImage(currentIndex - 1);
}

function handleKeydown(e) {
    if (lightboxOverlay.classList.contains('is-visible')) {
        if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
            showNextImage();
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            showPrevImage();
        } else if (e.key === 'Escape') {
            hideLightbox();
        }
    }
}

function hideLightbox() {
    document.body.classList.remove('popup-is-open'); // 使用和彈出視窗一樣的 class 來鎖定滾動
    lightboxOverlay.classList.remove('is-visible');
    lightboxOverlay.setAttribute('aria-hidden', 'true');
}

// --- 匯出的主要函式 ---
export function openLightbox(imageList, startIndex = 0) {
    if (!imageList || imageList.length === 0) return;

    // 如果燈箱還沒被建立，就先建立它
    if (!lightboxOverlay) {
        createLightbox();
    }

    images = imageList;

    document.body.classList.add('popup-is-open');
    lightboxOverlay.classList.add('is-visible');
    lightboxOverlay.setAttribute('aria-hidden', 'false');

    showImage(startIndex);
}