/* ==============================================================
   STORY DATA & STATE MACHINE (NO EMOJIS)
   ============================================================== */
const storyNodes = {
    // CHAPTER 1: Anderson confrontation & Maroa rescue (Original Anderson Interactions)
    0: {
        chapter: "CHƯƠNG 1: BÓNG MA TRONG RỪNG",
        bg: "assets/images/backgrounds/darkforest_bg.jpg",
        speaker: "Anderson",
        speakerTag: "Ác Thể",
        char: "assets/images/characters/anderson_char.webp",
        charClass: "",
        bgm: "ambient",
        text: `Đêm nay thật lạnh lẽo... Cậu có ngửi thấy mùi máu tanh lẫn trong sương mờ không? Nó làm ta thấy cồn cào trong dạ dày...`,
        choices: [
            { text: "Ông là ai? Tại sao lại tiếp cận tôi?", next: 1 },
            { text: "Tôi không ngửi thấy gì cả, tôi chỉ muốn rời khỏi đây ngay lập tức.", next: 2 }
        ]
    },
    1: {
        chapter: "CHƯƠNG 1: BÓNG MA TRONG RỪNG",
        bg: "assets/images/backgrounds/darkforest_bg.jpg",
        speaker: "Anderson",
        speakerTag: "Ác Thể",
        char: "assets/images/characters/anderson_char.webp",
        charClass: "",
        bgm: "ambient",
        text: `Ta ư? Chỉ là một kẻ lang thang thích thu thập những mảnh xương vụn. Cậu có một bộ xương rất đẹp đấy... Đặc biệt là phần xương cổ.`,
        choices: [
            { text: "Đừng lại gần! Tôi có vũ khí đấy!", next: 3 },
            { text: "Làm ơn, gia đình tôi đang đợi tôi về nhà...", next: 4 }
        ]
    },
    2: {
        chapter: "CHƯƠNG 1: BÓNG MA TRONG RỪNG",
        bg: "assets/images/backgrounds/darkforest_bg.jpg",
        speaker: "Anderson",
        speakerTag: "Ác Thể",
        char: "assets/images/characters/anderson_char.webp",
        charClass: "",
        bgm: "ambient",
        text: `Rời khỏi đây sao? Rừng đã khóa chặt cậu rồi. Cậu có nghe thấy tiếng nhai rào rạo ở bụi cây đằng kia không? Bọn chúng cũng đang rất đói.`,
        choices: [
            { text: "Ông bị điên rồi! (Cố gắng bỏ chạy)", next: 3 },
            { text: "Vậy tôi phải làm sao để được sống sót?", next: 5 }
        ]
    },
    3: {
        chapter: "CHƯƠNG 1: BÓNG MA TRONG RỪNG",
        bg: "assets/images/backgrounds/darkforest_bg.jpg",
        speaker: "Anderson",
        speakerTag: "Ác Thể",
        char: "assets/images/characters/anderson_char.webp",
        charClass: "angry-glow",
        bgm: "ambient",
        onEnter: () => {
            flashScreen();
            triggerShake(800);
            playSFX('slash');
        },
        text: `Một lựa chọn ngu ngốc... Ta rất thích những con mồi biết giãy giụa. Tiếng thét của cậu sẽ là bản nhạc tuyệt vời nhất đêm nay.`,
        choices: [
            { text: "Anderson gầm lên, lao tới xé xác bạn...", next: "ending_anderson_bad", primary: true }
        ]
    },
    4: {
        chapter: "CHƯƠNG 1: BÓNG MA TRONG RỪNG",
        bg: "assets/images/backgrounds/darkforest_bg.jpg",
        speaker: "Anderson",
        speakerTag: "Ác Thể",
        char: "assets/images/characters/anderson_char.webp",
        charClass: "",
        bgm: "ambient",
        text: `Gia đình? Tình yêu thương thật kinh tởm, nhưng nó khiến mùi vị thịt của cậu bớt ngon đi một chút... Thôi được rồi, nể tình màn đêm tĩnh lặng này, cút đi trước khi ta đổi ý.`,
        choices: [
            { text: "Vội vã rời khỏi Anderson, chạy sâu vào trong rừng...", next: "maroa_rescue", primary: true }
        ]
    },
    5: {
        chapter: "CHƯƠNG 1: BÓNG MA TRONG RỪNG",
        bg: "assets/images/backgrounds/darkforest_bg.jpg",
        speaker: "Anderson",
        speakerTag: "Ác Thể",
        char: "assets/images/characters/anderson_char.webp",
        charClass: "",
        bgm: "ambient",
        text: `Hãy để lại cho ta một bộ phận trên cơ thể cậu... Một ngón tay, hoặc một con mắt. Đổi lấy phần đời còn lại. Một sự trao đổi công bằng chứ?`,
        choices: [
            { text: "Không bao giờ! Tôi thà chết còn hơn!", next: 3 },
            { text: "Ông... ông muốn ngón tay nào...", next: 6 }
        ]
    },
    6: {
        chapter: "CHƯƠNG 1: BÓNG MA TRONG RỪNG",
        bg: "assets/images/backgrounds/darkforest_bg.jpg",
        speaker: "Anderson",
        speakerTag: "Ác Thể",
        char: "assets/images/characters/anderson_char.webp",
        charClass: "",
        bgm: "ambient",
        text: `Ha ha ha... Ta đùa thôi. Sự tuyệt vọng và hèn nhát trong mắt cậu đã làm ta thỏa mãn rồi. Đi đi, và đừng bao giờ quay đầu lại nhìn khu rừng này nữa.`,
        choices: [
            { text: "Run rẩy quay lưng chạy thục mạng vào bóng đêm...", next: "maroa_rescue", primary: true }
        ]
    },
    "maroa_rescue": {
        chapter: "CHƯƠNG 1: BÓNG MA TRONG RỪNG",
        bg: "assets/images/backgrounds/darkforest_bg.jpg",
        speaker: "Người Dẫn Chuyện",
        char: "assets/images/characters/maroa_neutral.png",
        charClass: "",
        bgm: "ambient",
        text: `Bạn thoát khỏi móng vuốt của Anderson và cắm đầu chạy trong làn sương mù giá lạnh. Bất ngờ phía trước le lói ánh đèn lồng ấm áp.\n\nMột người đàn ông với vẻ ngoài nhã nhặn bước ra từ lùm cây: 'Cậu có bị thương ở đâu không? May mà ta đi tuần bẫy thú nghe thấy tiếng thở dốc. Tên quỷ Anderson đó đã ăn thịt không biết bao nhiêu người lạc vào rừng rồi.'`,
        choices: [
            { text: "Cảm ơn anh! Vừa rồi tôi suýt nữa đã làm mồi cho ông ta...", next: "maroa_invite" }
        ]
    },
    "maroa_invite": {
        chapter: "CHƯƠNG 1: BÓNG MA TRONG RỪNG",
        bg: "assets/images/backgrounds/darkforest_bg.jpg",
        speaker: "Maroa",
        speakerTag: "Thợ Săn",
        char: "assets/images/characters/maroa_neutral.png",
        charClass: "",
        bgm: "ambient",
        text: `Maroa gật đầu đầy vẻ thông cảm: 'Ta là thợ săn sống ở đây nhiều năm. Đêm đã khuya, sương độc sắp tràn xuống thung lũng và Anderson vẫn còn lởn vởn quanh đây. Căn nhà gỗ của ta ở ngay phía trước, rất an toàn. Về đó nghỉ ngơi qua đêm, sáng mai ta sẽ dẫn đường cho cậu về làng.'`,
        choices: [
            { text: "Tuyệt quá, làm phiền anh Maroa rồi!", next: 7, primary: true }
        ]
    },

    // CHAPTER 2: Sweet trap at Maroa's house
    7: {
        chapter: "CHƯƠNG 2: NGÔI NHÀ CỦA MAROA",
        bg: "assets/images/backgrounds/maroa_house.jpg",
        speaker: "Maroa",
        speakerTag: "Chủ Nhà",
        char: "assets/images/characters/maroa_neutral.png",
        charClass: "",
        bgm: "house",
        text: `Căn nhà gỗ cũ kỹ âm u nằm cô độc giữa rừng già, không gian xung quanh tĩnh mịch đến rùng người.\n\n'Cứ tự nhiên như ở nhà của mình nhé. Ta vừa nhóm bếp lò, có hầm sẵn một nồi canh thịt rừng đặc biệt. Uống một bát cho ấm bụng rồi hãy đi ngủ.'`,
        choices: [
            { text: "Mùi canh thịt... nồng nặc mùi tanh lạ lùng quá...", next: 8 },
            { text: "Cảm ơn lòng hiếu khách của anh, tôi thực sự rã rời rồi.", next: 9 }
        ]
    },
    8: {
        chapter: "CHƯƠNG 2: NGÔI NHÀ CỦA MAROA",
        bg: "assets/images/backgrounds/maroa_kitchen.jpg",
        speaker: "Maroa",
        speakerTag: "Chủ Nhà",
        char: "assets/images/characters/maroa_neutral.png",
        charClass: "",
        bgm: "house",
        text: `Ánh mắt Maroa lóe lên tia nhìn lạnh lẽo trong một phần giây rồi nhanh chóng trở lại hiền từ:\n\n'À, gia vị thảo mộc bí truyền của vùng rừng núi thôi, giúp tĩnh tâm và ngủ rất say đấy. Nào, vào buồng trong nghỉ ngơi đi. Đêm nay cứ ngủ một giấc thật sâu nhé...'`,
        choices: [
            { text: "Cảm ơn anh, tôi xin phép vào phòng ngủ trước.", next: 9 }
        ]
    },
    9: {
        chapter: "CHƯƠNG 2: BƯỚC NGOẶT ĐỊNH MỆNH",
        bg: "assets/images/backgrounds/maroa_room_dark.jpg",
        speaker: "Người Dẫn Chuyện",
        char: "",
        charClass: "",
        bgm: "house",
        text: `Đêm đã về khuya. Căn phòng ngủ tối tăm ẩm thấp, chỉ có tiếng gió rít qua khe vách gỗ. Cơn kiệt sức nặng trĩu đè lên mí mắt bạn.\n\nNhưng sâu trong tiềm thức, một linh cảm lạnh gáy mách bảo có điều gì đó cực kỳ ma quái đang diễn ra ngoài gian bếp...`,
        choices: [
            { text: "ĐI NGỦ (Quá kiệt sức, nhắm mắt ngủ một giấc say)", next: "sleep_darkness" },
            { text: "GIỮ TỈNH TÁO (Nghi ngờ, giả vờ ngủ để rình xem)", next: 10, primary: true }
        ]
    },
    "sleep_darkness": {
        chapter: "CHƯƠNG 2: BÓNG TỐI VÔ TẬN",
        bg: "assets/images/backgrounds/maroa_room_dark.jpg",
        speaker: "Người Dẫn Chuyện",
        speakerTag: "Chìm Sâu",
        char: "",
        charClass: "",
        bgm: "house",
        onEnter: () => {
            const bg = document.getElementById('background');
            if (bg) bg.style.filter = "brightness(0.12) contrast(1.3)";
            document.getElementById('blood-overlay').style.opacity = '0';
        },
        text: `Bạn buông xuôi, nhắm nghiền hai mắt lại. Cơn kiệt sức nặng như chì cùng thứ hương liệu ma quái trong chén trà bắt đầu ngấm sâu vào từng mạch máu.\n\nMọi âm thanh của thế giới bên ngoài dần lịm tắt... Không gian xung quanh hóa thành một màn đêm đen đặc, thăm thẳm không đáy. Ý thức của bạn chầm chậm tan biến, trôi dạt vào cõi vô định buốt lạnh...`,
        choices: [
            { text: "... (Ý thức chìm sâu vào màn đêm vô tận)", next: "sleep_awakening" }
        ]
    },
    "sleep_awakening": {
        chapter: "CHƯƠNG 2: TỈNH GIẤC TRÊN BÀN MỔ",
        bg: "assets/images/backgrounds/maroa_kitchen.jpg",
        speaker: "Người Dẫn Chuyện",
        speakerTag: "Kinh Hoàng",
        char: "assets/images/characters/maroa_angry.png",
        charClass: "angry-glow",
        bgm: "house",
        onEnter: () => {
            const bg = document.getElementById('background');
            if (bg) bg.style.filter = "brightness(0.85) contrast(1.1)";
            flashScreen();
            triggerShake(800);
            playSFX('rend');
        },
        text: `XOẸT... XOẸT... RỘT!\n\nTiếng mài sắt rợn người cùng làn khói nóng nực phả thẳng vào mặt khiến bạn bàng hoàng choàng tỉnh!\n\nNhưng bạn không còn nằm trên giường. Bạn kinh hãi nhận ra hai tay hai chân mình đã bị trói chặt gập vào chiếc bàn đá xẻ thịt nhầy nhụa vết máu tanh! Bên cạnh, chiếc vạc đồng khổng lồ đang sôi ùng ục, sủi bọt ngùn ngụt.\n\nNgay trước mắt bạn, Maroa đang đứng sừng sững cúi sát xuống, trên tay lăm lăm con dao phay đồ tể sáng loáng, đôi mắt trợn trừng đỏ ngầu như quỷ dữ!`,
        choices: [
            { text: "Kinh hãi ú ớ giãy giụa: 'Maroa?! Cởi trói cho tôi! Anh định làm cái quái gì vậy?!'", next: "sleep_confrontation" }
        ]
    },
    "sleep_confrontation": {
        chapter: "CHƯƠNG 2: THỊT TƯƠI CHO NỒI CANH",
        bg: "assets/images/backgrounds/maroa_kitchen.jpg",
        speaker: "Maroa",
        speakerTag: "Đồ Tể Khát Máu",
        char: "assets/images/characters/maroa_angry.png",
        charClass: "angry-glow",
        bgm: "chase",
        onEnter: () => {
            flashScreen();
            triggerShake(1200);
            playSFX('screech');
            document.getElementById('blood-overlay').style.opacity = '0.5';
        },
        text: `Maroa nghiêng đầu, kề sát lưỡi dao phay lạnh toát lên cổ họng bạn, rồi ngửa cổ cười sằng sặc xé toạc màn đêm:\n\n'Khục khục khục... Tỉnh rồi sao, con lợn béo bở của ta?! Thuốc ngủ ngấm sâu thế mà vẫn mở được mắt cơ đấy! Đừng phí sức giãy giụa vô ích, dây thừng trói lợn này càng giãy sẽ càng siết nát da thịt ngươi thôi!\n\nNước hầm trong vạc đã sôi sùng sục rồi... Ta sẽ lột sạch da, chặt đứt từng khớp xương và ninh nhừ thịt ngươi cùng thảo mộc rừng! Đêm nay, Maroa này sẽ có một bữa tiệc no nê! HA HA HA!'`,
        choices: [
            { text: "Kinh hoàng hét lên trong tuyệt vọng khi lưỡi dao phay vung cao chém xuống!", next: "ending_sleep" }
        ]
    },
    10: {
        chapter: "CHƯƠNG 2: CHÂN TƯỚNG KINH HOÀNG",
        bg: "assets/images/backgrounds/maroa_kitchen.jpg",
        speaker: "Người Dẫn Chuyện",
        char: "",
        charClass: "",
        bgm: "house",
        text: `Bạn nằm im, nín thở. Từ gian bếp vang lên tiếng mài kim loại rợn tóc gáy: xoẹt... xoẹt... xoẹt...\n\nBạn rón rén nhón chân nhìn qua khe hở cánh cửa: Trong bếp, một cái vạc khổng lồ đang sôi ùng ục. Xung quanh treo đầy những xâu thịt và xương sọ người khô khốc! Maroa đang mài một con dao phay đồ tể sáng loáng, vừa liếm mép vừa cười the thé: 'Thịt tươi non mềm... hầm mật ong hay nướng mọi đây? He he he...'`,
        choices: [
            { text: "Kinh hoàng lùi lại, vô tình giẫm gãy thanh gỗ mục!", next: 11 }
        ]
    },
    11: {
        chapter: "CHƯƠNG 2: NỖI GIẬN CỦA ĐỒ TỂ",
        bg: "assets/images/backgrounds/maroa_kitchen.jpg",
        speaker: "Maroa",
        speakerTag: "Cuồng Nộ",
        char: "assets/images/characters/maroa_angry.png",
        charClass: "angry-glow",
        bgm: "chase",
        onEnter: () => {
            flashScreen();
            triggerShake(1200);
            playSFX('screech');
            document.getElementById('blood-overlay').style.opacity = '0.7';
        },
        text: `RẮC! Tiếng gỗ gãy vang lên khô khốc!\n\nMaroa đột ngột xoay phắt lại, con ngươi đỏ rực như máu, khuôn mặt biến dạng dữ tợn! Hắn rống lên như thú hoang:\n\n'MÀY ĐÃ THẤY HẾT RỒI SAO?! LŨ THỊT SỐNG TÒ MÒ ĐỀU PHẢI CHẾT! TA SẼ PHANH THÂY MÀY NGAY ĐÊM NAY!!!'`,
        choices: [
            { text: "PHÁ CỬA SỔ, LAO RA RỪNG ĐÊM CHẠY TRỐN!", next: "start_chase", primary: true }
        ]
    },

    // CHAPTER 3: Meeting Ninja Dao
    12: {
        chapter: "CHƯƠNG 3: ĐẠO CỦA NINJA",
        bg: "assets/images/backgrounds/ninja_dojo.jpeg",
        speaker: "Người Dẫn Chuyện",
        char: "assets/images/characters/ninja_Dao.webp",
        charClass: "ninja-glow",
        bgm: "dojo",
        onEnter: () => {
            document.getElementById('blood-overlay').style.opacity = '0';
            playSFX('heal');
        },
        text: `Bạn kiệt sức qua được bên kia vực thẳm, cây cầu treo đã bị cắt đứt. Khi mở mắt ra, bạn thấy mình đang nằm trong sân một ngôi đền cổ kính tĩnh lặng giữa rừng trúc.\n\nTrước mặt bạn là một kiếm sĩ mặc giáp đen bí ẩn, thanh katana tỏa ra luồng thanh khí kỳ diệu.`,
        choices: [
            { text: "Ông... ông là ai? Tên đồ tể Maroa đâu rồi?", next: 13 }
        ]
    },
    13: {
        chapter: "CHƯƠNG 3: ĐẠO CỦA NINJA",
        bg: "assets/images/backgrounds/ninja_dojo.jpeg",
        speaker: "Ninja Đạo",
        speakerTag: "Thủ Hộ Giả",
        char: "assets/images/characters/ninja_Dao.webp",
        charClass: "ninja-glow",
        bgm: "dojo",
        text: `Kiếm sĩ khẽ thu đao, giọng nói trầm tĩnh mà uy lực:\n\n'Ta là Ninja Đạo - người canh giữ phong ấn thiêng của khu rừng này. Tên đồ tể Maroa đã bị chặn lại ở bờ vực đá. Cậu có phản xạ sinh tồn phi thường mới trốn thoát được con dao của hắn.'`,
        choices: [
            { text: "Cảm ơn ngài Đạo... Nhưng tôi vẫn cảm thấy Anderson đang rình rập...", next: 14 }
        ]
    },
    14: {
        chapter: "CHƯƠNG 3: ĐẠO CỦA NINJA",
        bg: "assets/images/backgrounds/ninja_dojo.jpeg",
        speaker: "Ninja Đạo",
        speakerTag: "Truyền Dạy",
        char: "assets/images/characters/ninja_Dao.webp",
        charClass: "ninja-glow",
        bgm: "dojo",
        text: `'Linh cảm của cậu rất đúng. Anderson không phải dã thú, hắn là một thực thể bóng tối nguyền rủa đất trời. Dấu ấn máu của hắn đã khắc vào linh hồn cậu. Càng chạy trốn, cậu càng chắc chắn sẽ làm mồi cho hắn.\n\nCách duy nhất để sống sót là: ĐỨNG LÊN VÀ TIÊU DIỆT HẮN.'`,
        choices: [
            { text: "Xin Ninja Đạo truyền dạy võ nghệ để tôi chiến đấu!", next: 15, ninja: true }
        ]
    },
    15: {
        chapter: "CHƯƠNG 3: ĐẠO CỦA NINJA",
        bg: "assets/images/backgrounds/ninja_dojo.jpeg",
        speaker: "Ninja Đạo",
        speakerTag: "Bí Thuật",
        char: "assets/images/characters/ninja_Dao.webp",
        charClass: "ninja-glow",
        bgm: "dojo",
        text: `Ninja Đạo gật đầu, truyền cho bạn các bí kỹ cổ truyền:\n\n1. Trảm Kích: Tụ khí đánh đòn chuẩn xác, hồi phục 25 Ki.\n2. Phi Đao Hắc Ám: Ám khí tẩm độc, gây 25 sát thương và rút máu liên tục.\n3. Thân Pháp Ninja: Hóa thân vào bóng tối, giảm 60% sát thương tới và phản kích cực mạnh.\n4. Bí Thuật Long Hống: Dồn 40 Ki phóng ra kình lực rồng phá nát giáp quái vật (55-70 ST).\n5. Khí Công Hồi Xuân: Điều hòa kinh mạch hồi phục 55 HP.`,
        choices: [
            { text: "Vận khí thử nghiệm và tiếp nhận Kiếm báu!", next: 16, ninja: true }
        ]
    },
    16: {
        chapter: "CHƯƠNG 3: ĐẠO CỦA NINJA",
        bg: "assets/images/backgrounds/ninja_dojo.jpeg",
        speaker: "Ninja Đạo",
        speakerTag: "Xuất Trận",
        char: "assets/images/characters/ninja_Dao.webp",
        charClass: "ninja-glow",
        bgm: "dojo",
        onEnter: () => {
            playSFX('slash');
            flashScreen();
        },
        text: `Bạn hít sâu, một luồng nội lực cuồn cuộn dâng trào trong huyết quản. Thanh Hắc Long Kiếm trong tay bạn phát ra tiếng ngâm reo vang dội!\n\nNinja Đạo mỉm cười: 'Tốt lắm! Cậu là chiến binh thực thụ. Anderson đang đợi ở Tế Đàn Huyết Nguyệt. Hãy đi đi, và kết thúc cơn ác mộng này vĩnh viễn!'`,
        choices: [
            { text: "TIẾN VÀO TẾ ĐÀN - QUYẾT TỬ VỚI ANDERSON!", next: 17, primary: true }
        ]
    },
    17: {
        chapter: "CHƯƠNG KẾT: TẾ ĐÀN HUYẾT NGUYỆT",
        bg: "assets/images/backgrounds/boss_altar.jpg",
        speaker: "Anderson",
        speakerTag: "Ác Thể Cổ Đại",
        char: "assets/images/characters/anderson_char.webp",
        charClass: "angry-glow",
        bgm: "boss",
        onEnter: () => {
            flashScreen();
            triggerShake(800);
            playSFX('screech');
        },
        text: `Ánh trăng đỏ lòm chiếu rọi xuống đống hài cốt tại Tế Đàn Cổ.\n\nAnderson đứng sừng sững giữa làn sương lạnh buốt. Đôi mắt quỷ rực lửa quét qua bạn, giọng cười the thé rợn người vang vọng:\n\n'Khà khà khà... Xem ai mò tới đây này! Kẻ hèn nhát từng run rẩy cầu xin ta tha mạng trong khu rừng đêm ấy... Cậu không bỏ trốn mà lại tự dâng mình vào miệng ta sao?'`,
        choices: [
            { text: "Tôi không còn là con mồi yếu đuối của ông nữa, Anderson!", next: 18 },
            { text: "Thanh Hắc Long Kiếm này sẽ kết thúc sự tàn bạo của ông!", next: 19 }
        ]
    },
    18: {
        chapter: "CHƯƠNG KẾT: TẾ ĐÀN HUYẾT NGUYỆT",
        bg: "assets/images/backgrounds/boss_altar.jpg",
        speaker: "Anderson",
        speakerTag: "Ác Thể Cổ Đại",
        char: "assets/images/characters/anderson_char.webp",
        charClass: "angry-glow",
        bgm: "boss",
        text: `Anderson khẽ nhếch mép, để lộ hàm răng sắc nhọn gỉ máu:\n\n'Ồ? Đôi mắt không còn vẻ sợ hãi nữa nhỉ? Làn chân khí đó... và thanh đao kia... Hóa ra tên tàn dư Ninja Đạo đã nhúng tay vào. Ngươi tưởng mượn chút thuật tầm thường là có thể chống lại ác quỷ bất tử của khu rừng này sao?!'`,
        choices: [
            { text: "Hãy nếm thử bí thuật Long Hống của Ninja Đạo!", next: 20 },
            { text: "Maroa đã phải bỏ chạy, và giờ đến lượt ông đền tội!", next: 21 }
        ]
    },
    19: {
        chapter: "CHƯƠNG KẾT: TẾ ĐÀN HUYẾT NGUYỆT",
        bg: "assets/images/backgrounds/boss_altar.jpg",
        speaker: "Anderson",
        speakerTag: "Ác Thể Cổ Đại",
        char: "assets/images/characters/anderson_char.webp",
        charClass: "angry-glow",
        bgm: "boss",
        text: `Anderson gầm lên một tiếng vang động cả ngọn núi đá:\n\n'Hắc Long Kiếm? Hàng trăm năm trước, chủ nhân thanh kiếm đó đã ngã gục dưới móng vuốt của ta tại chính tế đàn này! Thịt của tên kiếm sĩ ấy rất dai... Liệu thịt của ngươi có ngon hơn không?!'`,
        choices: [
            { text: "Hôm nay ta sẽ đòi lại món nợ máu cho ngài ấy!", next: 20 },
            { text: "Bớt nói nhảm và rút vuốt ra đi!", next: 21 }
        ]
    },
    20: {
        chapter: "CHƯƠNG KẾT: TẾ ĐÀN HUYẾT NGUYỆT",
        bg: "assets/images/backgrounds/boss_altar.jpg",
        speaker: "Anderson",
        speakerTag: "Ác Thể Cuồng Nộ",
        char: "assets/images/characters/anderson_char.webp",
        charClass: "angry-glow",
        bgm: "boss",
        onEnter: () => {
            flashScreen();
            triggerShake(1000);
            playSFX('anderson_roar');
        },
        text: `Bạn tuốt kiếm khỏi vỏ, lưỡi kiếm lóe lên luồng thanh khí xanh biếc rực rỡ cắt đứt màn sương đêm u tối!\n\nAnderson giương đôi vuốt sắc nhọn, huyết khí bao phủ toàn thân: 'Được lắm! Hãy giãy giụa hết sức đi! Ta sẽ nghiền nát ngươi cùng thanh kiếm phế phẩm đó thành tro bụi!'`,
        choices: [
            { text: "XÔNG LÊN! QUYẾT CHIẾN SỐNG CÒN VỚI ANDERSON!", next: "start_boss_battle", primary: true }
        ]
    },
    21: {
        chapter: "CHƯƠNG KẾT: TẾ ĐÀN HUYẾT NGUYỆT",
        bg: "assets/images/backgrounds/boss_altar.jpg",
        speaker: "Anderson",
        speakerTag: "Ác Thể Cuồng Nộ",
        char: "assets/images/characters/anderson_char.webp",
        charClass: "angry-glow",
        bgm: "boss",
        onEnter: () => {
            flashScreen();
            triggerShake(1000);
            playSFX('screech');
        },
        text: `Anderson gầm lên điên cuồng, cơ bắp cuồn cuộn phồng to, móng vuốt cào rách toác mặt đất đá:\n\n'Tên nhãi ranh ngạo mạn! Ta sẽ xé toang lồng ngực ngươi, móc trái tim còn đập uống cạn từng giọt máu nóng! ĐÊM NAY NGƯƠI PHẢI CHẾT KHÔNG TOÀN THÂY!'`,
        choices: [
            { text: "RÚT KIẾM! TRẢM QUỶ BẢO VỆ KHU RỪNG!", next: "start_boss_battle", primary: true }
        ]
    },
    22: {
        chapter: "HẬU CHIẾN: TẾ ĐÀN HUYẾT NGUYỆT",
        bg: "assets/images/backgrounds/boss_altar.jpg",
        speaker: "Anderson",
        speakerTag: "Bại Trận",
        char: "assets/images/characters/anderson_char.webp",
        charClass: "angry-glow",
        bgm: "victory",
        onEnter: () => {
            playSFX('hit');
            flashScreen();
            triggerShake(600);
        },
        text: `Thanh Hắc Long Kiếm chém ngọt qua luồng tà khí hộ thể. Máu đen túa ra sàn tế đàn cổ.\n\nAnderson lảo đảo rồi quỵ ngã xuống nền đá lạnh, hai tay ôm vết thương đang rực sáng chân khí rồng. Ánh đỏ man dại trong mắt hắn dần tắt lịm, giọng the thé gãy vụn trong sự bàng hoàng:\n\n'Khục... khụ... Không thể nào... Ta... chúa tể bóng tối của khu rừng này... lại có thể bại trận dưới tay... một kẻ phàm trần... như ngươi ư?!'`,
        choices: [
            { text: "Sức mạnh từ sự tàn độc của ngươi chưa bao giờ là bất khả chiến bại, Anderson.", next: 23, primary: true },
            { text: "Ngươi đã tước đoạt sinh mạng của biết bao người vô tội. Đây là kết cục xứng đáng!", next: 23 }
        ]
    },
    23: {
        chapter: "HẬU CHIẾN: TẾ ĐÀN HUYẾT NGUYỆT",
        bg: "assets/images/backgrounds/boss_altar.jpg",
        speaker: "Anderson",
        speakerTag: "Hối Hận & Bi Ai",
        char: "assets/images/characters/anderson_char.webp",
        charClass: "fading-glow",
        bgm: "victory",
        text: `Anderson khẽ nhếch môi, nhưng nụ cười không còn vẻ ngông cuồng ác độc mà nhuốm màu cay đắng, đáng thương. Những vết nứt phát sáng lan dần khắp cơ thể hắn:\n\n'Kết cục... sao? Ha... ha... Hóa ra hàng trăm năm qua... ta cũng chỉ là một kẻ đáng thương bị đày đọa trong khu rừng nguyền rủa này... Ta giết chóc... ta săn lùng... chỉ để trốn chạy nỗi cô độc lạnh lẽo trong bóng đêm...'\n\nTừng mảnh tro tàn từ từ tách rời khỏi da thịt hắn, bay lơ lửng vào hư không:\n\n'Nếu như năm xưa... ta không lạc bước vào tà đạo... ta đã có thể có một kiếp người bình dị... Kiếm sĩ trẻ... ngươi... thật may mắn...'`,
        choices: [
            { text: "Mọi hận thù và nguyền rủa hãy kết thúc tại đây. Hãy yên nghỉ đi, Anderson.", next: 24, primary: true },
            { text: "Cơn ác mộng đã hết rồi. Bóng tối sẽ không còn giam cầm linh hồn ngươi nữa.", next: 24 }
        ]
    },
    24: {
        chapter: "HẬU CHIẾN: TẾ ĐÀN HUYẾT NGUYỆT",
        bg: "assets/images/backgrounds/boss_altar.jpg",
        speaker: "Người Dẫn Chuyện",
        char: "",
        bgm: "victory",
        onEnter: () => {
            flashScreen();
            triggerShake(800);
            playSFX('annihilation');
        },
        text: `Thân thể khổng lồ của Anderson vỡ òa thành muôn vàn đốm tàn tro lấp lánh như bụi sao, tan biến hoàn toàn theo cơn gió đêm. Tiếng gầm thét ma quỷ suốt hàng thế kỷ vĩnh viễn lặng câm, chỉ còn lại sự thinh lặng đầy xót xa.\n\nBầu trời đỏ quạch dần chuyển sang sắc lam dịu của rạng đông. Làn sương độc tan biến, để lại tiếng lá xào xạc thanh bình.\n\nLộp cộp... Tiếng bước chân nhẹ như lá rơi vang lên từ phía sau lưng bạn.`,
        choices: [
            { text: "Quay đầu lại nhìn xem ai đang đến...", next: 25, primary: true },
            { text: "Tra Hắc Long Kiếm vào vỏ, hướng mắt về phía người đến...", next: 25, ninja: true }
        ]
    },
    25: {
        chapter: "HẬU CHIẾN: SỰ CÔNG NHẬN",
        bg: "assets/images/backgrounds/boss_altar.jpg",
        speaker: "Ninja Đạo",
        speakerTag: "Thủ Hộ Giả",
        char: "assets/images/characters/ninja_Dao.webp",
        charClass: "ninja-glow",
        bgm: "victory",
        text: `Ninja Đạo thong thả bước ra từ lùm trúc, tà áo đen khẽ lay động trong gió sớm. Trên khuôn mặt lạnh lùng thường thấy nay nở một nụ cười ấm áp đầy vẻ tự hào:\n\n'Làm tốt lắm, đệ tử chân truyền của ta! Cậu đã làm được điều phi thường: vượt qua nỗi sợ tột cùng, đánh bại ác quỷ Anderson và thanh tẩy Tế Đàn Huyết Nguyệt!'`,
        choices: [
            { text: "Tất cả là nhờ sự chỉ dẫn và bí thuật tuyệt luân của ngài, thưa Sư phụ Đạo!", next: 26, ninja: true },
            { text: "Anderson lúc tan biến trông thật đáng thương. Ông ấy rốt cuộc cũng đã được giải thoát.", next: 26 }
        ]
    },
    26: {
        chapter: "HẬU CHIẾN: VINH DANH CHIẾN BINH",
        bg: "assets/images/backgrounds/boss_altar.jpg",
        speaker: "Ninja Đạo",
        speakerTag: "Vinh Danh",
        char: "assets/images/characters/ninja_Dao.webp",
        charClass: "ninja-glow",
        bgm: "victory",
        text: `Ninja Đạo gật đầu tán thưởng, đặt tay lên vai bạn với ánh mắt rạng ngời niềm tin tưởng:\n\n'Một chiến binh chân chính không chỉ biết vung kiếm đoạt mạng, mà còn có một trái tim biết thấu hiểu và trắc ẩn. Cậu không chỉ cứu lấy khu rừng mà còn giải thoát cho linh hồn tội nghiệp của Anderson.\n\nThanh Hắc Long Kiếm đã tìm được vị chủ nhân xứng đáng nhất. Kể từ nay, danh hiệu ĐẠI CHIẾN BINH BÓNG TỐI chính thức thuộc về cậu!'`,
        choices: [
            { text: "TIẾP NHẬN DANH HIỆU - KHÉP LẠI HÀNH TRÌNH!", next: "ending_victory", primary: true, ninja: true }
        ]
    }
};
