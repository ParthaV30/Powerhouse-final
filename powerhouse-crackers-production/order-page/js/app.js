const coupons = {
    S77CHSM: 5
};

// Product data from Powerhouse Crackers
const productData = {
  "SPARKLERS": [
    {"name": "BOBY GOLD SPARKLERS 7CM(10pcs)", "package": "1BOX", "actualPrice": 50, "discountPrice": 20, "image": "SPARKLERS/image_5.jpg"},
    {"name": "BOBBY CRACKLINGS SPARKLERS 10CM(10PCS)", "package": "1BOX", "actualPrice": 62, "discountPrice":26 , "image": "SPARKLERS/product-featured-111.jpg"},
    {"name": "12CM 4 COLOUR SPARKLERS (10PCS)", "package": "1BOX", "actualPrice": 100, "discountPrice": 44, "image": "SPARKLERS/product-featured-295.jpg"},
    {"name": "12CM RED SPARKLERS (10PCS)", "package": "1BOX", "actualPrice": 108, "discountPrice": 48, "image": "SPARKLERS/product-featured-344.jpg"},
    {"name": "LEMON TREE SPARKLERS 15CM(10PCS)", "package": "1BOX", "actualPrice": 150, "discountPrice": 80, "image": "SPARKLERS/product-featured-122.jpg"},
    {"name": "RED SPARKLERS 15CM(10PCS)", "package": "1BOX", "actualPrice": 166, "discountPrice": 63, "image": "SPARKLERS/product-featured-119.jpg"},
    {"name": "GOLD SPARKLERS 15CM(10PCS)", "package": "1BOX", "actualPrice": 176, "discountPrice": 68, "image": "SPARKLERS/product-featured-112.jpg"},
    {"name": "GOLD SPARKLERS 30CM(5PCS)", "package": "1BOX", "actualPrice": 176, "discountPrice": 76, "image": "SPARKLERS/product-featured-114.jpg"},
    {"name": "CRACKLING SPARKLERS 15CM(10PCS)", "package": "1BOX", "actualPrice": 198, "discountPrice": 76, "image": "SPARKLERS/product-featured-113.jpg"},
    {"name": "CRACKLING SPARKLERS 30CM(5PCS)", "package": "1BOX", "actualPrice": 198, "discountPrice": 86, "image": "SPARKLERS/product-featured-115.jpg"},
    {"name": "LAVENDER SPARKLERS 15CM(10PCS)", "package": "1BOX", "actualPrice": 208, "discountPrice": 78, "image": "SPARKLERS/product-featured-123.jpg"},
    {"name": "ROBIN ELECTRIC SPARKLERS 50CM(5PCS)", "package": "1TUBE", "actualPrice": 420, "discountPrice": 210, "image": "SPARKLERS/product-featured-116.jpg"},
    {"name": "ROBIN COLOUR SPARKLERS 50CM(5PCS)", "package": "1TUBE", "actualPrice": 480, "discountPrice": 240, "image": "SPARKLERS/product-featured-117.jpg"},
    {"name": "TRI COLOUR 15CM(30PCS)", "package": "1BOX", "actualPrice": 522, "discountPrice": 261, "image": "SPARKLERS/product-featured-278.jpg"},
    {"name": "ROBIN(5IN1) COLOUR SPARKLERS 75CM(5PCS)", "package": "1TUBE", "actualPrice": 750, "discountPrice": 375, "image": "SPARKLERS/product-featured-125.jpg"}
  ],

  "FLOWERPOTS": [
    {"name": "LITTLE FLOWER (1PC)", "package": "1BOX", "actualPrice": 148, "discountPrice": 62, "image": "FLOWERPOTS/product-featured-141.jpg"},
    {"name": "THE GREAT SPLENDOUR FOUNTAIN (1PC)", "package": "1BOX", "actualPrice": 172, "discountPrice": 86, "image": "FLOWERPOTS/product-featured-135.jpg"},
    {"name": "FLOWERPOT SMALL(10PCS)", "package": "1BOX", "actualPrice": 192, "discountPrice": 86, "image": "FLOWERPOTS/product-featured-139.jpg"},
    {"name": "JET FOUNTAIN (5PCS)", "package": "1BOX", "actualPrice": 212, "discountPrice": 106, "image": "FLOWERPOTS/product-featured-126.jpg"},
    {"name": "FLOWERPOTS BIG(10PCS)", "package": "1BOX", "actualPrice": 348, "discountPrice": 130, "image": "FLOWERPOTS/product-featured-345.jpg"},
    {"name": "JET FOUNTAINS (10PCS)", "package": "1BOX", "actualPrice": 400, "discountPrice": 200, "image": "FLOWERPOTS/product-featured-127.jpg"},
    {"name": "FLOWERPOTS SPECIAL (10PCS)", "package": "1BOX", "actualPrice": 466, "discountPrice": 173, "image": "FLOWERPOTS/product-featured-137.jpg"},
    {"name": "CHEERS FOUNTAIN (3PCS)", "package": "1BOX", "actualPrice": 474, "discountPrice": 237, "image": "FLOWERPOTS/product-featured-129.jpg"},
    {"name": "FLOWERPOTS DELUXE (5PCS)", "package": "1BOX", "actualPrice": 622, "discountPrice": 285, "image": "FLOWERPOTS/product-featured-140.jpg"},
    {"name": "JEWEL POTS FOUNTAIN (5PCS)", "package": "1BOX", "actualPrice": 648, "discountPrice": 315, "image": "FLOWERPOTS/product-featured-138.jpg"},
    {"name": "JADE FLOWERS FOUNTAIN(5PCS)", "package": "1BOX", "actualPrice": 664, "discountPrice": 170, "image": "FLOWERPOTS/product-featured-136.jpg"},
    {"name": "HAPPINESS FOUNTAIN (5PCS)", "package": "1BOX", "actualPrice": 666, "discountPrice": 300, "image": "FLOWERPOTS/product-featured-143.jpg"},
    {"name": "SUNDROPS FOUNTAIN (5PCS)", "package": "1BOX", "actualPrice": 676, "discountPrice": 338, "image": "FLOWERPOTS/product-featured-144.jpg"},
    {"name": "MONEY PENNY FOUNTAIN (5PCS)", "package": "1BOX", "actualPrice": 676, "discountPrice": 338, "image": "FLOWERPOTS/product-featured-145.jpg"},
    {"name": "POPCORN FOUNTAIN (5PCS)", "package": "1BOX", "actualPrice": 748, "discountPrice": 374, "image": "FLOWERPOTS/product-featured-297.jpg"},
    {"name": "LASER SHOW FOUNTAIN (3PCS)", "package": "1BOX", "actualPrice": 862, "discountPrice": 431, "image": "FLOWERPOTS/product-featured-128.jpg"},
    {"name": "LAVENDER FOUNTAIN (3PCS)", "package": "1BOX", "actualPrice": 876, "discountPrice": 438, "image": "FLOWERPOTS/product-featured-134.jpg"},
    {"name": "FLOWERPOTS GIANT (10PCS)", "package": "1BOX", "actualPrice": 950, "discountPrice": 475, "image": "FLOWERPOTS/product-featured-281.jpg"},
    {"name": "Tricolour FOUNTAIN (5PCS)", "package": "1BOX", "actualPrice": 956, "discountPrice": 478, "image": "FLOWERPOTS/product-featured-276.jpg"},
    {"name": "CRACKLING KING FOUNTAIN (5PCS)", "package": "1BOX", "actualPrice": 1000, "discountPrice": 500, "image": "FLOWERPOTS/product-featured-133.jpg"},
    {"name": "COLOR FOUNTAINS (4PCS)", "package": "1BOX", "actualPrice": 1004, "discountPrice": 560, "image": "FLOWERPOTS/product-featured-296.jpg"},
    {"name": "TRICOLOUR MILLENNIUM (5pcs)", "package": "1BOX", "actualPrice": 1102, "discountPrice": 551, "image": "FLOWERPOTS/product-featured-304.jpg"},
  ],

  "GROUND CHAKKARS": [
    {"name": "ZAMIN CHAKKARS BIG(10PCS)", "package": "1BOX", "actualPrice": 134, "discountPrice": 67, "image": "GROUND CHAKKARS/product-featured-5.jpg"},
    {"name": "RED & WHITE CHAKKARS (10PCS)", "package": "1BOX", "actualPrice": 148, "discountPrice": 74, "image": "GROUND CHAKKARS/product-featured-152.jpg"},
    {"name": "ZAMIN CHAKKARS ASOKA (10PCS)", "package": "1BOX", "actualPrice": 224, "discountPrice": 130, "image": "GROUND CHAKKARS/product-featured-146.jpg"},
    {"name": "TWIN SPIN WHEEL (5PCS)", "package": "1BOX", "actualPrice": 234, "discountPrice": 135, "image": "GROUND CHAKKARS/product-featured-150.jpg"},
    {"name": "SCARLET SAUCER(5PCS)", "package": "1BOX", "actualPrice": 234, "discountPrice": 117, "image": "GROUND CHAKKARS/product-featured-330.jpg"},
    {"name": "ZAMIN CHAKKARS BIG(25PCS)", "package": "1BOX", "actualPrice": 306, "discountPrice": 153, "image": "GROUND CHAKKARS/product-featured-320.jpg"},
    {"name": "WHIZZ WHEEL (5PCS)", "package": "1BOX", "actualPrice": 340, "discountPrice": 185, "image": "GROUND CHAKKARS/product-featured-151.jpg"},
    {"name": "MEGA TWISTER WHEEL(5PCS)", "package": "1BOX", "actualPrice": 342, "discountPrice": 182, "image": "GROUND CHAKKARS/product-featured-149.jpg"},
    {"name": "ZAMIN CHAKKARS SPECIAL (10PCS)", "package": "1BOX", "actualPrice": 382, "discountPrice": 191, "image": "GROUND CHAKKARS/product-featured-247.jpg"},
    {"name": "SCARY SCREAM(4PCS)", "package": "1BOX", "actualPrice": 488, "discountPrice": 244, "image": "GROUND CHAKKARS/product-featured-334.jpg"},
    {"name": "ZAMIN CHAKKARS DELUXE (10PCS)", "package": "1BOX", "actualPrice": 494, "discountPrice": 247, "image": "GROUND CHAKKARS/product-featured-147.jpg"},
    {"name": "ZAMIN CHAKKARS SUPER DELUXE (10PCS)", "package": "1BOX", "actualPrice": 546, "discountPrice": 273, "image": "GROUND CHAKKARS/product-featured-148.jpg"},
    {"name": "DOLLAR WHEEL(5PCS)", "package": "1BOX", "actualPrice": 690, "discountPrice": 220, "image": "GROUND CHAKKARS/product-featured-248.jpg"},
    {"name": "POKER WHEEL (5PCS)", "package": "1BOX", "actualPrice": 692, "discountPrice": 246, "image": "GROUND CHAKKARS/product-featured-155.jpg"},
    {"name": "CUCKOO WHEEL (5PCS)", "package": "1BOX", "actualPrice": 692, "discountPrice": 246, "image": "GROUND CHAKKARS/product-featured-156.jpg"}
  ],

  "NOVEL FIREWORKS": [
    {"name": "TWINKLING STAR 45CM(10PCS)", "package": "1PKT", "actualPrice": 36, "discountPrice": 20, "image": "NOVEL FIREWORKS/product-featured-7.jpg"},
    {"name": "MAGNETIC TORCHES (10PCS)", "package": "1PKT", "actualPrice": 60, "discountPrice": 32, "image": "NOVEL FIREWORKS/product-featured-166.jpg"},
    {"name": "FIRE PENCILS (10PCS)", "package": "1PKT", "actualPrice": 84, "discountPrice": 45, "image": "NOVEL FIREWORKS/product-featured-165.jpg"},
    {"name": "SILVER TWINKLINGS 60CM(10PCS)", "package": "1PKT", "actualPrice": 84, "discountPrice": 50, "image": "NOVEL FIREWORKS/product-featured-163.jpg"},
    {"name": "MAGIC WHIP (1PC)", "package": "1PKT", "actualPrice": 84, "discountPrice": 56, "image": "NOVEL FIREWORKS/product-featured-171.jpg"},
    {"name": "MULTI COLOUR CANDLES (10PCS)", "package": "1PKT", "actualPrice": 88, "discountPrice": 60, "image": "NOVEL FIREWORKS/product-featured-167.jpg"},
    {"name": "SILVER TWINKLINGS 120CM(10PCS)", "package": "1PKT", "actualPrice": 84, "discountPrice": 65, "image": "NOVEL FIREWORKS/product-featured-164.jpg"},
    {"name": "4 COLOUR TORCHES (10PCS)", "package": "1PKT", "actualPrice": 88, "discountPrice": 55, "image": "NOVEL FIREWORKS/product-featured-168.jpg"},
    {"name": "MAGIC WAND(2PCS)", "package": "1PKT", "actualPrice": 210, "discountPrice": 130, "image": "NOVEL FIREWORKS/product-featured-169.jpg"},
    {"name": "CRACKLING CANDY(2PCS)", "package": "1PKT", "actualPrice": 140, "discountPrice": 60, "image": "NOVEL FIREWORKS/product-featured-170.jpg"}
  ],

  "SOUND CRACKERS": [
    {"name": "SPARROW6.5CM(5PCS)", "package": "1PKT", "actualPrice": 66, "discountPrice": 25, "image": "SOUND CRACKERS/product-featured-8.jpg"},
    {"name": "9CM PEACOCK (5PCS)", "package": "1PKT", "actualPrice": 80, "discountPrice": 28, "image": "SOUND CRACKERS/product-featured-172.jpg"},
    {"name": "10CM LAKSHMI (5PCS)", "package": "1PKT", "actualPrice": 89, "discountPrice": 32, "image": "SOUND CRACKERS/product-featured-173.jpg"},
    {"name": "10CM KRISHNA (5PCS)", "package": "1PKT", "actualPrice": 110, "discountPrice": 40, "image": "SOUND CRACKERS/product-featured-174.jpg"},
    {"name": "10CM HITLER (5PCS)", "package": "1PKT", "actualPrice": 140, "discountPrice": 42, "image": "SOUND CRACKERS/product-featured-175.jpg"},
    {"name": "9CM TWO SOUND (5PCS)", "package": "1PKT", "actualPrice": 88, "discountPrice": 50, "image": "SOUND CRACKERS/product-featured-176.jpg"},
    {"name": "10CM HERCULES DELUXE(5PCS)", "package": "1PKT", "actualPrice": 160, "discountPrice": 70, "image": "SOUND CRACKERS/product-featured-177.jpg"},
    {"name": "TWO SOUND GIANT (5PCS)", "package": "1PKT", "actualPrice": 168, "discountPrice": 68, "image": "SOUND CRACKERS/product-featured-178.jpg"}
  ],

  "BIJILI": [
    {"name": "BIJILI RED(50PCS)", "package": "1PKT", "actualPrice": 90, "discountPrice": 48, "image": "BIJILI/product-featured-9.jpg"},
    {"name": "GIANT BIJILI (50PCS)", "package": "1PKT", "actualPrice": 142, "discountPrice": 52, "image": "BIJILI/product-featured-327.jpg"},
    {"name": "RED BIJILI (100PCS)", "package": "1PKT", "actualPrice": 170, "discountPrice": 85, "image": "BIJILI/product-featured-180.jpg"},
    {"name": "STRIPPED BIJILI(100PCS)", "package": "1PKT", "actualPrice": 198, "discountPrice": 95, "image": "BIJILI/product-featured-298.jpg"}
  ],

 "BOMBS": [
  {"name": "BULLET BOMBS (10PCS)", "package": "1BOX", "actualPrice": 220, "discountPrice": 100, "image": "BOMBS/product-featured-10.jpg"},
  {"name": "HYDROGEN BOMBS (10PCS)", "package": "1BOX", "actualPrice": 280, "discountPrice": 120, "image": "BOMBS/product-featured-182.jpg"},
  {"name": "Fury BOMB (10PCS)", "package": "1BOX", "actualPrice": 350, "discountPrice": 140, "image": "BOMBS/product-featured-343.jpg"},
  {"name": "999 DELUX BOX(5PCS)", "package": "1BOX", "actualPrice": 200, "discountPrice": 90, "image": "BOMBS/product-featured-195.jpg"},
  {"name": "ATOM BOMBS (10PCS) SPL", "package": "1BOX", "actualPrice": 500, "discountPrice": 260, "image": "BOMBS/product-featured-181.jpg"},
  {"name": "LEO BOMBS (5PCS)", "package": "1BOX", "actualPrice": 510, "discountPrice": 95, "image": "BOMBS/product-featured-186.jpg"},
  {"name": "THUNDER BOMB (10PCS)", "package": "1BOX", "actualPrice": 630, "discountPrice": 190, "image": "BOMBS/product-featured-183.jpg"},
  {"name": "COLOUR BURST (10PCS)", "package": "1BOX", "actualPrice": 670, "discountPrice": 400, "image": "BOMBS/product-featured-185.jpg"},
  {"name": "FLOWER BOMB (GANGA JAMUNA)(5PCS)", "package": "1BOX", "actualPrice": 700, "discountPrice": 150, "image": "BOMBS/product-featured-187.jpg"},
  ],

 "REDFORT MAGIC GREEN CRACKERS (NEW TYPE FANCY)": [
  {"name": "100mm MAGIC CRACKERS", "package": "1BOX", "actualPrice": 290, "discountPrice": 120, "image": "REDFORT MAGIC/product-featured-310.jpg"},
  ],

 "ROCKETS": [
    {"name": "BABY ROCKETS(10PCS)", "package": "1BOX", "actualPrice": 196, "discountPrice": 70, "image": "ROCKETS/product-featured-13.jpg"},
    {"name": "RAINBOW ROCKETS (10PCS)", "package": "1BOX", "actualPrice": 324, "discountPrice": 100, "image": "ROCKETS/product-featured-190.jpg"},
    {"name": "BOMB ROCKET(10PCS)", "package": "1BOX", "actualPrice": 358, "discountPrice": 145, "image": "ROCKETS/product-featured-189.jpg"},
    {"name": "MUSICAL ROCKETS ((10PCS)", "package": "1BOX", "actualPrice": 566, "discountPrice": 210, "image": "ROCKETS/product-featured-192.jpg"},
    {"name": "2 SOUND ROCKET (10PCS)", "package": "1BOX", "actualPrice": 568, "discountPrice": 264, "image": "ROCKETS/product-featured-191.jpg"},
    {"name": "LUNIK ROCKETS (10PCS)", "package": "1BOX", "actualPrice": 438, "discountPrice": 230, "image": "ROCKETS/product-featured-194.jpg"}
  ],

 "COLOUR SMOKE": [
  {"name": "COLOUR FOG FOUNTAIN (5PCS)", "package": "1BOX", "actualPrice": 196, "discountPrice": 98, "image": "COLOUR SMOKE/product-featured-197.jpg"},
  {"name": "RAINBOW FOG (2PCS)", "package": "1BOX", "actualPrice": 324, "discountPrice": 162, "image": "COLOUR SMOKE/product-featured-14.jpg"},
  {"name": "LITTLE DRAGON (5PCS)", "package": "1BOX", "actualPrice": 358, "discountPrice": 179, "image": "COLOUR SMOKE/product-featured-200.jpg"},
  {"name": "OLYMPIC TORCH (1PC)", "package": "1BOX", "actualPrice": 148, "discountPrice": 283, "image": "COLOUR SMOKE/product-featured-198.jpg"},
  {"name": "VIBGYOR (1PC)", "package": "1BOX", "actualPrice": 180, "discountPrice": 284, "image": "COLOUR SMOKE/product-featured-199.jpg"},
  {"name": "RAINBOW FOG (5PCS)", "package": "1BOX", "actualPrice": 1438, "discountPrice": 590, "image": "COLOUR SMOKE/product-featured-196.jpg"}
  ],
 "PAPER/CONFETTI": [
  {"name": "MAGIC SPRAY CONFETTI (5PCS)", "package": "1BOX", "actualPrice": 196, "discountPrice": 98, "image": "PAPERCONFETTI/product-featured-202.jpg"},
  {"name": "CONFETTI(2PCS))", "package": "1BOX", "actualPrice": 324, "discountPrice": 162, "image": "PAPERCONFETTI/product-featured-15.jpg"},
  {"name": "COLOUR MAGIC 16 SHOT (1PC)", "package": "1BOX", "actualPrice": 358, "discountPrice": 179, "image": "PAPERCONFETTI/product-featured-204.jpg"},
  {"name": "HAPPY SPRAY CANNON (2PCS)", "package": "1BOX", "actualPrice": 566, "discountPrice": 283, "image": "PAPERCONFETTI/product-featured-201.jpg"},
  {"name": "VALENTINE'S DAY 16 SHOT(1PC)", "package": "1BOX", "actualPrice": 568, "discountPrice": 284, "image": "PAPERCONFETTI/product-featured-203.jpg"}
  ],

"FANCY FIREWORKS": [
  {"name": "ELECTRIC STONES (10PCS)", "package": "1BOX", "actualPrice": 104, "discountPrice": 30, "image": "FANCY FIREWORKS/product-featured-16.jpg"},
  {"name": "FATBOY (1PC)", "package": "1BOX", "actualPrice": 148, "discountPrice": 74, "image": "FANCY FIREWORKS/product-featured-206.jpg"},
  {"name": "ASSORTED CARTOONS (10PCS)", "package": "1BOX", "actualPrice": 224, "discountPrice": 140, "image": "FANCY FIREWORKS/product-featured-205.jpg"},
  {"name": "DISCO FLASH (6PCS)", "package": "1BOX", "actualPrice": 234, "discountPrice": 150, "image": "FANCY FIREWORKS/product-featured-208.jpg"},
  {"name": "ARIEAL FANCY OUT(10PCS)", "package": "1BOX", "actualPrice": 234, "discountPrice":70, "image": "FANCY FIREWORKS/product-featured-211.jpg"},
  {"name": "COLOUR CHANGING BUTTERFLY (5PCS)", "package": "1BOX", "actualPrice": 306, "discountPrice": 153, "image": "FANCY FIREWORKS/product-featured-212.jpg"},
  {"name": "JUMPING FROG (6PCS)", "package": "1BOX", "actualPrice": 340, "discountPrice": 170, "image": "FANCY FIREWORKS/product-featured-210.jpg"},
  {"name": "FLOWER RAIN(2PCS)", "package": "1BOX", "actualPrice": 440, "discountPrice": 220, "image": "FANCY FIREWORKS/product-featured-240.jpg"},
  {"name": "PEP (2PC)", "package": "1BOX", "actualPrice": 382, "discountPrice": 130, "image": "FANCY FIREWORKS/product-featured-214.jpg"},
  {"name": "OLD IS GOLD COLOR PAPER BLAST(1PC)", "package": "1BOX", "actualPrice": 488, "discountPrice": 244, "image": "FANCY FIREWORKS/product-featured-215.jpg"},
  {"name": "CLUSTER BLASTER (1PC)", "package": "1BOX", "actualPrice": 494, "discountPrice": 247, "image": "FANCY FIREWORKS/product-featured-216.jpg"},
  {"name": "GOLDEN WHISTLE SMALL (5PCS)", "package": "1BOX", "actualPrice": 546, "discountPrice": 273, "image": "FANCY FIREWORKS/product-featured-219.jpg"},
  {"name": "MINE OF SHOTS (5PCS)", "package": "1BOX", "actualPrice": 690, "discountPrice": 345, "image": "FANCY FIREWORKS/product-featured-217.jpg"},
  {"name": "MINE OF STARS (10PCS)", "package": "1BOX", "actualPrice": 692, "discountPrice": 346, "image": "FANCY FIREWORKS/product-featured-218.jpg"},
  {"name": "SEVEN SHOTS (5PCS)", "package": "1BOX", "actualPrice": 692, "discountPrice": 346, "image": "FANCY FIREWORKS/product-featured-228.jpg"},
  {"name": "COLOUR CHANGING BUTTERFLY (10PCS)", "package": "1BOX", "actualPrice": 400, "discountPrice": 198, "image": "FANCY FIREWORKS/product-featured-213.jpg"},
  {"name": "FIVE STAR (5PCS)", "package": "1BOX", "actualPrice": 148, "discountPrice": 74, "image": "FANCY FIREWORKS/product-featured-244.jpg"},
  {"name": "DIAMOND MINE (5PCS)", "package": "1BOX", "actualPrice": 224, "discountPrice": 112, "image": "FANCY FIREWORKS/product-featured-243.jpg"},
  {"name": "ROMAN CANDLES 6BALLS (2PCS)", "package": "1BOX", "actualPrice": 234, "discountPrice": 117, "image": "FANCY FIREWORKS/product-featured-223.jpg"},
  {"name": "TV TOWER (1PC)", "package": "1BOX", "actualPrice": 234, "discountPrice": 117, "image": "FANCY FIREWORKS/product-featured-222.jpg"},
  {"name": "YAHOO (1PC)", "package": "1BOX", "actualPrice": 306, "discountPrice": 153, "image": "FANCY FIREWORKS/product-featured-225.jpg"},
  {"name": "METEOR (5PCS)", "package": "1BOX", "actualPrice": 340, "discountPrice": 170, "image": "FANCY FIREWORKS/product-featured-301.jpg"},
  {"name": "RAINBOW RAIN BARAGE (1PC)", "package": "1BOX", "actualPrice": 342, "discountPrice": 171, "image": "FANCY FIREWORKS/product-featured-239.jpg"},
  {"name": "JILL JUNK JUK (3PCS)", "package": "1BOX", "actualPrice": 382, "discountPrice": 191, "image": "FANCY FIREWORKS/product-featured-242.jpg"},
  {"name": "MATRIX FIRE CRACKERS (2PCS)", "package": "1BOX", "actualPrice": 488, "discountPrice": 244, "image": "FANCY FIREWORKS/product-featured-236.jpg"},
  {"name": "WISE SIREN (1PC)", "package": "1BOX", "actualPrice": 494, "discountPrice": 247, "image": "FANCY FIREWORKS/product-featured-226.jpg"},
  {"name": "SWASTIK WHEEL (5PCS)", "package": "1BOX", "actualPrice": 546, "discountPrice": 273, "image": "FANCY FIREWORKS/product-featured-153.jpg"},
  {"name": "GOLD RUSH (5PCS)", "package": "1BOX", "actualPrice": 690, "discountPrice": 345, "image": "FANCY FIREWORKS/product-featured-227.jpg"},
  {"name": "AERIAL OUTS (5PCS)", "package": "1BOX", "actualPrice": 692, "discountPrice": 346, "image": "FANCY FIREWORKS/product-featured-302.jpg"},
  {"name": "TREASURE BOX (5PCS)", "package": "1BOX", "actualPrice": 692, "discountPrice": 346, "image": "FANCY FIREWORKS/product-featured-303.jpg"},
  {"name": "GOLDEN WHISTLE GIANT (2PCS)", "package": "1BOX", "actualPrice": 380, "discountPrice": 140, "image": "FANCY FIREWORKS/product-featured-221.jpg"},
  {"name": "GOLDEN DROPS (5PCS)", "package": "1BOX", "actualPrice": 148, "discountPrice": 74, "image": "FANCY FIREWORKS/product-featured-300.jpg"},
  {"name": "HAPPY BIRTHDAY (1PC)", "package": "1BOX", "actualPrice": 224, "discountPrice": 112, "image": "FANCY FIREWORKS/product-featured-234.jpg"},
  {"name": "KRAK JACK (3PCS)", "package": "1BOX", "actualPrice": 234, "discountPrice": 117, "image": "FANCY FIREWORKS/product-featured-241.jpg"},
  {"name": "MAGIC TREE (2PCS)", "package": "1BOX", "actualPrice": 234, "discountPrice": 117, "image": "FANCY FIREWORKS/product-featured-230.jpg"},
  {"name": "FLYING BALLOON (1PC)", "package": "1BOX", "actualPrice": 306, "discountPrice": 153, "image": "FANCY FIREWORKS/product-featured-232.jpg"},
  {"name": "MULTI COLOR FALLS (1PCS)", "package": "1BOX", "actualPrice": 1700, "discountPrice": 900, "image": "FANCY FIREWORKS/product-featured-231.jpg"}
  ],

  "COMETS/COLORFULL FOUNTAINS": [
  {"name": "PEACOCK FEATHER-MAGICAL(1PCS)", "package": "1BOX", "actualPrice": 600, "discountPrice": 300, "image": "COMETSPIPE SKY SHOT/product-featured-105.jpg"},
  {"name": "2 IN 1 FLOWER POT (10PCS)", "package": "1BOX", "actualPrice": 1100, "discountPrice": 530, "image": "COMETSPIPE SKY SHOT/product-featured-106.jpg"},
  {"name": "3 WONDERS (3 IN 1)FOUNTAIN(1PCS)", "package": "1BOX", "actualPrice":550, "discountPrice": 265, "image": "COMETSPIPE SKY SHOT/product-featured-335.jpg"},
  {"name": "4 SQUARE (4 IN 1) FOUNTAIN(1BOX)", "package": "1BOX", "actualPrice": 620, "discountPrice": 310, "image": "COMETSPIPE SKY SHOT/product-featured-107.jpg"},
  {"name": "6 INCH WATER QUEEN FOUNTAIN(1PCS)", "package": "1BOX", "actualPrice": 400, "discountPrice": 200, "image": "COMETSPIPE SKY SHOT/product-featured-336.jpg"},
  {"name": " ANGRY BIRD PANDAV FOUNTAIN(5PCS)", "package": "1BOX", "actualPrice": 400, "discountPrice": 200, "image": "COMETSPIPE SKY SHOT/product-featured-17.jpg"},
  {"name": "CANDY CRUSH 5-COLORS(5PCS)", "package": "1BOX", "actualPrice": 580, "discountPrice": 280, "image": "COMETSPIPE SKY SHOT/product-featured-349.jpg"},
  {"name": "MAGIC MELODY -5 IN1(5PCS)", "package": "1BOX", "actualPrice": 420, "discountPrice": 210, "image": "COMETSPIPE SKY SHOT/product-featured-108.jpg"},
  {"name": "MAGIC SPRING FOUNTAIN (6PCS)", "package": "1BOX", "actualPrice": 1600, "discountPrice": 740, "image": "COMETSPIPE SKY SHOT/product-featured-109.jpg"},
  {"name": "7G FOUNTAIN -MEGA", "package": "1BOX", "actualPrice": 2000, "discountPrice": 1000, "image": "COMETSPIPE SKY SHOT/product-featured-104.jpg"}
],

 "MULTICOLOUR 12 SHOTS (5 VARIANTS)": [
  {"name": "12 SHOTS FLIPPER", "package": "1BOX", "actualPrice": 500, "discountPrice": 250, "image": "MULTICOLOUR 12 SHOTS/product-featured-18.jpg"},
  {"name": "12 SHOTS CRACKLING RYDER", "package": "1BOX", "actualPrice": 512, "discountPrice": 275, "image": "MULTICOLOUR 12 SHOTS/product-featured-51.jpg"},
  {"name": "NEXUS","package": "1BOX", "actualPrice": 512, "discountPrice": 283, "image": "MULTICOLOUR 12 SHOTS/product-featured-52.jpg"},
  {"name": "HUNTER MULTI COLOR", "package": "1BOX", "actualPrice": 626, "discountPrice": 310, "image": "MULTICOLOUR 12 SHOTS/product-featured-53.jpg"},
  ],

 "MULTICOLOUR 20 SHOTS (4 VARIANTS)": [
  {"name": "20 SHOTS KISMET", "package": "1BOX", "actualPrice": 196, "discountPrice": 98, "image": "MULTICOLOUR 20 SHOTS/product-featured-19.jpg"},
  {"name": "20 SHOTS MIGHTY M", "package": "1BOX", "actualPrice": 324, "discountPrice": 162, "image": "MULTICOLOUR 20 SHOTS/product-featured-23.jpg"},
  {"name": "20 SHOTS PICK N SHOOT", "package": "1BOX", "actualPrice": 566, "discountPrice": 283, "image": "MULTICOLOUR 20 SHOTS/product-featured-24.jpg"},
  {"name": "20 SHOTS SHAKEY", "package": "1BOX", "actualPrice": 568, "discountPrice": 284, "image": "MULTICOLOUR 20 SHOTS/product-featured-25.jpg"}
  ],

 "MULTICOLOUR 25 SHOTS (3 VARIANTS)": [
  {"name": "25 SHOTS ROVER", "package": "1BOX", "actualPrice": 970, "discountPrice": 512, "image": "MULTICOLOUR 25 SHOTS/product-featured-22.jpg"},
  {"name": "25 SHOTS RMS", "package": "1BOX", "actualPrice": 1045, "discountPrice": 530, "image": "MULTICOLOUR 25 SHOTS/product-featured-27.jpg"},
  {"name": "25 SHOTS ROV", "package": "1BOX", "actualPrice": 1190, "discountPrice": 550, "image": "MULTICOLOUR 25 SHOTS/product-featured-28.jpg"}
  ],

 "MULTICOLOUR 30 SHOTS (3 VARIANTS)": [
  {"name": "30 SHOTS KISMET", "package": "1BOX", "actualPrice": 970, "discountPrice": 612, "image": "MULTICOLOUR 30 SHOTS/product-featured-29.jpg"},
  {"name": "30 SHOTS MIGHTY M", "package": "1BOX", "actualPrice": 1085, "discountPrice": 660, "image": "MULTICOLOUR 30 SHOTS/product-featured-30.jpg"},
  {"name": "30 SHOTS SHAKEY", "package": "1BOX", "actualPrice": 1245, "discountPrice": 670, "image": "MULTICOLOUR 30 SHOTS/product-featured-31.jpg"}
  ],


 "MULTICOLOUR 60 SHOTS (4 VARIANTS)": [
  {"name": "60 SHOTS CLIPPER", "package": "1BOX", "actualPrice": 2100, "discountPrice": 1150, "image": "MULTICOLOUR 60 SHOTS/product-featured-37.jpg"},
  {"name": "60 SHOTS CLIPPER", "package": "1BOX", "actualPrice": 2250, "discountPrice": 1200, "image": "MULTICOLOUR 60 SHOTS/product-featured-38.jpg"},
  {"name": "60 SHOTS PACKABOT", "package": "1BOX", "actualPrice": 2200, "discountPrice": 1050, "image": "MULTICOLOUR 60 SHOTS/product-featured-39.jpg"},
  {"name": "60 SHOTS TRILO", "package": "1BOX", "actualPrice": 2150, "discountPrice": 1150, "image": "MULTICOLOUR 60 SHOTS/product-featured-40.jpg"}
 ],
 
 "MULTICOLOUR 80 SHOTS (2 VARIANTS)": [
  {"name": "80 SHOTS CYBORG", "package": "1BOX", "actualPrice":3100, "discountPrice":1500, "image": "MULTICOLOUR 80 SHOTS/product-featured-41.jpg"},
  {"name": "80 SHOTS ROBBY", "package": "1BOX", "actualPrice": 3100, "discountPrice": 1700, "image": "MULTICOLOUR 80 SHOTS/product-featured-42.jpg"},
 ],
 
 "MULTICOLOUR 100 SHOTS (5 VARIANTS)": [
     {"name": "100 SHOTS SPEED METRO", "package": "1BOX", "actualPrice": 3700, "discountPrice": 1900, "image": "MULTICOLOUR 100 SHOTS/product-featured-43.jpg"},
     {"name": "100 SHOTS SPEED BULLET TRACK", "package": "1BOX", "actualPrice": 3780, "discountPrice": 1920, "image": "MULTICOLOUR 100 SHOTS/product-featured-44.jpg"},
     {"name": "100 SHOTS EAT R", "package": "1BOX", "actualPrice": 3800, "discountPrice": 1930, "image": "MULTICOLOUR 100 SHOTS/product-featured-45.jpg"},
     {"name": "100 SHOTS MATRIX", "package": "1BOX", "actualPrice": 3850, "discountPrice": 1940, "image": "MULTICOLOUR 100 SHOTS/product-featured-46.jpg"},
     {"name": "100 SHOTS ROBOBEE", "package": "1BOX", "actualPrice": 3900, "discountPrice": 1950, "image": "MULTICOLOUR 100 SHOTS/product-featured-47.jpg"}
  ],

 "MULTICOLOUR 120 SHOTS (3 VARIANTS)": [
  {"name": "120 SHOTS RIX", "package": "1BOX", "actualPrice": 4100, "discountPrice": 2300, "image": "MULTICOLOUR 120 SHOTS/product-featured-48.jpg"},
  {"name": "120 SHOTS SAFFIRE", "package": "1BOX", "actualPrice": 4150, "discountPrice": 2300, "image": "MULTICOLOUR 120 SHOTS/product-featured-49.jpg"},
  {"name": "120 SHOTS MEET SPOT", "package": "1BOX", "actualPrice": 4200, "discountPrice": 2300, "image": "MULTICOLOUR 120 SHOTS/product-featured-50.jpg"}
  ],

 "MULTICOLOUR 240 SHOTS": [
  {"name": "240 SHOTS RAINBOW DANCE", "package": "1BOX", "actualPrice": 6500, "discountPrice": 3800, "image": "MULTICOLOUR 240 SHOTS/product-featured-21.jpg"},
  ],

 "GROUND FANCY COLLECTION": [
  {"name": "GRAPE GARDEN 12", "package": "1BOX", "actualPrice": 148, "discountPrice": 74, "image": "0.75 MEGA CAKES/product-featured-331.jpg"},
  {"name": "ROSE GARDEN 12", "package": "1BOX", "actualPrice": 172, "discountPrice": 86, "image": "0.75 MEGA CAKES/product-featured-332.jpg"},
  {"name": "MUSIC PARTY 12", "package": "1BOX", "actualPrice": 192, "discountPrice": 96, "image": "0.75 MEGA CAKES/product-featured-333.jpg"},
  {"name": "BLUE SKY 56", "package": "1BOX", "actualPrice": 212, "discountPrice": 106, "image": "0.75 MEGA CAKES/product-featured-20.jpg"},
  {"name": "TWIST & TURN 56", "package": "1BOX", "actualPrice": 348, "discountPrice": 174, "image": "0.75 MEGA CAKES/product-featured-57.jpg"},
  {"name": "7 WONDERS 56", "package": "1BOX", "actualPrice": 400, "discountPrice": 200, "image": "0.75 MEGA CAKES/product-featured-58.jpg"},
  {"name": "ELECTRONIC BOMBS 56", "package": "1BOX", "actualPrice": 466, "discountPrice": 233, "image": "0.75 MEGA CAKES/product-featured-56.jpg"},
  {"name": "BLUE THUNDER 56", "package": "1BOX", "actualPrice": 474, "discountPrice": 237, "image": "0.75 MEGA CAKES/product-featured-59.jpg"},
  {"name": "WAR ZONE 56", "package": "1BOX", "actualPrice": 622, "discountPrice": 311, "image": "0.75 MEGA CAKES/product-featured-60.jpg"},
  {"name": "PARROTS PRATTLE 56", "package": "1BOX", "actualPrice": 648, "discountPrice": 324, "image": "0.75 MEGA CAKES/product-featured-337.jpg"},
  {"name": "SUNFLOWER 100", "package": "1BOX", "actualPrice": 664, "discountPrice": 332, "image": "0.75 MEGA CAKES/product-featured-305.jpg"},
  {"name": "SINGING BIRDS 100", "package": "1BOX", "actualPrice": 666, "discountPrice": 333, "image": "0.75 MEGA CAKES/product-featured-65.jpg"},
  {"name": "BREAK DANCE 100", "package": "1BOX", "actualPrice": 676, "discountPrice": 338, "image": "0.75 MEGA CAKES/product-featured-61.jpg"},
  {"name": "A K 47 100", "package": "1BOX", "actualPrice": 676, "discountPrice": 338, "image": "0.75 MEGA CAKES/product-featured-62.jpg"},
  {"name": "RED ROSES 125", "package": "1BOX", "actualPrice": 748, "discountPrice": 374, "image": "0.75 MEGA CAKES/product-featured-338.jpg"},
  {"name": "RAIN & THUNDER 125", "package": "1BOX", "actualPrice": 862, "discountPrice": 431, "image": "0.75 MEGA CAKES/product-featured-66.jpg"},
  {"name": "OOH!LA!LA 125", "package": "1BOX", "actualPrice": 876, "discountPrice": 438, "image": "0.75 MEGA CAKES/product-featured-67.jpg"},
  {"name": "SILVER DROPS 125", "package": "1BOX", "actualPrice": 950, "discountPrice": 475, "image": "0.75 MEGA CAKES/product-featured-311.jpg"},
  {"name": "SPEED 200", "package": "1BOX", "actualPrice": 956, "discountPrice": 478, "image": "0.75 MEGA CAKES/product-featured-68.jpg"},
  {"name": "PARADISE 250", "package": "1BOX", "actualPrice": 1000, "discountPrice": 500, "image": "0.75 MEGA CAKES/product-featured-69.jpg"},
  {"name": "OH! KOLKATA 500", "package": "1BOX", "actualPrice": 1004, "discountPrice": 502, "image": "0.75 MEGA CAKES/product-featured-70.jpg"},
  {"name": "PANORAMA 500", "package": "1BOX", "actualPrice": 1102, "discountPrice": 551, "image": "0.75 MEGA CAKES/product-featured-71.jpg"}
  ],

 "1.25 MEGA CAKES": [
  {"name": "SOUND OF RAIN", "package": "1BOX", "actualPrice": 150, "discountPrice": 70, "image": "1.25 MEGA CAKES/product-featured-321.jpg"},
  {"name": "COLOR SMOKE", "package": "1BOX", "actualPrice": 820, "discountPrice": 430, "image": "1.25 MEGA CAKES/product-featured-322.jpg"},
  {"name": "SIVAKASI SPECIAL", "package": "1BOX", "actualPrice": 400, "discountPrice": 150, "image": "1.25 MEGA CAKES/product-featured-323.jpg"},
  {"name": "SIREN SHOWER", "package": "2 PCS", "actualPrice": 460, "discountPrice": 230, "image": "1.25 MEGA CAKES/product-featured-324.jpg"},
  {"name": "FANCY FLASH", "package": "1BOX", "actualPrice": 450, "discountPrice": 200, "image": "1.25 MEGA CAKES/product-featured-325.jpg"},
  {"name": "MONEY VAULT", "package": "1BOX", "actualPrice": 130, "discountPrice": 60, "image": "1.25 MEGA CAKES/product-featured-340.jpg"},
  {"name": "DORA NIGHT", "package": "1BOX", "actualPrice": 250, "discountPrice": 125, "image": "1.25 MEGA CAKES/product-featured-314.jpg"},
  {"name": "HOLO AMIGO", "package": "2 PCS", "actualPrice": 150, "discountPrice": 80, "image": "1.25 MEGA CAKES/product-featured-72.jpg"},
  {"name": "HOLY COLOR SMOKE STICK", "package": "1BOX", "actualPrice":200, "discountPrice": 60, "image": "1.25 MEGA CAKES/product-featured-313.jpg"},
  {"name": "PARTY CRUSH", "package": "1BOX", "actualPrice": 160, "discountPrice": 55, "image": "1.25 MEGA CAKES/product-featured-73.jpg"},
  {"name": "HELICOPTER", "package": "1BOX", "actualPrice": 350, "discountPrice": 190, "image": "1.25 MEGA CAKES/product-featured-74.jpg"}
],

"0.75 PREMIUM CAKES": [
  {"name": "FIG 100", "package": "1BOX", "actualPrice": 196, "discountPrice": 98, "image": "0.75 PREMIUM CAKES/product-featured-316.jpg"},
  {"name": "MIDDLE MIST 100", "package": "1BOX", "actualPrice": 324, "discountPrice": 162, "image": "0.75 PREMIUM CAKES/product-featured-317.jpg"},
  {"name": "BUTTER CUP 100", "package": "1BOX", "actualPrice": 568, "discountPrice": 284, "image": "0.75 PREMIUM CAKES/product-featured-319.jpg  "}
  ],
  
  "GIFT BOXES": [
    {"name": "PRIZE 20 GIFTBOX", "package": "1BOX", "actualPrice": 1180, "discountPrice": 590, "image": "GIFT BOXES/product-featured-75.jpg"},
    {"name": "GOD'S GIFT 25 GIFTBOX", "package": "1BOX", "actualPrice": 1580, "discountPrice": 790, "image": "GIFT BOXES/product-featured-76.jpg"},
    {"name": "SUPER 28 GIFTBOX", "package": "1BOX", "actualPrice": 1700, "discountPrice": 850, "image": "GIFT BOXES/product-featured-81.jpg"},
    {"name": "GREAT 31 GIFTBOX", "package": "1BOX", "actualPrice": 2100, "discountPrice": 950, "image": "GIFT BOXES/product-featured-83.jpg"},
    {"name": "WONDERFUL 34 GIFTBOX", "package": "1BOX", "actualPrice": 2500, "discountPrice": 1100, "image": "GIFT BOXES/product-featured-84.jpg"},
    {"name": "FANTASTIC 37 GIFTBOX", "package": "1BOX", "actualPrice": 2860, "discountPrice": 1220, "image": "GIFT BOXES/product-featured-85.jpg"},
    {"name": "KHUSHI 42 GIFTBOX", "package": "1BOX", "actualPrice": 3480, "discountPrice": 1400, "image": "GIFT BOXES/product-featured-89.jpg"},
    {"name": "JUBILEE 46 GIFTBOX", "package": "1BOX", "actualPrice": 3760, "discountPrice": 1650, "image": "GIFT BOXES/product-featured-92.jpg"},
    {"name": "TITAN 55 GIFTBOX", "package": "1BOX", "actualPrice": 5150, "discountPrice": 1900, "image": "GIFT BOXES/product-featured-94.jpg"},
    {"name": "NEW COUPLE PACK SPECIAL VIP-70", "package": "1BOX", "actualPrice": 5600, "discountPrice": 3400, "image": "GIFT BOXES/product-featured-95.jpg"}
],
"ROBIN MATCHES": [
  {"name": "CONE 3 IN 1 MATCHBOX", "package": "1BOX", "actualPrice": 300, "discountPrice": 120, "image": "ROBIN MATCHES/product-featured-96.jpg"},
  {"name": "KING 6 IN 1 MATCHBOX", "package": "1BOX", "actualPrice": 320, "discountPrice": 140, "image": "ROBIN MATCHES/product-featured-97.jpg"},
  {"name": "SUPER DELUXE 10 IN 1 MATCHBOX", "package": "1BOX", "actualPrice": 320, "discountPrice": 140, "image": "ROBIN MATCHES/product-featured-98.jpg"},
  {"name": "CLASSIC 5 IN 1 MATCHBOX", "package": "1BOX", "actualPrice": 320, "discountPrice": 140, "image": "ROBIN MATCHES/product-featured-99.jpg"},
  {"name": "7UP RAINBOW MATCHBOX", "package": "1BOX", "actualPrice": 400, "discountPrice": 160, "image": "ROBIN MATCHES/product-featured-100.jpg"},
  {"name": "VIP 10 in 1 MATCHBOX", "package": "1BOX", "actualPrice": 410, "discountPrice": 150, "image": "ROBIN MATCHES/product-featured-101.jpg"}
],

"ROLL CAPS": [
    {"name": "ROLL CAP STANDARD", "package": "1BOX", "actualPrice": 568, "discountPrice": 284, "image": "ROLL CAPS/product-featured-55.jpg"}
],

 "RINGCAPS": [
     {"name": "AYYAN RINGCAP (12PCS)D", "package": "1BOX", "actualPrice": 568, "discountPrice": 284, "image": "RINGCAPS/product-featured-102.jpg"},
     {"name": "AYYAN RINGCAP FULL BOX(100PCS)", "package": "1BOX", "actualPrice": 568, "discountPrice": 284, "image": "RINGCAPS/product-featured-103.jpg"}
    ],
    
    "RINGCAP GUN (EAGLE BRAND)": [
        {"name": "RINGCAP METEAL GUN (ZIPPY)", "package": "1BOX", "actualPrice": 568, "discountPrice": 284, "image": "RINGCAP GUN (EAGLE BRAND)/product-featured-346.jpg"}
    ],
    
    "SERPHENT EGG": [
        {"name": "BLACK SERPHENT BIG", "package": "1BOX", "actualPrice": 568, "discountPrice": 150, "image": "SERPHENT EGG/product-featured-246.jpg"},
        {"name": "ANACONDA EGG", "package": "1BOX", "actualPrice": 568, "discountPrice": 150, "image": "SERPHENT EGG/product-featured-351.jpg"}
    ],
    
    "EAGLE ROLLCAP GUN": [
  {"name": "TOM COLOUR GUN", "package": "1BOX", "actualPrice": 150, "discountPrice": 50, "image": "EAGLE ROLLCAP GUN/product-featured-268.jpg"},
  {"name": "JICK BLACK GUN", "package": "1BOX", "actualPrice": 150, "discountPrice": 55, "image": "EAGLE ROLLCAP GUN/product-featured-271.jpg"},
  {"name": "HAWAK GUN", "package": "1BOX", "actualPrice": 150, "discountPrice": 50, "image": "EAGLE ROLLCAP GUN/product-featured-269.jpg"},
  {"name": "JERRY GUN", "package": "1BOX", "actualPrice": 150, "discountPrice": 50, "image": "EAGLE ROLLCAP GUN/product-featured-273.jpg"},
  {"name": "TYSON GUN", "package": "1BOX", "actualPrice": 150, "discountPrice": 40, "image": "EAGLE ROLLCAP GUN/product-featured-270.jpg"},
  {"name": "BHOOT GUN", "package": "1BOX", "actualPrice": 150, "discountPrice": 55, "image": "EAGLE ROLLCAP GUN/product-featured-274.jpg"},
  {"name": "THUNDER GUN", "package": "1BOX", "actualPrice": 150, "discountPrice": 55, "image": "EAGLE ROLLCAP GUN/product-featured-272.jpg"}
    ],
    
    "EAGLE RINGCAP GUN": [
   {"name": "EXCELL 2 GUN", "package": "1BOX", "actualPrice": 150, "discountPrice": 50, "image": "EAGLE RINGCAP GUN/product-featured-265.jpg"},
  {"name": "EXCELL 2 COLOUR GUN", "package": "1BOX", "actualPrice": 150, "discountPrice": 60, "image": "EAGLE RINGCAP GUN/product-featured-262.jpg"},
  {"name": "EXCELL 5 GUN", "package": "1BOX", "actualPrice": 150, "discountPrice": 50, "image": "EAGLE RINGCAP GUN/product-featured-264.jpg"},
  {"name": "EXCELL 4 COLOUR GUN", "package": "1BOX", "actualPrice": 150, "discountPrice": 55, "image": "EAGLE RINGCAP GUN/product-featured-263.jpg"},
  {"name": "EXCELL 12 COLOUR GUN", "package": "1BOX", "actualPrice": 150, "discountPrice": 50, "image": "EAGLE RINGCAP GUN/product-featured-261.jpg"},
  {"name": "EXCELL 7 COLOR GUN", "package": "1BOX", "actualPrice": 150, "discountPrice": 40, "image": "EAGLE RINGCAP GUN/product-featured-254.jpg"},
  {"name": "EXCELL 9 SMALL GUN", "package": "1BOX", "actualPrice": 150, "discountPrice": 60, "image": "EAGLE RINGCAP GUN/product-featured-253.jpg"}
    ],

    "EAGLE 2IN1 (ROLL&RING) GUN": [
        {"name": "EXCELL 11 COLOUR GUN", "package": "1BOX", "actualPrice": 568, "discountPrice": 170, "image": "EAGLE 2IN1 (ROLL&RING) GUN/product-featured-252.jpg"}
    ],
    
    "LIGHTER STICK": [
        {"name": "LIGHTER BLACK STICK (2PCS)", "package": "1BOX", "actualPrice": 60, "discountPrice": 12, "image": "LIGHTER STICK/product-featured-275.jpg"},
        {"name": "POPPOP(5BOX)", "package": "1BOX", "actualPrice": 100, "discountPrice": 50, "image": "LIGHTER STICK/product-featured-350.jpg"}
    ],
    
    "PAPER BOMB-ALKR": [
  {"name": "ALKR-1/4KG PAPER BOMB", "package": "1BOX", "actualPrice": 196, "discountPrice": 98, "image": "PAPER BOMB-ALKR/product-featured-280.jpg"},
  {"name": "ALKR 1/2KG PAPER BOMB", "package": "1BOX", "actualPrice": 324, "discountPrice": 162, "image": "PAPER BOMB-ALKR/product-featured-285.jpg"},
  {"name": "ALKR-1KG PAPER BOMB", "package": "1BOX", "actualPrice": 568, "discountPrice": 284, "image": "PAPER BOMB-ALKR/product-featured-279.jpg"}
    ],
    
    "CELEBRATION CRACKERS (REGULAR)": [
  {"name": "28 GAINT", "package": "1BUNDLE", "actualPrice": 1180, "discountPrice": 230, "image": "CELEBRATION CRACKERS/product-featured-289.jpg"},
  {"name": "56 GAINT", "package": "1BUNDLE", "actualPrice": 1580, "discountPrice": 450, "image": "CELEBRATION CRACKERS/product-featured-290.jpg"},
  {"name": "100(0.1K)", "package": "1BUNDLE", "actualPrice": 1700, "discountPrice": 500, "image": "CELEBRATION CRACKERS/product-featured-342.jpg"},
  {"name": "24 DELUX", "package": "1BUNDLE", "actualPrice": 2100, "discountPrice": 550, "image": "CELEBRATION CRACKERS/product-featured-328.jpg"},
  {"name": "50 DELUX", "package": "1BUNDLE", "actualPrice": 2500, "discountPrice": 600, "image": "CELEBRATION CRACKERS/product-featured-329.jpg"},
  {"name": "100 DELUX", "package": "1BUNDLE", "actualPrice": 2860, "discountPrice": 710, "image": "CELEBRATION CRACKERS/product-featured-341.jpg"},
  {"name": "1000(1K)", "package": "1BUNDLE", "actualPrice": 3480, "discountPrice": 390, "image": "CELEBRATION CRACKERS/product-featured-292.jpg"},
  {"name": "2000(2K)", "package": "1BUNDLE", "actualPrice": 3760, "discountPrice": 570, "image": "CELEBRATION CRACKERS/product-featured-294.jpg"},
  {"name": "5000(5K)", "package": "1BUNDLE", "actualPrice": 5150, "discountPrice": 2575, "image": "CELEBRATION CRACKERS/product-featured-291.jpg"},
  {"name": "10000(10K)", "package": "1BUNDLE", "actualPrice": 9180, "discountPrice": 4590, "image": "CELEBRATION CRACKERS/product-featured-293.jpg"}
  ],

};

// Global variables
let cart = [];
let currentProducts = [];
let currentCategory = 'all';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadProducts();
    setupEventListeners();
    updateCartDisplay();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }

    // Category filtering
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            selectCategory(category);
        });
    });

    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }

    // Cart functionality
    const cartBtn = document.getElementById('cartBtn');
    const cartClose = document.getElementById('cartClose');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    
    if (cartBtn) cartBtn.addEventListener('click', toggleCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckout);
    if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);

    // Modal functionality
    const modalClose = document.getElementById('modalClose');
    const overlay = document.getElementById('overlay');
    
    if (modalClose) modalClose.addEventListener('click', closeCheckout);
    if (overlay) overlay.addEventListener('click', closeCheckout);

    // Form submission
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleOrder);
    }

    // ESC key to close modal - Fixed implementation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
            const modal = document.getElementById('checkoutModal');
            if (modal && !modal.classList.contains('hidden')) {
                closeCheckout();
                console.log('Modal closed with Escape key'); // Debug log
            }
        }
    });

    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartBtn = document.getElementById('cartBtn');
        
        if (cartSidebar && cartBtn && !cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) {
            closeCart();
        }
    });
}

// Load products into the grid
function loadProducts(category = 'all', searchTerm = '') {
    const productsGrid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    const sectionTitle = document.getElementById('sectionTitle');
    
    if (!productsGrid || !noResults || !sectionTitle) return;
    
    currentProducts = [];
    
    // Collect products based on category
    if (category === 'all') {
        Object.keys(productData).forEach(cat => {
            productData[cat].forEach(product => {
                currentProducts.push({...product, category: cat});
            });
        });
        sectionTitle.textContent = 'All Products';
    } else {
        if (productData[category]) {
            productData[category].forEach(product => {
                currentProducts.push({...product, category: category});
            });
        }
        sectionTitle.textContent = category;
    }

    // Filter by search term - Fixed search logic
    if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase().trim();
        currentProducts = currentProducts.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(searchTermLower);
            const categoryMatch = product.category.toLowerCase().includes(searchTermLower);
            const packageMatch = product.package && product.package.toLowerCase().includes(searchTermLower);
            return nameMatch || categoryMatch || packageMatch;
        });
    }

    // Display products or no results message
    if (currentProducts.length === 0) {
        productsGrid.style.display = 'none';
        noResults.style.display = 'block';
    } else {
        productsGrid.style.display = 'grid';
        noResults.style.display = 'none';
        renderProducts();
    }
}

// Render products in the grid
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = currentProducts.map((product, index) => {
        const savings = product.actualPrice - product.discountPrice;
        const savingsPercent = Math.round((savings / product.actualPrice) * 100);
        
        return `
            <div class="product-card">
                <div class="product-image">
                   <img src="images/${product.image}" alt="${product.name}">
                </div>
                <h4 class="product-name">${product.name}</h4>
                <p class="product-package">${product.package}</p>
                <div class="product-pricing">
                    <span class="original-price">₹${product.actualPrice}</span>
                    <span class="discount-price">₹${product.discountPrice}</span>
                    <div class="savings">Save ${savingsPercent}%</div>
                </div>
                <div class="product-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="number" class="quantity-input" id="qty-${index}" value="1" min="1" max="99">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart(${index})">Add to Cart</button>
                </div>
            </div>
        `;
    }).join('');
}

// Handle search - Fixed search functionality
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.trim();
    console.log('Searching for:', searchTerm); // Debug log
    loadProducts(currentCategory, searchTerm);
}

// Handle category selection
function selectCategory(category) {
    currentCategory = category;
    
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[data-category="${category}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Load products for selected category
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput ? searchInput.value.trim() : '';
    loadProducts(category, searchTerm);
}

// Handle sorting
function handleSort() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;
    
    const sortValue = sortSelect.value;
    
    switch (sortValue) {
        case 'name':
            currentProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            currentProducts.sort((a, b) => a.discountPrice - b.discountPrice);
            break;
        case 'price-high':
            currentProducts.sort((a, b) => b.discountPrice - a.discountPrice);
            break;
        case 'discount':
            currentProducts.sort((a, b) => {
                const discountA = ((a.actualPrice - a.discountPrice) / a.actualPrice) * 100;
                const discountB = ((b.actualPrice - b.discountPrice) / b.actualPrice) * 100;
                return discountB - discountA;
            });
            break;
    }
    
    renderProducts();
}

// Update quantity in product card
function updateQuantity(index, delta) {
    const qtyInput = document.getElementById(`qty-${index}`);
    if (!qtyInput) return;
    
    let currentQty = parseInt(qtyInput.value) || 1;
    const newQty = Math.max(1, Math.min(99, currentQty + delta));
    qtyInput.value = newQty;
}

// Add product to cart
function addToCart(index) {
    const product = currentProducts[index];
    if (!product) return;
    
    const qtyInput = document.getElementById(`qty-${index}`);
    const quantity = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => 
        item.name === product.name && item.category === product.category
    );
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity,
            id: Date.now() + Math.random()
        });
    }
    
    // Reset quantity input
    if (qtyInput) {
        qtyInput.value = 1;
    }
    
    updateCartDisplay();
    showNotification(`${product.name} added to cart!`, 'success');
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartCount || !cartItems || !cartEmpty || !cartSummary) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.style.display = 'none';
        cartEmpty.style.display = 'block';
        cartSummary.style.display = 'none';
    } else {
        cartItems.style.display = 'block';
        cartEmpty.style.display = 'none';
        cartSummary.style.display = 'block';
        
        // Render cart items
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-header">
                    <div class="cart-item-name">${item.name}</div>
                    <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
                <div class="cart-item-controls">
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateCartItemQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartItemQuantity('${item.id}', 1)">+</button>
                    </div>
                    <div class="cart-item-price">₹${item.discountPrice * item.quantity}</div>
                </div>
            </div>
        `).join('');
        
        // Update summary
        updateCartSummary();
    }
}

// Update cart summary
function updateCartSummary() {
    const subtotalEl = document.getElementById('subtotal');
    const originalPriceEl = document.getElementById('originalPrice');
    const savingsEl = document.getElementById('savings');
    const totalPriceEl = document.getElementById('totalPrice');
    
    if (!subtotalEl || !originalPriceEl || !savingsEl || !totalPriceEl) return;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0);
    const originalTotal = cart.reduce((sum, item) => sum + (item.actualPrice * item.quantity), 0);
    const savings = originalTotal - subtotal;
    
    subtotalEl.textContent = `₹${subtotal}`;
    originalPriceEl.textContent = `₹${originalTotal}`;
    savingsEl.textContent = `₹${savings}`;
    totalPriceEl.textContent = `₹${subtotal}`; // total is now same as subtotal
}


// Update cart item quantity
function updateCartItemQuantity(itemId, delta) {
    const item = cart.find(cartItem => cartItem.id == itemId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + delta);
        updateCartDisplay();
    }
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id != itemId);
    updateCartDisplay();
    showNotification('Item removed from cart', 'info');
}

// Clear entire cart
function clearCart() {
    cart = [];
    updateCartDisplay();
    showNotification('Cart cleared', 'info');
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('open');
    }
}

// Close cart sidebar
function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.remove('open');
    }
}

// Open checkout modal - Fixed modal opening
function openCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const modal = document.getElementById('checkoutModal');
    const overlay = document.getElementById('overlay');
    
    if (!modal || !overlay) return;
    
    // Update checkout summary
    updateCheckoutSummary();
    
    // Show modal and overlay
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    console.log('Checkout modal opened'); // Debug log
}

// Close checkout modal - Enhanced implementation
function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    const overlay = document.getElementById('overlay');
    
    if (modal) {
        modal.classList.add('hidden');
    }
    if (overlay) {
        overlay.classList.add('hidden');
    }
    
    document.body.style.overflow = 'auto';
    console.log('Checkout modal closed'); // Debug log
}



// Track order count (persist in localStorage so refresh doesn’t reset)
let orderCount = parseInt(localStorage.getItem("orderCount")) || 0;
const maxCouponOrders = 5; // Only first 5 orders can use coupons

function updateCheckoutSummary() {
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutItemCount = document.getElementById('checkoutItemCount');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const couponInput = document.getElementById("coupon");
    const couponMessage = document.getElementById('couponMessage');

    if (!checkoutItems || !checkoutItemCount || !checkoutTotal || !couponInput) return;

    // Cart totals
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0);

    // Enable or disable coupon input based on total amount
    if (totalAmount > 2000) {
        couponInput.disabled = false;
        couponMessage.textContent = ""; // clear message
    } else {
        couponInput.disabled = true;
        couponMessage.textContent = "Coupon is eligible only for purchases above ₹2000";
        couponMessage.style.color = "Green";
        couponMessage.style.marginTop = "5px";
    }

    let totalAmountWithDiscount = totalAmount;

    // Apply coupon if eligible
    const code = couponInput.value.trim().toUpperCase();
    if (!couponInput.disabled && code && coupons.hasOwnProperty(code)) {
        if (orderCount < maxCouponOrders) {
            const discountPercent = coupons[code];
            const discount = Math.round((discountPercent / 100) * totalAmount);
            totalAmountWithDiscount -= discount;

            couponMessage.textContent = `🎉 Coupon applied! You saved ₹${discount}`;
            couponMessage.style.color = "green";
        } else {
            couponMessage.textContent = `❌ Coupon limit reached (only first ${maxCouponOrders} orders get discount)`;
            couponMessage.style.color = "red";
        }
    }

    // Update DOM
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} (${item.quantity}x)</span>
            <span>₹${item.discountPrice * item.quantity}</span>
        </div>
    `).join('');

    checkoutItemCount.textContent = totalItems;
    checkoutTotal.textContent = `₹${totalAmountWithDiscount}`;
}
const couponInput = document.getElementById("coupon");
if (couponInput) {
    couponInput.addEventListener("input", () => {
        updateCheckoutSummary();
    });
}

// When order is placed successfully
function completeOrder() {
    orderCount++;
    localStorage.setItem("orderCount", orderCount); // persist
    showNotification("✅ Order placed successfully!", "success");

    // clear cart etc.
}
// Handle order submission

// Attach event listener to checkout form
const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleOrder);
}

function generateOrderText(items) {
  let text = "🛒 Order Details\n\n";
  text += "Item            | Qty | Price | Total\n";
  text += "----------------|-----|-------|-------\n";
  items.forEach(item => {
    text += `${item.name} | ${item.quantity} | ₹${item.discountPrice} | ₹${item.quantity * item.discountPrice}\n`;
  });
  text += `\nTOTAL: ₹${items.reduce((sum, i) => sum + i.quantity * i.discountPrice, 0)}\n`;
  return text;
}
function loadImageAsBase64(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Important for CORS
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = url;
  });
}

async function handleOrder(e) {
  e.preventDefault();

  const customerName = document.getElementById('customerName').value.trim();
  const customerPhone = document.getElementById('customerPhone').value.trim();
  const customerEmail = document.getElementById('customerEmail').value.trim();
  const deliveryAddress = document.getElementById('deliveryAddress').value.trim();
  const deliveryState = document.getElementById('deliveryState').value;

  const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const orderDate = new Date().toLocaleString();

  const orderDetails = `
Order ID: ${orderId}
Name: ${customerName}
Phone: ${customerPhone}
Email: ${customerEmail || "N/A"}
Address: ${deliveryAddress}, ${deliveryState}
Date: ${orderDate}

${generateOrderText(cart)}
  `;

  const submitBtn = e.target.querySelector('button[type="submit"]');
  if (!submitBtn) return;
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Processing...';
  submitBtn.disabled = true;

  try {
    // --- 1️⃣ Email to Merchant ---
    await fetch("https://formsubmit.co/ajax/powerhouse.org.in@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: `🛒 New Order - ${orderId}`,
        message: orderDetails
      })
    });

    // --- 2️⃣ Email to Customer ---
    if (customerEmail) {
      await fetch("https://formsubmit.co/ajax/" + customerEmail, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `✅ Order Confirmation - ${orderId}`,
          message: `Hello ${customerName},\n\nThank you for your order!\n\n${orderDetails}\n\n🌟 Welcome to our store!`
        })
      });
    }
// To generate PDF Quotation using jsPDF
const orderData = {
    orderId,
    customerName,
    customerPhone,
    customerEmail,
    deliveryAddress,
    deliveryState,
    items: [...cart],
    totalAmount: cart.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0),
    orderDate: new Date().toLocaleString()
  };
//   const logoUrl = "/powerhouse-crackers-production/logo.png"; // Update this path

// const base64Logo = await loadImageAsBase64(logoUrl);
    const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
    //   doc.addImage(base64Logo, 'PNG', 150, 10, 40, 15);
  doc.setFontSize(18);
  doc.text("Power House Crackers", 14, 20);
  doc.text("Reserve Quotation", 14, 20);


  doc.setFontSize(12);
  doc.text(`Reserve ID: ${orderData.orderId}`, 14, 28);
  doc.text(`Name: ${orderData.customerName}`, 14, 36);
  doc.text(`Phone: ${orderData.customerPhone}`, 14, 43);
  doc.text(`Email: ${orderData.customerEmail || "N/A"}`, 14, 50);
  doc.text(`Address: ${orderData.deliveryAddress}`, 14, 57, { maxWidth: 180 });
  doc.text(`State: ${orderData.deliveryState}`, 14, 64);
  doc.text(`Date: ${orderData.orderDate}`, 14, 78);

  // Table
  const tableData = orderData.items.map(item => [
    item.name,
    item.quantity,
    `₹${item.discountPrice}`,
    `₹${item.quantity * item.discountPrice}`
  ]);

  doc.autoTable({
    head: [['Item', 'Qty', 'Price', 'Total']],
    body: tableData,
    startY: 85
  });

  doc.text(
    `Grand Total: ₹${orderData.totalAmount}`,
    14,
    doc.lastAutoTable.finalY + 10
  );

  doc.save(`Quotation_${orderData.orderId}.pdf`);
    // --- 3️⃣ WhatsApp Redirect ---
    const merchantNumber = "917904399942"; // your number
    const waMessage = `📦 New Order!\n\n${orderDetails}`;
    const waLink = `https://wa.me/${merchantNumber}?text=${encodeURIComponent(waMessage)}`;
    window.open(waLink, "_blank");

    alert("✅ Order placed! Emails sent and WhatsApp opened.");

    // Reset cart + form
    cart = [];
    updateCartDisplay(); // make sure this function exists
    e.target.reset();

  } catch (err) {
    console.error("❌ Error:", err);
    alert("Error occurred! Please try again.");
  }

  submitBtn.textContent = originalText;
  submitBtn.disabled = false;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const iconMap = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
    };
    
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">${iconMap[type] || iconMap.info}</span>
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;

    // Add styles for notification if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                border-radius: var(--radius-base);
                box-shadow: var(--shadow-lg);
                animation: slideInRight 0.3s ease-out;
                font-family: var(--font-family-base);
            }

            .notification--success {
                background: rgba(50, 184, 198, 0.15);
                border: 1px solid rgba(50, 184, 198, 0.25);
                color: #32B8C6;
            }

            .notification--error {
                background: rgba(220, 20, 60, 0.15);
                border: 1px solid rgba(220, 20, 60, 0.25);
                color: #DC143C;
            }

            .notification--warning {
                background: rgba(255, 165, 0, 0.15);
                border: 1px solid rgba(255, 165, 0, 0.25);
                color: #FFA500;
            }

            .notification--info {
                background: rgba(255, 107, 53, 0.15);
                border: 1px solid rgba(255, 107, 53, 0.25);
                color: #FF6B35;
            }

            .notification__content {
                display: flex;
                align-items: center;
                padding: var(--space-16);
                gap: var(--space-12);
            }

            .notification__icon {
                font-weight: bold;
                font-size: var(--font-size-lg);
                flex-shrink: 0;
            }

            .notification__message {
                flex: 1;
                font-weight: var(--font-weight-medium);
            }

            .notification__close {
                background: none;
                border: none;
                font-size: var(--font-size-xl);
                cursor: pointer;
                opacity: 0.7;
                transition: opacity var(--duration-fast);
                color: inherit;
                flex-shrink: 0;
            }

            .notification__close:hover {
                opacity: 1;
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @media (max-width: 480px) {
                .notification {
                    top: 100px;
                    left: 20px;
                    right: 20px;
                    max-width: none;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Add to document
    document.body.appendChild(notification);

    // Close functionality
    const closeButton = notification.querySelector('.notification__close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            notification.remove();
        });
    }

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Utility functions
function formatCurrency(amount) {
    return `₹${amount.toLocaleString('en-IN')}`;
}

function validatePhone(phone) {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length === 10 && /^[6-9]/.test(cleanPhone);
}

function validateEmail(email) {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

 // Open sidebar
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.add("active");
  });

  // Close sidebar
  sidebarClose.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });