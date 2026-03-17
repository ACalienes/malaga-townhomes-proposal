/**
 * CSS-based iPad mockup with multiple screens showing what each feature
 * of the interactive deck would look like. Accepts an `activeScreen` prop
 * to switch between feature previews.
 *
 * Screens: 'rooms' | 'specs' | 'floorplan' | 'brand' | 'photos'
 */
import { motion, AnimatePresence } from 'framer-motion'

const rooms = ['Living Room', 'Kitchen', 'Master Suite', 'Rooftop']

const SCREENS = {
  rooms: RoomScreen,
  specs: SpecsScreen,
  floorplan: FloorPlanScreen,
  brand: BrandScreen,
  photos: PhotosScreen,
}

export default function IPadMockup({ activeScreen = 'rooms' }) {
  const ScreenComponent = SCREENS[activeScreen] || SCREENS.rooms

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      margin: '0 auto',
      perspective: '800px',
    }}>
      {/* iPad shell */}
      <div style={{
        background: '#1a1a1a',
        borderRadius: '18px',
        padding: '14px 12px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
        transform: 'rotateX(2deg)',
      }}>
        {/* Screen */}
        <div style={{
          background: '#0a0a0a',
          borderRadius: '6px',
          overflow: 'hidden',
          aspectRatio: '4 / 3',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}>
          {/* Top bar - always visible */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderBottom: '1px solid #2a2a28',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '9px',
              fontWeight: 700,
              color: '#c9a96e',
              letterSpacing: '0.08em',
            }}>
              MALAGA TOWNHOMES
            </div>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '7px',
              color: '#8a8a82',
              letterSpacing: '0.05em',
            }}>
              628 MALAGA AVE
            </div>
          </div>

          {/* Screen content with crossfade */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreen}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}
              >
                <ScreenComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Subtle reflection */}
      <div style={{
        position: 'absolute',
        bottom: '-8px',
        left: '10%',
        right: '10%',
        height: '8px',
        background: 'linear-gradient(to bottom, rgba(201,169,110,0.04), transparent)',
        borderRadius: '0 0 8px 8px',
        filter: 'blur(4px)',
      }} />
    </div>
  )
}

/* ─── Room-by-Room Navigation Screen ─── */
function RoomScreen() {
  return (
    <>
      {/* Room tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #2a2a28' }}>
        {rooms.map((room, i) => (
          <div key={i} style={{
            flex: 1, padding: '6px 4px', textAlign: 'center',
            fontFamily: 'var(--font-body)', fontSize: '6px',
            fontWeight: i === 0 ? 700 : 500,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: i === 0 ? '#c9a96e' : '#8a8a82',
            borderBottom: i === 0 ? '1px solid #c9a96e' : '1px solid transparent',
          }}>
            {room}
          </div>
        ))}
      </div>

      {/* Content: image + side specs */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Rendering image */}
        <div style={{ flex: 1.2, position: 'relative', overflow: 'hidden' }}>
          <img
            src="/images/rendering-living.jpg"
            alt=""
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              opacity: 0.85,
            }}
          />
          {/* Room label overlay */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '12px 10px 6px',
            background: 'linear-gradient(to top, rgba(10,10,10,0.9), transparent)',
          }}>
            <div style={{
              fontFamily: 'var(--font-heading)', fontSize: '10px',
              fontWeight: 700, color: '#ffffff', letterSpacing: '0.02em',
            }}>
              Living Room
            </div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '5.5px',
              color: '#a8a8a0', marginTop: '1px',
            }}>
              Level 2 · 24' × 18' · 432 SF
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div style={{
          flex: 0.7, borderLeft: '1px solid #2a2a28',
          padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '5.5px', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c9a96e',
          }}>
            MATERIALS
          </div>
          {[
            { label: 'Flooring', value: 'White Oak Hardwood' },
            { label: 'Windows', value: 'Impact-Rated Bronze' },
            { label: 'Ceiling', value: "10' Poured Concrete" },
          ].map((s, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(42,42,40,0.6)', paddingBottom: '3px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '5px', color: '#8a8a82', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {s.label}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '6px', color: '#ffffff', fontWeight: 500 }}>
                {s.value}
              </div>
            </div>
          ))}
          {/* Floor selector */}
          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '5px', color: '#8a8a82', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '3px' }}>
              FLOOR
            </div>
            <div style={{ display: 'flex', gap: '3px' }}>
              {['1', '2', '3'].map((f, i) => (
                <div key={i} style={{
                  width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: '6px', fontWeight: 700,
                  color: i === 1 ? '#0a0a0a' : '#8a8a82',
                  background: i === 1 ? '#c9a96e' : 'transparent',
                  border: i === 1 ? 'none' : '1px solid #2a2a28',
                }}>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Specification Panels Screen ─── */
function SpecsScreen() {
  const categories = [
    { name: 'STRUCTURAL', active: true },
    { name: 'PLUMBING', active: false },
    { name: 'ELECTRICAL', active: false },
    { name: 'MECHANICAL', active: false },
  ]
  const specs = [
    { label: 'Foundation', value: 'Reinforced Concrete Slab', detail: 'Per Coral Gables code' },
    { label: 'Drywall', value: '5/8" Fire-Rated Type X', detail: 'All levels' },
    { label: 'Insulation', value: 'Closed-Cell Spray Foam', detail: 'R-38 roof, R-13 walls' },
    { label: 'Windows', value: 'Impact-Rated Full Height', detail: 'Bronze finish, NOA approved' },
    { label: 'Framing', value: 'CBS Block + Steel', detail: 'Hurricane-rated structure' },
  ]

  return (
    <>
      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #2a2a28' }}>
        {categories.map((cat, i) => (
          <div key={i} style={{
            flex: 1, padding: '6px 4px', textAlign: 'center',
            fontFamily: 'var(--font-body)', fontSize: '5.5px', fontWeight: cat.active ? 700 : 500,
            letterSpacing: '0.08em', color: cat.active ? '#c9a96e' : '#8a8a82',
            borderBottom: cat.active ? '1px solid #c9a96e' : '1px solid transparent',
          }}>
            {cat.name}
          </div>
        ))}
      </div>

      {/* Specs list */}
      <div style={{ flex: 1, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '6px', overflow: 'hidden' }}>
        <div style={{
          fontFamily: 'var(--font-heading)', fontSize: '11px',
          fontWeight: 700, color: '#ffffff', marginBottom: '2px',
        }}>
          Structural Systems
        </div>
        {specs.map((spec, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            padding: '4px 0', borderBottom: '1px solid rgba(42,42,40,0.5)',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '6.5px', color: '#ffffff', fontWeight: 600 }}>
                {spec.value}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '5px', color: '#8a8a82', marginTop: '1px' }}>
                {spec.detail}
              </div>
            </div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '5px', fontWeight: 700,
              color: '#c9a96e', letterSpacing: '0.06em', textTransform: 'uppercase',
              flexShrink: 0, marginLeft: '8px', marginTop: '1px',
            }}>
              {spec.label}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

/* ─── Floor Plan Explorer Screen ─── */
function FloorPlanScreen() {
  return (
    <>
      {/* Level tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #2a2a28' }}>
        {['LEVEL 1 · GROUND', 'LEVEL 2 · MAIN', 'LEVEL 3 · UPPER'].map((lvl, i) => (
          <div key={i} style={{
            flex: 1, padding: '6px 4px', textAlign: 'center',
            fontFamily: 'var(--font-body)', fontSize: '5.5px', fontWeight: i === 1 ? 700 : 500,
            letterSpacing: '0.06em', color: i === 1 ? '#c9a96e' : '#8a8a82',
            borderBottom: i === 1 ? '1px solid #c9a96e' : '1px solid transparent',
          }}>
            {lvl}
          </div>
        ))}
      </div>

      {/* Floor plan content */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Floor plan image */}
        <div style={{ flex: 1.3, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="/images/floor-plan-level2.jpg"
            alt=""
            style={{
              width: '90%', height: '90%',
              objectFit: 'contain',
              opacity: 0.9,
              filter: 'brightness(1.1)',
            }}
          />
          {/* Interactive hotspot indicators */}
          <div style={{
            position: 'absolute', top: '30%', left: '35%',
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#c9a96e', opacity: 0.8,
            boxShadow: '0 0 8px rgba(201,169,110,0.5)',
          }} />
          <div style={{
            position: 'absolute', top: '55%', left: '60%',
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#c9a96e', opacity: 0.5,
            boxShadow: '0 0 8px rgba(201,169,110,0.3)',
          }} />
        </div>

        {/* Room details panel */}
        <div style={{
          flex: 0.6, borderLeft: '1px solid #2a2a28',
          padding: '8px', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '5.5px', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '6px',
          }}>
            TAP A ROOM
          </div>
          {[
            { room: 'Living Room', sf: '432 SF' },
            { room: 'Kitchen', sf: '280 SF' },
            { room: 'Dining', sf: '196 SF' },
            { room: 'Terrace', sf: '340 SF' },
          ].map((r, i) => (
            <div key={i} style={{
              padding: '3px 0',
              borderBottom: '1px solid rgba(42,42,40,0.4)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '6px', color: i === 0 ? '#ffffff' : '#a8a8a0', fontWeight: i === 0 ? 600 : 400 }}>
                {r.room}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '5.5px', color: '#8a8a82' }}>
                {r.sf}
              </div>
            </div>
          ))}
          <div style={{ marginTop: 'auto' }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '7px', fontWeight: 700,
              color: '#ffffff', letterSpacing: '-0.01em',
            }}>
              1,248 SF
            </div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '5px', color: '#8a8a82',
              textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              LEVEL 2 TOTAL
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Brand Narrative Screen ─── */
function BrandScreen() {
  return (
    <>
      {/* Nav */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #2a2a28' }}>
        {['STORY', 'TEAM', 'LOCATION', 'VISION'].map((tab, i) => (
          <div key={i} style={{
            flex: 1, padding: '6px 4px', textAlign: 'center',
            fontFamily: 'var(--font-body)', fontSize: '5.5px', fontWeight: i === 0 ? 700 : 500,
            letterSpacing: '0.08em', color: i === 0 ? '#c9a96e' : '#8a8a82',
            borderBottom: i === 0 ? '1px solid #c9a96e' : '1px solid transparent',
          }}>
            {tab}
          </div>
        ))}
      </div>

      {/* Brand content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Hero image area */}
        <div style={{ height: '40%', position: 'relative', overflow: 'hidden' }}>
          <img
            src="/images/rendering-exterior.jpg"
            alt=""
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 40%',
              opacity: 0.7,
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, #0a0a0a, transparent 60%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '8px', left: '12px',
          }}>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '5px', fontWeight: 700,
              color: '#c9a96e', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px',
            }}>
              BUILT BY
            </div>
            <div style={{
              fontFamily: 'var(--font-heading)', fontSize: '12px',
              fontWeight: 700, color: '#ffffff', letterSpacing: '0.02em',
            }}>
              Dwell 365
            </div>
          </div>
        </div>

        {/* Story text */}
        <div style={{ padding: '10px 12px', flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-heading)', fontSize: '9px',
            fontWeight: 700, color: '#ffffff', marginBottom: '6px', lineHeight: 1.3,
          }}>
            Where Luxury and Precision Intersect
          </div>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '5.5px',
            color: '#a8a8a0', lineHeight: 1.7,
          }}>
            Every decision in these townhomes reflects a standard that most developers never attempt. From the closed-cell spray foam insulation to the bronze-finished impact windows, the construction was designed for the buyer who understands quality at a material level.
          </div>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: '5.5px',
            color: '#a8a8a0', lineHeight: 1.7, marginTop: '4px',
          }}>
            The Coral Gables Biltmore section. Walking distance to Miracle Mile, Merrick Park, and the Biltmore Hotel.
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Photography Integration Screen ─── */
function PhotosScreen() {
  return (
    <>
      {/* Room tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #2a2a28' }}>
        {rooms.map((room, i) => (
          <div key={i} style={{
            flex: 1, padding: '6px 4px', textAlign: 'center',
            fontFamily: 'var(--font-body)', fontSize: '6px',
            fontWeight: i === 2 ? 700 : 500,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            color: i === 2 ? '#c9a96e' : '#8a8a82',
            borderBottom: i === 2 ? '1px solid #c9a96e' : '1px solid transparent',
          }}>
            {room}
          </div>
        ))}
      </div>

      {/* Photo gallery grid */}
      <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px', overflow: 'hidden' }}>
        {/* Main image */}
        <div style={{ flex: 1.5, position: 'relative', overflow: 'hidden', borderRadius: '2px' }}>
          <img
            src="/images/rendering-bedroom.jpg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
          />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '8px',
            background: 'linear-gradient(to top, rgba(10,10,10,0.85), transparent)',
          }}>
            <div style={{
              fontFamily: 'var(--font-heading)', fontSize: '8px',
              fontWeight: 700, color: '#ffffff',
            }}>
              Master Suite
            </div>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '5px', color: '#a8a8a0', marginTop: '1px',
            }}>
              Level 3 · Detail: European vanity, natural stone countertop
            </div>
          </div>
        </div>

        {/* Thumbnail row */}
        <div style={{ display: 'flex', gap: '4px', height: '28%' }}>
          {[
            '/images/rendering-bath.jpg',
            '/images/rendering-kitchen.jpg',
            '/images/rendering-terrace.jpg',
          ].map((src, i) => (
            <div key={i} style={{
              flex: 1, position: 'relative', overflow: 'hidden', borderRadius: '2px',
              border: i === 0 ? '1px solid #c9a96e' : '1px solid transparent',
            }}>
              <img
                src={src}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }}
              />
            </div>
          ))}
        </div>

        {/* Photo count */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '2px 0',
        }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '5px', color: '#8a8a82', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            MASTER SUITE · 12 PHOTOS
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '5px', color: '#c9a96e', fontWeight: 600 }}>
            VIEW ALL →
          </div>
        </div>
      </div>
    </>
  )
}
