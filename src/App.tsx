import { useState, useEffect, useCallback } from 'react'
import './App.css'

const characters = [
  {
    name: "Blue",
    mainImage: "/images/BLUE_WITH_HIS_GUITAR-14d78a96-560e-4c3f-a529-9e79d80c7f13.png",
    extraImages: [],
    form: "Human teenage boy (14 years old, Caucasian)",
    accent: "American",
    skills: "Guitar, songwriting, sketching. Expresses himself deeply through music and written words.",
    personality: "Thoughtful. Honest. Emotionally attuned. Blue is not the loudest one in the room—but when he speaks, it matters. His words, like his music, are sincere and deliberate. He observes more than he reacts, absorbs more than he reveals—until the moment calls for him to step forward. He's not trying to lead. He's just trying to understand—and in doing so, he often becomes the one others look to."
  },
  {
    name: "Paper",
    mainImage: "/images/PAPER_MOVIE_POSTER-ab168a0c-6186-4944-8fd8-d90b86973b63.png",
    extraImages: ["/images/PAPER_copy-18bf1cb9-273e-4b16-980f-8ca4b61b9198.png"],
    form: "White sheet of paper (female, Caucasian American)",
    accent: "American",
    skills: "Master of origami—can fold herself into any shape, object, or form.",
    personality: "Commanding. Stoic. Fiercely loyal. Voice of reason when chaos brews. Carries emotional depth behind her structured calm. Stabilizes the group through discipline and foresight. Her sharp folds reflect inner resilience shaped by hardship."
  },
  {
    name: "Zhu",
    mainImage: "/images/ZHU_MOVIE_POSTER__THE_CORRECT_ONE__-f2da3672-0848-4952-a185-1f891791fd1c.png",
    extraImages: ["/images/ZHU-5b5bd017-979d-4a73-bf1a-e727c804487f.png"],
    form: "Yellow bamboo stalk (Female, Chinese martial artist)",
    accent: "Mandarin",
    skills: "Graceful martial arts movements; uses her flexible leaves/fingers for violin or cymbal-like sounds.",
    personality: "Elegant, spiritual, observant. Precise in movement and speech. A reservoir of quiet wisdom—speaks only when necessary. Her strength is subtle but unshakable. Truth is her compass."
  },
  {
    name: "Royal B.",
    mainImage: "/images/ROYAL_B._MOVIE_POSTER-bf962cc7-8c5f-4739-99d0-29c878bba36a.png",
    extraImages: ["/images/ROYAL_B.-58aacc17-4203-4567-9cbf-59993e2c010e.png"],
    form: "British Royal Toy Guard (Caucasian male)",
    accent: "British",
    skills: "Uses boot stomps and button jingles for percussion.",
    personality: "Rigid, formal, rule-bound—yet sensitive. Prideful and proper. Tension brews when duty collides with emotion. His dignity is armor; his unspoken battlefield, emotion. Beneath it all, a quiet longing to matter."
  },
  {
    name: "Clover The Third",
    mainImage: "/images/CLOVER_THE_THIRD_MOVIE_POSTER-ce7ab2ee-d7d7-4949-914a-678c3b76d536.png",
    extraImages: ["/images/CLOVER_THE_THIRD-ee6b7bc4-05fc-4aae-8659-9e63d48cf263.png"],
    form: "Grass blade turned shamrock (Irish female)",
    accent: "Irish",
    skills: "Plays Blue's guitar with elegance and instinct.",
    personality: "Romantic, expressive, and emotionally perceptive. She's drawn to artistry and beauty, but behind her flair for drama lies a quiet vulnerability. Connection matters more than applause—though she often hides that truth behind charm. Her strength emerges not through performance, but through the moments she lets her guard down."
  },
  {
    name: "Noodle",
    mainImage: "/images/NOODLE_IN_MOTION_MOVIE_POSTER-cd635b0d-f504-4073-960c-230dd9f335cb.png",
    extraImages: ["/images/NOODLE-b0ed5502-8258-4121-8968-0f90fa85738f.png"],
    form: "Fettuccine noodle (Italian-American male)",
    accent: "New York",
    skills: "Slaps surfaces like piano keys; expert at turning objects into rhythmic instruments.",
    personality: "Fast-talking, quick-witted, brimming with kinetic charm and energy. Humor is his shield. Rhythm is his language—his soul lives in the groove. Beneath the wisecracks hides a softer, poetic core. Chaos is his comfort zone."
  },
  {
    name: "Ink",
    mainImage: "/images/INK_MOVIE_POSTER-d4c5d5a4-e1af-4f7f-bc0d-6c425bbfbb66.png",
    extraImages: ["/images/INK-152714e1-ca80-4573-80ea-6f508a150f31.png"],
    form: "Black ink (African-American male)",
    accent: "American",
    skills: "Mimics brass instruments with his mouth; fluid in form and sound.",
    personality: "Bold. Adaptable. Identity-fluid. Craves connection but wrestles with self-definition. Magnetic yet introspective. Often the loudest voice—yet emotionally the hardest to pin down. His ever-shifting shape mirrors the tension between brilliance and uncertainty."
  },
  {
    name: "Ndee",
    mainImage: "/images/NDEE_MOVIE_POSTER_-b01b9c2a-9bfd-4837-93ab-065a59d01ba1.png",
    extraImages: ["/images/THIS_IS_NDEE_copy-23828a9c-0e77-450c-aac0-5add89158a88.png"],
    form: "Pebble (Native American male)",
    accent: "American",
    skills: "Produces deep bass tones through movement; serves as the group's sonic foundation.",
    personality: "Silent strength. Stoic, but nurturing. The emotional anchor—slow to speak, yet deeply resonant. Protects more than he explains. Feels the rhythm of the earth in everything he does."
  },
  {
    name: "Rasta",
    mainImage: "/images/RASTA_MOVIE_POSTER-3517dbc5-e00b-47c9-a48a-a42f8fde64ad.png",
    extraImages: ["/images/RASTA_copy-c83de4cf-5e48-4fda-8db3-6a68d5bb5acc.png"],
    form: "Wooden stick (Black Caribbean male)",
    accent: "Jamaican",
    skills: "Taps boxes and surfaces to create drum rhythms; master of percussive steadiness.",
    personality: "Easygoing, yet grounded in principle. Brings rhythm, calm, and perspective to tense moments. Feels life through pulse and breath. Carries deep joy and quiet sorrow—both held with grace. Speaks rarely, but his presence always resonates."
  },
  {
    name: "Ikra",
    mainImage: "/images/IKRA_MOVIE_POSTER-aa8a389c-cecb-4517-8696-dcbde756b70c.png",
    extraImages: ["/images/IKRA-7f50ca29-5a7b-4d41-9d3f-e1023ba7f186.png"],
    form: "Red teddy bear (Russian female)",
    accent: "Russian, soft-spoken",
    skills: "Gentle vocal presence; emotionally potent singer when she opens up.",
    personality: "Deeply emotional and intuitive. Often silent, but never unaware. Brave in her softness, firm in compassion. Her quiet is not weakness—it's endurance. When she sings, it's like opening a sealed heart."
  },
  {
    name: "Thwrt",
    mainImage: "/images/THWRT_OFFICIAL_MOVIE_POSTER-4e7c8fa8-96fd-4719-a314-1d375c9895b7.png",
    extraImages: ["/images/THWRT_2_-5a94fe39-a4e5-494f-b3dc-7c3b72dd4be4.png"],
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
          <h1 className="movie-title">A Colorful Tale</h1>
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
              {character.extraImages.length > 0 && (
                <div className="character-extra-images">
                  {character.extraImages.map((img, imgIndex) => (
                    <img 
                      key={imgIndex} 
                      src={img} 
                      alt={`${character.name} additional`} 
                    />
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
