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

// --- 內部圖片切換邏輯 ---
function showImageInPopup(index) {
    if (index < 0 || index >= popupImages.length) return;

    currentPopupIndex = index;
    const imgElement = popupContainer.querySelector('.event-popup-image');
    if (imgElement) {
        imgElement.src = popupImages[currentPopupIndex];
    }

    // 更新按鈕的可見性
    if (currentPopupPrevBtn && currentPopupNextBtn) {
        currentPopupPrevBtn.style.display = (currentPopupIndex === 0) ? 'none' : 'flex';
        currentPopupNextBtn.style.display = (currentPopupIndex === popupImages.length - 1) ? 'none' : 'flex';
    }
}

function showNextInPopup(e) {
    e.stopPropagation(); // 防止觸發燈箱
    showImageInPopup(currentPopupIndex + 1);
}

function showPrevInPopup(e) {
    e.stopPropagation(); // 防止觸發燈箱
    showImageInPopup(currentPopupIndex - 1);
}


// --- 燈箱與彈出視窗控制 ---
function closePopup() {
    if (!popupOverlay || !popupContainer) return;

    document.body.classList.remove('popup-is-open');
    popupOverlay.classList.remove('is-visible');
    popupOverlay.setAttribute('aria-hidden', 'true');

    const direction = popupContainer.dataset.direction || 'right';
    popupContainer.classList.remove(`from-${direction}`);

    // 清空內容並移除所有事件監聽
    setTimeout(() => {
        popupContainer.innerHTML = '';
        // 清理舊的事件監聽器
        currentCloseButton?.removeEventListener('click', closePopup);
        currentImageWrapper?.removeEventListener('click', handleImageClick);
        currentPopupPrevBtn?.removeEventListener('click', showPrevInPopup);
        currentPopupNextBtn?.removeEventListener('click', showNextInPopup);
        // 重置所有變數
        currentCloseButton = null;
        currentImageWrapper = null;
        currentPopupPrevBtn = null;
        currentPopupNextBtn = null;
        popupImages = [];
        currentPopupIndex = 0;
    }, 400); 
}

function handleImageClick(e) {
    openLightbox(popupImages, currentPopupIndex);
}

function handleKeyDown(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
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
            ${fullDescription ? `<p class="event-popup-description">${fullDescription.replace(/\n/g, '<br>')}</p>` : ''}
            ${details.sourceUrl ? `
                <a href="${details.sourceUrl}" target="_blank" rel="noopener noreferrer" class="event-popup-source-link">
                    ${sourceText}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5-.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                    </svg>
                </a>
            ` : ''}
        </div>
    `;

    // 綁定事件
    currentCloseButton = document.getElementById('eventPopupCloseButton');
    if (currentCloseButton) {
        currentCloseButton.addEventListener('click', closePopup);
    }

    if (hasImages) {
        currentImageWrapper = document.getElementById('popupImageWrapper');
        currentPopupPrevBtn = popupContainer.querySelector('.popup-image-nav-button.prev');
        currentPopupNextBtn = popupContainer.querySelector('.popup-image-nav-button.next');

        if (currentImageWrapper) {
            currentImageWrapper.addEventListener('click', handleImageClick);
        }
        if (currentPopupPrevBtn) {
            currentPopupPrevBtn.addEventListener('click', showPrevInPopup);
        }
        if (currentPopupNextBtn) {
            currentPopupNextBtn.addEventListener('click', showNextInPopup);
        }
    }

    popupContainer.dataset.direction = direction;
    popupContainer.classList.add(`from-${direction}`);

    document.body.classList.add('popup-is-open');
    popupOverlay.classList.add('is-visible');
    popupOverlay.setAttribute('aria-hidden', 'false');

    popupContainer.focus();

    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    document.addEventListener('keydown', handleKeyDown);
}