// src/event-popup.js

import { openLightbox } from './lightbox.js';

// DOM 元素快取
const popupOverlay = document.getElementById('eventPopupOverlay');
const popupContainer = document.getElementById('eventPopupContainer');

// 狀態變數
let currentCloseButton = null;
let currentImageWrapper = null;
let currentPopupPrevBtn = null;
let currentPopupNextBtn = null;
let popupImages = [];
let currentPopupIndex = 0;
let touchStartX = 0; // 新增：用於滑動
let touchEndX = 0; // 新增：用於滑動

// --- 內部圖片切換邏輯 ---
function showImageInPopup(index) {
    if (index < 0 || index >= popupImages.length) return;
    currentPopupIndex = index;
    const imgElement = popupContainer.querySelector('.event-popup-image');
    if (imgElement) {
        imgElement.src = popupImages[currentPopupIndex];
    }
    if (currentPopupPrevBtn && currentPopupNextBtn) {
        currentPopupPrevBtn.style.display = (currentPopupIndex === 0) ? 'none' : 'flex';
        currentPopupNextBtn.style.display = (currentPopupIndex === popupImages.length - 1) ? 'none' : 'flex';
    }
}

function showNextInPopup(e) {
    if (e) e.stopPropagation(); // 防止觸發燈箱
    showImageInPopup(currentPopupIndex + 1);
}

function showPrevInPopup(e) {
    if (e) e.stopPropagation(); // 防止觸發燈箱
    showImageInPopup(currentPopupIndex - 1);
}

// --- 新增：處理彈出視窗內的滑動手勢 ---
function handlePopupGesture() {
    // 如果起點和終點一樣 (表示只是點擊而不是滑動)，就不做任何事
    if (touchStartX === touchEndX) return;

    const swipeThreshold = 50; // 手指至少要滑動 50px 才會觸發
    if (touchEndX < touchStartX - swipeThreshold) {
        // 向左滑動
        showNextInPopup();
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // 向右滑動
        showPrevInPopup();
    }
}

// --- 燈箱與彈出視窗控制 ---
function closePopup() {
    if (!popupOverlay || !popupContainer) return;
    document.body.classList.remove('popup-is-open');
    popupOverlay.classList.remove('is-visible');
    popupOverlay.setAttribute('aria-hidden', 'true');
    const direction = popupContainer.dataset.direction || 'right';
    popupContainer.classList.remove(`from-${direction}`);
    setTimeout(() => {
        popupContainer.innerHTML = '';
        currentCloseButton?.removeEventListener('click', closePopup);
        currentImageWrapper?.removeEventListener('click', handleImageClick);
        currentPopupPrevBtn?.removeEventListener('click', showPrevInPopup);
        currentPopupNextBtn?.removeEventListener('click', showNextInPopup);
        // 新增：移除滑動事件監聽
        currentImageWrapper?.removeEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; });
        currentImageWrapper?.removeEventListener('touchend', (e) => { touchEndX = e.changedTouches[0].screenX; handlePopupGesture(); });
        
        currentCloseButton = null;
        currentImageWrapper = null;
        currentPopupPrevBtn = null;
        currentPopupNextBtn = null;
        popupImages = [];
        currentPopupIndex = 0;
    }, 400); 
}

function handleImageClick(e) {
    // 如果只是滑動，就不打開燈箱
    if (touchStartX !== touchEndX) return;
    openLightbox(popupImages, currentPopupIndex);
}

function handleKeyDown(e) {
    if (e.key === 'Escape') closePopup();
}

// --- 主要匯出函式 ---
export function showEventPopup(event, details, currentLang, direction = 'right') {
    if (!popupOverlay || !popupContainer) return;
    const imageCaption = details.imageCaption ? (details.imageCaption[currentLang] || details.imageCaption['en']) : '';
    const fullDescription = details.fullDescription ? (details.fullDescription[currentLang] || details.fullDescription['en']) : '';
    const sourceText = details.sourceText ? (details.sourceText[currentLang] || details.sourceText['en']) : 'Learn More';
    const eventName = event.eventName[currentLang] || event.eventName['en'];
    const hasImages = details.imageUrl && Array.isArray(details.imageUrl) && details.imageUrl.length > 0;
    if (hasImages) {
        popupImages = details.imageUrl;
        currentPopupIndex = 0;
    }

    popupContainer.innerHTML = `
        <button id="eventPopupCloseButton" class="event-popup-close-button" aria-label="Close details">&times;</button>
        ${hasImages ? `
            <div id="popupImageWrapper" class="event-popup-image-wrapper" style="cursor: pointer;">
                <img src="${popupImages[0]}" alt="${imageCaption}" class="event-popup-image">
                ${popupImages.length > 1 ? `
                    <button class="popup-image-nav-button prev" aria-label="Previous image" style="display: none;">&#10094;</button>
                    <button class="popup-image-nav-button next" aria-label="Next image">&#10095;</button>
                ` : ''}
            </div>
        ` : ''}
        ${imageCaption ? `<div class="event-popup-caption">${imageCaption}</div>` : ''}
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

    currentCloseButton = document.getElementById('eventPopupCloseButton');
    currentCloseButton?.addEventListener('click', closePopup);
    if (hasImages) {
        currentImageWrapper = document.getElementById('popupImageWrapper');
        currentPopupPrevBtn = popupContainer.querySelector('.popup-image-nav-button.prev');
        currentPopupNextBtn = popupContainer.querySelector('.popup-image-nav-button.next');
        currentImageWrapper?.addEventListener('click', handleImageClick);
        currentPopupPrevBtn?.addEventListener('click', showPrevInPopup);
        currentPopupNextBtn?.addEventListener('click', showNextInPopup);

        // --- 為彈出視窗圖片加上滑動事件 ---
        if (currentImageWrapper) {
            currentImageWrapper.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                touchEndX = e.changedTouches[0].screenX; // 重置終點
            }, { passive: true });
            currentImageWrapper.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handlePopupGesture();
            });
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