(function () {
  var T = {
    en: { title: "Big Bass Bonanza Wheel ᐉ Spin & Win Casino Bonus", cta_line1: "Spin the wheel —", cta_line2_mob: "get your<br class=\"fro-mob\"> bonus", cta_line2_desk: "get your bonus", spin: "Spin", popup_text1: "Claim your bonus", popup_text3: "+ 150 FreeSpins", popup_button: "Claim", step_1: "Registration<br>in 2 clicks", step_2: "Deposit<br>bonus", step_3: "Fast withdrawal<br>no fees", footer_legal: "Operated by TechWave B.V. (Company No. 165594) under Curaçao Gaming Authority License No. OGL/2024/1653/0930", footer_copyright: "© 2026 This game is reserved for those over 18 years of age. Play responsibly. Gambling can cause addiction and financial loss." },
    es: { title: "Big Bass Bonanza Rueda ᐉ Gira y Gana Bono de Casino", cta_line1: "Gira la rueda —", cta_line2_mob: "consigue tu<br class=\"fro-mob\"> bono", cta_line2_desk: "consigue tu bono", spin: "Girar", popup_text1: "Recoge tu bono", popup_text3: "+ 150 Giros Gratis", popup_button: "Recoger", step_1: "Registro<br>en 2 clics", step_2: "Bono de<br>depósito", step_3: "Retiro rápido<br>sin comisión", footer_legal: "Operado por TechWave B.V. (N.º de empresa 165594) bajo la licencia N.º OGL/2024/1653/0930 de la Autoridad del Juego de Curazao.", footer_copyright: "© 2026 Este juego está reservado para mayores de 18 años. Juega con responsabilidad. El juego puede causar adicción y pérdidas económicas." },
    pt: { title: "Big Bass Bonanza Roleta ᐉ Gire e Ganhe Bônus de Cassino", cta_line1: "Gire a roleta —", cta_line2_mob: "ganhe seu<br class=\"fro-mob\"> bônus", cta_line2_desk: "ganhe seu bônus", spin: "Girar", popup_text1: "Pegue seu bônus", popup_text3: "+ 150 Giros Grátis", popup_button: "Pegar", step_1: "Cadastro<br>em 2 cliques", step_2: "Bônus de<br>depósito", step_3: "Saque rápido<br>sem taxas", footer_legal: "Operado pela TechWave B.V. (N.º de empresa 165594) sob a licença n.º OGL/2024/1653/0930 da Autoridade de Jogos de Curaçao.", footer_copyright: "© 2026 Este jogo é reservado a maiores de 18 anos. Jogue com responsabilidade. Os jogos de azar podem causar dependência e perdas financeiras." },
    de: { title: "Big Bass Bonanza Glücksrad ᐉ Drehen & Casino Bonus Gewinnen", cta_line1: "Drehe das Rad —", cta_line2_mob: "hol dir<br class=\"fro-mob\"> den Bonus", cta_line2_desk: "hol dir den Bonus", spin: "Drehen", popup_text1: "Hol dir deinen Bonus", popup_text3: "+ 150 Freispiele", popup_button: "Abholen", step_1: "Registrierung<br>in 2 Klicks", step_2: "Einzahlungs-<br>bonus", step_3: "Schnelle Auszahlung<br>ohne Gebühren", footer_legal: "Betrieben von TechWave B.V. (Unternehmensnr. 165594) unter der Lizenz Nr. OGL/2024/1653/0930 der Glücksspielbehörde von Curaçao.", footer_copyright: "© 2026 Dieses Spiel ist Personen ab 18 Jahren vorbehalten. Spielen Sie verantwortungsbewusst. Glücksspiel kann süchtig machen und zu finanziellen Verlusten führen." },
    fr: { title: "Big Bass Bonanza Roue ᐉ Tourne et Gagne ton Bonus Casino", cta_line1: "Fais tourner la roue —", cta_line2_mob: "récupère<br class=\"fro-mob\"> ton bonus", cta_line2_desk: "récupère ton bonus", spin: "Tourner", popup_text1: "Récupère ton bonus", popup_text3: "+ 150 Tours Gratuits", popup_button: "Récupérer", step_1: "Inscription<br>en 2 clics", step_2: "Bonus de<br>dépôt", step_3: "Retrait rapide<br>sans frais", footer_legal: "Exploité par TechWave B.V. (n° d'entreprise 165594) sous la licence n° OGL/2024/1653/0930 de l'Autorité des Jeux de Curaçao.", footer_copyright: "© 2026 Ce jeu est réservé aux personnes âgées de plus de 18 ans. Jouez de manière responsable. Les jeux d'argent peuvent entraîner une dépendance et des pertes financières." },
    it: { title: "Big Bass Bonanza Ruota ᐉ Gira e Vinci il Bonus Casinò", cta_line1: "Gira la ruota —", cta_line2_mob: "prendi il<br class=\"fro-mob\"> bonus", cta_line2_desk: "prendi il bonus", spin: "Gira", popup_text1: "Prendi il tuo bonus", popup_text3: "+ 150 Giri Gratis", popup_button: "Prendi", step_1: "Registrazione<br>in 2 clic", step_2: "Bonus di<br>deposito", step_3: "Prelievo rapido<br>senza commissioni", footer_legal: "Gestito da TechWave B.V. (n. società 165594) con licenza n. OGL/2024/1653/0930 dell'Autorità del Gioco di Curaçao.", footer_copyright: "© 2026 Questo gioco è riservato esclusivamente a persone di età superiore ai 18 anni. Gioca responsabilmente. Il gioco d'azzardo può causare dipendenza e perdite finanziarie." },
    pl: { title: "Koło Big Bass Bonanza ᐉ Zakręć i Wygraj Bonus Kasynowy", cta_line1: "Zakręć kołem —", cta_line2_mob: "odbierz<br class=\"fro-mob\"> bonus", cta_line2_desk: "odbierz bonus", spin: "Zakręć", popup_text1: "Odbierz swój bonus", popup_text3: "+ 150 Darmowych Spinów", popup_button: "Odbierz", step_1: "Rejestracja<br>w 2 kliknięciach", step_2: "Bonus od<br>depozytu", step_3: "Szybka wypłata<br>bez prowizji", footer_legal: "Prowadzone przez TechWave B.V. (nr firmy 165594) na podstawie licencji nr OGL/2024/1653/0930 wydanej przez Organ ds. Gier Hazardowych Curaçao.", footer_copyright: "© 2026 Ta gra jest przeznaczona wyłącznie dla osób powyżej 18 roku życia. Graj odpowiedzialnie. Hazard może uzależniać i prowadzić do strat finansowych." },
    tr: { title: "Big Bass Bonanza Çark ᐉ Çevir ve Kazino Bonusu Kazan", cta_line1: "Çarkı çevir —", cta_line2_mob: "bonusunu<br class=\"fro-mob\"> al", cta_line2_desk: "bonusunu al", spin: "Çevir", popup_text1: "Bonusunu al", popup_text3: "+ 150 Bedava Dönüş", popup_button: "Al", step_1: "2 tıklamayla<br>kayıt", step_2: "Para yatırma<br>bonusu", step_3: "Komisyonsuz<br>hızlı çekim", footer_legal: "TechWave B.V. (Şirket No. 165594) tarafından Curaçao Kumar Otoritesi'nin OGL/2024/1653/0930 sayılı lisansı kapsamında işletilmektedir.", footer_copyright: "© 2026 Bu oyun yalnızca 18 yaş üstü kişiler içindir. Lütfen sorumlu bir şekilde oynayın. Kumar bağımlılığa ve mali kayıplara yol açabilir." },
    ro: { title: "Big Bass Bonanza Roată ᐉ Învârte şi Câştigă Bonus Cazino", cta_line1: "Învârte roata —", cta_line2_mob: "ia-ţi<br class=\"fro-mob\"> bonusul", cta_line2_desk: "ia-ţi bonusul", spin: "Învârte", popup_text1: "Ia-ţi bonusul", popup_text3: "+ 150 Rotiri Gratis", popup_button: "Ia", step_1: "Înregistrare<br>în 2 clicuri", step_2: "Bonus de<br>depozit", step_3: "Retragere rapidă<br>fără comision", footer_legal: "Operat de TechWave B.V. (Nr. companie 165594) sub licenţa nr. OGL/2024/1653/0930 a Autorităţii pentru Jocuri de Noroc din Curaçao.", footer_copyright: "© 2026 Acest joc este rezervat persoanelor cu vârsta de peste 18 ani. Jucaţi responsabil. Jocurile de noroc pot crea dependenţă şi pierderi financiare." },
    hi: { title: "Big Bass Bonanza व्हील ᐉ घुमाएं और कैसीनो बोनस जीतें", cta_line1: "व्हील घुमाएं —", cta_line2_mob: "अपना<br class=\"fro-mob\"> बोनस लें", cta_line2_desk: "अपना बोनस लें", spin: "घुमाएं", popup_text1: "अपना बोनस लें", popup_text3: "+ 150 फ्री स्पिन", popup_button: "लें", step_1: "2 क्लिक में<br>पंजीकरण", step_2: "जमा<br>बोनस", step_3: "तेज़ निकासी<br>बिना शुल्क", footer_legal: "TechWave B.V. (कंपनी संख्या 165594) द्वारा कुराकाओ गेमिंग प्राधिकरण लाइसेंस संख्या OGL/2024/1653/0930 के तहत संचालित।", footer_copyright: "© 2026 यह गेम केवल 18 वर्ष से अधिक आयु के व्यक्तियों के लिए है। कृपया जिम्मेदारी से खेलें। जुआ की लत लग सकती है और इससे वित्तीय नुकसान हो सकता है।" },
    el: { title: "Big Bass Bonanza Τροχός ᐉ Στρίψε και Κέρδισε Μπόνους Καζίνο", cta_line1: "Στρίψε τον τροχό —", cta_line2_mob: "πάρε το<br class=\"fro-mob\"> μπόνους", cta_line2_desk: "πάρε το μπόνους", spin: "Στρίψε", popup_text1: "Πάρε το μπόνους σου", popup_text3: "+ 150 Δωρεάν Περιστροφές", popup_button: "Πάρ' το", step_1: "Εγγραφή<br>σε 2 κλικ", step_2: "Μπόνους<br>κατάθεσης", step_3: "Γρήγορη ανάληψη<br>χωρίς προμήθεια", footer_legal: "Λειτουργεί από την TechWave B.V. (Αρ. εταιρείας 165594) βάσει της άδειας αρ. OGL/2024/1653/0930 της Αρχής Τυχερών Παιχνιδιών του Κουρασάο.", footer_copyright: "© 2026 Αυτό το παιχνίδι προορίζεται αποκλειστικά για άτομα άνω των 18 ετών. Παίξτε υπεύθυνα. Τα τυχερά παιχνίδια μπορούν να προκαλέσουν εθισμό και οικονομικές απώλειες." }
  };

  function pickLang() {
    var qs = new URLSearchParams(window.location.search);
    var fromUrl = qs.get('lang') || qs.get('locale') || qs.get('hl');
    if (fromUrl) { fromUrl = fromUrl.toLowerCase().slice(0, 2); if (T[fromUrl]) return fromUrl; }
    if (window.LANG && T[String(window.LANG).toLowerCase().slice(0, 2)]) return String(window.LANG).toLowerCase().slice(0, 2);
    var attr = document.documentElement.getAttribute('data-lang');
    if (attr && T[attr.toLowerCase().slice(0, 2)]) return attr.toLowerCase().slice(0, 2);
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || navigator.userLanguage || ''];
    for (var i = 0; i < langs.length; i++) {
      var code = String(langs[i] || '').toLowerCase().slice(0, 2);
      if (T[code]) return code;
    }
    return 'en';
  }

  function apply() {
    var lang = pickLang();
    var dict = T[lang];
    if (!dict) return;

    document.documentElement.setAttribute('lang', lang);
    window.__LP_LANG = lang;

    if (dict.title) document.title = dict.title;

    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute('data-i18n');
      if (dict[key] === undefined) continue;
      if (el.tagName === 'TITLE') { el.textContent = dict[key]; continue; }
      if (dict[key].indexOf('<') !== -1) el.innerHTML = dict[key];
      else el.textContent = dict[key];
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
})();