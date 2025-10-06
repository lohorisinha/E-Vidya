// Application Data
const physicsClasses = [
    {
        class: 6,
        titleKey: "force_fields",
        subtitleKey: "physics_adventure",
        descriptionKey: "force_fields_desc",
        objectives: ["force_concepts", "friction_understanding", "motion_prediction", "newton_laws_basic"],
        icon: "⚡",
        status: "coming_soon"
    },
    {
        class: 7,
        titleKey: "light_quest",
        subtitleKey: "optics_adventure", 
        descriptionKey: "light_quest_desc",
        objectives: ["reflection_understanding", "refraction_basics", "light_dispersion", "optical_principles"],
        icon: "🔍",
        status: "coming_soon"
    },
    {
        class: 8,
        titleKey: "magnet_maze",
        subtitleKey: "magnetic_adventure",
        descriptionKey: "magnet_maze_desc",
        objectives: ["magnetic_field_concepts", "attraction_repulsion", "electromagnet_basics", "magnetic_pole_understanding"],
        icon: "🧲",
        status: "coming_soon"
    },
    {
        class: 9,
        titleKey: "circuit_builder",
        subtitleKey: "electrical_adventure",
        descriptionKey: "circuit_builder_desc",
        objectives: ["ohm_law_mastery", "series_circuits", "parallel_circuits", "current_voltage_resistance"],
        icon: "🔌", 
        status: "coming_soon"
    },
    {
        class: 10,
        titleKey: "wave_rider",
        subtitleKey: "wave_adventure",
        descriptionKey: "wave_rider_desc",
        objectives: ["wave_properties", "frequency_concepts", "wavelength_understanding", "sound_light_comparison"],
        icon: "🌊",
        status: "coming_soon"
    },
    {
        class: 11,
        titleKey: "projectile_arena",
        subtitleKey: "kinematics_adventure",
        descriptionKey: "projectile_arena_desc",
        objectives: ["projectile_motion", "kinematics_equations", "trajectory_analysis", "vector_concepts"],
        icon: "🎯",
        status: "available",
        gameUrl: "../1-physics/class-11/index.html"
    },
    {
        class: 12,
        titleKey: "quantum_quest",
        subtitleKey: "modern_physics_adventure",
        descriptionKey: "quantum_quest_desc",
        objectives: ["atomic_models", "energy_quantization", "photoelectric_effect", "emission_spectra"],
        icon: "⚛️",
        status: "coming_soon"
    }
];

const translations = {
    en: {
        // Header and main content
        hero_title: "Discover Your Physics Journey Through Classes 6-12",
        hero_subtitle: "From force fields to quantum mechanics, each class level features unique games designed to make physics engaging, interactive, and fun.",
        download_btn: "📋 Download Complete Curriculum PDF",
        game_approach: "Each class level features a unique game-based approach to master specific physics concepts",
        features_title: "Why Choose E-Vidya Physics?",
        
        // Modal content
        coming_soon: "Coming Soon!",
        coming_soon_message: "This physics adventure is currently under development. Stay tuned for an exciting learning experience!",
        got_it: "Got it!",
        ready_to_play: "Ready to Play!",
        projectile_available_text: "🎯 Projectile Arena is now available! Launch projectiles to hit moving targets by adjusting angle, velocity, and gravity.",
        learning_objectives: "Learning Objectives:",
        maybe_later: "Maybe Later",
        start_playing: "Start Playing",
        
        // Class titles
        force_fields: "Force Fields",
        light_quest: "Light Quest",
        magnet_maze: "Magnet Maze",
        circuit_builder: "Circuit Builder",
        wave_rider: "Wave Rider",
        projectile_arena: "Projectile Arena",
        quantum_quest: "Quantum Quest",
        
        // Class subtitles
        physics_adventure: "Physics Adventure",
        optics_adventure: "Optics Adventure",
        magnetic_adventure: "Magnetic Adventure",
        electrical_adventure: "Electrical Adventure",
        wave_adventure: "Wave Adventure",
        kinematics_adventure: "Kinematics Adventure",
        modern_physics_adventure: "Modern Physics Adventure",
        
        // Class descriptions
        force_fields_desc: "Move objects through a maze by adjusting applied forces and predicting motion.",
        light_quest_desc: "Explore a case with mirrors, lenses, and prisms to guide light beams.",
        magnet_maze_desc: "Navigate a metallic ball through a maze using magnets placed at different spots.",
        circuit_builder_desc: "Build working electric circuits to power machines in a virtual lab.",
        wave_rider_desc: "Ride a wave across oceans by tuning frequency, wavelength, and amplitude.",
        projectile_arena_desc: "Launch projectiles to hit moving targets, adjusting angle/velocity/gravity.",
        quantum_quest_desc: "Unlock atomic mysteries by exploring energy levels, photons, and emission spectra.",
        
        // Learning objectives
        force_concepts: "Force concepts",
        friction_understanding: "Friction understanding",
        motion_prediction: "Motion prediction",
        newton_laws_basic: "Newton's Laws (basic)",
        reflection_understanding: "Reflection understanding",
        refraction_basics: "Refraction basics",
        light_dispersion: "Light dispersion",
        optical_principles: "Optical principles",
        magnetic_field_concepts: "Magnetic field concepts",
        attraction_repulsion: "Attraction/repulsion",
        electromagnet_basics: "Electromagnet basics",
        magnetic_pole_understanding: "Magnetic pole understanding",
        ohm_law_mastery: "Ohm's law mastery",
        series_circuits: "Series circuits",
        parallel_circuits: "Parallel circuits",
        current_voltage_resistance: "Current/voltage/resistance",
        wave_properties: "Wave properties",
        frequency_concepts: "Frequency concepts",
        wavelength_understanding: "Wavelength understanding",
        sound_light_comparison: "Sound/light comparison",
        projectile_motion: "Projectile motion",
        kinematics_equations: "Kinematics equations",
        trajectory_analysis: "Trajectory analysis",
        vector_concepts: "Vector concepts",
        atomic_models: "Atomic models",
        energy_quantization: "Energy quantization",
        photoelectric_effect: "Photoelectric effect",
        emission_spectra: "Emission spectra",
        
        // Modal objectives for Class 11
        objective_1: "Projectile motion mastery",
        objective_2: "Kinematics equations application",
        objective_3: "Trajectory analysis skills",
        objective_4: "Vector concept understanding",
        
        // Features
        feature_1_title: "Interactive Learning",
        feature_1_desc: "Each concept is taught through engaging games that make physics fun and memorable, turning complex problems into exciting challenges.",
        feature_2_title: "Progressive Difficulty",
        feature_2_desc: "Curriculum builds systematically from basic force concepts to modern physics, ensuring strong foundational understanding.",
        feature_3_title: "Achievement System",
        feature_3_desc: "Students earn badges, certificates, and recognition for mastering physics concepts and completing challenging levels.",
        feature_4_title: "Real-World Applications",
        feature_4_desc: "Every game connects physics concepts to real-world phenomena, helping students understand the relevance of their learning.",
        feature_5_title: "Adaptive Learning",
        feature_5_desc: "Adaptive algorithms adjust difficulty based on student performance, ensuring optimal challenge and continuous progress.",
        feature_6_title: "Social Learning",
        feature_6_desc: "Students can compete with peers, collaborate on problems, and participate in physics tournaments and challenges."
    },
    
    hi: {
        // Header and main content
        hero_title: "कक्षा 6-12 के लिए अपनी भौतिकी यात्रा खोजें",
        hero_subtitle: "बल क्षेत्र से लेकर क्वांटम यांत्रिकी तक, प्रत्येक कक्षा स्तर में अनूठे खेल हैं जो भौतिकी को आकर्षक, इंटरैक्टिव और मज़ेदार बनाने के लिए डिज़ाइन किए गए हैं।",
        download_btn: "📋 संपूर्ण पाठ्यक्रम पीडीएफ डाउनलोड करें",
        game_approach: "विशिष्ट भौतिकी अवधारणाओं में महारत हासिल करने के लिए प्रत्येक कक्षा स्तर में एक अनूठा खेल-आधारित दृष्टिकोण है",
        features_title: "E-Vidya भौतिकी क्यों चुनें?",
        
        // Modal content
        coming_soon: "जल्द आ रहा है!",
        coming_soon_message: "यह भौतिकी साहसिक कार्य वर्तमान में विकसित हो रहा है। एक रोमांचक सीखने के अनुभव के लिए बने रहें!",
        got_it: "समझ गया!",
        ready_to_play: "खेलने के लिए तैयार!",
        projectile_available_text: "🎯 प्रक्षेप्य एरिना अब उपलब्ध है! कोण, वेग और गुरुत्वाकर्षण को समायोजित करके चलते लक्ष्यों पर प्रक्षेप्य लॉन्च करें।",
        learning_objectives: "शिक्षा के उद्देश्य:",
        maybe_later: "बाद में शायद",
        start_playing: "खेलना शुरू करें",
        
        // Class titles
        force_fields: "बल क्षेत्र",
        light_quest: "प्रकाश खोज",
        magnet_maze: "चुंबक भूलभुलैया",
        circuit_builder: "सर्किट बिल्डर",
        wave_rider: "तरंग सवार",
        projectile_arena: "प्रक्षेप्य एरिना",
        quantum_quest: "क्वांटम खोज",
        
        // Class subtitles
        physics_adventure: "भौतिकी साहसिक",
        optics_adventure: "प्रकाशिकी साहसिक",
        magnetic_adventure: "चुंबकीय साहसिक",
        electrical_adventure: "विद्युत साहसिक",
        wave_adventure: "तरंग साहसिक",
        kinematics_adventure: "गतिकी साहसिक",
        modern_physics_adventure: "आधुनिक भौतिकी साहसिक",
        
        // Class descriptions
        force_fields_desc: "लागू बलों को समायोजित करके और गति की भविष्यवाणी करके वस्तुओं को भूलभुलैया के माध्यम से ले जाएं।",
        light_quest_desc: "प्रकाश किरणों का मार्गदर्शन करने के लिए दर्पण, लेंस और प्रिज्म के साथ एक केस का अन्वेषण करें।",
        magnet_maze_desc: "विभिन्न स्थानों पर रखे चुंबकों का उपयोग करके धातु की गेंद को भूलभुलैया के माध्यम से नेविगेट करें।",
        circuit_builder_desc: "आभासी प्रयोगशाला में मशीनों को शक्ति प्रदान करने के लिए कार्यशील विद्युत सर्किट बनाएं।",
        wave_rider_desc: "आवृत्ति, तरंग दैर्घ्य और आयाम को समायोजित करके समुद्रों में तरंग की सवारी करें।",
        projectile_arena_desc: "कोण/वेग/गुरुत्वाकर्षण समायोजित करके चलते लक्ष्यों पर प्रक्षेप्य लॉन्च करें।",
        quantum_quest_desc: "ऊर्जा स्तरों, फोटॉनों और उत्सर्जन स्पेक्ट्रा का अन्वेषण करके परमाणु रहस्यों को खोलें।",
        
        // Learning objectives
        force_concepts: "बल अवधारणाएं",
        friction_understanding: "घर्षण की समझ",
        motion_prediction: "गति की भविष्यवाणी",
        newton_laws_basic: "न्यूटन के नियम (बुनियादी)",
        reflection_understanding: "प्रतिबिंब की समझ",
        refraction_basics: "अपवर्तन की मूल बातें",
        light_dispersion: "प्रकाश का फैलाव",
        optical_principles: "प्रकाशीय सिद्धांत",
        magnetic_field_concepts: "चुंबकीय क्षेत्र अवधारणाएं",
        attraction_repulsion: "आकर्षण/विकर्षण",
        electromagnet_basics: "विद्युत चुम्बक की मूल बातें",
        magnetic_pole_understanding: "चुंबकीय ध्रुव की समझ",
        ohm_law_mastery: "ओम के नियम में महारत",
        series_circuits: "श्रृंखला सर्किट",
        parallel_circuits: "समानांतर सर्किट",
        current_voltage_resistance: "धारा/वोल्टेज/प्रतिरोध",
        wave_properties: "तरंग गुण",
        frequency_concepts: "आवृत्ति अवधारणाएं",
        wavelength_understanding: "तरंग दैर्घ्य की समझ",
        sound_light_comparison: "ध्वनि/प्रकाश तुलना",
        projectile_motion: "प्रक्षेप्य गति",
        kinematics_equations: "गतिकी समीकरण",
        trajectory_analysis: "प्रक्षेपवक्र विश्लेषण",
        vector_concepts: "वेक्टर अवधारणाएं",
        atomic_models: "परमाणु मॉडल",
        energy_quantization: "ऊर्जा क्वांटीकरण",
        photoelectric_effect: "फोटोइलेक्ट्रिक प्रभाव",
        emission_spectra: "उत्सर्जन स्पेक्ट्रा",
        
        // Modal objectives for Class 11
        objective_1: "प्रक्षेप्य गति में महारत",
        objective_2: "गतिकी समीकरण अनुप्रयोग",
        objective_3: "प्रक्षेपवक्र विश्लेषण कौशल",
        objective_4: "वेक्टर अवधारणा समझ",
        
        // Features
        feature_1_title: "इंटरैक्टिव लर्निंग",
        feature_1_desc: "प्रत्येक अवधारणा आकर्षक खेलों के माध्यम से सिखाई जाती है जो भौतिकी को मजेदार और यादगार बनाती है।",
        feature_2_title: "प्रगतिशील कठिनाई",
        feature_2_desc: "पाठ्यक्रम बुनियादी बल अवधारणाओं से आधुनिक भौतिकी तक व्यवस्थित रूप से बनाया गया है।",
        feature_3_title: "उपलब्धि प्रणाली",
        feature_3_desc: "छात्र भौतिकी अवधारणाओं में महारत हासिल करने के लिए बैज, प्रमाणपत्र और मान्यता अर्जित करते हैं।",
        feature_4_title: "वास्तविक दुनिया के अनुप्रयोग",
        feature_4_desc: "हर खेल भौतिकी अवधारणाओं को वास्तविक दुनिया की घटनाओं से जोड़ता है।",
        feature_5_title: "अनुकूली शिक्षा",
        feature_5_desc: "अनुकूली एल्गोरिदम छात्र प्रदर्शन के आधार पर कठिनाई को समायोजित करते हैं।",
        feature_6_title: "सामाजिक शिक्षा",
        feature_6_desc: "छात्र साथियों के साथ प्रतिस्पर्धा कर सकते हैं और भौतिकी टूर्नामेंट में भाग ले सकते हैं।"
    },
    
    or: {
        // Header and main content
        hero_title: "ଶ୍ରେଣୀ 6-12 ପାଇଁ ଆପଣଙ୍କ ପଦାର୍ଥ ବିଜ୍ଞାନ ଯାତ୍ରା ଆବିଷ୍କାର କରନ୍ତୁ",
        hero_subtitle: "ବଳ କ୍ଷେତ୍ରରୁ କ୍ୱାଣ୍ଟମ ମେକାନିକ୍ସ ପର୍ଯ୍ୟନ୍ତ, ପ୍ରତ୍ୟେକ ଶ୍ରେଣୀ ସ୍ତରରେ ଅନନ୍ୟ ଖେଳ ଅଛି ଯାହା ପଦାର୍ଥ ବିଜ୍ଞାନକୁ ଆକର୍ଷଣୀୟ, ଇଣ୍ଟରାକ୍ଟିଭ ଏବଂ ମଜାଦାର କରିବା ପାଇଁ ଡିଜାଇନ କରାଯାଇଛି।",
        download_btn: "📋 ସଂପୂର୍ଣ୍ଣ ପାଠ୍ୟକ୍ରମ PDF ଡାଉନଲୋଡ କରନ୍ତୁ",
        game_approach: "ନିର୍ଦିଷ୍ଟ ପଦାର୍ଥ ବିଜ୍ଞାନ ଧାରଣାଗୁଡ଼ିକରେ ଦକ୍ଷତା ହାସଲ କରିବା ପାଇଁ ପ୍ରତ୍ୟେକ ଶ୍ରେଣୀ ସ୍ତରରେ ଏକ ଅନନ୍ୟ ଖେଳ-ଆଧାରିତ ପଦ୍ଧତି ଅଛି",
        features_title: "କାହିଁକି E-Vidya ପଦାର୍ଥ ବିଜ୍ଞାନ ଚୟନ କରିବେ?",
        
        // Modal content
        coming_soon: "ଶୀଘ୍ର ଆସୁଛି!",
        coming_soon_message: "ଏହି ପଦାର୍ଥ ବିଜ୍ଞାନ ଦୁ:ସାହସିକ କାର୍ଯ୍ୟ ବର୍ତ୍ତମାନ ବିକାଶ ହେଉଛି। ଏକ ରୋମାଞ୍ଚକର ଶିକ୍ଷଣ ଅନୁଭବ ପାଇଁ ଅପେକ୍ଷା କରନ୍ତୁ!",
        got_it: "ବୁଝିଗଲି!",
        ready_to_play: "ଖେଳିବାକୁ ପ୍ରସ୍ତୁତ!",
        projectile_available_text: "🎯 ପ୍ରକ୍ଷେପ୍ୟ ଆରେନା ବର୍ତ୍ତମାନ ଉପଲବ୍ଧ! କୋଣ, ବେଗ ଏବଂ ମାଧ୍ୟାକର୍ଷଣ ସମନ୍ୱୟ କରି ଗତିଶୀଳ ଲକ୍ଷ୍ୟଗୁଡ଼ିକୁ ମାରିବା ପାଇଁ ପ୍ରକ୍ଷେପ୍ୟ ଲଞ୍ଚ କରନ୍ତୁ।",
        learning_objectives: "ଶିକ୍ଷା ଉଦ୍ଦେଶ୍ୟ:",
        maybe_later: "ବୋଧହୁଏ ପରେ",
        start_playing: "ଖେଳିବା ଆରମ୍ଭ କରନ୍ତୁ",
        
        // Class titles
        force_fields: "ବଳ କ୍ଷେତ୍ର",
        light_quest: "ଆଲୋକ ଅନ୍ୱେଷଣ",
        magnet_maze: "ଚୁମ୍ବକ ମ୍ୟାଜ୍",
        circuit_builder: "ସର୍କିଟ୍ ବିଲ୍ଡର",
        wave_rider: "ତରଙ୍ଗ ଆରୋହୀ",
        projectile_arena: "ପ୍ରକ୍ଷେପ୍ୟ ଆରେନା",
        quantum_quest: "କ୍ୱାଣ୍ଟମ ଅନ୍ୱେଷଣ",
        
        // Class subtitles
        physics_adventure: "ପଦାର୍ଥ ବିଜ୍ଞାନ ଅଭିଯାନ",
        optics_adventure: "ଅପ୍ଟିକ୍ସ ଅଭିଯାନ",
        magnetic_adventure: "ଚୁମ୍ବକୀୟ ଅଭିଯାନ",
        electrical_adventure: "ବିଦ୍ୟୁତ୍ ଅଭିଯାନ",
        wave_adventure: "ତରଙ୍ଗ ଅଭିଯାନ",
        kinematics_adventure: "ଗତିବିଦ୍ୟା ଅଭିଯାନ",
        modern_physics_adventure: "ଆଧୁନିକ ପଦାର୍ଥ ବିଜ୍ଞାନ ଅଭିଯାନ",
        
        // Class descriptions
        force_fields_desc: "ପ୍ରୟୋଗ ହୋଇଥିବା ବଳଗୁଡ଼ିକୁ ସମନ୍ୱୟ କରି ଏବଂ ଗତିର ପୂର୍ବାନୁମାନ କରି ବସ୍ତୁଗୁଡ଼ିକୁ ଏକ ମ୍ୟାଜ୍ ମାଧ୍ୟମରେ ଘୁଞ୍ଚାନ୍ତୁ।",
        light_quest_desc: "ଆଲୋକ କିରଣଗୁଡ଼ିକୁ ପଥପ୍ରଦର୍ଶନ କରିବା ପାଇଁ ଦର୍ପଣ, ଲେନ୍ସ ଏବଂ ପ୍ରିଜମ ସହିତ ଏକ କେସ୍ ଅନ୍ୱେଷଣ କରନ୍ତୁ।",
        magnet_maze_desc: "ବିଭିନ୍ନ ସ୍ଥାନରେ ରଖାଯାଇଥିବା ଚୁମ୍ବକ ବ୍ୟବହାର କରି ଧାତୁ ବଲକୁ ମ୍ୟାଜ୍ ମାଧ୍ୟମରେ ନେଭିଗେଟ୍ କରନ୍ତୁ।",
        circuit_builder_desc: "ଭର୍ଚୁଆଲ ଲ୍ୟାବରେ ମେସିନଗୁଡ଼ିକୁ ଶକ୍ତି ଯୋଗାଇବା ପାଇଁ କାର୍ଯ୍ୟକ୍ଷମ ବିଦ୍ୟୁତ୍ ସର୍କିଟ୍ ନିର୍ମାଣ କରନ୍ତୁ।",
        wave_rider_desc: "ଆବୃତ୍ତି, ତରଙ୍ଗ ଦର୍ଘ୍ୟ ଏବଂ ପ୍ରସ୍ଥକୁ ଟ୍ୟୁନ୍ କରି ସମୁଦ୍ର ଉପରେ ତରଙ୍ଗ ଚଢ଼ନ୍ତୁ।",
        projectile_arena_desc: "କୋଣ/ବେଗ/ମାଧ୍ୟାକର୍ଷଣ ସମନ୍ୱୟ କରି ଗତିଶୀଳ ଲକ୍ଷ୍ୟଗୁଡ଼ିକୁ ମାରିବା ପାଇଁ ପ୍ରକ୍ଷେପ୍ୟ ଲଞ୍ଚ କରନ୍ତୁ।",
        quantum_quest_desc: "ଶକ୍ତି ସ୍ତର, ଫୋଟନ୍ ଏବଂ ନିର୍ଗମନ ସ୍ପେକ୍ଟ୍ରା ଅନ୍ୱେଷଣ କରି ପରମାଣୁ ରହସ୍ୟ ଖୋଲନ୍ତୁ।",
        
        // Learning objectives
        force_concepts: "ବଳ ଧାରଣାଗୁଡ଼ିକ",
        friction_understanding: "ଘର୍ଷଣ ବୁଝିବା",
        motion_prediction: "ଗତି ପୂର୍ବାନୁମାନ",
        newton_laws_basic: "ନ୍ୟୁଟନ୍ ର ନିୟମ (ମୂଳ)",
        reflection_understanding: "ପ୍ରତିଫଳନ ବୁଝିବା",
        refraction_basics: "ପ୍ରତିସରଣ ମୂଳ ବିଷୟ",
        light_dispersion: "ଆଲୋକ ବିଚ୍ଛୁରଣ",
        optical_principles: "ଅପ୍ଟିକାଲ ନୀତିଗୁଡ଼ିକ",
        magnetic_field_concepts: "ଚୁମ୍ବକୀୟ କ୍ଷେତ୍ର ଧାରଣାଗୁଡ଼ିକ",
        attraction_repulsion: "ଆକର୍ଷଣ/ବିକର୍ଷଣ",
        electromagnet_basics: "ବିଦ୍ୟୁତ୍ ଚୁମ୍ବକ ମୂଳ ବିଷୟ",
        magnetic_pole_understanding: "ଚୁମ୍ବକୀୟ ପୋଲ ବୁଝିବା",
        ohm_law_mastery: "ଓମ୍ ନିୟମ ଦକ୍ଷତା",
        series_circuits: "କ୍ରମ ସର୍କିଟ୍",
        parallel_circuits: "ସମାନ୍ତରାଳ ସର୍କିଟ୍",
        current_voltage_resistance: "କରେଣ୍ଟ/ଭୋଲଟେଜ୍/ପ୍ରତିରୋଧ",
        wave_properties: "ତରଙ୍ଗ ଗୁଣଧର୍ମ",
        frequency_concepts: "ଆବୃତ୍ତି ଧାରଣାଗୁଡ଼ିକ",
        wavelength_understanding: "ତରଙ୍ଗ ଦର୍ଘ୍ୟ ବୁଝିବା",
        sound_light_comparison: "ଶବ୍ଦ/ଆଲୋକ ତୁଳନା",
        projectile_motion: "ପ୍ରକ୍ଷେପ୍ୟ ଗତି",
        kinematics_equations: "ଗତିବିଦ୍ୟା ସମୀକରଣ",
        trajectory_analysis: "ପଥ ବିଶ୍ଳେଷଣ",
        vector_concepts: "ଭେକ୍ଟର ଧାରଣାଗୁଡ଼ିକ",
        atomic_models: "ପରମାଣୁ ମଡେଲ",
        energy_quantization: "ଶକ୍ତି କ୍ୱାଣ୍ଟାଇଜେସନ୍",
        photoelectric_effect: "ଫଟୋ-ଇଲେକ୍ଟ୍ରିକ୍ ପ୍ରଭାବ",
        emission_spectra: "ନିର୍ଗମନ ସ୍ପେକ୍ଟ୍ରା",
        
        // Modal objectives for Class 11
        objective_1: "ପ୍ରକ୍ଷେପ୍ୟ ଗତି ଦକ୍ଷତା",
        objective_2: "ଗତିବିଦ୍ୟା ସମୀକରଣ ପ୍ରୟୋଗ",
        objective_3: "ପଥ ବିଶ୍ଳେଷଣ କୌଶଳ",
        objective_4: "ଭେକ୍ଟର ଧାରଣା ବୁଝିବା",
        
        // Features
        feature_1_title: "ଇଣ୍ଟରାକ୍ଟିଭ ଶିକ୍ଷଣ",
        feature_1_desc: "ପ୍ରତ୍ୟେକ ଧାରଣା ଆକର୍ଷଣୀୟ ଖେଳ ମାଧ୍ୟମରେ ଶିକ୍ଷା ଦିଆଯାଏ ଯାହା ପଦାର୍ଥ ବିଜ୍ଞାନକୁ ମଜାଦାର ଏବଂ ସ୍ମରଣୀୟ କରିଥାଏ।",
        feature_2_title: "ପ୍ରଗତିଶୀଳ କଠିନତା",
        feature_2_desc: "ପାଠ୍ୟକ୍ରମ ମୂଳ ବଳ ଧାରଣାଗୁଡ଼ିକରୁ ଆଧୁନିକ ପଦାର୍ଥ ବିଜ୍ଞାନ ପର୍ଯ୍ୟନ୍ତ ବ୍ୟବସ୍ଥିତ ଭାବରେ ନିର୍ମିତ।",
        feature_3_title: "ଉପଲବ୍ଧି ପ୍ରଣାଳୀ",
        feature_3_desc: "ଛାତ୍ରମାନେ ପଦାର୍ଥ ବିଜ୍ଞାନ ଧାରଣାଗୁଡ଼ିକରେ ଦକ୍ଷତା ହାସଲ କରିବା ପାଇଁ ବ୍ୟାଜ୍, ସାର୍ଟିଫିକେଟ୍ ଏବଂ ସ୍ୱୀକୃତି ଅର୍ଜନ କରନ୍ତି।",
        feature_4_title: "ବାସ୍ତବ ଜଗତ ପ୍ରୟୋଗ",
        feature_4_desc: "ପ୍ରତ୍ୟେକ ଖେଳ ପଦାର୍ଥ ବିଜ୍ଞାନ ଧାରଣାଗୁଡ଼ିକୁ ବାସ୍ତବ ଜଗତର ଘଟଣାଗୁଡ଼ିକ ସହିତ ସଂଯୋଗ କରେ।",
        feature_5_title: "ଅନୁକୂଳ ଶିକ୍ଷଣ",
        feature_5_desc: "ଅନୁକୂଳ ଆଲଗୋରିଦମ ଛାତ୍ର ପ୍ରଦର୍ଶନ ଆଧାରରେ କଠିନତାକୁ ସମନ୍ୱୟ କରେ।",
        feature_6_title: "ସାମାଜିକ ଶିକ୍ଷଣ",
        feature_6_desc: "ଛାତ୍ରମାନେ ସାଥୀମାନଙ୍କ ସହିତ ପ୍ରତିଯୋଗିତା କରିପାରିବେ ଏବଂ ପଦାର୍ଥ ବିଜ୍ଞାନ ଟୁର୍ଣ୍ଣାମେଣ୍ଟରେ ଭାଗ ନେଇପାରିବେ।"
    }
};

const features = [
    {
        icon: "🎮",
        titleKey: "feature_1_title",
        descriptionKey: "feature_1_desc"
    },
    {
        icon: "📊", 
        titleKey: "feature_2_title",
        descriptionKey: "feature_2_desc"
    },
    {
        icon: "🏆",
        titleKey: "feature_3_title",
        descriptionKey: "feature_3_desc"
    },
    {
        icon: "🌍",
        titleKey: "feature_4_title",
        descriptionKey: "feature_4_desc"
    },
    {
        icon: "🤖",
        titleKey: "feature_5_title",
        descriptionKey: "feature_5_desc"
    },
    {
        icon: "👥",
        titleKey: "feature_6_title",
        descriptionKey: "feature_6_desc"
    }
];

// Current language state
let currentLanguage = 'en';

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

// Initialize Application
function initializeApp() {
    renderGamesGrid();
    renderFeaturesGrid();
    updateLanguage(currentLanguage);
}

// Render Games Grid
function renderGamesGrid() {
    const gamesGrid = document.querySelector('.games-grid');
    gamesGrid.innerHTML = '';

    physicsClasses.forEach(gameData => {
        const gameCard = createGameCard(gameData);
        gamesGrid.appendChild(gameCard);
    });
}

// Create Game Card Element
function createGameCard(gameData) {
    const card = document.createElement('div');
    card.className = `game-card ${gameData.status === 'available' ? 'available' : ''}`;
    card.dataset.status = gameData.status;
    card.dataset.class = gameData.class;

    const objectivesTags = gameData.objectives
        .map(obj => `<span class="objective-tag" data-translate="${obj}"></span>`)
        .join('');

    card.innerHTML = `
        <span class="game-icon">${gameData.icon}</span>
        <div class="game-class">Class ${gameData.class}</div>
        <h3 class="game-title" data-translate="${gameData.titleKey}"></h3>
        <div class="game-subtitle" data-translate="${gameData.subtitleKey}"></div>
        <p class="game-description" data-translate="${gameData.descriptionKey}"></p>
        <div class="game-objectives">${objectivesTags}</div>
    `;

    // Add click event listener
    card.addEventListener('click', () => handleGameCardClick(gameData));

    return card;
}

// Handle Game Card Click
function handleGameCardClick(gameData) {
    if (gameData.status === 'available') {
        showAvailableGameModal(gameData);
    } else {
        showComingSoonModal();
    }
}

// Show Coming Soon Modal
function showComingSoonModal() {
    const modal = document.getElementById('comingSoonModal');
    modal.classList.remove('hidden');
}

// Show Available Game Modal
function showAvailableGameModal(gameData) {
    const modal = document.getElementById('availableGameModal');
    modal.classList.remove('hidden');
    
    // Store game URL for play button
    const playGameBtn = document.querySelector('.play-game-btn');
    playGameBtn.dataset.gameUrl = gameData.gameUrl;
}

// Render Features Grid
function renderFeaturesGrid() {
    const featuresGrid = document.querySelector('.features-grid');
    featuresGrid.innerHTML = '';

    features.forEach(feature => {
        const featureCard = createFeatureCard(feature);
        featuresGrid.appendChild(featureCard);
    });
}

// Create Feature Card Element
function createFeatureCard(feature) {
    const card = document.createElement('div');
    card.className = 'feature-card';

    card.innerHTML = `
        <span class="feature-icon">${feature.icon}</span>
        <h3 class="feature-title" data-translate="${feature.titleKey}"></h3>
        <p class="feature-description" data-translate="${feature.descriptionKey}"></p>
    `;

    return card;
}

// Setup Event Listeners
function setupEventListeners() {
    // Language selector buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            switchLanguage(lang);
        });
    });

    // Download PDF button
    const downloadBtn = document.querySelector('.download-btn');
    downloadBtn.addEventListener('click', handleDownloadPDF);

    // Modal close buttons
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Modal backdrop clicks
    const modalBackdrops = document.querySelectorAll('.modal-backdrop');
    modalBackdrops.forEach(backdrop => {
        backdrop.addEventListener('click', closeModal);
    });

    // Play game button
    const playGameBtn = document.querySelector('.play-game-btn');
    playGameBtn.addEventListener('click', handlePlayGame);

    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Switch Language
function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Update language
    updateLanguage(lang);
}

// Update Language Content
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.dataset.translate;
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Handle Download PDF
function handleDownloadPDF() {
    // Create a mock PDF download
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJcfsj6IKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCgoyIDAgb2JqCjw8Ci9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFJdCi9Db3VudCAxCj4+CmVuZG9iagoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbMCAwIDYxMiA3OTJdCi9Db250ZW50cyA0IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKL0xlbmd0aCA0NAo+PgpzdHJlYW0KQlQKL0YxIDEyIFRmCjcyIDcyMCBUZAooRS1WaWR5YSBQaHlzaWNzIEN1cnJpY3VsdW0pIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKMDAwMDAwMDIwNCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDUKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjI5OAolJUVPRgo=';
    link.download = 'evidya-physics-curriculum.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show a brief success message
    const originalText = document.querySelector('.download-btn').textContent;
    const downloadBtn = document.querySelector('.download-btn');
    const currentTranslation = translations[currentLanguage];
    
    if (currentTranslation) {
        downloadBtn.textContent = currentLanguage === 'hi' ? '✅ डाउनलोड हो गया!' : 
                                 currentLanguage === 'or' ? '✅ ଡାଉନଲୋଡ ହୋଇଗଲା!' : 
                                 '✅ Downloaded!';
    }
    downloadBtn.style.backgroundColor = '#059669';
    
    setTimeout(() => {
        downloadBtn.textContent = originalText;
        downloadBtn.style.backgroundColor = '';
    }, 2000);
}

// Handle Play Game
function handlePlayGame() {
    const playGameBtn = document.querySelector('.play-game-btn');
    const gameUrl = playGameBtn.dataset.gameUrl;
    
    closeModal();
    
    // Show a loading/redirecting message
    const body = document.body;
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #10B981 0%, #059669 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: white;
        font-size: 24px;
        font-weight: bold;
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
    `;
    
    const loadingText = currentLanguage === 'hi' ? 'प्रक्षेप्य एरिना लॉन्च हो रहा है...' :
                       currentLanguage === 'or' ? 'ପ୍ରକ୍ଷେପ୍ୟ ଆରେନା ଲଞ୍ଚ ହେଉଛି...' :
                       'Launching Projectile Arena...';
    
    const subText = currentLanguage === 'hi' ? 'भौतिकी मज़े के लिए तैयार हो जाइए!' :
                    currentLanguage === 'or' ? 'ପଦାର୍ଥ ବିଜ୍ଞାନ ମଜା ପାଇଁ ପ୍ରସ୍ତୁତ ହୁଅନ୍ତୁ!' :
                    'Get ready for physics fun!';
    
    loadingOverlay.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 20px;">🎯</div>
            <div>${loadingText}</div>
            <div style="font-size: 16px; margin-top: 10px; opacity: 0.8;">${subText}</div>
        </div>
    `;
    
    body.appendChild(loadingOverlay);
    
    setTimeout(() => {
        body.removeChild(loadingOverlay);
        // Redirect to the actual game URL
        window.location.href = gameUrl;
    }, 3000);
}

// Close Modal
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.add('hidden');
    });
}

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation classes when elements come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe game cards and feature cards for animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.game-card, .feature-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }, 100);
});