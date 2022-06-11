//전처리 계층은 봇의 기본적인 성능 향상과 모듈 확장을 위함이니 무시해도 상관없습니다.
//---------- Preprocessing Layer(전처리) ----------
Device.acquireWakeLock(android.os.PowerManager.PARTIAL_WAKE_LOCK, ''); //백그라운드 실행(수면 모드 비활성화; 배터리 소모량 증가)
importClass( //봇 전체에서 사용되는 java 패키지
    java.lang.System,
    java.lang.Thread,
    java.util.concurrent.LinkedBlockingQueue,
    java.nio.file.Paths,
    java.nio.file.Files
);

Function.prototype.inherit = function(Super){
    if(typeof Super === 'function'){
        if(Super !== this){
            this.prototype = Object.create(Super.prototype);
            this.prototype.constructor = this;
        } else throw new Error('function "'+this.name+'" cannot inherit itself');
    } else throw new TypeError('super class must be a function');
};

const { scriptName, BOT_NAME } = {
    scriptName: "New RPG Bot 4", //일반적으로 쓰는 그 scriptName
    BOT_NAME: "NewRpg" //스토리지(내부 저장소)내 폴더명으로 사용될 이름
};
const SD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath(); // 스토리지 최상단 경로 == '/storage/emulated/0' 혹은 '/sdcard'
const PATH = SD + '/' + BOT_NAME; //봇 경로
const Path = require(PATH+'/prep/PathManager.js')(PATH); // 스토리지 내 경로 가공 및 간단한 파일 읽기/쓰기 및 모듈 불러오는 용도

const { File, Directory } = {
    File: Path.require('prep/File'),
    Directory: Path.require('prep/Directory')
}; // 스토리지와 메모리 내 객체적 상호작용 모듈; 파일, 디렉토리 단위

const setTimeout2 = Path.require('prep/setTimeout2'); // ...A...
const clearTime = setTimeout2.clearTime;
[ setTimeout, setInterval, clearTimeout, clearInterval ] = [
    setTimeout2.setTimeout, setTimeout2.setInterval, (id => clearTime(id)).bind(undefined), (id => clearTime(id)).bind(undefined)
]; // 바로 위 A줄에서부터 여기: setTimeout 대체; 속도 향상 및 스레드 과다 생성 방지

const Channel = Path.require('perp/Channel'); //스레드 관리용 추상 클래스





//---------- Preprocessing Layer(전처리) ----------

//---------- UI Layer(사용자 인터페이스 관리 모듈) ----------
const MAX_MSG_CHANNEL_COUNT = 2; //동시에 처리할 수 있는 메시지 전송 연산 개수; 최대 3개(많을수록 빠르지만, 과도하면 렉 유발 가능성 있음);
