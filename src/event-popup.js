// src/event-popup.js

import { openLightbox } from './lightbox.js';

// --- DOM 元素 ---
const popupOverlay = document.getElementById('eventPopupOverlay');
const popupContainer = document.getElementById('eventPopupContainer');

// --- 狀態變數 ---
let popupImages = [];
let popupCaptions = [];
let popupCurrentIndex = 0;
let language = 'en';

// --- 【新增】觸控滑動相關的狀態變數 ---
let touchStartX = 0;
let touchCurrentX = 0;
let isDragging = false;
let sliderWidth = 0;

// 使用 CSS class 來控制按鈕顯示
function updateArrowVisibility() {
    const prevBtn = document.getElementById('popupPrevButton');
    const nextBtn = document.getElementById('popupNextButton');
    if (!prevBtn || !nextBtn) return;

    prevBtn.classList.toggle('is-hidden', popupCurrentIndex === 0);
    nextBtn.classList.toggle('is-hidden', popupCurrentIndex === popupImages.length - 1);
}

// 執行滑動的核心函式
function slideToIndex(index) {
    const slider = document.getElementById('image-slider-container');
    if (!slider) return;

    if (index < 0 || index >= popupImages.length) {
        return;
    }

    const newTransformValue = `translateX(-${index * 100}%)`;
    slider.style.transition = 'transform 0.4s ease-in-out'; // 確保有動畫效果
    slider.style.transform = newTransformValue;
    popupCurrentIndex = index;

    updateArrowVisibility();
}

// 顯示下一張圖片
function showNextInPopup() {
    if (popupCurrentIndex < popupImages.length - 1) {
        slideToIndex(popupCurrentIndex + 1);
    }
}

// 顯示上一張圖片
function showPrevInPopup() {
    if (popupCurrentIndex > 0) {
        slideToIndex(popupCurrentIndex - 1);
    }
}

// --- 【新增】處理手指觸控開始的函式 ---
function handleTouchStart(e) {
    if (popupImages.length <= 1) return;
    isDragging = true;
    touchStartX = e.touches[0].clientX;
    const slider = document.getElementById('image-slider-container');
    slider.style.transition = 'none'; // 滑動時暫時移除動畫
    sliderWidth = slider.offsetWidth; // 取得容器寬度
}

// --- 【新增】處理手指移動的函式 ---
function handleTouchMove(e) {
    if (!isDragging || popupImages.length <= 1) return;
    touchCurrentX = e.touches[0].clientX;
    const diff = touchCurrentX - touchStartX;
    
    // 讓圖片跟著手指即時移動
    const currentTranslate = -popupCurrentIndex * sliderWidth;
    const newTranslate = currentTranslate + diff;

    const slider = document.getElementById('image-slider-container');
    slider.style.transform = `translateX(${newTranslate}px)`; // 用像素移動，更即時
}

// --- 【新增】處理手指離開螢幕的函式 ---
function handleTouchEnd() {
    if (!isDragging || popupImages.length <= 1) return;
    isDragging = false;
    
    const diff = touchCurrentX - touchStartX;
    const swipeThreshold = 50; // 設定一個滑動閾值，避免輕微誤觸

    // 判斷滑動方向和距離
    if (diff < -swipeThreshold) {
        // 向左滑，顯示下一張
        showNextInPopup();
    } else if (diff > swipeThreshold) {
        // 向右滑，顯示上一張
        showPrevInPopup();
    } else {
        // 滑動距離不夠，彈回原位
        slideToIndex(popupCurrentIndex);
    }
    
    // 清理起始點，為下次滑動做準備
    touchStartX = 0;
    touchCurrentX = 0;
}


function closePopup() {
    document.body.classList.remove('popup-is-open');
    popupOverlay.classList.remove('is-visible');
    popupOverlay.setAttribute('aria-hidden', 'true');
    const direction = popupContainer.dataset.direction || 'right';
    popupContainer.classList.remove(`from-${direction}`);
    setTimeout(() => {
        popupContainer.innerHTML = '';
    }, 400);
}

function handleImageClick() {
    openLightbox(popupImages, popupCaptions, popupCurrentIndex, language);
}

function handleKeyDown(e) {
    if (e.key === 'Escape') closePopup();
    if (e.key === 'ArrowRight') showNextInPopup();
    if (e.key === 'ArrowLeft') showPrevInPopup();
}

export function showEventPopup(event, details, currentLang, direction = 'right') {
    language = currentLang;
    const hasImages = details.imageUrl && Array.isArray(details.imageUrl) && details.imageUrl.length > 0;

    if (hasImages) {
        popupImages = details.imageUrl;
        popupCaptions = details.imageCaption || [];
        popupCurrentIndex = 0;
    }

    const imagesHTML = hasImages ? popupImages.map(imgUrl =>
        `<div class="image-slide"><img src="${imgUrl}" alt="" class="event-popup-image"></div>`
    ).join('') : '';

    const fullDescription = details.fullDescription ? (details.fullDescription[currentLang] || details.fullDescription['en']) : '';
    const sourceText = details.sourceText ? (details.sourceText[currentLang] || details.sourceText['en']) : 'Learn More';
    const eventName = event.eventName[currentLang] || event.eventName['en'];

    popupContainer.innerHTML = `
        <button id="eventPopupCloseButton" class="event-popup-close-button" aria-label="Close details">&times;</button>
        ${hasImages ? `
            <div id="popupImageWrapper" class="event-popup-image-wrapper">
                <div id="image-slider-container">${imagesHTML}</div>
                <button id="popupPrevButton" class="popup-image-nav-button prev" aria-label="Previous image">&#10094;</button>
                <button id="popupNextButton" class="popup-image-nav-button next" aria-label="Next image">&#10095;</button>
            </div>
        ` : ''}
        <div class="event-popup-content">
            <h3 class="event-popup-title">${eventName}</h3>
            <p class="event-popup-description">${fullDescription.replace(/\n/g, '<br>')}</p>
            ${details.sourceUrl ? `
                <a href="${details.sourceUrl}" target="_blank" rel="noopener noreferrer" class="event-popup-source-link">
                    ${sourceText}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5-.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
                </a>
            ` : ''}
        </div>
    `;

    // 綁定事件
    document.getElementById('eventPopupCloseButton')?.addEventListener('click', closePopup);
    if (hasImages) {
        const imageWrapper = document.getElementById('popupImageWrapper');
        imageWrapper?.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON' && !isDragging) handleImageClick();
        });
        document.getElementById('popupNextButton')?.addEventListener('click', showNextInPopup);
        document.getElementById('popupPrevButton')?.addEventListener('click', showPrevInPopup);
        
        // --- 【新增】為圖片容器加上觸控事件的監聽 ---
        imageWrapper?.addEventListener('touchstart', handleTouchStart, { passive: true });
        imageWrapper?.addEventListener('touchmove', handleTouchMove, { passive: true });
        imageWrapper?.addEventListener('touchend', handleTouchEnd);
        
        updateArrowVisibility();
        if (popupImages.length <= 1) {
            const nextBtn = document.getElementById('popupNextButton');
            const prevBtn = document.getElementById('popupPrevButton');
            if (nextBtn) nextBtn.classList.add('is-hidden');
            if (prevBtn) prevBtn.classList.add('is-hidden');
        }
    }

    popupContainer.dataset.direction = direction;
    popupContainer.classList.add(`from-${direction}`);
    document.body.classList.add('popup-is-open');
    popupOverlay.classList.add('is-visible');
    popupOverlay.setAttribute('aria-hidden', 'false');
    popupContainer.focus();
    popupOverlay.addEventListener('click', (e) => { if (e.target === popupOverlay) closePopup(); });
    document.addEventListener('keydown', handleKeyDown);
}