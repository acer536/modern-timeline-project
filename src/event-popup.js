// src/event-popup.js

// 取得 HTML 元素
const popupOverlay = document.getElementById('eventPopupOverlay');
const popupContainer = document.getElementById('eventPopupContainer');
let currentCloseButton = null;

// 關閉彈出式視窗的函式
function closePopup() {
    if (!popupOverlay || !popupContainer) return;

    document.body.classList.remove('popup-is-open');
    popupOverlay.classList.remove('is-visible');
    popupOverlay.setAttribute('aria-hidden', 'true');

    // 移除動畫 class，為下次開啟做準備
    const direction = popupContainer.dataset.direction || 'right';
    popupContainer.classList.remove(`from-${direction}`);

    // 清空內容
    setTimeout(() => {
        popupContainer.innerHTML = '';
        if (currentCloseButton) {
            currentCloseButton.removeEventListener('click', closePopup);
            currentCloseButton = null;
        }
    }, 400); // 等待動畫結束
}

// 監聽鍵盤 Esc 事件
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
}

// 顯示彈出式視窗的函式
export function showEventPopup(event, details, currentLang, direction = 'right') {
    if (!popupOverlay || !popupContainer) return;

    // 從翻譯物件中取得對應語言的文字，如果沒有就備用 en
    const imageCaption = details.imageCaption ? (details.imageCaption[currentLang] || details.imageCaption['en']) : '';
    const fullDescription = details.fullDescription ? (details.fullDescription[currentLang] || details.fullDescription['en']) : '';
    const sourceText = details.sourceText ? (details.sourceText[currentLang] || details.sourceText['en']) : 'Learn More';
    const eventName = event.eventName[currentLang] || event.eventName['en'];

    // 建立彈出式視窗的內部 HTML
    popupContainer.innerHTML = `
        <button id="eventPopupCloseButton" class="event-popup-close-button" aria-label="Close details">&times;</button>
        ${details.imageUrl ? `
            <div class="event-popup-image-wrapper">
                <img src="${details.imageUrl}" alt="${imageCaption}" class="event-popup-image">
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
                        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                    </svg>
                </a>
            ` : ''}
        </div>
    `;

    // 綁定新的關閉按鈕事件
    currentCloseButton = document.getElementById('eventPopupCloseButton');
    if (currentCloseButton) {
        currentCloseButton.addEventListener('click', closePopup);
    }

    // 準備動畫方向
    popupContainer.dataset.direction = direction;
    popupContainer.classList.add(`from-${direction}`);

    // 顯示
    document.body.classList.add('popup-is-open');
    popupOverlay.classList.add('is-visible');
    popupOverlay.setAttribute('aria-hidden', 'false');

    // 讓視窗可以被鍵盤操作
    popupContainer.focus();

    // 加上事件監聽
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    document.addEventListener('keydown', handleKeyDown);
}