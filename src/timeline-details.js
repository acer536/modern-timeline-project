// src/timeline-details.js

// 這是專門存放攻擊事件詳細資料的地方。
// 每個事件的 ID (例如 'event_1946_king_david') 必須和 script.js 中的 ID 完全一樣。

export const eventDetails = {
  // 範例 1：大衛王酒店爆炸案
  event_1946_king_david: {
    imageUrl: ['./images/king_david_hotel_bombing.jpg'],
    imageCaption: [
      {
        zh: '爆炸後的大衛王酒店南翼。',
        en: 'The southern wing of the King David Hotel after the bombing.',
      },
    ],
    fullDescription: {
      zh: '伊爾貢組織成員偽裝成阿拉伯工人，將裝有炸藥的牛奶罐運入酒店地下室的廚房。爆炸對酒店的整個南翼造成了毀滅性破壞，這裡是英屬託管政府秘書處和部分英軍總部的所在地。這起攻擊至今仍在歷史上引發巨大爭議。',
      en: "Members of the Irgun, disguised as Arab workers, smuggled milk churns filled with explosives into the hotel's basement kitchen. The explosion destroyed the entire southern wing of the hotel, which housed the Secretariat of the Mandate government and part of the British military headquarters. The attack remains a highly controversial event in history.",
    },
    sourceUrl:
      'https://www.theguardian.com/world/2006/jul/23/israelandthepalestinians.features',
    sourceText: {
      zh: '閱讀衛報的相關報導',
      en: "Read The Guardian's report",
    },
  },
  // 範例 2：海岸公路大屠殺
  event_1978_coastal_road: {
    imageUrl: [
      './images/coastal_road_massacre_bus.jpg',
      './images/coastal_road_massacre_bus_2.jpg',
    ],
    imageCaption: [
      {
        zh: '調查人員正在檢查被劫持並燒毀的巴士殘骸。',
        en: 'Investigators examining the wreckage of the hijacked and burnt-out bus.',
      },
      {
        zh: '從另一個角度看被摧毀的巴士。',
        en: 'The destroyed bus viewed from another angle.',
      },
    ],
    fullDescription: {
      zh: '由法塔赫組織的11名成員從海上登陸後，劫持了一輛滿載乘客的巴士。在與以色列安全部隊的追逐和交火中，巴士最終爆炸起火，造成大量平民死亡，其中包括13名兒童。這起事件直接促使以色列在三天後發動了對黎巴嫩南部的「利塔尼行動」。',
      en: 'Eleven members of Fatah landed by sea and hijacked a bus full of passengers. During a chase and firefight with Israeli security forces, the bus exploded and caught fire, resulting in a large number of civilian deaths, including 13 children. This event directly prompted Israel to launch Operation Litani in Southern Lebanon three days later.',
    },
    sourceUrl:
      'https://www.nytimes.com/1978/03/12/archives/a-sabbath-of-terror-explodes-in-israel-terror-on-the-sabbath.html',
    sourceText: {
      zh: '閱讀紐約時報的原始報導',
      en: 'Read the original NYT report',
    },
  },
  // 您可以在這裡繼續新增更多事件...
  // 'event_id_goes_here': { ... },
};
