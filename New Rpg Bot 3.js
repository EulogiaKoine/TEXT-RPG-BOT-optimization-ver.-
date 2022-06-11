const scriptName = "New rpg bot3";
const FS = FileStream;
const PATH = "/storage/emulated/0/Newrpg3/player/";
const FV = '\u200b'.repeat(500); //Full View: 전체보기
const EXP_EV = 1;
const asyncTimes = require("/storage/emulated/0/Download/asyncTimes.js");
const rankscoreE = 1;
const moon = 0; //달빛 재료 드랍률 버프 (0 = ×1 / 1 = ×2)
const EXP_BOO = 1; //EXP 버프 (0 = ×1)
const File = require('/storage/emulated/0/Download/File.js');
const Directory = require('/storage/emulated/0/Download/Directory.js');

Device.acquireWakeLock(android.os.PowerManager.PARTIAL_WAKE_LOCK, '');

setTimeout = asyncTimes.setTimeout;
setInterval = asyncTimes.setInterval;

const clearTime = asyncTimes.clearTime;

clearTimeout = id => clearTime(id);
clearInterval = id => clearTime(id);
 
function makeRnd(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
 
function haveData(name) {
  return java.io.File(PATH + "playerData/" + name + "/" + name + ".json").canRead();
}
 
function updatePlayer(name) {
  return JSON.parse(FS.read(PATH + "playerData/" + name + "/" + name + ".json"));
}
 
function savePlayer(data, name) {
  FS.write(PATH + "playerData/" + name + "/" + name + ".json", JSON.stringify(data, null, "\t"));
}

function useratk(protect, mprotectx) {
  protect * ((100 - mprotectx) / 100);
  return;
}
 
function makeBar(count, max, barLength) {
  const BAR = ['', '▏', '▎', '▍', '▌', '▋', '▊', '▉', '█'];
  let length = (barLength * count / max), dec = length % 1, int = length - dec, result = (BAR[8].repeat(int) + BAR[Math.round(dec * 8)]);
  return (result + '　'.repeat(barLength - result.length));
}

function setCurr(user){
    user.Rhp = user.hp + user.statpoint_hp * 4 + user.armor_hp_u + user.work_hp;
    user.Rhpmax = user.hpmax + user.statpoint_hp * 4 + user.armor_hp_u + user.work_hp;
    user.Ratk = user.atk + user.statpoint_atk * 2 + user.armor_atk_1 + user.work_atk;
    user.Rmpatk = user.mpatk + user.statpoint_mpatk * 2 + user.armor_atk_1 + user.work_mpatk;
    user.Rmp = user.mp + user.statpoint_mp * 4 + user.work_mp;
    user.Rmpmax = user.mpmax + user.statpoint_mp * 4 + user.work_mp;
    user.Rprotect = user.protect + user.statpoint_protect + user.armor_def_u;
    user.Rmpprotect = user.mpprotect + user.statpoint_mpprotect + user.armor_def_u;
    user.Rcritical = user.critical + user.statpoint_critical * 15;
    user.Rcriticalper = user.criticalper + user.statpoint_critical * 35;
    user.RExpboost = user.Expboost + user.pickaxe_Expboost + EXP_BOO;
}
 
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  [msg, room, sender] == [msg, room, sender].map(x => x.replace((sender.indexOf("/") > -1)));
  {
    sender = sender.replace(/[/]/g, "").replace(/ /g, "");
  }

  var image = imageDB.getProfileHash();
  //var player = updatePlayer(sender);
  var user;
  if(haveData(sender)){
    user = updatePlayer(sender);
  } else {
    user = {};
  }
  
  if (msg === "*회원가입") {
    if (user.name !== undefined) {
      replier.reply("이미 회원가입 하셨습니다. 정보를 확인하시려면 '*내정보'를 입력하세요.");
    } else {
      playerdata = {
  "name": sender,
  "level": 1,
  "Exp": 0,
  "Expmax": 1800,
  "statpoint": 0,
  "statpoint_up": false,
  "statpoint_atk": 0,
  "statpoint_atk_up": false,
  "statpoint_hp": 0,
  "statpoint_hp_up": false,
  "statpoint_protect": 0,
  "statpoint_protect_up": false,
  "statpoint_mp": 0,
  "statpoint_mp_up": false,
  "statpoint_mpprotect": 0,
  "statpoint_mpprotect_up": false,
  "statpoint_mpatk": 0,
  "statpoint_mpatk_up": false,
  "statpoint_critical": 0,
  "statpoint_critical_up": false,
  "achieve_use": "Noob",
  "achieve_point": 0,
  "achieve_point_max": 5,
  "achieve_rank": "초보 업적 사냥꾼",
  "achieve_level_name": "I'm noob", 
  "achieve_level_max": 100,
  "achieve_hunt_name": "I'm noob",
  "achieve_hunt": 0,
  "achieve_hunt_max": 20,
  "achieve_raid_name": "I'm noob",
  "achieve_raid": 0,
  "achieve_raid_max": 3,
  "gold": 0,
  "superdiamond": 10,
  "cash": 0,
  "hp": 80,
  "Rhp": 80,
  "hpmax": 80,
  "Rhpmax": 80,
  "heal": false,
  "mp": 50,
  "Rmp": 50,
  "mpmax": 50,
  "Rmpmax": 50,
  "atk": 30,
  "Ratk": 30,
  "mpatk": 30,
  "Rmpatk": 30,
  "bleed": 0,
  "Rbleed": 0,
  "protect": 3, //방어
  "Rprotect": 3,
  "mpprotect": 3, //마법방어
  "Rmpprotect": 3,
  "Goldboost": 1,
  "RGoldboost": 1,
  "Expboost": 1,
  "RExpboost": 1,
  "protectx": 0, //방어관통
  "Rprotectx": 0,
  "mpprotectx": 0, //마법관통
  "Rmpprotectx": 0,
  "lowprotect": 0, //치유감소
  "Rlowprotect": 0,
  "critical": 1300,
  "Rcritical": 1300,
  "criticalper": 2000,
  "Rcriticalper": 2000,
  "pickaxe_level": 1,
  "pickaxe_Exp": 0,
  "pickaxe_Expmax": 50,
  "pickaxe_dirt": 7500, //(100 = 1%)
  "pickaxe_stone": 2000,
  "pickaxe_coal": 450,
  "pickaxe_iron": 50,
  "pickaxe_silver": 0,
  "pickaxe_gold": 0,
  "pickaxe_cristal": 0,
  "pickaxe_diamond": 0,
  "pickaxe_over_level": "-",
  "pickaxe_over_Exp": 0,
  "pickaxe_over_Expmax": 0,
  "pickaxe_over_id": 0,
  "pickaxe_over_name": "",
  "pickaxe_luck": 0,
  "pickaxe_Expboost": 0,
  "pickaxe_Exptotal": 0,
  "work_id": 0,
  "work_score": 0,
  "work_scoremax": 500,
  "work_scorelevel": 1,
  "work_name": "모험가",
  "work_level": 0,
  "work_hp": 0,
  "work_mp": 0,
  "work_atk": 0,
  "work_mpatk": 0,
  "work_protect": 0,
  "work_mpprotect": 0,
  "work_Expboost": 0,
  "work_protectx": 0,
  "work_mpprotectx": 0,
  "work_critical": 0,
  "work_criticalper": 0,
  "work_lowprotect": 0,
  "work_bleed": 0,
  "inv_monster": 0,
  "inv_dirt": 0,
  "inv_stone": 0,
  "inv_coal": 0,
  "inv_iron": 0,
  "inv_silver": 0,
  "inv_gold": 0,
  "inv_cristal": 0,
  "inv_diamond": 0,
  "inv_unob": 0,
  "inv_jstone_s": 0,
  "inv_jstone_m": 0,
  "inv_jstone_l": 0,
  "inv_purple_stone": 0,
  "inv_purple": 0,
  "inv_topaz_stone": 0,
  "inv_topaz": 0,
  "inv_go_ticket": 0,
  "inv_go_raid_ticket": 0,
  "inv_stat_reset_ticket": 0,
  "inv_job_reset_ticket": 0,
  "inv_option_epic_ticket": 0,
  "inv_option_legend_ticket": 0,
  "season1_rank": "미참여",
  "season2_rank": "진행중",
  "season3_rank": "정보 없음",
  "inv_hp_s": 0,
  "inv_hp_m": 0,
  "inv_hp_l": 0,
  "inv_mp_s": 0,
  "inv_mp_m": 0,
  "inv_mp_l": 0,
  "inv_paper": 0,
  "inv_purplestone": 0,
  "inv_goldstone": 0,
  "mid": 0,
  "mlevel": 0,
  "mexp": 0,
  "mgold": 0,
  "mname": "None",
  "mplay": false,
  "mhp": 0,
  "mhpmax": 0,
  "mmp": 0,
  "matk": 0,
  "mpaze": 0,
  "mprotect": 0, //몬스터 방어력
  "mprotect_s": 0, //몬스터 쉴드
  "mcritical": 5, //%
  "mprotectx": 0, //몬스터 방어관통
  "mmpprotectx": 0, //몬스터 마법관통
  "blood": 0, //상태이상: 출혈 [공격마다 단계 × 5데미지 발생]
  "event_score": 0,
  "event_scoremax": 10,
  "inv_event1": 0,
  "inv_event2": 0,
  "inv_event3": 0,
  "inv_event4": 3,
  "inv_event5": 0,
  "inv_event6": 0,
  "inv_event7": 0,
  "inv_event8": 0,
  "inv_event9": 0,
  "inv_event10": 0,
  "event1": 0,
  "event2": 0,
  "event3": 0,
  "event4": 0,
  "tax": 1,
  "trade": false,
  "tradeid": 0,
  "trade_total": 0,
  "trade_item_count": 0,
  "event_coin": 0,
  "season_coin": 0,
  "season_score": 0,
  "event_tier": "Bronze",
  "rank_id": 1,
  "rankscore": 0,
  "rank_tier": "Bronze V",
  "rank_reward": 0,
  "rankscoremax": 300,
  "mapid": 0,
  "quest_id": 0,
  "quest_score": 0,
  "quest_score_max": 0,
  "quest_story_fin": false,
  "quest_choice": 0,
  "quest_score": 0,
  "quest_scoremax": 4,
  "quest_level": 0,
  "quest_lv_score": 0,
  "quest_lv_scoremax": 1,
  "update": 7,
  "tag_count": 1,
  "tag_u": "Noob",
  "tag_1": "없음",
  "tag_2": "없음",
  "tag_3": "없음",
  "tag_4": "없음",
  "tag_5": "없음",
  "tag_6": "없음",
  "tag_7": "없음",
  "tag_8": "없음",
  "tag_9": "없음",
  "tag_10": "없음",
  "tag_11": "없음",
  "tag_12": "없음",
  "tag_13": "없음",
  "tag_14": "없음",
  "tag_15": "없음",
  "armor_id_u": 0,
  "armor_level_u": 0,
  "armor_name_u": "맨 손",
  "armor_up_u": 0,
  "armor_upmax_u": 20,
  "armor_hp_u": 0,
  "armor_mp_u": 0,
  "armor_def_u": 0,
  "armor_s_cool_u": 0,
  "armor_plushp_u": 0, //데미지입을시 hp추가
  "armor_plusmp_u": 0, //데미지입을시 mp추가
  "armor_gold_u": 0,
  "armor_stone_u": 0,
  "armor_upgold_u": 0,
  "armor_upstone_u": 0,
  "armor_percent_u": 0,
  "armor_percentdown_u": 0,
  "armor_uphp_u": 0,
  "armor_upmp_u": 0,
  "armor_updef_u": 0,
  "armor_ups_cool_u": 0,
  "armor_up_plushp_u": 0,
  "armor_up_plusmp_u": 0,
  "armor_id_1": 0,
  "armor_level_1": 0,
  "armor_name_1": "맨 손",
  "armor_up_1": 0,
  "armor_upmax_1": 20,
  "armor_hp_1": 0,
  "armor_mp_1": 0,
  "armor_def_1": 0,
  "armor_s_cool_1": 0,
  "armor_plushp_1": 0, //데미지입을시 hp추가
  "armor_plusmp_1": 0, //데미지입을시 mp추가
  "armor_gold_1": 0,
  "armor_stone_1": 0,
  "armor_upgold_1": 0,
  "armor_upstone_1": 0,
  "armor_percent_1": 0,
  "armor_percentdown_1": 0,
  "armor_uphp_1": 0,
  "armor_upmp_1": 0,
  "armor_updef_1": 0,
  "armor_ups_cool_1": 0,
  "armor_up_plushp_1": 0,
  "armor_up_plusmp_1": 0,
  "armor_id_2": 0,
  "armor_level_2": 0,
  "armor_name_2": "맨 손",
  "armor_up_2": 0,
  "armor_upmax_2": 20,
  "armor_hp_2": 0,
  "armor_mp_2": 0,
  "armor_def_2": 0,
  "armor_s_cool_2": 0,
  "armor_plushp_2": 0, //데미지입을시 hp추가
  "armor_plusmp_2": 0, //데미지입을시 mp추가
  "armor_gold_2": 0,
  "armor_stone_2": 0,
  "armor_upgold_2": 0,
  "armor_upstone_2": 0,
  "armor_percent_2": 0,
  "armor_percentdown_2": 0,
  "armor_uphp_2": 0,
  "armor_upmp_2": 0,
  "armor_updef_2": 0,
  "armor_ups_cool_2": 0,
  "armor_up_plushp_2": 0,
  "armor_up_plusmp_2": 0,
  "armor_id_3": 0,
  "armor_level_3": 0,
  "armor_name_3": "맨 손",
  "armor_up_3": 0,
  "armor_upmax_3": 20,
  "armor_hp_3": 0,
  "armor_mp_3": 0,
  "armor_def_3": 0,
  "armor_s_cool_3": 0,
  "armor_plushp_3": 0, //데미지입을시 hp추가
  "armor_plusmp_3": 0, //데미지입을시 mp추가
  "armor_gold_3": 0,
  "armor_stone_3": 0,
  "armor_upgold_3": 0,
  "armor_upstone_3": 0,
  "armor_percent_3": 0,
  "armor_percentdown_3": 0,
  "armor_uphp_3": 0,
  "armor_upmp_3": 0,
  "armor_updef_3": 0,
  "armor_ups_cool_3": 0,
  "armor_up_plushp_3": 0,
  "armor_up_plusmp_3": 0,
  "armor_atk_u": 0,
  "armor_upatk_u": 0,
  "armor_gem_u": 0,
  "armor_option_name_u": "없음",
  "armor_option_info_u": "옵션이 존재하지 않습니다. '*옵션 뽑기 (일반/고급)으로, 옵션을 뽑아보세요!'",
  "armor_option_hp_u": 0,
  "armor_option_mp_u": 0,
  "armor_option_def_u": 0,
  "armor_option_bossatk_u": 0,
  "armor_option_atk_u": 0,
  "armor_option_s_cool_u": 0,
  "armor_option_per_u": 0,
  "armor_atk_1": 0,
  "armor_upatk_1": 0,
  "armor_gem_1": 0,
  "armor_option_name_1": "없음",
  "armor_option_info_1": "옵션이 존재하지 않습니다. '*옵션 뽑기 (일반/고급)으로, 옵션을 뽑아보세요!'",
  "armor_option_hp_1": 0,
  "armor_option_mp_1": 0,
  "armor_option_def_1": 0,
  "armor_option_bossatk_1": 0,
  "armor_option_atk_1": 0,
  "armor_option_s_cool_1": 0,
  "armor_option_per_1": 0,
  "armor_atk_2": 0,
  "armor_upatk_2": 0,
  "armor_gem_2": 0,
  "armor_option_name_2": "없음",
  "armor_option_info_2": "옵션이 존재하지 않습니다. '*옵션 뽑기 (일반/고급)으로, 옵션을 뽑아보세요!'",
  "armor_option_hp_2": 0,
  "armor_option_mp_2": 0,
  "armor_option_def_2": 0,
  "armor_option_bossatk_2": 0,
  "armor_option_atk_2": 0,
  "armor_option_s_cool_2": 0,
  "armor_option_per_2": 0,
  "armor_atk_3": 0,
  "armor_upatk_3": 0,
  "armor_gem_3": 0,
  "armor_option_name_3": "없음",
  "armor_option_info_3": "옵션이 존재하지 않습니다. '*옵션 뽑기 (일반/고급)으로, 옵션을 뽑아보세요!'",
  "armor_option_hp_3": 0,
  "armor_option_mp_3": 0,
  "armor_option_def_3": 0,
  "armor_option_bossatk_3": 0,
  "armor_option_atk_3": 0,
  "armor_option_s_cool_3": 0,
  "armor_option_per_3": 0,
  "inv_armor_frag_1": 0,
  "inv_armor_frag_2": 0,
  "inv_armor_frag_3": 0,
  "inv_armor_frag_4": 0
      };
      savePlayer(playerdata, sender);
      replier.reply("회원가입 완료!\n\"*내정보\"를 입력하여 " + sender + "님의 정보를 확인하세요.");
    }
    return;
  }


if(user.name === undefined){
    return;
}
//유저의 name 속성이 정의되지 않았다면, 즉 가입한 유저(플레이어)가 아니라면 아래의 코드는 무시됨.


setCurr(user);


  if (msg === "*내정보") {
    if(user.pickaxe_level == "MAX"){
      a = makeBar(user.pickaxe_over_Exp, user.pickaxe_over_Expmax, 10)
      b = Math.floor(user.pickaxe_over_Exp)
      c = user.pickaxe_over_Expmax
    }
    if(user.pickaxe_level !== "MAX"){
      a = makeBar(user.pickaxe_Exp, user.pickaxe_Expmax, 10)
      b = Math.floor(user.pickaxe_Exp)
      c = user.pickaxe_Expmax
    }
    replier.reply([
      "[ " + sender + "님의 정보 ]",
      "- " + user.achieve_use + " -",
      "[ " + user.work_name + " / 전직 : " + user.work_level + "차 ]",
      "",
      "",
      "Lv. " + user.level,
      "장비 Lv. " + ((user.armor_level_u + user.armor_level_1) / 2) + "\n(갑옷 Lv. " + user.armor_level_u + " / 무기 Lv. " + user.armor_level_1 + ")",
      "",
      "EXP : " + user.Exp + " / " + user.Expmax,
      "[ " + makeBar(user.Exp, user.Expmax, 10) + " ]",
      "",
      "HP : " + user.Rhp + " / " + user.Rhpmax,
      "[ " + makeBar(user.Rhp, user.Rhpmax, 10) + " ]",
      "",
      "MP : " + user.Rmp + " / " + user.Rmpmax,
      "[ " + makeBar(user.Rmp, user.Rmpmax, 10) + " ]",
      "",
      "ATK (물리) : " + user.Ratk,
      "ATK (마법) : " + user.Rmpatk,
      "",
      "DEF (물리) : " + user.Rprotect,
      "DEF (마법) : " + user.Rmpprotect,
      "",
      user.gold + " G",
      user.superdiamond + " 💎" /*+ FV*/,
      "",
      FV,
      "",
      "직업 숙련도 레벨 : " + user.work_scorelevel,
      "직업 숙련도 : " + user.work_score + " / " + user.work_scoremax,
      "[ " + makeBar(user.work_score, user.work_scoremax, 10) + " ]",
      "",
      "크리티컬 (%) : " + (user.Rcriticalper / 1000) + "%",
      "크리티컬 데미지 : ×" + (user.Rcritical / 10) + "%",
      "",
      "방어 관통 (물리) : " + user.protectx,
      "방어 관통 (마법) : " + user.mpprotectx,
      "",
      /*"레벨퀘스트 진행도 : " + user.quest_level_score + " / " + user.quest_scoremax,
      "[ " + makeBar(user.quest_score, user.quest_scoremax, 10) + " ]",
      "",*/
      "- " + user.pickaxe_over_name + "곡괭이 정보 -\n일반 Lv " + user.pickaxe_level + " / 진화 Lv " + user.pickaxe_over_level + "\nEXP : " + b + " / " + c + "\n[" + a + "]\n\n레벨 " + user.pickaxe_level + " 곡괭이 확률 정보 [단위 : %]\n흙 : " + (user.pickaxe_dirt / 100) + "\n돌 : " + (user.pickaxe_stone / 100) + "\n석탄 : " + (user.pickaxe_coal / 100) + "\n철광석 : " + (user.pickaxe_iron / 100) + "\n은 : " + (user.pickaxe_silver / 100) + "\n금 : " + (user.pickaxe_gold / 100) + "\n크리스탈 : " + (user.pickaxe_cristal / 100) + "\n다이아몬드 ☆ : " + (user.pickaxe_diamond / 100),
      "",
      " - 상태이상 정보 -",
      "출혈 : " + user.blood + " 단계",
      "",
      "",
      "",
      "··· 명령어는 채팅에 \"*명령어\"를 입력하여 확인해보세요!"
    ].join('\n'));
  }


  if(msg == "*명령어"){
    replier.reply("[명령어 목록입니다.]\n" + "\u200b".repeat(500) + "\n*내정보 / 정보를 확인합니다.\n\n*스탯 / 스탯 정보를 확인합니다.\n\n*스탯 올리기 (스탯명) / 해당 스탯을 증가시킵니다.\n\n*스탯 목록 / 스탯포인트의 종류와 능력을 확인합니다.\n\n*메인퀘스트 / 메인스토리를 진행합니다. (준비중)\n\n*인벤토리 / 내 인벤토리를 확인합니다.\n\n*조합법 / 아이템 조합법을 확인합니다.\n\n*조합법 (조합 id) / 해당 아이템의 상세한 조합법을 확인합니다.\n\n*장소 / 장소목록을 확인합니다.\n\n*장소 이동 (장소 id) / 해당장소로 이동합니다.\n\n*사냥 / 사냥할 몬스터 목록을 확인합니다.\n\n*사냥 (몬스터id) / 해당 몬스터와의 전투를 시작합니다."
     + "\n\n*공격 / 몬스터를 공격합니다.\n\n*회복 / HP 회복을 시작합니다.\n\n*행동 취소 / 회복, 전투가 모두 취소됩니다.\n\n*상점 / 상점을 오픈합니다.\n\n*캐시상점 / 캐시상점을 오픈합니다. (준비중)\n\n*등급 / 현재 시즌의 티어와 보상을 확인합니다.\n\n*갑옷 / 갑옷 정보를 확인합니다.\n\n*무기 / 무기 정보를 확인합니다.\n\n*갑옷 제작 / 갑옷 제작 레시피를 확인합니다.\n\n*무기 제작 / 무기 제작 레시피를 확인합니다.\n\n*랭킹 레벨 / 유저들의 레벨 순위를 확인합니다.");
  }
 
  if(msg == "*스탯"){
    replier.reply("[" + sender + "님의 스탯 정보]\n\n" + FV + "\n\n잔여 스탯포인트 : " + user.statpoint + "\n\n\n체력 스탯 : " + user.statpoint_hp + "\n\n마나 스탯 : " + user.statpoint_mp + "\n\n공격 스탯 : " + user.statpoint_atk + "\n\n마력 스탯 : " + user.statpoint_mpatk + "\n\n방어 스탯 : " + user.statpoint_protect + "\n\n마법방어 스탯 : " + user.statpoint_mpprotect + "\n\n크리티컬 스탯 : " + user.statpoint_critical + "\n\n\n*스탯 올리기 (스탯명)으로, 스탯을 올리실 수 있습니다.\n*스탯 목록 으로, 각 스탯들의 능력을 확인하세요!\n스탯 초기화는 최초 1회 무료이며, 이후부터 캐시를 사용해야합니다.");
  }
  
  if(msg == "*스탯 올리기 체력" && user.statpoint_up !== true){
    replier.reply("올릴 체력 스탯을 숫자로 적어주세요.");
    user.statpoint_up = true;
    user.statpoint_hp_up = true;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if(msg == "*스탯 올리기 마나" && user.statpoint_up !== true){
    replier.reply("올릴 마나 스탯을 숫자로 적어주세요.");
    user.statpoint_up = true;
    user.statpoint_mp_up = true;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if(msg == "*스탯 올리기 공격" && user.statpoint_up !== true){
    replier.reply("올릴 공격 스탯을 숫자로 적어주세요.");
    user.statpoint_up = true;
    user.statpoint_atk_up = true;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if(msg == "*스탯 올리기 마력" && user.statpoint_up !== true){
    replier.reply("올릴 마력 스탯을 숫자로 적어주세요.");
    user.statpoint_up = true;
    user.statpoint_mpatk_up = true;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if(msg == "*스탯 올리기 방어" && user.statpoint_up !== true){
    replier.reply("올릴 방어 스탯을 숫자로 적어주세요.\n\n*단, 방어 수치는 일반 사냥터에서 사용되지 않습니다. 취소하시려면 '0'을 쳐주세요 !");
    user.statpoint_up = true;
    user.statpoint_protect_up = true;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if(msg == "*스탯 올리기 마법방어" && user.statpoint_up !== true){
    replier.reply("올릴 마법방어 스탯을 숫자로 적어주세요.\n\n*단, 마법방어 수치는 일반 사냥터에서 사용되지 않습니다. 취소하시려면 '0'을 쳐주세요 !");
    user.statpoint_up = true;
    user.statpoint_mpprotect_up = true;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if(msg == "*스탯 올리기 크리티컬" && user.statpoint_up !== true){
    replier.reply("올릴 크리티컬 스탯을 숫자로 적어주세요.");
    user.statpoint_up = true;
    user.statpoint_critical_up = true;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if(!isNaN(msg) && user.statpoint_up == true){
    a = Math.abs(parseInt(msg));
    if(user.statpoint >= a){
      if(user.statpoint_hp_up == true){
        replier.reply("체력 스탯을 " + msg + "만큼 올렸습니다.");
        user.statpoint -= a;
        user.statpoint_up = false;
        user.statpoint_hp_up = false;
        user.statpoint_hp += a;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      }
      else if(user.statpoint_mp_up == true){
        replier.reply("마나 스탯을 " + msg + "만큼 올렸습니다.");
        user.statpoint -= a;
        user.statpoint_up = false;
        user.statpoint_mp_up = false;
        user.statpoint_mp += a;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      }
      else if(user.statpoint_atk_up == true){
        replier.reply("공격 스탯을 " + msg + "만큼 올렸습니다.");
        user.statpoint -= a;
        user.statpoint_up = false;
        user.statpoint_atk_up = false;
        user.statpoint_atk += a;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      }
      else if(user.statpoint_mpatk_up == true){
        replier.reply("마력 스탯을 " + msg + "만큼 올렸습니다.");
        user.statpoint -= a;
        user.statpoint_up = false;
        user.statpoint_mpatk_up = false;
        user.statpoint_mpatk += a;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      }
      else if(user.statpoint_protect_up == true){
        if((a + user.statpoint_protect) > user.level){
          replier.reply("현재 " + sender + "님이 보유하실 수 있는 방어/마법방어 스탯은 " + user.level + "입니다.");
          user.statpoint_up = false;
          user.statpoint_protect_up = false;
          FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
        }
        else {
        replier.reply("방어 스탯을 " + msg + "만큼 올렸습니다.");
        user.statpoint -= a;
        user.statpoint_up = false;
        user.statpoint_protect_up = false;
        user.statpoint_protect += a;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      }
      }
      else if(user.statpoint_mpprotect_up == true){
        if((a + user.statpoint_mpprotect) > user.level){
          replier.reply("현재 " + sender + "님이 보유하실 수 있는 방어/마법방어 스탯은 " + user.level + "입니다.");
          statpoint_up = false;
          statpoint_mpprotect_up = false;
          FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
        }
        else {
        replier.reply("마법방어 스탯을 " + msg + "만큼 올렸습니다.");
        user.statpoint -= a;
        user.statpoint_up = false;
        user.statpoint_mpprotect_up = false;
        user.statpoint_mpprotect += a;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      }
      }
      else if(user.statpoint_critical_up == true){
        replier.reply("크리티컬 스탯을 " + msg + "만큼 올렸습니다.");
        user.statpoint -= a;
        user.statpoint_up = false;
        user.statpoint_critical_up = false;
        user.statpoint_critical += a;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      }
    }
      else {
        replier.reply("스탯포인트가 부족합니다.");
    }
  }
  
  if(msg == "*스탯 목록"){
    replier.reply("- 스탯 능력 -\n\n체력 : HP + 4\n마나 : MP + 4\n공격 : ATK (물리) + 2\n마력 : ATK (마법) + 2\n방어 : DEF (물리) + 1\n마법방어 : DEF (마법) + 1\n크리티컬 : 크리티컬데미지 + 1.5%p\n크리티컬확률 + 0.035%p");
  }
  
  if (msg == "*랭킹 레벨"){
    rank = java.io.File(PATH + "playerData/").list().map(function(e) {
  return e;
});
    rank.sort(function(a, b) {
  return updatePlayer(b).level - updatePlayer(a).level;
});
    replier.reply("text RPG Season 3 전체 랭킹 (레벨)\n\n" + '​'.repeat(500) + rank.map(function(e, v) {
  return (v + 1) + "위 " + e + "  (Lv." + updatePlayer(e).level + ")";
}).join("\n\n"));
  }
  
  if (msg == "*회복" && user.Rhp < user.Rhpmax && user.heal == false && user.mid == 0) {
    replier.reply("회복 중입니다.\n[" + 90 + "s 소요]");
    user.heal = true;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
    java.lang.Thread.sleep(90000);
    /*replier.reply("회복까지 남은 시간\n\n60 sec");
    if(user.heal == true){
    java.lang.Thread.sleep(15000);
    replier.reply("회복까지 남은 시간\n\n30 sec");
    if(user.heal == true){
    java.lang.Thread.sleep(30000);*/
    replier.reply("HP 회복 완료!");
    if(user.heal == true){
    U = updatePlayer(sender);
    U.heal = false;
    U.hp = user.hpmax;
    U.mp = user.mpmax;
    U.rankscore += 30;
    savePlayer(U, sender);
    //}
    //}
    }
  }
  
  if(msg == "*조합법"){
    replier.reply("\n[조합법 목록]\n\n" + "\u200b".repeat(500) + "\n[]안에 있는 아이템은 조합이 끝난 결과아이템입니다.\n\n조합법 상세정보는 '조합법 (id)'로 확인하세요!\n\n\n[달빛 가루] (id 1)\n\n[하급 돌파석] (id 2)\n\n[달빛을 머금은 달 파편] (id 3)\n\n[중급 돌파석] (id 4)\n\n[붉은 강화석 수정] (id 5)\n\n[중급 HP 물약] (id 6)\n\n[지식의 고서] (id 10)\n\n[강력한 광휘의 고서] (id 11)");
  }
  
  if(msg == "*조합법 1"){
    replier.reply("[조합법 : 달빛 가루]\n\n<재료>\n달빛 흔적 × 5\n100 G\n\n조합 방법 : *조합 (id) (갯수(1/10/100))\nex) *조합 1 1");
  }
  
  if(msg == "*조합 1 1"){
    if(user.inv_moon_1 >= 5 && user.gold >= 100){
      replier.reply("달빛 가루 × 1 조합 성공!");
      user.inv_moon_1 -= 5;
      user.gold -= 100;
      user.inv_moon_2 += 1;
      user.rankscore += 2;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합 1 10"){
    if(user.inv_moon_1 >= 50 && user.gold >= 1000){
      replier.reply("달빛 가루 × 10 조합 성공!");
      user.inv_moon_1 -= 50;
      user.gold -= 1000;
      user.inv_moon_2 += 10;
      user.rankscore += 20;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합 1 100"){
    if(user.inv_moon_1 >= 500 && user.gold >= 10000){
      replier.reply("달빛 가루 × 100 조합 성공!");
      user.inv_moon_1 -= 500;
      user.gold -= 10000;
      user.inv_moon_2 += 100;
      user.rankscore += 200;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합법 2"){
    replier.reply("[조합법 : 하급 돌파석]\n\n<재료>\n하급 제련석 × 1\n달빛 가루 × 1\n보라빛 마법석 × 1\n100 G\n\n조합 방법 : *조합 (id) (갯수(1/10/100))\nex) *조합 1 1");
  }
  
  if(msg == "*조합 2 1"){
    if(user.inv_jstone_s >= 1 && user.inv_purplestone >= 1 && user.inv_moon_2 >= 1 && user.gold >= 100){
      replier.reply("하급 돌파석 × 1 조합 성공!");
      user.inv_armor_frag_1 += 1;
      user.inv_jstone_s -= 1;
      user.inv_purplestone -= 1;
      user.inv_moon_2 -= 1;
      user.gold -= 100;
      user.rankscore += 5;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합 2 10"){
    if(user.inv_jstone_s >= 10 && user.inv_purplestone >= 10 && user.inv_moon_2 >= 10 && user.gold >= 1000){
      replier.reply("하급 돌파석 × 10 조합 성공!");
      user.inv_armor_frag_1 += 10;
      user.inv_jstone_s -= 10;
      user.inv_purplestone -= 10;
      user.inv_moon_2 -= 10;
      user.gold -= 1000;
      user.rankscore += 50;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합 2 100"){
    if(user.inv_jstone_s >= 100 && user.inv_purplestone >= 100 && user.inv_moon_2 >= 100 && user.gold >= 10000){
      replier.reply("하급 돌파석 × 100 조합 성공!");
      user.inv_armor_frag_1 += 100;
      user.inv_jstone_s -= 100;
      user.inv_purplestone -= 100;
      user.inv_moon_2 -= 100;
      user.gold -= 10000;
      user.rankscore += 500;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합법 3"){
    replier.reply("[조합법 : 달빛을 머금은 달 파편]\n\n<재료>\n달빛 가루 × 5\n200 G\n\n조합 방법 : *조합 (id) (갯수(1/10/100))\nex) *조합 1 1");
  }
  
  if(msg == "*조합 3 1"){
    if(user.inv_moon_2 >= 5 && user.gold >= 200){
      replier.reply("달빛을 머금은 달 파편 × 1 조합 성공!");
      user.inv_moon_2 -= 5;
      user.gold -= 200;
      user.inv_moon_3 += 1;
      user.rankscore += 4;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합 3 10"){
    if(user.inv_moon_2 >= 50 && user.gold >= 2000){
      replier.reply("달빛을 머금은 달 파편 × 10 조합 성공!");
      user.inv_moon_2 -= 50;
      user.gold -= 2000;
      user.inv_moon_3 += 10;
      user.rankscore += 40;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합 3 100"){
    if(user.inv_moon_2 >= 500 && user.gold >= 20000){
      replier.reply("달빛을 머금은 달 파편 × 100 조합 성공!");
      user.inv_moon_2 -= 500;
      user.gold -= 20000;
      user.inv_moon_3 += 100;
      user.rankscore += 400;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합법 4"){
    replier.reply("[조합법 : 중급 돌파석]\n\n<재료>\n중급 제련석 × 1\n달빛을 머금은 달 파편 × 1\n보라빛 마법석 × 2\n200 G\n\n조합 방법 : *조합 (id) (갯수(1/10/100))\nex) *조합 1 1");
  }
  
  if(msg == "*조합 4 1"){
    if(user.inv_jstone_m >= 1 && user.inv_purplestone >= 2 && user.inv_moon_3 >= 1 && user.gold >= 200){
      replier.reply("중급 돌파석 × 1 조합 성공!");
      user.inv_armor_frag_2 += 1;
      user.inv_jstone_m -= 1;
      user.inv_purplestone -= 2;
      user.inv_moon_3 -= 1;
      user.gold -= 200;
      user.rankscore += 10;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합 4 10"){
    if(user.inv_jstone_m >= 10 && user.inv_purplestone >= 20 && user.inv_moon_3 >= 10 && user.gold >= 2000){
      replier.reply("중급 돌파석 × 10 조합 성공!");
      user.inv_armor_frag_2 += 10;
      user.inv_jstone_m -= 10;
      user.inv_purplestone -= 20;
      user.inv_moon_3 -= 10;
      user.gold -= 2000;
      user.rankscore += 100;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합 4 100"){
    if(user.inv_jstone_m >= 100 && user.inv_purplestone >= 200 && user.inv_moon_3 >= 100 && user.gold >= 20000){
      replier.reply("중급 돌파석 × 100 조합 성공!");
      user.inv_armor_frag_2 += 100;
      user.inv_jstone_m -= 100;
      user.inv_purplestone -= 200;
      user.inv_moon_3 -= 100;
      user.gold -= 20000;
      user.rankscore += 1000;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합법 5"){
    replier.reply("[조합법 : 붉은 강화석 수정]\n\n<재료>\n강화석 결정 × 2\n보라빛 마법석 × 1\n\n조합 방법 : *조합 (id) (갯수(1/10/100))\nex) *조합 1 1");
  }
  
  if(msg == "*조합 5 1"){
    if(user.inv_stone2 >= 2 && user.inv_purplestone >= 1){
      replier.reply("붉은 강화석 수정 × 1 조합 성공!");
      user.powerstone += 1;
      user.inv_stone2 -= 2;
      user.inv_purplestone -= 1;
      user.rankscore += 3;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합 5 10"){
    if(user.inv_stone2 >= 20 && user.inv_purplestone >= 10){
      replier.reply("붉은 강화석 수정 × 10 조합 성공!");
      user.powerstone += 10;
      user.inv_stone2 -= 20;
      user.inv_purplestone -= 10;
      user.rankscore += 30;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합 5 100"){
    if(user.inv_stone2 >= 200 && user.inv_purplestone >= 100){
      replier.reply("붉은 강화석 수정 × 100 조합 성공!");
      user.powerstone += 100;
      user.inv_stone2 -= 200;
      user.inv_purplestone -= 100;
      user.rankscore += 300;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합법 6"){
    replier.reply("[조합법 : 중급 HP 물약]\n\n<재료>\n하급 HP 물약 × 2\n1,000 G\n\n조합 방법 : *조합 (id) (갯수(1/10/100))\nex) *조합 1 1");
  }
  
  if(msg == "*조합 6 1"){
    if(user.inv_hp_s >= 2 && user.gold >= 1000){
      replier.reply("중급 HP 물약 × 1 조합 성공!");
      user.inv_hp_s -= 2;
      user.gold -= 1000;
      user.inv_hp_m += 1;
      user.rankscore += 3;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합 6 10"){
    if(user.inv_hp_s >= 20 && user.gold >= 10000){
      replier.reply("중급 HP 물약 × 10 조합 성공!");
      user.inv_hp_s -= 20;
      user.gold -= 10000;
      user.inv_hp_m += 10;
      user.rankscore += 3;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합 6 100"){
    if(user.inv_hp_s >= 200 && user.gold >= 100000){
      replier.reply("중급 HP 물약 × 100 조합 성공!");
      user.inv_hp_s -= 200;
      user.gold -= 100000;
      user.inv_hp_m += 100;
      user.rankscore += 300;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합법 10"){
    replier.reply("[조합법 : 지식의 고서]\n\n<재료>\n강화석 결정 × 50\n\n조합 방법 : *조합 (id) (갯수(1/10/100))\nex) *조합 1 1");
  }
  
  if(msg == "*조합 10 1"){
    if(user.inv_stone2 >= 50){
      replier.reply("지식의 고서 × 1 조합 성공!");
      user.inv_stone2 -= 50;
      user.inv_book_1 += 1;
      user.rankscore += 5;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합 10 10"){
    if(user.inv_stone2 >= 500){
      replier.reply("지식의 고서 × 10 조합 성공!");
      user.inv_stone2 -= 500;
      user.inv_book_1 += 10;
      user.rankscore += 50;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합 10 100"){
    if(user.inv_stone2 >= 5000){
      replier.reply("지식의 고서 × 100 조합 성공!");
      user.inv_stone2 -= 5000;
      user.inv_book_1 += 100;
      user.rankscore += 500;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합법 11"){
    replier.reply("[조합법 : 강력한 광휘의 고서]\n\n<재료>\n지식의 고서 × 3\n10,000 G\n\n조합 방법 : *조합 (id) (갯수(1/10/100))\nex) *조합 1 1");
  }
  
  if(msg == "*조합 11 1"){
    if(user.inv_book_1 >= 3){
      replier.reply("강력한 광휘의 고서 × 1 조합 성공!");
      user.inv_book_1 -= 3;
      user.gold -= 10000;
      user.inv_book_2 += 1;
      user.rankscore += 8;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*조합 11 10"){
    if(user.inv_book_1 >= 30){
      replier.reply("강력한 광휘의 고서 × 10 조합 성공!");
      user.inv_book_1 -= 30;
      user.gold -= 100000;
      user.inv_book_2 += 10;
      user.rankscore += 80;
      savePlayer(user, sender);
    }
    else{
      replier.reply("재료가 부족합니다.");
    }
  }
  
  if(msg == "*등급"){
    replier.reply("[2022 2nd Season]\n시즌 기간 : ~ 7/15\n\n" + sender + "님의 랭크 정보\n\n        " + user.rank_tier + "\n" + user.rankscore + "CP / " + user.rankscoremax + " CP\n[" + makeBar(user.rankscore, user.rankscoremax, 10) + "]");
  }
  
  if(msg == "*인벤토리"){
    replier.reply("\n" + sender + "님의 인벤토리\n\n" + "\u200b".repeat(500) + "\n\n몬스터의 잔해 (id 1) × " + user.inv_monster + "\n\n\n하급 HP 물약 (id 2) × " + user.inv_hp_s + "\n중급 HP 물약 (id 3) × " + user.inv_hp_m + "\n상급 HP 물약 (id 4) × " + user.inv_hp_l + "\n\n하급 MP 물약 (id 5) × " + user.inv_mp_s + 
    "\n중급 MP 물약 (id 6) × " + user.inv_mp_m + "\n상급 MP 물약 (id 7) × " + user.inv_mp_l + "\n\n\n종이 조각 (id 51) × " + user.inv_paper + "\n보라빛 마법석 (id 52) × " + user.inv_purplestone + "\n황금빛 마법석 (id 53) × " + user.inv_goldstone + "\n자수정 광석 (id 54) × " + user.inv_purple_stone + "\n세공된 자수정 (id 55) × " + user.inv_purple + "\n토파즈 광석 (id 56) × " + user.inv_topaz_stone + "\n세공된 토파즈 (id 57) × " + user.inv_topaz + "\n\n강화석 결정 (id 59) × " + user.inv_stone2 + "\n붉은 강화석 수정 (id 60) × " + user.powerstone + "\n하급 제련석 (id 61) × " + user.inv_jstone_s + "\n중급 제련석 (id 62) × " + user.inv_jstone_m + "\n상급 제련석 (id 63) × " + user.inv_jstone_l + "\n성급 제련석 (id 64) × " + user.inv_jstone_sl + "\n하급 돌파석 (id 71) × " + user.inv_armor_frag_1 + "\n중급 돌파석 (id 72) × " + user.inv_armor_frag_2 + "\n상급 돌파석 (id 73) × " + user.inv_armor_frag_3 + "\n성급 돌파석 (id 74) × " + user.inv_armor_frag_4 + "\n\n\n흙 (id 31) × " + user.inv_dirt + "\n돌 (id 32) × " + user.inv_stone + "\n석탄 (id 33) × " + user.inv_coal + "\n철광석 (id 34) × " + user.inv_iron + "\n은 (id 35) × " + user.inv_silver + "\n금 (id 36) × " + user.inv_gold + "\n크리스탈 (id 37) × " + 
    user.inv_cristal +  "\n다이아몬드 (id 38) × " + user.inv_diamond + "\n언옵타늄 (id 39) × " + user.inv_unob + "\n\n\n달빛 흔적 (id 81) × " + user.inv_moon_1 + "\n달빛 가루 (id 82) × " + user.inv_moon_2 + "\n달빛을 머금은 달 파편 (id 83) × " + user.inv_moon_3 + "\n빛나는 달빛 수정 (id 84) × " + user.inv_moon_4 + "\n눈부신 월광의 심장 (id 85) × " + user.inv_moon_5 + "\n\n지식의 고서 (id 111) × " + user.inv_book_1 + "\n강력한 광휘의 고서 (id 112) × " + user.inv_book_2 + "\n경이로운 여명의 고서 (id 113) × " + user.inv_book_3 + "\n\n\n시즌 코인 : " + user.season_coin + "\n사냥의 증표 : " + user.inv_event1 + "\n퀘스트의 증표 : " + user.inv_event2 + "\n\n\n레이드 입장 티켓 (id 301) × " + user.inv_go_raid_ticket + "\n최고급이상 확정 옵션부여티켓 (id 302) × " + user.inv_option_epic_ticket + "\n전설급 확정 옵션부여티켓 (id 303) × " + user.inv_option_legend_ticket/* + "\n복주머니 [B] (id 20221) : " + user.inv_event3 + "\n복주머니 [A] (id 20222) : " + user.inv_event4 + "\n복주머니 [S] (id 20223) : " + user.inv_event5 + "\n복주머니 [L] (id 20224) : " + user.inv_event6*/);
  }
  
  if(msg == "*포인트상점"){
    replier.reply(sender + "님의 포인트 (P) : " + user.season_score + "\n\n\n\n[ ! ] 실물상품은 주기적으로 교체됩니다!\n최근 갱신일 : 05/09\n\n\n[RA] 해피머니 상품권 (3,000￦)\n잔여 수량 : 1\n판매 가격 : 4,500 P <25% 할인>\n\n\n[RB] 프랑스 프리미엄 마카롱 12pcs (택배배송 / 12,800₩ 상당)\n잔여 수량 : 1\n판매 가격 : 25,600 P\n\n\n[RC] 던킨도너츠 버라이어티 팩 10EA (17,000\)\n잔여 수량 : 1\n판매 가격 : 34,000 P\n\n\n*구매 (번호)로 구매가 가능합니다.");
  }
  
  if(msg == "*레이드상점"){
      replier.reply(sender + "님의 레이드 코인 (R.C) : " + user.raid_coin + "\n" + "\u200b".repeat(500) + "\n모든 상품은 1개씩만 구매 가능합니다.\nex) *구매 3001 로 3001번 아이템이 구매됩니다.\n\n\n\n힘의 가루 박스(1 ~ 10개 등장) (id 3001)\n구매가격 : 150 R.C\n\n\n하급 제련석 박스 (10 ~ 30개 등장) (id 3002)\n구매가격 : 200 R.C\n\n\n중급 제련석 박스 (10 ~ 30개 등장) (id 3003)\n구매가격 : 400 R.C");//\n\n\n보석 박스 (5 ~ 15개 등장) (id 3004)\n구매가격 : 250 R.C");
  }
  
  if(msg == "*구매 3001" && user.raid_coin !== undefined && user.raid_coin >= 150){
    a = makeRnd(1, 10),
    replier.reply("힘의 가루 박스에서 " + a + "개의 힘의 가루가 드랍됐어요!");
    user.powerstone_s += a;
    user.raid_coin -= 150;
    savePlayer(user, sender);
  }
  
  if(msg == "*구매 3002" && user.raid_coin !== undefined && user.raid_coin >= 200){
    a = makeRnd(10, 30),
    replier.reply("하급 제련석 박스에서 " + a + "개의 하급 제련석이 드랍됐어요!");
    user.inv_jstone_s += a;
    user.raid_coin -= 200;
    savePlayer(user, sender);
  }
  
  if(msg == "*구매 3003" && user.raid_coin !== undefined && user.raid_coin >= 400){
    a = makeRnd(10, 30),
    replier.reply("중급 제련석 박스에서 " + a + "개의 중급 제련석이 드랍됐어요!");
    user.inv_jstone_m += a;
    user.raid_coin -= 400;
    savePlayer(user, sender);
  }
  
  if(msg == "*상점"){
    replier.reply("- 상점 -\n\n" + "\u200b".repeat(500) + "\n구매방법 : *구매 (id) (갯수 (1, 10, 100 가능/장비는 1 가능))\nex) *구매 2 10 -> 하급 HP 물약 10개 구매\n" + "\u200b".repeat(500) + "\n\n하급 HP 물약 (id 2)\n구매가격 : 2,000 G\n판매가격 : 판매불가\n\n하급 MP 물약 (id 5)\n구매가격 : 2,000 G\n판매가격 : 판매불가\n\n보라빛 마법석 (id 8)\n구매가격 : 500 G\n판매가격 : 판매불가");
  }
  
  if(msg == "*구매 2 1"){
    if(user.gold >= 2000){
    replier.reply("하급 HP 물약을 1개 구매했습니다.");
    user.gold -= 2000;
    user.inv_hp_s += 1;
    savePlayer(user, sender);
    }
  }
  
  if(msg == "*구매 2 10"){
    if(user.gold >= 20000){
    replier.reply("하급 HP 물약을 10개 구매했습니다.");
    user.gold -= 20000;
    user.inv_hp_s += 10;
    savePlayer(user, sender);
    }
  }
  
  if(msg == "*구매 2 100"){
    if(user.gold >= 200000){
    replier.reply("하급 HP 물약을 100개 구매했습니다.");
    user.gold -= 200000;
    user.inv_hp_s += 100;
    savePlayer(user, sender);
    }
  }
  
  if(msg == "*구매 999 1"){
    replier.reply("구매완료! 스탯이 초기화됐습니다!!");
    user.statpoint += user.statpoint_hp;
    user.statpoint += user.statpoint_atk;
    user.statpoint += user.statpoint_mp;
    user.statpoint += user.statpoint_mpatk;
    user.statpoint += user.statpoint_protect;
    user.statpoint += user.statpoint_mpprotect;
    user.statpoint += user.statpoint_critical;
    user.statpoint_hp = 0;
    user.statpoint_atk = 0;
    user.statpoint_mp = 0;
    user.statpoint_mpatk = 0;
    user.statpoint_protect = 0;
    user.statpoint_mpprotect = 0;
    user.statpoint_critical = 0;
    savePlayer(user, sender);
  }
  
  if(msg == "*구매 5 1"){
    if(user.gold >= 2000){
    replier.reply("하급 MP 물약을 1개 구매했습니다.");
    user.gold -= 2000;
    user.inv_mp_s += 1;
    savePlayer(user, sender);
    }
  }
  
  if(msg == "*구매 5 10"){
    if(user.gold >= 20000){
    replier.reply("하급 MP 물약을 10개 구매했습니다.");
    user.gold -= 20000;
    user.inv_mp_s += 10;
    savePlayer(user, sender);
    }
  }
  
  if(msg == "*구매 5 100"){
    if(user.gold >= 200000){
    replier.reply("하급 MP 물약을 100개 구매했습니다.");
    user.gold -= 200000;
    user.inv_mp_s += 100;
    savePlayer(user, sender);
    }
  }
  
  if(msg == "*구매 8 1"){
    if(user.gold >= 500){
    replier.reply("보라빛 마법석을 1개 구매했습니다.");
    user.gold -= 500;
    user.inv_purplestone += 1;
    savePlayer(user, sender);
    }
  }
  
  if(msg == "*구매 8 10"){
    if(user.gold >= 5000){
    replier.reply("보라빛 마법석을 10개 구매했습니다.");
    user.gold -= 5000;
    user.inv_purplestone += 10;
    savePlayer(user, sender);
    }
  }
  
  if(msg == "*구매 8 100"){
    if(user.gold >= 50000){
    replier.reply("보라빛 마법석을 100개 구매했습니다.");
    user.gold -= 50000;
    user.inv_purplestone += 100;
    savePlayer(user, sender);
    }
  }
 
  if(msg == "*사용 2" && user.inv_hp_s > 0){
    a = Math.round(user.Rhpmax / 5);
    user.hp += a;
    user.inv_hp_s -= 1;
    savePlayer(user, sender);
    replier.reply("하급 HP 물약을 사용했습니다.\n\n증가한 HP : " + a);
    if(user.hp > user.hpmax){
      user.hp = user.hpmax;
      savePlayer(user, sender);
    }
  }
  
  if(msg == "*사용 3" && user.inv_hp_m > 0){
    a = Math.round(user.Rhpmax / 2);
    user.hp += a;
    user.inv_hp_m -= 1;
    savePlayer(user, sender);
    replier.reply("중급 HP 물약을 사용했습니다.\n\n증가한 HP : " + a);
    if(user.hp > user.hpmax){
      user.hp = user.hpmax;
      savePlayer(user, sender);
    }
  }
  
  if(msg == "*사용 4" && user.inv_hp_l > 0){
    a = Math.round(user.Rhpmax);
    user.hp += a;
    user.inv_hp_l -= 1;
    savePlayer(user, sender);
    replier.reply("상급 HP 물약을 사용했습니다.\n\n증가한 HP : " + a);
    if(user.hp > user.hpmax){
      user.hp = user.hpmax;
      savePlayer(user, sender);
    }
  }
  
  if(msg == "*사용 5" && user.inv_mp_s > 0){
    a = Math.round(user.Rmpmax / 5);
    user.mp += a;
    user.inv_mp_s -= 1;
    savePlayer(user, sender);
    replier.reply("하급 MP 물약을 사용했습니다.\n\n증가한 MP : " + a);
    if(user.mp > user.mpmax){
      user.mp = user.mpmax;
      savePlayer(user, sender);
    }
  }
  
  if(msg == "*사용 111"){
    if(user.inv_book_1 >= 1){
      if(user.armor_book_u == 10){
        replier.reply("지식의 고서를 사용했습니다!");
        user.armor_book_u = 13;
        user.inv_book_1 -= 1;
        savePlayer(user, sender);
      }
      else{
        replier.reply("고서는 1강화당 1번씩만 사용이 가능합니다.");
      }
    }
    else{
      replier.reply("아이템이 부족합니다.");
    }
  }
  
  if(msg == "*사용 112"){
    if(user.inv_book_2 >= 1){
      if(user.armor_book_u == 10){
        replier.reply("강력한 광휘의 고서를 사용했습니다!");
        user.armor_book_u = 20;
        user.inv_book_2 -= 1;
        savePlayer(user, sender);
      }
      else{
        replier.reply("고서는 1강화당 1번씩만 사용이 가능합니다.");
      }
    }
    else{
      replier.reply("아이템이 부족합니다.");
    }
  }
  
  if(msg == "*사용 113"){
    if(user.inv_book_3 >= 1){
      if(user.armor_book_u == 10){
        replier.reply("경이로운 여명의 고서를 사용했습니다!!");
        user.armor_book_u = 40;
        user.inv_book_3 -= 1;
        savePlayer(user, sender);
      }
      else{
        replier.reply("고서는 1강화당 1번씩만 사용이 가능합니다.");
      }
    }
    else{
      replier.reply("아이템이 부족합니다.");
    }
  }
  
  if(msg == "*슬롯머신"){
    replier.reply("아래 슬롯머신 목록을 확인하시고,\n*슬롯머신 (id)로 슬롯머신을 돌려보세요!\n\n\nid 1 / 5슬롯머신\n-> 5개의 슬롯에 각각 3개의 색이 등장합니다! 모든 슬롯에 있는 색이 일치하면 복주머니 [A] × 5를 드려요!\n게임 비용 : 50 시즌코인");
  }
  
  if(msg == "*슬롯머신 1" && user.heal == false && user.season_coin >= 50){
    a = ["🟡","🟢","🟣"][Math.floor(Math.random() * 3)];
    b = ["🟡","🟢","🟣"][Math.floor(Math.random() * 3)];
    c = ["🟡","🟢","🟣"][Math.floor(Math.random() * 3)];
    d = ["🟡","🟢","🟣"][Math.floor(Math.random() * 3)];
    e = ["🟡","🟢","🟣"][Math.floor(Math.random() * 3)];
    if(a == b && b == c && c == d && d == e && e == a){
    replier.reply("5슬롯머신을 돌렸어요!\n\n[" + a + "] [" + b + "] [" + c + "] [" + d + "] [" + e + "]\n\n\n잭팟! 복주머니 [A] × 5 획득!!");
    user.season_coin -= 50;
    user.inv_event4 += 5;
    savePlayer(user, sender);
    }
    else{
    replier.reply("5슬롯머신을 돌렸어요!\n\n[" + a + "] [" + b + "] [" + c + "] [" + d + "] [" + e + "]\n\n\n아쉽게도 꽝이네요...");
    user.season_coin -= 50;
    savePlayer(user, sender);
    }
  }
  
  if(msg == "*갑옷 제작"){
    replier.reply("<갑옷 레시피>\n" + "\u200b".repeat(500) + "\n\n*갑옷 제작 (id)로 갑옷을 만드실 수 있습니다!\n\n\n■ ID 1 / [TIER 1] 빛 바랜 천 갑옷 ■\n필요 갑옷레벨 : 0 / 필요 유저레벨 : 1\n\n<재료>\n-> 1 💎\n-> 1,000 G\n\n\n■ ID 2 / [TIER 1] 가죽 갑옷 ■\n필요 갑옷레벨 : 15 / 필요 유저레벨 : 30\n\n<재료>\n-> 1 💎\n-> 3,000 G\n-> 하급 돌파석 × 10\n\n\n\n■ ID 3 / [TIER 1] 견고한 가죽 갑옷 ■\n필요 갑옷레벨 : 25 / 필요 유저레벨 : 60\n\n<재료>\n-> 1 💎\n-> 5,000 G\n-> 중급 돌파석 × 3\n\n\n■ ID 4 / [TIER 1] 황동 경장갑 ■\n필요 갑옷레벨 : 40 / 필요 유저레벨 : 100\n\n<재료>\n-> 1 💎\n-> 10,000 G\n-> 하급 돌파석 × 20\n\n\n■ ID 5 / [TIER 1] 텅스탠 사슬갑 ■\n필요 갑옷레벨 : 50 / 필요 유저레벨 : 150\n\n<재료>\n-> 1 💎\n-> 20,000 G\n-> 하급 돌파석 × 25\n-> 중급 돌파석 × 5\n-> 철 × 20");
  }
 
  if(msg == "*갑옷 제작 1" && user.armor_id_u == 0){
    if(user.armor_level_u >= 0 && user.level >= 1){
      if(user.gold >= 1000 && user.superdiamond >= 1){
        replier.reply("빛 바랜 천 갑옷을 제작했습니다!\n\n*갑옷 으로 확인해보세요!");
        user.armor_name_u = "빛 바랜 천 갑옷";
        user.armor_up_u = 0;
        user.gold -= 1000;
        user.superdiamond -= 1;
        user.armor_id_u = 1;
        user.armor_level_u = 0;
        user.armor_hp_u = 33;
        user.armor_uphp_u = 6;
        user.armor_def_u = 3;
        user.armor_updef_u = 1;
        user.armor_mp_u = 0;
        user.armor_upmp_u = 0;
        user.armor_atk_u = 0;
        user.armor_upatk_u = 1;
        user.armor_stone_u = 1;
        user.armor_gem_u = 0;
        user.armor_percent_u = 1000;
        user.armor_end_u = 0;
        savePlayer(user, sender);
      }
      else {
        replier.reply("재료가 부족합니다.");
      }
    }
    else {
      replier.reply("레벨이 부족합니다.\n\n필요 갑옷레벨 : 0\n필요 유저레벨 : 1");
    }
  }
  
  if(msg == "*갑옷 제작 2" && user.armor_id_u == 1){
    if(user.armor_level_u >= 15 && user.level >= 30){
      if(user.gold >= 3000 && user.superdiamond >= 1 && user.inv_armor_frag_1 >= 10){
        replier.reply("가죽 갑옷을 제작했습니다!\n\n*갑옷 으로 확인해보세요!");
        user.armor_name_u = "가죽 갑옷";
        user.armor_up_u -= 10;
        user.gold -= 3000;
        user.superdiamond -= 1;
        user.inv_armor_frag_1 -= 10;
        user.armor_hp_u += 30;
        user.armor_id_u = 2;
        user.armor_stone_u = 1;
        user.armor_gem_u = 0;
        user.armor_percent_u = 700;
        user.armor_end_u = 2;
        savePlayer(user, sender);
      }
      else {
        replier.reply("재료가 부족합니다.");
      }
    }
    else {
      replier.reply("레벨이 부족합니다.\n\n필요 갑옷레벨 : 15\n필요 유저레벨 : 30");
    }
  }
  
  if(msg == "*갑옷 제작 3" && user.armor_id_u == 2){
    if(user.armor_level_u >= 25 && user.level >= 60){
      if(user.gold >= 5000 && user.superdiamond >= 1 && user.inv_armor_frag_2 >= 3){
        replier.reply("견고한 가죽 갑옷을 제작했습니다!\n\n*갑옷 으로 확인해보세요!");
        user.armor_name_u = "견고한 가죽 갑옷";
        user.armor_up_u -= 10;
        user.gold -= 5000;
        user.superdiamond -= 1;
        user.inv_armor_frag_2 -= 3;
        user.armor_hp_u += 50;
        user.armor_id_u = 3;
        user.armor_stone_u = 1;
        user.armor_gem_u = 0;
        user.armor_percent_u = 700;
        user.armor_end_u = 2;
        savePlayer(user, sender);
      }
      else {
        replier.reply("재료가 부족합니다.");
      }
    }
    else {
      replier.reply("레벨이 부족합니다.\n\n필요 갑옷레벨 : 25\n필요 유저레벨 : 60");
    }
  }
  
  if(msg == "*갑옷 제작 4" && user.armor_id_u == 3){
    if(user.armor_level_u >= 40 && user.level >= 100){
      if(user.gold >= 10000 && user.superdiamond >= 1 && user.inv_armor_frag_1 >= 20){
        replier.reply("황동 경장갑을 제작했습니다!\n\n*갑옷 으로 확인해보세요!");
        user.armor_name_u = "황동 경장갑";
        user.armor_up_u -= 10;
        user.gold -= 10000;
        user.superdiamond -= 1;
        user.inv_armor_frag_1 -= 20;
        user.armor_hp_u += 80;
        user.armor_id_u = 4;
        user.armor_stone_u = 2;
        user.armor_gem_u = 0;
        user.armor_percent_u = 500;
        user.armor_end_u = 3;
        savePlayer(user, sender);
      }
      else {
        replier.reply("재료가 부족합니다.");
      }
    }
    else {
      replier.reply("레벨이 부족합니다.\n\n필요 갑옷레벨 : 40\n필요 유저레벨 : 100");
    }
  }
  
  if(msg == "*갑옷 제작 5" && user.armor_id_u == 4){
    if(user.armor_level_u >= 50 && user.level >= 150){
      if(user.gold >= 20000 && user.superdiamond >= 1 && user.inv_armor_frag_1 >= 25 && user.inv_armor_frag_2 >= 5 && user.inv_iron >= 20){
        replier.reply("텅스탠 사슬갑을 제작했습니다!\n\n*갑옷 으로 확인해보세요!");
        user.armor_name_u = "텅스탠 사슬갑";
        user.armor_up_u -= 10;
        user.gold -= 20000;
        user.superdiamond -= 1;
        user.inv_armor_frag_1 -= 25;
        user.inv_armor_frag_2 -= 5;
        user.inv_iron -= 20;
        user.armor_hp_u += 115;
        user.armor_id_u = 5;
        user.armor_stone_u = 2;
        user.armor_gem_u = 0;
        user.armor_percent_u = 500;
        user.armor_end_u = 3;
        savePlayer(user, sender);
      }
      else {
        replier.reply("재료가 부족합니다.");
      }
    }
    else {
      replier.reply("레벨이 부족합니다.\n\n필요 갑옷레벨 : 50\n필요 유저레벨 : 150");
    }
  }
 
 if(msg == "*갑옷"){
   if(user.armor_id_u !== 0){
     if(user.armor_level_u < 200){
       a = "하급"
     }
     else if(user.armor_level_u < 400){
       a = "중급"
     }
     gold = ((user.armor_up_u + 1) * 50) + (user.armor_id_u * 100);
     replier.reply(sender + "님의 갑옷 정보\n" + "\u200b".repeat(500) + "\n\n착용중인 갑옷 : " + user.armor_name_u + " (+" + user.armor_up_u + ")\n\n갑옷 레벨 : " + user.armor_level_u + "\n갑옷 id : " + user.armor_id_u + "\n\n<갑옷 착용 효과>\n◇ HP + " + user.armor_hp_u + " (+" + user.armor_option_hp_u + ") ◇\n◇ DEF + " + user.armor_def_u + " (+" + user.armor_option_def_u + ") ◇\n\n<옵션 정보>\n부여된 옵션 : " + user.armor_option_name_u +/* "\n옵션 특성 : " + user.armor_option_info_u +*/ "\n\n옵션 부여 가격\n일반 ~ 최고급 옵션 : 1 💎 + 1,000 G\n고급 ~ 전설급 옵션 : 2 💎 + 2,000 G\n\n<장비 제련 재료>\n● " + (gold / 2) + " G\n● " + a + " 돌파석 × " + user.armor_stone_u + "\n● " + user.armor_gem_u + " 💎\n● 강화석 결정 × " + Math.floor(gold / 50)+ "\n■ 제련 성공 확률 " + ((user.armor_percent_u * user.armor_book_u) / 100) + "% ■\n■ 확정 성공까지 " + user.armor_end_u + "회 남음 ■\n\n갑옷 강화방법 : *갑옷 강화\n\n다음 갑옷을 만들기 위한 필요 갑옷 레벨 도달시 *갑옷 제작 으로 갑옷을 계승하세요! (계승시 성공확률, 능력치 증가. 필요 재료, 재화 감소.");
   }
   else{
     replier.reply("현재 착용중인 갑옷이 존재하지 않습니다.\n\n*갑옷 제작 으로 갑옷을 만들어보세요!");
   }
 }
 
 if(msg == "*갑옷 강화" && user.armor_up_u !== 30 && user.armor_id_u <= 5){
   G = ((user.armor_up_u + 1) * 50) + (user.armor_id_u * 100);
   if(user.gold >= G && user.superdiamond >= user.armor_gem_u && user.inv_armor_frag_1 >= user.armor_stone_u && user.inv_stone2 >= (G / 50)){
       per = makeRnd(1, 10000);
       if(per <= (user.armor_percent_u * (user.armor_book_u)) || user.armor_end_u == 0){
         replier.reply("■ " + (user.armor_up_u + 1) + "강 제련에 성공했습니다! ■\n\n+" + user.armor_up_u + " >>> +" + (user.armor_up_u + 1) + "\n\n<ARMOR STAT UPDATE>\nHP   | " + (user.armor_hp_u + user.armor_uphp_u) + " (+" + user.armor_uphp_u + ")\nDEF  | " + (user.armor_def_u + user.armor_updef_u) + " (+" + user.armor_updef_u + ")");
         user.gold -= (G / 2);
         user.inv_armor_frag_1 -= user.armor_stone_u;
         user.superdiamond -= user.armor_gem_u;
         user.inv_stone2 -= (G / 50);
         user.armor_hp_u += user.armor_uphp_u;
         user.armor_def_u += user.armor_updef_u;
         user.armor_up_u += 1;
         user.armor_book_u = 10;
         user.armor_level_u += 1;
         savePlayer(user, sender);
         if(user.armor_up_u < 5){
           user.armor_percent_u = 1000;
           savePlayer(user, sender);
         }
         else if(user.armor_up_u < 10){
           user.armor_percent_u = 700;
           user.armor_end_u = 2;
           savePlayer(user, sender);
         }
         else if(user.armor_up_u < 13){
           user.armor_percent_u = 500;
           user.armor_stone_u = 2;
           user.armor_end_u = 3;
           savePlayer(user, sender);
         }
         else if(user.armor_up_u < 16){
           user.armor_percent_u = 350;
           user.armor_end_u = 5;
           savePlayer(user, sender);
         }
         else if(user.armor_up_u < 19){
           user.armor_percent_u = 100;
           user.armor_stone_u = 3;
           user.armor_end_u = 12;
           savePlayer(user, sender);
         }
         else if(user.armor_up_u < 22){
           user.armor_percent_u = 50;
           user.armor_end_u = 20;
           user.armor_gem_u = 1;
           savePlayer(user, sender);
         }
         else if(user.armor_up_u < 25){
           user.armor_percent_u = 30;
           user.armor_stone_u = 4;
           user.armor_end_u = 25;
           user.armor_gem_u = 1;
           savePlayer(user, sender);
         }
         else if(user.armor_up_u < 27){
           user.armor_percent_u = 20;
           user.armor_end_u = 30;
           user.armor_gem_u = 1;
           savePlayer(user, sender);
         }
         else if(user.armor_up_u < 29){
           user.armor_percent_u = 10;
           user.armor_stone_u = 5;
           user.armor_end_u = 30;
           user.armor_gem_u = 1;
           savePlayer(user, sender);
         }
         else if(user.armor_up_u == 29){
           user.armor_percent_u = 6;
           user.armor_end_u = 30;
           user.armor_gem_u = 1;
           savePlayer(user, sender);
         }
       }
       else{
         replier.reply("□ " + (user.armor_up_u + 1) + "강 제련에 실패했습니다.. □\n\n제련 확정성공까지 " + (user.armor_end_u - 1) + "회 남음");
         user.gold -= (G / 2);
         user.inv_armor_frag_1 -= user.armor_stone_u;
         user.superdiamond -= user.armor_gem_u;
         user.inv_stone2 -= (G / 50);
         user.armor_end_u -= 1;
         savePlayer(user, sender);
         if(user.armor_end_u == 1){
           replier.reply("제련 실패횟수가 확정성공횟수에 도달하여 다음 제련확률이 100%가 되었습니다!");
           user.armor_percent_u = 1000;
           savePlayer(user, sender);
         }
       }
   }
   else{
     replier.reply("제련재료가 부족합니다.");
   }
 }
 
 
 if(msg == "*무기"){
   if(user.armor_id_1 !== 0){
     if(user.armor_id_1 < 6){
       a = "하급"
     }
     else if(user.armor_level_1 < 11){
       a = "중급"
     }
     gold = ((user.armor_up_1 + 1) * 50) + (user.armor_id_1 * 100);
     replier.reply(sender + "님의 무기 정보\n" + "\u200b".repeat(500) + "\n\n착용중인 무기 : " + user.armor_name_1 + " (+" + user.armor_up_1 + ")\n\n무기 레벨 : " + user.armor_level_1 + "\n무기 id : " + user.armor_id_1 + "\n\n<무기 착용 효과>\n◇ ATK + " + user.armor_atk_1 + " (+" + user.armor_option_atk_1 + ") ◇\n\n<옵션 정보>\n부여된 옵션 : " + user.armor_option_name_1 +/* "\n옵션 특성 : " + user.armor_option_info_u +*/ "\n\n옵션 부여 가격\n일반 ~ 최고급 옵션 : 1 💎 + 1,000 G\n고급 ~ 전설급 옵션 : 2 💎 + 2,000 G\n\n<장비 제련 재료>\n● " + (gold / 2) + " G\n● " + a + " 돌파석 × " + user.armor_stone_1 + "\n● " + user.armor_gem_1 + " 💎\n● 붉은 강화석 수정 × " + Math.round(gold / 80)+ "\n■ 제련 성공 확률 " + ((user.armor_percent_1 * user.armor_book_u) / 100) + "% ■\n■ 확정 성공까지 " + user.armor_end_1 + "회 남음 ■\n\n무기 강화방법 : *무기 강화\n\n다음 무기를 만들기 위한 필요 무기 레벨 도달시 *무기 제작 으로 무기를 계승하세요! (계승시 성공확률, 능력치 증가. 필요 재료, 재화 감소)");
   }
   else{
     replier.reply("현재 착용중인 무기가 존재하지 않습니다.\n\n*무기 제작 으로 무기를 만들어보세요!");
   }
 }
 
 if(msg == "*무기 제작"){
   replier.reply("<무기 레시피>\n" + "\u200b".repeat(500) + "\n\n*무기 제작 (id)로 무기를 만드실 수 있습니다!\n\n\n■ ID 1 / [TIER 1] 낡은 단검 ■\n필요 무기레벨 : 0 / 필요 유저레벨 : 0\n\n<재료>\n1 💎\n2,000 G\n\n\n■ ID 2 / [TIER 1] 구리 단검 ■\n필요 무기레벨 : 15 / 필요 유저레벨 : 30\n\n<재료>\n1 💎\n5,000 G\n\n\n■ ID 3 / [TIER 1] 트레이닝 소드 ■\n필요 무기레벨 : 25 / 필요 유저레벨 : 60\n\n<재료>\n1 💎\n10,000 G\n하급 돌파석 × 15\n\n\n■ ID 4 / [TIER 1] 주석 브로드소드 ■\n필요 무기레벨 : 40 / 필요 유저레벨 : 100\n\n<재료>\n1 💎\n15,000 G\n하급 돌파석 × 20\n중급 돌파석 × 5\n\n\n■ ID 5 / [TIER 1] 납 장검 ■\n필요 무기레벨 : 50 / 필요 유저레벨 : 150\n\n<재료>\n1 💎\n20,000 G\n중급 돌파석 × 10\n빛나는 달빛 수정 × 5\n은 × 1");
 }
 
 if(msg == "*무기 제작 1" && user.armor_id_1 == 0){
    if(user.armor_level_1 >= 0 && user.level >= 1){
      if(user.gold >= 2000 && user.superdiamond >= 1){
        replier.reply("낡은 단검을 제작했습니다!\n\n*무기 로 확인해보세요!");
        user.armor_name_1 = "낡은 단검";
        user.armor_up_1 = 0;
        user.gold -= 2000;
        user.superdiamond -= 1;
        user.armor_id_1 = 1;
        user.armor_level_1 = 0;
        user.armor_atk_1 = 10;
        user.armor_upatk_1 = 2;
        user.armor_stone_1 = 1;
        user.armor_gem_1 = 0;
        user.armor_percent_1 = 1000;
        user.armor_end_1 = 0;
        savePlayer(user, sender);
      }
      else {
        replier.reply("재료가 부족합니다.");
      }
    }
    else {
      replier.reply("레벨이 부족합니다.\n\n필요 무기레벨 : 0\n필요 유저레벨 : 1");
    }
  }
  
  if(msg == "*무기 제작 2" && user.armor_id_1 == 1){
    if(user.armor_level_1 >= 15 && user.level >= 30){
      if(user.gold >= 5000 && user.superdiamond >= 1){
        replier.reply("구리 단검을 제작했습니다!\n\n*무기 로 확인해보세요!");
        user.armor_name_1 = "구리 단검";
        user.armor_up_1 -= 10;
        user.gold -= 5000;
        user.armor_id_1 = 2;
        user.superdiamond -= 1;
        user.armor_stone_1 = 1;
        user.armor_gem_1 = 0;
        user.armor_percent_1 = 700;
        user.armor_end_1 = 2;
        savePlayer(user, sender);
      }
      else {
        replier.reply("재료가 부족합니다.");
      }
    }
    else {
      replier.reply("레벨이 부족합니다.\n\n필요 무기레벨 : 15\n필요 유저레벨 : 30");
    }
  }
  
  if(msg == "*무기 제작 3" && user.armor_id_1 == 2){
    if(user.armor_level_1 >= 25 && user.level >= 60){
      if(user.gold >= 10000 && user.superdiamond >= 1 && user.inv_armor_frag_1 >= 15){
        replier.reply("트레이닝 소드를 제작했습니다!\n\n*무기 로 확인해보세요!");
        user.armor_name_1 = "트레이닝 소드";
        user.armor_up_1 -= 10;
        user.gold -= 10000;
        user.armor_id_1 = 3;
        user.superdiamond -= 1;
        user.inv_armor_frag_1 -= 15;
        user.armor_stone_1 = 1;
        user.armor_gem_1 = 0;
        user.armor_percent_1 = 700;
        user.armor_end_1 = 2;
        savePlayer(user, sender);
      }
      else {
        replier.reply("재료가 부족합니다.");
      }
    }
    else {
      replier.reply("레벨이 부족합니다.\n\n필요 무기레벨 : 25\n필요 유저레벨 : 60");
    }
  }
  
  if(msg == "*무기 제작 4" && user.armor_id_1 == 3){
    if(user.armor_level_1 >= 40 && user.level >= 100){
      if(user.gold >= 15000 && user.superdiamond >= 1 && user.inv_armor_frag_1 >= 20 && user.inv_armor_frag_2 >= 5){
        replier.reply("주석 브로드소드를 제작했습니다!\n\n*무기 로 확인해보세요!");
        user.armor_name_1 = "주석 브로드소드";
        user.armor_up_1 -= 10;
        user.gold -= 15000;
        user.armor_id_1 = 4;
        user.superdiamond -= 1;
        user.inv_armor_frag_1 -= 20;
        user.inv_armor_frag_2 -= 5;
        user.armor_stone_1 = 2;
        user.armor_gem_1 = 0;
        user.armor_percent_1 = 500;
        user.armor_end_1 = 3;
        savePlayer(user, sender);
      }
      else {
        replier.reply("재료가 부족합니다.");
      }
    }
    else {
      replier.reply("레벨이 부족합니다.\n\n필요 무기레벨 : 40\n필요 유저레벨 : 100");
    }
  }
  
  if(msg == "*무기 제작 5" && user.armor_id_1 == 4){
    if(user.armor_level_1 >= 50 && user.level >= 150){
      if(user.gold >= 20000 && user.superdiamond >= 1 && user.inv_armor_frag_2 >= 10 && user.inv_moon_4 >= 5){
        replier.reply("납 장검을 제작했습니다!\n\n*무기 로 확인해보세요!");
        user.armor_name_1 = "납 장검";
        user.armor_up_1 -= 10;
        user.gold -= 20000;
        user.armor_id_1 = 5;
        user.superdiamond -= 1;
        user.inv_armor_frag_2 -= 10;
        user.inv_moon_4 -= 5;
        user.armor_stone_1 = 2;
        user.armor_gem_1 = 0;
        user.armor_percent_1 = 500;
        user.armor_end_1 = 3;
        savePlayer(user, sender);
      }
      else {
        replier.reply("재료가 부족합니다.");
      }
    }
    else {
      replier.reply("레벨이 부족합니다.\n\n필요 무기레벨 : 50\n필요 유저레벨 : 150");
    }
  }
 
 if(msg == "*무기 강화" && user.armor_up_1 !== 30 && user.armor_id_1 <= 5){
   G = ((user.armor_up_1 + 1) * 50) + (user.armor_id_1 * 100);
   if(user.gold >= G && user.superdiamond >= user.armor_gem_1 && user.inv_armor_frag_1 >= user.armor_stone_1 && user.powerstone >= Math.round(G / 70)){
       per = makeRnd(1, 10000);
       if(per <= (user.armor_percent_1 * (user.armor_book_u)) || user.armor_end_1 == 0){
         replier.reply("■ " + (user.armor_up_1 + 1) + "강 제련에 성공했습니다! ■\n\n+" + user.armor_up_1 + " >>> +" + (user.armor_up_1 + 1) + "\n\n<WEAPON STAT UPDATE>\nATK  | " + (user.armor_atk_1 + user.armor_upatk_1) + " (+" + user.armor_upatk_1 + ")");
         user.gold -= (G / 2);
         user.inv_armor_frag_1 -= user.armor_stone_1;
         user.superdiamond -= user.armor_gem_1;
         user.powerstone -= Math.round(G / 80);
         user.armor_atk_1 += user.armor_upatk_1;
         user.armor_up_1 += 1;
         user.armor_book_u = 10;
         user.armor_level_1 += 1;
         savePlayer(user, sender);
         if(user.armor_up_1 < 5){
           user.armor_percent_1 = 1000;
           savePlayer(user, sender);
         }
         else if(user.armor_up_1 < 10){
           user.armor_percent_1 = 700;
           user.armor_end_1 = 2;
           savePlayer(user, sender);
         }
         else if(user.armor_up_1 < 13){
           user.armor_percent_1 = 500;
           user.armor_stone_1 = 2;
           user.armor_end_1 = 3;
           savePlayer(user, sender);
         }
         else if(user.armor_up_1 < 16){
           user.armor_percent_1 = 350;
           user.armor_end_1 = 5;
           savePlayer(user, sender);
         }
         else if(user.armor_up_1 < 19){
           user.armor_percent_1 = 100;
           user.armor_stone_1 = 3;
           user.armor_end_1 = 12;
           savePlayer(user, sender);
         }
         else if(user.armor_up_1 < 22){
           user.armor_percent_1 = 50;
           user.armor_end_1 = 20;
           user.armor_gem_1 = 1;
           savePlayer(user, sender);
         }
         else if(user.armor_up_1 < 25){
           user.armor_percent_1 = 30;
           user.armor_stone_1 = 4;
           user.armor_end_1 = 25;
           user.armor_gem_1 = 1;
           savePlayer(user, sender);
         }
         else if(user.armor_up_1 < 27){
           user.armor_percent_1 = 20;
           user.armor_end_1 = 30;
           user.armor_gem_1 = 1;
           savePlayer(user, sender);
         }
         else if(user.armor_up_1 < 29){
           user.armor_percent_1 = 10;
           user.armor_stone_1 = 5;
           user.armor_end_1 = 30;
           user.armor_gem_1 = 1;
           savePlayer(user, sender);
         }
         else if(user.armor_up_1 == 29){
           user.armor_percent_1 = 6;
           user.armor_end_1 = 30;
           user.armor_gem_1 = 1;
           savePlayer(user, sender);
         }
       }
       else{
         replier.reply("□ " + (user.armor_up_1 + 1) + "강 제련에 실패했습니다.. □\n\n제련 확정성공까지 " + (user.armor_end_1 - 1) + "회 남음");
         user.gold -= (G / 2);
         user.inv_armor_frag_1 -= user.armor_stone_1;
         user.superdiamond -= user.armor_gem_1;
         user.powerstone -= Math.round(G / 80);
         user.armor_end_1 -= 1;
         savePlayer(user, sender);
         if(user.armor_end_1 == 1){
           replier.reply("제련 실패횟수가 확정성공횟수에 도달하여 다음 제련확률이 100%가 되었습니다!");
           user.armor_percent_1 = 1000;
           savePlayer(user, sender);
         }
       }
   }
   else{
     replier.reply("제련재료가 부족합니다.");
   }
 }
 
/*if(msg == "*갑옷 강화" && user.armor_up_u !== 30 && user.armor_id_u > 100){
   if(user.gold >= user.armor_gold_u && user.superdiamond >= user.armor_gem_u && user.inv_jstone_m >= user.armor_stone_u){
       per = makeRnd(1, 10000);
       if(per <= (user.armor_percent_u * (user.armor_option_per_u + 1)) * 100){
         replier.reply("■ 제련 성공! ■\n\n+" + user.armor_up_u + " >>> +" + (user.armor_up_u + 1));
         user.gold -= user.armor_gold_u;
         user.inv_jstone_m -= user.armor_stone_u;
         user.superdiamond -= user.armor_gem_u;
         user.armor_gold_u += 150;
         //user.powerstone_s -= user.armor_upstone_u;
         user.armor_hp_u += user.armor_uphp_u;
         user.armor_mp_u += user.armor_upmp_u;
         user.armor_def_u += user.armor_updef_u;
         user.armor_atk_u += user.armor_upatk_u;
         user.armor_up_u += 1;
         savePlayer(user, sender);
         if(user.armor_up_u == 5){
           user.armor_percent_u -= 25;
           savePlayer(user, sender);
         }
         if(user.armor_up_u == 10){
           user.armor_percent_u -= 25;
           user.armor_gem_u = 1;
           user.armor_stone_u += 1;
           savePlayer(user, sender);
         }
         if(user.armor_up_u == 15){
           user.armor_percent_u -= 15;
           savePlayer(user, sender);
         }
         if(user.armor_up_u == 20){
           user.armor_percent_u -= 15;
           user.armor_stone_u += 1;
           savePlayer(user, sender);
         }
         if(user.armor_up_u == 25){
           user.armor_percent_u = 0;
           savePlayer(user, sender);
         }
       }
       else{
         replier.reply("□ 제련 실패.. □\n\n+" + user.armor_up_u + " >>> +" + user.armor_up_u);
         user.gold -= user.armor_gold_u;
         user.inv_jstone_m -= user.armor_stone_u;
         user.superdiamond -= user.armor_gem_u;
         //user.powerstone_s -= user.armor_upstone_u;
         savePlayer(user, sender);
       }
   }
   else{
     replier.reply("제련재료가 부족합니다.");
   }
 }*/
 
 if(msg == "*수수료"){
   a = user.tax * user.tax * user.tax * 10000;
   b = 20 - (user.tax * 4);
   replier.reply(sender + "님의 수수료 정보\n\n수수료 " + user.tax + "단계 [" + b + "%]\n\n수수료를 줄이시려면 *수수료 감소 명령어를 사용해주세요.\n수수료 감소 비용 : " + a + " G");
 }
 
 if(msg == "*수수료 감소" && user.tax !== 5){
   if(user.gold >= user.tax * user.tax * user.tax * 10000){
     a = user.tax * user.tax * user.tax * 10000;
     replier.reply("수수료를 감소시켰어요!\n\n소모된 골드 : " + a);
     user.tax += 1;
     user.gold -= a;
     savePlayer(user, sender);
   }
 }
 
 /*if(typeof msg === "string" && user.name == "PIPI38"){
   Z = updatePlayer(msg);
   if(Z.name == undefined){
     replier.reply("해당 유저는 존재하지 않습니다.");
   }
   else{
     replier.reply("거래할 아이템을 선택해주세요.");
   }
 }*/
 
 if(msg == "*직업" && user.level >= 10){
   if(user.work_id == 0){
     replier.reply("어라..? 전직을 하지 않으셨네요!\n\n*직업 목록 으로, 직업을 확인하시고 전직을 완료해주세요!");
   }
   else if(user.work_id == 1){
     replier.reply(sender + "님의 직업 정보\n\n" + "\u200b".repeat(500) + "\n\n직업 : " + user.work_name + " - " + user.work_level + "차\n\n숙련도 Lv " + user.work_scorelevel + "\nEXP : " + user.work_score + " / " + user.work_scoremax + "\n[" + makeBar(user.work_score, user.work_scoremax, 10) + "]\n\n\n\n잔여 스킬포인트 : " + user.work_skillpoint + "\n\n\n[P] 예리한 화살촉 (Lv " + user.work_skillP_level + ")\n스킬 강화 비용 : " + (5000 * user.work_skillP_level) + " G + 스킬포인트 × " + (user.work_skillP_level * 2) + "\n\n-> 상대에게 기본공격 명중시 표식을 남깁니다. 표식이 많은 만큼 스킬이 강화됩니다. (단, 최대 표식 수는 7/9/11/13/15로 제한됩니다.)\n\n사용 가능 컨텐츠 : 특수/레이드던전\n\n\n[1] 화살비 (Lv " + user.work_skill1_level + ")\n스킬 강화 비용 : " + (25000 * user.work_skill1_level) + " G + 스킬포인트 × " + (user.work_skill1_level * 5) + "\n\n-> 상대에게 기본 물리공격력의 100% + (표식 × 20/30/40%)%만큼 데미지를 입히고, 표식이 최대로 모아진 경우 체력을 5% 회복합니다.\n\n사용 가능 컨텐츠 : 특수/레이드던전\n\n\n" + (user.work_level + 1) + "차 전직 : *직업 전직 (준비중)\n스킬 사용 : *스킬 (번호)\n직업 변경 : *직업 변경 (4월 30일까지 무료)");
   }
   else if(user.work_id == 2){
     replier.reply(sender + "님의 직업 정보\n\n" + "\u200b".repeat(500) + "\n\n직업 : " + user.work_name + " - " + user.work_level + "차\n\n숙련도 Lv " + user.work_scorelevel + "\nEXP : " + user.work_score + " / " + user.work_scoremax + "\n[" + makeBar(user.work_score, user.work_scoremax, 10) + "]\n\n\n\n잔여 스킬포인트 : " + user.work_skillpoint + "\n\n\n[P] 에너지 응집 (Lv " + user.work_skillP_level + ")\n스킬 강화 비용 : " + (5000 * user.work_skillP_level) + " G + 스킬포인트 × " + (user.work_skillP_level * 2) + "\n\n-> 일반공격을 명중할때마다 에너지 응집 스택이 12/14/16/18/20씩 쌓입니다.\n\n사용 가능 컨텐츠 : 특수/레이드던전\n\n\n[1] 에너지 교란 (Lv " + user.work_skill1_level + ")\n스킬 강화 비용 : " + (25000 * user.work_skill1_level) + " G + 스킬포인트 × " + (user.work_skill1_level * 5) + "\n\n-> 상대에게 기본 공격력의 (300%/500%/700%)만큼 데미지를 입히고, 상대에게 '무력화' (에너지 응집 50스택마다 1)스택을 부여합니다.\n'무력화' 스택이 부여된 적은 아군에게 데미지를 입힐 수 없으며 1공격당 1스택씩 감소합니다.\n\n사용 가능 컨텐츠 : 특수/레이드던전\n\n\n" + (user.work_level + 1) + "차 전직 : *직업 전직 (준비중)\n스킬 사용 : *스킬 (번호)\n직업 변경 : *직업 변경 (4월 30일까지 무료)");
   }
   else if(user.work_id == 3){
     replier.reply(sender + "님의 직업 정보\n\n" + "\u200b".repeat(500) + "\n\n직업 : " + user.work_name + " - " + user.work_level + "차\n\n숙련도 Lv " + user.work_scorelevel + "\nEXP : " + user.work_score + " / " + user.work_scoremax + "\n[" + makeBar(user.work_score, user.work_scoremax, 10) + "]\n\n\n\n잔여 스킬포인트 : " + user.work_skillpoint + "\n\n\n[P] 격노 (Lv " + user.work_skillP_level + ")\n스킬 강화 비용 : " + (5000 * user.work_skillP_level) + " G + 스킬포인트 × " + (user.work_skillP_level * 2) + "\n\n-> 기본공격 명중시 '분노' 스택이 6/7/8/9/10만큼 쌓입니다. '분노' 스택은 많이 쌓일수록 스킬이 크게 강화되지만, 자신의 체력도 크게 감소합니다.\n\n사용 가능 컨텐츠 : 특수/레이드던전\n\n\n[1] 폭주 (Lv " + user.work_skill1_level + ")\n스킬 강화 비용 : " + (25000 * user.work_skill1_level) + " G + 스킬포인트 × " + (user.work_skill1_level * 5) + "\n\n-> 상대에게 기본공격력의 1000/1500/2000% + (분노 스택 × 3%)만큼 데미지를 입히고, 스킬 사용 직후 HP가 30% + (분노 스택 100마다 × 8%)만큼 감소하며 '기절' 5스택이 걸립니다. 기절 스택이 추가된동안 공격이 불가능하고, 공격시 기절 스택이 1씩 감소합니다.  만약 HP감소량보다 현재 HP가 낮을때 스킬을 사용하면 플레이어는 즉사합니다.\n\n사용 가능 컨텐츠 : 특수/레이드던전\n\n\n" + (user.work_level + 1) + "차 전직 : *직업 전직 (준비중)\n스킬 사용 : *스킬 (번호)\n직업 변경 : *직업 변경 (4월 30일까지 무료)");
   }
   else if(user.work_id == 4){
     replier.reply(sender + "님의 직업 정보\n\n" + "\u200b".repeat(500) + "\n\n직업 : " + user.work_name + " - " + user.work_level + "차\n\n숙련도 Lv " + user.work_scorelevel + "\nEXP : " + user.work_score + " / " + user.work_scoremax + "\n[" + makeBar(user.work_score, user.work_scoremax, 10) + "]\n\n\n\n잔여 스킬포인트 : " + user.work_skillpoint + "\n\n\n[P] 치유력 강화 (Lv " + user.work_skillP_level + ")\n스킬 강화 비용 : " + (5000 * user.work_skillP_level) + " G + 스킬포인트 × " + (user.work_skillP_level * 2) + "\n\n-> 공격시 회복 스택이 1씩 증가합니다.\n\n사용 가능 컨텐츠 : 제한 없음\n\n\n[1] 정화 (Lv " + user.work_skill1_level + ")\n스킬 강화 비용 : " + (25000 * user.work_skill1_level) + " G + 스킬포인트 × " + (user.work_skill1_level * 5) + "\n\n-> 자신에게 부여된 출혈 스택을 (회복 표식 수)만큼 제거하고, 회복 스택이 10미만일 경우 HP 20%회복, 10이상일 경우 HP 25%/33%/50% 회복합니다.\n\n사용 가능 컨텐츠 : 제한 없음\n\n\n" + (user.work_level + 1) + "차 전직 : *직업 전직 (준비중)\n스킬 사용 : *스킬 (번호)\n직업 변경 : *직업 변경 (4월 30일까지 무료)");
   }
   else if(user.work_id == 5){
     replier.reply(sender + "님의 직업 정보\n\n" + "\u200b".repeat(500) + "\n\n직업 : " + user.work_name + " - " + user.work_level + "차\n\n숙련도 Lv " + user.work_scorelevel + "\nEXP : " + user.work_score + " / " + user.work_scoremax + "\n[" + makeBar(user.work_score, user.work_scoremax, 10) + "]\n\n\n\n잔여 스킬포인트 : " + user.work_skillpoint + "\n\n\n[P] 굳건한 방패 (Lv " + user.work_skillP_level + ")\n스킬 강화 비용 : " + (5000 * user.work_skillP_level) + " G + 스킬포인트 × " + (user.work_skillP_level * 2) + "\n\n-> 전투에서 입는 데미지의 10/11/12/14/17%를 방어합니다.\n\n사용 가능 컨텐츠 : 특수/레이드던전\n\n\n[1] 충격파 (Lv " + user.work_skill1_level + ")\n스킬 강화 비용 : " + (25000 * user.work_skill1_level) + " G + 스킬포인트 × " + (user.work_skill1_level * 5) + "\n\n-> 상대에게 기본 공격력의 200/300/400%만큼 데미지를 입히고, '무력화' 스택을 (10/20/30) 부여합니다. '무력화' 스택이 부여된 적은 아군에게 데미지를 입힐 수 없으며 1공격당 1스택씩 감소합니다.\n\n사용 가능 컨텐츠 : 특수/레이드던전\n\n\n" + (user.work_level + 1) + "차 전직 : *직업 전직 (준비중)\n스킬 사용 : *스킬 (번호)\n직업 변경 : *직업 변경 (4월 30일까지 무료)");
   }
 }
 
 if(msg == "*직업 변경" && user.work_id !== 0){
   replier.reply("*직업 목록 (id)로, 새로운 직업을 선택해주세요!");
   user.work_id = 0;
   savePlayer(user, sender);
 }
 
 if(msg == "*직업 목록"){
   replier.reply("직업 목록입니다.\n\n전직 방법 : *직업 전직 (id)" + "\u200b".repeat(500) + "\n\n\n아처 / 딜러 계열 (물리) / id 1\n\n체력 / ■■□□□\n공격력 / ■■■■□\n방어 / ■□□□□\n유틸리티 / ■■■□□\n난이도 / ■■■□□\n\n\n[패시브]\n\n예리한 화살촉\n-> 아처는 레이드 보스에게 기본공격 명중시 상대에게 표식을 남깁니다. 표식이 남은만큼 스킬 사용시 스킬이 강화됩니다.\n(단, 표식은 7/9/11/13/15을(를) 초과할 수 없습니다.)\n\n\n[1차 전직 스킬]\n\n화살비\n-> 상대에게 기본공격력의 100% + (표식 × 20/30/40)%만큼 데미지를 입히고, 표식이 최대로 모아진 경우 5%의 체력을 회복합니다.\n\n[마나 소모량 : 높음]\n[쿨타임값 : 높음]\n[사용 가능 컨텐츠 : 레이드]\n\n[능력치 변화]\nHP - 15\nATK (물리) + 10\n\n\n기본적으로 딜이 강한 아처는 체력과 방어쪽에서 스탯이 떨어집니다. 아처 선택시 1차전직기준 공격력 소폭 증가, 체력 소폭 감소됩니다. 기본공격을 여러번 명중한 후 스킬을 사용하게 되면 더욱 큰 효율을 볼 수 있습니다.\n\n\n\n마법사 / 딜러 계열 (마법) / id 2\n\n체력 / ■■■□□\n공격력 / ■■■■□\n방어 / ■□□□□\n유틸리티 / ■■□□□\n난이도 / ■■■■□\n\n\n[패시브]\n\n에너지 응집\n-> 마법사는 일반공격을 명중할때마다 에너지 응집 스택이 12/14/16/18/20씩 쌓입니다.\n\n\n[1차 전직 스킬]\n\n에너지 교란" +
   "\n-> 상대에게 기본 공격력의 (300%/500%/700%)만큼 데미지를 입히고, 상대에게 '무력화' (에너지 응집 50스택마다 1)스택을 부여합니다.\n'무력화' 스택이 부여된 적은 아군에게 데미지를 입힐 수 없으며 1공격당 1스택씩 감소합니다.\n\n[마나 소모량 : 보통]\n[쿨타임값 : 보통]\n[사용 가능 컨텐츠 : 레이드]\n\n[능력치 변화]\nATK (마법) + 5\n\n아처와 기본적으로 능력치가 비슷합니다. 1차전직 기준 공격력이 소폭 증가합니다.\n\n\n\n광전사 / 딜러 계열 (물리) / id 3\n\n체력 / ■■□□□\n공격력 / ■■■■■\n방어 / ■□□□□\n유틸리티 / ■■□□□\n난이도 / ■■■■■\n\n\n[패시브]\n\n격노\n-> 기본공격 명중시 '분노' 스택이 6/7/8/9/10만큼 쌓입니다. '분노' 스택은 많이 쌓일수록 스킬이 크게 강화되지만, 자신의 체력도 크게 감소합니다.\n\n\n[1차 전직 스킬]\n\n폭주\n-> 광전사가 폭주하면 상대에게 기본공격력의 1000/1500/2000% + (분노 스택 × 3%)만큼 데미지를 입히고, 스킬 사용 직후 HP가 30% + (분노 스택 100마다 × 8%)만큼 감소하며 '기절' 5스택이 걸립니다. 기절 스택이 추가된동안 공격이 불가능하고, 공격시 기절 스택이 1씩 감소합니다.  만약 HP감소량보다 현재 HP가 낮을때 스킬을 사용하면 플레이어는 즉사합니다.\n\n[마나 소모량 : 매우 높음]\n[쿨타임값 : 높음]\n[사용 가능 컨텐츠 : 레이드]\n\n[능력치 변화]\nHP - 30\nMP - 30\nATK (물리) + 40\n\n광전사는 모든 직업들 중 가장 딜을 많이 넣을 수 있는 직업입니다. 단, 괴물같은 딜에는 대가가" +     
   " 따릅니다. 스킬을 사용하면 체력이 큰 폭으로 하락하고 HP관리가 어렵습니다. 광전사 1차전직 기준 체력, 마나가 감소하고 공격력이 대폭 상승합니다.\n\n\n\n성직자 / 서포터 계열 (마법) / id 4\n\n체력 / ■■■□□\n 공격력 / ■■□□□\n방어 / ■■□□□\n유틸리티 / ■■■□□\n난이도 / ■■□□□\n\n\n[패시브]\n\n치유력 강화\n-> 공격시 회복 스택이 1씩 증가합니다.\n\n\n[1차 전직 스킬]\n\n정화\n-> 자신에게 부여된 출혈 스택을 (회복 표식 수)만큼 제거하고, 회복 스택이 10미만일 경우 HP 20%회복, 10이상일 경우 HP 25%/33%/50% 회복합니다.\n\n[마나 소모량 : 보통]\n[쿨타임값 : 보통]\n[사용 가능 컨텐츠 : 일반던전, 레이드]\n\n[능력치 변화]\nHP + 10\nATK (마법) - 5\n\n성직자는 자신, 팀원을 회복시킵니다. 단, 1차전직에서는 팀원을 회복시키는 능력이 존재하지 않습니다 ;-; 1차전직 기준 체력 소폭 증가, 공격력 소폭 감소됩니다.\n\n\n\n수호자 / 밸런스 계열 (마법) / id 5" + 
   "\n\n체력 / ■■■■□\n공격력 / ■■□□□\n방어 / ■■■□□\n유틸리티 / ■□□□□\n난이도 / ■■■□□\n\n\n[패시브]\n\n굳건한 방패\n-> 전투에서 입는 데미지의 10/11/12/14/17%를 무조건 방어합니다.\n\n\n[1차 전직 스킬]\n\n충격파\n-> 상대에게 기본 공격력의 200/300/400%만큼 데미지를 입히고, '무력화' 스택을 (10/20/30) 부여합니다. '무력화' 스택이 부여된 적은 아군에게 데미지를 입힐 수 없으며 1공격당 1스택씩 감소합니다.\n\n[마나 소모량 : 보통]\n[쿨타임값 : 보통]\n[사용 가능 컨텐츠 : 레이드]\n\n[능력치 변화]\nHP + 30\nATK (마법) - 20\n\n수호자는 1차전직 기준 체력 대폭 상승, 공격력 소폭 하락됩니다. 전투에서 가장 오래 버틸 수 있는 직업이고, 팀원에게 가는 몬스터 공격을 막아줄 수 있습니다.");
 }
 
 if(msg == "*직업 전직 1" && user.level >= 10 && user.work_id == 0){
   replier.reply("[1차전직 : 아처]로 전직했습니다!\n\n*직업 으로 내 전직상태를 확인하세요!");
   user.work_hp = -15;
   user.work_atk = 10;
   user.work_id = 1;
   user.work_score = user.work_totalscore;
   user.work_scoremax = 600;
   user.work_scorelevel = 1;
   user.work_name = "아처";
   user.work_level = 1;
   user.work_skillpoint = 1;
   user.work_skillP_level = 1;
   user.work_skill1_level = 1;
   user.work_skillP = 7;
   user.work_skill1 = 0.2;
   savePlayer(user, sender);
 }
 
 if(msg == "*직업 전직 2" && user.level >= 10 && user.work_id == 0){
   replier.reply("[1차전직 : 마법사]로 전직했습니다!\n\n*직업 으로 내 전직상태를 확인하세요!");
   user.work_mpatk = 5;
   user.work_id = 2;
   user.work_score = user.work_totalscore;
   user.work_scoremax = 600;
   user.work_scorelevel = 1;
   user.work_name = "마법사";
   user.work_level = 1;
   user.work_skillpoint = 1;
   user.work_skillP_level = 1;
   user.work_skill1_level = 1;
   user.work_skillP = 12;
   user.work_skill1 = 3;
   savePlayer(user, sender);
 }
 
 if(msg == "*직업 전직 3" && user.level >= 10 && user.work_id == 0){
   replier.reply("[1차전직 : 광전사]로 전직했습니다!\n\n*직업 으로 내 전직상태를 확인하세요!");
   user.work_hp = -30;
   user.work_mp = -30;
   user.work_atk = 40;
   user.work_id = 3;
   user.work_score = user.work_totalscore;
   user.work_scoremax = 600;
   user.work_scorelevel = 1;
   user.work_name = "광전사";
   user.work_level = 1;
   user.work_skillpoint = 1;
   user.work_skillP_level = 1;
   user.work_skill1_level = 1;
   user.work_skillP = 6;
   user.work_skill1 = 10;
   savePlayer(user, sender);
 }

if(msg == "*직업 전직 4" && user.level >= 10 && user.work_id == 0){
   replier.reply("[1차전직 : 성직자]로 전직했습니다!\n\n*직업 으로 내 전직상태를 확인하세요!");
   user.work_hp = 10;
   user.work_mpatk = -5;
   user.work_id = 4;
   user.work_score = user.work_totalscore;
   user.work_scoremax = 600;
   user.work_scorelevel = 1;
   user.work_name = "성직자";
   user.work_level = 1;
   user.work_skillpoint = 1;
   user.work_skillP_level = 1;
   user.work_skill1_level = 1;
   user.work_skill1 = 4;
   savePlayer(user, sender);
 }
 
 if(msg == "*직업 전직 5" && user.level >= 10 && user.work_id == 0){
   replier.reply("[1차전직 : 수호자]로 전직했습니다!\n\n*직업 으로 내 전직상태를 확인하세요!");
   user.work_hp = 40;
   user.work_mpatk = -20;
   user.work_id = 5;
   user.work_score = user.work_totalscore;
   user.work_scoremax = 600;
   user.work_scorelevel = 1;
   user.work_name = "수호자";
   user.work_level = 1;
   user.work_skillpoint = 1;
   user.work_skillP_level = 1;
   user.work_skill1_level = 1;
   user.work_skillP = 10;
   user.work_skill1 = 2;
   savePlayer(user, sender);
 }
 
 if(msg == "*스킬 1" && user.work_id == 4){
   if(user.Rhp > 0){
   if(user.work_stack_A < 10 && user.Rmp >= 70){
     a = Math.round(user.Rhpmax / 5);
     replier.reply("< 정화 스킬 시전 >\n\n스킬을 사용하여 체력을 " + a + "만큼 회복했습니다!\n\n소모된 MP : 70");
     user.hp += a;
     user.mp -= 70;
     user.work_stack_A = 0;
     savePlayer(user, sender);
     if(user.hp > user.hpmax){
      user.hp = user.hpmax;
      savePlayer(user, sender);
    }
   }
   else if(user.work_stack_A >= 10 && user.Rmp >= 70){
     a = Math.round(user.Rhpmax / user.work_skill1);
     replier.reply("< 정화 스킬 시전 >\n\n스킬을 사용하여 체력을 " + a + "만큼 회복했습니다!\n\n소모된 MP : 70");
     user.hp += a;
     user.mp -= 70;
     user.work_stack_A = 0;
     savePlayer(user, sender);
     if(user.hp > user.hpmax){
      user.hp = user.hpmax;
      savePlayer(user, sender);
    }
   }
   }
   else {
     replier.reply("체력이 0 미만일때는 스킬 사용이 불가능합니다!");
   }
 }
 
 if(msg == "*파티 생성 1" && user.raid_id !== 0)
   if(raid_id == 3001){
     //힐구슬 (Hp 50% 회복) × 8
     name = "어비스마티즘:심연의 화염";
     name_u = "어비스마티즘";
     level = 300;
     hp = 500000;
     bar = 10000;
     item = 8; //힐구슬
   }
   a = updatePlayer("PIPI38");
   if(a.party == false){
     replier.reply("1번 파티를 생성했습니다!\n\n\n목표 레이드 : " + name + " (Lv " + level + ")\n\n👑 파티장 (1) : " + sender + " (Lv " + user.level + ")\n파티원 (2) : 대기중\n파티원 (3) : 대기중\n파티원 (4) : 대기중\n\n\n*파티 정보 : 파티 상태 확인\n*레이드 시작 : 레이드 시작\n*파티 삭제 : 파티 제거\n*파티 탈퇴 : 파티에서 탈퇴 (파티장은 탈퇴불가)");
     a.raid_name_1 = name_u;
     a.raid_level_1 = level;
     a.raid_user1_1 = sender;
     a.raid_hp_1 = hp;
     a.raid_hpmax_1 = hp;
     a.raid_bar_1 = bar;
     a.raid_item_1 = item;
     a.raid_itemmax_1 = item;
   }
 
 if(msg == "*행동취소"){
   replier.reply("모든 행동이 취소되었습니다.");
   user.heal = false;
   user.mid = 0;
   savePlayer(user, sender);
 }
 
  if(msg == "*공격" && user.Rhp < 1 && user.mid !== 0){
    replier.reply("체력이 부족하여 몬스터 사냥에 실패했습니다.");
    user.mid = 0;
    savePlayer(user, sender);
  }
  
  if(msg == "*채굴" && user.Rhp < 1){
    replier.reply('체력이 부족하여 광물 채굴에 실패했습니다.');
    user.hp -= 50;
    savePlayer(user, sender);
  }
  
  if(msg == "*채집" && user.Rhp < 1){
    replier.reply('체력이 부족하여 재료 채집에 실패했습니다.');
    user.hp -= 50;
    savePlayer(user, sender);
  }
  
  if(msg == "*장소 이동 A1" && user.level !== undefined){
    replier.reply("- 광산 -\n(기타 장소)\n\n광물을 채굴할 수 있는 광산입니다!\n*채굴 로, 광물을 채굴하세요!\n광산에서 채굴한 광물은 아이템으로 획득 가능합니다.");
    user.mapid = 10001;
    savePlayer(user, sender);
  }
  
  if(msg == "*장소 이동 A2" && user.level !== undefined){
    replier.reply("- 잊혀진 지하광산 -\n(기타 장소)\n\n제련 재료 광물을 채굴할 수 있는 광산입니다!\n*채굴 로, 광물을 채굴하세요!\n광산에서 채굴한 광물은 아이템으로 획득 가능합니다.");
    user.mapid = 10003;
    savePlayer(user, sender);
  }
  
  if(msg == "*장소 이동 B" && user.level !== undefined){
    replier.reply("- 거래소 -\n(기타 장소)\n\n다른 유저와 거래를 할 수 있는 거래소입니다!\n아래 명령어를 확인하셔서 거래소를 이용해주세요!\n\n*수수료 -> 거래소 수수료를 확인합니다.\n*수수료 감소 -> 골드를 사용하여 수수료를 줄입니다.\n*거래 판매 -> 아이템 판매를 시작합니다. (준비중)\n*거래 구매 -> 아이템 구매를 시작합니다. (준비중)");
    user.mapid = 10002;
    savePlayer(user, sender);
  }
  
  if(msg == "*장소 이동 C" && user.level !== undefined){
    replier.reply("- 달무름꽃 정원 -\n(기타 장소)\n\n달빛 재료를 얻을 수 있는 장소입니다!\n*채집 으로, 달빛 재료를 모아보세요!");
    user.mapid = 10004;
    savePlayer(user, sender);
  }
  
  if(msg == "*곡괭이 진화" && user.pickaxe_level == "MAX" && user.pickaxe_over_id == 0){
    replier.reply("아래 곡괭이 진화 루트를 확인하시고\n*곡괭이 진화 id 로 곡괭이를 진화시키세요!\n\n[!] 한번 선택한 진화는 이후 변경시 거액의 골드가 필요합니다.\n\n\nid 1 / 빛나는 곡괭이 \n> 흙 확률 2 / 4 / 6 / 8 / 10 / 12 / 14 / 16 / 18 / 20% 감소\n감소한 흙확률이 돌/석탄/철/은 확률에 분배\n\n경험의 곡괭이\n> 모든 곳에서 얻는 경험치 영구적으로 10 / 20 / 30% 증가\n\n찬란한 곡괭이\n> Lv 1 ~ 10구간 : 은 확률이 금 확률로 전환 (강화당 0.03% 전환)\n> Lv 11 ~ 20구간 : 금 확률이 크리스탈 확률로 전환 (강화당 0.01% 전환)\n> Lv 21 ~ 23구간 : 크리스탈 확률이 다이아 확률로 전환 (강화당 0.01% 전환)\n\n\n각 진화 루트별 자세한 내용은\n*곡괭이 설명 id 로 확인하세요!\n(확인 추천)");
  }
  
  if(msg == "*곡괭이 설명 1"){
    replier.reply("[빛나는 곡괭이]\n\n능력 : 진화 레벨이 오를때마다 흙 확률이 감소하고 감소한 확률만큼 돌/석탄/철/은 광물 확률에 분배합니다. (분배확률은 동일)\n\n\n(표 확인 방법)\n(Lv / 흙확률 감소 /  필요 곡괭이 경험치)\n\n1 / 2% / 50,000EXP\n2 / 4% / 55,000EXP\n3 / 6% / 60,000EXP\n4 / 8% / 65,000EXP\n5 / 10% / 70,000EXP\n6 / 12% / 75,000EXP\n7 / 14% / 80,000EXP\n8 / 16% / 85,000EXP\n9 / 18% / 90,000EXP\n10 / 20% / MAX\n\n총 필요 경험치 : 900,000EXP");
  }
  
  if(msg == "*곡괭이 설명 2"){
    replier.reply("[경험의 곡괭이]\n\n능력 : 모든 곳에서의 경험치 수급량이 증가됩니다.\n단, 필요 경험치 매우 많음\n\n\n(표 확인 방법)\n(Lv / 경험치 증가 / 필요 곡괭이 경험치\n\n1 / 10% / 1,000,000EXP\n2 / 20% / 2,500,000EXP\n3 / 30% / MAX\n\n총 필요 경험치 : 3,500,000EXP");
  }
  
  if(msg == "*곡괭이 설명 3"){
    replier.reply("[찬란한 곡괭이]\n\n능력 : 레벨업 할때마다 하위 광물의 확률이 약간 감소하고 상위 광물의 확률이 약간 증가합니다.\n1 ~ 10레벨 구간은 은 확률이 금으로, 11 ~ 20레벨 구간은 금 확률이 크리스탈로, 21 ~ 23레벨 구간은 크리스탈 확률이 다이아로 전환됩니다.\n\n\n(표 확인 방법)\n(Lv / 전환되는 확률 / 필요 곡괭이 경험치)\n\n[1 ~ 10레벨 구간 : 은확률 -> 금확률]\n1 / 0.03% / 18,000EXP\n2 / 0.03% / 22,000EXP\n3 / 0.03% / 26,000EXP\n4 / 0.03% / 30,000EXP\n5 / 0.03% / 34,000EXP\n6 / 0.03% / 38,000EXP\n7 / 0.03% / 42,000EXP\n8 / 0.03% / 46,000EXP\n9 / 0.03% / 50,000EXP\n10 / 0.03% / 60,000EXP\n\n[11 ~ 20레벨 구간 : 금확률 -> 크리스탈 확률]\n11 / 0.01% / 70,000EXP\n12 / 0.01% / 80,000EXP\n13 / 0.01% / 90,000EXP\n14 / 0.01% / 100,000EXP\n15 / 0.01% / 110,000EXP\n16 / 0.01% / 120,000EXP\n17 / 0.01% / 130,000EXP\n18 / 0.01% / 140,000EXP\n19 / 0.01% / 150,000EXP\n20 / 0.01% / 200,000EXP\n\n[21 ~ 23레벨 구간 : 크리스탈확률 -> 다이아확률]\n21 / 0.01% / 250,000EXP\n22 / 0.01% / 300,000EXP\n23 / 0.01% / MAX\n\n총 필요 경험치 : 2,106,000EXP");
  }
  
  if(msg == "*곡괭이 진화 1" && user.pickaxe_level == "MAX" && user.pickaxe_over_id == 0){
    replier.reply("빛나는 곡괭이로 곡괭이를 진화시켰어요!\n\n내정보 창에서 확인해보세요.");
    user.pickaxe_over_level = 1;
    user.pickaxe_over_Exp = user.pickaxe_Exp;
    user.pickaxe_over_Expmax = 50000;
    user.pickaxe_over_id = 1;
    user.pickaxe_over_name = "빛나는 ";
    user.pickaxe_dirt -= 200;
    user.pickaxe_stone += 50;
    user.pickaxe_coal += 50;
    user.pickaxe_iron += 50;
    user.pickaxe_silver += 50;
    savePlayer(user, sender);
  }
  
  if(msg == "*곡괭이 진화 2" && user.pickaxe_level == "MAX" && user.pickaxe_over_id == 0){
    replier.reply("경험의 곡괭이로 곡괭이를 진화시켰어요!\n\n내정보 창에서 확인해보세요.");
    user.pickaxe_over_level = 1;
    user.pickaxe_over_Exp = user.pickaxe_Exp;
    user.pickaxe_over_Expmax = 1000000;
    user.pickaxe_over_id = 2;
    user.pickaxe_over_name = "경험의 ";
    user.pickaxe_Expboost += 0.1;
    savePlayer(user, sender);
  }
  
  if(msg == "*곡괭이 진화 3" && user.pickaxe_level == "MAX" && user.pickaxe_over_id == 0){
    replier.reply("찬란한 곡괭이로 곡괭이를 진화시켰어요!\n\n내정보 창에서 확인해보세요.");
    user.pickaxe_over_level = 1;
    user.pickaxe_over_Exp = user.pickaxe_Exp;
    user.pickaxe_over_Expmax = 18000;
    user.pickaxe_over_id = 3;
    user.pickaxe_silver -= 3;
    user.pickaxe_gold += 3;
    user.pickaxe_over_name = "찬란한 ";
    savePlayer(user, sender);
  }
  
  if(msg == "*채굴" && user.mapid == 10001 && user.Rhp > 0 && user.heal == false){
    if(user.pickaxe_level == "MAX" && user.pickaxe_over_level == "-"){
      replier.reply("곡괭이 레벨이 120에 도달하여 곡괭이 진화가 가능합니다!\n\n*곡괭이 진화 로, 곡괭이를 진화시켜주세요!");
    }
    else {
    a = makeRnd(1, 10000);
    b = (user.pickaxe_dirt + user.pickaxe_stone);
    c = (b + user.pickaxe_coal);
    d = (c + user.pickaxe_iron);
    e = (d + user.pickaxe_silver);
    f = (e + user.pickaxe_gold);
    g = Math.round(user.Rhpmax / 50);
    h = (f + user.pickaxe_cristal);
    i = (h + user.pickaxe_diamond);
    j = makeRnd(1, 200);
    if(user.pickaxe_over_level == "-"){
    if(a <= user.pickaxe_dirt){
      if(j <= 190){
      replier.reply("- 광물 채굴 결과 -\n\n흙 채굴 성공!\n획득한 EXP : " + (20 * user.RExpboost) + "\n소모된 HP : " + g);
      user.inv_dirt += 1;
      user.Exp += Math.round(20 * user.RExpboost);
      user.pickaxe_Exp += 8 * EXP_EV;
      user.hp -= g;
      user.rankscore += 1 * rankscoreE;
      savePlayer(user, sender);
      }
      else {
        replier.reply("- 광물 채굴 결과 -\n\n흙 채굴 성공!\n획득한 EXP : " + (20 * user.RExpboost) + "\n소모된 HP : " + g + "\n\n[+] 복주머니 [B] × 1 획득!");
      user.inv_dirt += 1;
      user.Exp += Math.round(20 * user.RExpboost);
      user.pickaxe_Exp += 8 * EXP_EV;
      user.hp -= g;
      user.inv_event3 += 1;
      user.rankscore += 1 * rankscoreE;
      savePlayer(user, sender);
      }
    }
    else if(a <= b){
      if(j <= 190){
      replier.reply("- 광물 채굴 결과 -\n\n돌 채굴 성공!\n획득한 EXP : " + (50 * user.RExpboost) + "\n소모된 HP : " + g);
      user.inv_stone += 1;
      user.Exp += Math.round(50 * user.RExpboost);
      user.pickaxe_Exp += 14 * EXP_EV;
      user.hp -= g;
      user.rankscore += 1 * rankscoreE;
      savePlayer(user, sender);
     }
     else {
       replier.reply("- 광물 채굴 결과 -\n\n돌 채굴 성공!\n획득한 EXP : " + (50 * user.RExpboost) + "\n소모된 HP : " + g + "\n\n[+] 복주머니 [B] × 1 획득!");
      user.inv_stone += 1;
      user.Exp += Math.round(50 * user.RExpboost);
      user.pickaxe_Exp += 14 * EXP_EV;
      user.hp -= g;
      user.inv_event3 += 1;
      user.rankscore += 1 * rankscoreE;
      savePlayer(user, sender);
     }
   }
    else if(a <= c){
      if(j <= 190){
      replier.reply("- 광물 채굴 결과 -\n\n석탄 채굴 성공!\n획득한 EXP : " + (150 * user.RExpboost) + "\n소모된 HP : " + g);
      user.inv_coal += 1;
      user.Exp += Math.round(150 * user.RExpboost);
      user.pickaxe_Exp += 22 * EXP_EV;
      user.hp -= g;
      user.rankscore += 2 * rankscoreE;
      savePlayer(user, sender);
     }
     else {
       replier.reply("- 광물 채굴 결과 -\n\n석탄 채굴 성공!\n획득한 EXP : " + (150 * user.RExpboost) + "\n소모된 HP : " + g + "\n\n[+] 복주머니 [B] × 1 획득!");
      user.inv_coal += 1;
      user.Exp += Math.round(150 * user.RExpboost);
      user.pickaxe_Exp += 22 * EXP_EV;
      user.hp -= g;
      user.inv_event3 += 1;
      user.rankscore += 2 * rankscoreE;
      savePlayer(user, sender);
     }
   }
    else if(a <= d){
      if(j <= 198){
      replier.reply("- 광물 채굴 결과 -\n\n철 채굴 성공!\n획득한 EXP : " + (500 * user.RExpboost) + "\n소모된 HP : " + g);
      user.inv_iron += 1;
      user.Exp += Math.round(500 * user.RExpboost);
      user.pickaxe_Exp += 38 * EXP_EV;
      user.hp -= g;
      user.rankscore += 2 * rankscoreE;
      savePlayer(user, sender);
     }
     else {
       replier.reply("- 광물 채굴 결과 -\n\n철 채굴 성공!\n획득한 EXP : " + (500 * user.RExpboost) + "\n소모된 HP : " + g + "\n\n[+] 복주머니 [A] × 1 획득!");
      user.inv_iron += 1;
      user.Exp += Math.round(500 * user.RExpboost);
      user.pickaxe_Exp += 38 * EXP_EV;
      user.hp -= g;
      user.inv_event4 += 1;
      user.rankscore += 2 * rankscoreE;
      savePlayer(user, sender);
     }
   }
    else if(a <= e){
      if(j <= 196){
      replier.reply("- 광물 채굴 결과 -\n\n은 채굴 성공!\n획득한 EXP : " + (2000 * user.RExpboost) + "\n소모된 HP : " + g);
      user.inv_silver += 1;
      user.Exp += Math.round(2000 * user.RExpboost);
      user.pickaxe_Exp += 60 * EXP_EV;
      user.hp -= g;
      user.rankscore += 3 * rankscoreE;
      savePlayer(user, sender);
     }
     else {
       replier.reply("- 광물 채굴 결과 -\n\n은 채굴 성공!\n획득한 EXP : " + (2000 * user.RExpboost) + "\n소모된 HP : " + g + "\n\n[+] 복주머니 [A] × 1 획득!");
      user.inv_silver += 1;
      user.Exp += Math.round(2000 * user.RExpboost);
      user.pickaxe_Exp += 60 * EXP_EV;
      user.hp -= g;
      user.inv_event4 += 1;
      user.rankscore += 3 * rankscoreE;
      savePlayer(user, sender);
     }
   }
    else if(a <= f){
      if(j <= 192){
      replier.reply("- 광물 채굴 결과 -\n\n금 채굴 성공!\n획득한 EXP : " + (15000 * user.RExpboost) + "\n소모된 HP : " + g);
      user.inv_gold += 1;
      user.Exp += Math.round(15000 * user.RExpboost);
      user.pickaxe_Exp += 120 * EXP_EV;
      user.hp -= g;
      user.rankscore += 3 * rankscoreE;
      savePlayer(user, sender);
     }
     else {
       replier.reply("- 광물 채굴 결과 -\n\n금 채굴 성공!\n획득한 EXP : " + (15000 * user.RExpboost) + "\n소모된 HP : " + g + "\n\n[+] 복주머니 [A] × 1 획득!  ");
      user.inv_gold += 1;
      user.Exp += Math.round(15000 * user.RExpboost);
      user.pickaxe_Exp += 120 * EXP_EV;
      user.hp -= g;
      user.inv_event4 += 1;
      user.rankscore += 3 * rankscoreE;
      savePlayer(user, sender);
     }
   }
    else if(a <= h){
      if(j <= 180){
      replier.reply("- 광물 채굴 결과 -\n\n크리스탈 채굴 성공!\n획득한 EXP : " + (40000 * user.RExpboost) + "\n소모된 HP : " + g);
      user.inv_cristal += 1;
      user.Exp += Math.round(40000 * user.RExpboost);
      user.pickaxe_Exp += 250 * EXP_EV;
      user.hp -= g;
      user.rankscore += 5 * rankscoreE;
      savePlayer(user, sender);
     }
     else {
       replier.reply("- 광물 채굴 결과 -\n\n크리스탈 채굴 성공!\n획득한 EXP : " + (40000 * user.RExpboost) + "\n소모된 HP : " + g + "\n\n[+] 복주머니 [A] × 1 획득!");
      user.inv_cristal += 1;
      user.Exp += Math.round(40000 * user.RExpboost);
      user.pickaxe_Exp += 250 * EXP_EV;
      user.hp -= g;
      user.inv_event4 += 1;
      user.rankscore += 5 * rankscoreE;
      savePlayer(user, sender);
     }
   }
    else if(a <= i){
      replier.reply("- 광물 채굴 결과 -\n\n다이아몬드 채굴 성공!\n획득한 EXP : " + (150000 * user.RExpboost) + "\n소모된 HP : " + g);
      user.inv_diamond += 1;
      user.Exp += Math.round(150000 * user.RExpboost);
      user.pickaxe_Exp += 700 * EXP_EV;
      user.hp -= g;
      user.rankscore += 10 * rankscoreE;
      savePlayer(user, sender);
    }
  }
  else {
    if(a <= user.pickaxe_dirt){
      if(j <= 198){
      replier.reply("- 광물 채굴 결과 -\n\n흙 채굴 성공!\n획득한 EXP : " + (20 * user.RExpboost) + "\n소모된 HP : " + g);
      user.inv_dirt += 1;
      user.Exp += Math.round(20 * user.RExpboost);
      user.pickaxe_Exp += 8 * EXP_EV;
      user.hp -= g;
      user.rankscore += 1 * rankscoreE;
      savePlayer(user, sender);
     }
     else {
       replier.reply("- 광물 채굴 결과 -\n\n흙 채굴 성공!\n획득한 EXP : " + (20 * user.RExpboost) + "\n소모된 HP : " + g + "\n\n[+] 복주머니 [B] × 1 획득!");
      user.inv_dirt += 1;
      user.Exp += Math.round(20 * user.RExpboost);
      user.pickaxe_Exp += 8 * EXP_EV;
      user.hp -= g;
      user.inv_event3 += 1;
      user.rankscore += 1 * rankscoreE;
      savePlayer(user, sender);
     }
   }
    else if(a <= b){
      if(j <= 196){
      replier.reply("- 광물 채굴 결과 -\n\n돌 채굴 성공!\n획득한 EXP : " + (50 * user.RExpboost) + "\n소모된 HP : " + g);
      user.inv_stone += 1;
      user.Exp += Math.round(50 * user.RExpboost);
      user.pickaxe_over_Exp += 10 * EXP_EV;
      user.pickaxe_Exptotal += 10 * EXP_EV;
      user.hp -= g;
      user.rankscore += 1 * rankscoreE;
      savePlayer(user, sender);
     }
     else {
       replier.reply("- 광물 채굴 결과 -\n\n돌 채굴 성공!\n획득한 EXP : " + (50 * user.RExpboost) + "\n소모된 HP : " + g + "\n\n[+] 복주머니 [B] × 1 획득!");
      user.inv_stone += 1;
      user.Exp += Math.round(50 * user.RExpboost);
      user.pickaxe_over_Exp += 10 * EXP_EV;
      user.pickaxe_Exptotal += 10 * EXP_EV;
      user.hp -= g;
      user.inv_event3 += 1;
      user.rankscore += 1 * rankscoreE;
      savePlayer(user, sender);
     }
   }
    else if(a <= c){
      if(j <= 192){
      replier.reply("- 광물 채굴 결과 -\n\n석탄 채굴 성공!\n획득한 EXP : " + (150 * user.RExpboost) + "\n소모된 HP : " + g);
      user.inv_coal += 1;
      user.Exp += Math.round(150 * user.RExpboost);
      user.pickaxe_over_Exp += 16 * EXP_EV;
      user.pickaxe_Exptotal += 16 * EXP_EV;
      user.hp -= g;
      user.rankscore += 2 * rankscoreE;
      savePlayer(user, sender);
     }
     else {
     replier.reply("- 광물 채굴 결과 -\n\n석탄 채굴 성공!\n획득한 EXP : " + (150 * user.RExpboost) + "\n소모된 HP : " + g + "\n\n[+] 복주머니 [B] × 1 획득!");
      user.inv_coal += 1;
      user.Exp += Math.round(150 * user.RExpboost);
      user.pickaxe_over_Exp += 16 * EXP_EV;
      user.pickaxe_Exptotal += 16 * EXP_EV;
      user.hp -= g;
      user.inv_event3 += 1;
      user.rankscore += 2 * rankscoreE;
      savePlayer(user, sender);
   }
   }
    else if(a <= d){
      if(j <= 197){
      replier.reply("- 광물 채굴 결과 -\n\n철 채굴 성공!\n획득한 EXP : " + (500 * user.RExpboost) + "\n소모된 HP : " + g);
      user.inv_iron += 1;
      user.Exp += Math.round(500 * user.RExpboost);
      user.pickaxe_over_Exp += 30 * EXP_EV;
      user.pickaxe_Exptotal += 30 * EXP_EV;
      user.hp -= g;
      user.rankscore += 2 * rankscoreE;
      savePlayer(user, sender);
     }
      else {
        replier.reply("- 광물 채굴 결과 -\n\n철 채굴 성공!\n획득한 EXP : " + (500 * user.RExpboost) + "\n소모된 HP : " + g + "\n\n[+] 복주머니 [A] × 1 획득!");
      user.inv_coal += 1;
      user.Exp += Math.round(500 * user.RExpboost);
      user.pickaxe_over_Exp += 30 * EXP_EV;
      user.pickaxe_Exptotal += 30 * EXP_EV;
      user.hp -= g;
      user.inv_event4 += 1;
      user.rankscore += 2 * rankscoreE;
      savePlayer(user, sender);
     }
   }
    else if(a <= e){
      if(j <= 194){
      replier.reply("- 광물 채굴 결과 -\n\n은 채굴 성공!\n획득한 EXP : " + (2000 * user.RExpboost) + "\n소모된 HP : " + g);
      user.inv_silver += 1;
      user.Exp += Math.round(2000 * user.RExpboost);
      user.pickaxe_over_Exp += 50 * EXP_EV;
      user.pickaxe_Exptotal += 50 * EXP_EV;
      user.hp -= g;
      user.rankscore += 3 * rankscoreE;
      savePlayer(user, sender);
     }
     else {
       replier.reply("- 광물 채굴 결과 -\n\n은 채굴 성공!\n획득한 EXP : " + (2000 * user.RExpboost) + "\n소모된 HP : " + g + "\n\n[+] 복주머니 [A] × 1");
      user.inv_silver += 1;
      user.Exp += Math.round(2000 * user.RExpboost);
      user.pickaxe_over_Exp += 50 * EXP_EV;
      user.pickaxe_Exptotal += 50 * EXP_EV;
      user.hp -= g;
      user.inv_event4 += 1;
      user.rankscore += 3 * rankscoreE;
      savePlayer(user, sender);
     }
   }
    else if(a <= f){
      if(j <= 190){
      replier.reply("- 광물 채굴 결과 -\n\n금 채굴 성공!\n획득한 EXP : " + (15000 * user.RExpboost) + "\n소모된 HP : " + g);
      user.inv_gold += 1;
      user.Exp += Math.round(15000 * user.RExpboost);
      user.pickaxe_over_Exp += 100 * EXP_EV;
      user.pickaxe_Exptotal += 100 * EXP_EV;
      user.hp -= g;
      user.rankscore += 3 * rankscoreE;
      savePlayer(user, sender);
     }
     else {
       replier.reply("- 광물 채굴 결과 -\n\n금 채굴 성공!\n획득한 EXP : " + (15000 * user.RExpboost) + "\n소모된 HP : " + g + "\n\n[+] 복주머니 [A] × 1 획득!");
      user.inv_gold += 1;
      user.Exp += Math.round(15000 * user.RExpboost);
      user.pickaxe_over_Exp += 100 * EXP_EV;
      user.pickaxe_Exptotal += 100 * EXP_EV;
      user.hp -= g;
      user.inv_event4 += 1;
      user.rankscore += 3 * rankscoreE;
      savePlayer(user, sender);
     }
   }
    else if(a <= h){
      if(j <= 176){
      replier.reply("- 광물 채굴 결과 -\n\n크리스탈 채굴 성공!\n획득한 EXP : " + (40000 * user.RExpboost) + "\n소모된 HP : " + g);
      user.inv_cristal += 1;
      user.Exp += Math.round(40000 * user.RExpboost);
      user.pickaxe_over_Exp += 200 * EXP_EV;
      user.pickaxe_Exptotal += 200 * EXP_EV;
      user.hp -= g;
      user.rankscore += 5 * rankscoreE;
      savePlayer(user, sender);
     }
     else {
       replier.reply("- 광물 채굴 결과 -\n\n크리스탈 채굴 성공!\n획득한 EXP : " + (40000 * user.RExpboost) + "\n소모된 HP : " + g + "\n\n[+] 복주머니 [A] × 1 획득!");
      user.inv_cristal += 1;
      user.Exp += Math.round(40000 * user.RExpboost);
      user.pickaxe_over_Exp += 200 * EXP_EV;
      user.pickaxe_Exptotal += 200 * EXP_EV;
      user.hp -= g;
      user.rankscore += 5 * rankscoreE;
      savePlayer(user, sender);
     }
   }
    else if(a <= i){
      replier.reply("- 광물 채굴 결과 -\n\n다이아몬드 채굴 성공!\n획득한 EXP : " + (150000 * user.RExpboost) + "\n소모된 HP : " + g + "\n\n[+] 복주머니 [S] × 1 획득!!");
      user.inv_diamond += 1;
      user.Exp += Math.round(150000 * user.RExpboost);
      user.pickaxe_over_Exp += 500 * EXP_EV;
      user.pickaxe_Exptotal += 500 * EXP_EV;
      user.hp -= g;
      user.inv_event5 += 1;
      user.rankscore += 10 * rankscoreE;
      savePlayer(user, sender);
    }
  }
  }
  }
  
 /* if(msg == "*장소 이동 R"){
    if(user.name == "네몽팬" || user.name == "독구" || user.name == "김현수" || user.name == "무데이터" || user.name == "사명이" || user.name == "순애물" || user.name == "어디가발이지" || user.name == "ch.독일냥이" || user.name == "재웅" || user.name == "하늘구름2" || user.name == "PKM덕포"){
      replier.reply("- 악마의 둥지 -\n(월드레이드 필드 - 권장 Lv ??+)\n\n*공격 으로 즉시 레이드를 시작하세요!\n\n[!] 불길한 기운 5스택을 채우지 마세요.\n*정화 로 체력 10%를 감소시켜 불길한 기운 스택을 제거할 수 있습니다.");
      user.mapid = 10005;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
    }
    else{
      replier.reply("입장권이 없습니다.");
    }
  }
  
  if(msg == "*공격" && user.mapid == 10005 && user.Rhp <= 0){
    replier.reply(sender + "님이 레이드 진행 도중 사망하셨습니다. *회복 후 공격해주세요.");
    user.event3 = 0;
    savePlayer(user, sender);
  }
  
  if(msg == "*공격" && user.mapid == 10005 && user.Rhp > 0){
    if(user.event3 < 50){
      z = updatePlayer("PIPI38");
      a = Math.floor(z.boss_hp / 100000);
      b = z.boss_hp - 100000 * a;
      replier.reply("[World Raid]\n\n\n" + sender + "님이 암흑의 악마에게 " + user.Ratk + "데미지를 입혔습니다.\n\nLv. 500 암흑의 악마 [HARD]\n\nHP : " + z.boss_hp + " / 3000000\n" + makeBar(b, z.max_bar, 10) + "] × " + a + "\n\n암흑의 악마에게 " + (38 + (user.event3 * 5)) + "데미지를 입었습니다.\n\n현재 " + sender + "님의 불길한 기운 스택 : " + user.event3);
      user.hp -= 38 + (user.event3 * 1);
      z.boss_hp -= user.Ratk;
      user.event2 += user.Ratk;
      user.event3 += 1;
      savePlayer(user, sender);
      savePlayer(z, "PIPI38");
    }
    else if(user.event3 == 50){
      replier.reply("불길한 기운이 " + sender + "님을 둘러쌉니다...\n\n\n알 수 없는 힘에 의해 1000데미지를 입었습니다.");
      user.event3 = 0;
      user.hp -= 1000;
      savePlayer(user, sender);
    }
  }
  
  if(msg == "*정화"){
    replier.reply("불길한 기운을 모두 제거했습니다!\n\n소모된 체력 : " + Math.round(user.Rhp / 10));
    user.hp -= Math.round(user.Rhp / 10);
    user.event3 = 0;
    savePlayer(user, sender);
  }
  */
  /*if(msg == "보스목록"){
    replier.reply("[Lv 250] 대지의 드래곤\nDifficulty : HARD+\nHP : 1OO,OOO");
  }*/
  
  if(msg == "*보상" && user.mapid == 10005){
    if(user.level >= 200){
      replier.reply("RANK : A\n\n아래 보상이 지급됩니다.\n\n\n-> 10,000,000 EXP\n-> 400,000 G\n-> 40 💎\n-> 700 Raid Coin\n-> 중급 제련석 × 30\n-> 힘의 가루 × 40\n-> 다이아몬드 × 1");
      user.Exp += 10000000;
      user.gold += 400000;
      user.superdiamond += 40;
      user.raid_coin = 700;
      user.inv_jstone_m += 30;
      user.powerstone_s = 40;
      user.inv_diamond += 1;
      user.mapid = 0;
      savePlayer(user, sender);
    }
    else if(user.level >= 100){
      replier.reply("RANK : B\n\n아래 보상이 지급됩니다.\n\n\n-> 2,000,000 EXP\n-> 300,000 G\n-> 30 💎\n-> 500 Raid Coin\n-> 하급 제련석 × 40\n-> 힘의 가루 × 30");
      user.Exp += 2000000;
      user.gold += 300000;
      user.superdiamond += 30;
      user.raid_coin = 500;
      user.inv_jstone_s += 40;
      user.powerstone_s = 30;
      user.mapid = 0;
      savePlayer(user, sender);
    }
    else if(user.level >= 1){
      replier.reply("RANK : C\n\n아래 보상이 지급됩니다.\n\n\n-> 500,000 EXP\n-> 200,000 G\n-> 20 💎\n-> 300 Raid Coin\n-> 하급 제련석 × 30\n-> 힘의 가루 × 20");
      user.Exp += 500000;
      user.gold += 200000;
      user.superdiamond += 20;
      user.raid_coin = 300;
      user.inv_jstone_s += 30;
      user.powerstone_s = 20;
      user.mapid = 0;
      savePlayer(user, sender);
    }
  }
  
  if(msg == "Bar"){
    a = Math.floor(user.boss_hp / 100000);
    b = user.boss_hp - 100000 * a;
    replier.reply("(TEST) / (TEST)\n\n[" + makeBar(b, user.max_bar, 10) + "] × " + a);
  }
  
  if(msg == "깎"){
    user.boss_hp -= 60000;
    savePlayer(user, sender);
    a = Math.floor(user.boss_hp / 100000);
    b = user.boss_hp - 100000 * a;
    replier.reply("(TEST) / (TEST)\n\n[" + makeBar(b, user.max_bar, 10) + "] × " + a);
  }
  
  if(msg == "*장소"){
    replier.reply("아래 명령어로 원하시는 장소 목록을 확인하세요!\n\n\n*장소 PK던전 (준비중)\n-> 플레이어 간 전투가 가능한 던전목록을 확인합니다.\n\n*장소 던전\n-> 일반 던전, 일반 재료수급형 장소를 확인합니다.\n\n*장소 레이드\n-> 영광의 도전을 포함한 모든 레이드 관련 장소를 확인합니다.");
  }
  
  if (msg == "*장소 던전") {
    replier.reply("\n일반장소 목록입니다.\n" + "\u200b".repeat(500) + "\n\n\n※ 사냥터의 종류에 따라 아래와 같이 표기합니다.\n○ = 일반 던전\n□ = 특수 던전\n☆ = 이벤트 던전\n■ = 보스 던전\n◇ = 기타 장소\n\n○ / id 1 / 청천초원 [Lv 1+]\n○ / id 2 / 청천산림 [Lv 15+]\n○ / id 3 / 영녹의 숲 [Lv 30+]\n○ / id 4 / 덩굴투성이 언덕 [Lv 45+]\n○ / id 5 / 광활한 탁상지 [Lv 60+]\n○ / id 6 / 사암 절벽 [Lv 75+]\n○ / id 7 / 모래 무덤 [Lv 90+]\n○ / id 8 / 죽음모래 구름 [Lv 105+]\n○ / id 9 / 수정바위 대하 [Lv 120+]\n○ / id 10 / 안개늪 [Lv 135+]\n○ / id 11 / 안개산맥 하층부 [Lv 150+]\n○ / id 12 / 안개산맥 상층부 [Lv 165+]\n○ / id 13 / 냉기굴 [Lv 180+]\n○ / id 14 / 드워프 광산 입구 [Lv 195+]\n○ / id 15 / 광산 중층부 [Lv 210+]\n○ / id 16 / 봉인된 심층부 [Lv 225+]\n○ / id 17 / 어둠에 물든 폐허 [Lv 240+]\n○ / id 18 / 마물 초소 [Lv 255+]\n○ / id 19 / 집결지 [Lv 270+]\n○ / id 20 / 집결지 외곽 [Lv 285+]\n○ / id 21 / 고립된 진지 [Lv 300+] [난이도 상승]\n○ / id 22 / 매장된 샛길 [Lv 315+]\n\n\n◇ / id A1 / 광산 [Lv 1+]\n◇ / id A2 / 잊혀진 지하광산 [Lv 1+]\n◇ / id B / 거래소 [Lv 1+]\n◇ / id C / 달무름꽃 정원 [Lv 1+]\n◇ / id T1 / 하급 제련석 광산 [Lv 1+]\n◇ / id T2 / 중급 제련석 광산 [Lv 1+]\n\n장소는 계속 추가됩니다 :)");
  }
  
  if(msg == "*장소 레이드"){
    replier.reply("\n레이드장소 목록입니다.\n" + "\u200b".repeat(500) + "\n\n\n※ 사냥터의 종류에 따라 아래와 같이 표기합니다.\n○ = 일반 던전\n□ = 특수 던전\n☆ = 이벤트 던전\n■ = 보스 던전\n◇ = 기타 장소\n\n■ / id W1 / 영광의 도전 [주간레이드]");
  }
  
  if(msg == "*장소 이동 W1"){
    replier.reply("⚠️ 현재 오픈 준비중입니다. 모든 버그 수정후 공지해드릴게요! ⚠️\n\n[현재 목표 보스]\n-> 타락한 기사단장\n\n곧 여러 보스들이 업데이트 및 교체됩니다!\n\n\n[난이도 목록]\n\n○ = 1 TIER\n□ = 2 TIER\n● = 3 TIER\n■ = 4 TIER\n{■} = MASTER TIER\n\n\n○ / 태양 • 1단계 • ID 101\n-> 필요 장비Lv 0 / 권장 유저Lv 15+\n\n○ / 태양 • 2단계 • ID 102\n-> 필요 장비Lv 20 / 권장 유저Lv 50+\n\n○ / 태양 • 3단계 • ID 103\n-> 필요 장비Lv 40 / 권장 유저Lv 120\n\n\n□ / 달 • 1단계 • ID 201\n-> 필요 장비Lv 65 / 권장 유저Lv 220\n\n\n*레이드 시작 (id)로 레이드를 시작하세요!");
    user.mapid = 5001;
    savePlayer(user, sender);
  }
  
  /*if(msg == "*레이드 시작 101"){
    if(user.week1_try == 3){
      replier.reply("잡으실 수 있는 보스를 모두 처치했습니다!\n\n입장 가능횟수 초기화 : 일요일 오후 10시 ~ 자정");
    }
    else if(user.work_id == 0 || user.work_id == 4){
      user.week1_play = true;
      user.boss_id = 101;
      user.bossbar1 = 500;
      user.boss_hpmax = 3000;
      user.boss_hp = 3000;
      user.boss_atk = 7;
      replier.reply("< 타락한 기사단장 >\n[ ! ] 직업 밸런스를 위해 보스 능력치가 조정되었습니다!\n\nBOSS HP _ " + user.boss_hp + " / " + user.boss_hpmax + "\n");
    }
    
  }*/
  
  if(msg == "*장소 이동 T1"){
    replier.reply("- 하급 제련석 광산 -\n(특수 광산 - 권장 LV 1+)\n\n하급 돌파석 재료인 하급 제련석 채굴이 가능합니다.\n\n*채굴 로 하급 제련석을 채굴하세요!");
    user.mapid = 10011;
    savePlayer(user, sender);
  }
  
  if(msg == "*장소 이동 T2"){
    replier.reply("- 중급 제련석 광산 -\n(특수 광산 - 권장 LV 1+)\n\n중급 돌파석 재료인 중급 제련석 채굴이 가능합니다.\n\n*채굴 로 중급 제련석을 채굴하세요!");
    user.mapid = 10012;
    savePlayer(user, sender);
  }
  
  if(msg == "*채굴" && user.mapid == 10011 && user.Rhp > 0){
    R = makeRnd(1, 100);
    Hp = Math.round(user.Rhpmax / 50);
    if(R > 50){
      replier.reply("하급 제련석 원석을 채굴하여 순수한 하급 제련석을 획득했습니다!\n\n[ + ] 하급 제련석 × 1 획득!\n[ - ] HP - " + Hp);
      user.inv_jstone_s += 1;
      user.hp -= Hp;
      savePlayer(user, sender);
    }
    else{
      replier.reply("하급 제련석 채굴에 실패했습니다...\n\n[ - ] HP - " + Hp);
      user.hp -= Hp;
      savePlayer(user, sender);
    }
  }
  
  if(msg == "*채굴" && user.mapid == 10012 && user.Rhp > 0){
    R = makeRnd(1, 100);
    Hp = Math.round(user.Rhpmax / 50);
    if(R > 50){
      replier.reply("중급 제련석 원석을 채굴하여 순수한 중급 제련석을 획득했습니다!\n\n[ + ] 중급 제련석 × 1 획득!\n[ - ] HP - " + Hp);
      user.inv_jstone_m += 1;
      user.hp -= Hp;
      savePlayer(user, sender);
    }
    else{
      replier.reply("중급 제련석 채굴에 실패했습니다...\n\n[ - ] HP - " + Hp);
      user.hp -= Hp;
      savePlayer(user, sender);
    }
  }
  
  if(msg == "*채굴" && user.mapid == 10003 && user.Rhp > 0){
    a = makeRnd(1, 10000);
    Hp = Math.round(user.Rhpmax / 50);
    if(a <= 200){
      replier.reply("💎 × 1 채굴 성공!\n\n[ + ] 💎 × 1 획득!");
      user.hp -= Hp;
      user.superdiamond += 1;
      user.rankscore += 6;
      savePlayer(user, sender);
    }
    else if(a < 5200){
      v = makeRnd(1, 5);
      replier.reply("강화석 결정 × " + v + " 채굴 성공!\n\n[ + ] 강화석 결정 × " + v + " 획득!");
      user.hp -= Hp;
      user.inv_stone2 += v;
      user.rankscore += 6;
      savePlayer(user, sender);
    }
    else if(a < 9500){
      a = makeRnd(1, 2);
      replier.reply("보라빛 마법석 × " + a + " 채굴 성공!\n\n[ + ] 보라빛 마법석 × " + a + "획득!");
      user.hp -= Hp;
      user.inv_purplestone += a;
      user.rankscore += 6;
      savePlayer(user, sender);
    }
    else if(a < 10000){
      replier.reply("황금빛 마법석 × 1 채굴 성공!\n\n[ + ] 황금빛 마법석 × 1 획득!");
      user.hp -= Hp;
      user.inv_goldstone += 1;
      user.rankscore += 6;
      savePlayer(user, sender);
    }
  }
  
  if(msg == "*채집" && user.Rhp > 0 && user.mapid == 10004){
    a = makeRnd(1, 10000);
    Hp = Math.round(user.Rhpmax / 50);
    if(a <= 6480){
      replier.reply("달 아래에서 달빛 흔적 × " + (1 + moon) + "을 찾았습니다!\n\n[ + ] 달빛 흔적 × " + (1 + moon));
      user.inv_moon_1 += (1 + moon);
      user.hp -= Hp;
      user.rankscore += 6;
      savePlayer(user, sender);
    }
    else if(a <= 9480){
      replier.reply("달 아래에서 달빛 가루 × " + (1 + moon) + "을 찾았습니다!\n\n[ + ] 달빛 가루 × " + (1 + moon));
      user.inv_moon_2 += (1 + moon);
      user.hp -= Hp;
      user.rankscore += 6;
      savePlayer(user, sender);
    }
    else if(a <= 9880){
      replier.reply("달 아래에서 달빛을 머금은 달 파편 × " + (1 + moon) + "을 찾았습니다!\n\n[ + ] 달빛을 머금은 달 파편 × " + (1 + moon));
      user.inv_moon_3 += (1 + moon);
      user.hp -= Hp;
      user.rankscore += 6;
      savePlayer(user, sender);
    }
    else if(a <= 9980){
      replier.reply("달 아래에서 빛나는 달빛 수정 × " + (1 + moon) + "을 찾았습니다!\n\n[ + ] 빛나는 달빛 수정 × " + (1 + moon));
      user.inv_moon_4 += (1 + moon);
      user.hp -= Hp;
      user.rankscore += 6;
      savePlayer(user, sender);
    }
    else {
      replier.reply("달 아래에서 지식의 고서를 찾았어요!!\n\n[ + ] 지식의 고서 × 1");
      user.inv_book_1 += 1;
      user.hp -= Hp;
      user.rankscore += 6;
      savePlayer(user, sender);
    }
  }
  
  if (msg == "*장소 이동 1" && user.level !== undefined){
    replier.reply("- 청천 초원 -\n(일반 사냥터 - 권장 Lv 1+)\n\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 1;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 2" && user.level !== undefined){
    replier.reply("- 청천 산림 -\n(일반 사냥터 - 권장 Lv 15+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 2;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 3" && user.level !== undefined){
    replier.reply("- 영녹의 숲 -\n(일반 사냥터 - 권장 Lv 30+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 3;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 4" && user.level !== undefined){
    replier.reply("- 덩굴투성이 언덕 -\n(일반 사냥터 - 권장 Lv 45+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 4;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 5" && user.level !== undefined){
    replier.reply("- 광활한 탁상지 -\n(일반 사냥터 - 권장 Lv 60+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 5;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 6" && user.level !== undefined){
    replier.reply("- 사암 절벽 -\n(일반 사냥터 - 권장 Lv 75+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 6;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 7" && user.level !== undefined){
    replier.reply("- 모래 무덤 -\n(일반 사냥터 - 권장 Lv 90+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 7;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 8" && user.level !== undefined){
    replier.reply("- 죽음모래 구름 -\n(일반 사냥터 - 권장 Lv 105+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 8;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 9" && user.level !== undefined){
    replier.reply("- 수정바위 대하 -\n(일반 사냥터 - 권장 Lv 120+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 9;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 10" && user.level !== undefined){
    replier.reply("- 안개늪 -\n(일반 사냥터 - 권장 Lv 135+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 10;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 11" && user.level !== undefined){
    replier.reply("- 안개산맥 하층부 -\n(일반 사냥터 - 권장 Lv 150+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 11;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 12" && user.level !== undefined){
    replier.reply("- 안개산맥 상층부 -\n(일반 사냥터 - 권장 Lv 165+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 12;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 13" && user.level !== undefined){
    replier.reply("- 냉기굴 -\n(일반 사냥터 - 권장 Lv 180+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 13;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 14" && user.level !== undefined){
    replier.reply("- 드워프 광산 입구 -\n(일반 사냥터 - 권장 Lv 195+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 14;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 15" && user.level !== undefined){
    replier.reply("- 광산 중층부 -\n(일반 사냥터 - 권장 Lv 210+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 15;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 16" && user.level !== undefined){
    replier.reply("- 봉인된 심층부 -\n(일반 사냥터 - 권장 Lv 225+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 16;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 17" && user.level !== undefined){
    replier.reply("- 어둠에 물든 폐허 -\n(일반 사냥터 - 권장 Lv 240+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 17;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 18" && user.level !== undefined){
    replier.reply("- 마물 초소 -\n(일반 사냥터 - 권장 Lv 255+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 18;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 19" && user.level !== undefined){
    replier.reply("- 집결지 -\n(일반 사냥터 - 권장 Lv 270+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 19;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 20" && user.level !== undefined){
    replier.reply("- 집결지 외곽 -\n(일반 사냥터 - 권장 Lv 285+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 20;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 21" && user.level !== undefined){
    replier.reply("- 고립된 진지 -\n(일반 사냥터 - 권장 Lv 300+ - 난이도 상승)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 21;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*장소 이동 22" && user.level !== undefined){
    replier.reply("- 매장된 샛길 -\n(일반 사냥터 - 권장 Lv 315+)\n*사냥 으로 사냥을 시작하세요!");
    user.mapid = 22;
    FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
  }
  
  if (msg == "*사냥" && user.mapid == 1){
    a = "《Lv . 1》 초원늑대";
    a_ab = "HP 95 / ATK 5";
    b = "《Lv . 7》 초원늑대 우두머리";
    b_ab = "HP 145 / ATK 6";
    c = "《Lv . 11》 굶주린 늑대무리";
    c_ab = "HP 210 / ATK 7";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 하급 제련석 (드랍률 5%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
 
  if (msg == "*사냥" && user.mapid == 2){
    a = "《Lv . 17》 깃털갈기 늑대";
    a_ab = "HP 310 / ATK 8";
    b = "《Lv . 24》 오염된 짐승무리";
    b_ab = "HP 470 / ATK 10";
    c = "《Lv . 30》 소형 마물";
    c_ab = "HP 655 / ATK 12";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 하급 제련석 (드랍률 5%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
 
  if (msg == "*사냥" && user.mapid == 3){
    a = "《Lv . 32》 은송곳니 멧돼지";
    a_ab = "HP 450 / ATK 27";
    b = "《Lv . 38》 위장색 마물";
    b_ab = "HP 895 / ATK 14";
    c = "《Lv . 42》 오염된 나무덩굴";
    c_ab = "HP 1,020 / ATK 16";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 하급 제련석 (드랍률 5%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
 
  if (msg == "*사냥" && user.mapid == 4){
    a = "《Lv . 48》 이끼바위 벌레";
    a_ab = "HP 1,195 / ATK 18";
    b = "《Lv . 54》 날카로운 가시고목";
    b_ab = "HP 910 / ATK 30";
    c = "《Lv . 59》 초목의 심령";
    c_ab = "HP 1,370 / ATK 20";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 종이 조각 (드랍률 5%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
 
  if (msg == "*사냥" && user.mapid == 5){
    a = "《Lv . 64》 모래먼지 코어";
    a_ab = "HP 12,000 / ATK 2";
    b = "《Lv . 70》 사암 투척꾼";
    b_ab = "HP 1,700 / ATK 23";
    c = "《Lv . 74》 모래은신 강도";
    c_ab = "HP 1,865 / ATK 23";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 보라빛 마법석 (드랍률 5%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
  
  if (msg == "*사냥" && user.mapid == 6){
    a = "《Lv . 78》 모래귀신";
    a_ab = "HP 2,000 / ATK 24";
    b = "《Lv . 82》 대지 약탈자";
    b_ab = "HP 2,250 / ATK 26";
    c = "《Lv . 88》 바실리스크";
    c_ab = "HP 2,520 / ATK 27";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 보라빛 마법석 (드랍률 5%)\n>> 황금빛 마법석 (드랍률 2%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
  
  if (msg == "*사냥" && user.mapid == 7){
    a = "《Lv . 93》 타락한 모래요정";
    a_ab = "HP 2,870 / ATK 29";
    b = "《Lv . 97》 저주에 물든 유해";
    b_ab = "HP 3,255 / ATK 30";
    c = "《Lv . 103》 사암 좀비";
    c_ab = "HP 1,250 / ATK 93";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 보라빛 마법석 (드랍률 5%)\n>> 황금빛 마법석 (드랍률 2%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
  
  if (msg == "*사냥" && user.mapid == 8){
    a = "《Lv . 110》 칼날풀";
    a_ab = "HP 300 / ATK 150";
    b = "《Lv . 117》 몰락한 동부인";
    b_ab = "HP 3,415 / ATK 33";
    c = "없음";
    c_ab = "없음";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 보라빛 마법석 (드랍률 5%)\n>> 황금빛 마법석 (드랍률 2%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
  
  if (msg == "*사냥" && user.mapid == 9){
    a = "《Lv . 123》 빛나는 수정상어";
    a_ab = "HP 3,860 / ATK 35";
    b = "《Lv . 127》 협곡의 바위게";
    b_ab = "HP 4,135 / ATK 36";
    c = "《Lv . 132》 변질된 수정괴어";
    c_ab = "HP 1 / ATK 300";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 자수정 광석 (드랍률 5%)\n>> 토파즈 광석 (드랍률 2%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
  
  if (msg == "*사냥" && user.mapid == 10){
    a = "《Lv . 138》 침식된 망자";
    a_ab = "HP 4,305 / ATK 37";
    b = "《Lv . 144》 형체잃은 망령";
    b_ab = "HP 4,650 / ATK 39";
    c = "없음";
    c_ab = "없음";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 자수정 광석 (드랍률 5%)\n>> 토파즈 광석 (드랍률 2%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
  
  if (msg == "*사냥" && user.mapid == 11){
    a = "《Lv . 152》 등뼈 약탈자";
    a_ab = "HP 5,160 / ATK 43";
    b = "《Lv . 160》 문드러진 나무요정";
    b_ab = "HP 5,685 / ATK 45";
    c = "없음";
    c_ab = "없음";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 종이 조각 (드랍률 5%)\n>> 토파즈 광석 (드랍률 2%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
  
  if (msg == "*사냥" && user.mapid == 12){
    a = "《Lv . 167》 죄업의 만년설";
    a_ab = "HP 6,270 / ATK 47";
    b = "《Lv . 172》 눈덩이 괴물";
    b_ab = "HP 10,000 / ATK 31";
    c = "《Lv . 179》 혹한의 냉기수호자";
    c_ab = "HP 2,500 / ATK 134";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 종이 조각 (드랍률 5%)\n>> 중급 제련석 (드랍률 2%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
  
  if (msg == "*사냥" && user.mapid == 13){
    a = "《Lv . 184》 드워프 일꾼";
    a_ab = "HP 7,000 / ATK 49";
    b = "《Lv . 190》 드워프 전사";
    b_ab = "HP 7,700 / ATK 51";
    c = "《Lv . 195》 참나무방패 드워프";
    c_ab = "HP 8,500 / ATK 51";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 하급 제련석 (드랍률 5%)\n>> 중급 제련석 (드랍률 2%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
  
  if (msg == "*사냥" && user.mapid == 14){
    a = "《Lv . 202》 드워프 광부";
    a_ab = "HP 4,500 / ATK 70";
    b = "《Lv . 209》 무쇠발 드워프대장";
    b_ab = "HP 10,000 / ATK 50";
    c = "없음";
    c_ab = "없음";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 하급 제련석 (드랍률 5%)\n>> 중급 제련석 (드랍률 2%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
  
  if (msg == "*사냥" && user.mapid == 15){
    a = "《Lv . 216》 철주먹 바위일꾼";
    a_ab = "HP 9,000 / ATK 52";
    b = "《Lv . 223》 돌투구 갑옷전사";
    b_ab = "HP 20,000 / ATK 5";
    c = "없음";
    c_ab = "없음";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 보라빛 마법석 (드랍률 5%)\n>> 크리스탈 (드랍률 2%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
  
  if (msg == "*사냥" && user.mapid == 16){
    a = "《Lv . 229》 흑요석 경비병";
    a_ab = "HP 10,500 / ATK 57";
    b = "《Lv . 235》 황금갑주 대전사장";
    b_ab = "HP 10,500 / ATK 60";
    c = "없음";
    c_ab = "없음";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 보라빛 마법석 (드랍률 5%)\n>> 크리스탈 (드랍률 2%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
  
  if (msg == "*사냥" && user.mapid == 17){
    a = "《Lv . 244》 드워프 구울";
    a_ab = "HP 7,000 / ATK 94";
    b = "《Lv . 250》 어둠발록 아성체";
    b_ab = "HP 10,000 / ATK 75";
    c = "《Lv . 255》 변이된 어둠발록";
    c_ab = "HP 13,000 / ATK 66";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 보라빛 마법석 (드랍률 5%)\n>> 중급 제련석 (드랍률 2%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
  
  if (msg == "*사냥" && user.mapid == 18){
    a = "《Lv . 262》 혼돈의 정령";
    a_ab = "HP 12,000 / ATK 75";
    b = "《Lv . 268》 칼날 도약자";
    b_ab = "HP 13,000 / ATK 77";
    c = "없음";
    c_ab = "없음";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 보라빛 마법석 (드랍률 5%)\n>> 중급 제련석 (드랍률 2%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
  
  if (msg == "*사냥" && user.mapid == 19){
    a = "《Lv . 275》 악몽 전달자";
    a_ab = "HP 10,000 / ATK 93";
    b = "《Lv . 282》 하급 리치";
    b_ab = "HP 11,000 / ATK 91";
    c = "없음";
    c_ab = "없음";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 보라빛 마법석 (드랍률 5%)\n>> 황금빛 마법석 (드랍률 2%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
  
  if (msg == "*사냥" && user.mapid == 20){
    a = "《Lv . 290》 중급 리치";
    a_ab = "HP 12,500 / ATK 96";
    b = "《Lv . 296》 공허 싸움꾼";
    b_ab = "HP 13,000 / ATK 102";
    c = "없음";
    c_ab = "없음";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 보라빛 마법석 (드랍률 5%)\n>> 황금빛 마법석 (드랍률 2%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
  
  if (msg == "*사냥" && user.mapid == 21){
    a = "《Lv . 303》 섀도우 워커";
    a_ab = "HP 21,000 / ATK 116";
    b = "《Lv . 311》 폭풍의 사신";
    b_ab = "HP 23,000 / ATK 121";
    c = "없음";
    c_ab = "없음";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 보라빛 마법석 (드랍률 5%)\n>> 황금빛 마법석 (드랍률 2%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
  
  if (msg == "*사냥" && user.mapid == 22){
    a = "《Lv . 319》 어둠독 거미";
    a_ab = "HP 23,000 / ATK 124";
    b = "《Lv . 328》 죽음의 사도";
    b_ab = "HP 20,000 / ATK 151";
    c = "없음";
    c_ab = "없음";
    replier.reply("[드랍템 목록]\n\n> 몬스터의 잔해\n> 보라빛 마법석 (드랍률 5%)\n>> 중급 돌파석 (드랍률 2%)\n\n\n[몬스터 목록]\n\n\n" + a + " (id 1)\n" + a_ab + "\n\n" + b + " (id 2)\n" + b_ab + "\n\n" + c + " (id 3)\n" + c_ab + "\n\n*사냥 (몬스터id)로 사냥을 시작하세요!");
  }
 
  if (msg == "*사냥 1" && user.mid == 0){
    if(user.mapid == 1){
      user.mid = 1;
      user.mlevel = 1;
      user.mname = "초원늑대";
      user.mexp = 1285;
      user.mgold = 370;
      user.mhp = 95;
      user.mhpmax = 95;
      user.matk = 5;
      user.mprotect = 1;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 2){
      user.mid = 1;
      user.mlevel = 17;
      user.mname = "깃털갈기 늑대";
      user.mexp = 2405;
      user.mgold = 475;
      user.mhp = 310;
      user.mhpmax = 310;
      user.matk = 8;
      user.mprotect = 4;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
     replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 3){
      user.mid = 1;
      user.mlevel = 32;
      user.mname = "은송곳니 멧돼지";
      user.mexp = 4675;
      user.mgold = 585;
      user.mhp = 450;
      user.mhpmax = 450;
      user.matk = 27;
      user.mprotect = 7;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
    replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 4){
      user.mid = 1;
      user.mlevel = 48;
      user.mname = "이끼바위 벌레";
      user.mexp = 5840;
      user.mgold = 725;
      user.mhp = 1195;
      user.mhpmax = 1195;
      user.matk = 18;
      user.mprotect = 10;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 5){
      user.mid = 1;
      user.mlevel = 64;
      user.mname = "모래먼지 코어";
      user.mexp = 12240;
      user.mgold = 820;
      user.mhp = 12000;
      user.mhpmax = 12000;
      user.matk = 2;
      user.mprotect = 30;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 6){
      user.mid = 1;
      user.mlevel = 78;
      user.mname = "모래귀신";
      user.mexp = 16270;
      user.mgold = 880;
      user.mhp = 2000;
      user.mhpmax = 2000;
      user.matk = 24;
      user.mprotect = 15;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 7){
      user.mid = 1;
      user.mlevel = 93;
      user.mname = "타락한 모래요정";
      user.mexp = 24825;
      user.mgold = 1060;
      user.mhp = 2870;
      user.mhpmax = 2870;
      user.matk = 29;
      user.mprotect = 15;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 8){
      user.mid = 1;
      user.mlevel = 110;
      user.mname = "칼날풀";
      user.mexp = 38560;
      user.mgold = 1220;
      user.mhp = 300;
      user.mhpmax = 300;
      user.matk = 150;
      user.mprotect = 0;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 9){
      user.mid = 1;
      user.mlevel = 123;
      user.mname = "빛나는 수정상어";
      user.mexp = 51320;
      user.mgold = 1320;
      user.mhp = 3860;
      user.mhpmax = 3860;
      user.matk = 35;
      user.mprotect = 15;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 10){
      user.mid = 1;
      user.mlevel = 138;
      user.mname = "침식된 망자";
      user.mexp = 78080;
      user.mgold = 1420;
      user.mhp = 4305;
      user.mhpmax = 4305;
      user.matk = 37;
      user.mprotect = 20;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 11){
      user.mid = 1;
      user.mlevel = 152;
      user.mname = "등뼈 약탈자";
      user.mexp = 94630;
      user.mgold = 1470;
      user.mhp = 5160;
      user.mhpmax = 5160;
      user.matk = 43;
      user.mprotect = 40;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 12){
      user.mid = 1;
      user.mlevel = 167;
      user.mname = "죄업의 만년설";
      user.mexp = 130675;
      user.mgold = 1520;
      user.mhp = 6270;
      user.mhpmax = 6270;
      user.matk = 47;
      user.mprotect = 30;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 13){
      user.mid = 1;
      user.mlevel = 184;
      user.mname = "드워프 일꾼";
      user.mexp = 195395;
      user.mgold = 1620;
      user.mhp = 7000;
      user.mhpmax = 7000;
      user.matk = 49;
      user.mprotect = 40;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 14){
      user.mid = 1;
      user.mlevel = 202;
      user.mname = "드워프 광부";
      user.mexp = 251780;
      user.mgold = 1670;
      user.mhp = 4500;
      user.mhpmax = 4500;
      user.matk = 70;
      user.mprotect = 50;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 15){
      user.mid = 1;
      user.mlevel = 216;
      user.mname = "철주먹 바위일꾼";
      user.mexp = 346475;
      user.mgold = 1720;
      user.mhp = 9000;
      user.mhpmax = 9000;
      user.matk = 52;
      user.mprotect = 30;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 16){
      user.mid = 1;
      user.mlevel = 229;
      user.mname = "흑요석 경비병";
      user.mexp = 458875;
      user.mgold = 1800;
      user.mhp = 10500;
      user.mhpmax = 10500;
      user.matk = 57;
      user.mprotect = 30;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 17){
      user.mid = 1;
      user.mlevel = 244;
      user.mname = "드워프 구울";
      user.mexp = 627955;
      user.mgold = 1900;
      user.mhp = 7000;
      user.mhpmax = 7000;
      user.matk = 94;
      user.mprotect = 50;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 18){
      user.mid = 1;
      user.mlevel = 262;
      user.mname = "혼돈의 정령";
      user.mexp = 933055;
      user.mgold = 2000;
      user.mhp = 12000;
      user.mhpmax = 12000;
      user.matk = 75;
      user.mprotect = 50;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 19){
      user.mid = 1;
      user.mlevel = 275;
      user.mname = "악몽 전달자";
      user.mexp = 1374070;
      user.mgold = 2000;
      user.mhp = 10000;
      user.mhpmax = 10000;
      user.matk = 93;
      user.mprotect = 50;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 20){
      user.mid = 1;
      user.mlevel = 290;
      user.mname = "중급 리치";
      user.mexp = 1780500;
      user.mgold = 2000;
      user.mhp = 12500;
      user.mhpmax = 12500;
      user.matk = 96;
      user.mprotect = 70;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 21){
      user.mid = 1;
      user.mlevel = 303;
      user.mname = "섀도우 워커";
      user.mexp = 2443060;
      user.mgold = 2000;
      user.mhp = 21000;
      user.mhpmax = 21000;
      user.matk = 116;
      user.mprotect = 125;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 22){
      user.mid = 1;
      user.mlevel = 319;
      user.mname = "어둠독 거미";
      user.mexp = 2935500;
      user.mgold = 2000;
      user.mhp = 23000;
      user.mhpmax = 23000;
      user.matk = 124;
      user.mprotect = 150;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
  }
  
 //장소 id × 20% 올리기
 
   if (msg == "*사냥 2" && user.mid == 0){
    if(user.mapid == 1){
      user.mid = 2;
      user.mlevel = 7;
      user.mname = "초원늑대 우두머리";
      user.mexp = 1410;
      user.mgold = 405;
      user.mhp = 145;
      user.mhpmax = 145;
      user.matk = 6;
      user.mprotect = 2;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 2){
      user.mid = 2;
      user.mlevel = 24;
      user.mname = "오염된 짐승무리";
      user.mexp = 1940;
      user.mgold = 505;
      user.mhp = 470;
      user.mhpmax = 470;
      user.matk = 10;
      user.mprotect = 5;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 3){
      user.mid = 2;
      user.mlevel = 38;
      user.mname = "위장색 마물";
      user.mexp = 2585;
      user.mgold = 635;
      user.mhp = 895;
      user.mhpmax = 895;
      user.matk = 14;
      user.mprotect = 8;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 4){
      user.mid = 2;
      user.mlevel = 54;
      user.mname = "날카로운 가시고목";
      user.mexp = 3340;
      user.mgold = 770;
      user.mhp = 910;
      user.mhpmax = 910;
      user.matk = 30;
      user.mprotect = 11;
      user.mprotectx = 30;
    }
    if(user.mapid == 5){
      user.mid = 1;
      user.mlevel = 70;
      user.mname = "사암 투척꾼";
      user.mexp = 4535;
      user.mgold = 825;
      user.mhp = 1700;
      user.mhpmax = 1700;
      user.matk = 23;
      user.mprotect = 15;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 6){
      user.mid = 1;
      user.mlevel = 82;
      user.mname = "대지 약탈자";
      user.mexp = 8080;
      user.mgold = 940;
      user.mhp = 2250;
      user.mhpmax = 2250;
      user.matk = 26;
      user.mprotect = 15;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 7){
      user.mid = 1;
      user.mlevel = 97;
      user.mname = "저주에 물든 유해";
      user.mexp = 11765;
      user.mgold = 1120;
      user.mhp = 3255;
      user.mhpmax = 3255;
      user.matk = 30;
      user.mprotect = 15;
      user.mprotectx = 100;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 8){
      user.mid = 1;
      user.mlevel = 117;
      user.mname = "몰락한 동부인";
      user.mexp = 16280;
      user.mgold = 1270;
      user.mhp = 3415;
      user.mhpmax = 3415;
      user.matk = 33;
      user.mprotect = 10;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 9){
      user.mid = 1;
      user.mlevel = 127;
      user.mname = "협곡의 바위게";
      user.mexp = 20955;
      user.mgold = 1370;
      user.mhp = 4135;
      user.mhpmax = 4135;
      user.matk = 36;
      user.mprotect = 30;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 10){
      user.mid = 1;
      user.mlevel = 144;
      user.mname = "형체잃은 망령";
      user.mexp = 28775;
      user.mgold = 1470;
      user.mhp = 4650;
      user.mhpmax = 4650;
      user.matk = 39;
      user.mprotect = 40;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 11){
      user.mid = 1;
      user.mlevel = 160;
      user.mname = "문드러진 나무요정";
      user.mexp = 35040;
      user.mgold = 1520;
      user.mhp = 5685;
      user.mhpmax = 5685;
      user.matk = 45;
      user.mprotect = 50;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 12){
      user.mid = 1;
      user.mlevel = 172;
      user.mname = "눈덩이 괴물";
      user.mexp = 45120;
      user.mgold = 1570;
      user.mhp = 10000;
      user.mhpmax = 10000;
      user.matk = 31;
      user.mprotect = 0;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 13){
      user.mid = 1;
      user.mlevel = 190;
      user.mname = "드워프 전사";
      user.mexp = 62250;
      user.mgold = 1620;
      user.mhp = 7500;
      user.mhpmax = 7500;
      user.matk = 51;
      user.mprotect = 60;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 14){
      user.mid = 1;
      user.mlevel = 209;
      user.mname = "무쇠발 드워프대장";
      user.mexp = 76445;
      user.mgold = 1670;
      user.mhp = 10000;
      user.mhpmax = 10000;
      user.matk = 50;
      user.mprotect = 50;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 15){
      user.mid = 1;
      user.mlevel = 223;
      user.mname = "돌투구 갑옷전사";
      user.mexp = 96310;
      user.mgold = 1720;
      user.mhp = 20000;
      user.mhpmax = 20000;
      user.matk = 5;
      user.mprotect = 120;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 16){
      user.mid = 1;
      user.mlevel = 235;
      user.mname = "황금갑주 대전사장";
      user.mexp = 124150;
      user.mgold = 1850;
      user.mhp = 10500;
      user.mhpmax = 10500;
      user.matk = 60;
      user.mprotect = 30;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 17){
      user.mid = 1;
      user.mlevel = 250;
      user.mname = "어둠발록 아성체";
      user.mexp = 154770;
      user.mgold = 1950;
      user.mhp = 10000;
      user.mhpmax = 10000;
      user.matk = 74;
      user.mprotect = 40;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 18){
      user.mid = 1;
      user.mlevel = 268;
      user.mname = "칼날 도약자";
      user.mexp = 233520;
      user.mgold = 2000;
      user.mhp = 13000;
      user.mhpmax = 13000;
      user.matk = 77;
      user.mprotect = 50;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 19){
      user.mid = 1;
      user.mlevel = 282;
      user.mname = "하급 리치";
      user.mexp = 298530;
      user.mgold = 2000;
      user.mhp = 11000;
      user.mhpmax = 11000;
      user.matk = 91;
      user.mprotect = 50;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 20){
      user.mid = 1;
      user.mlevel = 296;
      user.mname = "공허 싸움꾼";
      user.mexp = 395100;
      user.mgold = 2000;
      user.mhp = 13000;
      user.mhpmax = 13000;
      user.matk = 102;
      user.mprotect = 80;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 21){
      user.mid = 1;
      user.mlevel = 311;
      user.mname = "폭풍의 사신";
      user.mexp = 3430000;
      user.mgold = 2000;
      user.mhp = 23000;
      user.mhpmax = 23000;
      user.matk = 121;
      user.mprotect = 150;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 22){
      user.mid = 1;
      user.mlevel = 328;
      user.mname = "죽음의 사도";
      user.mexp = 3887000;
      user.mgold = 2000;
      user.mhp = 20000;
      user.mhpmax = 20000;
      user.matk = 151;
      user.mprotect = 175;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
  }
 
 
   if (msg == "*사냥 3" && user.mid == 0){
    if(user.mapid == 1){
      user.mid = 3;
      user.mlevel = 11;
      user.mname = "굶주린 늑대무리";
      user.mexp = 1765;
      user.mgold = 435;
      user.mhp = 210;
      user.mhpmax = 210;
      user.matk = 7;
      user.mprotect = 3;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 2){
      user.mid = 3;
      user.mlevel = 30;
      user.mname = "소형 마물";
      user.mexp = 2280;
      user.mgold = 540;
      user.mhp = 655;
      user.mhpmax = 655;
      user.matk = 12;
      user.mprotect = 6;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 3){
      user.mid = 3;
      user.mlevel = 42;
      user.mname = "오염된 나무덩굴";
      user.mexp = 2860;
      user.mgold = 680;
      user.mhp = 1020;
      user.mhpmax = 1020;
      user.matk = 16;
      user.mprotect = 9;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 4){
      user.mid = 1;
      user.mlevel = 59;
      user.mname = "초목의 심령";
      user.mexp = 3925;
      user.mgold = 820;
      user.mhp = 1370;
      user.mhpmax = 1370;
      user.matk = 20;
      user.mprotect = 12;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 5){
      user.mid = 1;
      user.mlevel = 74;
      user.mname = "모래은신 강도";
      user.mexp = 4980;
      user.mgold = 930;
      user.mhp = 1865;
      user.mhpmax = 1865;
      user.matk = 23;
      user.mprotect = 15;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 6){
      user.mid = 1;
      user.mlevel = 88;
      user.mname = "바실리스크";
      user.mexp = 9675;
      user.mgold = 1000;
      user.mhp = 2520;
      user.mhpmax = 2520;
      user.matk = 27;
      user.mprotect = 15;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 7){
      user.mid = 1;
      user.mlevel = 103;
      user.mname = "사암 좀비";
      user.mexp = 13190;
      user.mgold = 1170;
      user.mhp = 1250;
      user.mhpmax = 1250;
      user.matk = 93;
      user.mprotect = 15;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 9){
      user.mid = 1;
      user.mlevel = 132;
      user.mname = "변질된 수정괴어";
      user.mexp = 22655;
      user.mgold = 1370;
      user.mhp = 1;
      user.mhpmax = 1;
      user.matk = 300;
      user.mprotect = 100;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 12){
      user.mid = 1;
      user.mlevel = 179;
      user.mname = "혹한의 냉기수호자";
      user.mexp = 50780;
      user.mgold = 1570;
      user.mhp = 2500;
      user.mhpmax = 2500;
      user.matk = 134;
      user.mprotect = 100;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 13){
      user.mid = 1;
      user.mlevel = 195;
      user.mname = "참나무방패 드워프";
      user.mexp = 68930;
      user.mgold = 1670;
      user.mhp = 8500;
      user.mhpmax = 8500;
      user.matk = 51;
      user.mprotect = 70;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
    if(user.mapid == 17){
      user.mid = 1;
      user.mlevel = 255;
      user.mname = "변이된 어둠발록";
      user.mexp = 175500;
      user.mgold = 2000;
      user.mhp = 13000;
      user.mhpmax = 13000;
      user.matk = 66;
      user.mprotect = 50;
      user.mprotectx = 30;
      FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user,  null, "\t"));
      replier.reply("《Lv . " + user.mlevel + "》 " + user.mname + " 사냥을 시작합니다...\n*공격 으로 몬스터를 사냥하세요!\n\n세부 능력치\nHP " + user.mhp + " / ATK " + user.matk + " / DEF " + user.mprotect);
    }
  }
  
  if(msg == "*공격" && user.mid !== 0){
    atk = Math.round(user.Ratk - user.mprotect * ((100 - user.protectx) / 100));
    //criper = makeRnd(1, 100000);
    //criatk = Math.round(a * (user.critical / 100));
    if(user.level <= (user.mlevel + 15) && user.level >= (user.mlevel - 15)){
    d = Math.round(user.mexp * user.RExpboost);
    e = Math.round(user.mgold * user.RGoldboost);
    z = makeRnd(2, 7);
    dropa = makeRnd(1, 100000);
    dropb = makeRnd(1, 100000);
    dropc = makeRnd(1, 100000);
    }
    else {
    d = Math.floor((user.mexp / 25) * user.RExpboost);
    e = Math.floor((user.mgold / 25) * user.RGoldboost);
    z = -5;
    dropa = makeRnd(1, 500000);
    dropb = makeRnd(1, 500000);
    dropc = makeRnd(1, 500000);
    replier.reply("⚠ 자신의 레벨과 15레벨이상 차이나는 몬스터를 사냥시 전리품 패널티가 발생합니다. [EXP, GOLD 96% 감소/드랍률 90% 감소/CP획득량 감소]");
    }
    if(user.mhp > user.Ratk && user.work_id !== 4){
      user.mhp -= atk;
      user.hp -= user.matk;
      savePlayer(user, sender);
      replier.reply("[!] 《Lv . " + user.mlevel + "》 " + user.mname + "을(를) 공격하여\n " + atk + "데미지를 입혔습니다.\n\n남은 HP : " + user.mhp + " / " + user.mhpmax + "\n[ " + makeBar(user.mhp, user.mhpmax, 10) + " ]\n\n[!] 《Lv . " + user.mlevel + "》 " + user.mname + "에게 " + user.matk + " 데미지를 입었습니다.");
    }
    else if(user.mhp > user.Ratk && user.work_id == 4){
      user.mhp -= atk;
      user.hp -= user.matk;
      user.work_stack_A += 1;
      savePlayer(user, sender);
      replier.reply("[!] 《Lv . " + user.mlevel + "》 " + user.mname + "을(를) 공격하여\n " + atk + "데미지를 입혔습니다.\n\n남은 HP : " + user.mhp + " / " + user.mhpmax + "\n[ " + makeBar(user.mhp, user.mhpmax, 10) + " ]\n\n[!] 《Lv . " + user.mlevel + "》 " + user.mname + "에게 " + user.matk + " 데미지를 입었습니다. \n\n현재 회복 스택 : " + user.work_stack_A);
    }
    else if(user.mhp <= user.Ratk){
      replier.reply("[!] 《Lv . " + user.mlevel + "》 " + user.mname + "을(를) 공격하여\n" + atk + "데미지를 입혔습니다.\n\n남은 HP : " + "0 / " + user.mhpmax + "\n[ " + makeBar(0, user.mhpmax, 10) + " ]\n\n[!] 《Lv . " + user.mlevel + "》 " + user.mname + "에게 " + user.matk + " 데미지를 입었습니다.\n\n《Lv . " + user.mlevel + "》 " + user.mname + "을(를) 쓰러뜨렸습니다!\n\n획득한 전리품\nEXP + " + d + "\nGOLD + " + e + "\nCP + " + (user.mapid + z));
      user.Exp += d;
      user.gold += e;
      user.rankscore += (user.mapid + z);
      user.hp -= user.matk;
      user.mid = 0;
      user.inv_monster += 1;
      savePlayer(user, sender);
      if(dropa <= 5000){
        if(user.mapid == 1 || user.mapid == 2 || user.mapid == 3 || user.mapid == 13 || user.mapid == 14){
        replier.reply("아이템이 드랍됐어요!\n\n> 하급 제련석");
        user.inv_jstone_s += 1;
        savePlayer(user, sender);
        }
        else if(user.mapid == 4 || user.mapid == 11 || user.mapid == 12){
        replier.reply("아이템이 드랍됐어요!\n\n> 종이 조각");
        user.inv_paper += 1;
        savePlayer(user, sender);
        }
        else if(user.mapid == 5 || user.mapid == 6 || user.mapid == 7 || user.mapid == 8 || user.mapid == 15 || user.mapid == 16 || user.mapid == 17 || user.mapid == 18 || user.mapid == 19 || user.mapid == 20 || user.mapid == 21){
        replier.reply("아이템이 드랍됐어요!\n\n> 보라빛 마법석");
        user.inv_purplestone += 1;
        savePlayer(user, sender);
        }
        else if(user.mapid == 9 || user.mapid == 10){
        replier.reply("아이템이 드랍됐어요!\n\n> 자수정 광석");
        user.inv_purple_stone += 1;
        savePlayer(user, sender);
        }
      }
      if(dropb <= 2000){
        if(user.mapid == 6 || user.mapid == 7 || user.mapid == 8 || user.mapid == 19 || user.mapid == 20 || user.mapid == 21){
        replier.reply("아이템이 드랍됐어요!\n\n> 황금빛 마법석");
        user.inv_goldstone += 1;
        savePlayer(user, sender);
        }
        if(user.mapid == 9 || user.mapid == 10 || user.mapid == 11){
        replier.reply("아이템이 드랍됐어요!\n\n> 토파즈 광석");
        user.inv_topaz_stone += 1;
        savePlayer(user, sender);
        }
        if(user.mapid == 12 || user.mapid == 13 || user.mapid == 14 || user.mapid == 17 || user.mapid == 18){
        replier.reply("아이템이 드랍됐어요!\n\n> 중급 제련석");
        user.inv_jstone_m += 1;
        savePlayer(user, sender);
        }
        if(user.mapid == 15 || user.mapid == 16){
        replier.reply("아이템이 드랍됐어요!\n\n> 크리스탈");
        user.inv_cristal += 1;
        savePlayer(user, sender);
        }
        if(user.mapid == 22){
        replier.reply("아이템이 드랍됐어요!\n\n> 중급 돌파석");
        user.inv_armor_frag_2 += 1;
        savePlayer(user, sender);
        }
      }
    }
  }
  

var Admin = [1250771598];
    try {
      var hashcode = java.lang.String(imageDB.getProfileImage()).hashCode();
      var day = new Date();
      var H = String(day.getHours());
      var M = String(day.getMinutes());
      var S = String(day.getSeconds());
      var D = String(day.getDate());
      var M1 = String(day.getMonth() + 1);
      var Y = String(day.getFullYear());
      if (msg == "*코드") {
        replier.reply("" + sender + "님의 해시코드" + "\n" + hashcode);
      }
      
      if (msg.startsWith('*ev ')) {
        if (Admin.indexOf(hashcode) != -1) {
          var 속도 = Date.now();
          command = msg.substr(4).trim();
          replier.reply(eval(command));
          var 속도1 = Date.now();
          var 속도2 = (속도1 - 속도 + "ms");
          java.lang.Thread.sleep(1000);
          replier.reply(속도2);
        } else {
          replier.reply("액세스 거절.\nAccess Denied.");
          java.lang.Thread.sleep(500);
          replier.reply("⚠️" + sender + "님은 관리자가 아닙니다.");
          Api.makeNoti(sender + " 님이 관리자 명령어를 사용하려 접근했습니다.");
        }
      }
    }    catch (e) {
  em = "⚠️ERROR⚠️" + "\n 오류명 : " + e.name + "\n오류내용 : " + e.message + "\n오류난 줄 : #" + e.lineNumber;
  replier.reply(em);
}

if(msg == "*쿠폰입력 GHQUZ7J3" && user.event4 !== 10006){
  replier.reply("쿠폰보상이 지급됩니다!\n\n하급 돌파석 × 100\n강화석 파편 × 300\n200,000 G\n30 💎");
  user.inv_armor_frag_1 += 100;
  user.inv_stone2 += 300;
  user.gold += 200000;
  user.superdiamond += 30;
  user.event4 = 10006;
  savePlayer(user, sender);
}

/*if (haveData(sender)) {
      if (user.Rhp < 0){
        if(user.statpoint_hp == 0){
          user.hp = - user.armor_hp_u;
          savePlayer(user, sender);
        }
        else {
        user.hp = - (user.statpoint_hp * 4) - user.armor_hp_u;
        savePlayer(user, sender);
        }
      }
}

if (haveData(sender)) {
  if (user.update < 1){
    replier.reply("자동 업데이트 완료!\n\n업데이트 된 컨텐츠 : 광산\nCode : AG01");
    P = updatePlayer(sender);{
    P.pickaxe_coal = 450;
    P.pickaxe_cristal = 0;
    P.inv_coal = 0;
    P.inv_cristal = 0;
    P.update = 2;
    savePlayer(P, sender);
    }
  }
}*/

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "BRONZE V" || user.rank_tier == "Bronze V"){
    replier.reply("●TIER UPDATE●\n\nBRONZE V >>> BRONZE IV\n\n\nREWARD : 시즌코인 100 coin");
    user.rank_tier = "BRONZE IV";
    user.rankscoremax = 300;
    user.rankscore -= 300;
    user.season_coin += 100;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "BRONZE IV"){
    replier.reply("●TIER UPDATE●\n\nBRONZE IV >>> BRONZE III\n\n\nREWARD : 시즌코인 100 coin");
    user.rank_tier = "BRONZE III";
    user.rankscoremax = 300;
    user.rankscore -= 300;
    user.season_coin += 100;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "BRONZE III"){
    replier.reply("●TIER UPDATE●\n\nBRONZE III >>> BRONZE II\n\n\nREWARD : 시즌코인 100 coin");
    user.rank_tier = "BRONZE II";
    user.rankscoremax = 300;
    user.rankscore -= 300;
    user.season_coin += 100;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "BRONZE II"){
    replier.reply("●TIER UPDATE●\n\nBRONZE II >>> BRONZE I\n\n\nREWARD : 시즌코인 100 coin");
    user.rank_tier = "BRONZE I";
    user.rankscoremax = 500;
    user.rankscore -= 300;
    user.season_coin += 100;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "BRONZE I"){
    replier.reply("●TIER UPDATE●\n\nBRONZE I >>> SILVER V\n\n\nREWARD : 시즌코인 300 coin + 복주머니 [A] × 1");
    user.rank_tier = "SILVER V";
    user.rankscoremax = 500;
    user.rankscore -= 500;
    user.season_coin += 300;
    user.inv_event4 += 1;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "SILVER V"){
    replier.reply("●TIER UPDATE●\n\nSILVER V >>> SILVER IV\n\n\nREWARD : 시즌코인 200 coin + 복주머니 [B] × 3");
    user.rank_tier = "SILVER IV";
    user.rankscoremax = 500;
    user.rankscore -= 500;
    user.season_coin += 200;
    user.inv_event3 += 3;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "SILVER IV"){
    replier.reply("●TIER UPDATE●\n\nSILVER IV >>> SILVER III\n\n\nREWARD : 시즌코인 200 coin + 복주머니 [B] × 3");
    user.rank_tier = "SILVER III";
    user.rankscoremax = 500;
    user.rankscore -= 500;
    user.season_coin += 200;
    user.inv_event3 += 3;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "SILVER III"){
    replier.reply("●TIER UPDATE●\n\nSILVER III >>> SILVER II\n\n\nREWARD : 시즌코인 200 coin + 복주머니 [B] × 3");
    user.rank_tier = "SILVER II";
    user.rankscoremax = 500;
    user.rankscore -= 500;
    user.season_coin += 200;
    user.inv_event3 += 3;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "SILVER II"){
    replier.reply("●TIER UPDATE●\n\nSILVER II >>> SILVER I\n\n\nREWARD : 시즌코인 200 coin + 복주머니 [B] × 3");
    user.rank_tier = "SILVER I";
    user.rankscoremax = 800;
    user.rankscore -= 500;
    user.season_coin += 200;
    user.inv_event3 += 3;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "SILVER I"){
    replier.reply("●TIER UPDATE●\n\nSILVER I >>> GOLD V\n\n\nREWARD : 시즌코인 400 coin + 복주머니 [A] × 3");
    user.rank_tier = "GOLD V";
    user.rankscoremax = 800;
    user.rankscore -= 800;
    user.season_coin += 400;
    user.inv_event4 += 3;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "GOLD V"){
    replier.reply("●TIER UPDATE●\n\nGOLD V >>> GOLD IV\n\n\nREWARD : 시즌코인 300 coin + 복주머니 [A] × 1");
    user.rank_tier = "GOLD IV";
    user.rankscoremax = 800;
    user.rankscore -= 800;
    user.season_coin += 300;
    user.inv_event4 += 1;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "GOLD IV"){
    replier.reply("●TIER UPDATE●\n\nGOLD IV >>> GOLD III\n\n\nREWARD : 시즌코인 300 coin + 복주머니 [A] × 1");
    user.rank_tier = "GOLD III";
    user.rankscoremax = 800;
    user.rankscore -= 800;
    user.season_coin += 300;
    user.inv_event4 += 1;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "GOLD III"){
    replier.reply("●TIER UPDATE●\n\nGOLD III >>> GOLD II\n\n\nREWARD : 시즌코인 300 coin + 복주머니 [A] × 1");
    user.rank_tier = "GOLD II";
    user.rankscoremax = 800;
    user.rankscore -= 800;
    user.season_coin += 300;
    user.inv_event4 += 1;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "GOLD II"){
    replier.reply("●TIER UPDATE●\n\nGOLD II >>> GOLD I\n\n\nREWARD : 시즌코인 300 coin + 복주머니 [A] × 1");
    user.rank_tier = "GOLD I";
    user.rankscoremax = 1300;
    user.rankscore -= 800;
    user.season_coin += 300;
    user.inv_event4 += 1;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "GOLD I"){
    replier.reply("●TIER UPDATE●\n\nGOLD I >>> PLATINUM IV\n\n\nREWARD : 시즌코인 600 coin + 복주머니 [A] × 6");
    user.rank_tier = "PLATINUM IV";
    user.rankscoremax = 2000;
    user.rankscore -= 1300;
    user.season_coin += 600;
    user.inv_event4 += 6;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "PLATINUM IV"){
    replier.reply("●TIER UPDATE●\n\nPLATINUM IV >>> PLATINUM III\n\n\nREWARD : 시즌코인 400 coin + 복주머니 [A] × 3");
    user.rank_tier = "PLATINUM III";
    user.rankscoremax = 3000;
    user.rankscore -= 2000;
    user.season_coin += 400;
    user.inv_event4 += 3;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "PLATINUM III"){
    replier.reply("●TIER UPDATE●\n\nPLATINUM III >>> PLATINUM II\n\n\nREWARD : 시즌코인 450 coin + 복주머니 [A] × 3");
    user.rank_tier = "PLATINUM II";
    user.rankscoremax = 4000;
    user.rankscore -= 3000;
    user.season_coin += 450;
    user.inv_event4 += 3;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "PLATINUM II"){
    replier.reply("●TIER UPDATE●\n\nPLATINUM II >>> PLATINUM I\n\n\nREWARD : 시즌코인 500 coin + 복주머니 [A] × 3");
    user.rank_tier = "PLATINUM I";
    user.rankscoremax = 5000;
    user.rankscore -= 4000;
    user.season_coin += 500;
    user.inv_event4 += 3;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "PLATINUM I"){
    replier.reply("●TIER UPDATE●\n\nPLATINUM I >>> DIAMOND IV\n\n\nREWARD : 시즌코인 1000 coin + 복주머니 [A] × 10");
    user.rank_tier = "DIAMOND IV";
    user.rankscoremax = 6000;
    user.rankscore -= 5000;
    user.season_coin += 1000;
    user.inv_event4 += 10;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "DIAMOND IV"){
    replier.reply("●TIER UPDATE●\n\nDIAMOND IV >>> DIAMOND III\n\n\nREWARD : 시즌코인 600 coin + 복주머니 [A] × 5");
    user.rank_tier = "DIAMOND III";
    user.rankscoremax = 7000;
    user.rankscore -= 6000;
    user.season_coin += 600;
    user.inv_event4 += 5;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "DIAMOND III"){
    replier.reply("●TIER UPDATE●\n\nDIAMOND III >>> DIAMOND II\n\n\nREWARD : 시즌코인 700 coin + 복주머니 [A] × 5");
    user.rank_tier = "DIAMOND II";
    user.rankscoremax = 8000;
    user.rankscore -= 7000;
    user.season_coin += 700;
    user.inv_event4 += 5;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "DIAMOND II"){
    replier.reply("●TIER UPDATE●\n\nDIAMOND II >>> DIAMOND I\n\n\nREWARD : 시즌코인 800 coin + 복주머니 [A] × 5");
    user.rank_tier = "DIAMOND I";
    user.rankscoremax = 10000;
    user.rankscore -= 8000;
    user.season_coin += 800;
    user.inv_event4 += 5;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "DIAMOND I"){
    replier.reply("●TIER UPDATE●\n\nDIAMOND I >>> MASTER\n\n\nREWARD : 시즌코인 1500 coin + 복주머니 [S] × 3");
    user.rank_tier = "MASTER";
    user.rankscoremax = 15000;
    user.rankscore -= 10000;
    user.season_coin += 1500;
    user.inv_event5 += 3;
    user.inv_event6 += 1;
    user.superdiamond += 5;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "MASTER"){
    replier.reply("●TIER UPDATE●\n\nMASTER >>> GRAND MASTER\n\n\nREWARD : 시즌코인 3000 coin + 복주머니 [S] × 8");
    user.rank_tier = "GRAND MASTER";
    user.rankscoremax = 20000;
    user.rankscore -= 15000;
    user.season_coin += 3000;
    user.inv_event5 += 8;
    user.superdiamond += 10;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "GRAND MASTER"){
    replier.reply("●TIER UPDATE●\n\nGRAND MASTER >>> CHALLENGER 🔰\n\n\nREWARD : 시즌코인 5000 coin + 복주머니 [L] × 1");
    user.rank_tier = "CHALLENGER 🔰";
    user.rankscoremax = 5000;
    user.rankscore -= 20000;
    user.season_coin += 5000;
    user.inv_event6 += 2;
    user.superdiamond += 20;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "CHALLENGER 🔰"){
    replier.reply("●TIER UPDATE●\n\nCHALLENGER 🔰 >>> LUNATIC V 🌙\n\n\nREWARD : 시즌코인 1500 coin + 복주머니 [S] × 3");
    user.rank_tier = "LUNATIC V 🌙";
    user.rankscoremax = 5000;
    user.rankscore -= 5000;
    user.season_coin += 1500;
    user.inv_event5 += 3;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "LUNATIC V 🌙"){
    replier.reply("●TIER UPDATE●\n\nLUNATIC V 🌙 >>> LUNATIC IV 🌙\n\n\nREWARD : 시즌코인 1500 coin + 복주머니 [S] × 3");
    user.rank_tier = "LUNATIC IV 🌙";
    user.rankscoremax = 5000;
    user.rankscore -= 5000;
    user.season_coin += 1500;
    user.inv_event5 += 3;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "LUNATIC IV 🌙"){
    replier.reply("●TIER UPDATE●\n\nLUNATIC IV 🌙 >>> LUNATIC III 🌙\n\n\nREWARD : 시즌코인 1500 coin + 복주머니 [S] × 3");
    user.rank_tier = "LUNATIC III 🌙";
    user.rankscoremax = 5000;
    user.rankscore -= 5000;
    user.season_coin += 1500;
    user.inv_event5 += 3;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "LUNATIC III 🌙"){
    replier.reply("●TIER UPDATE●\n\nLUNATIC III 🌙 >>> LUNATIC II 🌙\n\n\nREWARD : 시즌코인 1500 coin + 복주머니 [S] × 3");
    user.rank_tier = "LUNATIC II 🌙";
    user.rankscoremax = 5000;
    user.rankscore -= 5000;
    user.season_coin += 1500;
    user.inv_event5 += 3;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "LUNATIC II 🌙"){
    replier.reply("●TIER UPDATE●\n\nLUNATIC II 🌙 >>> LUNATIC I 🌙\n\n\nREWARD : 시즌코인 1500 coin + 복주머니 [S] × 3");
    user.rank_tier = "LUNATIC I 🌙";
    user.rankscoremax = 5000;
    user.rankscore -= 5000;
    user.season_coin += 1500;
    user.inv_event5 += 3;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "LUNATIC I 🌙"){
    replier.reply("●TIER UPDATE●\n\nLUNATIC I 🌙 >>> ABYSS IV 🔮\n\n\nREWARD : 시즌코인 1500 coin + 복주머니 [S] × 3");
    user.rank_tier = "ABYSS IV 🔮";
    user.rankscoremax = 10000;
    user.rankscore -= 5000;
    user.season_coin += 1500;
    user.inv_event5 += 3;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "ABYSS IV 🔮"){
    replier.reply("●TIER UPDATE●\n\nABYSS IV 🔮 >>> ABYSS III 🔮\n\n\nREWARD : 시즌코인 3000 coin + 복주머니 [S] × 5");
    user.rank_tier = "ABYSS III 🔮";
    user.rankscoremax = 15000;
    user.rankscore -= 10000;
    user.season_coin += 3000;
    user.inv_event5 += 5;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "ABYSS III 🔮"){
    replier.reply("●TIER UPDATE●\n\nABYSS III 🔮 >>> ABYSS II 🔮\n\n\nREWARD : 시즌코인 5000 coin + 복주머니 [S] × 5");
    user.rank_tier = "ABYSS II 🔮";
    user.rankscoremax = 20000;
    user.rankscore -= 15000;
    user.season_coin += 5000;
    user.inv_event5 += 5;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "ABYSS II 🔮"){
    replier.reply("●TIER UPDATE●\n\nABYSS II 🔮 >>> ABYSS I 🔮\n\n\nREWARD : 시즌코인 5000 coin + 복주머니 [S] × 5");
    user.rank_tier = "ABYSS I 🔮";
    user.rankscoremax = 30000;
    user.rankscore -= 20000;
    user.season_coin += 5000;
    user.inv_event5 += 5;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "ABYSS I 🔮"){
    replier.reply("●TIER UPDATE●\n\nABYSS I 🔮 >>> ⬛ZERO⬜\n\n\nREWARD : 시즌코인 10000 coin + 복주머니 [S] × 5");
    user.rank_tier = "⬛ZERO⬜";
    user.rankscoremax = 50000;
    user.rankscore -= 30000;
    user.season_coin += 10000;
    user.inv_event5 += 5;
    savePlayer(user, sender);
  }
}

if(haveData(sender)){
  if(user.rankscore > user.rankscoremax && user.rank_tier == "⬛ZERO⬜"){
    replier.reply("●TIER UPDATE●\n\n⬛ZERO⬜ >>> ENDLESS 🎆\n\n\nREWARD : 시즌코인 10000 coin + 복주머니 [L] × 5");
    user.rank_tier = "ENDLESS 🎆";
    user.rankscoremax = 200000;
    user.rankscore -= 50000;
    user.season_coin += 10000;
    user.inv_event6 += 1;
    savePlayer(user, sender);
  }
}

/*if (haveData(sender)) {
  if (user.update >= 0 && user.update < 2){
    replier.reply("자동 업데이트 완료!\n\n업데이트 된 컨텐츠 : 곡괭이 옵션\nCode : AP01_P");
    Q = updatePlayer(sender);{
    Q.pickaxe_over_level = "-";
    Q.pickaxe_over_Exp = 0;
    Q.pickaxe_over_Expmax = 0;
    Q.pickaxe_over_id = 0;
    Q.pickaxe_over_name = "";
    Q.pickaxe_luck = 0;
    Q.pickaxe_Expboost = 0;
    Q.pickaxe_Exptotal = 0;
    Q.update = 2;
    savePlayer(Q, sender);
    }
  }
}

if (haveData(sender)) {
  if (user.update >= 2 && user.update < 3){
    replier.reply("자동 업데이트 완료!\n\n업데이트 된 컨텐츠 : 거래소[Pre - Realize] + 크리스마스 컨텐츠\nCode : E_RP00");
    Q = updatePlayer(sender);{
    Q.tax = 1;
    Q.trade = false;
    Q.tradeid = 0;
    Q.trade_total = 0;
    Q.event_coin = 0;
    Q.season_coin = 0;
    Q.season_score = 0;
    Q.update = 3;
    savePlayer(Q, sender);
    }
  }
}

if (haveData(sender)) {
  if (user.update >= 3 && user.update < 4){
    replier.reply("자동 업데이트 완료!\n\n업데이트 된 컨텐츠 : 2022 First Season [Pre - Realize]\nCode : S_RP01");
    A = Math.floor(user.event_score / 5);
    B = Math.floor(user.event_score / 15);
    Q = updatePlayer(sender);{
    Q.inv_event5 = 0;
    Q.inv_event6 = 0;
    Q.inv_event7 = 0;
    Q.inv_event8 = 0;
    Q.inv_event9 = 0;
    Q.inv_event10 = 0;
    Q.inv_paper = 0;
    Q.inv_purplestone = 0;
    Q.inv_goldstone = 0;
    Q.inv_event1 = 0;
    Q.inv_event2 = 0;
    Q.inv_event3 = 0;
    Q.inv_event4 = 0;
    Q.inv_event3 = Q.event_score * 2;
    Q.inv_event4 += A;
    Q.inv_event5 += B;
    Q.season_coin += Q.event_coin;
    Q.update = 4;
    savePlayer(Q, sender);
    }
  }
}

  if (haveData(sender)) {
  if (user.update >= 4 && user.update < 5){
    replier.reply("자동 업데이트 완료!\n\n업데이트 된 컨텐츠 : 직업 업데이트, 거래소 업데이트, 던전 리뉴얼\nCode : R_RO02");
    Q = updatePlayer(sender);{
      Q.trade_item_count = 0;
      Q.inv_jstone_s = 0;
      Q.inv_jstone_m = 0;
      Q.inv_jstone_l = 0;
      Q.inv_purple_stone = 0;
      Q.inv_purple = 0;
      Q.inv_topaz_stone = 0;
      Q.inv_topaz = 0;
      Q.inv_go_ticket = 0;
      Q.inv_go_raid_ticket = 0;
      Q.inv_stat_reset_ticket = 0;
      Q.inv_job_reset_ticket = 0;
      Q.inv_unob = 0;
      Q.mlevel = 0;
      Q.mexp = 0;
      Q.mgold = 0;
      Q.update = 5;
      savePlayer(Q, sender);
    }
  }
}

 if (haveData(sender)) {
  if (user.update >= 5 && user.update < 6){
    replier.reply("자동 업데이트 완료!\n\n업데이트 된 컨텐츠 : S2 UPDATE + 시즌보상 지급\nCode : R_RS02");
    Q = updatePlayer(sender);{
      Q.inv_option_epic_ticket = 0;
      Q.inv_option_legend_ticket = 0;
      Q.superdiamond = user.level;
      Q.season1_rank = "정보 없음";
      Q.season2_rank = "진행중";
      Q.season3_rank = "정보 없음";
      Q.update = 6;
      savePlayer(Q, sender);
    }
  }
}

if(haveData(sender)){
  if(user.update == 6 && user.season1_rank == "정보 없음"){
    if(user.rank_tier == "BRONZE V"){
      a = user.rank_tier;
      user.season1_rank = a;
      user.achieve_use = "2022 S1 " + a;
      user.rank_tier = "BRONZE V";
      user.rankscoremax = 300;
      user.rankscore = (user.inv_event3 * 2) + (user.inv_event4 * 20);
      user.inv_event3 = 0;
      user.inv_event4 = 0;
      savePlayer(user, sender);
    }
    else if(user.rank_tier == "BRONZE IV" && user.rank_tier == "BRONZE III" && user.rank_tier == "BRONZE II" && user.rank_tier == "BRONZE I"){
      a = user.rank_tier;
      user.season1_rank = a;
      user.achieve_use = "2022 S1 " + a;
      user.gold += 20000;
      user.rank_tier = "BRONZE V";
      user.rankscoremax = 300;
      user.rankscore = (user.inv_event3 * 2) + (user.inv_event4 * 20);
      user.inv_event3 = 0;
      user.inv_event4 = 0;
      savePlayer(user, sender);
    }
    else if(user.rank_tier == "SILVER V" && user.rank_tier == "SILVER IV" && user.rank_tier == "SILVER III" && user.rank_tier == "SILVER II" && user.rank_tier == "SILVER I"){
      a = user.rank_tier;
      user.season1_rank = a;
      user.achieve_use = "2022 S1 " + a;
      user.gold += 50000;
      user.rank_tier = "SILVER V";
      user.rankscoremax = 500;
      user.rankscore = (user.inv_event3 * 2) + (user.inv_event4 * 20);
      user.inv_event3 = 0;
      user.inv_event4 = 0;
      savePlayer(user, sender);
    }
    else if(user.rank_tier == "GOLD V" && user.rank_tier == "GOLD IV" && user.rank_tier == "GOLD III" && user.rank_tier == "GOLD II" && user.rank_tier == "GOLD I"){
      a = user.rank_tier;
      user.season1_rank = a;
      user.achieve_use = "2022 S1 " + a;
      user.gold += 100000;
      user.inv_go_raid_ticket += 1;
      user.rank_tier = "GOLD V";
      user.rankscoremax = 800;
      user.rankscore = (user.inv_event3 * 2) + (user.inv_event4 * 20);
      user.inv_event3 = 0;
      user.inv_event4 = 0;
      savePlayer(user, sender);
    }
    else if(user.rank_tier == "PLATINUM IV" && user.rank_tier == "PLATINUM III" && user.rank_tier == "PLATINUM II" && user.rank_tier == "PLATINUM I"){
      a = user.rank_tier;
      user.season1_rank = a;
      user.achieve_use = "2022 S1 " + a;
      user.gold += 200000;
      user.inv_go_raid_ticket += 2;
      user.rank_tier = "PLATINUM IV";
      user.rankscoremax = 2000;
      user.rankscore = (user.inv_event3 * 2) + (user.inv_event4 * 20);
      user.inv_event3 = 0;
      user.inv_event4 = 0;
      savePlayer(user, sender);
    }
    else if(user.rank_tier == "DIAMOND IV" && user.rank_tier == "DIAMOND III" && user.rank_tier == "DIAMOND II" && user.rank_tier == "DIAMOND I"){
      a = user.rank_tier;
      user.season1_rank = a;
      user.achieve_use = "2022 S1 " + a;
      user.gold += 300000;
      user.inv_go_raid_ticket += 3;
      user.inv_option_epic_ticket += 1;
      user.rank_tier = "PLATINUM IV";
      user.rankscoremax = 2000;
      user.rankscore = (user.inv_event3 * 2) + (user.inv_event4 * 20);
      user.inv_event3 = 0;
      user.inv_event4 = 0;
      savePlayer(user, sender);
    }
    else if(user.rank_tier == "MASTER"){
      a = user.rank_tier;
      user.season1_rank = a;
      user.achieve_use = "2022 S1 " + a;
      user.gold += 500000;
      user.inv_go_raid_ticket += 5;
      user.inv_option_epic_ticket += 2;
      user.rank_tier = "PLATINUM IV";
      user.rankscoremax = 2000;
      user.rankscore = (user.inv_event3 * 2) + (user.inv_event4 * 20);
      user.inv_event3 = 0;
      user.inv_event4 = 0;
      savePlayer(user, sender);
    }
    else if(user.rank_tier == "GRAND MASTER"){
      a = user.rank_tier;
      user.season1_rank = a;
      user.achieve_use = "2022 S1 " + a;
      user.gold += 700000;
      user.inv_go_raid_ticket += 7;
      user.inv_option_epic_ticket += 3;
      user.inv_option_legend_ticket += 1;
      user.rank_tier = "PLATINUM IV";
      user.rankscoremax = 2000;
      user.rankscore = (user.inv_event3 * 2) + (user.inv_event4 * 20);
      user.inv_event3 = 0;
      user.inv_event4 = 0;
      savePlayer(user, sender);
    }
    else if(user.rank_tier == "CHALLENGER 🔰"){
      a = user.rank_tier;
      user.season1_rank = a;
      user.achieve_use = "2022 S1 " + a;
      user.gold += 1000000;
      user.inv_go_raid_ticket += 10;
      user.inv_option_epic_ticket += 5;
      user.inv_option_legend_ticket += 2;
      user.rank_tier = "DIAMOND IV";
      user.rankscoremax = 6000;
      user.rankscore = (user.inv_event3 * 2) + (user.inv_event4 * 20);
      user.inv_event3 = 0;
      user.inv_event4 = 0;
      savePlayer(user, sender);
    }
    else if(user.rank_tier == "ENDLESS 🎆"){
      a = user.rank_tier;
      user.season1_rank = a;
      user.achieve_use = "2022 S1 " + a;
      user.gold += 2000000;
      user.inv_go_raid_ticket += 20;
      user.inv_option_epic_ticket += 10;
      user.inv_option_legend_ticket += 5;
      user.rank_tier = "MASTER";
      user.rankscoremax = 15000;
      user.rankscore = (user.inv_event3 * 2) + (user.inv_event4 * 20);
      user.inv_event3 = 0;
      user.inv_event4 = 0;
      savePlayer(user, sender);
    }
    else {
      a = user.rank_tier;
      user.season1_rank = a;
      user.achieve_use = "2022 S1 " + a;
      user.gold += 1500000;
      user.inv_go_raid_ticket += 15;
      user.inv_option_epic_ticket += 7;
      user.inv_option_legend_ticket += 3;
      user.rank_tier = "DIAMOND I";
      user.rankscoremax = 10000;
      user.rankscore = (user.inv_event3 * 2) + (user.inv_event4 * 20);
      user.inv_event3 = 0;
      user.inv_event4 = 0;
      savePlayer(user, sender);
    }
  }
}

if (haveData(sender)) {
  if (user.update == 6){
    replier.reply("자동 업데이트 완료!\n\n업데이트 된 컨텐츠 : 갑옷\nCode : A_RP03");
    Q = updatePlayer(sender);{
    Q.armor_atk_u = 0;
    Q.armor_upatk_u = 0;
    Q.armor_gem_u = 0;
    Q.armor_option_name_u = "없음";
    Q.armor_option_info_u = "옵션이 존재하지 않습니다. '*옵션 뽑기 (일반/고급)으로, 옵션을 뽑아보세요!'";
    Q.armor_option_hp_u = 0;
    Q.armor_option_mp_u = 0;
    Q.armor_option_def_u = 0;
    Q.armor_option_bossatk_u = 0;
    Q.armor_option_atk_u = 0;
    Q.armor_option_s_cool_u = 0;
    Q.armor_option_per_u = 0;
    Q.armor_atk_1 = 0;
    Q.armor_upatk_1 = 0;
    Q.armor_gem_1 = 0;
    Q.armor_option_name_1 = "없음";
    Q.armor_option_info_1 = "옵션이 존재하지 않습니다. '*옵션 뽑기 (일반/고급)으로, 옵션을 뽑아보세요!'";
    Q.armor_option_hp_1 = 0;
    Q.armor_option_mp_1 = 0;
    Q.armor_option_def_1 = 0;
    Q.armor_option_bossatk_1 = 0;
    Q.armor_option_atk_1 = 0;
    Q.armor_option_s_cool_1 = 0;
    Q.armor_option_per_1 = 0;
    Q.armor_atk_2 = 0;
    Q.armor_upatk_2 = 0;
    Q.armor_gem_2 = 0;
    Q.armor_option_name_2 = "없음";
    Q.armor_option_info_2 = "옵션이 존재하지 않습니다. '*옵션 뽑기 (일반/고급)으로, 옵션을 뽑아보세요!'";
    Q.armor_option_hp_2 = 0;
    Q.armor_option_mp_2 = 0;
    Q.armor_option_def_2 = 0;
    Q.armor_option_bossatk_2 = 0;
    Q.armor_option_atk_2 = 0;
    Q.armor_option_s_cool_2 = 0;
    Q.armor_option_per_2 = 0;
    Q.armor_atk_3 = 0;
    Q.armor_upatk_3 = 0;
    Q.armor_gem_3 = 0;
    Q.armor_option_name_3 = "없음";
    Q.armor_option_info_3 = "옵션이 존재하지 않습니다. '*옵션 뽑기 (일반/고급)으로, 옵션을 뽑아보세요!'";
    Q.armor_option_hp_3 = 0;
    Q.armor_option_mp_3 = 0;
    Q.armor_option_def_3 = 0;
    Q.armor_option_bossatk_3 = 0;
    Q.armor_option_atk_3 = 0;
    Q.armor_option_s_cool_3 = 0;
    Q.armor_option_per_3 = 0;
    Q.inv_armor_frag_1 = 0;
    Q.inv_armor_frag_2 = 0;
    Q.inv_armor_frag_3 = 0;
    Q.inv_armor_frag_4 = 0;
    Q.update = 7;
    savePlayer(Q, sender);
    }
  }
}
*/

if(haveData(sender)){
  if(user.update == 7){
    replier.reply("자동 업데이트 완료!\n\n직업 1차 업데이트\nCode : JA01");
    Q = updatePlayer(sender);{
      Q.work_stack_A = 0;
      Q.work_stack_B = 0;
      Q.work_stack_C = 0;
      Q.work_totalscore = 0;
      Q.work_skillpoint = 1;
      Q.work_skillP = 0;
      Q.work_skillP_cool = false;
      Q.work_skillP_level = 1;
      Q.work_skillP_A = 0;
      Q.work_skill1 = 0;
      Q.work_skill1_cool = false;
      Q.work_skill1_level = 1;
      Q.work_skill1_A = 0;
      Q.work_skill2 = 0;
      Q.work_skill2_cool = false;
      Q.work_skill2_level = 1;
      Q.work_skill2_A = 0;
      Q.work_skill3 = 0;
      Q.work_skill3_cool = false;
      Q.work_skill3_level = 1;
      Q.work_skill3_A = 0;
      Q.work_skill4 = 0;
      Q.work_skill4_cool = false;
      Q.work_skill4_level = 1;
      Q.work_skill4_A = 0;
      Q.work_skill5 = 0;
      Q.work_skill5_cool = false;
      Q.work_skill5_level = 1;
      Q.work_skill5_A = 0;
      Q.raid_coin = 200;
      Q.powerstone = 0;
      Q.update = 8;
      savePlayer(Q, sender);
    }
  }
 }
 
 if(haveData(sender)) {
   if(user.update == 8){
     replier.reply("자동 업데이트 완료!\n\n장비 리뉴얼\nCode : A_RP04");
     Q = updatePlayer(sender);{
       Q.inv_stone2 = 0;
       Q.inv_moon_1 = 0;
       Q.inv_moon_2 = 0;
       Q.inv_moon_3 = 0;
       Q.inv_moon_4 = 0;
       Q.inv_moon_5 = 0;
       Q.inv_book_1 = 0;
       Q.inv_book_2 = 0;
       Q.inv_book_3 = 0;
       Q.armor_book_u = 10;
       Q.armor_end_u = 0;
       Q.armor_book_1 = 10;
       Q.armor_end_1 = 0;
       Q.update = 9;
       Q.inv_jstone_sl = 0;
       Q.inv_armor_frag_1 = 0;
       Q.inv_armor_frag_2 = 0;
       Q.inv_armor_frag_3 = 0;
       Q.inv_armor_frag_4 = 0;
       Q.armor_id_u = 0;
       Q.armor_level_u = 0;
       savePlayer(Q, sender);
     }
   }
 }

if (haveData(sender)) {
  if (user.pickaxe_level < 10 && user.pickaxe_Exp >= user.pickaxe_Expmax) {
    replier.reply("Pickaxe Level Up!\n곡괭이 레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_level + " -> 현재 레벨 " + (user.pickaxe_level + 1));
    user.pickaxe_level += 1;
    user.pickaxe_Exp -= user.pickaxe_Expmax;
    user.pickaxe_Expmax += 50;
    user.pickaxe_dirt -= 50;
    user.pickaxe_stone += 50;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_level >= 10 && user.pickaxe_level < 20 && user.pickaxe_Exp >= user.pickaxe_Expmax) {
    replier.reply("Pickaxe Level Up!\n곡괭이 레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_level + " -> 현재 레벨 " + (user.pickaxe_level + 1));
    user.pickaxe_level += 1;
    user.pickaxe_Exp -= user.pickaxe_Expmax;
    user.pickaxe_Expmax += 50;
    user.pickaxe_dirt -= 50;
    user.pickaxe_stone += 40;
    user.pickaxe_coal += 10;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_level >= 20 && user.pickaxe_level < 25 && user.pickaxe_Exp >= user.pickaxe_Expmax) {
    replier.reply("Pickaxe Level Up!\n곡괭이 레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_level + " -> 현재 레벨 " + (user.pickaxe_level + 1));
    user.pickaxe_level += 1;
    user.pickaxe_Exp -= user.pickaxe_Expmax;
    user.pickaxe_Expmax += 20;
    user.pickaxe_dirt -= 50;
    user.pickaxe_stone += 25;
    user.pickaxe_coal += 15;
    user.pickaxe_iron += 10;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_level >= 25 && user.pickaxe_level < 30 && user.pickaxe_Exp >= user.pickaxe_Expmax) {
    replier.reply("Pickaxe Level Up!\n곡괭이 레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_level + " -> 현재 레벨 " + (user.pickaxe_level + 1));
    user.pickaxe_level += 1;
    user.pickaxe_Exp -= user.pickaxe_Expmax;
    user.pickaxe_Expmax += 20;
    user.pickaxe_dirt -= 50;
    user.pickaxe_stone += 20;
    user.pickaxe_coal += 15;
    user.pickaxe_iron += 14;
    user.pickaxe_silver += 1;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_level >= 30 && user.pickaxe_level < 35 && user.pickaxe_Exp >= user.pickaxe_Expmax) {
    replier.reply("Pickaxe Level Up!\n곡괭이 레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_level + " -> 현재 레벨 " + (user.pickaxe_level + 1));
    user.pickaxe_level += 1;
    user.pickaxe_Exp -= user.pickaxe_Expmax;
    user.pickaxe_Expmax += 20;
    user.pickaxe_dirt -= 70;
    user.pickaxe_stone += 30;
    user.pickaxe_coal += 20;
    user.pickaxe_iron += 15;
    user.pickaxe_silver += 5;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_level >= 35 && user.pickaxe_level < 40 && user.pickaxe_Exp >= user.pickaxe_Expmax) {
    replier.reply("Pickaxe Level Up!\n곡괭이 레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_level + " -> 현재 레벨 " + (user.pickaxe_level + 1));
    user.pickaxe_level += 1;
    user.pickaxe_Exp -= user.pickaxe_Expmax;
    user.pickaxe_Expmax += 20;
    user.pickaxe_dirt -= 70;
    user.pickaxe_stone += 25;
    user.pickaxe_coal += 20;
    user.pickaxe_iron += 17;
    user.pickaxe_silver += 8;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_level >= 40 && user.pickaxe_level < 50 && user.pickaxe_Exp >= user.pickaxe_Expmax) {
    replier.reply("Pickaxe Level Up!\n곡괭이 레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_level + " -> 현재 레벨 " + (user.pickaxe_level + 1));
    user.pickaxe_level += 1;
    user.pickaxe_Exp -= user.pickaxe_Expmax;
    user.pickaxe_Expmax += 20;
    user.pickaxe_dirt -= 75;
    user.pickaxe_stone += 30;
    user.pickaxe_coal += 20;
    user.pickaxe_iron += 17;
    user.pickaxe_silver += 8;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_level >= 50 && user.pickaxe_level < 60 && user.pickaxe_Exp >= user.pickaxe_Expmax) {
    replier.reply("Pickaxe Level Up!\n곡괭이 레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_level + " -> 현재 레벨 " + (user.pickaxe_level + 1));
    user.pickaxe_level += 1;
    user.pickaxe_Exp -= user.pickaxe_Expmax;
    user.pickaxe_Expmax += 20;
    user.pickaxe_dirt -= 80;
    user.pickaxe_stone += 30;
    user.pickaxe_coal += 20;
    user.pickaxe_iron += 20;
    user.pickaxe_silver += 10;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_level >= 60 && user.pickaxe_level < 70 && user.pickaxe_Exp >= user.pickaxe_Expmax) {
    replier.reply("Pickaxe Level Up!\n곡괭이 레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_level + " -> 현재 레벨 " + (user.pickaxe_level + 1));
    user.pickaxe_level += 1;
    user.pickaxe_Exp -= user.pickaxe_Expmax;
    user.pickaxe_Expmax += 20;
    user.pickaxe_dirt -= 80;
    user.pickaxe_stone += 40;
    user.pickaxe_coal += 25;
    user.pickaxe_iron += 10;
    user.pickaxe_silver += 5;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_level >= 70 && user.pickaxe_level < 80 && user.pickaxe_Exp >= user.pickaxe_Expmax) {
    replier.reply("Pickaxe Level Up!\n곡괭이 레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_level + " -> 현재 레벨 " + (user.pickaxe_level + 1));
    user.pickaxe_level += 1;
    user.pickaxe_Exp -= user.pickaxe_Expmax;
    user.pickaxe_Expmax += 20;
    user.pickaxe_dirt -= 100;
    user.pickaxe_stone += 60;
    user.pickaxe_coal += 25;
    user.pickaxe_iron += 10;
    user.pickaxe_silver += 4;
    user.pickaxe_gold += 1;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_level >= 80 && user.pickaxe_level < 90 && user.pickaxe_Exp >= user.pickaxe_Expmax) {
    replier.reply("Pickaxe Level Up!\n곡괭이 레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_level + " -> 현재 레벨 " + (user.pickaxe_level + 1));
    user.pickaxe_level += 1;
    user.pickaxe_Exp -= user.pickaxe_Expmax;
    user.pickaxe_Expmax += 30;
    user.pickaxe_stone -= 100;
    user.pickaxe_coal += 62;
    user.pickaxe_iron += 30;
    user.pickaxe_silver += 6;
    user.pickaxe_gold += 2;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_level >= 90 && user.pickaxe_level < 100 && user.pickaxe_Exp >= user.pickaxe_Expmax) {
    replier.reply("Pickaxe Level Up!\n곡괭이 레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_level + " -> 현재 레벨 " + (user.pickaxe_level + 1));
    user.pickaxe_level += 1;
    user.pickaxe_Exp -= user.pickaxe_Expmax;
    user.pickaxe_Expmax += 30;
    user.pickaxe_stone -= 95;
    user.pickaxe_coal += 48;
    user.pickaxe_iron += 35;
    user.pickaxe_silver += 10;
    user.pickaxe_gold += 2;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_level >= 100 && user.pickaxe_level < 110 && user.pickaxe_Exp >= user.pickaxe_Expmax) {
    replier.reply("Pickaxe Level Up!\n곡괭이 레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_level + " -> 현재 레벨 " + (user.pickaxe_level + 1));
    user.pickaxe_level += 1;
    user.pickaxe_Exp -= user.pickaxe_Expmax;
    user.pickaxe_Expmax += 40;
    user.pickaxe_coal -= 45;
    user.pickaxe_iron += 24;
    user.pickaxe_silver += 15;
    user.pickaxe_gold += 5;
    user.pickaxe_cristal += 1;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_level >= 110 && user.pickaxe_level < 119 && user.pickaxe_Exp >= user.pickaxe_Expmax) {
    replier.reply("Pickaxe Level Up!\n곡괭이 레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_level + " -> 현재 레벨 " + (user.pickaxe_level + 1));
    user.pickaxe_level += 1;
    user.pickaxe_Exp -= user.pickaxe_Expmax;
    user.pickaxe_Expmax += 80;
    user.pickaxe_coal -= 45;
    user.pickaxe_iron += 21;
    user.pickaxe_silver += 15;
    user.pickaxe_gold += 8;
    user.pickaxe_cristal += 1;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_level >= 119 && user.pickaxe_level < 120 && user.pickaxe_Exp >= user.pickaxe_Expmax) {
    replier.reply("Pickaxe Level Up!\n곡괭이 레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_level + " -> 현재 레벨 " + (user.pickaxe_level + 1) + "\n\n최고레벨 달성!!!!\n*곡괭이 진화 로, 곡괭이를 진화시키세요!");
    user.pickaxe_level = "MAX";
    user.pickaxe_Exp -= user.pickaxe_Expmax;
    user.pickaxe_Expmax += 80;
    user.pickaxe_dirt = 2000;
    user.pickaxe_stone = 3000;
    user.pickaxe_coal = 2000;
    user.pickaxe_iron = 2000;
    user.pickaxe_silver = 800;
    user.pickaxe_gold = 180;
    user.pickaxe_cristal = 19;
    user.pickaxe_diamond = 1;
    user.pickaxe_over_level = 0;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_over_level >= 1 && user.pickaxe_over_level < 9 && user.pickaxe_over_Exp >= user.pickaxe_over_Expmax && user.pickaxe_over_id == 1) {
    replier.reply("Pickaxe Level Up!\n곡괭이 진화레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_over_level + " -> 현재 레벨 " + (user.pickaxe_over_level + 1));
    user.pickaxe_over_level += 1;
    user.pickaxe_over_Exp -= user.pickaxe_over_Expmax;
    user.pickaxe_over_Expmax += 5000;
    user.pickaxe_dirt -= 200;
    user.pickaxe_stone += 50;
    user.pickaxe_coal += 50;
    user.pickaxe_iron += 50;
    user.pickaxe_silver += 50;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_over_level >= 1 && user.pickaxe_over_level < 2 && user.pickaxe_over_Exp >= user.pickaxe_over_Expmax && user.pickaxe_over_id == 2) {
    replier.reply("Pickaxe Level Up!\n곡괭이 진화레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_over_level + " -> 현재 레벨 " + (user.pickaxe_over_level + 1));
    user.pickaxe_over_level += 1;
    user.pickaxe_over_Exp -= user.pickaxe_over_Expmax;
    user.pickaxe_over_Expmax = 2500000;
    user.pickaxe_Expboost += 0.1;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_over_level >= 1 && user.pickaxe_over_level < 10 && user.pickaxe_over_Exp >= user.pickaxe_over_Expmax && user.pickaxe_over_id == 3) {
    replier.reply("Pickaxe Level Up!\n곡괭이 진화레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_over_level + " -> 현재 레벨 " + (user.pickaxe_over_level + 1));
    user.pickaxe_over_level += 1;
    user.pickaxe_over_Exp -= user.pickaxe_over_Expmax;
    user.pickaxe_over_Expmax += 4000;
    user.pickaxe_silver -= 3;
    user.pickaxe_gold += 3;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_over_level >= 10 && user.pickaxe_over_level < 20 && user.pickaxe_over_Exp >= user.pickaxe_over_Expmax && user.pickaxe_over_id == 3) {
    replier.reply("Pickaxe Level Up!\n곡괭이 진화레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_over_level + " -> 현재 레벨 " + (user.pickaxe_over_level + 1));
    user.pickaxe_over_level += 1;
    user.pickaxe_over_Exp -= user.pickaxe_over_Expmax;
    user.pickaxe_over_Expmax += 10000;
    user.pickaxe_gold -= 1;
    user.pickaxe_cristal += 1;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_over_level >= 20 && user.pickaxe_over_level < 21 && user.pickaxe_over_Exp >= user.pickaxe_over_Expmax && user.pickaxe_over_id == 3) {
    replier.reply("Pickaxe Level Up!\n곡괭이 진화레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_over_level + " -> 현재 레벨 " + (user.pickaxe_over_level + 1));
    user.pickaxe_over_level += 1;
    user.pickaxe_over_Exp -= user.pickaxe_over_Expmax;
    user.pickaxe_over_Expmax = 200000;
    user.pickaxe_cristal -= 1;
    user.pickaxe_diamond += 1;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_over_level >= 21 && user.pickaxe_over_level < 22 && user.pickaxe_over_Exp >= user.pickaxe_over_Expmax && user.pickaxe_over_id == 3) {
    replier.reply("Pickaxe Level Up!\n곡괭이 진화레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_over_level + " -> 현재 레벨 " + (user.pickaxe_over_level + 1));
    user.pickaxe_over_level += 1;
    user.pickaxe_over_Exp -= user.pickaxe_over_Expmax;
    user.pickaxe_over_Expmax += 50000;
    user.pickaxe_cristal -= 1;
    user.pickaxe_diamond += 1;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
  if (user.pickaxe_over_level >= 22 && user.pickaxe_over_level < 23 && user.pickaxe_over_Exp >= user.pickaxe_over_Expmax && user.pickaxe_over_id == 3) {
    replier.reply("Pickaxe Level Up!\n곡괭이 진화레벨이 상승했습니다!\n\n이전 레벨 " + user.pickaxe_over_level + " -> 현재 레벨 " + (user.pickaxe_over_level + 1) + "\n\n축하드립니다! 진화 곡괭이 만렙 달성!! 🎉🎉");
    user.pickaxe_over_level = "MAX";
    user.pickaxe_over_Exp -= user.pickaxe_over_Expmax;
    user.pickaxe_over_Expmax = 1000000000;
    user.pickaxe_cristal -= 1;
    user.pickaxe_diamond += 1;
    savePlayer(user, sender);
  }
}

if (haveData(sender)) {
      if (user.Exp >= user.Expmax && user.level < 11) {
        replier.reply("Level Up!\n" + (user["level"] + 1) + "레벨이 되었습니다!\n\n[+] 스탯포인트 2지급!");
        user.level += 1;
        user.hp += 5;
        user.hpmax += 5;
        user.atk += 2;
        user.mpatk += 2;
        user.mp += 4;
        user.mpmax += 4;
        user.statpoint += 2;
        user.Exp -= user.Expmax;
        user.Expmax += 300;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user, null, '\t'));
      }
    }
    
    if (haveData(sender)) {
      if (user.Exp >= user.Expmax && user.level < 31 && user.level > 10) {
        replier.reply("Level Up!\n" + (user["level"] + 1) + "레벨이 되었습니다!\n\n[+] 스탯포인트 2지급!");
        user.level += 1;
        user.hp += 5;
        user.hpmax += 5;
        user.atk += 2;
        user.mpatk += 2;
        user.mp += 4;
        user.mpmax += 4;
        user.statpoint += 2;
        user.Exp -= user.Expmax;
        user.Expmax += 500;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user, null, '\t'));
      }
    }
    
    if (haveData(sender)) {
      if (user.Exp >= user.Expmax && user.level < 51 && user.level > 30) {
        replier.reply("Level Up!\n" + (user["level"] + 1) + "레벨이 되었습니다!\n\n[+] 스탯포인트 2지급!");
        user.level += 1;
        user.hp += 5;
        user.hpmax += 5;
        user.atk += 2;
        user.mpatk += 2;
        user.mp += 4;
        user.mpmax += 4;
        user.statpoint += 2;
        user.Exp -= user.Expmax;
        user.Expmax += 1050;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user, null, '\t'));
      }
    }

    if (haveData(sender)) {
      if (user.Exp >= user.Expmax && user.level < 71 && user.level > 50) {
        replier.reply("Level Up!\n" + (user["level"] + 1) + "레벨이 되었습니다!\n\n[+] 스탯포인트 2지급!");
        user.level += 1;
        user.hp += 5;
        user.hpmax += 5;
        user.atk += 2;
        user.mpatk += 2;
        user.mp += 4;
        user.mpmax += 4;
        user.statpoint += 2;
        user.Exp -= user.Expmax;
        user.Expmax += 1800;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user, null, '\t'));
      }
    }
    
    if (haveData(sender)) {
      if (user.Exp >= user.Expmax && user.level < 101 && user.level > 70) {
        replier.reply("Level Up!\n" + (user["level"] + 1) + "레벨이 되었습니다!\n\n[+] 스탯포인트 2지급!");
        user.level += 1;
        user.hp += 5;
        user.hpmax += 5;
        user.atk += 2;
        user.mpatk += 2;
        user.mp += 4;
        user.mpmax += 4;
        user.statpoint += 2;
        user.Exp -= user.Expmax;
        user.Expmax += 3200;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user, null, '\t'));
      }
    }
    
    if (haveData(sender)) {
      if (user.Exp >= user.Expmax && user.level < 131 && user.level > 100) {
        replier.reply("Level Up!\n" + (user["level"] + 1) + "레벨이 되었습니다!\n\n[+] 스탯포인트 2지급!");
        user.level += 1;
        user.hp += 5;
        user.hpmax += 5;
        user.atk += 2;
        user.mpatk += 2;
        user.mp += 4;
        user.mpmax += 4;
        user.statpoint += 2;
        user.Exp -= user.Expmax;
        user.Expmax += 5900;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user, null, '\t'));
      }
    }
    
    if (haveData(sender)) {
      if (user.Exp >= user.Expmax && user.level < 161 && user.level > 130) {
        replier.reply("Level Up!\n" + (user["level"] + 1) + "레벨이 되었습니다!\n\n[+] 스탯포인트 2지급!");
        user.level += 1;
        user.hp += 5;
        user.hpmax += 5;
        user.atk += 2;
        user.mpatk += 2;
        user.mp += 4;
        user.mpmax += 4;
        user.statpoint += 2;
        user.Exp -= user.Expmax;
        user.Expmax += 13300;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user, null, '\t'));
      }
    }
    
    if (haveData(sender)) {
      if (user.Exp >= user.Expmax && user.level < 201 && user.level > 160) {
        replier.reply("Level Up!\n" + (user["level"] + 1) + "레벨이 되었습니다!\n\n[+] 스탯포인트 2지급!");
        user.level += 1;
        user.hp += 5;
        user.hpmax += 5;
        user.atk += 2;
        user.mpatk += 2;
        user.mp += 4;
        user.mpmax += 4;
        user.statpoint += 2;
        user.Exp -= user.Expmax;
        user.Expmax += 25000;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user, null, '\t'));
      }
    }
    
    if (haveData(sender)) {
      if (user.Exp >= user.Expmax && user.level < 231 && user.level > 200) {
        replier.reply("Level Up!\n" + (user["level"] + 1) + "레벨이 되었습니다!\n\n[+] 스탯포인트 2지급!");
        user.level += 1;
        user.hp += 5;
        user.hpmax += 5;
        user.atk += 2;
        user.mpatk += 2;
        user.mp += 4;
        user.mpmax += 4;
        user.statpoint += 2;
        user.Exp -= user.Expmax;
        user.Expmax += 62000;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user, null, '\t'));
      }
    }
    
    if (haveData(sender)) {
      if (user.Exp >= user.Expmax && user.level < 261 && user.level > 230) {
        replier.reply("Level Up!\n" + (user["level"] + 1) + "레벨이 되었습니다!\n\n[+] 스탯포인트 2지급!");
        user.level += 1;
        user.hp += 5;
        user.hpmax += 5;
        user.atk += 2;
        user.mpatk += 2;
        user.mp += 4;
        user.mpmax += 4;
        user.statpoint += 2;
        user.Exp -= user.Expmax;
        user.Expmax += 103000;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user, null, '\t'));
      }
    }
    
    if (haveData(sender)) {
      if (user.Exp >= user.Expmax && user.level < 301 && user.level > 260) {
        replier.reply("Level Up!\n" + (user["level"] + 1) + "레벨이 되었습니다!\n\n[+] 스탯포인트 2지급!");
        user.level += 1;
        user.hp += 5;
        user.hpmax += 5;
        user.atk += 2;
        user.mpatk += 2;
        user.mp += 4;
        user.mpmax += 4;
        user.statpoint += 2;
        user.Exp -= user.Expmax;
        user.Expmax += 187000;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user, null, '\t'));
      }
    }
    
    if (haveData(sender)) {
      if (user.Exp >= user.Expmax && user.level < 351 && user.level > 300) {
        replier.reply("Level Up!\n" + (user["level"] + 1) + "레벨이 되었습니다!\n\n[+] 스탯포인트 2지급!");
        user.level += 1;
        user.hp += 5;
        user.hpmax += 5;
        user.atk += 2;
        user.mpatk += 2;
        user.mp += 4;
        user.mpmax += 4;
        user.statpoint += 2;
        user.Exp -= user.Expmax;
        user.Expmax += 346000;
        FileStream.write(PATH + "playerData/" + sender + "/" + sender + ".json", JSON.stringify(user, null, '\t'));
      }
    }

}