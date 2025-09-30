// src/lightbox.js

// --- 狀態變數 ---
let lightboxOverlay = null;
let imageList = [];
let captionList = [];
let currentIndex = 0;
let language = 'en';

// --- 觸控滑動相關的狀態變數 ---
let touchStartX = 0;
let touchCurrentX = 0;
let isDragging = false;
let sliderWidth = 0;

// 更新左右箭頭的顯示狀態
function updateLightboxArrowVisibility() {
    const prevBtn = lightboxOverlay.querySelector('.lightbox-nav-button.prev');
    const nextBtn = lightboxOverlay.querySelector('.lightbox-nav-button.next');
    if (!prevBtn || !nextBtn) return;

    if (imageList.length <= 1) {
        prevBtn.classList.add('is-hidden');
        nextBtn.classList.add('is-hidden');
        return;
    }

    prevBtn.classList.toggle('is-hidden', currentIndex === 0);
    nextBtn.classList.toggle('is-hidden', currentIndex === imageList.length - 1);
}

// 更新圖片說明
function updateLightboxCaption() {
    const captionDisplay = document.getElementById('lightbox-caption-display');
    if (!captionDisplay) return;

    const captionData = captionList[currentIndex];
    if (captionData) {
        const captionText = captionData[language] || captionData['en'] || '';
        captionDisplay.textContent = captionText;
        captionDisplay.style.display = captionText ? 'block' : 'none';
    } else {
        captionDisplay.style.display = 'none';
    }
}

// 滑動到指定索引的圖片
function slideLightboxToIndex(index) {
    const slider = document.getElementById('lightbox-slider-container');
    if (!slider || index < 0 || index >= imageList.length) return;

    const newTransformValue = `translateX(-${index * 100}%)`;
    slider.style.transition = 'transform 0.4s ease-in-out';
    slider.style.transform = newTransformValue;
    currentIndex = index;

    updateLightboxCaption();
    updateLightboxArrowVisibility();
}

// 顯示下一張
function showNextImage() {
    if (currentIndex < imageList.length - 1) {
        slideLightboxToIndex(currentIndex + 1);
    }
}

// 顯示上一張
function showPrevImage() {
    if (currentIndex > 0) {
        slideLightboxToIndex(currentIndex - 1);
    }
}

// --- 處理觸控事件的函式 ---
function handleLightboxTouchStart(e) {
    if (imageList.length <= 1) return;
    isDragging = true;
    touchStartX = e.touches[0].clientX;
    const slider = document.getElementById('lightbox-slider-container');
    slider.style.transition = 'none';
    sliderWidth = slider.offsetWidth;
}

function handleLightboxTouchMove(e) {
    if (!isDragging || imageList.length <= 1) return;
    touchCurrentX = e.touches[0].clientX;
    const diff = touchCurrentX - touchStartX;
    const currentTranslate = -currentIndex * sliderWidth;
    const newTranslate = currentTranslate + diff;
    const slider = document.getElementById('lightbox-slider-container');
    slider.style.transform = `translateX(${newTranslate}px)`;
}

function handleLightboxTouchEnd() {
    if (!isDragging || imageList.length <= 1) return;
    isDragging = false;
    const diff = touchCurrentX - touchStartX;
    const swipeThreshold = 50;

    if (diff < -swipeThreshold) {
        showNextImage();
    } else if (diff > swipeThreshold) {
        showPrevImage();
    } else {
        slideLightboxToIndex(currentIndex);
    }
    touchStartX = 0;
    touchCurrentX = 0;
}

function hideLightbox() {
    lightboxOverlay.classList.remove('is-visible');
    lightboxOverlay.setAttribute('aria-hidden', 'true');
}

// 建立燈箱的 HTML 結構
function createLightbox() {
    if (document.getElementById('lightboxOverlay')) return;

    // 【核心修正】將 lightbox-caption 放回 lightbox-content 內部
    const lightboxHTML = `
        <div id="lightboxOverlay" class="lightbox-overlay" aria-hidden="true" role="dialog" aria-modal="true">
            <button class="lightbox-close-button" aria-label="Close image view">&times;</button>
            
            <div class="lightbox-content">
                <div id="lightbox-viewport">
                    <div id="lightbox-slider-container"></div>
                </div>
                <div class="lightbox-caption" id="lightbox-caption-display"></div>
            </div>

            <button class="lightbox-nav-button prev" aria-label="Previous image">&#10094;</button>
            <button class="lightbox-nav-button next" aria-label="Next image">&#10095;</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    lightboxOverlay = document.getElementById('lightboxOverlay');

    // 綁定固定的事件
    lightboxOverlay.querySelector('.lightbox-close-button').addEventListener('click', hideLightbox);
    lightboxOverlay.addEventListener('click', (e) => {
        const target = e.target;
        // 檢查點擊的目標是否是任何一個 "空白" 容器
        if (
            target === lightboxOverlay || // 1. 最外層的黑色背景
            target.classList.contains('lightbox-content') || // 2. 包圍圖片和文字的內容區
            target.id === 'lightbox-viewport' || // 3. 圖片左右的 "視窗"
            target.classList.contains('lightbox-slide') // 4. 包圍圖片的透明滑動區
        ) {
            hideLightbox();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (!lightboxOverlay || !lightboxOverlay.classList.contains('is-visible')) return;
        if (e.key === 'Escape') hideLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    });
}

// 主要的匯出函式，用來打開燈箱
export function openLightbox(images, captions = [], startIndex = 0, lang = 'en') {
    if (!images || images.length === 0) return;
    if (!lightboxOverlay) createLightbox();

    imageList = images;
    captionList = captions;
    currentIndex = startIndex;
    language = lang;

    const sliderContainer = document.getElementById('lightbox-slider-container');
    const slidesHTML = imageList.map(imgUrl => {
        const captionData = captionList[imageList.indexOf(imgUrl)] || {};
        const altText = captionData[lang] || captionData['en'] || '';
        return `<div class="lightbox-slide"><img src="${imgUrl}" alt="${altText}" class="lightbox-image"></div>`;
    }).join('');
    sliderContainer.innerHTML = slidesHTML;

    document.body.classList.add('popup-is-open');
    lightboxOverlay.classList.add('is-visible');
    lightboxOverlay.setAttribute('aria-hidden', 'false');
    
    // 初始化
    slideLightboxToIndex(currentIndex); // 直接使用這個函式來初始化位置和狀態

    // 綁定事件
    lightboxOverlay.querySelector('.lightbox-nav-button.next').addEventListener('click', showNextImage);
    lightboxOverlay.querySelector('.lightbox-nav-button.prev').addEventListener('click', showPrevImage);
    
    const viewport = document.getElementById('lightbox-viewport');
    viewport.addEventListener('touchstart', handleLightboxTouchStart, { passive: true });
    viewport.addEventListener('touchmove', handleLightboxTouchMove, { passive: true });
    viewport.addEventListener('touchend', handleLightboxTouchEnd);
}