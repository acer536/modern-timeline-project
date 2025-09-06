// src/lightbox.js

// --- DOM 元素 ---
let lightboxOverlay = null;
let lightboxImage = null;
let lightboxContent = null;
let lightboxPrevBtn = null;
let lightboxNextBtn = null;
let lightboxCounter = null;
let lightboxCaption = null;

// --- 狀態變數 ---
let images = [];
let captions = [];
let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let isDragging = false; // 新增：判斷是否正在拖曳

// --- 函式 ---
function createLightbox() {
    if (document.getElementById('lightboxOverlay')) return;

    const lightboxHTML = `
        <div id="lightboxOverlay" class="lightbox-overlay" aria-hidden="true" role="dialog" aria-modal="true">
            <button class="lightbox-close-button" aria-label="Close image view">&times;</button>
            <button class="lightbox-nav-button prev" aria-label="Previous image">&#10094;</button>
            <div class="lightbox-content">
                <img src="" alt="" class="lightbox-image">
                <div class="lightbox-caption"></div>
            </div>
            <button class="lightbox-nav-button next" aria-label="Next image">&#10095;</button>
            <div class="lightbox-counter"></div>
        </div>
    `;    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    lightboxOverlay = document.getElementById('lightboxOverlay');
    lightboxImage = lightboxOverlay.querySelector('.lightbox-image');
    lightboxContent = lightboxOverlay.querySelector('.lightbox-content');
    lightboxPrevBtn = lightboxOverlay.querySelector('.prev');
    lightboxNextBtn = lightboxOverlay.querySelector('.next');
    lightboxCounter = lightboxOverlay.querySelector('.lightbox-counter');
    lightboxCaption = lightboxOverlay.querySelector('.lightbox-caption');
    const lightboxCloseBtn = lightboxOverlay.querySelector('.lightbox-close-button');

    // 綁定事件
    lightboxCloseBtn.addEventListener('click', hideLightbox);
    lightboxOverlay.addEventListener('click', (e) => { if (e.target === lightboxOverlay) hideLightbox(); });
    lightboxContent.addEventListener('click', (e) => { if (e.target === lightboxContent) hideLightbox(); });
    lightboxPrevBtn.addEventListener('click', showPrevImage);
    lightboxNextBtn.addEventListener('click', showNextImage);
    document.addEventListener('keydown', handleKeydown);

    // --- 觸控與滑鼠滑動事件監聽器 ---
    const startDrag = (e) => {
        isDragging = true;
        // 判斷是觸控事件還是滑鼠事件
        touchStartX = e.type === 'touchstart' ? e.changedTouches[0].screenX : e.screenX;
        // lightboxContent.style.cursor = 'grabbing';
    };

    const endDrag = (e) => {
        if (!isDragging) return;
        isDragging = false;
        touchEndX = e.type === 'touchend' ? e.changedTouches[0].screenX : e.screenX;
        // lightboxContent.style.cursor = 'grab';
        handleGesture();
    };
    
    // 手機觸控
    lightboxContent.addEventListener('touchstart', startDrag, { passive: true });
    lightboxContent.addEventListener('touchend', endDrag);

    // 電腦滑鼠拖曳
    lightboxContent.addEventListener('mousedown', startDrag);
    lightboxContent.addEventListener('mouseup', endDrag);
    lightboxContent.addEventListener('mouseleave', () => { // 如果滑鼠移出區域，取消拖曳
        if (isDragging) {
            isDragging = false;
            // lightboxContent.style.cursor = 'grab';
        }
    });
}

function showImage(index) {
    if (index < 0 || index >= images.length) return;
    currentIndex = index;
    lightboxImage.src = images[currentIndex];

    // 處理圖片說明
    const captionData = captions[currentIndex];
    const captionText = captionData ? (captionData['zh'] || captionData['en']) : ''; // 優先使用中文

    if (captionText) {
        lightboxCaption.textContent = captionText;
        lightboxCaption.style.display = 'block';
    } else {
        lightboxCaption.style.display = 'none';
    }

    // 更新計數器和導航按鈕
    lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    lightboxPrevBtn.style.display = (currentIndex === 0) ? 'none' : 'flex';
    lightboxNextBtn.style.display = (currentIndex === images.length - 1) ? 'none' : 'flex';
}

function showNextImage() { showImage(currentIndex + 1); }
function showPrevImage() { showImage(currentIndex - 1); }

function handleKeydown(e) {
    if (lightboxOverlay.classList.contains('is-visible')) {
        if (e.key === 'ArrowRight' && currentIndex < images.length - 1) showNextImage();
        else if (e.key === 'ArrowLeft' && currentIndex > 0) showPrevImage();
        else if (e.key === 'Escape') hideLightbox();
    }
}

function handleGesture() {
    // 如果起點和終點一樣 (表示只是點擊而不是滑動)，就不做任何事
    if (touchStartX === touchEndX) return;

    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold && currentIndex < images.length - 1) {
        showNextImage();
    } else if (touchEndX > touchStartX + swipeThreshold && currentIndex > 0) {
        showPrevImage();
    }
}

function hideLightbox() {
    document.body.classList.remove('popup-is-open');
    lightboxOverlay.classList.remove('is-visible');
    lightboxOverlay.setAttribute('aria-hidden', 'true');
}

export function openLightbox(imageList, captionList = [], startIndex = 0) {
    if (!imageList || imageList.length === 0) return;
    if (!lightboxOverlay) createLightbox();
    images = imageList;
    captions = captionList; // 儲存圖片說明
    document.body.classList.add('popup-is-open');
    lightboxOverlay.classList.add('is-visible');
    lightboxOverlay.setAttribute('aria-hidden', 'false');
    // lightboxContent.style.cursor = 'grab';
    showImage(startIndex);
}