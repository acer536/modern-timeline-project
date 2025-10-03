// src/script.js

// 新增：從我們建立的新檔案中引入資料和功能
import { eventDetails } from './timeline-details.js';
import { showEventPopup } from './event-popup.js';
import { openLightbox } from './lightbox.js';

(function detectDeviceOS() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const body = document.body;

  if (/android/i.test(userAgent)) {
    body.classList.add('is-android');
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    body.classList.add('is-ios');
  }
})();

const timelineData = {
  events: [
    {
      id: 'event_1920_nebi_musa',
      year: 1920,
      sortDate: '1920-04-04',
      eventName: {
        zh: 'Nebi Musa耶路撒冷舊城襲擊',
        en: 'Nebi Musa Riots, Old City of Jerusalem',
      },
      briefDescription: { zh: '持械襲擊，5死', en: 'Armed assault, 5 dead' },
      periodId: 'mandate_early_conflicts',
      isPeace: false,
      iconType: 'conflict',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1921_jaffa',
      year: 1921,
      sortDate: '1921-05-01',
      eventName: { zh: '雅法猶太社區襲擊', en: 'Jaffa Riots' },
      briefDescription: {
        zh: '棍棒、刀劍與手槍，47死',
        en: 'Clubs, swords, and pistols, 47 dead',
      },
      periodId: 'mandate_early_conflicts',
      isPeace: false,
      iconType: 'conflict',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1929_hebron',
      year: 1929,
      sortDate: '1929-08-24',
      eventName: { zh: '希伯倫屠殺', en: 'Hebron Massacre' },
      briefDescription: {
        zh: '刀斧屠殺，67死',
        en: 'A massacre carried out with knives and axes, 67 dead',
      },
      periodId: 'mandate_early_conflicts',
      isPeace: false,
      iconType: 'mass_casualty',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1929_safed',
      year: 1929,
      sortDate: '1929-08-29',
      eventName: { zh: '采法特襲擊', en: 'Safed Massacre' },
      briefDescription: { zh: '縱火襲擊，20死', en: 'Arson attacks, 20 dead' },
      periodId: 'mandate_early_conflicts',
      isPeace: false,
      iconType: 'mass_casualty',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1946_king_david',
      year: 1946,
      sortDate: '1946-07-22',
      eventName: { zh: '大衛王酒店爆炸案', en: 'King David Hotel Bombing' },
      briefDescription: {
        zh: '猶太復國主義軍事組織「伊爾貢」針對英託管政府的炸彈攻擊，91死',
        en: 'Bombing by the Zionist militant group Irgun against the British Mandate administration, 91 dead',
      },
      periodId: 'mandate_early_conflicts',
      isPeace: false,
      iconType: 'bomb',
      isMajorConflict: true,
      actor: 'israel',
      isMilitary: false,
    },
    {
      id: 'event_1947_partition',
      year: 1947,
      sortDate: '1947-11-29',
      eventName: {
        zh: '聯合國通過巴勒斯坦分治決議',
        en: 'UN Partition Plan for Palestine Adopted',
      },
      briefDescription: {
        zh: '聯合國大會通過181號決議，建議分治，引爆內戰',
        en: 'UN General Assembly passes Resolution 181, recommending partition, igniting civil war',
      },
      periodId: 'mandate_early_conflicts',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>分裂的起點</h4><p>聯合國181號決議提議將巴勒斯坦託管地分為獨立的阿拉伯國和猶太國，並將耶路撒冷置於國際管理之下。猶太方接受了計劃，但阿拉伯方則完全拒絕，這項決議最終引爆了1947-48年的託管地內戰。</p>',
        en: '<h4>The Seeds of Division</h4><p>UN Resolution 181 proposed dividing the Mandate of Palestine into separate Arab and Jewish states, with Jerusalem under international administration. The Jewish side accepted the plan, but the Arab side rejected it entirely. This resolution ultimately triggered the 1947–48 civil war in Mandatory Palestine.</p>',
      },
    },
    {
      id: 'event_1947_civil_war',
      year: 1947,
      sortDate: '1947-11-30',
      eventName: {
        zh: '英屬巴勒斯坦託管地內戰爆發',
        en: 'Civil War Erupts in Mandatory Palestine',
      },
      briefDescription: {
        zh: '分治決議次日，內部族群戰爭全面展開',
        en: 'Day after partition vote, full-scale intercommunal war begins',
      },
      periodId: 'mandate_early_conflicts',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>無法共存的土地</h4><p>在聯合國分治決議通過後，猶太與阿拉伯民兵組織間的暴力衝突迅速升級為全面內戰。這場戰爭發生在英國結束託管前的最後幾個月，為接下來的1948年阿以戰爭拉開了序幕。</p>',
        en: '<h4>A Land That Could Not Be Shared</h4><p>Following the UN partition resolution, violent clashes between Jewish and Arab militias quickly escalated into a full-scale civil war. This war took place in the final months before the end of the British Mandate, setting the stage for the 1948 Arab-Israeli War that followed.</p>',
      },
    },
    {
      id: 'event_1948_war_begins',
      year: 1948,
      sortDate: '1948-05-15',
      eventName: {
        zh: '第一次中東戰爭 (國際戰爭階段)',
        en: 'First Arab-Israeli War (International Phase)',
      },
      briefDescription: {
        zh: '以色列建國次日，阿拉伯國家聯軍入侵',
        en: "The day after Israel's declaration of independence, a coalition of Arab states invaded",
      },
      periodId: 'early_statehood_fedayeen',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>戰爭的開端與結果</h4><p>1948年5月14日，以色列宣布獨立建國。次日，埃及、約旦、敘利亞、伊拉克與黎巴嫩組成的阿拉伯聯軍便對其發動入侵，第一次中東戰爭就此展開。戰爭最終以以色列獲勝告终，不僅成功保衛了國家，還擴展了其領土，超出了聯合國原先劃定的範圍。這場戰爭同時也造成了約75萬名巴勒斯坦阿拉伯人流離失所，成為難民。</p>',
        en: "<h4>The War's Onset and Outcome</h4><p>On May 14, 1948, Israel declared independence. The next day, a coalition of Arab armies from Egypt, Jordan, Syria, Iraq, and Lebanon invaded, marking the start of the First Arab-Israeli War. The war ended in an Israeli victory; it successfully defended its existence and expanded its territory beyond the original UN partition plan. The war also resulted in the displacement of approximately 750,000 Palestinian Arabs, who became refugees.</p>",
      },
    },
    {
      id: 'event_1948_arab_exodus',
      year: 1948,
      sortDate: '1948-05-15',
      eventName: {
        zh: '巴勒斯坦人大流亡：戰爭下的遷徙',
        en: 'The Palestinian Exodus: Displacement in War',
      },
      briefDescription: {
        zh: '約97萬阿拉伯人被逐出或被迫離開家園',
        en: 'Approx. 970,000 Arabs were expelled or forced to flee their homes',
      },
      periodId: 'early_statehood_fedayeen',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>流離失所的民族</h4><p>在1948年戰爭及其後續的衝突中，一場針對巴勒斯坦阿拉伯人的大規模人口變動隨之展開。在以色列建國後的領土範圍內，這些世代居住於此的社群，面臨著戰爭威脅、直接驅逐以及對未來的不確定性。在1948年與1967年兩次主要的戰爭後，總計約97萬人被迫離開家園成為難民，他們的後代散居各地，而返回家園的權利也成為此後以巴衝突的核心議題之一。</p>',
        en: '<h4>A Displaced People</h4><p>In the 1948 war and its subsequent conflicts, a large-scale demographic change targeting Palestinian Arabs unfolded. Within the territory of the newly established state of Israel, these communities, who had lived there for generations, faced the threat of war, direct expulsion, and uncertainty about the future. After the two main wars in 1948 and 1967, a total of about 970,000 people were forced to leave their homes and become refugees. Their descendants are scattered across various locations, and the right to return has since become a core issue in the Israeli-Palestinian conflict.</p>',
      },
    },
    {
      id: 'event_1948_jewish_exodus',
      year: 1948,
      sortDate: '1948-12-31',
      eventName: {
        zh: '猶太人大流亡：自阿拉伯國家的驅逐',
        en: 'Jewish Exodus from Arab and Muslim Countries',
      },
      briefDescription: {
        zh: '約85萬猶太人被逐出或被迫離開阿拉伯與穆斯林國家',
        en: 'Approx. 850,000 Jews were expelled or forced to flee Arab & Muslim countries',
      },
      periodId: 'early_statehood_fedayeen',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>被遺忘的大遷徙</h4><p>在1948年戰爭前後，一場大規模的人口遷徙不僅發生在巴勒斯坦。在整個阿拉伯世界（從伊拉克、敘利亞到埃及、葉門與北非），針對猶太社群的迫害急劇升級。這些已在當地生根數世紀的古老社群，面臨著騷亂、屠殺、財產沒收與公民權被剝奪的困境。在接下來的二十年裡，約有85萬猶太人被迫成為難民，其中約65萬人最終移居以色列，深刻地改變了這個新生國家的人口結構與民族記憶。</p>',
        en: "<h4>A Forgotten Migration</h4><p>Around the 1948 war, a large-scale population shift occurred not only in Palestine. Across the Arab world—from Iraq and Syria to Egypt, Yemen, and North Africa—persecution against Jewish communities escalated sharply. These ancient communities, rooted in the region for centuries, faced riots, massacres, property confiscation, and the stripping of their civil rights. Over the next two decades, approximately 850,000 Jews were forced to become refugees, with about 650,000 of them eventually migrating to Israel, profoundly changing the fledgling nation's demographics and national memory.</p>",
      },
    },
    {
      id: 'event_1953_yehud',
      year: 1953,
      sortDate: '1953-10-12',
      eventName: { zh: '耶胡德鎮民宅襲擊', en: 'Attack on Home in Yehud' },
      briefDescription: {
        zh: '手榴彈，3死 (含2幼童)',
        en: 'Grenade attack, 3 dead (incl. 2 young children)',
      },
      periodId: 'early_statehood_fedayeen',
      isPeace: false,
      iconType: 'bomb',
      isMajorConflict: false,
      actor: 'palestinian',
    },
    {
      id: 'event_1953_qibya',
      year: 1953,
      sortDate: '1953-10-14',
      eventName: { zh: '奇比亞村報復行動', en: 'Qibya Reprisal Operation' },
      briefDescription: {
        zh: '以色列101部隊的報復攻擊，約69死',
        en: "Reprisal attack by Israel's Unit 101, ~69 dead",
      },
      periodId: 'early_statehood_fedayeen',
      isPeace: false,
      iconType: 'conflict',
      isMajorConflict: true,
      actor: 'israel',
      isMilitary: true,
    },
    {
      id: 'event_1954_scorpions_pass',
      year: 1954,
      sortDate: '1954-03-17',
      eventName: {
        zh: '蠍子隘口巴士掃射',
        en: "Ma'ale Akrabim (Scorpions Pass) Massacre",
      },
      briefDescription: { zh: '掃射，11死', en: 'Shooting attack, 11 dead' },
      periodId: 'early_statehood_fedayeen',
      isPeace: false,
      iconType: 'shooting',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1955_patish',
      year: 1955,
      sortDate: '1955-03-24',
      eventName: { zh: '帕提什婚禮襲擊', en: 'Attack on Wedding in Patish' },
      briefDescription: {
        zh: '手榴彈與掃射，1死',
        en: 'Grenade and shooting, 1 dead',
      },
      periodId: 'early_statehood_fedayeen',
      isPeace: false,
      iconType: 'shooting',
      isMajorConflict: false,
      actor: 'palestinian',
    },
    {
      id: 'event_1956_kfar_chabad',
      year: 1956,
      sortDate: '1956-04-11',
      eventName: { zh: '卡法爾查巴德掃射', en: 'Kfar Chabad Shooting' },
      briefDescription: {
        zh: '掃射，6死 (5青少年)',
        en: 'Shooting attack, 6 dead (5 teens)',
      },
      periodId: 'early_statehood_fedayeen',
      isPeace: false,
      iconType: 'mass_casualty',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1956_kafr_qasim',
      year: 1956,
      sortDate: '1956-10-29',
      eventName: { zh: '卡夫爾卡西姆村事件', en: 'Kafr Qasim Massacre' },
      briefDescription: {
        zh: '以色列邊境警察射殺違反宵禁令村民，49死',
        en: 'Israeli Border Police kill villagers violating curfew, 49 dead',
      },
      periodId: 'early_statehood_fedayeen',
      isPeace: false,
      iconType: 'mass_casualty',
      isMajorConflict: true,
      actor: 'israel',
      isMilitary: true,
    },
    {
      id: 'event_1964_plo_founding',
      year: 1964,
      sortDate: '1964-05-28',
      eventName: {
        zh: '巴勒斯坦解放組織 (PLO) 成立',
        en: 'Palestine Liberation Organization (PLO) Founded',
      },
      briefDescription: {
        zh: '在阿拉伯國家聯盟支持下成立，成為巴勒斯坦民族運動的核心',
        en: 'Founded with Arab League support, becoming the core of the Palestinian national movement',
      },
      periodId: 'early_statehood_fedayeen',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>巴勒斯坦的政治代表</h4><p>在埃及總統納賽爾等泛阿拉伯民族主義領袖的推動下，巴勒斯坦解放組織（PLO）於耶路撒冷成立，並由艾哈邁德·舒凱里擔任首任主席。最初，PLO的宗旨是代表流散的巴勒斯坦人，但其《民族規章》也明確主張透過武裝鬥爭「解放巴勒斯坦」，並不承認以色列的存在。亞西爾·阿拉法特領導的「法塔赫」組織於1969年取得PLO的主導權後，更強化了其武裝鬥爭的路線。</p>',
        en: "<h4>The Political Representative of Palestinians</h4><p>Driven by Pan-Arab nationalist leaders like Egyptian President Nasser, the Palestine Liberation Organization (PLO) was founded in Jerusalem with Ahmad Shukeiri as its first chairman. Initially, its purpose was to represent the Palestinian diaspora, but its National Charter also explicitly advocated for the 'liberation of Palestine' through armed struggle and did not recognize Israel's existence. After Yasser Arafat's Fatah organization gained control of the PLO in 1969, its armed struggle approach was further reinforced.</p>",
      },
    },
    {
      id: 'event_1967_six_day_war',
      year: 1967,
      sortDate: '1967-06-05',
      eventName: { zh: '六日戰爭', en: 'Six-Day War' },
      briefDescription: {
        zh: '以色列佔領約旦河西岸、加薩與東耶路撒冷',
        en: 'Israel occupies the West Bank, Gaza, and East Jerusalem',
      },
      periodId: 'early_statehood_fedayeen',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>重塑中東版圖的六日</h4><p>戰爭爆發前，埃及將聯合國維和部隊逐出西奈、派遣軍隊集結於邊境，並宣布封鎖蒂朗海峽，約旦也與埃及簽署共同防禦條約。以色列視此為戰爭前兆，遂於6月5日發動先發制人攻擊，並在六日內擊敗埃及、約旦與敘利亞聯軍。戰後，以色列佔領了西奈半島、加薩走廊、約旦河西岸、東耶路撒冷及戈蘭高地。</p>',
        en: '<h4>Six Days That Reshaped the Middle East</h4><p>Before the war, Egypt expelled UN peacekeepers from the Sinai, amassed troops on the border, announced a blockade of the Straits of Tiran, and Jordan signed a mutual defense treaty with Egypt. Viewing these as precursors to war, Israel launched a preemptive strike on June 5, defeating the combined forces of Egypt, Jordan, and Syria within six days. After the war, Israel occupied the Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and the Golan Heights.</p>',
      },
    },
    {
      id: 'event_1967_settlements',
      year: 1967,
      sortDate: '1967-06-11',
      eventName: {
        zh: '以色列開始興建屯墾區',
        en: 'Israel Begins Construction of Settlements',
      },
      briefDescription: {
        zh: '六日戰爭後，以色列開始在佔領區建立屯墾區',
        en: 'After the Six-Day War, Israel begins building settlements in the occupied territories',
      },
      periodId: 'early_statehood_fedayeen',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>屯墾區的建立</h4><p>六日戰爭結束後，以色列開始在戈蘭高地、約旦河西岸、東耶路撒冷與加薩走廊等地建立屯墾區。</p>',
        en: '<h4>The Establishment of Settlements</h4><p>Following the Six-Day War, Israel began establishing settlements in areas such as the Golan Heights, the West Bank, East Jerusalem, and the Gaza Strip.</p>',
      },
    },
    {
      id: 'event_1970_swissair_330',
      year: 1970,
      sortDate: '1970-02-21',
      eventName: {
        zh: '瑞士航空330班機炸彈',
        en: 'Swissair Flight 330 Bombing',
      },
      briefDescription: { zh: '郵包炸彈，47死', en: 'Parcel bomb, 47 dead' },
      periodId: 'plo_intl_terrorism_hijackings',
      isPeace: false,
      iconType: 'vehicle_attack',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1970_dawson',
      year: 1970,
      sortDate: '1970-09-06',
      eventName: {
        zh: 'PFLP劫機事件 (道森機場)',
        en: "PFLP Hijackings (Dawson's Field)",
      },
      briefDescription: {
        zh: '劫4架國際航班後炸毀',
        en: '4 international flights hijacked and blown up',
      },
      periodId: 'plo_intl_terrorism_hijackings',
      isPeace: false,
      iconType: 'vehicle_attack',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1970_black_september',
      year: 1970,
      sortDate: '1970-09-16',
      eventName: {
        zh: '黑色九月 (約旦內戰)',
        en: 'Black September (Jordanian Civil War)',
      },
      briefDescription: {
        zh: '約旦驅逐巴解組織，導致其勢力轉移至黎巴嫩',
        en: 'Jordan expels the PLO, forcing its power base to relocate to Lebanon',
      },
      periodId: 'plo_intl_terrorism_hijackings',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>流亡中的建國，主權的衝突</h4><p>在多次劫機並挑戰約旦王室權威後，巴解組織（PLO）在約旦境內已形同「國中之國」。為維護國家主權，約旦國王胡笙下令軍隊對PLO展開大規模攻擊，造成大量傷亡。戰後，PLO的領導層與數千名戰士被迫撤出約旦，最終將其主要基地轉移至黎巴嫩。這次事件徹底改變了巴勒斯坦武裝力量的地理分佈，也為日後的黎巴嫩戰爭埋下了伏筆。</p>',
        en: "<h4>A State-in-Exile, A Clash of Sovereignty</h4><p>After numerous hijackings and challenges to the Jordanian monarchy's authority, the PLO had become a 'state within a state' in Jordan. To preserve national sovereignty, King Hussein ordered a large-scale military offensive against the PLO, resulting in heavy casualties. After the conflict, the PLO leadership and thousands of fighters were forced to leave Jordan, eventually relocating their main base to Lebanon. This event fundamentally altered the geographical distribution of Palestinian armed forces and sowed the seeds for the future Lebanon War.</p>",
      },
    },
    {
      id: 'event_1972_lod_airport',
      year: 1972,
      sortDate: '1972-05-30',
      eventName: { zh: '盧德機場掃射', en: 'Lod Airport Massacre' },
      briefDescription: {
        zh: '掃射與手榴彈，26死',
        en: 'Shooting and grenades, 26 dead',
      },
      periodId: 'plo_intl_terrorism_hijackings',
      isPeace: false,
      iconType: 'mass_casualty',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1972_munich',
      year: 1972,
      sortDate: '1972-09-05',
      eventName: { zh: '慕尼黑奧運屠殺', en: 'Munich Olympics Massacre' },
      briefDescription: { zh: '人質劫持，11死', en: 'Hostage-taking, 11 dead' },
      periodId: 'plo_intl_terrorism_hijackings',
      isPeace: false,
      iconType: 'mass_casualty',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1973_yom_kippur_war',
      year: 1973,
      sortDate: '1973-10-06',
      eventName: {
        zh: '第四次中東戰爭 (贖罪日戰爭)',
        en: 'Fourth Arab-Israeli War (Yom Kippur War)',
      },
      briefDescription: {
        zh: '埃及與敘利亞突襲以色列，戰爭結果間接促成和平談判',
        en: 'Egypt and Syria launch a surprise attack on Israel, leading to peace talks',
      },
      periodId: 'plo_intl_terrorism_hijackings',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>打破僵局的戰爭</h4><p>由埃及和敘利亞領導的阿拉伯聯軍，在猶太教最神聖的贖罪日對以色列發動突襲。儘管以色列最終成功反擊，但戰爭初期的挫敗打破了其「不可戰勝」的神話，促成了後續的政治轉變，並為《大衛營協議》的簽訂鋪平了道路。</p>',
        en: "<h4>The War That Broke the Stalemate</h4><p>An Arab coalition, led by Egypt and Syria, launched a surprise attack on Israel on Yom Kippur, the holiest day in Judaism. Although Israel ultimately repelled the attack, its initial setbacks shattered the myth of its 'invincibility,' fostering subsequent political shifts and paving the way for the Camp David Accords.</p>",
      },
    },
    {
      id: 'event_1973_rome_airport',
      year: 1973,
      sortDate: '1973-12-17',
      eventName: {
        zh: '羅馬機場攻擊與劫機',
        en: 'Rome Airport Attack and Hijacking',
      },
      briefDescription: {
        zh: '機場攻擊與劫機，34死',
        en: 'Airport attack and hijacking, 34 dead',
      },
      periodId: 'plo_intl_terrorism_hijackings',
      isPeace: false,
      iconType: 'vehicle_attack',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1974_maalot',
      year: 1974,
      sortDate: '1974-05-15',
      eventName: {
        zh: '馬阿洛特小學人質案',
        en: "Ma'alot School Hostage Crisis",
      },
      briefDescription: {
        zh: '人質劫持，25死 (22學童)',
        en: 'Hostage-taking, 25 dead (22 schoolchildren)',
      },
      periodId: 'plo_intl_terrorism_hijackings',
      isPeace: false,
      iconType: 'mass_casualty',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1978_coastal_road',
      year: 1978,
      sortDate: '1978-03-11',
      eventName: { zh: '海岸公路劫持巴士案', en: 'Coastal Road Massacre' },
      briefDescription: {
        zh: '劫持引爆巴士，38死 (13兒童)',
        en: 'Bus hijacking and explosion, 38 dead (13 children)',
      },
      periodId: 'plo_intl_terrorism_hijackings',
      isPeace: false,
      iconType: 'vehicle_attack',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1978_camp_david',
      year: 1978,
      sortDate: '1978-09-17',
      eventName: { zh: '大衛營協議', en: 'Camp David Accords' },
      briefDescription: {
        zh: '以色列與埃及和平框架，為以埃和平奠基',
        en: 'Peace framework between Israel and Egypt, foundation for their peace treaty',
      },
      periodId: 'plo_intl_terrorism_hijackings',
      isPeace: true,
      iconType: 'peace',
      details: {
        zh: '<h4>首次和平曙光</h4><p>在美國總統卡特的斡旋下，以色列總理比金與埃及總統沙達特簽署了兩項框架協議。此協議直接促成了1979年《以埃和平條約》的誕生，這是以色列與阿拉伯國家之間的第一個和平條約，具有里程碑意義。</p>',
        en: '<h4>First Glimmer of Peace</h4><p>Mediated by U.S. President Jimmy Carter, Israeli Prime Minister Menachem Begin and Egyptian President Anwar Sadat signed two framework agreements. These accords directly led to the 1979 Egypt-Israel Peace Treaty, the first-ever peace treaty between Israel and an Arab nation, marking a historic milestone.</p>',
      },
    },
    {
      id: 'event_1979_egypt_israel_peace',
      year: 1979,
      sortDate: '1979-03-26',
      eventName: { zh: '以色列-埃及和平條約', en: 'Egypt–Israel Peace Treaty' },
      briefDescription: {
        zh: '首個阿拉伯國家與以色列簽署的正式和平條約',
        en: 'First formal peace treaty signed between an Arab country and Israel',
      },
      periodId: 'plo_intl_terrorism_hijackings',
      isPeace: true,
      iconType: 'handshake',
      details: {
        zh: '<h4>第一份和平條約</h4><p>在《大衛營協議》的框架下，以色列與埃及於華盛頓正式簽署和平條約，結束了兩國長達30年的戰爭狀態。根據條約，以色列同意在三年內完全撤出西奈半島，並承認其為埃及主權領土；雙方也同意建立正常的外交與經濟關係。埃及成為第一個正式承認以色列的阿拉伯國家。</p>',
        en: '<h4>The First Peace Treaty</h4><p>Under the framework of the Camp David Accords, Israel and Egypt officially signed a peace treaty in Washington, D.C., ending the 30-year state of war between them. According to the treaty, Israel agreed to a complete withdrawal from the Sinai Peninsula within three years and recognized it as sovereign Egyptian territory. Both nations also agreed to establish normal diplomatic and economic relations. Egypt became the first Arab country to officially recognize Israel.</p>',
      },
    },
    {
      id: 'event_1982_lebanon_war1',
      year: 1982,
      sortDate: '1982-06-06',
      eventName: { zh: '第一次黎巴嫩戰爭', en: 'First Lebanon War' },
      briefDescription: {
        zh: '以色列入侵黎巴嫩，旨在摧毀巴解組織基地',
        en: 'Israel invades Lebanon to destroy PLO bases',
      },
      periodId: 'plo_intl_terrorism_hijackings',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>泥沼的開端</h4><p>以色列入侵黎巴嫩南部，目標是清除巴勒斯坦解放組織（PLO）的軍事基地。戰爭雖成功將巴解組織逐出黎巴嫩，卻導致了真主黨的崛起。為防止針對其北部的攻擊，以色列在黎南建立了一處「安全區」並展開長期佔領，但這次佔領也使其付出了持續的人員傷亡與高昂的社會成本。</p>',
        en: "<h4>The Beginning of the Quagmire</h4><p>Israel invaded Southern Lebanon with the goal of eliminating the military bases of the Palestine Liberation Organization (PLO). While the war succeeded in expelling the PLO from Lebanon, it led to the rise of Hezbollah. To prevent attacks on its northern border, Israel established a 'security zone' in Southern Lebanon and began a long-term occupation, which came at a high cost of continuous casualties and societal expense.</p>",
      },
    },
    {
      id: 'oe_1985_rome_airport',
      year: 1985,
      sortDate: '1985-12-27',
      eventName: {
        zh: '羅馬費米齊諾機場襲擊',
        en: 'Rome Fiumicino Airport Attack',
      },
      briefDescription: {
        zh: '手榴彈與槍擊，16死',
        en: 'Grenades and gunfire, 16 dead',
      },
      periodId: 'plo_intl_terrorism_hijackings',
      isPeace: false,
      iconType: 'bomb',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1986_neve_shalom',
      year: 1986,
      sortDate: '1986-09-06',
      eventName: {
        zh: '伊斯坦堡Neve Shalom會堂襲擊',
        en: 'Neve Shalom Synagogue Attack, Istanbul',
      },
      briefDescription: {
        zh: '掃射與手榴彈，22死',
        en: 'Shooting and grenades, 22 dead',
      },
      periodId: 'plo_intl_terrorism_hijackings',
      isPeace: false,
      iconType: 'mass_casualty',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1987_intifada1',
      year: 1987,
      sortDate: '1987-12-09',
      eventName: {
        zh: '第一次巴勒斯坦大起義爆發',
        en: 'First Palestinian Intifada Erupts',
      },
      briefDescription: {
        zh: '以大規模示威、罷工與投石為特徵的全民抗爭',
        en: 'A popular uprising characterized by mass demonstrations, strikes, and stone-throwing',
      },
      periodId: 'first_intifada_oslo',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>佔領下的全民抗爭</h4><p>一場主要由下而上、自發性的巴勒斯坦全民起義，反抗以色列的佔領。其抗爭模式混合了大規模示威、罷工、公民不服從，以及投石、汽油彈等暴力騷亂。這次起義成功地將衝突焦點從外部的阿拉伯國家轉移到佔領區內的巴勒斯坦人自身，並間接催生了後來的奧斯陸和平進程。</p>',
        en: '<h4>A Popular Uprising Under Occupation</h4><p>A largely bottom-up, spontaneous Palestinian uprising against Israeli occupation. Its methods included a mix of mass demonstrations, strikes, civil disobedience, as well as violent riots involving stone-throwing and Molotov cocktails. The Intifada successfully shifted the focus of the conflict from external Arab states to the Palestinians within the occupied territories, indirectly paving the way for the later Oslo peace process.</p>',
      },
    },
    {
      id: 'event_1987_hamas_founding',
      year: 1987,
      sortDate: '1987-12-14',
      eventName: { zh: '哈瑪斯 (Hamas) 成立', en: 'Hamas Is Founded' },
      briefDescription: {
        zh: '在第一次大起義中誕生，成為PLO的主要競爭者',
        en: 'Born during the First Intifada, becoming a major rival to the PLO',
      },
      periodId: 'first_intifada_oslo',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>信仰與武裝的結合</h4><p>在第一次巴勒斯坦大起義爆發後不久，由謝赫·艾哈邁德·亞辛等人創立了「哈瑪斯」（伊斯蘭抵抗運動）。作為穆斯林兄弟會在巴勒斯坦的分支，哈瑪斯不僅從事慈善與社會服務，其《憲章》更主張消滅以色列，並拒絕任何與其和平談判的可能。它的崛起，不僅是以色列的新對手，也成為長期主導巴勒斯坦民族運動的、立場更為世俗化的PLO的主要政治與意識形態競爭者。</p>',
        en: '<h4>A Union of Faith and Arms</h4><p>Shortly after the First Intifada began, Hamas (Islamic Resistance Movement) was founded by Sheikh Ahmed Yassin and others. As the Palestinian branch of the Muslim Brotherhood, Hamas engaged in both charitable and social services, but its charter also advocated for the destruction of Israel and rejected any possibility of peace negotiations. Its rise made it not only a new adversary for Israel but also a primary political and ideological competitor to the more secular PLO, which had long dominated the Palestinian national movement.</p>',
      },
    },
    {
      id: 'event_1989_bus_405',
      year: 1989,
      sortDate: '1989-07-06',
      eventName: {
        zh: '405路公車墜崖案',
        en: 'Tel Aviv–Jerusalem Bus 405 Attack',
      },
      briefDescription: {
        zh: '劫持巴士墜崖，16死',
        en: 'Bus hijacked and forced off a cliff, 16 dead',
      },
      periodId: 'first_intifada_oslo',
      isPeace: false,
      iconType: 'vehicle_attack',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1992_embassy_bombing',
      year: 1992,
      sortDate: '1992-03-17',
      eventName: {
        zh: '阿根廷以色列大使館炸彈',
        en: 'Bombing of the Israeli Embassy in Argentina',
      },
      briefDescription: { zh: '汽車炸彈，29死', en: 'Car bomb, 29 dead' },
      periodId: 'first_intifada_oslo',
      isPeace: false,
      iconType: 'bomb',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1993_oslo1',
      year: 1993,
      sortDate: '1993-09-13',
      eventName: { zh: '奧斯陸協議 I', en: 'Oslo I Accord' },
      briefDescription: {
        zh: '以色列與巴解組織簽署原則宣言，開啟和平進程',
        en: 'Israel and the PLO sign the Declaration of Principles, launching the peace process',
      },
      periodId: 'first_intifada_oslo',
      isPeace: true,
      iconType: 'peace',
      details: {
        zh: '<h4>歷史性的握手</h4><p>以色列與巴解組織之間歷史性的協議，正式名稱為《關於臨時自治安排的原則宣言》。協議為巴勒斯坦在西岸和加薩的自治設定了時間表，並催生了巴勒斯坦自治政府的成立。它被視為邁向「兩國方案」的第一個重要步驟。</p>',
        en: "<h4>A Historic Handshake</h4><p>A landmark agreement between Israel and the PLO, officially known as the Declaration of Principles on Interim Self-Government Arrangements. The accord set a timetable for Palestinian autonomy in the West Bank and Gaza and led to the creation of the Palestinian Authority. It is considered the first major step toward a 'two-state solution'.</p>",
      },
    },
    {
      id: 'event_1994_hebron_mosque',
      year: 1994,
      sortDate: '1994-02-25',
      eventName: {
        zh: '希伯倫易卜拉欣清真寺屠殺案',
        en: 'Cave of the Patriarchs Massacre',
      },
      briefDescription: {
        zh: '以色列屯墾區居民向祈禱人群掃射，29死',
        en: 'Israeli settler opens fire on praying crowd, 29 dead',
      },
      periodId: 'first_intifada_oslo',
      isPeace: false,
      iconType: 'mass_casualty',
      isMajorConflict: true,
      actor: 'israel',
      isMilitary: false,
    },
    {
      id: 'event_1994_amia_bombing',
      year: 1994,
      sortDate: '1994-07-18',
      eventName: {
        zh: '阿根廷AMIA大樓爆炸',
        en: 'AMIA Jewish Community Center Bombing, Argentina',
      },
      briefDescription: { zh: '汽車炸彈，85死', en: 'Car bomb, 85 dead' },
      periodId: 'first_intifada_oslo',
      isPeace: false,
      iconType: 'bomb',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1994_dizengoff_bombing',
      year: 1994,
      sortDate: '1994-10-19',
      eventName: {
        zh: '特拉維夫Dizengoff公車自殺炸彈',
        en: 'Dizengoff Street Bus Bombing, Tel Aviv',
      },
      briefDescription: {
        zh: '自殺炸彈，22死',
        en: 'Suicide bombing, 22 dead',
      },
      periodId: 'first_intifada_oslo',
      isPeace: false,
      iconType: 'bomb',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1994_jordan_treaty',
      year: 1994,
      sortDate: '1994-10-26',
      eventName: {
        zh: '以色列-約旦和平條約',
        en: 'Israel–Jordan Peace Treaty',
      },
      briefDescription: {
        zh: '兩國正式簽署和平協議，結束戰爭狀態',
        en: 'Both nations sign a formal peace treaty, ending the state of war',
      },
      periodId: 'first_intifada_oslo',
      isPeace: true,
      iconType: 'peace',
      details: {
        zh: '<h4>第二份和平協議</h4><p>繼埃及之後，約旦成為第二個與以色列正式簽署和平協議的阿拉伯國家。該條約解決了兩國間的領土邊界、水資源分配等長期爭議，並促進了雙邊的經濟與安全合作。</p>',
        en: '<h4>The Second Peace Treaty</h4><p>Following Egypt, Jordan became the second Arab nation to sign a formal peace treaty with Israel. The treaty resolved long-standing disputes over borders and water rights and fostered bilateral economic and security cooperation.</p>',
      },
    },
    {
      id: 'event_1995_beit_lid',
      year: 1995,
      sortDate: '1995-01-22',
      eventName: {
        zh: '貝特利德路口連環自殺炸彈',
        en: 'Beit Lid Junction Bombing',
      },
      briefDescription: {
        zh: '連環自殺炸彈，22死 (21士兵)',
        en: 'Double suicide bombing, 22 dead (21 soldiers)',
      },
      periodId: 'first_intifada_oslo',
      isPeace: false,
      iconType: 'bomb',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1995_oslo2',
      year: 1995,
      sortDate: '1995-09-28',
      eventName: { zh: '奧斯陸協議 II', en: 'Oslo II Accord' },
      briefDescription: {
        zh: '劃定西岸A、B、C區，確立巴勒斯坦自治政府權限',
        en: "Divided the West Bank into Areas A, B, and C, defining Palestinian Authority's powers",
      },
      periodId: 'first_intifada_oslo',
      isPeace: true,
      iconType: 'peace',
      details: {
        zh: '<h4>劃分控制權</h4><p>此協議是《奧斯陸協議I》的延伸，將約旦河西岸劃分為A、B、C三區，分別由巴勒斯坦、巴以雙方、以及以色列單獨控制民事與安全事務。它也為巴勒斯坦立法委員會的選舉鋪平了道路。</p>',
        en: '<h4>Dividing Control</h4><p>This accord, an extension of Oslo I, divided the West Bank into three zones—Areas A, B, and C—with varying degrees of control over civil and security affairs for the Palestinian Authority and Israel. It also paved the way for elections for the Palestinian Legislative Council.</p>',
      },
    },
    {
      id: 'event_1995_rabin_assassination',
      year: 1995,
      sortDate: '1995-11-04',
      eventName: { zh: '拉賓總理遇刺', en: 'Assassination of Yitzhak Rabin' },
      briefDescription: {
        zh: '反對和平的以色列極端分子刺殺總理，重創和平進程',
        en: 'An Israeli extremist opposed to peace assassinates the Prime Minister, crippling the peace process',
      },
      periodId: 'first_intifada_oslo',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>和平的重創</h4><p>作為《奧斯陸協議》主要推動者的以色列總理拉賓，在特拉維夫的和平集會上，被一名反對和平進程的以色列極右翼極端分子刺殺。這起事件對以色列社會造成了巨大衝擊，並被廣泛認為是對和平進程的致命一擊。</p>',
        en: '<h4>A Crippling Blow to Peace</h4><p>Israeli Prime Minister Yitzhak Rabin, a key architect of the Oslo Accords, was assassinated by a far-right Israeli extremist at a peace rally in Tel Aviv. The event sent shockwaves through Israeli society and is widely considered a fatal blow to the peace process.</p>',
      },
    },
    {
      id: 'event_1996_bus18_1',
      year: 1996,
      sortDate: '1996-02-25',
      eventName: {
        zh: '耶路撒冷18路公車自殺炸彈(1)',
        en: 'Jerusalem Bus 18 Bombing (1)',
      },
      briefDescription: {
        zh: '自殺炸彈，26死',
        en: 'Suicide bombing, 26 dead',
      },
      periodId: 'first_intifada_oslo',
      isPeace: false,
      iconType: 'bomb',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_1996_grapes_of_wrath',
      year: 1996,
      sortDate: '1996-04-11',
      eventName: { zh: '憤怒葡萄行動', en: 'Operation Grapes of Wrath' },
      briefDescription: {
        zh: '以軍在黎巴嫩南部的大規模軍事行動',
        en: 'Large-scale Israeli military operation in Southern Lebanon',
      },
      periodId: 'first_intifada_oslo',
      isPeace: false,
      iconType: 'conflict',
      isMajorConflict: true,
      actor: 'israel',
      isMilitary: true,
    },
    {
      id: 'event_1997_naharayim',
      year: 1997,
      sortDate: '1997-03-13',
      eventName: { zh: '「和平之島」掃射', en: "'Island of Peace' Shooting" },
      briefDescription: {
        zh: '掃射，7死 (女學生)',
        en: 'Shooting attack, 7 dead (schoolgirls)',
      },
      periodId: 'first_intifada_oslo',
      isPeace: false,
      iconType: 'shooting',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_2000_camp_david',
      year: 2000,
      sortDate: '2000-07-11',
      eventName: { zh: '大衛營峰會', en: 'Camp David Summit' },
      briefDescription: {
        zh: '以色列提出建立巴勒斯坦國的方案',
        en: 'Israel proposes a plan for a Palestinian state',
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPeace: true,
      iconType: 'peace',
      details: {
        zh: '<h4>方案與分歧</h4><p>美國總統柯林頓斡旋，以色列總理巴拉克首次提出具體建國方案，包括給予巴勒斯坦在西岸90%以上和全部加薩的土地。但雙方在耶路撒冷主權、難民回歸權等核心議題上無法達成共識，巴解主席阿拉法特拒絕了該方案，談判最終破裂。</p>',
        en: '<h4>The Proposal and the Divide</h4><p>Mediated by U.S. President Bill Clinton, Israeli Prime Minister Ehud Barak presented the first concrete proposal for statehood, offering Palestinians over 90% of the West Bank and all of Gaza. However, the two sides could not agree on core issues like sovereignty in Jerusalem and the right of return for refugees. PLO Chairman Yasser Arafat rejected the offer, and the talks ultimately collapsed.</p>',
      },
    },
    {
      id: 'event_2000_intifada2',
      year: 2000,
      sortDate: '2000-09-28',
      eventName: {
        zh: '第二次巴勒斯坦大起義爆發',
        en: 'Second Palestinian Intifada Erupts',
      },
      briefDescription: {
        zh: '以自殺炸彈與激烈軍事衝突為特徵的血腥起義',
        en: 'An uprising marked by unprecedented violence, including suicide bombings and intense military clashes',
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>血腥的起義</h4><p>又稱「阿克薩起義」，其暴力程度遠超第一次。衝突以激烈的武裝對抗為特徵，特別是巴勒斯坦武裝組織針對以色列平民發動的一系列自殺炸彈攻擊，給雙方都帶來了慘重傷亡，並最終導致和平進程徹底崩潰。</p>',
        en: '<h4>A Violent Uprising</h4><p>Also known as the Al-Aqsa Intifada, its level of violence far exceeded the first. The conflict was characterized by intense armed confrontations, especially a series of suicide bombings by Palestinian militant groups targeting Israeli civilians, which caused heavy casualties on both sides and ultimately led to the complete collapse of the peace process.</p>',
      },
    },
    {
      id: 'event_2000_ramallah_lynching',
      year: 2000,
      sortDate: '2000-10-12',
      eventName: {
        zh: '拉姆安拉2以兵遭殺害肢解',
        en: 'Ramallah Lynching of Two Israeli Soldiers',
      },
      briefDescription: {
        zh: '殺害肢解，2死',
        en: 'Killing and dismemberment, 2 dead',
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPeace: false,
      iconType: 'mass_casualty',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_2001_taba',
      year: 2001,
      sortDate: '2001-01-21',
      eventName: { zh: '塔巴談判', en: 'Taba Summit' },
      briefDescription: {
        zh: '以色列再次提出建立巴勒斯坦國的方案',
        en: 'Israel again proposes a plan for a Palestinian state',
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPeace: true,
      iconType: 'peace',
      details: {
        zh: '<h4>最接近的時刻</h4><p>在大衛營峰會失敗後，雙方談判代表在埃及塔巴進行最後努力。據非官方紀錄，以方提出了比大衛營更優的條件，雙方在許多議題上都取得了進展。然而，由於以色列即將大選，時任總理巴拉克已是看守政府，缺乏推動協議的政治能量，談判最終無果而終。</p>',
        en: "<h4>The Closest They Ever Came</h4><p>Following the failure of the Camp David Summit, negotiators from both sides made a final effort in Taba, Egypt. According to unofficial records, the Israeli side offered more favorable terms than at Camp David, and progress was made on many issues. However, with an Israeli election looming, then-Prime Minister Ehud Barak's caretaker government lacked the political mandate to push the agreement through, and the talks ultimately ended without a resolution.</p>",
      },
    },
    {
      id: 'event_2001_dolphinarium',
      year: 2001,
      sortDate: '2001-06-01',
      eventName: {
        zh: '海豚館舞廳自殺炸彈',
        en: 'Dolphinarium Discotheque Bombing',
      },
      briefDescription: {
        zh: '自殺炸彈，21死 (16青少年)',
        en: 'Suicide bombing, 21 dead (16 teenagers)',
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPeace: false,
      iconType: 'bomb',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_2002_park_hotel',
      year: 2002,
      sortDate: '2002-03-27',
      eventName: {
        zh: 'Park Hotel自殺炸彈 (逾越節屠殺)',
        en: 'Park Hotel Bombing (Passover Massacre)',
      },
      briefDescription: {
        zh: '自殺炸彈，30死',
        en: 'Suicide bombing, 30 dead',
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPeace: false,
      iconType: 'mass_casualty',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_2002_arab_peace_initiative',
      year: 2002,
      sortDate: '2002-03-28',
      eventName: { zh: '阿拉伯和平倡議', en: 'Arab Peace Initiative' },
      briefDescription: {
        zh: '阿拉伯聯盟首次提出全面和平方案，以正常化換取撤軍',
        en: 'Arab League proposes first comprehensive peace plan: normalization for withdrawal',
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPeace: true,
      iconType: 'peace',
      details: {
        zh: '<h4>阿拉伯世界的橄欖枝</h4><p>由沙烏地阿拉伯提出、並在貝魯特峰會上獲得阿拉伯聯盟全體成員通過。該倡議承諾，若以色列完全撤出1967年以來佔領的所有領土、接受一個以東耶路撒冷為首都的獨立巴勒斯坦國，並公正解決巴勒斯坦難民問題，全體阿拉伯國家將承認以色列，並與其建立正常化關係。這是阿拉伯世界首次集體提出的全面和平方案，但當時正值第二次起義高峰，方案未獲以色列正面回應。</p>',
        en: '<h4>An Olive Branch from the Arab World</h4><p>Proposed by Saudi Arabia and adopted by all members of the Arab League at the Beirut Summit. The initiative promised that if Israel withdrew completely from all territories occupied since 1967, accepted an independent Palestinian state with East Jerusalem as its capital, and found a just solution for Palestinian refugees, all Arab nations would recognize Israel and establish normal relations. It was the first collective, comprehensive peace proposal from the Arab world, but at the height of the Second Intifada, it received no positive response from Israel.</p>',
      },
    },
    {
      id: 'event_2002_defensive_shield',
      year: 2002,
      sortDate: '2002-03-29',
      eventName: { zh: '防禦之盾行動', en: 'Operation Defensive Shield' },
      briefDescription: {
        zh: '以軍對西岸發動大規模入侵，回應自殺炸彈攻擊',
        en: 'IDF launches large-scale invasion of the West Bank in response to bombings',
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPeace: false,
      iconType: 'conflict',
      isMajorConflict: true,
      actor: 'israel',
      isMilitary: true,
    },
    {
      id: 'event_2002_barrier',
      year: 2002,
      sortDate: '2002-06-16',
      eventName: {
        zh: '以色列開始建造西岸隔離牆',
        en: 'Israel Begins Construction of the West Bank Barrier',
      },
      briefDescription: {
        zh: '為應對第二次起義攻擊，開始修建隔離牆',
        en: 'Construction of the barrier begins in response to Second Intifada attacks',
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>安全與主權的雙面刃</h4><p>以色列稱其為『安全屏障』，旨在阻止第二次起義的自殺炸彈攻擊。數據顯示建成後，源自西岸的攻擊事件驟減超過90%。然而，因其路線大量深入西岸而非沿著停火線，巴勒斯坦方則視其為一道切割社區、兼併土地的隔離高牆。</p>',
        en: "<h4>A Double-Edged Sword of Security and Sovereignty</h4><p>Israel calls it a 'Security Fence,' built to stop suicide bombings during the Second Intifada. Data shows that attacks from the West Bank dropped by over 90% after its construction. However, because its route deviates significantly from the Green Line and cuts deep into the West Bank, Palestinians view it as a separation barrier that divides communities and annexes land.</p>",
      },
    },
    {
      id: 'event_2003_bus37',
      year: 2003,
      sortDate: '2003-08-19',
      eventName: {
        zh: 'Shmuel HaNavi街公車自殺炸彈',
        en: 'Shmuel HaNavi Street Bus Bombing',
      },
      briefDescription: {
        zh: '自殺炸彈，23死 (多兒童)',
        en: 'Suicide bombing, 23 dead (many children)',
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPeace: false,
      iconType: 'bomb',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'oe_2003_maxim_restaurant',
      year: 2003,
      sortDate: '2003-10-04',
      eventName: {
        zh: 'Maxim餐廳自殺炸彈',
        en: 'Maxim Restaurant Suicide Bombing',
      },
      briefDescription: {
        zh: '自殺炸彈，21死',
        en: 'Suicide bombing, 21 dead',
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPeace: false,
      iconType: 'bomb',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'oe_2004_taba_hilton',
      year: 2004,
      sortDate: '2004-10-07',
      eventName: {
        zh: '埃及塔巴希爾頓飯店及努韋巴度假村連環爆炸',
        en: 'Sinai Bombings (Taba & Nuweiba)',
      },
      briefDescription: {
        zh: '連環汽車炸彈，34死',
        en: 'Serial car bombs, 34 dead',
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPeace: false,
      iconType: 'bomb',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_2005_disengagement',
      year: 2005,
      sortDate: '2005-08-15',
      eventName: {
        zh: '以色列自加薩撤離',
        en: "Israel's Disengagement from Gaza",
      },
      briefDescription: {
        zh: '以色列單方面自加薩走廊全面撤離軍隊與屯墾區',
        en: 'Israel unilaterally withdraws all troops and settlements from the Gaza Strip',
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPeace: true,
      iconType: 'peace',
      details: {
        zh: '<h4>單邊的嘗試</h4><p>在時任總理夏隆的主導下，以色列採取單方面行動，拆除了加薩走廊全部21個猶太屯墾區以及西岸北部的4個，並撤出所有軍隊，結束了對加薩長達38年的佔領。</p>',
        en: "<h4>A Unilateral Attempt</h4><p>Led by then-Prime Minister Ariel Sharon, Israel took unilateral action to dismantle all 21 Jewish settlements in the Gaza Strip and 4 in the northern West Bank. All military forces were withdrawn, ending Israel's 38-year occupation of Gaza.</p>",
      },
    },
    {
      id: 'event_2006_tel_aviv_bombing',
      year: 2006,
      sortDate: '2006-04-17',
      eventName: {
        zh: "特拉維夫Rosh Ha'ir快餐店自殺炸彈",
        en: "Tel Aviv Rosh Ha'ir Restaurant Bombing",
      },
      briefDescription: {
        zh: '自殺炸彈，11死',
        en: 'Suicide bombing, 11 dead',
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPeace: false,
      iconType: 'bomb',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_2007_hamas_takeover',
      year: 2007,
      sortDate: '2007-06-10',
      eventName: { zh: '哈瑪斯以武力奪取加薩', en: 'Hamas Takeover of Gaza' },
      briefDescription: {
        zh: '擊敗法塔赫部隊，完全控制加薩走廊',
        en: 'Defeats Fatah forces, gaining full control of the Gaza Strip',
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>巴勒斯坦的分裂</h4><p>在贏得2006年巴勒斯坦立法選舉後，哈瑪斯與其政治對手法塔赫爆發激烈內戰。最終，哈瑪斯以武力奪取了加薩走廊的完全控制權，造成了巴勒斯坦內部的政治與地理分裂，影響至今。</p>',
        en: '<h4>The Palestinian Schism</h4><p>After winning the 2006 Palestinian legislative election, intense civil war broke out between Hamas and its political rival, Fatah. Ultimately, Hamas seized full control of the Gaza Strip by force, creating a political and geographical split within the Palestinian territories that persists to this day.</p>',
      },
    },
    {
      id: 'event_2007_blockade',
      year: 2007,
      sortDate: '2007-06-16',
      eventName: {
        zh: '以色列與埃及開始封鎖加薩',
        en: 'Israel and Egypt Begin Blockade of Gaza',
      },
      briefDescription: {
        zh: '回應哈瑪斯奪權，對加薩實施陸海空封鎖',
        en: 'In response to Hamas takeover, a land, air, and sea blockade is imposed on Gaza',
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPivotal: true,
      iconType: 'pivotal',
      details: {
        zh: '<h4>圍城與孤島</h4><p>在哈瑪斯武力奪權後，以色列與埃及以安全為由，對加薩實施了陸、海、空全面封鎖，旨在防止武器流入。然而，這項長達十多年的封鎖也對加薩的經濟和人道狀況造成了毀滅性的影響。</p>',
        en: "<h4>The Siege and the Island</h4><p>Following the Hamas takeover, Israel and Egypt imposed a full land, air, and sea blockade on Gaza, citing security reasons to prevent weapons from flowing in. However, this decade-plus blockade has also had a devastating impact on Gaza's economy and humanitarian situation.</p>",
      },
    },
    {
      id: 'event_2008_mercaz_harav',
      year: 2008,
      sortDate: '2008-03-06',
      eventName: {
        zh: 'Mercaz HaRav神學院掃射',
        en: 'Mercaz HaRav Seminary Shooting',
      },
      briefDescription: {
        zh: '掃射，8死 (學生)',
        en: 'Shooting attack, 8 dead (students)',
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPeace: false,
      iconType: 'shooting',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_2008_olmert_offer',
      year: 2008,
      sortDate: '2008-09-16',
      eventName: { zh: '奧爾默特方案', en: 'Olmert Peace Offer' },
      briefDescription: {
        zh: '以色列第3度提出建立巴勒斯坦國的方案',
        en: "Israel's 3rd proposal for a Palestinian state",
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPeace: true,
      iconType: 'peace',
      details: {
        zh: '<h4>劃時代的建國方案</h4><p>以色列總理奧爾默特向巴勒斯坦主席阿巴斯提出了一份詳盡的和平方案。其核心是「土地等面積交換」，即以色列吞併約6.3%的西岸屯墾區，同時將等面積的以色列領土劃歸巴勒斯坦國。方案還提出國際共管耶路撒冷聖地，但最終因奧爾默特本人深陷政治醜聞且即將下台，阿巴斯未立即回覆，談判無疾而終。</p>',
        en: "<h4>A Landmark Statehood Proposal</h4><p>Israeli Prime Minister Ehud Olmert presented a detailed peace plan to Palestinian President Mahmoud Abbas. Its core was a land swap of equivalent size, where Israel would annex about 6.3% of West Bank settlements in exchange for an equal amount of Israeli territory for the Palestinian state. The plan also proposed international administration of Jerusalem's holy sites. However, with Olmert mired in political scandal and about to leave office, Abbas did not immediately respond, and the negotiations ended without result.</p>",
      },
    },
    {
      id: 'event_2008_cast_lead',
      year: 2008,
      sortDate: '2008-12-27',
      eventName: { zh: '鑄鉛行動', en: 'Operation Cast Lead' },
      briefDescription: {
        zh: '以軍為阻止火箭攻擊，對加薩的大規模軍事行動',
        en: "IDF's large-scale military operation in Gaza to stop rocket attacks",
      },
      periodId: 'second_intifada_gaza_disengagement',
      isPeace: false,
      iconType: 'conflict',
      isMajorConflict: true,
      actor: 'israel',
      isMilitary: true,
    },
    {
      id: 'event_2010_flotilla',
      year: 2010,
      sortDate: '2010-05-31',
      eventName: { zh: '加薩自由船隊遇襲事件', en: 'Gaza Flotilla Raid' },
      briefDescription: {
        zh: '以軍突擊隊攔截援助船隊，9死',
        en: 'Israeli commandos intercept aid flotilla, 9 dead',
      },
      periodId: 'gaza_wars_modern_conflict',
      isPeace: false,
      iconType: 'conflict',
      isMajorConflict: true,
      actor: 'israel',
      isMilitary: true,
    },
    {
      id: 'event_2011_fogel_family',
      year: 2011,
      sortDate: '2011-03-11',
      eventName: { zh: 'Fogel一家慘案', en: 'Itamar Attack (Fogel Family)' },
      briefDescription: {
        zh: '刺殺，5死 (3兒童)',
        en: 'Stabbing, 5 dead (3 children)',
      },
      periodId: 'gaza_wars_modern_conflict',
      isPeace: false,
      iconType: 'mass_casualty',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_2012_burgas',
      year: 2012,
      sortDate: '2012-07-18',
      eventName: {
        zh: '保加利亞布爾加斯機場以色列遊客巴士炸彈',
        en: 'Burgas, Bulgaria Bus Bombing',
      },
      briefDescription: { zh: '巴士炸彈，6死', en: 'Bus bombing, 6 dead' },
      periodId: 'gaza_wars_modern_conflict',
      isPeace: false,
      iconType: 'bomb',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_2013_kerry_initiative',
      year: 2013,
      sortDate: '2013-07-29',
      eventName: { zh: '凱瑞和平倡議', en: 'Kerry Peace Initiative' },
      briefDescription: {
        zh: '美國主導的最後一次傳統「兩國方案」談判嘗試',
        en: "Last major US-led attempt at a traditional 'two-state solution' negotiation",
      },
      periodId: 'gaza_wars_modern_conflict',
      isPeace: true,
      iconType: 'peace',
      details: {
        zh: '<h4>傳統和平模式的最後努力</h4><p>由時任美國國務卿凱瑞（John Kerry）主導，旨在重啟已停滯多年的以巴直接談判。在長達九個月的密集協商中，雙方就邊界、安全、難民與耶路撒冷等核心議題進行了深入討論，但未能縮小歧見。談判最終於2014年4月破裂，這也成為《亞伯拉罕協議》出現前，最後一次以傳統「兩國方案」為目標的重大和平努力。</p>',
        en: "<h4>The Last Push for a Traditional Peace Model</h4><p>Led by then-U.S. Secretary of State John Kerry, this initiative aimed to restart long-stalled direct negotiations between Israelis and Palestinians. Over nine months of intensive talks, both sides delved into core issues like borders, security, refugees, and Jerusalem, but failed to bridge their differences. The negotiations ultimately collapsed in April 2014, marking the last major peace effort focused on a traditional 'two-state solution' before the emergence of the Abraham Accords.</p>",
      },
    },
    {
      id: 'event_2014_kidnapping',
      year: 2014,
      sortDate: '2014-06-12',
      eventName: {
        zh: '哈瑪斯綁架殺害3以色列青少年',
        en: 'Hamas Kidnapping and Murder of 3 Israeli Teens',
      },
      briefDescription: {
        zh: '綁架謀殺，3死',
        en: 'Kidnapping and murder, 3 dead',
      },
      periodId: 'gaza_wars_modern_conflict',
      isPeace: false,
      iconType: 'mass_casualty',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_2014_protective_edge',
      year: 2014,
      sortDate: '2014-07-08',
      eventName: { zh: '保護邊緣行動', en: 'Operation Protective Edge' },
      briefDescription: {
        zh: '以軍為摧毀地道與火箭，對加薩發動50天戰爭',
        en: '50-day war in Gaza as IDF targets tunnels and rocket sites',
      },
      periodId: 'gaza_wars_modern_conflict',
      isPeace: false,
      iconType: 'conflict',
      isMajorConflict: true,
      actor: 'israel',
      isMilitary: true,
    },
    {
      id: 'event_2018_march_of_return',
      year: 2018,
      sortDate: '2018-03-30',
      eventName: {
        zh: '「偉大回歸遊行」鎮壓',
        en: "'Great March of Return' Protests",
      },
      briefDescription: {
        zh: '以軍應對加薩邊境示威，造成大量傷亡',
        en: 'IDF response to Gaza border protests results in heavy casualties',
      },
      periodId: 'gaza_wars_modern_conflict',
      isPeace: false,
      iconType: 'conflict',
      isMajorConflict: true,
      actor: 'israel',
      isMilitary: true,
    },
    {
      id: 'event_2020_abraham_accords',
      year: 2020,
      sortDate: '2020-09-15',
      eventName: { zh: '《亞伯拉罕協議》簽署', en: 'Abraham Accords Signed' },
      briefDescription: {
        zh: '以色列與阿聯、巴林等國關係正常化',
        en: 'Israel normalizes relations with the UAE, Bahrain, and other nations',
      },
      periodId: 'gaza_wars_modern_conflict',
      isPeace: true,
      iconType: 'peace',
      details: {
        zh: '<h4>繞過巴勒斯坦的和平</h4><p>在美國的斡旋下，以色列與阿聯、巴林等阿拉伯国家達成了一系列關係正常化協議。這標誌著阿拉伯世界與以色列關係的重大轉變，首次繞過了以巴勒斯坦問題為核心的「土地換和平」傳統模式。</p>',
        en: "<h4>Peace That Bypassed the Palestinians</h4><p>Mediated by the United States, Israel reached a series of normalization agreements with Arab nations like the UAE and Bahrain. This marked a significant shift in Arab-Israeli relations, for the first time bypassing the traditional 'land for peace' model centered on the Palestinian issue.</p>",
      },
    },
    {
      id: 'event_2023_hamas_attack',
      year: 2023,
      sortDate: '2023-10-07',
      eventName: {
        zh: '哈瑪斯突襲以色列南部',
        en: 'Hamas Attacks Southern Israel',
      },
      briefDescription: {
        zh: '大規模突襲，約1200死、240人質',
        en: 'Large-scale surprise attack, ~1,200 dead, 240 hostages',
      },
      periodId: 'gaza_wars_modern_conflict',
      isPeace: false,
      iconType: 'mass_casualty',
      isMajorConflict: true,
      actor: 'palestinian',
    },
    {
      id: 'event_2023_swords_of_iron',
      year: 2023,
      sortDate: '2023-10-09',
      eventName: {
        zh: '鐵劍行動 (對加薩的全面戰爭)',
        en: 'Operation Swords of Iron (War on Gaza)',
      },
      briefDescription: {
        zh: '回應哈瑪斯突襲，以軍對加薩發動空前軍事行動',
        en: 'In response to Hamas attack, IDF launches unprecedented military operation in Gaza',
      },
      periodId: 'gaza_wars_modern_conflict',
      isPeace: false,
      iconType: 'conflict',
      isMajorConflict: true,
      actor: 'israel',
      isMilitary: true,
    },
    {
      id: 'event_2024_jaffa_shooting',
      year: 2024,
      sortDate: '2024-10-01',
      eventName: {
        zh: '雅法耶路撒冷大道輕軌站掃射',
        en: 'Jaffa Light Rail Station Shooting',
      },
      briefDescription: { zh: '掃射，7死', en: 'Shooting attack, 7 dead' },
      periodId: 'gaza_wars_modern_conflict',
      isPeace: false,
      iconType: 'shooting',
      isMajorConflict: true,
      actor: 'palestinian',
    },
  ],
  otherEvents: {
    plo_intl_terrorism_hijackings: [
      {
        id: 'event_1968_mahane_yehuda',
        year: 1968,
        sortDate: '1968-11-22',
        eventName: {
          zh: 'Mahane Yehuda市場炸彈',
          en: 'Mahane Yehuda Market Bombing',
        },
        briefDescription: { zh: '汽車炸彈，12死', en: 'Car bomb, 12 dead' },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'event_1968_athens_el_al',
        year: 1968,
        sortDate: '1968-12-26',
        eventName: {
          zh: '雅典El Al客機襲擊',
          en: 'El Al Flight Attack in Athens',
        },
        briefDescription: {
          zh: '掃射與手榴彈，1死',
          en: 'Shooting and grenades, 1 dead',
        },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'event_1969_zurich_el_al',
        year: 1969,
        sortDate: '1969-02-18',
        eventName: {
          zh: '蘇黎世El Al客機射擊',
          en: 'El Al Flight Shooting in Zurich',
        },
        briefDescription: {
          zh: '掃射，副駕駛亡',
          en: 'Shooting, co-pilot killed',
        },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'event_1970_avivim',
        year: 1970,
        sortDate: '1970-05-22',
        eventName: {
          zh: 'Avivim學童公車襲擊',
          en: 'Avivim School Bus Massacre',
        },
        briefDescription: {
          zh: '火箭與掃射，12死 (9兒童)',
          en: 'Rockets and shooting, 12 dead (9 children)',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_1973_athens',
        year: 1973,
        sortDate: '1973-08-05',
        eventName: {
          zh: '雅典機場環球航空襲擊',
          en: 'TWA Athens Airport Attack',
        },
        briefDescription: {
          zh: '掃射與手榴彈，5死',
          en: 'Shooting and grenades, 5 dead',
        },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'event_1974_kiryat_shmona',
        year: 1974,
        sortDate: '1974-04-11',
        eventName: {
          zh: '基亞特·什莫納公寓槍擊',
          en: 'Kiryat Shmona Massacre',
        },
        briefDescription: {
          zh: '掃射，18死 (8兒童)',
          en: 'Shooting attack, 18 dead (8 children)',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'event_1975_savoy_hotel',
        year: 1975,
        sortDate: '1975-03-05',
        eventName: {
          zh: '特拉維夫Savoy Hotel人質案',
          en: 'Savoy Hotel Hostage Crisis, Tel Aviv',
        },
        briefDescription: {
          zh: '人質劫持，11死',
          en: 'Hostage-taking, 11 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'event_1975_zion_square',
        year: 1975,
        sortDate: '1975-07-04',
        eventName: {
          zh: '錫安廣場冰箱炸彈',
          en: 'Zion Square Refrigerator Bombing',
        },
        briefDescription: {
          zh: '冰箱炸彈，15死',
          en: 'Refrigerator bomb, 15 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_1975_zion_pushcart',
        year: 1975,
        sortDate: '1975-11-13',
        eventName: {
          zh: '錫安廣場手推車炸彈',
          en: 'Zion Square Pushcart Bombing',
        },
        briefDescription: {
          zh: '手推車炸彈，6死',
          en: 'Pushcart bomb, 6 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'event_1976_entebbe',
        year: 1976,
        sortDate: '1976-06-27',
        eventName: { zh: '恩德培劫機事件', en: 'Entebbe Hijacking' },
        briefDescription: {
          zh: '法航客機劫至烏干達',
          en: 'Air France flight hijacked to Uganda',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_1978_london_bus',
        year: 1978,
        sortDate: '1978-08-20',
        eventName: {
          zh: '英國倫敦El Al機組巴士襲擊',
          en: 'El Al Crew Bus Attack, London',
        },
        briefDescription: {
          zh: '掃射與手榴彈，1死',
          en: 'Shooting and grenades, 1 dead',
        },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'event_1979_nahariya',
        year: 1979,
        sortDate: '1979-04-22',
        eventName: {
          zh: '納哈里亞哈蘭家慘案',
          en: 'Nahariya Attack (Har-an Family)',
        },
        briefDescription: {
          zh: '父親與2幼女亡',
          en: 'Father and 2 young daughters killed',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'event_1980_misgav_am',
        year: 1980,
        sortDate: '1980-04-07',
        eventName: {
          zh: '米斯加夫安幼兒園人質案',
          en: 'Misgav Am Nursery Hostage Crisis',
        },
        briefDescription: {
          zh: '人質劫持，3死 (1幼童)',
          en: 'Hostage-taking, 3 dead (1 toddler)',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_1980_antwerp',
        year: 1980,
        sortDate: '1980-07-27',
        eventName: {
          zh: '比利時安特衛普猶太學童襲擊',
          en: 'Attack on Jewish Schoolchildren, Antwerp',
        },
        briefDescription: {
          zh: '手榴彈，1死 (男童)',
          en: 'Grenade attack, 1 dead (boy)',
        },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'oe_1980_paris_synagogue',
        year: 1980,
        sortDate: '1980-10-03',
        eventName: {
          zh: '法國巴黎Copernic街猶太會堂炸彈',
          en: 'Rue Copernic Synagogue Bombing, Paris',
        },
        briefDescription: { zh: '汽車炸彈，4死', en: 'Car bomb, 4 dead' },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'oe_1981_vienna_synagogue',
        year: 1981,
        sortDate: '1981-08-29',
        eventName: {
          zh: '奧地利維也納猶太會堂掃射',
          en: 'Vienna Synagogue Shooting',
        },
        briefDescription: {
          zh: '槍擊與手榴彈，2死',
          en: 'Shooting and grenades, 2 dead',
        },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'oe_1982_goldenberg_restaurant',
        year: 1982,
        sortDate: '1982-08-09',
        eventName: {
          zh: '法國巴黎Jo Goldenberg餐廳襲擊',
          en: 'Jo Goldenberg Restaurant Attack, Paris',
        },
        briefDescription: {
          zh: '手榴彈與掃射，6死',
          en: 'Grenades and shooting, 6 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_1982_rome_synagogue',
        year: 1982,
        sortDate: '1982-10-09',
        eventName: {
          zh: '義大利羅馬大猶太會堂襲擊',
          en: 'Great Synagogue of Rome Attack',
        },
        briefDescription: {
          zh: '掃射與手榴彈，1死 (2歲幼童)',
          en: 'Shooting and grenades, 1 dead (2-year-old toddler)',
        },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'oe_1985_larnaca_yacht',
        year: 1985,
        sortDate: '1985-09-25',
        eventName: {
          zh: '賽普勒斯拉納卡以色列遊艇槍擊',
          en: 'Israeli Yacht Shooting, Larnaca, Cyprus',
        },
        briefDescription: { zh: '槍殺，3死', en: 'Shooting, 3 dead' },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'event_1985_achille_lauro',
        year: 1985,
        sortDate: '1985-10-07',
        eventName: { zh: '阿基萊·勞倫號劫持案', en: 'Achille Lauro Hijacking' },
        briefDescription: { zh: '劫船，1死', en: 'Ship hijacking, 1 dead' },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_1985_vienna_airport',
        year: 1985,
        sortDate: '1985-12-27',
        eventName: {
          zh: '維也納史韋夏特機場襲擊',
          en: 'Vienna Schwechat Airport Attack',
        },
        briefDescription: {
          zh: '手榴彈與槍擊，3死',
          en: 'Grenades and gunfire, 3 dead',
        },
        isMajorConflict: false,
        actor: 'palestinian',
      },
    ],
    first_intifada_oslo: [
      {
        id: 'oe_1988_city_of_poros',
        year: 1988,
        sortDate: '1988-07-11',
        eventName: {
          zh: '希臘City of Poros號郵輪襲擊',
          en: 'City of Poros Cruise Ship Attack, Greece',
        },
        briefDescription: {
          zh: '掃射與手榴彈，8死',
          en: 'Shooting and grenades, 8 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_1994_afula',
        year: 1994,
        sortDate: '1994-04-06',
        eventName: { zh: '阿富拉汽車炸彈', en: 'Afula Bus Suicide Bombing' },
        briefDescription: { zh: '汽車炸彈，8死', en: 'Car bomb, 8 dead' },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_1996_bus18_2',
        year: 1996,
        sortDate: '1996-03-03',
        eventName: {
          zh: '耶路撒冷18路公車自殺炸彈(2)',
          en: 'Jerusalem Bus 18 Bombing (2)',
        },
        briefDescription: {
          zh: '自殺炸彈，19死',
          en: 'Suicide bombing, 19 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_1996_dizengoff',
        year: 1996,
        sortDate: '1996-03-04',
        eventName: {
          zh: '特拉維夫Dizengoff Center外自殺炸彈',
          en: 'Dizengoff Center Suicide Bombing',
        },
        briefDescription: {
          zh: '自殺炸彈，13死',
          en: 'Suicide bombing, 13 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_1997_mahane_yehuda',
        year: 1997,
        sortDate: '1997-07-30',
        eventName: {
          zh: 'Mahane Yehuda市場自殺炸彈',
          en: 'Mahane Yehuda Market Bombing',
        },
        briefDescription: {
          zh: '連環自殺炸彈，16死',
          en: 'Double suicide bombing, 16 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
    ],
    second_intifada_gaza_disengagement: [
      {
        id: 'oe_2001_sbarro',
        year: 2001,
        sortDate: '2001-08-09',
        eventName: {
          zh: 'Sbarro披薩店自殺炸彈',
          en: 'Sbarro Pizzeria Suicide Bombing',
        },
        briefDescription: {
          zh: '自殺炸彈，15死 (含7兒童及孕婦)',
          en: 'Suicide bomb, 15 dead (incl. 7 children, 1 pregnant woman)',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2001_ben_yehuda',
        year: 2001,
        sortDate: '2001-12-01',
        eventName: {
          zh: 'Ben Yehuda街連環自殺炸彈',
          en: 'Ben Yehuda Street Bombings',
        },
        briefDescription: {
          zh: '連環自殺炸彈，11死',
          en: 'Double suicide bombing, 11 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2001_bus16',
        year: 2001,
        sortDate: '2001-12-02',
        eventName: {
          zh: '海法16路公車自殺炸彈',
          en: 'Haifa Bus 16 Suicide Bombing',
        },
        briefDescription: {
          zh: '自殺炸彈，15死',
          en: 'Suicide bombing, 15 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2002_hadera',
        year: 2002,
        sortDate: '2002-01-17',
        eventName: {
          zh: '哈代拉猶太成年禮襲擊',
          en: 'Hadera Bat Mitzvah Massacre',
        },
        briefDescription: {
          zh: '掃射與手榴彈，6死',
          en: 'Shooting and grenades, 6 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2002_beit_yisrael',
        year: 2002,
        sortDate: '2002-03-02',
        eventName: {
          zh: 'Beit Yisrael自殺炸彈',
          en: 'Beit Yisrael Suicide Bombing',
        },
        briefDescription: {
          zh: '自殺炸彈，11死 (含嬰幼兒)',
          en: 'Suicide bomb, 11 dead (incl. infants)',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2002_moment_cafe',
        year: 2002,
        sortDate: '2002-03-09',
        eventName: {
          zh: 'Moment Café自殺炸彈',
          en: 'Moment Café Suicide Bombing',
        },
        briefDescription: {
          zh: '自殺炸彈，11死',
          en: 'Suicide bombing, 11 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2002_matza_restaurant',
        year: 2002,
        sortDate: '2002-03-31',
        eventName: {
          zh: 'Matza Restaurant自殺炸彈',
          en: 'Matza Restaurant Suicide Bombing',
        },
        briefDescription: {
          zh: '自殺炸彈，15死',
          en: 'Suicide bombing, 15 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2002_sheffield_club',
        year: 2002,
        sortDate: '2002-05-07',
        eventName: {
          zh: 'Sheffield Club手提箱炸彈',
          en: 'Sheffield Club Bombing',
        },
        briefDescription: {
          zh: '自殺炸彈，15死',
          en: 'Suicide bombing, 15 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2002_megiddo_junction',
        year: 2002,
        sortDate: '2002-06-05',
        eventName: {
          zh: 'Megiddo Junction汽車炸彈',
          en: 'Megiddo Junction Bus Bombing',
        },
        briefDescription: { zh: '汽車炸彈，17死', en: 'Car bomb, 17 dead' },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2002_patt_junction',
        year: 2002,
        sortDate: '2002-06-18',
        eventName: {
          zh: 'Patt Junction公車自殺炸彈',
          en: 'Patt Junction Bus Bombing',
        },
        briefDescription: {
          zh: '自殺炸彈，19死',
          en: 'Suicide bombing, 19 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2002_frank_sinatra',
        year: 2002,
        sortDate: '2002-07-31',
        eventName: {
          zh: 'Frank Sinatra學生中心炸彈',
          en: 'Hebrew University Bombing',
        },
        briefDescription: {
          zh: '遙控炸彈，9死',
          en: 'Remote-detonated bomb, 9 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2002_karkur_junction',
        year: 2002,
        sortDate: '2002-10-21',
        eventName: {
          zh: 'Karkur Junction公車汽車炸彈',
          en: 'Karkur Junction Bus Bombing',
        },
        briefDescription: { zh: '汽車炸彈，14死', en: 'Car bomb, 14 dead' },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2002_kiryat_menachem',
        year: 2002,
        sortDate: '2002-11-21',
        eventName: {
          zh: 'Kiryat Menachem公車自殺炸彈',
          en: 'Kiryat Menachem Bus Bombing',
        },
        briefDescription: {
          zh: '自殺炸彈，11死',
          en: 'Suicide bombing, 11 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2002_kenya_hotel',
        year: 2002,
        sortDate: '2002-11-28',
        eventName: {
          zh: '肯亞Paradise Hotel汽車炸彈',
          en: 'Paradise Hotel Bombing, Kenya',
        },
        briefDescription: { zh: '汽車炸彈，13死', en: 'Car bomb, 13 dead' },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2003_neve_shaanan',
        year: 2003,
        sortDate: '2003-01-05',
        eventName: {
          zh: "Neve Sha'anan區雙自殺炸彈",
          en: 'Tel Aviv Central Bus Station Bombing',
        },
        briefDescription: {
          zh: '連環自殺炸彈，23死',
          en: 'Double suicide bombing, 23 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2003_bus37_haifa',
        year: 2003,
        sortDate: '2003-03-05',
        eventName: {
          zh: '海法37路公車自殺炸彈',
          en: 'Haifa Bus 37 Suicide Bombing',
        },
        briefDescription: {
          zh: '自殺炸彈，17死 (多學生)',
          en: 'Suicide bomb, 17 dead (many students)',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2003_davidka_square',
        year: 2003,
        sortDate: '2003-06-11',
        eventName: {
          zh: 'Davidka Square公車自殺炸彈',
          en: 'Davidka Square Bus Bombing',
        },
        briefDescription: {
          zh: '自殺炸彈，17死',
          en: 'Suicide bombing, 17 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2004_gaza_street',
        year: 2004,
        sortDate: '2004-01-29',
        eventName: {
          zh: 'Gaza Street公車自殺炸彈',
          en: 'Gaza Street Bus Bombing',
        },
        briefDescription: {
          zh: '自殺炸彈，11死',
          en: 'Suicide bombing, 11 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2004_ashdod_port',
        year: 2004,
        sortDate: '2004-03-14',
        eventName: {
          zh: '阿什杜德港連環自殺炸彈',
          en: 'Ashdod Port Suicide Bombing',
        },
        briefDescription: {
          zh: '連環自殺炸彈，10死',
          en: 'Double suicide bombing, 10 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2004_beersheba_bus',
        year: 2004,
        sortDate: '2004-08-31',
        eventName: {
          zh: '貝爾謝巴兩公車雙自殺炸彈',
          en: 'Beersheba Bus Bombings',
        },
        briefDescription: {
          zh: '連環自殺炸彈，16死',
          en: 'Double suicide bombing, 16 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
    ],
    gaza_wars_modern_conflict: [
      {
        id: 'oe_2011_eilat',
        year: 2011,
        sortDate: '2011-08-18',
        eventName: { zh: '埃拉特路連環襲擊', en: 'Eilat Road Attacks' },
        briefDescription: {
          zh: '連環襲擊，8死',
          en: 'Coordinated attacks, 8 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2014_har_nof',
        year: 2014,
        sortDate: '2014-11-18',
        eventName: {
          zh: 'Har Nof猶太會堂襲擊',
          en: 'Har Nof Synagogue Massacre',
        },
        briefDescription: {
          zh: '掃射與刺殺，6死',
          en: 'Shooting and stabbing, 6 dead',
        },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2015_henkin',
        year: 2015,
        sortDate: '2015-10-01',
        eventName: { zh: 'Henkin夫婦遇刺案', en: 'Henkin Couple Murder' },
        briefDescription: { zh: '槍殺，2死', en: 'Shooting, 2 dead' },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'oe_2016_dafna_meir',
        year: 2016,
        sortDate: '2016-01-17',
        eventName: { zh: 'Dafna Meir遇刺案', en: 'Murder of Dafna Meir' },
        briefDescription: { zh: '刺殺，1死', en: 'Stabbing, 1 dead' },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'oe_2016_sarona_market',
        year: 2016,
        sortDate: '2016-06-08',
        eventName: {
          zh: '特拉維夫Sarona Market掃射',
          en: 'Sarona Market Shooting, Tel Aviv',
        },
        briefDescription: { zh: '掃射，4死', en: 'Shooting, 4 dead' },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'oe_2016_hallel_ariel',
        year: 2016,
        sortDate: '2016-06-30',
        eventName: {
          zh: 'Hallel Yaffa Ariel遇刺案',
          en: 'Murder of Hallel Yaffa Ariel',
        },
        briefDescription: {
          zh: '刺殺，1死 (13歲少女)',
          en: 'Stabbing, 1 dead (13-year-old girl)',
        },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'oe_2017_halamish',
        year: 2017,
        sortDate: '2017-07-21',
        eventName: {
          zh: 'Halamish Salomon一家3人遇刺案',
          en: 'Halamish Stabbing (Salomon Family)',
        },
        briefDescription: { zh: '刺殺，3死', en: 'Stabbing, 3 dead' },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'oe_2018_ari_fuld',
        year: 2018,
        sortDate: '2018-09-16',
        eventName: { zh: 'Ari Fuld遇刺案', en: 'Murder of Ari Fuld' },
        briefDescription: { zh: '刺殺，1死', en: 'Stabbing, 1 dead' },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'oe_2019_ori_ansbacher',
        year: 2019,
        sortDate: '2019-02-07',
        eventName: { zh: 'Ori Ansbacher姦殺案', en: 'Murder of Ori Ansbacher' },
        briefDescription: {
          zh: '姦殺，19歲少女遇害',
          en: 'Rape and murder, 19-year-old girl killed',
        },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'oe_2022_bnei_brak',
        year: 2022,
        sortDate: '2022-03-29',
        eventName: { zh: 'Bnei Brak掃射', en: 'Bnei Brak Shooting' },
        briefDescription: { zh: '掃射，5死', en: 'Shooting, 5 dead' },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'oe_2022_dizengoff',
        year: 2022,
        sortDate: '2022-04-07',
        eventName: { zh: 'Dizengoff隨機掃射', en: 'Dizengoff Street Shooting' },
        briefDescription: { zh: '掃射，3死', en: 'Shooting, 3 dead' },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'oe_2022_elad',
        year: 2022,
        sortDate: '2022-05-05',
        eventName: { zh: 'Elad刀斧襲擊', en: 'Elad Axe Attack' },
        briefDescription: { zh: '刀斧襲擊，4死', en: 'Axe attack, 4 dead' },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'oe_2023_neve_yaakov',
        year: 2023,
        sortDate: '2023-01-27',
        eventName: {
          zh: 'Neve Yaakov猶太會堂外掃射',
          en: 'Neve Yaakov Synagogue Shooting',
        },
        briefDescription: { zh: '掃射，7死', en: 'Shooting, 7 dead' },
        isMajorConflict: true,
        actor: 'palestinian',
      },
      {
        id: 'oe_2023_ramot_ramming',
        year: 2023,
        sortDate: '2023-02-10',
        eventName: {
          zh: 'Ramot公車站駕車衝撞',
          en: 'Ramot Car-Ramming Attack',
        },
        briefDescription: {
          zh: '駕車衝撞，3死 (2兒童)',
          en: 'Car-ramming, 3 dead (2 children)',
        },
        isMajorConflict: false,
        actor: 'palestinian',
      },
      {
        id: 'oe_2023_givat_shaul',
        year: 2023,
        sortDate: '2023-11-30',
        eventName: {
          zh: '耶路撒冷Givat Shaul公車站掃射',
          en: 'Givat Shaul Bus Stop Shooting, Jerusalem',
        },
        briefDescription: { zh: '掃射，3死', en: 'Shooting, 3 dead' },
        isMajorConflict: false,
        actor: 'palestinian',
      },
    ],
  },
  rocketLaunches: [
    { year: 2001, numericCount: 4, type: { zh: '火箭彈', en: 'Rockets' } },
    { year: 2002, numericCount: 35, type: { zh: '火箭彈', en: 'Rockets' } },
    { year: 2003, numericCount: 155, type: { zh: '火箭彈', en: 'Rockets' } },
    { year: 2004, numericCount: 281, type: { zh: '火箭彈', en: 'Rockets' } },
    {
      year: 2005,
      numericCount: 1255,
      type: { zh: '火箭彈和迫擊砲', en: 'Rockets & Mortars' },
    },
    { year: 2006, numericCount: 1777, type: { zh: '火箭彈', en: 'Rockets' } },
    {
      year: 2007,
      numericCount: 2807,
      type: { zh: '火箭彈和迫擊砲', en: 'Rockets & Mortars' },
    },
    {
      year: 2008,
      numericCount: 3716,
      type: { zh: '火箭彈和迫擊砲', en: 'Rockets & Mortars' },
    },
    {
      year: 2009,
      numericCount: 858,
      type: { zh: '火箭彈和迫擊砲', en: 'Rockets & Mortars' },
    },
    {
      year: 2010,
      numericCount: 365,
      type: { zh: '火箭彈和迫擊砲', en: 'Rockets & Mortars' },
    },
    {
      year: 2011,
      numericCount: 680,
      type: { zh: '火箭彈和迫擊砲', en: 'Rockets & Mortars' },
    },
    { year: 2012, numericCount: 2273, type: { zh: '火箭彈', en: 'Rockets' } },
    { year: 2013, numericCount: 44, type: { zh: '火箭彈', en: 'Rockets' } },
    {
      year: 2014,
      numericCount: 4500,
      type: { zh: '火箭彈和迫擊砲', en: 'Rockets & Mortars' },
    },
    { year: 2015, numericCount: 20, type: { zh: '火箭彈', en: 'Rockets' } },
    { year: 2016, numericCount: 15, type: { zh: '火箭彈', en: 'Rockets' } },
    { year: 2017, numericCount: 35, type: { zh: '火箭彈', en: 'Rockets' } },
    { year: 2018, numericCount: 400, type: { zh: '火箭彈', en: 'Rockets' } },
    {
      year: 2019,
      numericCount: 1340,
      type: { zh: '火箭彈和迫擊砲', en: 'Rockets & Mortars' },
    },
    { year: 2020, numericCount: 150, type: { zh: '火箭彈', en: 'Rockets' } },
    { year: 2021, numericCount: 4400, type: { zh: '火箭彈', en: 'Rockets' } },
    { year: 2022, numericCount: 1179, type: { zh: '火箭彈', en: 'Rockets' } },
    {
      year: 2023,
      numericCount: 13500,
      type: { zh: '火箭彈和迫擊砲', en: 'Rockets & Mortars' },
    },
    {
      year: 2024,
      numericCount: 700,
      type: { zh: '火箭彈和迫擊砲', en: 'Rockets & Mortars' },
    },
  ],
};

('use strict');

// --- 全域常數與設定 ---
const CSS_CLASSES = {
  HIDDEN: 'hidden',
  ACTIVE: 'active',
  DARK_MODE: 'dark-mode',
  MODAL_IS_OPEN: 'modal-is-open',
  NAV_HIDDEN: 'nav-hidden',
  MODAL_TIMELINE_ENTRY_NO_EVENTS: 'modal-timeline-entry no-events-message',
  CHART_LOADING: 'chart-loading',
  RIPPLE: 'ripple',
  TOOLTIP_VISIBLE: 'visible',
  HAS_TOOLTIP: 'has-tooltip',
  EXPANDED: 'expanded',
  ROTATED: 'rotated',
};

const ELEMENT_IDS = {
  SPLASH_SCREEN: 'splashScreen',
  EMBER_CONTAINER: 'ember-container',
  SPLASH_INTRO_SEQUENCE: 'splashIntroSequence',
  SPLASH_MAIN_MENU: 'splashMainMenu',
  ENTER_TIMELINE_BUTTON: 'enterTimelineButton',
  MAIN_CONTENT_WRAPPER: 'mainContentWrapper',
  PERIOD_NAV: 'periodNav',
  CONTENT_BODY: 'contentBody',
  SITE_HERO: 'siteHero',
  CURRENT_YEAR_SPAN: 'currentYear',
  OTHER_EVENTS_MODAL: 'otherEventsModal',
  CLOSE_OTHER_EVENTS_MODAL_BUTTON: 'closeOtherEventsModalButton',
  OTHER_EVENTS_MODAL_TITLE_TEXT: 'otherEventsModalTitleText',
  OTHER_EVENTS_MODAL_LIST: 'otherEventsModalList',
  ROCKET_STATS_MODAL: 'rocketStatsModal',
  CLOSE_ROCKET_STATS_MODAL_BUTTON: 'closeRocketStatsModalButton',
  ROCKET_STATS_MODAL_TITLE_TEXT: 'rocketStatsModalTitleText',
  ROCKET_STATS_MODAL_BODY_CONTENT: 'rocketStatsModalBodyContent',
  CHART_JS_SCRIPT: 'chartjs-script',
  EVENT_TOOLTIP: 'eventTooltip',
  SHOW_PROLOGUE_BUTTON: 'showPrologueButton',
  PROLOGUE_SECTION: 'prologueSection',
  START_TIMELINE_BUTTON: 'startTimelineButton',
  FOOTER_THEME_SELECTOR: 'footerThemeSelector', // <-- 確保有這一行
  FAB_CONTAINER: 'fabContainer',
  FAB_MAIN_BUTTON: 'fabMainButton',
  FAB_ACTIONS: 'fabActions',
};

// --- SVG 圖示庫 ---
const icons = {
  info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="icon"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>`,
  conflict: `<svg viewBox="0 0 20 20" fill="currentColor" class="icon"><path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a1 1 0 00-1 1v2a1 1 0 001 1h.5v4.5a4.5 4.5 0 109 0V13h.5a1 1 0 001-1v-2a1 1 0 00-1-1h-.5V5.5A4.5 4.5 0 0010 1zm0 2.5a2 2 0 100 4 2 2 0 000-4zM8.5 10a1.5 1.5 0 113 0h-3zM13 14.5a2 2 0 11-4 0 2 2 0 014 0z" clip-rule="evenodd" /></svg>`,
  peace: `<svg viewBox="0 0 20 20" fill="currentColor" class="icon"><path d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-5.372l1.28 1.024a.75.75 0 00.94-1.154L4.385 10l1.335-1.068a.75.75 0 00-.94-1.154L3.5 8.872V2.75zM6.503 5.375a.75.75 0 000 1.5h10.75a.75.75 0 000-1.5H6.503zM6.5 9.25a.75.75 0 000 1.5h10.75a.75.75 0 000-1.5H6.5zM6.503 13.125a.75.75 0 000 1.5h10.75a.75.75 0 000-1.5H6.503z" /></svg>`,
  pivotal: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="icon"><path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" /></svg>`,
  mass_casualty: `<svg viewBox="0 0 20 20" fill="currentColor" class="icon"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.22 8.22a.75.75 0 011.06-1.06L10 9.44l2.72-2.28a.75.75 0 011.06 1.06L11.06 10l2.72 2.28a.75.75 0 11-1.06 1.06L10 11.06l-2.72 2.28a.75.75 0 01-1.06-1.06L8.94 10 6.22 7.72a.75.75 0 010-1.06z" clip-rule="evenodd" /></svg>`,
  bomb: `<svg viewBox="0 0 20 20" fill="currentColor" class="icon"><path d="M8.5 2.75a.75.75 0 01.75.75v.5h1.5v-.5a.75.75 0 011.5 0v.5h.75a2.5 2.5 0 012.5 2.5v8.5a2.5 2.5 0 01-2.5-2.5h-7.5a2.5 2.5 0 01-2.5-2.5v-8.5a2.5 2.5 0 012.5-2.5H7.25v-.5a.75.75 0 01.75-.75h.5zM6 6.25v8.5a1 1 0 001 1h6a1 1 0 001-1v-8.5H6z" /></svg>`,
  shooting: `<svg viewBox="0 0 20 20" fill="currentColor" class="icon"><path d="M10 8a2 2 0 100-4 2 2 0 000 4zM3.465 14.532a2.5 2.5 0 013.536-3.536l6.293-6.293a2.501 2.501 0 113.536 3.536L10.536 14.53a2.5 2.5 0 01-3.536 0L3.465 10.997a2.5 2.5 0 010-3.536L2.373 8.553a4 4 0 105.657 5.657L11.564 17.74a1 1 0 001.414-1.414l-3.535-3.536a.5.5 0 01.707-.707l3.536 3.535a1 1 0 001.414-1.414l-6.293-6.293a.5.5 0 01.707-.707l6.293 6.293a1 1 0 101.414-1.414L9.67 3.464a4.002 4.002 0 00-5.657 0L2.373 5.106a4 4 0 000 5.657l1.092 1.092z" /></svg>`,
  vehicle_attack: `<svg viewBox="0 0 20 20" fill="currentColor" class="icon"><path fill-rule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h13.25c1.035 0 1.875.84 1.875 1.875v7.25c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 13.625v-7.25zm2.063.375A.563.563 0 003.376 7.5h13.25a.563.563 0 00.187-.75L14.25 3.03a.75.75 0 00-1.06 0L10 6.188 6.814 3.03a.75.75 0 00-1.062 0l-2.562 3.72zM5 10a1 1 0 100-2 1 1 0 000 2zm4-1a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" /></svg>`,
  war: `<svg class="icon" style="transform: translateY(0.5px);" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g><path d="M305.844,132.859c-3.219-16.797-17.906-28.922-34.984-28.922h-87.297c-17.625,0-32.594,12.891-35.219,30.328 l-10.516,70.172h181.703L305.844,132.859z"></path><path d="M450.313,246.063c-4.625-8.406-10.813-15.313-18.141-20.188c-3.672-2.438-7.609-4.344-11.75-5.656 c-4.141-1.281-8.484-1.984-12.891-1.984h-336c-4.828,0-9.547,0.828-14.016,2.359c-6.719,2.313-12.844,6.219-18.078,11.313 C34.188,237,29.813,243.313,26.5,250.5l-0.188,0.422L0,327.688l17.406,5.969l9.078-26.531h16.578 c-2.203,2.063-4.188,4.375-5.906,6.906c-4.344,6.438-6.906,14.25-6.906,22.594c0,5.516,1.125,10.656,3.188,15.141 c1.516,3.359,3.5,6.391,5.766,9.078c3.391,4.063,7.328,7.438,11.453,10.563c4.141,3.156,8.484,6.063,12.781,9.063l0.125,0.094 l25.781,16.609c11.031,7.109,23.875,10.891,36.984,10.891h227.063c13.109,0,25.953-3.781,36.969-10.875l25.797-16.625l0.125-0.094 c3.813-2.656,7.688-5.266,11.391-8c2.781-2.063,5.484-4.219,8.031-6.594c1.922-1.75,3.734-3.656,5.375-5.719 c2.484-3.094,4.609-6.594,6.109-10.547c1.484-3.953,2.281-8.328,2.281-12.984c0-5.563-1.125-10.906-3.188-15.719 c-2.219-5.281-5.531-9.938-9.625-13.781h25.516l16.453,30.719l16.219-8.688l-44.5-83.047L450.313,246.063z M431.469,345.063 c-0.828,1.844-1.938,3.594-3.438,5.359c-2.203,2.656-5.203,5.297-8.813,8.047c-3.563,2.719-7.719,5.516-12.109,8.578L381.563,383.5 c-8.406,5.438-18.188,8.297-28.172,8.297H126.328c-9.984,0-19.766-2.859-28.172-8.297l-25.531-16.453 c-3.906-2.734-7.625-5.234-10.875-7.641c-2.5-1.844-4.75-3.656-6.656-5.438c-1.438-1.344-2.703-2.656-3.781-4 c-1.594-1.984-2.75-3.938-3.531-6.063c-0.813-2.125-1.25-4.438-1.266-7.281c0-3.344,0.672-6.5,1.891-9.391 c1.844-4.328,4.906-8.047,8.781-10.641c3.875-2.609,8.469-4.125,13.484-4.125h338.391c3.344,0,6.5,0.656,9.375,1.906 c4.313,1.813,8.031,4.906,10.641,8.75c2.609,3.875,4.125,8.469,4.125,13.5C433.188,340,432.563,342.609,431.469,345.063z"></path><polygon points="321.641,168.5 442.031,158.094 442.656,165.297 512,159.313 508.563,119.531 439.219,125.531 439.844,132.719 319.453,143.125 "></polygon><polygon points="132.156,171.531 71.344,171.906 71.344,203.031 126.5,203.031 "></polygon><path d="M134.766,324.375c-15.766,0-28.563,12.781-28.563,28.563S119,381.5,134.766,381.5s28.563-12.781,28.563-28.563 S150.531,324.375,134.766,324.375z"></path><path d="M204.594,324.375c-15.781,0-28.563,12.781-28.563,28.563s12.781,28.563,28.563,28.563 c15.766,0,28.563-12.781,28.563-28.563S220.359,324.375,204.594,324.375z"></path><path d="M274.406,324.375c-15.766,0-28.563,12.781-28.563,28.563s12.797,28.563,28.563,28.563 c15.781,0,28.563-12.781,28.563-28.563S290.188,324.375,274.406,324.375z"></path><path d="M344.234,324.375c-15.766,0-28.563,12.781-28.563,28.563s12.797,28.563,28.563,28.563 s28.563-12.781,28.563-28.563S360,324.375,344.234,324.375z"></path><path d="M70.672,321.313c-8.453,0-15.328,6.844-15.328,15.313c0,8.453,6.875,15.313,15.328,15.313 s15.313-6.859,15.313-15.313C85.984,328.156,79.125,321.313,70.672,321.313z"></path><path d="M411.031,321.313c-8.453,0-15.313,6.844-15.313,15.313c0,8.453,6.859,15.313,15.313,15.313 c8.469,0,15.313-6.859,15.313-15.313C426.344,328.156,419.5,321.313,411.031,321.313z"></path></g></svg>`,
  handshake: `<svg viewBox="0 0 420 420" version="1.1" xmlns="http://www.w3.org/2000/svg" class="icon" fill="var(--peace-accent-color)"><g><g><g><path d="M252.877,92.823h53.791l0.005,62.757l27.271-42.343V77.743c0-2.168-0.863-4.247-2.396-5.787L261.984,2.395 C260.451,0.863,258.371,0,256.199,0H41.113C27.579,0,16.566,11.008,16.566,24.543v370.914c0,13.534,11.012,24.543,24.547,24.543 h268.283c13.533,0,24.545-11.009,24.545-24.543V290.15l-27.264,41.721l0.004,60.854H43.84V27.274h198.906v55.417 C242.746,88.29,247.281,92.823,252.877,92.823z"></path><path d="M364.398,195.123l-11.271-7.364c-1.84-1.201-4.303-0.686-5.506,1.154l-60.688,92.866l-11.67-7.625l60.688-92.867 c1.203-1.841,0.687-4.304-1.153-5.506l-11.271-7.365c-1.84-1.202-4.305-0.686-5.506,1.154l-90.869,139.053 c-0.386,0.591-0.607,1.274-0.643,1.979l-2.375,48.258c-0.069,1.409,0.614,2.754,1.797,3.523c1.183,0.773,2.688,0.86,3.949,0.231 l43.243-21.553c0.634-0.313,1.17-0.793,1.558-1.385l90.867-139.052C366.754,198.79,366.236,196.326,364.398,195.123z"></path><path d="M401.631,138.145l-40.869-26.708c-1.838-1.201-4.304-0.685-5.506,1.154l-27.563,42.179 c-1.201,1.84-0.686,4.306,1.154,5.508l40.869,26.706c1.838,1.202,4.305,0.686,5.506-1.154l27.562-42.178 C403.988,141.812,403.471,139.347,401.631,138.145z"></path><path d="M83.563,87.462h78c5.523,0,10-4.478,10-10s-4.477-10-10-10h-78c-5.523,0-10,4.478-10,10S78.042,87.462,83.563,87.462z"></path><path d="M231.563,127.462c0-5.522-4.479-10-10-10h-138c-5.523,0-10,4.478-10,10s4.477,10,10,10h138 C227.086,137.462,231.563,132.984,231.563,127.462z"></path><path d="M83.563,187.462h78c5.523,0,10-4.478,10-10s-4.477-10-10-10h-78c-5.523,0-10,4.478-10,10S78.042,187.462,83.563,187.462z "></path><path d="M83.563,237.462h78c5.523,0,10-4.478,10-10c0-5.521-4.477-10-10-10h-78c-5.523,0-10,4.479-10,10 C73.563,232.984,78.042,237.462,83.563,237.462z"></path><path d="M87.796,366.694c-1.947,2.516,1.565,6.082,3.536,3.533c6.213-8.026,11.344-16.671,15.629-25.795 c2.674,1.679,6.185,1.343,9.065,0.205c4.151-1.637,7.67-4.796,11.021-7.655c1.981-1.69,4.287-4.481,7.029-4.748 c2.094-0.201,4.922,1.485,7.015,1.844c5.469,0.932,11.857-0.651,17.137-1.956c5.011-1.237,10.879-3.194,13.828-7.731 c1.763-2.712-2.568-5.216-4.317-2.521c-2.361,3.632-8.126,4.764-12.022,5.726c-4.573,1.131-9.879,2.246-14.592,1.442 c-3.552-0.604-6.425-2.752-10.077-1.125c-4.892,2.18-8.629,6.761-12.949,9.854c-1.933,1.384-4.142,2.714-6.56,2.901 c-0.995,0.077-1.806-0.288-2.48-0.896c0.532-1.234,1.06-2.474,1.563-3.725c4.876-12.104,7.081-24.396,9.344-37.146 c1.15-6.479,3.063-16.688-6.223-17.311c-8.205-0.548-15.296,11.287-17.918,17.524c-2.345,5.578-2.606,12.058-2.427,18.014 c0.111,3.712,1.447,7.566,2.432,11.404c-7.874,1.263-14.814,9.216-13.598,17.1c1.197,7.758,10.898,3.752,14.521,0.881 c3.667-2.905,4.854-6.534,4.893-10.448c0.731,1.205,1.342,2.65,1.974,4.002C99.395,349.544,94.098,358.552,87.796,366.694z M96.56,338.393c-0.74,3.298-4.913,6.554-8.199,6.858c-2.585,0.24-1.008-4.377-0.497-5.409c1.604-3.242,5.578-5.358,8.919-6.27 C96.939,335.199,96.914,336.811,96.56,338.393z M100.736,328.712c-0.851-3.976-2.032-7.969-2.338-11.583 c-0.592-6.975,0.647-14.284,4.106-20.384c2.161-3.812,6.566-9.654,11.239-10.154c4.173-0.444,1.628,9.705,1.267,11.744 c-1.117,6.294-1.914,12.541-3.471,18.763c-1.446,5.778-3.278,11.5-5.469,17.095C104.905,331.294,103.388,329.438,100.736,328.712 z"></path></g></g></g></svg>`,
  hamas_cs_icon: `<svg viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" class="icon" fill="var(--pivotal-accent-color)"><path d="M9.103.435c.4347-.3913 1.087-.5362 1.6522-.3623.2174.0725.4058.203.6087.3333.1595.1015.3479.145.4928.261.0725.058.0145.1594.0145.2318.1884.4493.2899.9421.1305 1.4204-.1305.1594-.3624.203-.5508.2754-.029.2029.0435.3913.0725.5942-.0435.029-.0725.058-.116.087.2754-.0145.5508-.0725.8262-.1304.1014-.1015.2608-.0435.3913-.058.0145-.203.087-.3914.087-.5943.029 0 .087-.0145.1159-.029.0145.145 0 .29.0435.4349.0724.058.1884.029.2754.0434 0 .058 0 .116.0144.174 1.6813-.0145 3.377 0 5.0583 0v.2464h.1595v-.9421h.1884c0 .2609-.0145.5072 0 .7681a.1107.1107 0 0 0 .0725.029c0 .029.0144.087.0144.116.058-.058.1305-.1015.2174-.0725.0145.0435.029.087.0435.145-.058.058-.087.1304-.058.2173.4639.0145.9277 0 1.406 0 .0434-.058.1159-.087.1884-.116.029.0146.0724.0436.087.058h.6811c.029.116.029.232.0145.3334h-.6957c-.0145.0145-.058.058-.087.0725-.0724-.0435-.1304-.0725-.2029-.116h-1.2609c-.2464.0725-.5073.058-.7537.0145v.2754h-2.0726c-.087.0725-.1739.116-.2898.1305.0434.2174-.203.2753-.29.4348-.0579.087-.1448.1449-.2318.1739-.0725.4493.087.8696.203 1.29-.1305.029-.2755.0724-.406.1014-.0724.2899-.1449.5942-.2028.884-.058.261-.261.4784-.5073.5798-.174.203-.4058.4059-.6812.4204-.1015.029-.174-.0435-.2464-.1015-.3623.029-.6957-.145-1.0146-.2899-.3478-.1594-.6667-.3623-1-.5507.029.2029-.0725.3768-.145.5507.1595.0725.3769.1305.4638.3044.058.1304.116.2754.116.4348-.0145.5218-.0725 1.0435-.1015 1.5653.0145.3769-.1739.7537-.4348 1.029-.1739-.0144-.3188-.0869-.4783-.1594-.058.1305-.1884.261-.116.4204.058.1884.058.3913.145.5652.4928.5218.9131 1.1015 1.2175 1.7537.3043.6233.5362 1.2755.7826 1.9277.0435 0 .1305-.0145.174-.0145.058.1884 0 .4058.116.5798.1014.1594.0724.3478.0724.5362-.029.4348-.058.8696-.1015 1.3044-.029.3044-.1014.6088-.1449.9132.0145.2318.116.4637.1014.6956-.0144.2175-.0144.4493-.1884.6088.0145.4928-.116.9855.058 1.4638.232.3189.4928.6233.7682.8986.3043.145.6667.174.9276.4349.1014.1594.0434.3478.0145.5217a6.7323 6.7323 0 0 1-1.8697 0c-.2464-.058-.4783-.1594-.7247-.1884-.3334.0145-.7247.145-1.029-.087-.029-.3913.1159-.7681.1884-1.145.029-.1304.1594-.2174.1449-.3478-.029-.4493-.058-.9131-.087-1.3624-.058-.029-.1594-.058-.1449-.145 0-.2173-.0725-.4347-.1304-.6377-.1015-.5507-.145-1.116-.1595-1.6812-.0145-.1595.087-.2754.203-.3769.029-.2464.058-.5072.0724-.7536-.0435-.1305-.145-.232-.203-.3479-.2608.029-.6376.087-.797-.1884-.3769-.5653-.7682-1.145-1.145-1.7102-.1595-.0145-.3479 0-.4928-.1015-.1595-.174-.261-.4058-.3624-.6232-.0435.1739-.0725.3623-.174.5072-.0869.145-.2318.2464-.3333.3769-.1014.2319-.1884.4638-.2753.6957-.1015.2898-.2464.5797-.2754.8986-.0145.1594-.0435.3044-.1015.4493-.0724.116-.2029.1594-.3188.2174-.087.1884-.145.3768-.2754.5363-.087.1014-.232.1304-.2899.2608-.058.174-.145.3334-.2174.4928-.029.174.087.3624.029.5363-.1015.4348-.3189.8406-.5218 1.232-.1014.2898-.1739.5942-.3188.8696-.058.116-.203.145-.3189.1594-.1304.3189-.2754.6232-.3623.9566-.0435.3188-.0435.6522-.029.971 0 .145.087.261.145.3914.0579.174.0144.3478-.0146.5218-.5652.0724-1.145.1304-1.6957-.0435-.058-.0435-.0435-.116-.058-.174-.0435-.2608-.0725-.5362.0145-.7826.1884-.6812.3478-1.3624.5362-2.0436-.0724-.0725-.1739-.1304-.1739-.2464-.0145-.1884 0-.3913.0435-.5797.087-.319.3189-.5653.4348-.8697.0435-.1304.029-.2609.0435-.3913 0-.3044.174-.5508.3044-.8116.1304-.2174.2318-.4493.4058-.6378.116-.1014.116-.2608.2029-.3913.087-.1594.2319-.2899.2319-.4783.029-.2319-.058-.4638-.029-.6957.058-.6812.1884-1.3479.3044-2.029-.058-.0726-.145-.145-.174-.2465.0145-.0724.029-.1304.0435-.2029l-.1304-.2174c.058-.087.116-.1884.174-.2754-.058-.0435-.1305-.1014-.1885-.145.0725-.2173.0435-.5362.3043-.6376.029.0145.1015.029.1305.0434-.0435-.3768-.0435-.7681-.087-1.145-.1014-.4058-.116-.826-.0724-1.232.1449-.2173.4203-.3043.6667-.3188-.3189-.0724-.6378-.1014-.9421-.2029-.0145-.2609.029-.5218.0725-.7826.1304-.5073.0724-1.029.1449-1.5509.0725-.1449.2609-.1739.4203-.1449.1884.029.3768-.029.5653-.087 0-.0724.0145-.1594 0-.2319-.116-.5072-.087-1.029 0-1.5218.116-.6377.3768-1.261.855-1.7102.319-.3044.7827-.4494 1.2176-.4349.1449 0 .2318.145.3478.232.058-.058.116-.116.1594-.174-.0724-.2464-.1884-.5073-.1739-.7681.029-.5798.2174-1.174.6522-1.5654m4.522 4.1017c.029.029.029.029 0 0m.203.029c.0144.1015.0434.203-.0145.2899-.0725.029-.1595.029-.232.0725.203 0 .4059.0145.6088 0 .1594-.0435.1015-.2464.1015-.3624-.1015-.116-.3189-.0435-.4638 0m-.5073.6088c.145.1594.2174.4058.3478.5652.1884-.2464.3334-.5073.5508-.7247-.2609-.0145-.5218.0145-.7827-.0145-.0435.058-.0724.116-.116.174Z"></path></svg>`,
  settlement_house: `<svg viewBox="0 0 45.548 45.547" version="1.1" xmlns="http://www.w3.org/2000/svg" class="icon" fill="var(--pivotal-accent-color)"><path d="M0.364,41.487L20.822,8.418l-3.579-5.536c-0.479-0.741-0.267-1.729,0.474-2.208c0.741-0.479,1.731-0.268,2.211,0.475 l2.844,4.403l2.848-4.404c0.479-0.741,1.469-0.953,2.209-0.474c0.741,0.479,0.953,1.468,0.476,2.209l-3.578,5.536l20.457,33.069 c0.461,0.735,0.486,1.656,0.065,2.415c-0.42,0.76-1.22,1.225-2.087,1.225h-9.055c-0.817,0-1.579-0.417-2.021-1.104l-7.693-12.007 c-0.354-0.552-0.964-0.885-1.619-0.885c-0.654,0-1.265,0.333-1.619,0.886l-7.689,12.006c-0.44,0.689-1.202,1.106-2.021,1.106 H2.387c-0.868,0-1.668-0.465-2.088-1.226S-0.097,42.222,0.364,41.487z"></path></svg>`,
  disengagement_bus: `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" class="icon"><path fill="currentColor" d="M23.386 142.898V274.27h242.691V142.898zm258.959 1.397c-.156 48.746-.098 96.793-.098 145.914H179.556a53.33 53.33 0 0 1 21.62 30.86v29.736h196.352v-32.707c3.503-10.956 18.466-26.48 27.844-33.139h50.346v-41.148h-110.39v-28.295h-7.17v37.103h-52v-51.44c.078-1.439.036-3.089.036-4.597h60.092v-21.248h-24.45zm-186.73 11.72c26.848 0 48.806 21.958 48.807 48.807 0 26.85-21.958 48.807-48.807 48.807-26.849 0-48.804-21.958-48.804-48.807 0-26.849 21.955-48.806 48.804-48.806zm-8.268 13.854V195.355H61.858v17.198h25.489v25.488h17.195v-25.488h25.488v-17.198h-25.488V169.87zm-47.83 120.37c.156 14.386.105 4.07.507 32.359h57.944l4-11.819a53.36 53.36 0 0 1 17.728-20.54zm109.931 4.161c-21.985 0-40 18.016-40 40 0 21.985 18.015 40 40 40s40-18.015 40-40c0-21.984-18.015-40-40-40zm299.166.262c-21.985 0-40 18.015-40 40 0 10.15 3.846 19.448 10.143 26.524 7.343 8.25 18.022 13.476 29.857 13.476 21.985 0 40-18.015 40-40s-18.015-40-40-40zM149.448 312.4c12.257 0 22 9.744 22 22 0 12.257-9.743 22-22 22s-22-9.743-22-22c0-12.256 9.743-22 22-22zm299.166.262c12.257 0 22 9.743 22 22s-9.743 22-22 22-22-9.743-22-22 9.743-22 22-22zm-298.978 8.656c-11.449 0-17.182 13.84-9.088 21.936 8.094 8.095 21.936 2.365 21.937-9.084-.006-7.093-5.757-12.84-12.85-12.84zm298.406.014c-10.766-.003-17.007 13.839-8.912 21.934 8.095 8.094 21.936 2.363 21.935-9.086 0-7.093-3.747-12.845-13.023-12.848z"></path></svg>`,
  explosion: `<svg viewBox="0 0 335.883 335.883" version="1.1" xmlns="http://www.w3.org/2000/svg" class="icon"><g><g><path style="fill:currentColor;" d="M44.469,321.391l-0.044-0.076c6.005,2.377,12.499,3.775,19.347,3.775 c27.135,0,49.479-20.396,52.617-46.689c-6.783,2.6-14.114,4.085-21.794,4.085c-9.007,0-17.541-2.007-25.248-5.521l-1.49,11.863 H30.686l7.859,22.703l-15.969-26.543l36.812-5.118l-0.114-8.692c-15.626-11.096-25.874-29.3-25.874-49.882 c0-2.317,0.158-4.601,0.408-6.853c-22.387,8.702-36.746,31.851-33.298,56.68C3.453,292.248,25.323,315.555,44.469,321.391z"></path><path style="fill:currentColor;" d="M195.892,10.793l-92.203,128.906L88.291,55.453L67.612,149.87l-22.425-27.892v63.365v16.79v1.033 c0,2.915,0.033,5.624,0.092,8.213c0.435,17.465,2.861,28.256,13.772,42.419c2.518,3.269,5.45,6.701,8.953,10.459 c0.794,0.848,1.675,1.637,2.638,2.382c5.586,4.319,14.103,6.772,26.031,7.582c2.948,0.201,6.037,0.337,9.42,0.337 c3.421,0,6.967-0.109,10.595-0.299c3.127-0.163,6.304-0.392,9.518-0.674c35.387-3.106,74.227-12.613,76.174-13.092l37.579-9.274 l-73.563-12.891l107.166-38.106H166.543l169.34-179.407L152.831,146.721L195.892,10.793z M149.513,194.492l-5.988,6.347 l-6.26,6.636l-8.556,9.067h10.503h8.18h8.159h23.426l-23.361,8.305l-8.425,2.997l-8.79,3.127l-30.992,11.02l-4.83,1.719 l6.679,1.169l20.924,3.666l8.915,1.561l8.594,1.507l8.8,1.545c-3.492,0.582-7.114,1.131-10.748,1.664 c-3.769,0.549-7.549,1.033-11.362,1.479c-4.558,0.538-9.067,0.979-13.505,1.305c-2.04,0.152-4.003,0.25-5.983,0.348 c-2.981,0.141-5.978,0.299-8.779,0.299c-19.842,0-25.041-3.922-26.162-5.118c-2.567-2.752-4.737-5.232-6.641-7.566 c-11.215-13.777-11.786-21.914-11.786-42.387v-12.075V179.91v-9.992v-1.599l0.854,1.066l5.14,6.385l5.162,6.418l3.595,4.471 l1.518-6.935l2.045-9.333l1.953-8.909l5.075-23.181l4.019,21.99l1.479,8.082l1.479,8.082l0.74,4.052l2.823-3.949l5.434-7.598 l5.232-7.321l41.163-57.551l-20.957,66.161l-2.578,8.142l-2.611,8.251l-0.163,0.446l0.364-0.25l6.913-4.754l6.875-4.727 l81.548-56.088L149.513,194.492z"></path><path style="fill:currentColor;" d="M253.454,292.879l-116.864-5.635l114.248,15.741C268.248,299.096,253.454,292.879,253.454,292.879z "></path><path style="fill:currentColor;" d="M52.143,61.839l9.317,63.327c0,0-2.366-71.943-1.36-80.052 C61.107,37.01,48.14,34.595,52.143,61.839z"></path><path style="fill:currentColor;" d="M238.877,38.048l-59.672,70.827c0,0,75.897-71.067,85.709-77.615 C274.72,24.706,264.544,7.573,238.877,38.048z"></path></g></g></svg>`,
  rocket: `<svg viewBox="0 0 20 20" fill="currentColor" class="icon"><path d="M10.25 2.5a.75.75 0 00-1.5 0v1.313A7.003 7.003 0 003.813 10H2.5a.75.75 0 000 1.5h1.313A7.003 7.003 0 0010 17.188V18.5a.75.75 0 001.5 0v-1.313A7.003 7.003 0 0016.188 10H17.5a.75.75 0 000-1.5h-1.313A7.003 7.003 0 0010 3.812V2.5zM6.066 7.45a.75.75 0 011.032-.273l2.034 1.22a.75.75 0 010 1.206l-2.034 1.22a.75.75 0 11-.76-1.26l1.046-.63-1.046-.63a.75.75 0 01-.273-1.033zm7.868 0a.75.75 0 01.273 1.034l-1.046.63 1.046.63a.75.75 0 11-.76-1.26l-2.034-1.22a.75.75 0 010-1.206l2.034-1.22a.75.75 0 011.032.273z" /></svg>`,
  expand: `<svg xmlns="http://www.w3.org/2000/svg" class="expand-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>`,
};

const ICON_OVERRIDES = {
  // 戰爭事件
  event_1947_civil_war: 'war',
  event_1948_war_begins: 'war',
  event_1967_six_day_war: 'war',
  event_1970_black_september: 'war',
  event_1973_yom_kippur_war: 'war',
  event_1982_lebanon_war1: 'war',

  // 達成協議的和平進程事件
  event_1978_camp_david: 'handshake',
  event_1979_egypt_israel_peace: 'handshake',
  event_1993_oslo1: 'handshake',
  event_1994_jordan_treaty: 'handshake',
  event_1995_oslo2: 'handshake',
  event_2020_abraham_accords: 'handshake',

  // 大起義事件
  event_1987_intifada1: 'explosion',
  event_2000_intifada2: 'explosion',

  // 為哈瑪斯奪權事件新增規則
  event_2007_hamas_takeover: 'hamas_cs_icon',

  // 為以色列撤離事件新增規則
  event_2005_disengagement: 'disengagement_bus',

  // 為屯墾區事件新增規則
  event_1967_settlements: 'settlement_house',
};

// 為六個時期的背景年份，分別設定手機和電腦的 top 值
const YEAR_OVERLAY_TOP_POSITIONS = {
  // 時期的 ID: {
  //     zh: { mobile: '中文手機高度', desktop: '中文電腦高度' },
  //     en: { mobile: '英文手機高度', desktop: '英文電腦高度' }
  // }
  mandate_early_conflicts: {
    zh: { mobile: '35.5rem', desktop: '38.5rem' },
    en: { mobile: '43.5rem', desktop: '44.75rem' }, // 英文版內容較長，可以讓年份靠上一點
  },
  early_statehood_fedayeen: {
    zh: { mobile: '53.5rem', desktop: '52rem' },
    en: { mobile: '63.5rem', desktop: '60.5rem' },
  },
  plo_intl_terrorism_hijackings: {
    zh: { mobile: '89.5rem', desktop: '84.25rem' },
    en: { mobile: '103rem', desktop: '88.25rem' },
  },
  first_intifada_oslo: {
    zh: { mobile: '84rem', desktop: '77rem' },
    en: { mobile: '98rem', desktop: '87.75rem' },
  },
  second_intifada_gaza_disengagement: {
    zh: { mobile: '125.5rem', desktop: '115.5rem' },
    en: { mobile: '150rem', desktop: '129rem' },
  },
  gaza_wars_modern_conflict: {
    zh: { mobile: '68rem', desktop: '67.6rem' },
    en: { mobile: '80rem', desktop: '74.25rem' },
  },
};

const periods = [
  {
    id: 'mandate_early_conflicts',
    name: {
      zh: '託管初期 (1920s-1947)',
      en: 'The British Mandate & Early Conflicts (1920s-1947)',
    },
    shortName: {
      zh: '託管初期',
      en: 'Mandate Era',
    },
    shortcut: '1',
    representativeYear: '1920s',
    startYear: 1920,
    endYear: 1947,
    periodInfo: {
      zh: '英屬巴勒斯坦託管地初期，猶太人與阿拉伯人之間的社群衝突加劇，為未來的更大規模衝突埋下伏筆。重要事件包括內比穆薩騷亂和希伯倫大屠殺。',
      en: 'During the early British Mandate for Palestine, escalating communal conflicts between Jews and Arabs set the stage for future large-scale confrontations. Key events include the Nebi Musa riots and the Hebron massacre.',
    },
    showRocketStatsButton: false,
    goldenSentence: {
      zh: '攻擊的目標，從新來的移民，擴散到世居的鄰人。',
      en: 'The targets of attack expanded from new immigrants to long-established neighbors.',
    },
    summary: {
      zh: '在英國託管下，猶太復國主義者持續的移民及土地收購，引發了阿拉伯社群強烈的政治反彈。然而，隨之而來的暴力事件，其攻擊目標不僅限於復國主義的政治實體，<strong>也頻繁地針對那些早已在當地世居數個世紀的猶太社群。</strong>這種針對族群身份的無差別攻擊，使得這場衝突的性質，超出了單純的政治與土地糾紛範疇。',
      en: 'Under the British Mandate, continued Zionist immigration and land acquisition triggered a strong political backlash from the Arab community. However, the ensuing violence frequently targeted not only Zionist political entities but also <strong>Jewish communities that had been living in the region for centuries.</strong> This indiscriminate targeting based on ethnic identity pushed the conflict beyond a simple dispute over politics and land.',
    },
  },
  {
    id: 'early_statehood_fedayeen',
    name: {
      zh: '獨立初期與邊境 (1948-1967)',
      en: 'Early Statehood & The Fedayeen (1948-1967)',
    },
    shortName: {
      zh: '獨立初期與邊境',
      en: 'Early Statehood',
    },
    shortcut: '2',
    representativeYear: '1950s',
    startYear: 1948,
    endYear: 1967,
    periodInfo: {
      zh: '以色列建國後，面臨周邊阿拉伯國家的敵對以及敢死隊（Fedayeen）的頻繁邊境滲透襲擊。此時期衝突塑造了以色列早期的安全觀念。',
      en: "After its establishment, Israel faced hostility from neighboring Arab states and frequent cross-border infiltration attacks by Fedayeen. These conflicts shaped Israel's early security doctrine.",
    },
    showRocketStatsButton: false,
    goldenSentence: {
      zh: '在『巴勒斯坦民族』誕生前，是以『阿拉伯民族』為名的戰爭。',
      en: "Before the 'Palestinian nation' was born, the war was waged in the name of the 'Arab nation'.",
    },
    summary: {
      zh: '1948年的戰爭，並非由一個『巴勒斯坦』實體所發動，而是由周邊阿拉伯國家聯軍以『泛阿拉伯民族主義』為名所發起。戰後，最能體現此一事實的，便是加薩走廊與約旦河西岸的命運：埃及與約旦分別佔領了這兩塊土地，卻皆未在此建立一個獨立的巴勒斯坦國。<strong>約旦甚至直接兼併了約旦河西岸，並向當地阿拉伯居民授予公民身份，將其視為哈希米王國的一部分。</strong>此後，『敢死隊』（Fedayeen）從約旦與埃及控制的邊境地區頻繁滲透以色列進行襲擊，而以色列的報復性還擊，也構成了這個時代暴力循環的特徵。',
      en: "The 1948 war was not initiated by a 'Palestinian' entity but by a coalition of Arab states in the name of 'Pan-Arab Nationalism.' This is evidenced by the post-war fate of the Gaza Strip and the West Bank: Egypt and Jordan occupied these territories respectively, but neither established an independent Palestinian state. <strong>Jordan even annexed the West Bank, granting citizenship to its Arab residents and treating it as part of the Hashemite Kingdom.</strong> Subsequently, 'Fedayeen' frequently infiltrated Israel from Jordanian and Egyptian-controlled territories, with Israeli retaliations forming the era's cycle of violence.",
    },
  },
  {
    id: 'plo_intl_terrorism_hijackings',
    name: {
      zh: '國際化攻擊 (1968-1986)',
      en: "A Global Battlefield: The PLO's International Campaign (1968-1986)",
    },
    shortName: {
      zh: '國際化攻擊',
      en: "Int'l Attacks",
    },
    shortcut: '3',
    representativeYear: '1970s',
    startYear: 1968,
    endYear: 1986,
    periodInfo: {
      zh: '巴勒斯坦解放組織（PLO）及其下屬派別將襲擊目標擴展至國際，發生多起針對以色列海外利益及民航的劫機與攻擊事件，如慕尼黑奧運慘案。',
      en: 'The Palestine Liberation Organization (PLO) and its factions expanded their targets internationally, carrying out numerous hijackings and attacks against Israeli interests abroad and civil aviation, such as the Munich Olympics massacre.',
    },
    showRocketStatsButton: false,
    goldenSentence: {
      zh: '國際化的攻擊，讓「巴勒斯坦」的形象從此與「恐怖主義」牢牢地綁定在一起。',
      en: "International attacks inextricably linked the image of 'Palestine' with 'terrorism'.",
    },
    summary: {
      zh: '在軍事上無法與以色列抗衡，巴勒斯坦解放組織（PLO）及其下屬激進派別開闢了國際戰場。他們透過劫機、奧運屠殺等一系列針對全球範圍內平民的攻擊，成功地將巴勒斯坦議題強制推向國際舞台的中心。然而，這種策略的直接後果是，<strong>『巴勒斯坦』的形象在許多西方國家中與『恐怖主義』牢牢地綁定在一起，這不僅損害了其政治事業的合法性，也為以色列採取強硬的安全措施，提供了廣泛的國際輿論支持。</strong>',
      en: "Unable to match Israel militarily, the PLO and its radical factions opened an international front. Through a series of attacks on civilians worldwide, including hijackings and the Munich massacre, they successfully forced the Palestinian issue onto the world stage. However, the direct consequence was that <strong>the image of 'Palestine' became inextricably linked with 'terrorism' in many Western countries, which not only damaged the legitimacy of their political cause but also provided broad international public support for Israel's hardline security measures.</strong>",
    },
  },
  {
    id: 'first_intifada_oslo',
    name: {
      zh: '第一次起義與奧斯陸 (1987-1999)',
      en: 'First Intifada & Oslo Accords (1987-1999)',
    },
    shortName: {
      zh: '第一次起義與奧斯陸',
      en: '1st Intifada/Oslo',
    },
    shortcut: '4',
    representativeYear: '1990s',
    startYear: 1987,
    endYear: 1999,
    periodInfo: {
      zh: '巴勒斯坦第一次大起義（Intifada）爆發，對以色列佔領進行大規模抗議與暴力抵抗。隨後，奧斯陸協議的簽署開啟了和平進程，但進程屢遭極端暴力事件挑戰。',
      en: 'The First Palestinian Intifada erupted, featuring widespread protests and violent resistance against the Israeli occupation. Subsequently, the signing of the Oslo Accords initiated a peace process, which was repeatedly challenged by extremist violence.',
    },
    showRocketStatsButton: false,
    goldenSentence: {
      zh: '針對平民的自殺炸彈攻擊，不僅重創以色列和平派，更徹底改變了其國內政治版圖。',
      en: 'Suicide bombings against civilians not only crippled the Israeli peace camp but also fundamentally altered its domestic political landscape.',
    },
    summary: {
      zh: '《奧斯陸協議》開啟了和平的希望，但進程很快就被雙方極端主義所侵蝕。極右翼分子刺殺拉賓總理重創了以色列的和平陣營；與此同時，哈瑪斯等組織發動的大規模自殺炸彈攻擊，對以色列社會造成了深遠的衝擊。<strong>這些針對平民的攻擊，不僅重創了以色列國內倡導和平的左翼政治力量，更直接導致了民眾安全感崩潰、整體民意向右轉，最終幫助了主張強硬路線的右派贏得選舉。</strong>',
      en: "The Oslo Accords brought hope for peace, but the process was soon eroded by extremism on both sides. The assassination of Prime Minister Rabin by a right-wing extremist dealt a severe blow to the Israeli peace camp. Concurrently, large-scale suicide bombings by Hamas and other groups had a profound impact on Israeli society. <strong>These attacks on civilians not only devastated Israel's pro-peace left-wing political forces but also led to a collapse in public security perception, shifting public opinion to the right and ultimately helping hardline right-wing parties win elections.</strong>",
    },
  },
  {
    id: 'second_intifada_gaza_disengagement',
    name: {
      zh: '第二次起義與加薩 (2000-2008)',
      en: 'Second Intifada & Gaza Pullout (2000-2008)',
    },
    shortName: {
      zh: '第二次起義與加薩',
      en: '2nd Intifada/Gaza',
    },
    shortcut: '5',
    representativeYear: '2000s',
    startYear: 2000,
    endYear: 2008,
    periodInfo: {
      zh: '第二次巴勒斯坦大起義（阿克薩起義）爆發，其特點是更激烈的暴力衝突和自殺式炸彈襲擊。此時期亦見證以色列自加薩走廊單方面撤離。',
      en: "The Second Intifada (Al-Aqsa Intifada) erupted, characterized by more intense violent conflict and suicide bombings. This period also saw Israel's unilateral disengagement from the Gaza Strip.",
    },
    showRocketStatsButton: true,
    goldenSentence: {
      zh: '以色列的單邊撤離並未換來和平，反而讓加薩轉變為哈瑪斯武力奪權後的火箭基地。',
      en: "Israel's unilateral withdrawal did not bring peace; instead, Gaza was transformed into a rocket base after the Hamas takeover.",
    },
    summary: {
      zh: '2000年和談破裂後，以自殺炸彈為標誌的第二次起義爆發。為應對這波前所未有的攻擊浪潮，以色列於2002年開始建造西岸隔離牆。以色列官方稱其為反恐安全措施，且數據顯示其有效阻擋了攻擊；但因其路徑深入西岸領土，該牆也被巴勒斯坦及國際社會譴責為變相的土地兼併。在這種背景下，以色列於2005年採取了另一種思路——單方面完全撤出加薩。<strong>然而，這片土地並未走向和平，反而在2007年被哈瑪斯武力奪權，並轉變為向以色列發射火箭的基地。這一系列事件，深刻地改變了以色列的國家安全認知。</strong>',
      en: "After peace talks collapsed in 2000, the Second Intifada, marked by suicide bombings, began. To counter this unprecedented wave of attacks, Israel started constructing the West Bank barrier in 2002. Israeli officials call it a security measure, and data shows it effectively stopped attacks. However, because its route cuts deep into West Bank territory, it's condemned by Palestinians and the international community as a de facto land grab. Against this backdrop, Israel adopted a different approach in 2005: a unilateral withdrawal from Gaza. <strong>However, this land did not find peace; instead, it was forcibly taken over by Hamas in 2007 and turned into a base for launching rockets at Israel. This series of events profoundly changed Israel's national security perception.</strong>",
    },
  },
  {
    id: 'gaza_wars_modern_conflict',
    name: {
      zh: '當代衝突 (2009至今)',
      en: 'The Gaza Era: A Cycle of Blockade and War (2009-Present)',
    },
    shortName: {
      zh: '當代衝突',
      en: 'Modern Era',
    },
    shortcut: '6',
    representativeYear: '2010+',
    startYear: 2009,
    endYear: new Date().getFullYear(),
    periodInfo: {
      zh: '哈瑪斯控制加薩後，與以色列爆發多次大規模軍事衝突，火箭彈襲擊成為常態。同時，針對以色列人的零星襲擊事件依然持續。',
      en: 'After Hamas took control of Gaza, multiple large-scale military conflicts with Israel erupted, and rocket attacks became commonplace. Meanwhile, sporadic attacks on Israelis continue.',
    },
    showRocketStatsButton: true,
    goldenSentence: {
      zh: '將軍事設施部署於民用區的策略，引來以色列的周期性反擊，使戰爭陷入無盡的悲劇循環。',
      en: 'The strategy of embedding military assets within civilian areas provokes periodic Israeli counter-attacks, trapping the conflict in an endless cycle of tragedy.',
    },
    summary: {
      zh: '這一時期的衝突，始於2007年哈瑪斯武力奪權後，以色列與埃及隨即對加薩實施全面封鎖。封鎖的官方目的是阻止武器流入，但也嚴格限制了人員與物資的進出，對加薩的經濟與民生造成了嚴重衝擊。在加薩，衝突模式被固化為「火箭彈與戰爭」的循環。<strong>哈瑪斯將軍事設施部署於民用設施的策略，及其從加薩發動的攻擊，引來以色列周期性的軍事反擊。這些反擊在摧毀哈瑪斯設施的同時，也因加薩人口稠密而造成了大量的平民傷亡。</strong>',
      en: "This era of conflict began after Hamas's violent takeover of Gaza in 2007, which prompted Israel and Egypt to impose a comprehensive blockade. The official purpose was to prevent weapons from entering, but it also severely restricted the movement of people and goods, heavily impacting Gaza's economy and daily life. The conflict in Gaza became entrenched in a cycle of 'rockets and wars.' <strong>Hamas's strategy of embedding military assets within civilian infrastructure, and the attacks launched from Gaza, provoked periodic military responses from Israel. While these counter-attacks aimed to destroy Hamas facilities, they also caused significant civilian casualties due to Gaza's dense population.</strong>",
    },
  },
];

// --- 全域變數 ---
let eventsData = [];
let otherEventsDataStore = {};
let rocketLaunchData = [];
let rocketChartInstance = null;
let previouslyFocusedElement = null;
let advanceIntro = null;
let pendingChartRenderInfo = null;
let observer = null; // 用來存放捲動偵測器

// --- 多國語言支援 ---
let currentLang = 'en'; // 預設語言為英文
const translations = {
  // Splash Screen
  splashTitle: { zh: '仇恨的根源', en: 'The Roots of Conflict' },
  splashSubtitle: {
    zh: '巴以百年衝突史',
    en: 'A Century of Israeli-Palestinian Struggle',
  },
  enterButton: { zh: '開始探索', en: 'Begin Exploration' },
  langToggleButton: { zh: '繁體中文', en: 'English' },
  // Hero & Prologue
  heroTitle: {
    zh: '和平為何總是遙不可及？',
    en: 'Why is Peace Always Out of Reach?',
  },
  heroSubtitle: {
    zh: '百年的血與淚，我們究竟錯過了什麼？<br class="sm:hidden">這是一趟關於選擇、暴力與錯失機會的探索之旅。',
    en: 'A century of struggle and sorrow, what have we overlooked?<br class="sm:hidden">This is an exploration of the choices, the violence, and the opportunities that were lost.',
  },
  prologueTitle: { zh: '前言：2023年10月7日', en: 'Prologue: October 7, 2023' },
  prologueText: {
    zh: `哈瑪斯對以色列發動了史無前例的突襲，殺害了約1200人並擄走超過240名人質，引爆了新一輪的加薩戰爭，造成了慘重的人道悲劇。<br><br>這場看似突然的衝突，其實是百年恩怨的最新篇章。<br><strong>但這一切，究竟是如何開始的？</strong>`,
    en: `Hamas launched an unprecedented surprise attack on Israel, killing approximately 1,200 people and taking over 240 hostages. This ignited a new round of war in Gaza, leading to a severe humanitarian tragedy.<br><br>This seemingly sudden conflict is, in fact, the latest chapter in a century of grievances.<br><strong>But how did it all begin?</strong>`,
  },
  startTimelineButton: {
    zh: '回到起點，尋找衝突的根源',
    en: 'Explore the Timeline',
  },
  // Footer
  footerThemeLight: { zh: '淺色模式', en: 'Light Mode' },
  footerThemeDark: { zh: '深色模式', en: 'Dark Mode' },
  footerCopyright: { zh: '衝突的根源', en: 'The Roots of Conflict' },
  footerShortcutHint: {
    zh: '快捷鍵提示：使用 <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>數字鍵</kbd> 跳轉至不同時期。',
    en: 'Shortcut Keys: Use <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>Number</kbd> to jump to different periods.',
  },
  themeBtnLightText: { zh: '主題：淺色', en: 'Theme: Light' },
  themeBtnDarkText: { zh: '主題：深色', en: 'Theme: Dark' },
  // Timeline UI & Modals
  otherEventsModalTitle: { zh: '其他相關事件', en: 'Other Related Events' },
  rocketStatsModalTitle: {
    zh: '加薩火箭攻擊趨勢圖',
    en: 'Gaza Rocket Attack Trend Chart',
  },
  otherEventsButton: { zh: '其他事件', en: 'Other Events' },
  rocketStatsButton: { zh: '火箭攻擊統計', en: 'Rocket Attack Stats' },
  periodInfoTooltipTitle: { zh: '背景', en: 'Background' },
  summaryButtonExpand: { zh: '深入了解', en: 'Learn More' },
  summaryButtonCollapse: { zh: '收合內容', en: 'Show Less' },
  noOtherEvents: {
    zh: '此時期無其他已記錄的相關事件。',
    en: 'No other related events have been recorded for this period.',
  },
  noMainEvents: {
    zh: '此時期無重大衝突或和平進程事件記錄。',
    en: 'No major conflict or peace process events recorded for this period.',
  },
  noMainEventsWithOther: {
    zh: '此時期無重大衝突或和平進程事件記錄，可點擊下方按鈕查看其他相關事件。',
    en: 'No major conflict or peace process events recorded for this period. Click the button below to see other related events.',
  },
  // FAB Menu
  fabLabelSummary: { zh: '時期摘要', en: 'Period Summary' },
  fabLabelPivotal: { zh: '關鍵時刻', en: 'Pivotal Moments' },
  fabLabelPeace: { zh: '和平進程', en: 'Peace Process' },
  fabLabelIsraeli: { zh: '以色列攻擊', en: 'Israeli Attacks' },
  fabLabelPalestinian: { zh: '巴勒斯坦攻擊', en: 'Palestinian Attacks' },
  fabAriaOpen: { zh: '打開過濾選單', en: 'Open filter menu' },
  fabAriaClose: { zh: '關閉過濾選單', en: 'Close filter menu' },
  summaryAriaLabel: {
    zh: '深入了解 {periodName} 時期摘要',
    en: 'Learn more about the {periodName} period summary',
  },
  // Rocket Chart
  chartLegendLabel: {
    zh: '從加薩發射的火箭彈/迫擊砲彈 (約數)',
    en: 'Rockets/Mortars Fired from Gaza (approx.)',
  },
  chartLegendLabelShort: { zh: '火箭彈/迫擊砲', en: 'Rockets/Mortars' },
  chartTableTitle: { zh: '詳細數據表', en: 'Detailed Data' },
  chartTableHeaderYear: { zh: '年份', en: 'Year' },
  chartTableHeaderCount: { zh: '數量 (約數)', en: 'Count (approx.)' },
};

// 檢查儲存的語言偏好
const savedLang = localStorage.getItem('preferredLang');
if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
  currentLang = savedLang;
}

// --- DOM 元素快取 ---
const domElements = {};
function cacheDOMElements() {
  for (const key in ELEMENT_IDS) {
    domElements[key] = document.getElementById(ELEMENT_IDS[key]);
  }
}

// --- 資料處理 ---
function loadAndSortData() {
  try {
    const allData = timelineData; // 直接使用定義好的資料
    eventsData = allData.events || [];
    otherEventsDataStore = allData.otherEvents || {};
    rocketLaunchData = allData.rocketLaunches || [];

    eventsData.sort((a, b) => new Date(a.sortDate) - new Date(b.sortDate));
    for (const periodId in otherEventsDataStore) {
      if (otherEventsDataStore.hasOwnProperty(periodId)) {
        otherEventsDataStore[periodId].sort(
          (a, b) => new Date(a.sortDate) - new Date(b.sortDate)
        );
      }
    }
  } catch (error) {
    console.error('解析資料時發生錯誤:', error);
  }
}
// --- 動畫效果 ---
function createEmbers() {
  if (!domElements.EMBER_CONTAINER) return;
  const isMobile = window.innerWidth <= 768;
  const emberCount = isMobile ? 25 : 50;

  for (let i = 0; i < emberCount; i++) {
    const ember = document.createElement('div');
    ember.className = 'ember';

    const size = Math.random() * 4 + 1;
    ember.style.width = `${size}px`;
    ember.style.height = `${size}px`;
    ember.style.left = `${Math.random() * 100}%`;

    const duration = Math.random() * 15 + 10;
    ember.style.animationDuration = `${duration}s`;
    const delay = Math.random() * 15;
    ember.style.animationDelay = `${delay}s`;

    const drift = (Math.random() - 0.5) * 150;
    ember.style.setProperty('--drift-x', `${drift}px`);

    domElements.EMBER_CONTAINER.appendChild(ember);
  }
}

// --- 啟動畫面與主內容切換 ---
function hideSplashScreenAndShowContent() {
  if (domElements.SPLASH_SCREEN) {
    domElements.SPLASH_SCREEN.classList.add(CSS_CLASSES.HIDDEN);
  }
  if (domElements.MAIN_CONTENT_WRAPPER) {
    domElements.MAIN_CONTENT_WRAPPER.style.display = 'block';
    domElements.MAIN_CONTENT_WRAPPER.classList.remove('initially-hidden');
  }
}

const introClickHandler = () => {
  if (advanceIntro) {
    advanceIntro();
  }
};

async function playIntroSequence() {
  // --- 直接跳過動畫，顯示主選單 ---
  showMainMenu();
  return;
  // --- 以下的動畫程式碼會被完全跳過 ---

  const { SPLASH_INTRO_SEQUENCE, SPLASH_MAIN_MENU, SPLASH_SCREEN } =
    domElements;
  const introLines = SPLASH_INTRO_SEQUENCE
    ? Array.from(SPLASH_INTRO_SEQUENCE.querySelectorAll('.intro-line'))
    : [];
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (
    prefersReducedMotion ||
    !SPLASH_INTRO_SEQUENCE ||
    introLines.length === 0
  ) {
    showMainMenu();
    return;
  }

  SPLASH_SCREEN.addEventListener('click', introClickHandler);
  SPLASH_INTRO_SEQUENCE.style.display = 'flex';
  if (SPLASH_MAIN_MENU) SPLASH_MAIN_MENU.style.display = 'none';

  await new Promise((resolve) => setTimeout(resolve, 200));

  const FADE_DURATION = 1200;
  const HOLD_DURATION = 2800;

  const createSkippableWait = (duration) => {
    return new Promise((resolve) => {
      const timer = setTimeout(resolve, duration);
      advanceIntro = () => {
        clearTimeout(timer);
        resolve();
      };
    });
  };

  const snapAndResetTransition = (element, opacity) => {
    element.style.transition = 'none';
    element.style.opacity = opacity;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        element.style.transition = `opacity ${FADE_DURATION}ms ease-in-out`;
      });
    });
  };

  for (const line of introLines) {
    line.style.opacity = '1';
    await createSkippableWait(FADE_DURATION);
    snapAndResetTransition(line, '1');

    await createSkippableWait(HOLD_DURATION);

    advanceIntro = null;
    line.style.opacity = '0';
    await new Promise((resolve) => setTimeout(resolve, FADE_DURATION));
  }

  advanceIntro = null;
  SPLASH_SCREEN.removeEventListener('click', introClickHandler);
  showMainMenu();
}

function showMainMenu() {
  const {
    SPLASH_MAIN_MENU,
    SPLASH_INTRO_SEQUENCE,
    ENTER_TIMELINE_BUTTON,
    SPLASH_SCREEN,
  } = domElements;
  if (!SPLASH_MAIN_MENU) return;

  if (SPLASH_INTRO_SEQUENCE) SPLASH_INTRO_SEQUENCE.style.display = 'none';
  SPLASH_MAIN_MENU.style.display = 'flex';
  SPLASH_SCREEN.style.cursor = 'default';

  updateUIText(); // 使用新函式來更新文字

  setTimeout(() => {
    SPLASH_MAIN_MENU.style.opacity = '1';
  }, 50);

  if (ENTER_TIMELINE_BUTTON) {
    ENTER_TIMELINE_BUTTON.onclick = hideSplashScreenAndShowContent;
  } else if (SPLASH_SCREEN) {
    SPLASH_SCREEN.onclick = hideSplashScreenAndShowContent;
  }
}

function updateUIText() {
  // 這個函式負責根據 currentLang 的值，更新所有介面上的文字

  // Splash Screen
  document.getElementById('splashTitleText').textContent =
    translations.splashTitle[currentLang];
  document.getElementById('splashSubtitleText').textContent =
    translations.splashSubtitle[currentLang];
  domElements.ENTER_TIMELINE_BUTTON.textContent =
    translations.enterButton[currentLang];

  const langButton = document.getElementById('langToggleButton');
  if (langButton) {
    const nextLang = currentLang === 'zh' ? 'en' : 'zh';
    langButton.textContent = translations.langToggleButton[nextLang];
  }

  // Hero and Prologue
  document.getElementById('heroTitle').innerHTML =
    translations.heroTitle[currentLang];
  document.getElementById('heroSubtitle').innerHTML =
    translations.heroSubtitle[currentLang];
  document.getElementById('prologueTitle').innerHTML =
    translations.prologueTitle[currentLang];
  document.getElementById('prologueText').innerHTML =
    translations.prologueText[currentLang];
  const startTimelineBtnText = document.getElementById(
    'startTimelineButtonText'
  );
  if (startTimelineBtnText) {
    startTimelineBtnText.innerHTML =
      translations.startTimelineButton[currentLang];
  }

  // Footer
  document.getElementById('copyrightText').innerHTML =
    translations.footerCopyright[currentLang];
  // document.getElementById('shortcutHint').innerHTML = translations.footerShortcutHint[currentLang];

  // FAB Menu
  document.getElementById('fabLabelSummary').textContent =
    translations.fabLabelSummary[currentLang];
  document.getElementById('fabLabelPivotal').textContent =
    translations.fabLabelPivotal[currentLang];
  document.getElementById('fabLabelPeace').textContent =
    translations.fabLabelPeace[currentLang];
  document.getElementById('fabLabelIsraeli').textContent =
    translations.fabLabelIsraeli[currentLang];
  document.getElementById('fabLabelPalestinian').textContent =
    translations.fabLabelPalestinian[currentLang];

  // 更新頁尾的語言切換按鈕文字
  const footerLangButton = document.getElementById('footerLangToggleButton');
  if (footerLangButton) {
    // 按鈕上顯示的是「可以切換過去的那個語言」
    const nextLangText = currentLang === 'zh' ? 'English' : '繁體中文';
    footerLangButton.textContent = nextLangText;
  }

  updateThemeButtonsUI();
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('preferredLang', lang); // 將偏好儲存起來

  if (lang === 'zh') {
    document.documentElement.lang = 'zh-Hant';
    document.documentElement.classList.add('lang-zh');
    document.documentElement.classList.remove('lang-en');
  } else {
    document.documentElement.lang = 'en';
    document.documentElement.classList.add('lang-en');
    document.documentElement.classList.remove('lang-zh');
  }

  // 重新渲染所有UI和內容
  updateUIText();
  domElements.PERIOD_NAV.innerHTML = '';
  createPeriodNavigation();
  renderContentBody();

  // 重建內容後，必須重新初始化 Tooltip 和捲動偵測器
  initializeTooltips();
  setupIntersectionObserver();

  setupTimelineEntryAnimations();

  // 設定一個初始的 active 按鈕，避免畫面一片空白
  const firstSection = document.querySelector('.period-section');
  if (firstSection) {
    setActiveNavButton(firstSection.id);
  }
}

// --- 內容渲染 ---
function getIconSVG(event) {
  const {
    id,
    iconType,
    isPeace,
    isPivotal,
    actor,
    isMajorConflict,
    isMilitary,
  } = event;

  // 新邏輯：優先檢查這個事件是否在「覆蓋清單」中
  const overrideIcon = ICON_OVERRIDES[id];
  let effectiveIconType = overrideIcon || iconType;

  // 如果沒有被覆蓋，且是和平或關鍵時刻，則使用預設圖示
  if (!overrideIcon) {
    if (isPeace) effectiveIconType = 'peace';
    if (isPivotal) effectiveIconType = 'pivotal';
  }

  let svgHTML = icons[effectiveIconType] || icons.conflict;
  svgHTML = svgHTML.replace(
    '<svg',
    '<svg aria-hidden="true" focusable="false"'
  );

  // 修正後的顏色判斷邏輯
  let colorClass = '';
  if (isPeace) {
    colorClass = 'text-[var(--peace-accent-color)]';
  } else if (isPivotal) {
    // 所有關鍵時刻（包括戰爭）都繼承關鍵時刻的顏色
    colorClass = 'text-[var(--pivotal-accent-color)]';
  } else if (actor === 'israel') {
    colorClass = isMilitary
      ? 'text-[var(--israel-military-accent-color)]'
      : 'text-[var(--israel-nonmilitary-accent-color)]';
  } else {
    // 預設使用巴勒斯坦攻擊的顏色
    colorClass = isMajorConflict
      ? 'text-[var(--palestinian-major-accent-color)]'
      : 'text-[var(--palestinian-minor-accent-color)]';
  }

  return svgHTML.replace('class="icon"', `class="icon ${colorClass}"`);
}

function createPeriodNavigation() {
  const { PERIOD_NAV } = domElements;
  if (!PERIOD_NAV) return;

  periods.forEach((period) => {
    const button = document.createElement('button');
    button.textContent = period.shortName[currentLang]; // 使用翻譯
    button.setAttribute('data-shortcut', period.shortcut);
    button.setAttribute('data-full-name', period.name[currentLang]); // 使用翻譯
    button.setAttribute('data-period-id', period.id);
    button.onclick = () => {
      const sectionElement = document.getElementById(period.id);
      if (sectionElement) {
        const navHeight = PERIOD_NAV.offsetHeight;
        const periodHeaderElement = sectionElement.querySelector(
          '.timeline-period-header'
        );
        let elementToScrollTo = periodHeaderElement || sectionElement;
        const elementPosition =
          elementToScrollTo.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navHeight - 20;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    };
    PERIOD_NAV.appendChild(button);
  });
}

function setActiveNavButton(activePeriodId) {
  const { PERIOD_NAV } = domElements;
  if (!PERIOD_NAV) return;
  document
    .querySelectorAll(`#${ELEMENT_IDS.PERIOD_NAV} button`)
    .forEach((btn) => {
      if (btn.getAttribute('data-period-id') === activePeriodId) {
        btn.classList.add(CSS_CLASSES.ACTIVE);
        // 新增：告訴螢幕報讀器這是「當前」項目
        btn.setAttribute('aria-current', 'true');
        if (PERIOD_NAV.scrollWidth > PERIOD_NAV.clientWidth) {
          const navRect = PERIOD_NAV.getBoundingClientRect();
          const btnRect = btn.getBoundingClientRect();
          if (btnRect.left < navRect.left || btnRect.right > navRect.right) {
            btn.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center',
            });
          }
        }
      } else {
        btn.classList.remove(CSS_CLASSES.ACTIVE);
        // 新增：移除其他按鈕的「當前」狀態
        btn.removeAttribute('aria-current');
      }
    });
}

function renderContentBody() {
  const { CONTENT_BODY } = domElements;
  if (!CONTENT_BODY) return;
  CONTENT_BODY.innerHTML = '';

  periods.forEach((period) => {
    const periodSection = document.createElement('section');
    periodSection.className = 'period-section';
    periodSection.id = period.id;

    const detailsText =
      period.periodInfo[currentLang] ||
      'Details for this period are being compiled.';
    const escapedDetails = detailsText
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const tooltipTitle = `${period.name[currentLang]} ${translations.periodInfoTooltipTitle[currentLang]}`;
    const tooltipContent = `<h4>${tooltipTitle}</h4><p>${escapedDetails}</p>`;

    let sectionHTML = `
                    <div class="timeline-wrapper" style="position: relative;">
				        <div class="period-year-overlay" role="status" aria-live="polite">${period.representativeYear}</div>
				        <div class="timeline">
                            <div class="timeline-interruption timeline-period-header">
                                <h2>${period.name[currentLang]}</h2>
                                <div style="margin-top: 0.5rem;">
                                    <button class="period-info-button ${CSS_CLASSES.HAS_TOOLTIP}" data-details="${tooltipContent}" aria-label="Learn background of ${period.name[currentLang]}">
                                        ${icons.info}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
    periodSection.innerHTML = sectionHTML;

    const timeline = periodSection.querySelector('.timeline');

    const eventsInThisPeriod = eventsData.filter(
      (e) => e.periodId === period.id
    );
    let eventCounter = 0;
    eventsInThisPeriod.forEach((event) => {
      const entryDiv = document.createElement('div');
      let mainBlockClass = '';
      const hasDetails = event.details ? true : false;

      // *** 讀取翻譯後的事件內容 ***
      const eventName =
        event.eventName && event.eventName[currentLang]
          ? event.eventName[currentLang]
          : event.eventName || '';
      const briefDescription =
        event.briefDescription && event.briefDescription[currentLang]
          ? event.briefDescription[currentLang]
          : event.briefDescription || '';

      let mainContent = `
                        <div class="event-year-display">${getIconSVG(event)} ${event.year}</div>
                        <h3 class="event-name-display">${eventName}</h3>
                        <p class="event-brief-display">${briefDescription}</p>
                    `;

      if (event.isPeace) {
        entryDiv.className =
          'timeline-interruption timeline-peace-interruption';
        entryDiv.setAttribute('data-highlight-type', 'peace-event');
        mainBlockClass = 'peace-text-block';
      } else if (event.isPivotal) {
        entryDiv.className =
          'timeline-interruption timeline-pivotal-interruption';
        entryDiv.setAttribute('data-highlight-type', 'pivotal-event');
        mainBlockClass = 'pivotal-text-block';
      } else {
        entryDiv.className = 'timeline-entry timeline-event';
        entryDiv.classList.add(`actor-${event.actor}`);
        if (event.actor === 'israel') {
          entryDiv.classList.add(
            event.isMilitary ? 'is-military' : 'is-nonmilitary'
          );
          entryDiv.setAttribute('data-highlight-type', 'israeli-attack');
        } else {
          entryDiv.classList.add(
            event.isMajorConflict ? 'is-major-conflict' : 'is-minor-conflict'
          );
          entryDiv.setAttribute('data-highlight-type', 'palestinian-attack');
        }
      }

      if (mainBlockClass) {
        // 在這裡移除了外層的 .timeline-interruption div
        // 直接將 class 加到 entryDiv 上，並將內容放入
        entryDiv.innerHTML = mainContent;
        // 把 tooltip 和 data-event-id 移到 entryDiv 上
        if (hasDetails) {
          entryDiv.classList.add(CSS_CLASSES.HAS_TOOLTIP);
        }
        entryDiv.setAttribute('data-event-id', event.id);

        // 將原本在 mainContent 裡的 class 也移到 entryDiv 上
        entryDiv.classList.add(mainBlockClass);
      } else {
        entryDiv.innerHTML = `
                            <div class="timeline-event-content ${eventCounter % 2 === 0 ? 'event-left' : 'event-right'} ${hasDetails ? CSS_CLASSES.HAS_TOOLTIP : ''}" data-event-id="${event.id}">
                                ${mainContent}
                            </div>
                            <div class="timeline-dot"></div>
                        `;
        eventCounter++;
      }
      timeline.appendChild(entryDiv);
    });

    const periodActionsDiv = document.createElement('div');
    periodActionsDiv.className = 'period-actions-container';

    if (
      otherEventsDataStore[period.id] &&
      otherEventsDataStore[period.id].length > 0
    ) {
      const otherEventsButton = document.createElement('button');
      otherEventsButton.className = 'period-other-events-button';
      otherEventsButton.innerHTML = `${translations.otherEventsButton[currentLang]} <svg xmlns="http://www.w3.org/2000/svg" style="width:1rem; height:1rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`;
      otherEventsButton.onclick = () =>
        openOtherEventsModal(period.id, period.name[currentLang]);
      periodActionsDiv.appendChild(otherEventsButton);
    }

    let hasRocketDataForPeriod =
      period.showRocketStatsButton &&
      rocketLaunchData.some(
        (d) => d.year >= period.startYear && d.year <= period.endYear
      );
    if (hasRocketDataForPeriod) {
      const rocketButton = document.createElement('button');
      rocketButton.className = 'rocket-stats-button';
      rocketButton.innerHTML = `${translations.rocketStatsButton[currentLang]} <svg xmlns="http://www.w3.org/2000/svg" style="width:1rem; height:1rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`;
      rocketButton.onclick = () => openRocketStatsModal(period);

      periodActionsDiv.appendChild(rocketButton);
    }

    if (periodActionsDiv.hasChildNodes()) {
      timeline.insertAdjacentElement('afterend', periodActionsDiv);
    }

    if (eventsInThisPeriod.length === 0) {
      let message =
        otherEventsDataStore[period.id] &&
        otherEventsDataStore[period.id].length > 0
          ? translations.noMainEventsWithOther[currentLang]
          : translations.noMainEvents[currentLang];
      timeline.insertAdjacentHTML(
        'beforeend',
        `
                        <div class="timeline-interruption" style="padding: 0.5em 0;">
                            <p class="timeline-message text-sm">${message}</p>
                        </div>
                    `
      );
    }

    if (period.summary && period.goldenSentence) {
      const summaryContainer = document.createElement('div');
      summaryContainer.className = 'period-summary';
      summaryContainer.setAttribute('data-highlight-type', 'summary');
      const summaryId = `summary-content-${period.id}`;

      summaryContainer.innerHTML = `
                        <p class="golden-sentence">${period.goldenSentence[currentLang]}</p>
                        <div class="full-summary-content" id="${summaryId}">
                            <p>${period.summary[currentLang]}</p>
                        </div>
                        <button class="expand-summary-button" aria-expanded="false" aria-controls="${summaryId}" aria-label="${translations.summaryAriaLabel[currentLang].replace('{periodName}', period.name[currentLang])}">
						    <span>${translations.summaryButtonExpand[currentLang]}</span>
						    ${icons.expand}
						</button>
                    `;

      periodSection.appendChild(summaryContainer);
    }

    CONTENT_BODY.appendChild(periodSection);
  });
  initializeTooltips();
}

// --- Modal 管理 ---
function trapFocus(modalElement) {
  if (!modalElement) return;
  const focusableElements = modalElement.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) {
    const modalContent = modalElement.querySelector('.modal-content');
    if (modalContent) {
      modalContent.focus();
    }
    return;
  }

  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  modalElement.addEventListener('keydown', function (e) {
    const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
    if (!isTabPressed) return;
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  });
  if (firstFocusableElement) firstFocusableElement.focus();
}

function performModalClose(modalElement) {
  if (!modalElement || modalElement.style.display !== 'flex') return;

  document.body.classList.remove(CSS_CLASSES.MODAL_IS_OPEN);
  modalElement.style.display = 'none';

  if (window.location.hash) {
    const newUrl = window.location.href.split('#')[0];
    history.replaceState(null, null, newUrl);
  }

  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
    previouslyFocusedElement = null;
  }

  if (modalElement === domElements.ROCKET_STATS_MODAL) {
    if (rocketChartInstance) {
      rocketChartInstance.destroy();
      rocketChartInstance = null;
    }
    pendingChartRenderInfo = null;
  }
}

function openGenericModal(
  modalElement,
  titleElement,
  titleText,
  bodyContentElement,
  bodyContentHTML
) {
  if (!modalElement || modalElement.style.display === 'flex') return;

  previouslyFocusedElement = document.activeElement;
  document.body.classList.add(CSS_CLASSES.MODAL_IS_OPEN);

  if (titleElement && titleText) titleElement.textContent = titleText;
  if (bodyContentElement) bodyContentElement.innerHTML = bodyContentHTML;

  modalElement.style.display = 'flex';
  modalElement.style.alignItems = 'center';
  modalElement.style.justifyContent = 'center';

  const modalHash = `#${modalElement.id}`;
  if (window.location.hash !== modalHash) {
    history.pushState({ modalId: modalElement.id }, '', modalHash);
  }

  requestAnimationFrame(() => {
    const contentToFocus = modalElement.querySelector('.modal-content');
    if (contentToFocus) {
      contentToFocus.focus();
    }
    trapFocus(modalElement);
  });
}

function openOtherEventsModal(periodId, periodFullName) {
  const eventsToList = otherEventsDataStore[periodId] || [];
  let listHTML = '';
  if (eventsToList.length === 0) {
    listHTML = `<li class="${CSS_CLASSES.MODAL_TIMELINE_ENTRY_NO_EVENTS}"><p>${translations.noOtherEvents[currentLang]}</p></li>`;
  } else {
    eventsToList.forEach((event) => {
      // *** 讀取翻譯後的事件內容 ***
      const eventName =
        event.eventName && event.eventName[currentLang]
          ? event.eventName[currentLang]
          : event.eventName || '';
      const briefDescription =
        event.briefDescription && event.briefDescription[currentLang]
          ? event.briefDescription[currentLang]
          : event.briefDescription || '';

      let itemClass = 'modal-timeline-entry';
      itemClass += ` actor-${event.actor}`;
      if (event.actor === 'israel') {
        itemClass += event.isMilitary ? ' is-military' : ' is-nonmilitary';
      } else {
        itemClass += event.isMajorConflict
          ? ' is-major-conflict'
          : ' is-minor-conflict';
      }
      listHTML += `
                        <li class="${itemClass}">
                            <div class="timeline-dot"></div>
                            <div>
                                <div class="event-year-display">${event.year}</div>
                                <h4 class="event-name-display">
                                    ${getIconSVG(event)}
                                    ${eventName}
                                </h4>
                                <p class="event-brief-display">${briefDescription}</p>
                            </div>
                        </li>`;
    });
  }
  const modalTitle = `${periodFullName} - ${translations.otherEventsModalTitle[currentLang]}`;
  openGenericModal(
    domElements.OTHER_EVENTS_MODAL,
    domElements.OTHER_EVENTS_MODAL_TITLE_TEXT,
    modalTitle,
    domElements.OTHER_EVENTS_MODAL_LIST,
    listHTML
  );
}

function openRocketStatsModal(period) {
  const modalTitle = translations.rocketStatsModalTitle[currentLang]; // 使用翻譯
  let bodyContentHTML = '';

  if (window.chartJsError) {
    bodyContentHTML =
      '<p class="text-center text-[var(--text-secondary)] py-8">圖表資料庫載入失敗，無法顯示統計圖。請檢查您的網路連線並刷新頁面。</p>';
  } else if (!window.chartJsLoaded) {
    bodyContentHTML =
      '<div class="loading-indicator">圖表統計資料讀取中...</div>';
    pendingChartRenderInfo = { period: period };
  } else {
    bodyContentHTML = generateChartModalContent(period);
  }

  openGenericModal(
    domElements.ROCKET_STATS_MODAL,
    domElements.ROCKET_STATS_MODAL_TITLE_TEXT,
    modalTitle,
    domElements.ROCKET_STATS_MODAL_BODY_CONTENT,
    bodyContentHTML
  );

  if (window.chartJsLoaded && !window.chartJsError) {
    const canvas = document.getElementById('rocketLaunchLineChart');
    const tableBody = document.getElementById('rocketDataTableBodyInModal');

    const filteredData = rocketLaunchData.filter(
      (d) => d.year >= period.startYear && d.year <= period.endYear
    );

    if (canvas) {
      renderRocketChart(canvas, filteredData);
    }
    if (tableBody) {
      populateRocketTable(tableBody, filteredData);
    }
  }
}

function generateChartModalContent(period) {
  const filteredRocketData = rocketLaunchData.filter((data) => {
    const eventYear = parseInt(data.year);
    return (
      !isNaN(eventYear) &&
      eventYear >= period.startYear &&
      eventYear <= period.endYear
    );
  });

  if (filteredRocketData.length === 0) {
    return '<p class="text-center text-[var(--text-secondary)] py-8">此時期無火箭攻擊統計數據。</p>';
  }

  return `<div class="rocket-chart-canvas-container"><canvas id="rocketLaunchLineChart"></canvas></div>
                    <div class="rocket-chart-data-table-container" style="margin-top: 20px;">
                        <h4 class="text-center text-sm font-semibold mb-2" style="color: var(--text-secondary);">${translations.chartTableTitle[currentLang]}</h4>
                        <table class="w-full text-sm text-left" style="border-collapse: collapse; color: var(--text-secondary);">
                            <caption class="sr-only">Gaza Rocket Attack Data (Table)</caption>
                            <thead style="border-bottom: 1px solid var(--timeline-line);">
                                <tr>
                                    <th scope="col" class="px-2 py-1 font-medium" style="color: var(--text-primary);">${translations.chartTableHeaderYear[currentLang]}</th>
                                    <th scope="col" class="px-2 py-1 font-medium text-right" style="color: var(--text-primary);">${translations.chartTableHeaderCount[currentLang]}</th>
                                </tr>
                            </thead>
                            <tbody id="rocketDataTableBodyInModal"></tbody>
                        </table>
                    </div>`;
}

function renderRocketChart(canvas, filteredRocketData) {
  if (rocketChartInstance) {
    rocketChartInstance.destroy();
  }
  const labels = filteredRocketData.map((data) => String(data.year));
  const dataPoints = filteredRocketData.map((data) => data.numericCount);
  const isDarkMode = document.documentElement.classList.contains(
    CSS_CLASSES.DARK_MODE
  );
  const gridColor = getComputedStyle(document.documentElement)
    .getPropertyValue(
      isDarkMode ? '--chart-grid-color-dark' : '--chart-grid-color-light'
    )
    .trim();
  const tickColor = getComputedStyle(document.documentElement)
    .getPropertyValue(
      isDarkMode ? '--chart-tick-color-dark' : '--chart-tick-color-light'
    )
    .trim();
  const legendColor = getComputedStyle(document.documentElement)
    .getPropertyValue(
      isDarkMode ? '--chart-legend-color-dark' : '--chart-legend-color-light'
    )
    .trim();

  rocketChartInstance = new Chart(canvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: translations.chartLegendLabel[currentLang],
          data: dataPoints,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          borderWidth: 2.5,
          pointBackgroundColor: '#facc15',
          pointBorderColor: isDarkMode ? '#121212' : '#f4f4f5',
          pointRadius: 4,
          pointHoverRadius: 7,
          tension: 0.1,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            color: tickColor,
            font: { family: "'Noto Sans TC', sans-serif", weight: '500' },
          },
          grid: { color: gridColor },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: tickColor,
            font: { family: "'Noto Sans TC', sans-serif" },
          },
          grid: { color: gridColor },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: legendColor,
            font: {
              family: "'Noto Sans TC', sans-serif",
              size: 12,
              weight: '500',
            }, // 字體稍微縮小
            boxWidth: 20, // 調整色塊寬度
            padding: 20, // 增加標籤間距
          },
        },
        tooltip: {
          backgroundColor: isDarkMode
            ? 'rgba(18,18,18,0.9)'
            : 'rgba(244,245,245,0.9)',
          titleColor: isDarkMode ? '#e4e4e7' : '#27272a',
          bodyColor: isDarkMode ? '#e4e4e7' : '#27272a',
          titleFont: {
            family: "'Noto Sans TC', sans-serif",
            size: 14,
            weight: '700',
          },
          bodyFont: { family: "'Noto Sans TC', sans-serif", size: 12 },
          displayColors: false,
          padding: 10,
          cornerRadius: 5,
          borderColor: isDarkMode
            ? 'rgba(228, 228, 231, 0.2)'
            : 'rgba(39, 39, 42, 0.2)',
          borderWidth: 1,
          callbacks: {
            label: function (context) {
              // 在所有裝置上都使用新增的短標籤翻譯
              return `${translations.chartLegendLabelShort[currentLang]}: ${context.parsed.y.toLocaleString('en-US')}`;
            },
          },
        },
      },
    },
  });
}

function populateRocketTable(tableBody, filteredRocketData) {
  tableBody.innerHTML = '';
  filteredRocketData.forEach((data) => {
    const row = tableBody.insertRow();
    row.insertCell().textContent = data.year;
    row.cells[0].className = 'px-2 py-1';
    row.insertCell().textContent = data.numericCount.toLocaleString('en-US');
    row.cells[1].className = 'px-2 py-1 text-right';
  });
}

// --- 主題切換 ---
function applyTheme() {
  const htmlEl = document.documentElement;
  if (!htmlEl) return;

  // --- 修改後的邏輯 ---
  // 1. 檢查使用者是否手動設定過主題
  const storedTheme = localStorage.getItem('theme');
  let isDark;

  if (storedTheme) {
    // 如果有手動設定，就依設定為主
    isDark = storedTheme === 'dark';
  } else {
    // 如果沒有手動設定 (新訪客)，就跟隨瀏覽器的偏好
    isDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  // --- 修改結束 ---

  htmlEl.classList.toggle(CSS_CLASSES.DARK_MODE, isDark);
  updateThemeButtonsUI();

  // 更新圖表顏色的部分保持不變
  if (
    rocketChartInstance &&
    domElements.ROCKET_STATS_MODAL &&
    domElements.ROCKET_STATS_MODAL.style.display === 'flex'
  ) {
    const isDarkModeNow = htmlEl.classList.contains(CSS_CLASSES.DARK_MODE);
    const gridColor = getComputedStyle(document.documentElement)
      .getPropertyValue(
        isDarkModeNow ? '--chart-grid-color-dark' : '--chart-grid-color-light'
      )
      .trim();
    const tickColor = getComputedStyle(document.documentElement)
      .getPropertyValue(
        isDarkModeNow ? '--chart-tick-color-dark' : '--chart-tick-color-light'
      )
      .trim();
    const legendColor = getComputedStyle(document.documentElement)
      .getPropertyValue(
        isDarkModeNow
          ? '--chart-legend-color-dark'
          : '--chart-legend-color-light'
      )
      .trim();

    rocketChartInstance.options.scales.x.ticks.color = tickColor;
    rocketChartInstance.options.scales.x.grid.color = gridColor;
    rocketChartInstance.options.scales.y.ticks.color = tickColor;
    rocketChartInstance.options.scales.y.grid.color = gridColor;
    rocketChartInstance.options.plugins.legend.labels.color = legendColor;
    rocketChartInstance.options.plugins.tooltip.backgroundColor = isDarkModeNow
      ? 'rgba(18,18,18,0.9)'
      : 'rgba(244,245,245,0.9)';
    rocketChartInstance.options.plugins.tooltip.titleColor = isDarkModeNow
      ? '#e4e4e7'
      : '#27272a';
    rocketChartInstance.options.plugins.tooltip.bodyColor = isDarkModeNow
      ? '#e4e4e7'
      : '#27272a';
    rocketChartInstance.data.datasets[0].pointBorderColor = isDarkModeNow
      ? '#121212'
      : '#f4f4f5';
    rocketChartInstance.update();
  }
}

function updateThemeButtonsUI() {
  const themeToggleButton = document.getElementById('themeToggleButton');
  if (!themeToggleButton) return;

  // --- 修改後的邏輯 ---
  // 直接檢查 HTML 元素上是否有 'dark-mode' class 來判斷當前主題
  const isCurrentlyDark = document.documentElement.classList.contains(
    CSS_CLASSES.DARK_MODE
  );

  // 定義SVG圖示
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: -3px; margin-right: 0.4rem;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: -3px; margin-right: 0.4rem;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  // 根據當前是否為深色模式來顯示對應的文字和圖示
  if (isCurrentlyDark) {
    // 當前為深色模式時，顯示深色模式的文字
    themeToggleButton.innerHTML =
      moonIcon + translations.themeBtnDarkText[currentLang];
  } else {
    // 當前為淺色模式時，顯示淺色模式的文字
    themeToggleButton.innerHTML =
      sunIcon + translations.themeBtnLightText[currentLang];
  }
}

function setupFab() {
  const fabContainer = document.getElementById('fabContainer');
  const fabMainButton = document.getElementById('fabMainButton');
  const fabActions = document.getElementById('fabActions');
  const periodNav = document.getElementById('periodNav');
  const menuOverlay = document.getElementById('menu-overlay');

  if (!fabContainer || !fabMainButton || !fabActions || !menuOverlay) return;

  let currentActiveFilter = null;

  function clearHighlights() {
    document.body.classList.remove('highlight-overlay-active');
    document.querySelectorAll('.highlight-active').forEach((el) => {
      el.classList.remove('highlight-active');
    });
    currentActiveFilter = null;
  }

  function scrollToElementInVisibleCenter(element) {
    if (!element) return;
    const navHeight = periodNav ? periodNav.offsetHeight : 0;
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.scrollY;
    const middle =
      absoluteElementTop - window.innerHeight / 2 + elementRect.height / 2;
    const finalPosition = middle - navHeight / 2;
    window.scrollTo({ top: finalPosition, behavior: 'smooth' });
  }

  function findBestVisibleElement(elements) {
    let bestElement = null;
    let bestScore = -Infinity;
    const viewportCenter = window.innerHeight / 2;
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(viewportCenter - elementCenter);
      const score = -distance;
      if (score > bestScore) {
        bestScore = score;
        bestElement = el;
      }
    });
    return bestElement || (elements.length > 0 ? elements[0] : null);
  }

  function closeFabMenu() {
    fabContainer.classList.remove('active');
    menuOverlay.classList.remove('visible');
    // 新增：當選單關閉時，更新 aria-expanded 狀態
    fabMainButton.setAttribute('aria-expanded', 'false');
    fabMainButton.setAttribute(
      'aria-label',
      translations.fabAriaOpen[currentLang]
    );
  }

  fabMainButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const wasActive = fabContainer.classList.contains('active');
    if (wasActive) {
      closeFabMenu();
      clearHighlights();
    } else {
      hideTooltip();
      fabContainer.classList.add('active');
      menuOverlay.classList.add('visible');
      // 新增：當選單打開時，更新 aria-expanded 狀態
      fabMainButton.setAttribute('aria-expanded', 'true');
      fabMainButton.setAttribute(
        'aria-label',
        translations.fabAriaClose[currentLang]
      );
    }
  });

  fabActions.addEventListener('click', (e) => {
    // 目標是圓形按鈕本身，而不是整個區塊
    const button = e.target.closest('.fab-button-child');

    // 如果點擊的不是按鈕 (例如點到文字或空白處)，就什麼都不做
    if (!button) return;

    // 如果確定點擊的是按鈕，才繼續往下執行
    e.stopPropagation();
    closeFabMenu();

    // 從按鈕往上找到它的父層區塊，來取得 data-filter 類型
    const action = button.closest('.fab-action');
    if (!action) return;

    const filter = action.getAttribute('data-filter');
    if (filter === currentActiveFilter) {
      clearHighlights();
      return;
    }
    clearHighlights();
    const selectorMap = {
      summary: '.period-summary',
      'pivotal-event': '.timeline-pivotal-interruption',
      'peace-event': '.timeline-peace-interruption',
      'israeli-attack': '.timeline-event.actor-israel',
      'palestinian-attack': '.timeline-event.actor-palestinian',
    };
    const elementsToHighlight = document.querySelectorAll(selectorMap[filter]);
    if (elementsToHighlight.length > 0) {
      document.body.classList.add('highlight-overlay-active');
      elementsToHighlight.forEach((el) => el.classList.add('highlight-active'));
      currentActiveFilter = filter;
      scrollToElementInVisibleCenter(elementsToHighlight[0]);
    } else {
      currentActiveFilter = null;
    }
  });

  menuOverlay.addEventListener('click', (e) => {
    // 如果點擊目標不是導覽列，就關閉選單
    if (!e.target.closest('#periodNav')) {
      closeFabMenu();
    }
  });

  // 頁面點擊導航邏輯 (使用捕獲模式優先處理)
  document.addEventListener(
    'click',
    (e) => {
      // 此監聽器只在高亮啟用且選單關閉時運作
      if (
        !document.body.classList.contains('highlight-overlay-active') ||
        fabContainer.classList.contains('active')
      ) {
        return;
      }

      const target = e.target;

      // 如果點擊的目標是來自彈出視窗、燈箱、或提示框的任何地方，就直接停止，不執行導航
      if (
        target.closest('#eventPopupOverlay') ||
        target.closest('#lightboxOverlay') ||
        target.closest('#eventTooltip')
      ) {
        return;
      }

      // 點擊 FAB 或導覽列時，不執行導航
      if (target.closest('.fab-container') || target.closest('#periodNav')) {
        return;
      }

      const highlightedElements = Array.from(
        document.querySelectorAll('.highlight-active')
      );
      if (highlightedElements.length === 0) return;

      const currentVisibleElement = findBestVisibleElement(highlightedElements);
      const clickedHighlightedElement = target.closest('.highlight-active');

      // 情況一：點擊在另一個高亮元素上
      if (
        clickedHighlightedElement &&
        clickedHighlightedElement !== currentVisibleElement
      ) {
        e.preventDefault();
        e.stopPropagation();
        scrollToElementInVisibleCenter(clickedHighlightedElement);
        return;
      }

      // 情況二：點擊在當前高亮元素上
      if (currentVisibleElement && currentVisibleElement.contains(target)) {
        return;
      }

      // 情況三：點擊在背景上
      if (highlightedElements.length < 2) {
        clearHighlights();
        return;
      }

      if (!currentVisibleElement) return;
      const currentIndex = highlightedElements.indexOf(currentVisibleElement);
      const viewportCenter = window.innerHeight / 2;
      if (e.clientY < viewportCenter) {
        const prevIndex =
          (currentIndex - 1 + highlightedElements.length) %
          highlightedElements.length;
        scrollToElementInVisibleCenter(highlightedElements[prevIndex]);
      } else {
        const nextIndex = (currentIndex + 1) % highlightedElements.length;
        scrollToElementInVisibleCenter(highlightedElements[nextIndex]);
      }
    },
    true
  );
}

// --- 事件監聽器設置 ---
function setupEventListeners() {
  const {
    CONTENT_BODY,
    CLOSE_OTHER_EVENTS_MODAL_BUTTON,
    CLOSE_ROCKET_STATS_MODAL_BUTTON,
    THEME_TOGGLE,
    SPLASH_SCREEN,
    OTHER_EVENTS_MODAL,
    ROCKET_STATS_MODAL,
    SPLASH_MAIN_MENU,
    SHOW_PROLOGUE_BUTTON,
    PROLOGUE_SECTION,
    SITE_HERO,
    PERIOD_NAV,
  } = domElements;

  // 語言切換按鈕
  const langButton = document.getElementById('langToggleButton');
  if (langButton) {
    langButton.addEventListener('click', (e) => {
      e.stopPropagation(); // 防止觸發 splash screen 的其他點擊效果
      const nextLang = currentLang === 'zh' ? 'en' : 'zh';
      setLanguage(nextLang);
    });
  }

  // 監聽頁尾語言切換按鈕的點擊
  const footerLangButton = document.getElementById('footerLangToggleButton');
  if (footerLangButton) {
    footerLangButton.addEventListener('click', (e) => {
      const nextLang = currentLang === 'zh' ? 'en' : 'zh';
      setLanguage(nextLang);
    });
  }

  if (CLOSE_OTHER_EVENTS_MODAL_BUTTON)
    CLOSE_OTHER_EVENTS_MODAL_BUTTON.onclick = () =>
      performModalClose(OTHER_EVENTS_MODAL);
  if (CLOSE_ROCKET_STATS_MODAL_BUTTON)
    CLOSE_ROCKET_STATS_MODAL_BUTTON.onclick = () =>
      performModalClose(ROCKET_STATS_MODAL);

  if (THEME_TOGGLE) {
    THEME_TOGGLE.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains(
        CSS_CLASSES.DARK_MODE
      );
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
      applyTheme();
    });
  }

  if (SHOW_PROLOGUE_BUTTON && PROLOGUE_SECTION) {
    SHOW_PROLOGUE_BUTTON.addEventListener('click', () => {
      PROLOGUE_SECTION.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (domElements.START_TIMELINE_BUTTON) {
    domElements.START_TIMELINE_BUTTON.addEventListener('click', () => {
      const firstPeriodId = periods[0]?.id;
      if (firstPeriodId) {
        const sectionElement = document.getElementById(firstPeriodId);
        const navElement = domElements.PERIOD_NAV;
        if (sectionElement && navElement) {
          const navHeight = navElement.offsetHeight;
          const elementPosition =
            sectionElement.getBoundingClientRect().top + window.scrollY;

          // 計算最終捲動位置：目標區塊的位置，再減去導覽列的高度
          const offsetPosition = elementPosition - navHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    });
  }

  if (CONTENT_BODY) {
    CONTENT_BODY.addEventListener('click', function (e) {
      const button = e.target.closest('.expand-summary-button');
      if (!button) return;

      const targetId = button.getAttribute('aria-controls');
      const content = document.getElementById(targetId);
      const icon = button.querySelector('.expand-icon');
      const buttonText = button.querySelector('span');

      if (content) {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        content.classList.toggle(CSS_CLASSES.EXPANDED);
        if (icon) icon.classList.toggle(CSS_CLASSES.ROTATED);
        // *** BUG修正：從翻譯物件讀取文字 ***
        if (buttonText) {
          buttonText.textContent = isExpanded
            ? translations.summaryButtonExpand[currentLang]
            : translations.summaryButtonCollapse[currentLang];
        }
      }
    });
  }

  if (SPLASH_MAIN_MENU) {
    SPLASH_MAIN_MENU.addEventListener('click', function (e) {
      if (
        e.target.closest('#' + ELEMENT_IDS.ENTER_TIMELINE_BUTTON) ||
        e.target.closest('#langToggleButton')
      ) {
        return;
      }

      const ripple = document.createElement('span');
      ripple.classList.add(CSS_CLASSES.RIPPLE);

      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    });
  }

  // Observer to hide nav during Hero stages
  if (SITE_HERO && PERIOD_NAV) {
    const navObserver = new IntersectionObserver(
      ([entry]) => {
        const isHeroVisible = entry.isIntersecting;
        PERIOD_NAV.classList.toggle(CSS_CLASSES.NAV_HIDDEN, isHeroVisible);
        domElements.FAB_CONTAINER.classList.toggle('fab-hidden', isHeroVisible);
      },
      { threshold: 0.1 }
    );
    navObserver.observe(SITE_HERO);
  }

  // 新的佈景主題切換按鈕事件監聽
  const themeToggleButton = document.getElementById('themeToggleButton');
  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      // --- 修改後的邏輯 ---
      // 1. 直接偵測頁面當前是否為深色模式
      const isCurrentlyDark = document.documentElement.classList.contains(
        CSS_CLASSES.DARK_MODE
      );

      // 2. 決定下一個要切換成的主題
      const newTheme = isCurrentlyDark ? 'light' : 'dark';

      // 3. 將新的主題選擇儲存起來
      localStorage.setItem('theme', newTheme);

      // 4. 套用新主題（這個函式會讀取剛存好的設定並更新畫面）
      applyTheme();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const openModal = document.querySelector(
        '.modal[style*="display: flex"]'
      );
      if (openModal) {
        performModalClose(openModal);
      }
      hideTooltip();
      return;
    }

    if (event.shiftKey && event.altKey) {
      if (
        (SPLASH_SCREEN &&
          !SPLASH_SCREEN.classList.contains(CSS_CLASSES.HIDDEN)) ||
        (OTHER_EVENTS_MODAL && OTHER_EVENTS_MODAL.style.display === 'flex') ||
        (ROCKET_STATS_MODAL && ROCKET_STATS_MODAL.style.display === 'flex')
      ) {
        return;
      }

      const shortcutCode = event.code;
      if (shortcutCode.startsWith('Digit')) {
        event.preventDefault();
        const digit = shortcutCode.substring(5);
        const targetPeriod = periods.find((p) => p.shortcut === digit);
        if (targetPeriod && domElements.PERIOD_NAV) {
          const navButton = domElements.PERIOD_NAV.querySelector(
            `button[data-period-id="${targetPeriod.id}"]`
          );
          if (navButton) navButton.click();
        }
      }
    }
  });

  window.addEventListener('click', (event) => {
    if (event.target === OTHER_EVENTS_MODAL)
      performModalClose(OTHER_EVENTS_MODAL);
    if (event.target === ROCKET_STATS_MODAL)
      performModalClose(ROCKET_STATS_MODAL);

    // Hide tooltip if clicking outside on a touch device
    const tooltip = domElements.EVENT_TOOLTIP;
    if (tooltip && tooltip.classList.contains(CSS_CLASSES.TOOLTIP_VISIBLE)) {
      if (
        !tooltip.contains(event.target) &&
        !event.target.closest(`.${CSS_CLASSES.HAS_TOOLTIP}`)
      ) {
        hideTooltip();
      }
    }
  });

  window.addEventListener('popstate', function (event) {
    const openModal = document.querySelector('.modal[style*="display: flex"]');
    if (openModal) {
      performModalClose(openModal);
    }
  });

  window.addEventListener('scroll', hideTooltip, { passive: true });
}

// --- Tooltip 功能 ---
let currentTooltipTarget = null;

function initializeTooltips() {
  const isTouchDevice =
    'ontouchstart' in window || navigator.maxTouchPoints > 0;

  document.querySelectorAll(`.${CSS_CLASSES.HAS_TOOLTIP}`).forEach((el) => {
    let content = null;
    const eventId = el.getAttribute('data-event-id');
    const detailsAttr = el.getAttribute('data-details');

    if (eventId) {
      // 處理來自主要資料物件的提示內容 (關鍵時刻/和平進程)
      const eventData = eventsData.find((e) => e.id === eventId);
      if (
        eventData &&
        eventData.details &&
        typeof eventData.details === 'object'
      ) {
        // **修正後的邏輯**：
        // 1. 優先嘗試獲取當前語言的內容。
        // 2. 如果當前語言沒有內容，則自動備用(fallback)到中文版本。
        // 3. 如果連中文版都沒有，才放棄。
        content =
          eventData.details[currentLang] || eventData.details['zh'] || null;
      }
    } else if (detailsAttr) {
      // 處理直接寫在 HTML 屬性裡的提示內容 (時期背景資訊)
      content = detailsAttr;
    }

    // 只有在 content 是有效字串時，才進行下一步
    if (content) {
      // **優化**：
      // 透過複製節點的方式，可以有效清除舊的監聽器，避免在語言切換時重複綁定。
      const newEl = el.cloneNode(true);
      el.parentNode.replaceChild(newEl, el);

      // 讓所有有提示框的元素都可以被鍵盤聚焦
      if (newEl.tagName.toLowerCase() !== 'button') {
        newEl.setAttribute('tabindex', '0');
      }

      if (isTouchDevice) {
        newEl.addEventListener('click', (e) => {
          e.stopPropagation();
          if (currentTooltipTarget === e.currentTarget) {
            hideTooltip();
          } else {
            showTooltip(e.currentTarget, content);
          }
        });
      } else {
        // 非觸控裝置的事件監聽
        newEl.addEventListener('mouseenter', (e) =>
          showTooltip(e.currentTarget, content)
        );
        newEl.addEventListener('mouseleave', hideTooltip);
        // 新增：鍵盤使用者也能觸發
        newEl.addEventListener('focus', (e) =>
          showTooltip(e.currentTarget, content)
        );
        newEl.addEventListener('blur', hideTooltip);
      }
    }
  });
}

function showTooltip(targetElement, content) {
  const tooltip = domElements.EVENT_TOOLTIP;
  if (!tooltip) return;

  hideTooltip();

  currentTooltipTarget = targetElement;
  tooltip.innerHTML = content;

  tooltip.classList.add(CSS_CLASSES.TOOLTIP_VISIBLE);

  requestAnimationFrame(() => {
    const tooltipHeight = tooltip.offsetHeight;
    const tooltipWidth = tooltip.offsetWidth;

    const targetRect = targetElement.getBoundingClientRect();
    const margin = 8;

    let left =
      targetRect.left +
      window.scrollX +
      targetRect.width / 2 -
      tooltipWidth / 2;
    const clientWidth = document.documentElement.clientWidth;
    if (left < 10) {
      left = 10;
    } else if (left + tooltipWidth > clientWidth - 10) {
      left = clientWidth - tooltipWidth - 10;
    }

    let top;
    const spaceBelow = window.innerHeight - targetRect.bottom;
    const spaceAbove = targetRect.top;

    if (spaceBelow >= tooltipHeight + margin) {
      top = targetRect.bottom + window.scrollY + margin;
    } else if (spaceAbove >= tooltipHeight + margin) {
      top = targetRect.top + window.scrollY - tooltipHeight - margin;
    } else {
      top = window.scrollY + (window.innerHeight - tooltipHeight) / 2;
    }

    if (top < window.scrollY + 10) {
      top = window.scrollY + 10;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    tooltip.style.pointerEvents = 'auto';
  });
}

function hideTooltip() {
  const tooltip = domElements.EVENT_TOOLTIP;
  if (tooltip) {
    tooltip.classList.remove(CSS_CLASSES.TOOLTIP_VISIBLE);
    tooltip.style.pointerEvents = 'none';
  }
  currentTooltipTarget = null;
}

function setupChartFeatures() {
  const chartScript = domElements.CHART_JS_SCRIPT;

  const setButtonsToLoading = () => {
    document.querySelectorAll('.rocket-stats-button').forEach((button) => {
      button.classList.add(CSS_CLASSES.CHART_LOADING);
    });
  };

  const onChartReady = () => {
    if (window.chartJsLoaded) {
      enableChartButtons();
      if (
        pendingChartRenderInfo &&
        domElements.ROCKET_STATS_MODAL.style.display === 'flex'
      ) {
        renderPendingChart();
      }
    } else if (window.chartJsError) {
      disableChartButtonsWithError();
    }
  };

  setTimeout(() => {
    setButtonsToLoading();
    if (window.chartJsLoaded || window.chartJsError) {
      onChartReady();
    } else if (chartScript) {
      chartScript.onload = () => {
        window.chartJsLoaded = true;
        onChartReady();
      };
      chartScript.onerror = () => {
        window.chartJsError = true;
        onChartReady();
      };
    } else {
      disableChartButtonsWithError();
    }
  }, 0);
}

function renderPendingChart() {
  if (!pendingChartRenderInfo || !pendingChartRenderInfo.period) return;
  const { period } = pendingChartRenderInfo;
  const { ROCKET_STATS_MODAL_BODY_CONTENT } = domElements;

  if (ROCKET_STATS_MODAL_BODY_CONTENT) {
    const newBodyContent = generateChartModalContent(period);
    ROCKET_STATS_MODAL_BODY_CONTENT.innerHTML = newBodyContent;

    const filteredData = rocketLaunchData.filter(
      (d) => d.year >= period.startYear && d.year <= period.endYear
    );

    const canvas = document.getElementById('rocketLaunchLineChart');
    if (canvas) {
      renderRocketChart(canvas, filteredData);
    }

    const tableBody = document.getElementById('rocketDataTableBodyInModal');
    if (tableBody) {
      populateRocketTable(tableBody, filteredData);
    }

    pendingChartRenderInfo = null;
  }
}

function enableChartButtons() {
  document.querySelectorAll('.rocket-stats-button').forEach((button) => {
    button.classList.remove(CSS_CLASSES.CHART_LOADING);
  });
}

function disableChartButtonsWithError() {
  document.querySelectorAll('.rocket-stats-button').forEach((button) => {
    button.classList.remove(CSS_CLASSES.CHART_LOADING);
    button.textContent = '圖表載入失敗 ⚠️';
    button.disabled = true;
  });
}

// --- 新增：專門用來觸發進場動畫的偵測器 ---
function setupAnimationObserver() {
  const elementsToAnimate = document.querySelectorAll('.animate-on-load');
  if (elementsToAnimate.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // 當元素進入可視範圍時
        if (entry.isIntersecting) {
          // 為元素加上觸發動畫的 class
          entry.target.classList.add('start-animation');
        } else {
          // 新增：當元素離開可視範圍時，移除 class，為下次動畫做準備
          entry.target.classList.remove('start-animation');
        }
      });
    },
    {
      threshold: 0.1, // 元素出現 10% 就觸發
    }
  );

  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });
}

function setupIntersectionObserver() {
  // 如果舊的偵測器還在，先停止它
  if (observer) {
    observer.disconnect();
  }

  const { PERIOD_NAV } = domElements;
  if (!PERIOD_NAV) return;
  const navHeight = PERIOD_NAV.offsetHeight || 60;
  const observerOptions = {
    rootMargin: `-${navHeight + 20}px 0px -40% 0px`,
    threshold: 0,
  };

  // 建立一個新的偵測器，並存到全域變數中
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const periodId = entry.target.id;
        setActiveNavButton(periodId);
      }
    });
  }, observerOptions);

  // 讓新的偵測器去監聽頁面上所有的時期區塊
  document.querySelectorAll('.period-section').forEach((section) => {
    observer.observe(section);
  });
}

// --- 初始化 ---
function initializePage() {
  cacheDOMElements();
  updateUIText();
  loadAndSortData();

  if (domElements.CURRENT_YEAR_SPAN) {
    domElements.CURRENT_YEAR_SPAN.textContent = new Date().getFullYear();
  }

  applyTheme();
  createPeriodNavigation();
  renderContentBody();
  createEmbers();
  setupEventListeners();
  setupFab();
  setupChartFeatures();

  // 新增：啟用我們為進場動畫建立的專門偵測器
  setupAnimationObserver();

  // 保留：這是您原有的、用來控制頂部導覽列的偵測器
  setupIntersectionObserver();

  setupTimelineEntryAnimations();

  // 保留：這是您原有的、用來啟動 Splash Screen 的程式碼
  if (
    domElements.SPLASH_SCREEN &&
    !domElements.SPLASH_SCREEN.classList.contains(CSS_CLASSES.HIDDEN)
  ) {
    playIntroSequence();
  } else if (domElements.MAIN_CONTENT_WRAPPER) {
    domElements.MAIN_CONTENT_WRAPPER.style.display = 'block';
    domElements.MAIN_CONTENT_WRAPPER.classList.remove('initially-hidden');
  }
}

document.addEventListener('DOMContentLoaded', initializePage);

function setupTimelineEntryAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // 當動畫觸發後，可以選擇停止觀察以提升效能
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // 元素出現 10% 就觸發
      rootMargin: '0px 0px -50px 0px', // 稍微延遲觸發，避免太敏感
    }
  );

  document.querySelectorAll('.timeline-entry').forEach((el) => {
    observer.observe(el);
  });
}

// 新增：監聽時間軸事件的點擊，以觸發彈出式視窗
const CONTENT_BODY = document.getElementById('contentBody');
if (CONTENT_BODY) {
  CONTENT_BODY.addEventListener('click', (e) => {
    // 找到被點擊的事件卡片元素
    const eventElement = e.target.closest('.timeline-event-content');
    if (!eventElement) return; // 如果點的不是事件卡片，就什麼都不做

    const eventId = eventElement.getAttribute('data-event-id');
    const details = eventDetails[eventId];
    const eventData = timelineData.events.find((evt) => evt.id === eventId);

    // 檢查這個事件是否有詳細資料可以顯示
    if (details && eventData) {
      // 判斷卡片在左邊還是右邊，決定彈出視窗方向
      const isLeft = eventElement.classList.contains('event-left');
      const direction = isLeft ? 'left' : 'right';

      // 呼叫我們在 event-popup.js 中建立的函式
      showEventPopup(eventData, details, currentLang, direction);
    }
  });
}
