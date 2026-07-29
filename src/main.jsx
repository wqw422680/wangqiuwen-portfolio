import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import "./styles.css";

import sunsetPortrait from "../../生成图片/01-暖色调-日落人像.png";
import rainCity from "../../生成图片/07-俯拍-雨夜城市.png";
import theatreDancer from "../../生成图片/17-全景-舞者与剧院.png";
import shadowPortrait from "../../生成图片/19-近景-雨天情绪肖像.png";
import forestLight from "../../生成图片/25-丁达尔光-森林圣光.png";
import cyberNight from "../../生成图片/26-霓虹光-赛博朋克雨夜.png";
import dialogueCube from "../assets/generated/ai-dialogue-cube.png";
import rainOverpass from "../assets/generated/rain-overpass.png";
import theatreCurtain from "../assets/generated/theatre-curtain.png";
import rainGlassPortrait from "../assets/generated/rain-glass-portrait.png";
import forestSphere from "../assets/generated/forest-sphere.png";
import neonUmbrella from "../assets/generated/neon-umbrella.png";
import inkTypewriter from "../assets/generated/ink-typewriter.png";
import paperPlaneRoom from "../assets/generated/paper-plane-room.png";
import velvetSkyMirror from "../assets/generated/velvet-sky-mirror.png";
import orangeBalloonStairs from "../assets/generated/orange-balloon-stairs.png";
import starBowl from "../assets/generated/star-bowl.png";
import jellyfishElevator from "../assets/generated/jellyfish-elevator.png";
import chromeHorse from "../assets/generated/chrome-horse.png";
import nightPool from "../assets/generated/night-pool.png";
import cassetteCity from "../assets/generated/cassette-city.png";
import sunsetRoom from "../assets/generated/sunset-room.png";
import blueFlowerGallery from "../assets/generated/blue-flower-gallery.png";
import redThreadForest from "../assets/generated/red-thread-forest.png";
import floatingFabric from "../assets/generated/floating-fabric.png";
import mirrorSea from "../assets/generated/mirror-sea.png";
import forestPhone from "../assets/generated/forest-phone.png";
import cityApple from "../assets/generated/city-apple.png";
import cloudDivingBoard from "../assets/generated/cloud-diving-board.png";
import waterUmbrellas from "../assets/generated/water-umbrellas.png";
import orangeSunTowers from "../assets/generated/orange-sun-towers.png";
import redFishTiles from "../assets/generated/red-fish-tiles.png";

const projects = [
  { id: "01", title: "日落肖像", type: "AI 人像创作", year: "2026", image: sunsetPortrait, tone: "peach", description: "以日落时分的暖金色光线为线索，捕捉人物在明暗交界处安静而有力量的瞬间。通过构图、色彩与逆光细节，让画面保留柔和的情绪与电影感。", tags: ["AI Portrait", "Golden Hour", "Visual Storytelling"] },
  { id: "02", title: "语言容器", type: "AI 语料视觉", year: "2026", image: dialogueCube, tone: "peach", description: "把对话的碎片收进透明容器：语言、语气和训练数据在这里成为可被看见的材料。", tags: ["AI", "Data", "Still Life"] },
  { id: "03", title: "蓝调城市", type: "AI 视觉叙事", year: "2026", image: rainCity, tone: "blue", description: "以雨夜、反射与冷光为线索，尝试用连续画面建立一段没有台词的城市故事。", tags: ["Art Direction", "Image Generation", "Story"] },
  { id: "04", title: "雨后天桥", type: "城市氛围", year: "2026", image: rainOverpass, tone: "blue", description: "一段空无一人的路面、一束暖光和大片雨水。城市在安静时也有自己的叙事。", tags: ["City", "Light", "Atmosphere"] },
  { id: "05", title: "幕间", type: "视觉实验", year: "2026", image: theatreDancer, tone: "sand", description: "关于舞台、人物尺度和观看距离的系列实验。用画面让瞬间停留得更久一点。", tags: ["Visual Design", "Composition", "Editorial"] },
  { id: "06", title: "折幕", type: "舞台空间", year: "2026", image: theatreCurtain, tone: "sand", description: "让幕布变成空间本身；在聚光灯落下之前，先留下一个悬浮的可能性。", tags: ["Stage", "Set Design", "Surreal"] },
  { id: "07", title: "潮湿肖像", type: "人物图像研究", year: "2026", image: shadowPortrait, tone: "grey", description: "聚焦天气如何改变人物情绪。以近景、低饱和和水汽感描绘不稳定的内心天气。", tags: ["Portrait", "Lighting", "Image Generation"] },
  { id: "08", title: "窗上的雨", type: "情绪影像", year: "2026", image: rainGlassPortrait, tone: "grey", description: "雨滴、雾气和朦胧轮廓共同构成一种不能被说清的情绪。", tags: ["Mood", "Rain", "Portrait"] },
  { id: "09", title: "森林的光", type: "氛围影像", year: "2026", image: forestLight, tone: "green", description: "将丁达尔光作为主角，在静谧自然场景中探索神秘感和温柔感的平衡。", tags: ["Lighting", "Prompt Design", "Mood"] },
  { id: "10", title: "苔藓与镜面", type: "自然静物", year: "2026", image: forestSphere, tone: "green", description: "自然的随机生长，与镜面极度精确的倒影，构成一次关于观看的实验。", tags: ["Nature", "Object", "Light"] },
  { id: "11", title: "Neon After Rain", type: "世界观概念", year: "2026", image: cyberNight, tone: "violet", description: "一场关于霓虹、雨水和未来城市的视觉设定。让材质、光线和节奏共同构成世界。", tags: ["Worldbuilding", "Concept", "AI Visual"] },
  { id: "12", title: "红伞之后", type: "未来城市", year: "2026", image: neonUmbrella, tone: "violet", description: "当雨停不下来，城市就把每一次倒影都变成另一扇入口。", tags: ["Cyber City", "Rain", "Concept"] },
];

const moreWorks = [
  { id: "13", title: "墨水键盘", type: "语言静物", year: "2026", image: inkTypewriter, tone: "grey", description: "当字符融进墨水，语言不再只是工具，而成为一种会流动的物质。", tags: ["Language", "Object", "Idea"] },
  { id: "14", title: "悬停的信", type: "空间练习", year: "2026", image: paperPlaneRoom, tone: "blue", description: "把一句还未说出口的话，留在一个足够安静的房间里。", tags: ["Space", "Paper", "Silence"] },
  { id: "15", title: "镜中晴天", type: "色彩静物", year: "2026", image: velvetSkyMirror, tone: "violet", description: "红色天鹅绒与蓝色天空相遇，让现实和倒影短暂地站在一起。", tags: ["Color", "Mirror", "Still Life"] },
  { id: "16", title: "橙色气球", type: "城市片段", year: "2026", image: orangeBalloonStairs, tone: "blue", description: "在雨后的灰色楼梯间，一点轻盈就足以改变整个空间的重力。", tags: ["City", "Object", "Rain"] },
  { id: "17", title: "盛星的碗", type: "夜晚静物", year: "2026", image: starBowl, tone: "violet", description: "把夜空缩小，放在桌上；有些愿望适合被温柔地盛起来。", tags: ["Night", "Light", "Still Life"] },
  { id: "18", title: "电梯水母", type: "超现实城市", year: "2026", image: jellyfishElevator, tone: "peach", description: "城市向上时，也许会把一些柔软的东西一起带到高处。", tags: ["City", "Surreal", "Glass"] },
  { id: "19", title: "罂粟与银马", type: "黄昏小景", year: "2026", image: chromeHorse, tone: "sand", description: "金属和花朵同样会反光，只是它们记住光的方式不同。", tags: ["Nature", "Metal", "Dusk"] },
  { id: "20", title: "泳池的白鸟", type: "夜间建筑", year: "2026", image: nightPool, tone: "blue", description: "一个空泳池、一盏水下灯和一只漂浮的白鸟，构成夜的留白。", tags: ["Pool", "Night", "Architecture"] },
  { id: "21", title: "磁带城市", type: "记忆装置", year: "2026", image: cassetteCity, tone: "violet", description: "旧媒介像一座透明城市，里面储存着还没有播放完的时间。", tags: ["Memory", "Media", "Future"] },
  { id: "22", title: "日落的房间", type: "建筑情绪", year: "2026", image: sunsetRoom, tone: "peach", description: "一把椅子面对夕阳；空间不必解释，坐下就会明白。", tags: ["Room", "Sunset", "Minimal"] },
  { id: "23", title: "蓝花展厅", type: "物件研究", year: "2026", image: blueFlowerGallery, tone: "blue", description: "一朵不合常理的花，为安静的白色空间重新规定了尺度。", tags: ["Sculpture", "Blue", "Gallery"] },
  { id: "24", title: "红线森林", type: "自然叙事", year: "2026", image: redThreadForest, tone: "green", description: "一根发光的线穿过树林，像一条正在寻找出口的念头。", tags: ["Forest", "Story", "Light"] },
  { id: "25", title: "漂浮褶皱", type: "材质实验", year: "2026", image: floatingFabric, tone: "blue", description: "布料离开重力的瞬间，颜色和触感先一步开始说话。", tags: ["Fabric", "Form", "Color"] },
  { id: "26", title: "碎镜之海", type: "海岸幻想", year: "2026", image: mirrorSea, tone: "violet", description: "海面把月光打碎，再把它们一片片还给夜晚。", tags: ["Sea", "Moon", "Reflection"] },
  { id: "27", title: "森林电话", type: "叙事静物", year: "2026", image: forestPhone, tone: "green", description: "如果森林会打电话，它大概会说一些不急着被听懂的话。", tags: ["Forest", "Phone", "Fable"] },
  { id: "28", title: "苹果里的城", type: "微型世界", year: "2026", image: cityApple, tone: "peach", description: "把一座夜城放进果实，甜味与灯光就有了共同的外壳。", tags: ["City", "Fruit", "Concept"] },
  { id: "29", title: "云上的跳板", type: "想象建筑", year: "2026", image: cloudDivingBoard, tone: "sand", description: "向前一步之前，先让云替你接住所有犹豫。", tags: ["Cloud", "Space", "Courage"] },
  { id: "30", title: "倒挂的雨伞", type: "光影装置", year: "2026", image: waterUmbrellas, tone: "blue", description: "水被放进雨伞里，雨就成了一件可被观看的装置。", tags: ["Installation", "Water", "Blue"] },
  { id: "31", title: "橙日之间", type: "城市构图", year: "2026", image: orangeSunTowers, tone: "peach", description: "两座冷硬的楼之间，悬着一颗拒绝落下的太阳。", tags: ["City", "Sun", "Brutalist"] },
  { id: "32", title: "红鱼经过", type: "水下构图", year: "2026", image: redFishTiles, tone: "grey", description: "棋盘、水面和一条红鱼，让秩序突然有了方向。", tags: ["Water", "Pattern", "Red"] },
];

const extraThirty = [
  { id: "33", title: "玻璃梨", type: "发光静物", image: "/generated-2/glass-pears.png", tone: "green", description: "果实也可以像灯一样，在暗处保留自己的亮度。", tags: ["Glass", "Fruit", "Light"] },
  { id: "34", title: "月亮梯子", type: "海上幻想", image: "/generated-2/moon-ladder.png", tone: "blue", description: "从海面向上，有一架通往月亮的梯子。", tags: ["Sea", "Moon", "Dream"] },
  { id: "35", title: "云里的车", type: "空间叙事", image: "/generated-2/pink-cloud-car.png", tone: "peach", description: "把出发放在云里，目的地就不必太具体。", tags: ["Cloud", "Car", "Room"] },
  { id: "36", title: "雪地红门", type: "极简景观", image: "/generated-2/red-door-snow.png", tone: "grey", description: "雪地里的门，像一个暂时还没有答案的问题。", tags: ["Snow", "Door", "Red"] },
  { id: "37", title: "金色磁带", type: "声音物件", image: "/generated-2/golden-tape.png", tone: "violet", description: "声音散开以后，留下的是会反光的记忆。", tags: ["Music", "Gold", "Memory"] },
  { id: "38", title: "薰衣草拱门", type: "海上建筑", image: "/generated-2/lavender-arch.png", tone: "peach", description: "海水没有尽头，拱门只是为想象力留下的入口。", tags: ["Ocean", "Arch", "Dawn"] },
  { id: "39", title: "琥珀隧道", type: "夜行片段", image: "/generated-2/amber-lanterns.png", tone: "blue", description: "灯一盏盏向前漂，黑暗也有了方向。", tags: ["Tunnel", "Light", "Night"] },
  { id: "40", title: "陶瓷手", type: "手势研究", image: "/generated-2/ceramic-hand.png", tone: "violet", description: "掌心托着一颗蓝色的光，像托着一句还没说完的话。", tags: ["Hand", "Ceramic", "Blue"] },
  { id: "41", title: "镜面独木舟", type: "雾湖", image: "/generated-2/mirror-canoe.png", tone: "green", description: "漂进雾里时，船也开始成为风景的一部分。", tags: ["Lake", "Mirror", "Fog"] },
  { id: "42", title: "蓝色来电", type: "室内幻想", image: "/generated-2/blue-telephone.png", tone: "blue", description: "电话响起前，房间已经替你听见了。", tags: ["Phone", "Room", "Blue"] },
  { id: "43", title: "岩壁窗口", type: "异境景观", image: "/generated-2/magenta-window.png", tone: "violet", description: "海边的黑色岩石，也会突然打开一扇亮着的窗。", tags: ["Cliff", "Window", "Sea"] },
  { id: "44", title: "漂浮的橙", type: "泳池静物", image: "/generated-2/floating-oranges.png", tone: "peach", description: "午后的光，把普通果实变成漂浮的星球。", tags: ["Orange", "Pool", "Sun"] },
  { id: "45", title: "银云草地", type: "自然物件", image: "/generated-2/silver-cloud.png", tone: "green", description: "一团云落进草地，金属也学会了柔软。", tags: ["Cloud", "Field", "Silver"] },
  { id: "46", title: "绿廊尽头", type: "空间色彩", image: "/generated-2/green-hallway.png", tone: "green", description: "长廊足够安静，一张红凳便成了全部的故事。", tags: ["Hallway", "Green", "Red"] },
  { id: "47", title: "纸的行星", type: "展览装置", image: "/generated-2/paper-planet.png", tone: "sand", description: "折叠之后，纸也可以拥有自己的引力。", tags: ["Paper", "Planet", "Light"] },
  { id: "48", title: "黄色雨衣", type: "森林片段", image: "/generated-2/yellow-raincoat.png", tone: "blue", description: "雨停了，雨衣还在替谁保留一场天气。", tags: ["Rain", "Forest", "Yellow"] },
  { id: "49", title: "珊瑚星球", type: "室内构图", image: "/generated-2/coral-planet.png", tone: "peach", description: "一把椅子承担不起的重量，恰好成为一幅画。", tags: ["Sphere", "Chair", "Coral"] },
  { id: "50", title: "冰花夜路", type: "微观景观", image: "/generated-2/ice-flowers.png", tone: "blue", description: "路面开出透明的花，夜晚从来不止一种温度。", tags: ["Ice", "Street", "Night"] },
  { id: "51", title: "海上的门", type: "蓝色海景", image: "/generated-2/blue-door-ocean.png", tone: "peach", description: "一扇门不需要墙，也能在海面上等待。", tags: ["Door", "Sea", "Dusk"] },
  { id: "52", title: "金蛾书页", type: "夜读静物", image: "/generated-2/gold-moth.png", tone: "violet", description: "有些光不来自灯，而来自你翻开的那一页。", tags: ["Moth", "Books", "Gold"] },
  { id: "53", title: "紫桥", type: "未来建筑", image: "/generated-2/violet-bridge.png", tone: "violet", description: "在雾和峡谷之间，搭一座颜色比现实更轻的桥。", tags: ["Bridge", "Fog", "Future"] },
  { id: "54", title: "盐地橙椅", type: "极简场景", image: "/generated-2/orange-chair.png", tone: "peach", description: "坐下之前，先让水面替你把世界安静下来。", tags: ["Chair", "Water", "Orange"] },
  { id: "55", title: "白蝶行李箱", type: "记忆容器", image: "/generated-2/white-butterflies.png", tone: "sand", description: "离开时带走的，不一定是物品，也可能是一群蝴蝶。", tags: ["Butterfly", "Suitcase", "Red"] },
  { id: "56", title: "霓虹白桦", type: "夜林", image: "/generated-2/neon-forest.png", tone: "green", description: "树干被微光环绕，森林像一段刚刚启动的程序。", tags: ["Forest", "Neon", "Night"] },
  { id: "57", title: "大理石云", type: "桌面宇宙", image: "/generated-2/marble-clouds.png", tone: "grey", description: "云被摆在桌上，天气从此有了可以触摸的形状。", tags: ["Cloud", "Marble", "Black"] },
  { id: "58", title: "湖中红琴", type: "声音景观", image: "/generated-2/red-piano.png", tone: "violet", description: "当钢琴站进水里，雷声也像成了它的伴奏。", tags: ["Piano", "Lake", "Storm"] },
  { id: "59", title: "小月灯", type: "柔软静物", image: "/generated-2/yellow-moon.png", tone: "blue", description: "把月亮放在毛巾上，夜晚便有了可折叠的温度。", tags: ["Moon", "Room", "Soft"] },
  { id: "60", title: "玻璃台阶", type: "丛林建筑", image: "/generated-2/glass-stairs.png", tone: "green", description: "穿过树冠的台阶，让每一步都像是轻轻借来的。", tags: ["Jungle", "Glass", "Dawn"] },
  { id: "61", title: "缎带太阳", type: "概念静物", image: "/generated-2/ribbon-sun.png", tone: "peach", description: "红色绕着光走，像给太阳系上了一句备注。", tags: ["Sun", "Ribbon", "Studio"] },
  { id: "62", title: "银鱼剧场", type: "舞台片段", image: "/generated-2/silver-fish.png", tone: "sand", description: "空座位前悬着一条鱼，所有观众都在想象下一幕。", tags: ["Fish", "Theatre", "Red"] },
];

const animeWorks = [
  { id: "63", title: "雨站来车", type: "动漫叙事", image: "/anime/anime-rain-train.png", tone: "blue", description: "雨中的站台，车灯和积水把等待拉得很长。", tags: ["Anime", "Rain", "Train"], prompt: "日系原创动漫插画：蓝调傍晚的高架火车站台，一位穿芥末黄色雨衣的女孩背对镜头站在画面右侧，银色列车从左侧湿雾中驶入，站台积水清晰倒映青蓝与琥珀色灯光。低机位超广角，铁轨和顶棚向远方强烈收束，雨丝、金属锈迹与水面反射细腻可见；赛璐璐人物上色结合手绘雨景背景，竖版 4:5。人物完整、站台无人、招牌仅保留抽象光块，无文字，无 Logo，无水印。" },
  { id: "64", title: "骑向海边", type: "青春场景", image: "/anime/anime-sunset-bike.png", tone: "peach", description: "顺着晚风骑下山，海面刚好接住落日。", tags: ["Anime", "Sunset", "Bicycle"], prompt: "日系原创动漫插画：长发女孩骑着红色自行车沿山坡小路向下驶向发光海面，后方三分之二视角，白衬衫与头发被海风吹起，路边高草、旧电线杆和远处海边小城依次延伸。橙桃色夕阳占据天空上半部，长阴影横跨路面，35mm 电影构图；清晰角色线稿、手绘云层、温暖胶片颗粒，竖版 4:5。不要车牌、路牌文字、其他车辆或人物，无水印。" },
  { id: "65", title: "云端阅览室", type: "动漫幻想", image: "/anime/anime-cloud-library.png", tone: "sand", description: "书架长进云里，阅读变成一次向上的旅行。", tags: ["Anime", "Library", "Cloud"], prompt: "日系原创动漫幻想插画：巨型古老图书馆建在柔软白云之中，深蓝开衫的少年沿着移动梯向上攀爬，拱形书架从左右两侧直达穹顶，大量书页在金色阳光束里缓缓漂浮。仰视广角，人物小而完整，天空开口位于画面上方中央；象牙白、天蓝与旧金色，精细墨线与水彩空气感，竖版 4:5。书脊只表现纹理不可读，不要文字、Logo、水印。" },
  { id: "66", title: "雨巷霓虹", type: "赛博动漫", image: "/anime/anime-neon-alley.png", tone: "violet", description: "透明伞下的背影，和雨后的城市一起发亮。", tags: ["Anime", "Neon", "Rain"], prompt: "日系原创赛博动漫插画：雨后狭窄霓虹巷道，一位黑发女孩撑着透明雨伞站在画面中下部，青色自动贩卖机光从左侧照亮伞面，右侧洋红窗口与蒸汽形成层次，湿沥青映出粉蓝色纵深光带。平视 28mm 广角、单点透视、清晰赛璐璐线稿与高光雨滴，竖版 4:5。只保留一位人物，所有发光招牌为不可读色块，无文字，无 Logo，无水印。" },
  { id: "67", title: "锦鲤上阶", type: "森林奇想", image: "/anime/anime-koi-stairs.png", tone: "green", description: "锦鲤游向雾里的石阶，把森林照成清晨。", tags: ["Anime", "Forest", "Koi"], prompt: "日系原创动漫插画：清晨的苔藓森林石阶从画面底部向上延伸，数十条发光橙色锦鲤像游在空气中一样沿台阶逆流而上，奶油色外套的小人物停在阶梯底部仰望。低机位纵深构图，深绿雾气、湿润石面、远处一两盏暖橙灯笼；精致墨线、柔和赛璐璐阴影和水彩纹理，竖版 4:5。不要神社文字、额外人物、Logo 或水印。" },
  { id: "68", title: "土星咖啡馆", type: "太空日常", image: "/anime/anime-space-cafe.png", tone: "violet", description: "店打烊后，土星在窗外慢慢经过。", tags: ["Anime", "Space", "Cafe"], prompt: "日系原创动漫插画：透明太空站内的深夜咖啡馆，吧台后的店员背对镜头擦拭木质台面，弧形落地窗外悬着巨大土星和稀疏星群，三盏暖色吊灯把室内照成琥珀色。室内广角，窗框形成干净几何结构，深靛蓝太空与暖黄室内对比；手绘背景、清晰赛璐璐人物，竖版 4:5。菜单与玻璃不出现可读文字，无 Logo，无水印。" },
  { id: "69", title: "来电的蝴蝶", type: "室内动漫", image: "/anime/anime-pink-phone.png", tone: "peach", description: "电话线忽然变成蝴蝶，飞向打开的春天。", tags: ["Anime", "Phone", "Butterfly"], prompt: "日系原创动漫插画：春日清晨的浅色公寓，一台粉色复古拨盘电话置于小圆桌，卷曲电话线在半空自然过渡成一群淡粉蝴蝶并飞向敞开的窗户，纱帘被风轻轻吹起。近景到中景构图，阳光从右侧进入，奶油白、樱粉和天蓝色调；精细线稿、柔和赛璐璐阴影，竖版 4:5。室内无人，电话按键不可读，无文字、Logo、水印。" },
  { id: "70", title: "鲸背的灯", type: "夜空寓言", image: "/anime/anime-moon-whale.png", tone: "blue", description: "在鲸背上提一盏小灯，穿过云和月亮。", tags: ["Anime", "Whale", "Night"], prompt: "日系原创动漫幻想插画：巨大的蓝鲸在布满星点的深夜天空中缓慢游过层层山云，一个小孩安全坐在鲸背中央，双手捧着小小暖色提灯，弯月位于鲸尾后方。低角度仰视，鲸的轮廓与云层形成史诗级纵向尺度，深海军蓝、银白、少量金色光；手绘云朵与优雅动漫线稿，竖版 4:5。仅一位儿童，不要文字、Logo、水印或额外飞行物。" },
  { id: "71", title: "温室雨夜", type: "植物动漫", image: "/anime/anime-glasshouse.png", tone: "green", description: "雨落在玻璃上，植物把夜晚养得很亮。", tags: ["Anime", "Greenhouse", "Rain"], prompt: "日系原创动漫插画：雨夜玻璃温室内，穿长蓝裙的女孩正给发着柔光的植物浇水，一只橙色猫坐在石板小径旁观看，巨大叶片贴近起雾的玻璃窗。三分之四中景，温室拱顶向上延伸，祖母绿植被、蓝绿雨光与琥珀色植物亮度交织；复杂手绘植物背景、干净赛璐璐角色，竖版 4:5。只有一位女孩和一只猫，无文字、Logo、水印。" },
  { id: "72", title: "夜市小机器人", type: "动漫城市", image: "/anime/anime-robot-market.png", tone: "peach", description: "小机器人提着纸袋，穿过刚下过雨的夜市。", tags: ["Anime", "Robot", "Market"], prompt: "日系原创动漫插画：圆润白色服务机器人抱着牛皮纸袋，低机位跟拍它穿过雨后夜市，彩色布棚、成排灯笼和水洼在两侧向远处延伸，远方人群只作为模糊剪影。机器人位于画面中央偏下，红橙灯光与青绿色倒影形成冷暖对比；手绘街景、清晰赛璐璐机械材质，竖版 4:5。招牌为抽象色块，无可读文字，无 Logo，无水印。" },
  { id: "73", title: "灯笼湖", type: "静谧动漫", image: "/anime/anime-lantern-lake.png", tone: "violet", description: "灯笼在湖上漂着，夜色慢慢变成紫色。", tags: ["Anime", "Lake", "Lantern"], prompt: "日系原创动漫插画：黄昏山湖的俯视场景，数百盏橙色纸灯笼漂浮在平静水面，一只小木船从灯笼之间缓慢划过，人物不露正脸，远处是层叠紫色山影与初现星光。高机位纵向构图，湖面完整反射灯笼和天空，靛蓝到紫罗兰渐层；水彩质感背景、克制细线，竖版 4:5。无文字、Logo、水印，不出现城市建筑。" },
  { id: "74", title: "红围巾与雪", type: "冬日动漫", image: "/anime/anime-red-scarf.png", tone: "grey", description: "风把红围巾带得很远，雪山显得更安静。", tags: ["Anime", "Snow", "Scarf"], prompt: "日系原创动漫插画：雪岭顶端，一位穿炭灰色大衣的旅行者背对镜头站立，长长的鲜红围巾被强风卷起，在苍白满月前形成一道弧线；远处山脚只有极少量暖色小镇灯光。宽阔纵向风景、人物为清晰黑色剪影、冰蓝雪面有细致风痕；清爽赛璐璐上色与手绘雪粒，竖版 4:5。不要第二个人、文字、Logo 或水印。" },
  { id: "75", title: "楼顶耳机", type: "都市动漫", image: "/anime/anime-tokyo-rooftop.png", tone: "blue", description: "耳机里的歌，刚好盖过城市的风声。", tags: ["Anime", "Rooftop", "Night"], prompt: "日系原创动漫插画：深夜公寓楼顶，穿学院风开衫的女孩坐在矮墙上戴耳机，背对镜头望向密集的蓝色城市窗灯，旁边晾衣绳和几盆植物被风吹动，薄云前有一轮柔和大月亮。过肩中广角，人物位于下三分之一，城市光点延展至远方；海军蓝、薰衣草紫与零星暖窗光，竖版 4:5。无可读广告、无 Logo、无水印。" },
  { id: "76", title: "向日葵月台", type: "夏日动漫", image: "/anime/anime-sunflower-station.png", tone: "sand", description: "老月台被向日葵围住，列车刚刚离开。", tags: ["Anime", "Sunflower", "Station"], prompt: "日系原创动漫插画：盛夏正午的乡村火车站空月台被高大向日葵包围，一只旧黄色行李箱放在画面前景，远处列车正在白色热雾中离开，巨大积云铺满钴蓝天空。平视广角、月台边缘引向远方，明黄、草绿与高饱和蓝色；怀旧动漫线稿、清晰赛璐璐阴影和轻微胶片颗粒，竖版 4:5。无人、无站名、无文字、Logo、水印。" },
  { id: "77", title: "千纸鹤的河", type: "晨雾动漫", image: "/anime/anime-origami-crane.png", tone: "peach", description: "桥上的人没有回头，纸鹤已经飞过整条河。", tags: ["Anime", "Origami", "Dawn"], prompt: "日系原创动漫插画：黎明河桥上，一位深发年轻女性站在画面右侧，收起的红伞垂在手边，成百只白色千纸鹤从桥下河面向天空盘旋飞起，淡粉晨空被水面完整反射。长焦竖向构图，桥栏形成斜向引导线，大面积留白；轻盈墨线、粉蓝赛璐璐阴影与水彩雾气，竖版 4:5。仅一位人物，纸鹤无文字，无 Logo，无水印。" },
  { id: "78", title: "树根的门", type: "奇幻动漫", image: "/anime/anime-forest-door.png", tone: "green", description: "蓝门半开，森林里多出了一盏不属于这里的灯。", tags: ["Anime", "Door", "Forest"], prompt: "日系原创动漫幻想插画：巨大树根之间立着一扇半开的古董天蓝色木门，门内暖金光倾泻到冷绿苔藓和薄雾上，小小萤火虫围绕门槛飞舞。低机位居中对称构图，树根从四周包围门框，门是唯一建筑元素；浓郁祖母绿、深青和金色，手绘森林背景配干净动漫线稿，竖版 4:5。无人、无门牌文字、无 Logo、无水印。" },
  { id: "79", title: "水母房间", type: "夜间动漫", image: "/anime/anime-aquarium-room.png", tone: "blue", description: "房间那面墙变成海，水母在里面慢慢漂过。", tags: ["Anime", "Aquarium", "Jellyfish"], prompt: "日系原创动漫插画：午夜小卧室的整面远墙是一座发光水族箱，条纹睡衣的孩子盘腿坐在木地板上看透明水母漂过蓝绿色水体，床头暖灯只提供极弱的橙色补光，地面倒映星点与水波。低视角室内构图，孩子背影完整、房间安静整洁；细腻手绘水体、柔和赛璐璐人物，竖版 4:5。无文字、Logo、水印，不出现第二个人。" },
  { id: "80", title: "樱花过街", type: "春日动漫", image: "/anime/anime-sakura-crossing.png", tone: "peach", description: "雨后的花瓣贴着伞面，电车从很远的地方经过。", tags: ["Anime", "Sakura", "Tram"], prompt: "日系原创动漫插画：雨后春日小街，一位年轻女性撑着透明伞从樱花拱廊下穿过，粉色花瓣沿着伞面旋转，远处黄色有轨电车穿过交叉路口，水洼倒映粉色树冠和淡蓝天空。街道高度 35mm 视角，人物位于画面中下部，背景逐层虚化；精细动漫线稿、通透赛璐璐光影，竖版 4:5。街牌不可读、无 Logo、无水印、无拥挤人群。" },
  { id: "81", title: "沙丘飞机", type: "动漫概念", image: "/anime/anime-desert-plane.png", tone: "sand", description: "云影越过沙丘，旧飞机还在等下一次出发。", tags: ["Anime", "Desert", "Plane"], prompt: "日系原创动漫概念插画：蜜桃色沙漠沙丘中，一架小型白色螺旋桨飞机半埋在沙里，穿蓝夹克的探险者从右下方独自走向飞机，机翼系着一面被风吹动的小红旗，巨大的云影掠过沙面。广阔纵向构图，正午硬朗阳光，蜜桃、奶油白和群青蓝三色；干净赛璐璐色块与手绘沙纹，竖版 4:5。飞机无编号和文字，无 Logo、无水印、无其他车辆。" },
  { id: "82", title: "星光小提琴", type: "音乐动漫", image: "/anime/anime-starlight-violin.png", tone: "violet", description: "琴声飞到桥上空，成了缓慢升起的星星。", tags: ["Anime", "Violin", "Moonlight"], prompt: "日系原创动漫插画：月夜老桥中央，一位穿午夜蓝长外套的小提琴手侧身演奏，琴弦上方的发光音符逐渐化为细小星点升向天空，桥下安静河水倒映银月和远处旧城剪影。三分之四中广角，人物清晰、背景柔焦，银蓝月光配少量金色高光；诗意手绘背景、细致衣料与水面反射，竖版 4:5。不要可读乐谱、文字、Logo 或水印。" },
];

const guofengWorks = [
  { id: "83", title: "提灯入山", type: "国风山水", image: "/guofeng/guofeng-mountain-lantern.png", tone: "grey", description: "一盏灯，照亮雾中的山路。", tags: ["Guofeng", "Mountain", "Lantern"], prompt: "原创国风山水插画：深夜云海群山之间，披朱红斗篷的旅人提暖黄纸灯沿悬崖石径前行，满月从右上方照亮层叠墨色峰峦，崖边零星红叶在风中飘落。低机位纵向构图，人物小而完整，重墨山体、淡墨雾气与矿物金点并置；靛蓝、炭黑、朱红、柔金色，绢本与水墨质感，竖版 4:5。无题字、无文字、无 Logo、无水印、无额外人物。" },
  { id: "84", title: "雨巷青伞", type: "江南国风", image: "/guofeng/guofeng-jiangnan-rain.png", tone: "blue", description: "雨水顺着白墙流下，伞下的人走向小桥。", tags: ["Guofeng", "Jiangnan", "Rain"], prompt: "原创江南国风插画：雨后水乡窄巷，一位穿浅青汉服的女子背对镜头撑半透明油纸伞，白墙黑瓦、石桥和水道依次收束，远处两盏桃色灯笼映在水面。平视中广角，雨丝清晰落在伞面和青石路，工笔人物配湿墨建筑；青瓷绿、雾灰、象牙白与暖桃色，竖版 4:5。街巷无人，店牌不可读，无文字、Logo、水印。" },
  { id: "85", title: "星河飞天", type: "岩彩幻想", image: "/guofeng/guofeng-dunhuang-stars.png", tone: "sand", description: "飘带绕过月亮，把沙漠的夜空带得很远。", tags: ["Guofeng", "Mural", "Stars"], prompt: "原创国风岩彩幻想插画：一位身着赭黄与青绿飘带的天女在深钴蓝星空中起舞，长飘带围绕弯月形成流动圆弧，下方仅留远处沙丘与石窟剪影。平面装饰性构图，人物居中但保留充分夜空，细密工笔轮廓、石青石绿与金粉颗粒质感；赭石、朱砂、青金石和古金配色，竖版 4:5。不要宗教题字、无文字、Logo、水印、无其他人物。" },
  { id: "86", title: "云间白鹤", type: "祥云山水", image: "/guofeng/guofeng-crane-clouds.png", tone: "peach", description: "白鹤飞过桃云，远山刚刚醒来。", tags: ["Guofeng", "Crane", "Cloud"], prompt: "原创国风山水插画：三只白鹤穿行于日出时的桃色云层，一只近景白鹤展开完整双翼占画面下半部，远处青绿色群峰与一角小亭隐在薄雾中。仰视纵向构图，云层以写意水墨铺开，鹤羽以工笔细描并点缀金粉；珊瑚粉、象牙白、青瓷绿、淡金色，竖版 4:5。无人、无文字、无 Logo、无水印。" },
  { id: "87", title: "园中月洞", type: "园林国风", image: "/guofeng/guofeng-garden-window.png", tone: "green", description: "从月洞门望出去，荷叶和人都刚好安静。", tags: ["Guofeng", "Garden", "Lotus"], prompt: "原创苏式园林国风插画：从室内透过圆形月洞门望向园中石径，一位淡紫汉服女子立在荷池旁，太湖石、曲檐、玉兰和荷叶将画面层层框住，午后侧光在石板投下柔长影子。月洞门为天然取景框，工笔建筑线条、淡墨树叶、绢本纹理；玉绿、淡紫、茶褐、象牙白，竖版 4:5。仅一位人物，无匾额题字、文字、Logo、水印。" },
  { id: "88", title: "月下琵琶", type: "湖上国风", image: "/guofeng/guofeng-pipa-moon.png", tone: "violet", description: "湖水听见琵琶，月亮就在弦上慢慢颤动。", tags: ["Guofeng", "Pipa", "Moon"], prompt: "原创国风夜景插画：深青色湖面上一艘小木舟缓慢漂浮，身着墨绿传统长袍的乐师侧身弹奏琵琶，满月位于上方，银色波纹从船边扩散，前景荷叶与远处墨山沉入夜雾。侧向三分之四构图，人物与乐器清晰，水和云用写意笔触；青金、墨绿、银白与温木色，竖版 4:5。不要乐谱、题字、文字、Logo、水印。" },
  { id: "89", title: "竹影剑心", type: "水墨武侠", image: "/guofeng/guofeng-bamboo-swordsman.png", tone: "green", description: "竹林起风，红叶穿过一把没有拔出的剑。", tags: ["Guofeng", "Bamboo", "Swordswoman"], prompt: "原创水墨武侠插画：风雨欲来的高大竹林中，白衣女剑客站在浅溪边，长剑仍在鞘中，少量朱红枫叶从画面上方掠过。低机位仰视，竖直竹干形成强烈纵深，人物完整且姿态克制；黑白泼墨、干笔竹叶、仅以朱红作颜色焦点，工笔五官细节，竖版 4:5。无打斗、无血腥、无额外人物、文字、Logo、水印。" },
  { id: "90", title: "放河灯", type: "节庆国风", image: "/guofeng/guofeng-lantern-festival.png", tone: "violet", description: "河灯顺着夜色漂走，桥的倒影也亮了起来。", tags: ["Guofeng", "Festival", "Lantern"], prompt: "原创国风节庆插画：深蓝河岸边，一位浅色汉服人物背对镜头蹲下放出一盏荷花河灯，数十盏朱红与琥珀色灯沿河漂向远处石桥，垂柳从画面上方垂落。平视构图，灯火在墨蓝水面形成长倒影，工笔灯笼配湿墨夜景；朱砂、琥珀、靛蓝和珠白，竖版 4:5。无灯谜、无可读牌匾、无 Logo、水印、无拥挤人群。" },
  { id: "91", title: "青花出龙", type: "器物幻想", image: "/guofeng/guofeng-porcelain-dragon.png", tone: "blue", description: "龙从青花瓷里游出来，水墨跟着它卷起。", tags: ["Guofeng", "Porcelain", "Dragon"], prompt: "原创国风器物插画：深色漆木桌中央立着一只高挑青花瓷瓶，半透明青蓝水墨龙从瓶口盘旋而出，几瓣白梅和少量瓷片悬在空中。侧面戏剧光突出瓷器釉面和龙的流体边缘，近景静物构图；钴蓝、瓷白、黑漆和一点朱红，精细工笔纹饰融合写意水墨，竖版 4:5。无人物、无文字、Logo、水印。" },
  { id: "92", title: "幕起一瞬", type: "戏台国风", image: "/guofeng/guofeng-opera-stage.png", tone: "violet", description: "戏台只亮一盏灯，水袖把黑暗轻轻推开。", tags: ["Guofeng", "Opera", "Stage"], prompt: "原创国风戏台插画：暗红幕布之间，一位原创戏曲表演者穿红黑金纹样戏服立在舞台正中，圆形顶光只照亮人物和向两侧展开的长水袖，背景完全沉入深黑。正面近对称构图，精细工笔服饰、矿物红与金箔纹理、极淡墨影；竖版 4:5。不可模仿既有角色脸谱，不要戏牌、题字、文字、Logo、水印。" },
  { id: "93", title: "荷塘亭影", type: "夏日国风", image: "/guofeng/guofeng-lotus-summer.png", tone: "green", description: "荷叶铺满水面，白鹭把亭子守得很轻。", tags: ["Guofeng", "Lotus", "Pavilion"], prompt: "原创国风夏景插画：高机位俯看一片盛夏荷塘，翡翠色大荷叶与淡粉荷花覆盖水面，小岛中央有一座玉瓦小亭，一只白鹭立在亭边，薄晨雾轻盖远处水面。鸟瞰纵向构图，荷叶工笔细描，水面以湿墨晕染；玉绿、淡粉、珠白与浅金色，竖版 4:5。无人、无题字、无文字、Logo、水印。" },
  { id: "94", title: "雪后旧村", type: "冬景国风", image: "/guofeng/guofeng-snow-village.png", tone: "grey", description: "雪落在旧瓦上，红披风留在门边。", tags: ["Guofeng", "Snow", "Village"], prompt: "原创北方冬景国风插画：大雪后的古村街巷，灰瓦屋顶和枯柿子树从白雪中露出轮廓，黄昏纸窗散出温光，一件朱红披风挂在木门边成为唯一亮色。宽阔竖向街景，雪花前后分层，建筑以淡墨和干笔刻画；炭灰、雪白、旧木棕、朱红，竖版 4:5。无人、门上不出现对联文字、无 Logo、水印。" },
  { id: "95", title: "云茶山", type: "茶山国风", image: "/guofeng/guofeng-tea-mountain.png", tone: "green", description: "云从茶垄间流过，背篓里装着刚醒来的春天。", tags: ["Guofeng", "Tea", "Mountain"], prompt: "原创国风茶山插画：清晨层层茶园顺着山坡弯曲，一位披浅绿斗笠和蓑衣的采茶人背竹篓走在细窄田埂上，云雾从茶垄间缓慢流过，远山逐层淡去。高处广角纵向构图，人物小而清晰；茶园用写意笔触铺陈，人物以细致工笔表现，玉绿、雾白和初阳金色，宣纸质感，竖版 4:5。无文字、Logo、水印、无其他工人。" },
  { id: "96", title: "影戏凤凰", type: "民艺国风", image: "/guofeng/guofeng-shadow-puppet.png", tone: "sand", description: "纸幕后凤凰起舞，手里的木杆还带着灯火。", tags: ["Guofeng", "Shadow Puppet", "Craft"], prompt: "原创国风民艺插画：昏暗小屋中，一面暖黄透光纸幕占画面中央，纸幕后凤凰舞者的皮影剪影正在旋转，前景一双手细致操控木杆，桌上放着雕花皮影盒与红色流苏。近景纵向构图，纸张纤维、木杆与剪影边缘清晰；琥珀、深朱红、黑漆色，传统剪纸语言结合细腻工笔，竖版 4:5。无台词、无文字、Logo、水印。" },
  { id: "97", title: "燕风筝", type: "田野国风", image: "/guofeng/guofeng-kite-sky.png", tone: "sand", description: "燕子风筝飞得很高，麦浪替它托住天空。", tags: ["Guofeng", "Kite", "Field"], prompt: "原创国风田野插画：巨大的燕形纸风筝飞在金色麦田上空，靛蓝与朱红纹样的风筝尾带绕过厚重云层，画面最下方一名传统素衣小孩握住风筝线。低机位仰视，天空占大部分，麦浪以写意笔触翻涌，风筝以工笔纹样细描；金黄、奶油白、靛蓝和朱红，竖版 4:5。风筝上无文字、无 Logo、水印、无其他人物。" },
  { id: "98", title: "城墙灯海", type: "古城夜色", image: "/guofeng/guofeng-ancient-city-night.png", tone: "violet", description: "灯从城墙升起，月亮藏进墨云。", tags: ["Guofeng", "Ancient City", "Night"], prompt: "原创国风夜景插画：河边古城墙与高大望楼在深青夜色中竖起，数百盏暖金小灯从城墙上方缓慢升入天空，半轮月被层叠墨云遮住，河水完整倒映望楼与灯火。长纵向构图，建筑用精准工笔线条，云水以泼墨晕染；深青、炭黑、朱砂、古金色，竖版 4:5。无旗帜、无牌匾文字、无人物、Logo、水印。" },
  { id: "99", title: "雪亭听琴", type: "琴境国风", image: "/guofeng/guofeng-qin-snow.png", tone: "blue", description: "琴声落进雪里，亭外的湖慢慢结冰。", tags: ["Guofeng", "Guqin", "Snow"], prompt: "原创国风雪景插画：冰湖边一座敞开木亭内，深蓝长袍的文人侧身弹奏古琴，小炭炉在琴边发出一点橙光，亭外雪花穿过松枝，远处松山融入白雾。侧向中景，屋檐形成上方框景，古琴细节清晰；墨蓝、雪白、炭黑与余烬橙，干笔雪景配工笔器物，竖版 4:5。无书法、文字、Logo、水印、无其他人物。" },
  { id: "100", title: "碧水龙舟", type: "端午国风", image: "/guofeng/guofeng-dragon-boat.png", tone: "green", description: "龙舟斜切碧水，雾里的山也跟着向前。", tags: ["Guofeng", "Dragon Boat", "River"], prompt: "原创国风运动插画：清晨的翡翠河面上，一艘朱红金色龙首船从前景斜向切开水面，船尾划手只保留有节奏的远景剪影，水花以有力墨线向两侧飞溅，低雾青山在后方竖起。高机位动态斜构图，传统纹样细致但无字；玉绿、朱红、古金、白色水墨，竖版 4:5。无旗帜文字、无 Logo、无水印。" },
  { id: "101", title: "香烟成山", type: "文人静物", image: "/guofeng/guofeng-incense-cloud.png", tone: "sand", description: "香从青瓷里升起，慢慢变成一座月下的山。", tags: ["Guofeng", "Incense", "Still Life"], prompt: "原创国风静物插画：深色木案上一只青瓷香炉与一枝白梅，细长香烟从炉口升起并自然变形成微型水墨群山，山峰间挂着一轮小月。近景竖向构图，窗侧暖光刻出瓷器釉面、木纹和烟雾透明层次；青瓷绿、象牙白、炭黑与古金色，工笔器物融合写意烟山，竖版 4:5。无人、无题字、文字、Logo、水印。" },
  { id: "102", title: "扇中金鱼", type: "水墨奇想", image: "/guofeng/guofeng-goldfish-fan.png", tone: "grey", description: "金鱼从折扇里游出，荷瓣漂在真正的水面。", tags: ["Guofeng", "Fan", "Goldfish"], prompt: "原创国风水墨幻想插画：一柄象牙色折扇平放在深色镜面池塘上，扇面里的淡墨山水与两条朱红金鱼连通，金鱼像从画里游出般穿过扇缘进入真实水面，周围散落几片荷花瓣。俯视诗意构图，扇骨、鱼鳞与水纹工笔清晰，山水为湿墨晕染；象牙白、墨黑、玉绿、朱红，竖版 4:5。扇面无书法、无文字、Logo、水印、无人。" },
];

const imagePrompts = {
  "01": "暖金色日落下的年轻女性肖像，人物站在浅色墙面与长阴影之间，发丝被侧逆光勾出细小光边，镜头缓慢推近捕捉平静但有力量的表情。胶片颗粒、低饱和奶油色调、85mm 浅景深，竖版 4:5，无文字，无水印。",
  "02": "透明亚克力立方体置于暖白色桌面，内部悬浮破碎的对话气泡、字符碎片与柔软的彩色薄膜；午后窗光从侧面穿过玻璃，折射出克制的彩虹光斑。静物棚拍、微距材质细节、柔和阴影，竖版 4:5，无文字，无水印。",
  "03": "雨夜城市的高处俯拍视角，湿漉漉的十字路口反射蓝紫色霓虹，车辆穿过画面留下细长光轨，远处楼宇在雾气里逐渐虚化。延时摄影质感、超广角、冷暖霓虹对比、电影感城市空气，竖版 4:5，无文字，无水印。",
  "04": "雨后空无一人的高架桥下，镜头低机位贴近积水路面向前推进，橙色路灯在水洼中被拉成长条倒影，远处桥体沉入蓝灰晨雾。广角纪实摄影、湿润柏油细节、安静的城市电影感，竖版 4:5，无文字，无水印。",
  "05": "空旷剧院中央，一位舞者在巨大的暖色幕布前旋转，裙摆停留在动作最轻的一瞬，顶部聚光灯切开舞台薄雾，观众席隐没在黑暗中。全景构图、戏剧性明暗、舞台摄影，竖版 4:5，无文字，无水印。",
  "06": "厚重的米白色幕布从天花垂落并向内折叠，像一座可进入的柔软建筑；一束偏暖的顶光落在幕布褶皱和空舞台地面上，空气中漂浮细微尘埃。极简舞美、广角空间感、细腻织物材质，竖版 4:5，无文字，无水印。",
  "07": "阴雨天的近景人物肖像，人物隔着半透明玻璃看向镜头，脸部只被一侧灰白天光照亮，水汽和雨痕将轮廓轻轻打散。50mm 浅景深、低饱和冷灰色、克制情绪摄影，竖版 4:5，无文字，无水印。",
  "08": "镜头贴近布满雨滴的车窗，窗后年轻人物的侧脸只剩朦胧剪影，路边蓝绿色灯光在玻璃水痕中融成流动光斑。雨天电影静帧、微距水珠、柔焦与浅景深，竖版 4:5，无文字，无水印。",
  "09": "清晨森林深处，成束丁达尔光穿过高大树干与薄雾，地面铺满湿润苔藓，画面中央保留一条通往亮处的小径。广角自然摄影、空气感、深绿与金色光线交织，竖版 4:5，无文字，无水印。",
  "10": "一颗被苔藓覆盖的镜面球体静置在潮湿林地，球面完整倒映树冠、雾气与斜射阳光，周围细小水珠清晰可见。微距静物摄影、自然绿与银色反射、极高材质细节，竖版 4:5，无文字，无水印。",
  "11": "未来城市的雨夜街道，低机位穿行于霓虹招牌、蒸汽与湿亮地面之间，远处高楼由紫蓝灯带勾勒，路人剪影撑伞掠过镜头。FPV 飞行感、超广角、冷暖霓虹强对比、赛博电影质感，竖版 4:5，无文字，无水印。",
  "12": "红伞人物站在未来街区的水面倒影前，镜头从伞沿下方低角度仰拍，四周紫色广告灯与蓝色雨雾把街道拉成纵深。雨滴停留在镜头边缘、湿地反光、沉浸式城市叙事，竖版 4:5，无文字，无水印。",
  "13": "老式打字机置于深灰桌面，按键缝隙与纸面边缘不断渗出黑色墨水，墨迹像液体字符缓慢向下流淌。顶侧硬光、近距离微距、黑白与墨蓝的极简静物摄影，竖版 4:5，无文字，无水印。",
  "14": "安静的蓝灰色房间里，一架折纸飞机悬停在半空，窗边的自然光把长长的影子投到地板，桌面上只有一封未封口的信。固定机位、极简空间、柔和晨光与留白构图，竖版 4:5，无文字，无水印。",
  "15": "鲜红天鹅绒幕布前摆放一面椭圆镜子，镜中却映出无云的湛蓝天空与缓慢移动的白云；真实空间保持暗红阴影，镜面亮度清透。编辑风格静物、对称构图、浓郁色彩碰撞，竖版 4:5，无文字，无水印。",
  "16": "雨后混凝土楼梯间，一只明亮的橙色气球悬在阶梯上方，潮湿墙面与金属扶手反射冷蓝天光，气球轻微晃动打破沉静。低机位广角、城市纪实质感、灰蓝与橙色对比，竖版 4:5，无文字，无水印。",
  "17": "深夜木桌中央放着一只黑色陶碗，碗内盛满像星尘一样闪烁的微小光点，几颗光粒溢出碗沿悬浮在暗处。俯拍静物、暖烛光边缘、柔软颗粒与梦幻微距，竖版 4:5，无文字，无水印。",
  "18": "透明电梯缓慢上升穿过城市高楼，一只半透明水母漂浮在轿厢中央，触须被电梯顶灯照得发亮，窗外是远处柔焦的黄昏天际线。广角室内视角、玻璃反射、超现实但安静，竖版 4:5，无文字，无水印。",
  "19": "暮色草地上，一匹银色金属小马站在盛开的红色罂粟之间，落日从背后照来，花瓣与金属表面分别呈现柔软和锐利的反光。中景低机位、金橙暮光、细致材质摄影，竖版 4:5，无文字，无水印。",
  "20": "深蓝夜色里的空泳池，镜头从池边俯视水下灯形成的清冷光晕，一只白色鸟形漂浮物静静停在水面，建筑边缘没入黑暗。建筑摄影、长曝光般平滑水纹、蓝白极简配色，竖版 4:5，无文字，无水印。",
  "21": "一盘透明磁带悬浮在黑暗空间，磁带内部像微缩城市一样亮起细小窗灯与道路，磁带带缓慢展开成发光轨迹。产品静物与科幻场景融合、紫蓝背光、微距细节，竖版 4:5，无文字，无水印。",
  "22": "极简房间的一把椅子正对落地窗，橙金色夕阳斜切进室内，把墙面与地板染成柔和的渐层；窗外没有人物，空气安静而温暖。建筑摄影、固定广角、日落长阴影，竖版 4:5，无文字，无水印。",
  "23": "纯白展厅中央，一朵巨大蓝色花朵从细长展台上缓慢展开，花瓣带有半透明雕塑质感，顶部天窗的冷光让影子干净利落。艺术装置摄影、极简留白、蓝白高反差，竖版 4:5，无文字，无水印。",
  "24": "傍晚森林里，一根细长红线从近处树干绕向远方，在潮湿空气中发出低亮度荧光，镜头沿着红线贴地向前追踪。第一人称行进感、深绿雾气、童话般叙事光线，竖版 4:5，无文字，无水印。",
  "25": "一大片钴蓝色布料在白色空间中脱离重力缓慢翻卷，褶皱边缘被顶部冷光勾亮，阴影像海浪一样落在地面。高速快门定格、材质特写、极简时尚编辑感，竖版 4:5，无文字，无水印。",
  "26": "月夜海岸，海面漂浮着无数碎裂镜片，每一片都倒映不同角度的月亮和深蓝天空，浪花轻推镜片发出细小闪光。低角度长曝光、银蓝冷色调、梦幻海景，竖版 4:5，无文字，无水印。",
  "27": "长满苔藓的森林地面上放着一部复古电话，听筒微微悬起，缠绕的电话线消失在蕨类深处；清晨雾气让远处树木逐层淡去。叙事静物摄影、低机位、湿润绿色细节，竖版 4:5，无文字，无水印。",
  "28": "一颗切开的红苹果置于暗色台面，果肉内部藏着一座微缩夜城，细小道路、车灯和楼宇窗光从果皮边缘向内延伸。微距概念静物、暖红果皮与蓝紫城市光对比，竖版 4:5，无文字，无水印。",
  "29": "云海上方，一块细长跳板从白色平台伸向空中，远处层云缓慢翻涌，人物缺席，只留下向前迈出的想象。超广角建筑构图、高亮柔雾、安静而轻盈的空间感，竖版 4:5，无文字，无水印。",
  "30": "一组倒挂雨伞悬在蓝色展厅顶部，透明伞面内部盛着静止的水，水面映出下方灯光；镜头从下向上仰拍，水滴在边缘凝结。装置艺术摄影、冷蓝光、清晰玻璃折射，竖版 4:5，无文字，无水印。",
  "31": "两栋粗野主义混凝土高楼之间，一颗巨大橙色太阳悬停在狭窄天际，镜头从街道尽头仰望，建筑阴影将画面压出强烈纵深。广角城市构图、颗粒胶片、灰色与橙色强对比，竖版 4:5，无文字，无水印。",
  "32": "俯拍黑白棋盘格水池，一条鲜红金鱼缓慢游过格线，水面折射使棋盘边缘轻微扭曲，画面其他部分保持极度安静。图形化构图、清透水纹、红黑白极简配色，竖版 4:5，无文字，无水印。",
  "33": "三只半透明玻璃梨摆在深色石面上，果肉内部透出柔和黄绿色光，表皮凝结细密水珠，背景完全沉入暗处。棚拍静物、微距玻璃折射、低调电影光，竖版 4:5，无文字，无水印。",
  "34": "平静海面上竖着一架细长金属梯，梯子一直延伸到低悬的满月边缘，月光在水面铺出通往镜头的银色路径。超现实海景、长焦压缩空间、深蓝夜色，竖版 4:5，无文字，无水印。",
  "35": "粉色复古汽车停在漂浮云层组成的室内空间，车窗映出暖白天空，地面像柔软棉花一样没有边界。广角场景设计、低饱和粉彩、梦境般柔焦与空气感，竖版 4:5，无文字，无水印。",
  "36": "大片纯白雪地中央矗立一扇饱和红色木门，门后没有建筑，风吹起极细雪粒掠过画面，远处地平线几乎消失。极简景观摄影、正面构图、红白强对比，竖版 4:5，无文字，无水印。",
  "37": "金色磁带漂浮在暗紫色背景中，展开的磁带带像液态金属般卷曲，边缘被一束窄光点亮，投下柔软弧形阴影。奢华产品静物、微距金属质感、深色棚拍，竖版 4:5，无文字，无水印。",
  "38": "浅紫色拱门独立站在清晨海面，门洞内是更明亮的一层橙粉天空，潮水轻轻漫过台阶并留下镜面倒影。对称建筑构图、黎明柔光、浪漫超现实摄影，竖版 4:5，无文字，无水印。",
  "39": "夜晚的长隧道里，成排琥珀色灯笼从近处延伸到远方，镜头以低机位快速向前掠过，灯光在潮湿地面拉出流动反射。第一人称速度感、长曝光光轨、深蓝与金橙对比，竖版 4:5，无文字，无水印。",
  "40": "一只白色陶瓷手从暗色台座伸出，掌心悬浮一颗微微发光的蓝色玻璃球，指尖釉面反射出冷亮高光。近景静物、博物馆式聚光、细腻裂纹与釉质细节，竖版 4:5，无文字，无水印。",
  "41": "雾气弥漫的湖面上一只深色独木舟缓慢漂流，船底与湖水形成几乎完美的镜面对称，远岸树林只剩淡淡灰绿轮廓。水平低机位、长曝光般平静水面、安静电影感，竖版 4:5，无文字，无水印。",
  "42": "蓝色复古电话放在同色系安静房间的边桌上，午后窗光形成一块明亮矩形，听筒旁有一圈微弱的光晕仿佛刚刚响过。室内静物摄影、蓝色单色调、柔和胶片颗粒，竖版 4:5，无文字，无水印。",
  "43": "黑色海蚀岩壁上嵌着一扇高饱和洋红色窗户，窗内透出暖光，窗外是翻涌但被柔焦处理的灰蓝海面。远景建筑摄影、粗粝岩石细节、超现实色彩冲突，竖版 4:5，无文字，无水印。",
  "44": "阳光直射的蓝色泳池里，多颗橙子像小行星般漂浮，水波将果皮纹理和光影切成细碎图案，镜头从水面高度平移。夏日静物摄影、鲜明蓝橙配色、清透高光，竖版 4:5，无文字，无水印。",
  "45": "银色金属云团低低落在雨后草地，表面映出破碎天空，周围野草被风吹向同一个方向，露珠在前景闪亮。低机位自然静物、阴天柔光、银灰与草绿质感对比，竖版 4:5，无文字，无水印。",
  "46": "狭长的绿色长廊一直通向黑暗尽头，一张鲜红凳子停在画面中央，顶部灯带在地面留下均匀的节奏阴影。单点透视、建筑摄影、绿色环境光与红色焦点，竖版 4:5，无文字，无水印。",
  "47": "巨大的纸质行星悬浮在纯白展厅，表面由无数折痕和层叠纸片组成，天窗投下移动的淡蓝阴影，人物尺度被压缩得很小。装置艺术摄影、超广角、干净高调光，竖版 4:5，无文字，无水印。",
  "48": "雨后针叶林中，一件黄色雨衣挂在空的木衣架上，水珠沿衣袖滴落，背景深处是蓝灰色雾气与湿润树干。中景叙事摄影、冷暖颜色对比、潮湿空气感，竖版 4:5，无文字，无水印。",
  "49": "珊瑚色巨大球体压在一把极简椅子上方，房间被夕阳染成温暖粉橙，球体表面有细腻哑光阴影，像随时会缓慢滚落。编辑空间摄影、低机位、柔和色块与超现实重力感，竖版 4:5，无文字，无水印。",
  "50": "深夜湿润路面上长出半透明冰花，车灯从远处扫过时，冰晶边缘瞬间亮起冷蓝色光，地面反射被拉成长条。微距低机位、雨夜电影灯光、清晰晶体细节，竖版 4:5，无文字，无水印。",
  "51": "一扇钴蓝色旧门独自立在傍晚海面，门下没有墙体，潮水轻拍台阶并映出橙粉色天空，镜头缓慢向门洞靠近。极简超现实海景、广角、温柔暮色渐层，竖版 4:5，无文字，无水印。",
  "52": "摊开的旧书上停着一只金色飞蛾，翅膀带细密金属粉末，在昏暗书房里反射唯一的暖光；翻页的气流让尘埃轻轻浮起。微距静物、浅景深、暗金色电影质感，竖版 4:5，无文字，无水印。",
  "53": "紫色未来桥梁跨越被浓雾填满的峡谷，桥面灯带从前景一直收束到远方，云雾在桥下快速流动。无人机航拍视角、超广角透视、紫蓝单色氛围，竖版 4:5，无文字，无水印。",
  "54": "一把橙色椅子坐落在浅盐地与薄水层交界，天空和椅子在镜面地面形成干净倒影，四周没有其他物体，风把水面吹出极细纹路。极简风景摄影、水平构图、橙白蓝色块，竖版 4:5，无文字，无水印。",
  "55": "旧皮箱放在红色房间中央，箱盖微开，大量白色蝴蝶从缝隙中缓慢飞出，翅膀在侧窗光中呈现半透明边缘。静态广角、叙事电影画面、红白强烈视觉焦点，竖版 4:5，无文字，无水印。",
  "56": "深夜白桦林中，每根树干被细微的青绿色霓虹光环绕，镜头沿树林低空向前穿梭，地面雾气被风拖成长线。FPV 飞行感、超广角、深绿与青色发光材质，竖版 4:5，无文字，无水印。",
  "57": "黑色大理石桌面上摆着数朵白色云团，云朵带有可触摸的石材纹理，顶部柔光让纹路与阴影清晰分层。极简棚拍、俯视静物、黑白灰高级质感，竖版 4:5，无文字，无水印。",
  "58": "暴风雨前的静湖中央，一架鲜红钢琴半浸在水中，琴盖映出厚重乌云，远处闪电短暂照亮山脊。超现实风景摄影、低机位、红色主体与蓝灰风暴对比，竖版 4:5，无文字，无水印。",
  "59": "一盏小小的黄色月亮灯放在柔软白毛巾上，夜蓝色房间只由月亮灯照亮，织物纤维与圆润灯面呈现温暖细节。近景静物、柔焦、低照度治愈氛围，竖版 4:5，无文字，无水印。",
  "60": "透明玻璃台阶穿过茂密热带丛林的树冠，清晨第一束阳光穿过叶片落在阶梯上，台阶边缘映出绿色植被与薄雾。仰视广角建筑摄影、湿润空气、玻璃反射细节，竖版 4:5，无文字，无水印。",
  "61": "纯色棚拍空间中，一条鲜红丝带环绕一颗发光太阳球体缓慢旋转，丝带在高速快门下凝固成利落弧线，地面有柔和的橙色投影。概念静物、干净背景、红橙高饱和配色，竖版 4:5，无文字，无水印。",
  "62": "暗红色空剧院的观众席前，一条银色鱼悬浮在舞台中央，聚光灯照亮鱼鳞的镜面反射，周围幕布与座椅逐渐沉入暗处。戏剧舞台摄影、对称构图、超现实静止感，竖版 4:5，无文字，无水印。",
};

const promptControls = {
  "01": "构图控制：人物占画面上半部，视线略偏离镜头，背景保持干净无道具；肤色自然、五官清晰，不要夸张妆容或多余手指。",
  "02": "构图控制：立方体完整置于画面中央，容器边缘锐利，内部碎片有前后层次；不要出现真实可读的字符、界面或品牌标志。",
  "03": "构图控制：道路交叉点位于下三分之一，车流只保留光轨而不出现清晰车牌；建筑密度渐远，雨雾不要遮住整体透视。",
  "04": "构图控制：镜头高度低于膝盖，前景水洼占画面三分之一，桥体形成斜向引导线；保持无行人、无清晰招牌、无杂乱垃圾。",
  "05": "构图控制：舞者为唯一主体并保持完整肢体，动作轻盈舒展；幕布褶皱向人物聚拢，观众席只留暗部轮廓，不要出现观众。",
  "06": "构图控制：幕布占画面大部分并形成可见通道，舞台边线简洁；避免出现演员、座椅、文字或复杂舞台设备。",
  "07": "构图控制：人物眼部仍可辨认但不过度锐化，雨水位于前景玻璃而非皮肤；背景完全虚化，不出现第二个人或城市标识。",
  "08": "构图控制：雨滴必须清晰分布在最近景，人物轮廓放在中轴偏右；只保留一两处蓝绿光斑，避免霓虹文字和过多颜色。",
  "09": "构图控制：小径从画面下方进入并通往亮处，光束数量控制在三到五束；保持原始森林的自然生长状态，不要建筑或人物。",
  "10": "构图控制：球体占画面中央约三分之一，倒影必须与周围树冠方向一致；苔藓为真实湿润质感，不要塑料感或额外动物。",
  "11": "构图控制：画面具有明确的前景、中景、远景，高楼向上收束；路人仅为模糊剪影，所有霓虹招牌用抽象光块代替可读文字。",
  "12": "构图控制：红伞是唯一高饱和焦点，人物背影不露清晰面孔；地面倒影应完整但略被雨纹打散，避免拥挤街景。",
  "13": "构图控制：打字机按键与墨迹是视觉中心，墨水自然黏稠地向下延展；纸上不出现任何可读文字，背景保持纯净深灰。",
  "14": "构图控制：纸飞机停在画面三分线附近，阴影方向与窗光一致；房间只保留桌、信、窗三种元素，不要人物或多余家具。",
  "15": "构图控制：镜面倒影必须只呈现天空，镜框外仍是红色幕布；镜面边缘清晰，避免出现摄影器材、人物或不合理的额外反射。",
  "16": "构图控制：气球悬于两级台阶之间，细线轻微可见；楼梯透视向上延伸，保留潮湿反光，但不要出现路人或广告贴纸。",
  "17": "构图控制：陶碗边缘清晰且星点集中在碗内，少量光粒向上飘散；桌面保留木纹，不要出现手、餐具或真实星空背景。",
  "18": "构图控制：水母位于电梯中央，伞状轮廓完整、触须柔软下垂；城市窗景保持远焦，不要出现乘客、按钮文字或品牌。",
  "19": "构图控制：银马完整站立于花丛中，尺度略小于真实马匹以增加童话感；罂粟在前后景自然虚化，避免出现骑手或围栏。",
  "20": "构图控制：泳池边缘构成几何斜线，白鸟停在偏右水面；水下灯光只形成一处柔亮圆晕，画面不出现人物、躺椅或文字。",
  "21": "构图控制：磁带轮盘与透明外壳清晰可见，微缩城市限制在磁带内部；背景完全留黑，不要真实唱片封面、可读标签或人物。",
  "22": "构图控制：椅子位于窗前但不遮挡日落，室内仅保留椅子、墙面、地板；阳光投影应方向统一，避免增加装饰物。",
  "23": "构图控制：蓝花是唯一主体并高于展台，花瓣边缘层次分明；展厅墙面无展签、无观众、无文字，阴影干净不杂乱。",
  "24": "构图控制：红线从最近景开始连续延伸至远处，不能断裂或缠成杂乱线团；树干保持真实比例，画面内不出现人物。",
  "25": "构图控制：布料的起伏呈单一流动方向，画面留出大量白色呼吸空间；不要出现衣架、人体或明显服装结构。",
  "26": "构图控制：镜片大小前大后小并沿海面延伸，每片只反射月亮或天空；浪花轻微，不要海岸建筑、船只或人物。",
  "27": "构图控制：电话完整、听筒与机身比例准确，电话线自然没入植被；雾气放在远景，不要出现电线杆、人物或可读号码。",
  "28": "构图控制：苹果剖面清晰且微缩城市严格嵌在果肉内部，城市灯光精细但无可读招牌；不要刀具、盘子或额外水果。",
  "29": "构图控制：跳板从画面下方斜向伸出并悬于云海，平台简洁纯白；不要人物、飞机、鸟类或任何地面参照物。",
  "30": "构图控制：每把雨伞的水面可见且保持水平，伞柄朝下；展厅墙面纯蓝无文字，避免出现观众或多余吊装结构。",
  "31": "构图控制：橙色太阳完整圆形并准确卡在两楼中间，楼体垂直线保持笔直；路面留白，无行人、车辆、广告牌和文字。",
  "32": "构图控制：金鱼为唯一生物且保持优雅弧线，鱼体清晰位于一处格线交界；棋盘格仅被水波轻微扭曲，不要其他鱼类。",
  "33": "构图控制：三只梨前后错落，玻璃厚度、内部折射和水珠都真实；背景不可出现餐具、叶片或人物，避免塑料水果质感。",
  "34": "构图控制：梯子必须笔直且底端接近海面、顶端触及月亮下缘；月亮保持自然纹理，不要星空过密、船只或人物。",
  "35": "构图控制：汽车为完整侧前方视角，车轮轻触云面但不陷入其中；云层简洁蓬松，不要道路、人物、车牌或广告。",
  "36": "构图控制：红门完全正对镜头并保持垂直，雪原留出大面积空白；门上不出现把手文字、图案或门后任何室内景象。",
  "37": "构图控制：磁带带的卷曲线条必须顺滑连贯，金色高光集中在边缘；画面不出现播放器、文字标签、手或其他音乐设备。",
  "38": "构图控制：拱门与倒影尽量接近轴对称，海水只覆盖最下层台阶；不要人物、海鸟、船只与任何装饰性文字。",
  "39": "构图控制：灯笼按节奏向远方缩小，近处边缘可略有运动模糊；隧道结构简洁，不要人物、车辆、出口招牌或可读文字。",
  "40": "构图控制：手指数量与关节比例准确，玻璃球完全悬于掌心上方；背景保持暗而均匀，不要手臂、首饰、文字或第二只手。",
  "41": "构图控制：独木舟略偏画面中心，湖面倒影应与船体连续；雾层分三层递减，避免出现桨手、岸边建筑或水鸟。",
  "42": "构图控制：电话机为唯一明确物件，听筒放回机座或微微抬起即可；蓝色空间保持单色系，不出现插座、人物与任何可读按键。",
  "43": "构图控制：窗口必须嵌在粗粝岩壁中并透出暖光，海平线放低；岩石保留自然纹理，不要人物、海鸟、文字或现代建筑。",
  "44": "构图控制：橙子数量控制在五到七颗，大小因透视略有变化；水面反光明亮但不刺眼，避免泳池梯、人物、杯子等元素。",
  "45": "构图控制：金属云只占草地中央一处，边缘圆润却保留云朵层次；野草受风方向一致，不出现树木、动物和人造物。",
  "46": "构图控制：红凳严格位于走廊视觉中心，门洞与顶灯重复节奏清晰；地面干净无脚印，避免人物、植物和墙面文字。",
  "47": "构图控制：纸行星的折面清晰可辨、边缘不破碎，悬浮高度略高于地面；展厅只保留人物极小剪影或完全无人，不出现展览文字。",
  "48": "构图控制：黄色雨衣保持空心悬挂状态，衣帽与袖口有自然积水；森林背景柔焦，不出现穿衣人物、雨伞、路牌或动物。",
  "49": "构图控制：球体与椅子之间留出压迫性的极小空隙，椅子保持完整不变形；房间极简无窗外景，不要人物、花瓶或文字。",
  "50": "构图控制：冰花集中在近景并呈真实晶体分叉，远处车灯只为柔焦光源；路面湿润但无积雪、无行人、无清晰车牌。",
  "51": "构图控制：蓝门居中且门洞内保持纯暗或海天色，不显示室内；水面倒影略有波纹，画面中不出现墙体、人物、船只。",
  "52": "构图控制：飞蛾的翅脉清晰但不过分华丽，书页可以有抽象纹理却不能有可读文字；背景暗部干净，不要手或眼镜。",
  "53": "构图控制：桥梁从近处向远方形成单一强透视，峡谷被雾填满但保留高度感；不出现车辆、行人、城市建筑或标识。",
  "54": "构图控制：椅子位于画面正中偏下，倒影需完整并略被水纹扰动；盐地平坦无杂草，避免人物、远山、建筑和多余物件。",
  "55": "构图控制：皮箱位于室内中央，蝴蝶从箱内向上扩散且保持不同景深；红墙无花纹与文字，不要人物、旅行标签或其他家具。",
  "56": "构图控制：镜头高度接近地面并沿树干间穿行，近处树干略有速度拖影；霓虹仅贴合树皮轮廓，不要霓虹招牌、人物或建筑。",
  "57": "构图控制：云朵大小由近到远递减并保留大理石纹路，桌面高反射但不过度镜面；没有餐具、人物、天空或其他颜色。",
  "58": "构图控制：钢琴保持完整结构，水位只没过琴脚，红色漆面有真实反射；闪电只在远景短暂出现，不要人物、船只或岸边建筑。",
  "59": "构图控制：月亮灯为唯一发光源，毛巾纤维在近景可见；画面保持温柔低对比，不要星星贴纸、人物或文字。",
  "60": "构图控制：玻璃台阶从画面下方上升到树冠深处，台阶边缘清晰且透出植被；不出现人物、护栏广告、现代城市或动物。",
  "61": "构图控制：太阳球体保持绝对圆形，丝带仅环绕一到两圈且不遮住主体；背景纯净无接缝，不要文字、人物或额外道具。",
  "62": "构图控制：银鱼悬在舞台正中并以侧身姿态呈现，鱼鳞反射只接收聚光；座椅整齐空置，不出现演员、观众、字幕或舞台文字。",
};

function makePrompt(project) {
  if (project.prompt) return project.prompt;
  return `${imagePrompts[project.id]} ${promptControls[project.id]} 生成要求：保持单一明确主体、真实透视与一致光源；不要拼贴感、畸形结构、重复物体、可读文字、Logo、边框或水印。`;
}

function App() {
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [petals, setPetals] = useState([]);
  const lastPetalAt = useRef(0);

  useEffect(() => {
    const move = (event) => {
      setCursor({ x: event.clientX, y: event.clientY });
      if (event.pointerType !== "mouse" || event.timeStamp - lastPetalAt.current < 72) return;
      lastPetalAt.current = event.timeStamp;
      const id = `${event.timeStamp}-${Math.random()}`;
      const petal = { id, x: event.clientX - 5, y: event.clientY - 3, drift: `${Math.round(Math.random() * 44 - 22)}px`, spin: `${Math.round(Math.random() * 220 - 110)}deg`, size: `${8 + Math.round(Math.random() * 5)}px` };
      setPetals((items) => [...items.slice(-18), petal]);
      window.setTimeout(() => setPetals((items) => items.filter((item) => item.id !== id)), 1250);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return <>
    <div className="grain" aria-hidden="true" />
    <div className="cursor" style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }} aria-hidden="true"><span>+</span></div>
    <div className="petal-trail" aria-hidden="true">{petals.map((petal) => <i key={petal.id} style={{ left: petal.x, top: petal.y, "--drift": petal.drift, "--spin": petal.spin, "--size": petal.size }} />)}</div>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="首页">XW<span>®</span></a>
      <p className="header-note">Selected works<br />2026</p>
      <button className="menu-button" onClick={() => setMenuOpen(true)}>Index <i>↗</i></button>
    </header>

    <main id="top">
      <section className="hero">
        <p className="eyebrow">Independent creative portfolio · Shanghai</p>
        <h1><span>思考，</span><span>也要被<em>看见</em>。</span></h1>
        <div className="hero-bottom">
          <p>我是王秋文，一名专注于 AI、内容与视觉体验的创作者。<br />我把模糊的想法变成可以感受、使用和讨论的作品。</p>
          <a href="#works" className="round-link" aria-label="查看作品"><b>↓</b><span>SCROLL<br />TO WORK</span></a>
        </div>
        <div className="hero-orbit" aria-hidden="true"><i /><i /><i /><span>MAKE<br />IT<br />REAL</span></div>
      </section>

      <section className="statement">
        <p className="eyebrow">A little about me</p>
        <div><h2>研究技术，<br />也研究<em>感受。</em></h2><p>我相信作品不该只是完成任务，也应该留下情绪、问题和一点想再看一次的理由。这里收录的是我在 AI 训练、视觉叙事与数字体验中的探索。</p></div>
      </section>

      <section className="works" id="works">
        <div className="section-head"><p className="eyebrow">Selected works</p><p>102 / 102</p></div>
        <div className="project-grid">
          {[...projects, ...moreWorks, ...extraThirty, ...animeWorks, ...guofengWorks].map((project, index) => <motion.article key={project.id} className={`project project-${index + 1}`} initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .65, delay: (index % 2) * .08 }}>
            <button onClick={() => setSelected(project)} className="project-button" aria-label={`查看 ${project.title} 项目`}>
              <div className={`project-image ${project.tone}`}><img src={project.image} alt="" /><span className="view-project">View<br />project <b>↗</b></span></div>
              <p className="project-prompt"><span>Prompt</span>{makePrompt(project)}</p>
              <div className="project-meta"><p><b>{project.id}</b> {project.type}</p><h3>{project.title}</h3><span>{project.year || "2026"}</span></div>
            </button>
          </motion.article>)}
        </div>
      </section>

      <section className="services">
        <div className="services-heading"><p className="eyebrow">What I do</p><p>03 capabilities</p></div>
        <div className="services-list">
          <article className="service-item"><span className="service-number">01</span><div><h3>AI 内容与角色训练</h3><p>从角色语气、训练语料到评估标准，让 AI 的表达稳定且有辨识度。</p></div><span className="service-arrow">↗</span></article>
          <article className="service-item"><span className="service-number">02</span><div><h3>视觉概念与图像叙事</h3><p>用图像、材质和节奏，把一个还没成形的想法变成可感受的世界。</p></div><span className="service-arrow">↗</span></article>
          <article className="service-item"><span className="service-number">03</span><div><h3>交互网页与内容体验</h3><p>把内容组织成有层次、可探索、愿意停留的数字体验。</p></div><span className="service-arrow">↗</span></article>
        </div>
      </section>
    </main>

    <footer>
      <p className="eyebrow">Have an idea?</p>
      <a href="mailto:hello@example.com">让 AI 与想象力，<br /><em>一起成为作品。</em><b>↗</b></a>
      <div><span>© 2026 XIRUI WANG</span><a href="#top">Back to top ↑</a><span>Built with care</span></div>
    </footer>

    <AnimatePresence>{selected && <ProjectModal project={selected} close={() => setSelected(null)} />}</AnimatePresence>
    <AnimatePresence>{menuOpen && <motion.aside className="menu-overlay" initial={{ clipPath: "circle(0% at 94% 6%)" }} animate={{ clipPath: "circle(150% at 94% 6%)" }} exit={{ clipPath: "circle(0% at 94% 6%)" }} transition={{ duration: .7, ease: [.76, 0, .24, 1] }}>
      <button onClick={() => setMenuOpen(false)} className="close-menu">Close ×</button><p className="eyebrow">Navigation</p><a onClick={() => setMenuOpen(false)} href="#top">首页 <i>01</i></a><a onClick={() => setMenuOpen(false)} href="#works">作品 <i>02</i></a><a onClick={() => setMenuOpen(false)} href="mailto:hello@example.com">联系 <i>03</i></a><small>PORTFOLIO / 2026</small>
    </motion.aside>}</AnimatePresence>
  </>;
}

function ProjectModal({ project, close }) {
  return <motion.div className="project-modal" role="dialog" aria-modal="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
    <motion.div className="modal-card" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ duration: .45 }} onClick={(event) => event.stopPropagation()}>
      <button className="modal-close" onClick={close}>Close ×</button>
      <img src={project.image} alt={project.title} />
      <div className="modal-copy"><p className="eyebrow">{project.id} · {project.type} · {project.year || "2026"}</p><h2>{project.title}</h2><p>{project.description}</p><ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div>
    </motion.div>
  </motion.div>;
}

createRoot(document.getElementById("root")).render(<App />);
