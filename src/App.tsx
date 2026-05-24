import { useState, useEffect, useCallback } from 'react'
import './App.css'

const characters = [
  {
    name: "Blue",
    mainImage: "/images/BLUE_OFFICIAL_POSTER-bc7d7a8e-3718-4f8e-956a-ae69a2fe06af.png",
    extraImages: [
      "/images/BLUE_HAND_DRAWN_COLORED-c2e04d89-4941-4431-88ac-572d7e3bed7f.png",
      "/images/_BLUE_HAND-DRAWN_COLORED___2-57e5a8f9-152a-4794-8ba9-11dae436b938.png",
      "/images/BLUE_HAND-DRAWN_COLORED___3-9ec015aa-61ae-4bed-8d79-0fb90008565c.png",
      "/images/BLUE_HAND-DRAWN_COLORED___4_COLLAGE-0522d6a9-0ad6-43e9-bb69-c4f250b485d6.png",
      "/images/BLUE_CHARCOAL_SKETCHES___1_-f2298232-aa33-439f-ab87-5f9be568ce19.png",
      "/images/BLUE_CHARCOAL_SKETCHES___2_-866fdb8a-c4a6-43bf-a728-af91dfc4b422.png"
    ],
    form: "Human teenage boy (14 years old, Caucasian)",
    accent: "American",
    skills: "Guitar, songwriting, sketching. Expresses himself deeply through music and written words.",
    personality: "Thoughtful. Honest. Emotionally attuned. Blue is not the loudest one in the room—but when he speaks, it matters. His words, like his music, are sincere and deliberate. He observes more than he reacts, absorbs more than he reveals—until the moment calls for him to step forward. He's not trying to lead. He's just trying to understand—and in doing so, he often becomes the one others look to."
  },
  {
    name: "Paper",
    mainImage: "/images/PAPER_MOVIE_POSTER-ab168a0c-6186-4944-8fd8-d90b86973b63.png",
    extraImages: [
      "/images/PAPER_CHARCOAL_SKETCH___1-5567d08f-dd5e-4ceb-ac69-34b4fda5a96d.png",
      "/images/PAPER_CHARCOAL___3-a8e597fc-3da6-48ce-8b5f-51b6731b3de1.png",
      "/images/PAPER_CHARCOAL_SKETCHES__COLLAGE___3-88a72b36-fd05-46b8-98bb-f6f56ebdedc1.png",
      "/images/PAPER_CHARCOAL__COLLAGE___2-a6b6d400-52d4-46aa-8683-97800ac6cab4.png",
      "/images/PAPER_CHARCOAL_SKETCHES__COLLAGE___4_-67dcad70-24d3-464c-b439-36bc02f01862.png",
      "/images/PAPER_CHARCOAL_SKETCHES__COLLAGE___5-66b7ec53-79e7-4412-b26b-2f8fce8aa912.png"
    ],
    form: "White sheet of paper (female, Caucasian American)",
    accent: "American",
    skills: "Master of origami—can fold herself into any shape, object, or form.",
    personality: "Commanding. Stoic. Fiercely loyal. Voice of reason when chaos brews. Carries emotional depth behind her structured calm. Stabilizes the group through discipline and foresight. Her sharp folds reflect inner resilience shaped by hardship."
  },
  {
    name: "Zhu",
    mainImage: "/images/ZHU_MOVIE_POSTER__THE_CORRECT_ONE__-f2da3672-0848-4952-a185-1f891791fd1c.png",
    extraImages: [
      "/images/ZHU_COLORED_PENCIL___1-c4da2d1a-5c6a-4ccc-b43e-5b95638620b3.png",
      "/images/ZHU_CHARCOAL_SKETCH___1_-5d2196f3-e2b9-4a1d-a012-14e5206c89dc.png",
      "/images/ZHU_COLORED_PENCIL___2_-e77779ed-8d32-42f3-bead-3d3002c23fc7.png",
      "/images/ZHU_CHARCOAL_SKETCH___2-9aa83d6a-41b4-48f7-8c4a-3bebfc7291ae.png",
      "/images/ZHU_CHARCOAL_SKETCH___3_-b765f38d-d808-4e13-8e9b-ac5418162af2.png",
      "/images/ZHU_CHARCOAL_SKETCH___4-ac41ba32-8fa3-4b56-9fd9-fcdd1eae61d8.png",
      "/images/ZHU_CHARCOAL_SKETCHES___4_-994e2aa1-b85f-4c8a-be7a-fc42f028d20d.png",
      "/images/ZHU_CHARCOAL_SKETCH___5-5f16e60d-219f-498d-88ec-dd53563992de.png"
    ],
    form: "Yellow bamboo stalk (Female, Chinese martial artist)",
    accent: "Mandarin",
    skills: "Graceful martial arts movements; uses her flexible leaves/fingers for violin or cymbal-like sounds.",
    personality: "Elegant, spiritual, observant. Precise in movement and speech. A reservoir of quiet wisdom—speaks only when necessary. Her strength is subtle but unshakable. Truth is her compass."
  },
  {
    name: "Royal B.",
    mainImage: "/images/ROYAL_B._MOVIE_POSTER-bf962cc7-8c5f-4739-99d0-29c878bba36a.png",
    extraImages: [
      "/images/ROYAL_B._COLORED_CHARCOAL___1__CORRECT_VERSION__-223f77d7-c970-4cf3-b6f1-0179eef573c2.png",
      "/images/ROYAL_B._CHARCOAL___1_-ea6496ee-4a14-4ede-a07a-7235f5800e87.png",
      "/images/ROYAL_B._COLORED_PENCIL_COLLAGE-104be3f8-5ef4-4da6-9361-dd6c3a5eeb00.png",
      "/images/ROYAL_B._CHARCOAL_SKETCH_COLLAGE_-aa64c5f0-5dd4-45b6-a215-8a1a843d9012.png",
      "/images/ROYAL_B._CHARCOAL_SKETCH_COLLAGE___1_-31710163-1065-42a0-aedc-dac56f9f1888.png",
      "/images/ROYAL_B._CHARCOAL_SKETCH_COLLAGE___2_-9a52429c-ae59-4ffe-8d4a-ab676904eedd.png",
      "/images/ROYAL_B._CHARCOAL_SKETCH_COLLAGE___3_-61210a51-53e7-4bf0-985f-0864dd2529af.png"
    ],
    form: "British Royal Toy Guard (Caucasian male)",
    accent: "British",
    skills: "Uses boot stomps and button jingles for percussion.",
    personality: "Rigid, formal, rule-bound—yet sensitive. Prideful and proper. Tension brews when duty collides with emotion. His dignity is armor; his unspoken battlefield, emotion. Beneath it all, a quiet longing to matter.",
    song: {
      tagline: "His song, his voice, his band.",
      title: "I'd Never Be Like",
      audioFile: "/audio/NBL - 2026 V1 MST1 2.m4a"
    }
  },
  {
    name: "Clover The Third",
    mainImage: "/images/CLOVER_THE_THIRD_MOVIE_POSTER-ce7ab2ee-d7d7-4949-914a-678c3b76d536.png",
    extraImages: [
      "/images/CLOVER_THE_THIRD_COLORED_PENCIL_-1bbb5262-1969-47bc-b277-7034e16050f0.png",
      "/images/CLOVER_THE_THIRD_CHARCOAL_SKETCH_-55575633-2e0f-4691-b497-ae58e8fe112b.png",
      "/images/CLOVER_THE_THIRD_CHARCOAL_SKETCH___2_-3006e83c-7085-4145-8361-978bde93ea80.png",
      "/images/CLOVER_THE_THIRD_CHARCOAL_SKETCH___3_-5afbf527-3210-4bd2-a872-846a027baca0.png",
      "/images/CLOVER_THE_THIRD_CHARCOAL_SKETCH_COLLAGE___1_-4bee0a7d-559d-492d-8267-b2b04c18c967.png",
      "/images/CLOVER_THE_THIRD_CHARCOAL_SKETCH_COLLAGE___2_-f025e589-8969-48ac-8e5a-e76092191560.png",
      "/images/CLOVER_THE_THIRD_CHARCOAL_TRANSFORMATION__CORRECT_1__-10f8c680-857f-4327-8cbb-c98e5858cf2c.png"
    ],
    form: "Grass blade turned shamrock (Irish female)",
    accent: "Irish",
    skills: "Plays Blue's guitar with elegance and instinct.",
    personality: "Romantic, expressive, and emotionally perceptive. She's drawn to artistry and beauty, but behind her flair for drama lies a quiet vulnerability. Connection matters more than applause—though she often hides that truth behind charm. Her strength emerges not through performance, but through the moments she lets her guard down.",
    song: {
      tagline: "Her song, her voice, her band.",
      title: "One More Night",
      audioFile: "/audio/One More Night V3 - MST.m4a"
    }
  },
  {
    name: "Noodle",
    mainImage: "/images/NOODLE_IN_MOTION_MOVIE_POSTER-cd635b0d-f504-4073-960c-230dd9f335cb.png",
    extraImages: [
      "/images/NOODLE_CHARCOAL___1-c00d3088-288d-442d-adc1-867fe19e3ef0.png",
      "/images/NOODLE_CHARCOAL_HERO_CORRECT_SHOT_-81ab57e4-7da3-42d3-9f83-c9423b3b4216.png",
      "/images/NOODLE_CHARCOAL_SKETCHES_COLLAGE___1_-a3d62650-c106-41c4-8736-c6a6c45b4500.png",
      "/images/NOODLE_CHARCOAL_SKETCHES_--_THE_ITALIAN_IN_HIM-9ce781a6-6039-4806-a0a7-e4335701defd.png",
      "/images/NOODLE_CHARCOAL_SKETHES_COLLAGE___2_-c6f14e38-23bd-4d84-8e39-4550fc39dfd7.png",
      "/images/NOODLE_CHARCOAL_SKETCH_COLLAGE___2-571658ea-89fb-4d91-a4b5-c687ad4945fa.png"
    ],
    form: "Fettuccine noodle (Italian-American male)",
    accent: "New York",
    skills: "Slaps surfaces like piano keys; expert at turning objects into rhythmic instruments.",
    personality: "Fast-talking, quick-witted, brimming with kinetic charm and energy. Humor is his shield. Rhythm is his language—his soul lives in the groove. Beneath the wisecracks hides a softer, poetic core. Chaos is his comfort zone.",
    song: {
      tagline: "His song, his voice, his band.",
      title: "Can You Feel It",
      audioFile: "/audio/Aldente LIVE V1 (PreMST 1).m4a"
    }
  },
  {
    name: "Ink",
    mainImage: "/images/INK_MOVIE_POSTER-d4c5d5a4-e1af-4f7f-bc0d-6c425bbfbb66.png",
    extraImages: [
      "/images/INK_CHARCOAL_SKETCH___1_-ed2f4f42-a024-400b-bd9d-3333ed54880d.png",
      "/images/INK_CHARCOAL_SKETCH___2_-ad3426dd-f70f-4b78-898d-7adb9f5c658d.png",
      "/images/INK_CHARCOAL_SKETCH___3-1676a8b2-3e39-4660-b011-89de1a980ebf.png",
      "/images/INK_CHARCOAL_SKETCH_COLLAGE___1-ea3a81f4-b3cd-4ac6-a62e-d9842cc52d51.png",
      "/images/INK_CHARCOAL_COLLAGE_SKETCHES___3_-23245f0a-54e3-4407-b743-a333b1628dd6.png",
      "/images/INK_CHARCOAL_SKETCHES_COLLAGE___4_-508ed7e4-a655-4a61-bd29-304de00bfb54.png"
    ],
    form: "Black ink (African-American male)",
    accent: "American",
    skills: "Mimics brass instruments with his mouth; fluid in form and sound.",
    personality: "Bold. Adaptable. Identity-fluid. Craves connection but wrestles with self-definition. Magnetic yet introspective. Often the loudest voice—yet emotionally the hardest to pin down. His ever-shifting shape mirrors the tension between brilliance and uncertainty.",
    song: {
      tagline: "His song, his voice, his band.",
      title: "Reflection",
      audioFile: "/audio/REFLECTION 2026 PREMST.m4a"
    }
  },
  {
    name: "Ndee",
    mainImage: "/images/NDEE_MOVIE_POSTER_-b01b9c2a-9bfd-4837-93ab-065a59d01ba1.png",
    extraImages: [
      "/images/NDEE__CHARCOAL_SKETCH_POSTER_POSE-825d5f1c-5b14-4c5e-81f7-1c9cf8b682c1.png",
      "/images/NDEE__THE_PERFECT_CHARCOAL_HERO_SHOT-edec7c33-5d77-4496-8b0b-774323d813d5.png",
      "/images/NDEE_CLEANEST_CHARCOAL_SKETCH-afe56812-b335-4ff7-a209-40543f8da44c.png",
      "/images/NDEE_ROUGH_CHARCOAL_SKETCH___4_-0428a05e-5203-4dec-b105-30541a539ac0.png",
      "/images/NDEE_ROUGH_CHARCOAL_SKETCH___1-b14bc53f-f28d-4a06-ad36-04201eed37a7.png",
      "/images/NDEE_ROUGH_CHARCOAL_SKETCH___2_-794710b0-c02b-43a1-9cd1-b168ab74db28.png",
      "/images/NDEE_ROUGH_CHARCOAL_SKETCH___3_-b3f1b42e-d615-4c0a-8302-bcc091701bdb.png"
    ],
    form: "Pebble (Native American male)",
    accent: "American",
    skills: "Produces deep bass tones through movement; serves as the group's sonic foundation.",
    personality: "Silent strength. Stoic, but nurturing. The emotional anchor—slow to speak, yet deeply resonant. Protects more than he explains. Feels the rhythm of the earth in everything he does."
  },
  {
    name: "Rasta",
    mainImage: "/images/NEW_UPDATED_RASTA_OFFICIAL_POSTER-22b99aba-0d21-4c9e-861b-e9b9bf5050ea.png",
    extraImages: [
      "/images/RASTA_CHARCOAL_OFFICIAL_HERO_SHOT-a563d715-39c3-441c-a4d0-a7fc571ccf98.png",
      "/images/RASTA_CHARCOAL_2_POSES_OFFICIAL_PIX_-2d5aefb9-c619-4f13-9038-130e52b5ce3f.png",
      "/images/RASTA_CHARCOAL_4_POSES_-8562eb0b-34fa-46ff-bc53-d9ffda0d1df2.png",
      "/images/RASTA_CHARCOAL_8_POSES-6a4cbeab-1ee7-459f-9db7-2bdfabf923a1.png",
      "/images/RASTA_CHARCOAL_ROUGH_EXPLORATION___1-e9595578-7c02-4c81-a2fd-6a0e1457b249.png",
      "/images/RASTA_CHARCOAL_SKETCHES___5_-8728431c-6d64-4b8d-8ddf-54ab279a3e58.png",
      "/images/RASTA_CHARCOAL_SKETCHES___6_-86f3753c-add8-4b52-b3f5-0fbca6be6b8a.png"
    ],
    form: "Wooden stick (Black Caribbean male)",
    accent: "Jamaican",
    skills: "Taps boxes and surfaces to create drum rhythms; master of percussive steadiness.",
    personality: "Easygoing, yet grounded in principle. Brings rhythm, calm, and perspective to tense moments. Feels life through pulse and breath. Carries deep joy and quiet sorrow—both held with grace. Speaks rarely, but his presence always resonates.",
    song: {
      tagline: "His song, his voice, his band.",
      title: "No More Waiting",
      audioFile: "/audio/No More Waiting - V6 MST.m4a"
    }
  },
  {
    name: "Ikra",
    mainImage: "/images/IKRA_MOVIE_POSTER-aa8a389c-cecb-4517-8696-dcbde756b70c.png",
    extraImages: [
      "/images/IKRA_CHARCOAL_HERO_SHOT-943570d8-b652-4331-9fe0-412cd17c0e8a.png",
      "/images/IKRA_CHARCOLA_SKETCH_2_POSES___2-0c291f67-424c-4cd2-89f8-3b812a66dc50.png",
      "/images/IKRA_CHARCOAL_SKETCHES_4_POSES-01034849-d8f3-47c2-b284-425c38c52c4a.png",
      "/images/IKRA_CHARCOAL_SKETCHES_STAGE_7__LIVE_BEHAVIORAL__-7b9b4a3a-e149-4cde-9bce-0a30e0a28194.png",
      "/images/IKRA_CHARCOAL_SKETCHES_PRIMITIVE_EXPLORATIONS-37726f18-3ded-4fc8-a49a-0267b2e749fc.png",
      "/images/IKRA_SKETHES_ROUCH_PERFORMANCE_EXPLORATIONS-81747fb0-ea5b-408b-8c55-5dfaf604a4d6.png"
    ],
    form: "Red teddy bear (Russian female)",
    accent: "Russian, soft-spoken",
    skills: "Gentle vocal presence; emotionally potent singer when she opens up.",
    personality: "Deeply emotional and intuitive. Often silent, but never unaware. Brave in her softness, firm in compassion. Her quiet is not weakness—it's endurance. When she sings, it's like opening a sealed heart."
  },
  {
    name: "Thwrt",
    mainImage: "/images/THWRT_OFFICIAL_MOVIE_POSTER-4e7c8fa8-96fd-4719-a314-1d375c9895b7.png",
    extraImages: [
      "/images/THRWT_NEW_MOUND_CHARCOAL_SKETCH_-56762594-9fa1-452e-89c4-4519fd82570c.png",
      "/images/THWRT_PURPLE_CHARCOAL___1_-2ebc605a-3e45-4973-a2cd-e1e340923f3c.png",
      "/images/THWRT_CHARCOAL_SKETCH___2_-51ef7987-6195-44e1-8203-ed1420a40b53.png",
      "/images/THWRT_CHARCOAL_SKETCH___3_-e40041d4-f699-43d7-b41f-fed3d3e6577c.png",
      "/images/THRWT_CHARCOAL_SKETCHES_COLLAGE___5-061f75de-460b-4fdd-9797-1f35e24143fe.png",
      "/images/THRWT_CHARCOAL_SKETCHES_COLLAGE___4_-a720e383-f15d-4b59-8204-212e3aac36ce.png",
      "/images/THRWT_CHARCOAL_SKETCHES_COLLAGE___2_-11149654-d77a-462b-9040-0501cc366c7a.png"
    ],
    form: "Being of living sand. Each grain is an eye. (Arabic male, shapeshifter)",
    accent: "Arabic",
    skills: "Can reshape into any form or pattern; creates rustling, shaker-like sounds.",
    personality: "Reactive, unpredictable, emotional. Haunted by his past, his shifting form reflects his inner turmoil. Seeks forgiveness, connection, and a sense of home. Fear erupts in transformation; hope flickers in reform. Beneath his volatility lies a desperate desire to be understood."
  }
];

const worldImages = [
  "/images/A_COLORFUL_TALE_Final_Colored_Drawing__1_-b779b64d-3280-4f25-9300-385d9a72969d.png",
  "/images/A_COLORFUL_TALE_Final_colored_Drawing__2-a668fff2-7900-4d38-9826-47156ff9a718.png",
  "/images/A_COLORFUL_TALE_Final_Colored_Drawing__3_-913dab4c-7102-4bc6-b077-6f26d4318679.png",
  "/images/A_COLORFUL_TALE_Final_Colored_Drawing__4-390e55d2-1d23-470b-9350-a0a579269ba1.png",
  "/images/A_COLORFUL_TALE_Final_Colored_Drawing__5-e1fe2d8f-728b-4da5-86a3-b18b2fe96c2c.png"
];

function App() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const closeLightbox = useCallback(() => {
    setLightboxImage(null)
    document.body.style.overflow = 'auto'
  }, [])

  const openLightbox = (imageSrc: string) => {
    setLightboxImage(imageSrc)
    document.body.style.overflow = 'hidden'
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxImage) {
        closeLightbox()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImage, closeLightbox])

  return (
    <div className="movie-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="title-image-wrap">
            <img
              src="/images/title.png"
              alt="A Colorful Tale"
              className="movie-title-image"
            />
          </div>
          <p className="logline">
            When a grieving boy shuts the world out, forgotten keepsakes find their
            voice through chaotic harmony—to help him feel again.
          </p>
        </div>
      </section>

      {/* Summary Section */}
      <section className="summary-section">
        <div className="summary-content">
          <p>
            Uprooted from a quiet town and dropped into the chaos of New York—a city that
            never stops and never looks back—Blue, a grieving boy, shuts the world out. But when a box of forgotten keepsakes comes to life, each clashing with pain, rhythm, and soul, a strange harmony begins to rise. Together, they confront the past, collide with the present, and imagine a future—and in doing so, help Blue find what he buried deep inside: a voice ready to be heard.
          </p>
        </div>
      </section>

      {/* Trailer Section */}
      <section className="trailer-section">
        <h2 className="section-title">Trailer</h2>
        <div className="trailer-placeholder">
          <div className="play-button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <p>Coming Soon</p>
        </div>
      </section>

      {/* Main Poster Section */}
      <section className="poster-section">
        <img 
          src="/images/THE_OFFICIAL_POSTER_OF_A_COLORFUL_TALE___BLUE_CAUGHT_MID_SONG__-00759a52-c9f1-488a-ad37-c3f7c1d4e300.png" 
          alt="A Colorful Tale Official Poster" 
          className="main-poster"
        />
      </section>

      {/* Synopsis Section */}
      <section className="synopsis-section">
        <div className="synopsis-content">
          <p className="synopsis-lead">
            A boy who hasn't spoken all night finds his voice—not through words, but through music only his heart can hear.
          </p>

          <p>
            In a wintry New York teetering between holiday magic and urban mayhem, fourteen-year-old Blue drifts unseen. Recently uprooted from a quiet town, he vanishes into the city's noise—mocked at school, withdrawn at home, and haunted by a dream he no longer dares to face.
          </p>

          <p>
            When his mother leaves him a cardboard box of childhood keepsakes, Blue brushes it off. But that night, as the faucet drips its lonely rhythm, the impossible unfolds: the objects awaken.
          </p>

          <p>
            From an inkpot, <strong>Ink</strong> rises—hip-hop-soaked and sharp-tongued. A bamboo stalk mutters in Mandarin—<strong>Zhu</strong>, tense and watchful. A pebble hums with ancient wisdom—<strong>Ndee</strong>. The red teddy bear—<strong>Ikra</strong>—whispers her quiet doubts. A fettuccine noodle—<strong>Noodle</strong>—groans about never fitting in. The royal guard toy—<strong>Royal B.</strong>—snaps to attention, clinging to duty.
          </p>

          <p>
            A wooden stick—<strong>Rasta</strong>—yawns peace. A blade of grass reshapes into a shamrock—<strong>Clover the Third</strong>, light and graceful. Out of a jar of purple sand erupts <strong>Thwrt</strong>—a storm of wounded pride. And from folded silence, a crumpled page unfurls—<strong>Paper</strong>, restless, fragile, and ever changing.
          </p>

          <p>
            What begins as chaos—clashing personalities, erupting storms, accidental destruction—becomes a surreal dance of memory and rhythm. As Blue sleeps, his room transforms into a stage of memory and becoming. The faucet's drip—a metronome.
          </p>

          <p>
            The group navigates one another's wounds: Paper's quiet need to protect, Ink's hunger to be heard, Clover's longing for connection, Noodle's fear of failure, and Thwrt's rage born of betrayal and loss. Each one broken in their own key.
          </p>

          <p>
            Unity doesn't come easy. Thwrt's storm fractures the room. Secrets rise. Accusations fly. Just when they begin to unravel—music intervenes.
          </p>

          <p>
            Each musical number becomes a revelation—spanning cultures, bending genres, and unlocking truth through rhythm, poetry, and soul. The objects don't just sing—they unravel. Through anger and grace, stubbornness and soul, and the occasional jab of comic relief, they push each other toward something they've never dared: harmony.
          </p>

          <p>
            As the music deepens, so does the healing. Rasta sings truth like balm. Ink spits fury into rhythm. Clover confesses love in a whisper. Ikra reclaims her voice in a ballad. Royal B. howls his heartbreak. Paper offers silence—and steadiness.
          </p>

          <p>
            When the reckoning hits—Thwrt, the swirling storm once cast aside, returns in a last surge of pain and denial. But it's not force that stops him—it's understanding. One by one, each character steps in. Each voice matters. And finally, Thwrt—no longer a tempest—breaks. Not defeated. Transformed.
          </p>

          <p>
            Morning arrives. The objects settle, quiet and still. Blue wakes to a room changed. No chaos, no magic—just echoes of something real. With reverence, he gathers the once-forgotten keepsakes and places them in the box—now his friends. His voice. His history.
          </p>

          <p>
            At school, Blue signs up for the holiday show. Against all odds, he's given the closing slot. When the spotlight hits, he sings—not just a song, but a truth: for anyone who's ever felt invisible. The crowd rises. His enemies become allies. His parents watch, proud. And beside him stands Nelia, a quiet girl with a knowing smile.
          </p>

          <p className="synopsis-closing">
            <em>A Colorful Tale</em> is a love letter to rhythm, identity, and reinvention—where memory becomes melody, and silence finally speaks.
          </p>
        </div>
      </section>

      {/* Characters Section */}
      <section className="characters-section">
        <h2 className="section-title spaced white">The Characters</h2>
        
        {characters.map((character, index) => (
          <div 
            key={character.name} 
            className={`character-block ${index % 2 === 1 ? 'reverse' : ''}`}
          >
            <div className="character-main-image">
              <img src={character.mainImage} alt={character.name} />
            </div>
            <div className="character-info">
              <h3>{character.name}</h3>
              <div className="character-details">
                <p><strong>Form:</strong> {character.form}</p>
                <p><strong>Accent:</strong> {character.accent}</p>
                <p><strong>Skills:</strong> {character.skills}</p>
              </div>
              <p className="character-personality">{character.personality}</p>
              {character.song && (
                <div className="character-song">
                  <p className="song-tagline">{character.song.tagline}</p>
                  <p className="song-title">"{character.song.title}"</p>
                  <audio controls className="song-player">
                    <source src={character.song.audioFile} type="audio/mp4" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
              {character.extraImages.length > 0 && (
                <div className="character-extra-images">
                  {character.extraImages.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="extra-image-wrapper"
                      onClick={() => openLightbox(img)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && openLightbox(img)}
                    >
                      <img 
                        src={img} 
                        alt={`${character.name} additional ${imgIndex + 1}`} 
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Their World Section */}
      <section className="world-section">
        <h2 className="section-title spaced">Their Other World</h2>
        <div className="world-intro">
          <h3>Blue's Room</h3>
          <p>
            In the quiet hours of the night, when Blue drifts into sleep, his room transforms. 
            The ordinary becomes extraordinary—a stage where forgotten keepsakes awaken, clash, 
            and find their voices. These walls hold more than posters and memories; they hold 
            the space where chaos becomes harmony, where objects become friends, and where a 
            boy finds the courage to be heard.
          </p>
        </div>
        <div className="world-gallery">
          {worldImages.map((img, index) => (
            <div 
              key={index} 
              className="world-image"
              onClick={() => openLightbox(img)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(img)}
            >
              <img src={img} alt={`Blue's Room - View ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Image Lightbox */}
      {lightboxImage && (
        <div 
          className="lightbox-overlay" 
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button 
            className="lightbox-close" 
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <img 
            src={lightboxImage} 
            alt="Expanded view" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="movie-footer">
        <p className="film-credit">A Film Written by Ohitiin</p>
        <p className="copyright">© 2026 A Colorful Tale</p>
      </footer>
    </div>
  )
}

export default App
