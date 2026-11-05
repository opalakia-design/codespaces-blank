import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Compass,
  Flame,
  Frown,
  Gift,
  Heart,
  MapPin,
  MessageCircle,
  Minus,
  Moon,
  Navigation,
  Pause,
  PartyPopper,
  Plus,
  RefreshCw,
  Settings2,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Snowflake,
  Sun,
  Users,
  X,
  Zap,
} from 'lucide-react'
import './App.css'

const routes = [
  { name: 'The little loop', area: 'Syntagma · Plaka', distance: '2.4 km', steps: '3,200', time: '32 min', stop: 'Grigoris Syntagma', color: 'lime', luckyOffer: { meters: 50, prize: 'Free fresh-squeezed juice', code: 'GRIGORIS-50', chance: 'Sponsor-set odds' } },
  { name: 'A garden detour', area: 'Kolonaki · National Garden', distance: '3.8 km', steps: '5,100', time: '48 min', stop: 'Line Athens', color: 'pink' },
  { name: 'Sea-level reset', area: 'Koukaki · Thissio', distance: '5.2 km', steps: '7,000', time: '65 min', stop: 'Ohh Boy', color: 'blue' },
]

const people = [
  { name: 'Nina', age: 27, detail: 'Ceramicist · Plaka', bio: 'Looking for the long way home, always.', image: 'photo-1534528741775-53994a69daeb', interests: ['Slow mornings', 'Dogs', 'Jazz'] },
  { name: 'Alex', age: 29, detail: 'Architect · Pangrati', bio: 'I know a shortcut, but let’s not take it.', image: 'photo-1500648767791-00dcc994a43e', interests: ['Architecture', 'Coffee', 'Hikes'] },
  { name: 'Maya', age: 26, detail: 'Researcher · Exarchia', bio: 'Collecting bookstores and steps.', image: 'photo-1531123897727-8f129e1688ce', interests: ['Books', 'Cats', 'Live music'] },
]

const discoverCandidates = [
  { ...people[0], distanceKm: 1.2 },
  { ...people[1], distanceKm: 3.1 },
  { ...people[2], distanceKm: 4.7 },
  { name: 'Petra', age: 28, detail: 'Photographer · Koukaki', bio: 'Looking for good light, good coffee, and the long route.', image: 'photo-1529139574466-a303027c1d8b', interests: ['Photography', 'Coffee', 'Museums'], distanceKm: 2.6 },
  { name: 'Jonas', age: 33, detail: 'Product designer · Pangrati', bio: 'Happy to walk first and decide where we’re going later.', image: 'photo-1535713875002-d1d0cf377fde', interests: ['Design', 'Cooking', 'Cycling'], distanceKm: 4.3 },
  { name: 'Lara', age: 25, detail: 'Bookshop assistant · Mets', bio: 'Can recommend a book for every kind of weather.', image: 'photo-1494790108377-be9c29b29330', interests: ['Books', 'Cats', 'Pastries'], distanceKm: 1.8 },
  { name: 'Iris', age: 30, detail: 'Florist · Neos Kosmos', bio: 'Taking the scenic route to a good bakery.', image: 'photo-1524504388940-b1c1722653e1', interests: ['Gardens', 'Baking', 'Films'], distanceKm: 5.8 },
  { name: 'Sofia', age: 39, detail: 'Physiotherapist · Mets', bio: 'Early walks, strong coffee, no rush.', image: 'photo-1544005313-94ddf0286df2', interests: ['Wellness', 'Sea swims', 'Cooking'], distanceKm: 4.2 },
  { name: 'Eva', age: 22, detail: 'Student · Exarchia', bio: 'Always up for a walk that ends by the sea.', image: 'photo-1508214751196-bcfd4ca60f91', interests: ['Swimming', 'Music', 'Plants'], distanceKm: 3.6 },
  { name: 'Leon', age: 23, detail: 'Graduate student · Thissio', bio: 'Finding my favorite corners of Athens one walk at a time.', image: 'photo-1506794778202-cad84cf45f1d', interests: ['History', 'Running', 'Coffee'], distanceKm: 4.4 },
]
const MAX_DISCOVER_DISTANCE_KM = 5

function calculateAge(birthDate) {
  const birth = new Date(`${birthDate}T00:00:00`)
  if (Number.isNaN(birth.getTime())) return -1
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age -= 1
  return age
}

function ageGroupFor(age) {
  if (age < 18) return null
  if (age <= 24) return '18-24'
  const lower = Math.floor(age / 10) * 10
  return `${lower}-${lower + 9}`
}

const conversations = [
  { name: 'Nina', image: people[0].image, preview: 'That little coffee stop sounds perfect ☀', time: '10:42', unread: true, messages: [{ author: 'them', text: 'Hi Elena! I found a lovely little loop near Plaka.', time: '10:31' }, { author: 'me', text: 'That sounds lovely. I could use a coffee stop too.', time: '10:36' }, { author: 'them', text: 'That little coffee stop sounds perfect ☀', time: '10:42' }] },
  { name: 'Alex', image: people[1].image, preview: 'I know a quiet route by the gardens', time: 'Yesterday', unread: true, messages: [{ author: 'them', text: 'I know a quiet route by the gardens if you’re up for it.', time: 'Yesterday' }] },
  { name: 'Maya', image: people[2].image, preview: 'See you Saturday!', time: 'Sun', unread: false, messages: [{ author: 'me', text: 'Shall we meet around the National Garden?', time: 'Sun' }, { author: 'them', text: 'See you Saturday!', time: 'Sun' }] },
]

const promotions = [
  { brand: 'Mokka Coffee', offer: 'A freddo on us', note: 'On your next completed streak', image: 'photo-1445116572660-236099ec97a0', category: 'COFFEE · MONASTIRAKI', color: 'mokka' },
  { brand: 'Line Athens', offer: '15% off your first pour', note: 'A little treat for your next walk', image: 'photo-1514933651103-005eec06c04b', category: 'WINE BAR · PSYRRI', color: 'line' },
]

const extraRewards = [
  { brand: 'Grigoris', offer: 'Fresh-squeezed juice on us', note: 'Free drink at the Syntagma stop', image: 'photo-1600271886742-f049cd451bba', milestone: 10, category: '10-DAY STREAK' },
  { brand: 'Ohh Boy', offer: 'Coffee and a little pastry', note: 'A sweet break in Koukaki', image: 'photo-1445116572660-236099ec97a0', milestone: 30, category: '30-DAY STREAK' },
  { brand: 'Line Athens', offer: '15% off your next visit', note: 'An evening treat in Psyrri', image: 'photo-1514933651103-005eec06c04b', milestone: 30, category: '30-DAY STREAK' },
  { brand: 'Nolan', offer: 'A set lunch for two', note: 'Celebrate your walking ritual', image: 'photo-1559339352-11d035aa65de', milestone: 50, category: '50-DAY STREAK' },
]

const SPONSOR_GIFT_STEP_INTERVAL = 20000
const SPONSOR_GIFT_VALIDITY_DAYS = 30
const sponsorGifts = [
  { name: 'Premium athletic socks', sponsor: 'Kínesi walking partners' },
  { name: 'Insulated walking thermos', sponsor: 'Kínesi walking partners' },
  { name: 'A sponsor meal for two', sponsor: 'Athens local partners' },
]

function formatGiftExpiration(expiresAt) {
  return new Date(expiresAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

const navItems = [
  { id: 'people', label: 'Discover', icon: Users },
  { id: 'routes', label: 'Routes', icon: Navigation },
  { id: 'home', label: 'Home', icon: Compass },
  { id: 'messages', label: 'Messages', icon: MessageCircle, badge: '2' },
  { id: 'rewards', label: 'Rewards', icon: Star },
]
const currentYear = new Date().getFullYear()
const STREAK_TRIP_INTERVAL_MS = 24 * 60 * 60 * 1000

function readSavedTheme() {
  try {
    return window.localStorage.getItem('kinesi-theme') === 'night'
  } catch {
    return false
  }
}

function RouteMap({ compact = false, shopName = 'Local partner stop', circular = false, showPartnerStop = false }) {
  return (
    <div className={`route-map ${compact ? 'route-map-compact' : ''} ${circular ? 'route-map-circular' : 'route-map-one-way'}`}>
      <svg viewBox="0 0 760 380" role="img" aria-label={`${circular ? 'Circular' : 'One-way'} walking route through central Athens${showPartnerStop ? ` with an offer stop at ${shopName}` : ''}`}>
        <rect width="760" height="380" fill="#e9eee5" />
        <path className="park" d="M500 0h260v104l-66 37-54-12-47 34-48-14-36-63z" />
        <path className="water" d="M0 315c85-24 125-14 189 3s95 12 156-5" />
        <g className="city-blocks">
          <path d="M0 49 116 21l29 74-127 36zM160 11l100-8 9 70-115 22zM299 0l71 0 8 81-85-7zM400 18l75 16-17 84-80-21zM84 153l106-20 19 75-111 21zM229 115l90 7-5 80-87-3zM350 121l85 20-19 76-87-15zM474 139l83 21-24 71-77-20zM589 176l83-20 30 80-94 24zM16 251l112-28 25 86-111 25zM180 227l87-11 13 74-85 16zM306 232l90-17 19 78-96 15zM435 250l74-28 41 73-88 30zM571 280l92-20 29 85-97 19z" />
        </g>
        <g className="street-lines">
          <path d="M-20 127 785 97M-10 212 785 180M-30 297 790 265M125-20l35 425M276-10l20 410M445-20l-7 420M565-10l42 400M690-20l36 420" />
          <path d="m0 72 760 238M0 340 750 63" />
        </g>
        <path className="route-shadow" d="M158 270c46-9 68-53 118-52 42 1 36 42 83 38 44-4 38-79 84-88 43-8 57 33 91 19 29-11 42-49 73-59" />
        <path className="route-line" d="M158 270c46-9 68-53 118-52 42 1 36 42 83 38 44-4 38-79 84-88 43-8 57 33 91 19 29-11 42-49 73-59" />
        {circular && <path className="route-return-line" d="M621 98c-30 30-42 68-84 74-43 7-58 58-104 70-42 11-68-10-109 3-44 14-83 30-166 25" />}
      </svg>
      {!compact && <>
        <span className={`map-route-mode ${circular ? 'is-circular' : 'is-one-way'}`}>{circular ? <RefreshCw size={12} /> : <ArrowUpRight size={12} />} {circular ? 'CIRCULAR ROUTE' : 'ONE-WAY ROUTE'}</span>
        <span className="map-label map-label-1">SYNTAGMA</span>
        <span className="map-label map-label-2">PLAKA</span>
        <span className="map-label map-label-3">NATIONAL GARDEN</span>
        <span className="map-label map-label-4">MONASTIRAKI</span>
        <span className="map-pin map-pin-start"><Navigation size={15} fill="currentColor" /></span>
        {showPartnerStop && <><span className="map-pin map-pin-shop"><MapPin size={16} fill="currentColor" /></span><span className="map-stop-label"><span className="stop-dot" /> {shopName}</span></>}
        <span className="map-caption"><Sun size={14} /> 23° and lovely out</span>
        <button className="map-control" type="button" title="Map settings"><Plus size={16} /><span /><Minus size={16} /></button>
      </>}
    </div>
  )
}

function GoalPicker({ onChoose }) {
  return (
    <div className="goal-picker">
      {[{ days: 10, bonus: 15000 }, { days: 30, bonus: 55000 }, { days: 50, bonus: 95000 }].map(({ days, bonus }) => (
        <button type="button" key={days} onClick={() => onChoose(days)}>
          <strong>{days}<small>days</small></strong>
          <span>+{bonus.toLocaleString()} steps</span>
        </button>
      ))}
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [targetSteps, setTargetSteps] = useState(3200)
  const [returnEnabled, setReturnEnabled] = useState(true)
  const [goal, setGoalValue] = useState(10)
  const [steps, setSteps] = useState(3850)
  const [goalSteps, setGoalSteps] = useState(19200)
  const [streak, setStreak] = useState(6)
  const [lastStreakTripAt, setLastStreakTripAt] = useState(null)
  const [lifetimeSteps, setLifetimeSteps] = useState(24800)
  const [unlockedGifts, setUnlockedGifts] = useState([])
  const [pendingCarrySteps, setPendingCarrySteps] = useState(0)
  const [goalCompletion, setGoalCompletion] = useState(null)
  const [freezePasses, setFreezePasses] = useState({
    'Illness or injury': 3,
    'Rest day': 3,
    'I don’t have time': 3,
  })
  const [walkStarted, setWalkStarted] = useState(false)
  const [routeProgressSteps, setRouteProgressSteps] = useState(0)
  const [streakFrozen, setStreakFrozen] = useState(false)
  const [luckyRedeemed, setLuckyRedeemed] = useState(false)
  const [alarm, setAlarm] = useState(false)
  const [nightMode, setNightMode] = useState(readSavedTheme)
  const [modal, setModal] = useState('')
  const [freezeReason, setFreezeReason] = useState('')
  const [freezeMessage, setFreezeMessage] = useState('')
  const [toast, setToast] = useState('')
  const [profileSaved, setProfileSaved] = useState(false)
  const [profileVerified, setProfileVerified] = useState(false)
  const [ageAccess, setAgeAccess] = useState('locked')
  const [birthDate, setBirthDate] = useState('')
  const [ageDocumentName, setAgeDocumentName] = useState('')
  const [ageVerificationMessage, setAgeVerificationMessage] = useState('')
  const [scheduleSent, setScheduleSent] = useState(false)
  const [chatItems, setChatItems] = useState(conversations)
  const [incomingLikes, setIncomingLikes] = useState(people)
  const [matchedPerson, setMatchedPerson] = useState(people[0])
  const [activeChat, setActiveChat] = useState('')
  const [draftMessage, setDraftMessage] = useState('')
  const [personIndex, setPersonIndex] = useState(0)
  const swipeStartX = useRef(null)
  const selectedRoute = routes.reduce((closestIndex, route, index) => {
    const routeSteps = Number(route.steps.replace(',', ''))
    const closestSteps = Number(routes[closestIndex].steps.replace(',', ''))
    return Math.abs(routeSteps - targetSteps) < Math.abs(closestSteps - targetSteps) ? index : closestIndex
  }, 0)
  const currentRoute = routes[selectedRoute]
  const outboundSteps = returnEnabled ? Math.ceil(targetSteps / 2) : targetSteps
  const returnSteps = returnEnabled ? targetSteps - outboundSteps : 0
  const plannedDistanceKm = (targetSteps / 1300).toFixed(1)
  const plannedMinutes = Math.max(15, Math.round(targetSteps / 100))
  const viewerAge = birthDate ? calculateAge(birthDate) : 28
  const viewerAgeGroup = ageGroupFor(viewerAge)
  const discoverPeople = discoverCandidates.filter((person) => person.distanceKm <= MAX_DISCOVER_DISTANCE_KM && ageGroupFor(person.age) === viewerAgeGroup)
  const currentPerson = discoverPeople[personIndex]
  const currentChat = chatItems.find((chat) => chat.name === activeChat)
  const rewardSteps = goal === 10 ? 15000 : goal === 30 ? 55000 : 95000
  const stepsTowardNextGift = goalSteps % SPONSOR_GIFT_STEP_INTERVAL
  const stepsUntilNextGift = SPONSOR_GIFT_STEP_INTERVAL - stepsTowardNextGift
  const nextSponsorGift = sponsorGifts[unlockedGifts.length % sponsorGifts.length]
  const progress = Math.min(100, Math.round((streak / goal) * 100))
  const socialLocked = ['people', 'likes', 'messages'].includes(activeTab) && ageAccess !== 'verified'

  function showToast(message) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  useEffect(() => {
    try {
      window.localStorage.setItem('kinesi-theme', nightMode ? 'night' : 'day')
    } catch {
      // Theme still works for this session when storage is unavailable.
    }
  }, [nightMode])

  function setGoal(nextGoal) {
    if (streak > 0) {
      showToast(`Your ${goal}-day goal is locked until this streak ends.`)
      return
    }
    setGoalValue(nextGoal)
    setLastStreakTripAt(null)
  }

  function failGoal() {
    setStreak(0)
    setLastStreakTripAt(null)
    setGoalSteps(0)
    setPendingCarrySteps(0)
    setGoalCompletion(null)
    setModal('failed')
  }

  function closeModal() {
    if (modal === 'reward') setPendingCarrySteps(0)
    setModal('')
  }

  function completeWalk() {
    const routeSteps = targetSteps
    const now = Date.now()
    setWalkStarted(false)
    setRouteProgressSteps(0)
    if (!streakFrozen && lastStreakTripAt !== null && now - lastStreakTripAt < STREAK_TRIP_INTERVAL_MS) {
      setLifetimeSteps((value) => value + routeSteps)
      setSteps((value) => value + routeSteps)
      setGoalSteps((value) => value + routeSteps)
      setModal('route-complete')
      return
    }

    setStreakFrozen(false)
    const newStreak = streak + 1
    setLastStreakTripAt(now)
    if (newStreak >= goal) {
      const completedGoalSteps = goalSteps + routeSteps + rewardSteps
      const giftsToUnlock = Math.floor(completedGoalSteps / SPONSOR_GIFT_STEP_INTERVAL)
      const nextUnlockedGifts = Array.from({ length: giftsToUnlock }, (_, index) => {
        const giftIndex = unlockedGifts.length + index
        const gift = sponsorGifts[giftIndex % sponsorGifts.length]
        const expiresAt = new Date(now)
        expiresAt.setDate(expiresAt.getDate() + SPONSOR_GIFT_VALIDITY_DAYS)
        return {
          id: giftIndex,
          ...gift,
          redemptionCode: `KIN-GIFT-${String(giftIndex + 1).padStart(4, '0')}`,
          expiresAt: expiresAt.toISOString(),
          redeemedAt: null,
        }
      })
      const remainingSteps = completedGoalSteps % SPONSOR_GIFT_STEP_INTERVAL
      setUnlockedGifts((gifts) => [...gifts, ...nextUnlockedGifts])
      setPendingCarrySteps(remainingSteps)
      setGoalCompletion({ gifts: nextUnlockedGifts, remainingSteps })
      setLifetimeSteps((value) => value + routeSteps + rewardSteps)
      setSteps(0)
      setGoalSteps(0)
      setStreak(0)
      setModal('reward')
    } else {
      setLifetimeSteps((value) => value + routeSteps)
      setSteps((value) => value + Number(currentRoute.steps.replace(',', '')))
      setGoalSteps((value) => value + routeSteps)
      setStreak(newStreak)
      setModal('route-complete')
    }
  }

  function handleWalkButton() {
    if (!walkStarted) {
      setRouteProgressSteps(0)
      setWalkStarted(true)
      setLuckyRedeemed(false)
      showToast(currentRoute.luckyOffer ? 'Lucky route started. A partner offer is ahead.' : 'Your route is ready. Enjoy the walk.')
      return
    }
    if (routeProgressSteps >= targetSteps) completeWalk()
    else setModal('stop-route')
  }

  function logRouteProgress() {
    const updatedProgress = Math.min(targetSteps, routeProgressSteps + 500)
    setRouteProgressSteps(updatedProgress)
    if (updatedProgress >= targetSteps) showToast('Destination reached. Finish your route to count it.')
  }

  function confirmStopRoute() {
    setWalkStarted(false)
    setRouteProgressSteps(0)
    setLuckyRedeemed(false)
    setModal('')
    showToast('Route stopped. No route steps or streak day were counted.')
  }

  function chooseNextGoal(nextGoal) {
    setGoalValue(nextGoal)
    setStreak(0)
    setLastStreakTripAt(null)
    setSteps(0)
    setGoalSteps(pendingCarrySteps)
    setPendingCarrySteps(0)
    setModal('')
    showToast(`Your ${nextGoal}-day goal is ready with ${goalCompletion?.remainingSteps.toLocaleString() || '0'} carried steps.`)
  }

  function markGiftRedeemed(giftId) {
    setUnlockedGifts((gifts) => gifts.map((gift) => gift.id === giftId && !gift.redeemedAt
      ? { ...gift, redeemedAt: new Date().toISOString() }
      : gift))
    showToast('Gift marked as collected in-store.')
  }

  function submitFreeze() {
    if (!freezeReason) {
      setFreezeMessage('Choose a reason to pause your streak.')
      return
    }
    if (freezeReason === 'Bad weather') {
      setFreezeMessage('Select another reason for streak freeze')
      return
    }
    const remainingPasses = freezePasses[freezeReason]
    if (remainingPasses === 0) {
      setFreezeMessage(`You’ve used all 3 ${freezeReason.toLowerCase()} passes for this 30-day period.`)
      return
    }
    setFreezePasses((passes) => ({ ...passes, [freezeReason]: passes[freezeReason] - 1 }))
    setStreakFrozen(true)
    setFreezeMessage(`${remainingPasses - 1} of 3 passes remain for this reason this month.`)
    setTimeout(() => {
      setModal('')
      setFreezeMessage('')
      setFreezeReason('')
    }, 1400)
  }

  function chooseTab(tab) {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function likePerson(person) {
    setMatchedPerson(person)
    if (person.name === 'Nina') {
      setModal('match')
    } else {
      showToast(`You liked ${person.name}. Fingers crossed!`)
    }
  }

  function removeIncomingLike(person) {
    setIncomingLikes((likes) => likes.filter((like) => like.name !== person.name))
    showToast(`${person.name}’s like was removed.`)
  }

  function matchBack(person) {
    setMatchedPerson(person)
    setIncomingLikes((likes) => likes.filter((like) => like.name !== person.name))
    setModal('match')
  }

  function openChat(name) {
    setActiveChat(name)
    setDraftMessage('')
    setChatItems((items) => items.map((chat) => chat.name === name ? { ...chat, unread: false } : chat))
  }

  function sendChatMessage(event) {
    event.preventDefault()
    const text = draftMessage.trim()
    if (!text || !activeChat) return
    setChatItems((items) => items.map((chat) => chat.name === activeChat ? {
      ...chat,
      preview: text,
      time: 'now',
      messages: [...chat.messages, { author: 'me', text, time: 'now' }],
    } : chat))
    setDraftMessage('')
  }

  function completePhotoVerification() {
    setProfileVerified(true)
    setModal('')
    showToast('Profile photo verified in this demo.')
  }

  function verifyAge(event) {
    event.preventDefault()
    if (!birthDate || !ageDocumentName) {
      setAgeVerificationMessage('Enter your date of birth and attach an official document.')
      return
    }
    const age = calculateAge(birthDate)
    if (age < 0) {
      setAgeVerificationMessage('Enter a valid date of birth.')
      return
    }
    if (age < 18) {
      setAgeAccess('underage')
      setAgeVerificationMessage('Discover, likes, matches, and chats are unavailable to users under 18.')
      return
    }
    setAgeAccess('verified')
    setAgeVerificationMessage('')
    showToast('Age verification approved in this demo.')
  }

  function choosePerson(direction) {
    const person = discoverPeople[personIndex]
    if (!person) return
    if (direction === 'right') {
      likePerson(person)
    } else {
      showToast(`You passed on ${person.name}.`)
    }
    setPersonIndex((index) => Math.min(index + 1, discoverPeople.length))
  }

  function startCardSwipe(event) {
    swipeStartX.current = event.clientX
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function finishCardSwipe(event) {
    if (swipeStartX.current === null) return
    const distance = event.clientX - swipeStartX.current
    swipeStartX.current = null
    if (distance > 75) choosePerson('right')
    if (distance < -75) choosePerson('left')
  }

  return (
    <div className={`app-shell ${streak > 0 ? 'goal-in-progress' : ''} ${nightMode ? 'night-mode' : ''}`}>
      <aside className="sidebar">
        <a className="wordmark" href="#today" onClick={() => chooseTab('home')}><span className="logo-mark"><Navigation size={19} fill="currentColor" /></span>kínesi<span className="wordmark-dot">.</span></a>
        <div className="city-switch"><span className="city-dot" /><span>Athens, Greece</span><ChevronDown size={14} /></div>
        <p className="nav-caption">YOUR SPACE</p>
        <nav className="side-nav" aria-label="Main navigation">
          {navItems.map(({ id, label, icon: Icon, badge }) => (
            <button type="button" key={id} className={`nav-link ${id === 'home' ? 'home-nav' : ''} ${activeTab === id ? 'active' : ''}`} onClick={() => chooseTab(id)}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>{badge && <span className="nav-badge">{badge}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note"><Sparkles size={16} /><span>Good things happen<br />one step at a time.</span></div>
          <button type="button" className={`profile-shortcut ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => chooseTab('profile')}>
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80" alt="" />
            <span><strong>Elena P.</strong><small>My profile</small></span><Settings2 size={17} />
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button type="button" className={`streak-header-control ${streakFrozen ? 'frozen' : ''}`} onClick={() => setModal('streak')} aria-label={`${streak}-day streak, ${goalSteps.toLocaleString()} goal steps, ${goal}-day goal. Open streak options`} title="Streak details">{streakFrozen ? <Snowflake size={18} /> : <Flame size={18} fill="currentColor" />}<strong>{streak}</strong><span className="header-goal-steps"><Zap size={13} /><strong>{goalSteps.toLocaleString()}</strong></span></button>
          <div className="topbar-actions"><span className="weather-pill"><Sun size={15} /> 23° <i>Sunny in Athens</i></span><button type="button" className="icon-button messages-shortcut" aria-label="Messages and matches, 2 unread" title="Messages and matches" onClick={() => chooseTab('messages')}><MessageCircle size={18} /><span className="message-count">2</span></button></div>
        </header>

        {activeTab === 'routes' && <div className="route-mode-toggle"><span><RefreshCw size={17} /><span><strong>Circular route</strong><small>Return to your starting point</small></span></span><button type="button" role="switch" aria-checked={returnEnabled} className={`return-switch ${returnEnabled ? 'on' : ''}`} onClick={() => setReturnEnabled((value) => !value)} aria-label="Circular route"><span /></button></div>}

        {socialLocked && <section className="subpage age-gate-page"><div className="age-gate-panel"><div className="age-gate-icon"><ShieldCheck size={24} /></div><p className="eyebrow">A SAFER COMMUNITY</p><h1>Verify your age to <em>meet walkers.</em></h1><p className="age-gate-intro">Discover, likes, matches, and chats are for adults 18 and over. Attach an official document to verify your age and unlock these features.</p>{ageAccess === 'underage' ? <div className="age-denied"><ShieldCheck size={19} /><span><strong>Social features are unavailable.</strong><small>{ageVerificationMessage}</small></span></div> : <form className="age-verification-form" onSubmit={verifyAge}><label>Date of birth<input type="date" value={birthDate} onChange={(event) => { setBirthDate(event.target.value); setAgeVerificationMessage('') }} required /></label><label>Official age document <span className="optional-label">(government ID, passport, or other proof of age)</span><input type="file" accept="image/*,.pdf,application/pdf" onChange={(event) => { setAgeDocumentName(event.target.files?.[0]?.name || ''); setAgeVerificationMessage('') }} required /></label>{ageDocumentName && <span className="age-file-ready"><Check size={14} /> {ageDocumentName}</span>}{ageVerificationMessage && <p className="age-verification-message">{ageVerificationMessage}</p>}<p className="age-demo-note">Prototype only: document review is simulated. A production app must verify documents securely, protect them, and delete them when no longer needed.</p><button type="submit" className="primary-button age-submit-button"><ShieldCheck size={16} /> Verify age</button></form>}</div></section>}

        {activeTab === 'home' && <>
          <div className="dashboard-grid today-dashboard">
            <section className="route-panel panel">
              <div className="step-target-control">
                <div className="step-target-heading"><label htmlFor="daily-step-goal"><Zap size={15} /> Today’s step goal</label><div className="step-target-input"><button type="button" aria-label="Decrease step goal" onClick={() => setTargetSteps((value) => Math.max(2000, value - 500))}><Minus size={16} /></button><input id="daily-step-goal" type="number" min="2000" step="500" value={targetSteps} onChange={(event) => setTargetSteps(Math.max(2000, Number(event.target.value) || 2000))} /><button type="button" aria-label="Increase step goal" onClick={() => setTargetSteps((value) => value + 500)}><Plus size={16} /></button><span>steps</span></div></div>
                <div className="return-control"><span><strong>Circular route</strong><small>{returnEnabled ? `${outboundSteps.toLocaleString()} out · ${returnSteps.toLocaleString()} back` : `${targetSteps.toLocaleString()} steps one way`}</small></span><button type="button" role="switch" aria-checked={returnEnabled} className={`return-switch ${returnEnabled ? 'on' : ''}`} onClick={() => setReturnEnabled((value) => !value)} aria-label="Circular route"><span /></button></div>
                <small className="step-target-help">Minimum 2,000 steps · route updates to the closest match</small>
              </div>
              <div className="panel-heading route-heading"><div><div className="section-label"><span className="section-marker" /> TODAY’S LITTLE ADVENTURE</div><h2>{currentRoute.name}</h2><p className="route-area"><MapPin size={13} /> {currentRoute.area}</p></div><button className="text-button" type="button" onClick={() => chooseTab('routes')}>Change route <ChevronRight size={15} /></button></div>
              <div className="route-meta"><div className="route-stats"><span><Navigation size={15} /><strong>{plannedDistanceKm} km</strong><small>{returnEnabled ? 'loop distance' : 'one-way distance'}</small></span><span><Zap size={15} /><strong>{targetSteps.toLocaleString()}</strong><small>total steps</small></span><span><Clock3 size={15} /><strong>{plannedMinutes} min</strong><small>at your pace</small></span></div></div>
              {walkStarted && <div className="route-progress-panel"><div className="route-progress-heading"><span>ROUTE PROGRESS</span><strong>{routeProgressSteps.toLocaleString()} / {targetSteps.toLocaleString()} steps</strong></div><div className="progress-track"><span style={{ width: `${Math.min(100, Math.round((routeProgressSteps / targetSteps) * 100))}%` }} /></div>{routeProgressSteps < targetSteps ? <button type="button" className="route-log-steps" onClick={logRouteProgress}><Plus size={14} /> Log 500 demo steps</button> : <span className="route-arrived"><Check size={14} /> Destination reached</span>}</div>}
              {walkStarted && currentRoute.luckyOffer && <div className={`lucky-route-alert ${luckyRedeemed ? 'redeemed' : ''}`} role="status"><Sparkles size={17} /><span><strong>{luckyRedeemed ? 'Lucky offer redeemed' : 'Lucky route offer ahead'}</strong><small>{luckyRedeemed ? currentRoute.luckyOffer.prize : `In ${currentRoute.luckyOffer.meters} meters at ${currentRoute.stop}: ${currentRoute.luckyOffer.prize}.`}</small></span>{!luckyRedeemed && <button type="button" onClick={() => setModal('lucky-offer')}>View code</button>}</div>}
              <RouteMap shopName={currentRoute.stop} circular={returnEnabled} showPartnerStop={Boolean(currentRoute.luckyOffer)} />
              <div className="route-start-wrap"><button type="button" className="primary-button start-button" onClick={handleWalkButton}>{walkStarted ? routeProgressSteps >= targetSteps ? <Check size={16} /> : <X size={16} /> : <Navigation size={16} />}{!walkStarted ? 'Start route' : routeProgressSteps >= targetSteps ? 'Complete route' : 'Finish route'}</button></div>
              <section className="home-below-map">
                <p className="walk-motivation">A little movement can change the whole shape of your day.</p>
                <div className="goal-gifts">{promotions.map((offer) => <article className="goal-gift" key={offer.brand}><img src={`https://images.unsplash.com/${offer.image}?auto=format&fit=crop&w=240&h=180&q=80`} alt="" /><span><small>STREAK GOAL GIFT</small><strong>{offer.offer}</strong><em>{offer.brand}</em></span></article>)}</div>
              </section>
            </section>

            <aside className="dashboard-rail">
              <section className="streak-panel panel"><div className="section-label"><span className="section-marker coral-marker" /> YOUR STREAK</div><div className="streak-top"><div><strong className="streak-count">{streak}<span> days</span></strong><p>You’re finding your rhythm.</p></div><div className="streak-flame">✳</div></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><div className="progress-caption"><span>DAY {streak} OF {goal}</span><strong>{goal - streak} TO GO</strong></div><div className="reward-peek"><span className="reward-star"><Star size={15} fill="currentColor" /></span><span><small>YOUR NEXT BONUS</small><strong>+{rewardSteps.toLocaleString()} steps</strong></span><button type="button" onClick={() => chooseTab('rewards')} aria-label="View rewards"><ChevronRight size={17} /></button></div><button type="button" className="freeze-link" onClick={() => setModal('freeze')}><Pause size={14} /> Need a day off? Freeze your streak <ChevronRight size={13} /></button></section>

              <section className="steps-panel panel"><div className="steps-heading"><div className="section-label"><span className="section-marker blue-marker" /> YOUR STEPS</div><span className="today-chip">TODAY</span></div><div className="steps-number">{steps.toLocaleString()}<span> steps</span></div><div className="steps-foot"><span>Lifetime <strong>{lifetimeSteps.toLocaleString()}</strong></span><button type="button" className="add-steps-button" onClick={() => { setSteps((value) => value + 500); setLifetimeSteps((value) => value + 500); showToast('500 demo steps added.') }}><Plus size={14} /> add demo steps</button></div></section>

              <section className="buddy-panel panel"><div className="buddy-card-top"><div><div className="section-label"><span className="section-marker coral-marker" /> OUT THERE TOO</div><h3>Better with company.</h3></div><Users size={20} className="buddy-illustration" /></div><div className="mini-buddies"><img src={`https://images.unsplash.com/${people[0].image}?auto=format&fit=crop&w=64&h=64&q=80`} alt="Nina" /><img src={`https://images.unsplash.com/${people[1].image}?auto=format&fit=crop&w=64&h=64&q=80`} alt="Alex" /><img src={`https://images.unsplash.com/${people[2].image}?auto=format&fit=crop&w=64&h=64&q=80`} alt="Maya" /><span>+12 nearby</span></div><button type="button" className="buddy-link" onClick={() => chooseTab('people')}>Meet your people <ArrowUpRight size={15} /></button></section>
            </aside>
          </div>

        </>}

        {activeTab === 'routes' && <section className="subpage"><div className="subpage-heading"><div><p className="eyebrow">YOUR CITY, YOUR PACE</p><h1>Pick a way <em>through.</em></h1><p>Every route passes a local spot worth stopping for.</p></div><button type="button" className="filter-button"><Settings2 size={16} /> Preferences <ChevronDown size={14} /></button></div><div className="route-list">{routes.map((route, index) => <article className={`route-card ${selectedRoute === index ? 'route-card-selected' : ''}`} key={route.name}><div className={`route-card-map map-${route.color}`}><RouteMap compact shopName={route.stop} showPartnerStop={Boolean(route.luckyOffer)} /><span className="route-card-pin">{route.luckyOffer && <MapPin size={17} fill="currentColor" />}</span></div><div className="route-card-content"><div className="route-card-title"><div><span className="route-index">0{index + 1} / WALK</span>{route.luckyOffer && <span className="route-lucky-tag"><Sparkles size={12} /> LUCKY ROUTE</span>}<h2>{route.name}</h2><p><MapPin size={13} /> {route.area}</p></div>{selectedRoute === index && <span className="selected-tag"><Check size={12} /> SELECTED</span>}</div><div className="route-card-stats"><span><Navigation size={14} />{route.distance}</span><span><Zap size={14} />{route.steps} steps</span><span><Clock3 size={14} />{route.time}</span></div><div className="route-card-bottom"><span className="stop-note">{route.luckyOffer ? <><MapPin size={13} /> Offer stop: {route.stop}</> : <><MapPin size={13} /> Local stop included</>}</span><button type="button" className={selectedRoute === index ? 'secondary-button' : 'primary-button'} onClick={() => { setTargetSteps(Number(route.steps.replace(',', ''))); chooseTab('home'); showToast(`${route.name} is ready for your ${route.steps}-step goal.`) }}>{selectedRoute === index ? 'Your route' : 'Choose this route'} <ChevronRight size={15} /></button></div></div></article>)}</div><div className="route-disclaimer"><ShieldCheck size={17} /><span>Routes are a preview. Partner stores are hidden unless you can redeem an offer there. Lucky rewards and odds vary by sponsor.</span></div></section>}

        {activeTab === 'people' && ageAccess === 'verified' && (
          <section className="subpage people-page discover-page">
            <div className="subpage-heading">
              <div><p className="eyebrow">GOOD COMPANY, NO PRESSURE</p><h1>Meet someone <em>new.</em></h1><p>Swipe right to like, left to pass.</p></div>
              <button type="button" className={`alarm-button ${alarm ? 'alarm-button-on' : ''}`} onClick={() => setAlarm((value) => !value)}><span className={`alarm-icon ${alarm ? 'alarm-live' : ''}`}><Zap size={17} fill="currentColor" /></span>{alarm ? 'Alarm is live' : 'Invite someone now'}<ArrowUpRight size={16} /></button>
            </div>
            <div className="discover-switch" role="group" aria-label="Discover and likes">
              <button type="button" className="selected" onClick={() => chooseTab('people')}>Discover</button>
              <button type="button" onClick={() => chooseTab('likes')}>See your likes <span>{incomingLikes.length}</span></button>
            </div>
            {alarm && <div className="alarm-banner"><span className="alarm-pulse" /><div><strong>Your invite is live</strong><small>It will switch off automatically in 30 minutes.</small></div><button type="button" onClick={() => setAlarm(false)} aria-label="Turn off alarm"><X size={17} /></button></div>}
            <div className="people-toolbar"><span><span className="online-dot" /> {discoverPeople.length} walkers ages {viewerAgeGroup} within 5 km</span><button type="button" className="text-button">Your kind of walk <ChevronDown size={14} /></button></div>
            {currentPerson ? (
              <div className="swipe-deck">
                <article className="swipe-card" key={currentPerson.name} onPointerDown={startCardSwipe} onPointerUp={finishCardSwipe} onPointerCancel={() => { swipeStartX.current = null }} aria-label={`Swipe profile for ${currentPerson.name}`}>
                  <img className="swipe-photo" src={`https://images.unsplash.com/${currentPerson.image}?auto=format&fit=crop&w=900&h=1100&q=90`} alt={`${currentPerson.name}, a nearby walker`} draggable="false" />
                  <span className="swipe-distance"><MapPin size={13} /> {currentPerson.distanceKm.toFixed(1)} km away</span>
                  <span className="swipe-online"><i /> Around now</span>
                  <div className="swipe-card-shade" />
                  <div className="swipe-profile-copy"><p>{currentPerson.detail}</p><h2>{currentPerson.name}, {currentPerson.age}</h2><p className="swipe-bio">“{currentPerson.bio}”</p><div className="interest-list">{currentPerson.interests.map((interest) => <span key={interest}>{interest}</span>)}</div></div>
                </article>
                <p className="swipe-hint">Swipe left to pass <span>·</span> swipe right to like</p>
                <div className="swipe-actions"><button type="button" className="swipe-pass" onClick={() => choosePerson('left')} aria-label={`Pass on ${currentPerson.name}`}><X size={22} /><span>Pass</span></button><button type="button" className="swipe-like" onClick={() => choosePerson('right')} aria-label={`Like ${currentPerson.name}`}><Heart size={22} /><span>Like</span></button></div>
              </div>
            ) : (
              <div className="swipe-empty"><div className="empty-message-icon"><Users size={24} /></div><h2>You’re all caught up.</h2><p>Check back soon for more Athens walkers.</p><button type="button" className="secondary-button" onClick={() => setPersonIndex(0)}><RefreshCw size={15} /> See people again</button></div>
            )}
            <div className="match-footnote"><Heart size={16} /> Only matched walkers can message you or see your profile.</div>
          </section>
        )}

        {activeTab === 'likes' && ageAccess === 'verified' && (
          <section className="subpage likes-page">
            <div className="subpage-heading">
              <div><p className="eyebrow">A LITTLE INTEREST IN YOU</p><h1>They’d like to <em>walk.</em></h1><p>Match back to say hello, or remove a like.</p></div>
              <span className="likes-count-badge"><Heart size={15} fill="currentColor" /> {incomingLikes.length} {incomingLikes.length === 1 ? 'like' : 'likes'}</span>
            </div>
            <div className="discover-switch" role="group" aria-label="Discover and likes">
              <button type="button" onClick={() => chooseTab('people')}>Discover</button>
              <button type="button" className="selected" onClick={() => chooseTab('likes')}>See your likes <span>{incomingLikes.length}</span></button>
            </div>
            {incomingLikes.length > 0 ? (
              <div className="likes-list">
                {incomingLikes.map((person) => (
                  <article className="incoming-like-card" key={person.name}>
                    <img className="incoming-like-photo" src={`https://images.unsplash.com/${person.image}?auto=format&fit=crop&w=240&h=280&q=85`} alt={`${person.name}, a walker who liked you`} />
                    <div className="incoming-like-info"><span className="like-note"><Heart size={12} fill="currentColor" /> LIKED YOUR PROFILE</span><h2>{person.name}, {person.age}</h2><p>{person.detail}</p><small>“{person.bio}”</small><div className="incoming-like-actions"><button type="button" className="match-back-button" onClick={() => matchBack(person)}><Heart size={15} fill="currentColor" /> Match back</button><button type="button" className="remove-like-button" onClick={() => removeIncomingLike(person)}><X size={14} /> Remove</button></div></div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="likes-empty"><div className="empty-message-icon"><Heart size={23} /></div><h2>You’re all caught up.</h2><p>New likes will show up here.</p><button type="button" className="secondary-button" onClick={() => chooseTab('people')}><Users size={15} /> Discover walkers</button></div>
            )}
          </section>
        )}

        {activeTab === 'messages' && ageAccess === 'verified' && (
          <section className="subpage messages-page">
            <div className="subpage-heading">
              <div><p className="eyebrow">MAKE A PLAN, THEN WANDER</p><h1>Your <em>people.</em></h1><p>A good walk starts with a hello.</p></div>
              <button type="button" className="primary-button" onClick={() => chooseTab('people')}><Users size={16} /> Discover walkers</button>
            </div>
            {!activeChat && <>
              <section className="matches-section">
                <div className="matches-heading"><h2>Your matches</h2><span>{people.length} walkers</span></div>
                <div className="matches-strip">
                  {people.map((person) => (
                    <button type="button" className="match-person" key={person.name} onClick={() => openChat(person.name)} aria-label={`Open ${person.name}'s chat`}>
                      <span className="match-avatar-wrap"><img src={`https://images.unsplash.com/${person.image}?auto=format&fit=crop&w=112&h=112&q=85`} alt="" /><i /></span>
                      <strong>{person.name}</strong>
                    </button>
                  ))}
                </div>
              </section>
              <div className="messages-layout">
                <div className="conversation-list">
                  <div className="conversation-list-header"><h2>Your chats</h2><span>{chatItems.filter((chat) => chat.unread).length} new</span></div>
                  {chatItems.map((chat) => (
                    <button type="button" className="conversation-row" key={chat.name} onClick={() => openChat(chat.name)}>
                      <img src={`https://images.unsplash.com/${chat.image}?auto=format&fit=crop&w=96&h=96&q=80`} alt="" />
                      <span><strong>{chat.name}</strong><small>{chat.preview}</small></span>
                      <span className="conversation-time">{chat.time}{chat.unread && <i />}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>}
            {activeChat && currentChat && <section className="chat-thread">
              <header className="chat-thread-header">
                <button type="button" className="chat-back-button" aria-label="Back to chats" onClick={() => setActiveChat('')}><ArrowLeft size={18} /></button>
                <img src={`https://images.unsplash.com/${currentChat.image}?auto=format&fit=crop&w=96&h=96&q=85`} alt="" />
                <span className="chat-contact"><strong>{currentChat.name}</strong><small><i /> Matched walker</small></span>
                <button type="button" className="chat-schedule-button" onClick={() => { setScheduleSent(false); setModal('schedule') }}><CalendarDays size={15} /><span>Schedule a walk</span></button>
              </header>
              <div className="chat-thread-messages">
                {currentChat.messages.map((message, index) => <div className={`chat-message ${message.author === 'me' ? 'chat-message-outgoing' : ''}`} key={`${currentChat.name}-${index}`}><p>{message.text}</p><time>{message.time}</time></div>)}
              </div>
              <form className="chat-compose" onSubmit={sendChatMessage}>
                <input value={draftMessage} onChange={(event) => setDraftMessage(event.target.value)} aria-label={`Message ${currentChat.name}`} placeholder={`Message ${currentChat.name}...`} />
                <button type="submit" aria-label="Send message" disabled={!draftMessage.trim()}><Send size={17} /></button>
              </form>
            </section>}
          </section>
        )}

        {activeTab === 'rewards' && streak > 0 && <div className="goal-lock-banner"><ShieldCheck size={18} /><span><strong>Your goal is locked</strong><small>Finish or lose this streak before choosing another goal.</small></span></div>}
        {activeTab === 'rewards' && <section className="subpage rewards-page"><div className="subpage-heading"><div><p className="eyebrow">A LITTLE THANK-YOU FOR SHOWING UP</p><h1>Good things <em>add up.</em></h1><p>Choose a streak goal that feels right for you.</p></div><span className="lifetime-badge"><Zap size={16} /> {lifetimeSteps.toLocaleString()} lifetime steps</span></div><section className="goal-section"><div className="goal-heading"><div><span className="section-label"><span className="section-marker coral-marker" /> YOUR STREAK GOAL</span><h2>How often would you like to show up?</h2></div><button type="button" className="freeze-top-link" onClick={() => setModal('freeze')}><Pause size={14} /> Pause a day</button></div><div className="goal-options">{[{ days: 10, bonus: 15000, label: 'A fresh start', glyph: '✳' }, { days: 30, bonus: 55000, label: 'Finding a rhythm', glyph: '↗' }, { days: 50, bonus: 95000, label: 'A real ritual', glyph: '✴' }].map((option) => <button type="button" className={`goal-option ${goal === option.days ? 'goal-selected' : ''}`} key={option.days} onClick={() => { setGoal(option.days); showToast(`${option.days}-day goal selected.`) }}><span className="goal-glyph">{option.glyph}</span><span className="goal-days">{option.days}<small>days</small></span><span className="goal-label">{option.label}</span><span className="goal-bonus">+{option.bonus.toLocaleString()} <small>bonus steps</small></span>{goal === option.days && <span className="goal-check"><Check size={14} /></span>}</button>)}</div><div className="goal-progress-panel"><div><span className="section-label"><span className="section-marker" /> THIS GOAL</span><div className="goal-progress-main"><strong>{streak}<span> / {goal}</span></strong><span>consecutive days</span></div></div><div className="goal-progress-right"><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><p>{goal - streak} more {goal - streak === 1 ? 'walk' : 'walks'} to earn <strong>+{rewardSteps.toLocaleString()} steps</strong></p></div></div><p className="reset-note"><ShieldCheck size={15} /> When you reach your goal, your streak steps reset and the bonus is added to your total.</p></section><section className="rewards-offers"><div className="offers-title"><div><p className="eyebrow">LOCAL LOVE</p><h2>Little perks around town.</h2></div><span className="unlocked-tag"><Check size={13} /> 1 UNLOCKED</span></div><div className="reward-offer-list">{promotions.map((offer, index) => <article className="reward-offer" key={offer.brand}><div className={`reward-offer-thumb ${offer.color}`}><img src={`https://images.unsplash.com/${offer.image}?auto=format&fit=crop&w=240&h=180&q=80`} alt="" /></div><div className="reward-offer-copy"><span className="offer-category">{offer.category}</span><strong>{offer.offer}</strong><small>{offer.brand} · {offer.note}</small></div><span className={`offer-status ${index === 0 ? 'status-locked' : 'status-progress'}`}>{index === 0 ? 'UNLOCKS AT 10 DAYS' : '4 DAYS TO GO'}</span><ChevronRight size={17} /></article>)}</div></section></section>}

        {activeTab === 'rewards' && <section className="subpage extra-rewards-page"><div className="offers-title"><div><p className="eyebrow">MORE WAYS TO CELEBRATE</p><h2>Perks for your bigger goals.</h2></div><span className="reward-count-label">{extraRewards.length} PARTNER GIFTS</span></div><div className="reward-offer-list">{extraRewards.map((reward) => <article className="reward-offer" key={`${reward.brand}-${reward.offer}`}><div className="reward-offer-thumb"><img src={`https://images.unsplash.com/${reward.image}?auto=format&fit=crop&w=240&h=180&q=80`} alt="" /></div><div className="reward-offer-copy"><span className="offer-category">{reward.category} · {reward.brand.toUpperCase()}</span><strong>{reward.offer}</strong><small>{reward.note}</small></div><span className="offer-status status-locked">{reward.milestone}-DAY GOAL</span></article>)}</div><p className="extra-rewards-note"><ShieldCheck size={14} /> Partner gifts vary. Available rewards can be collected in-store after completing the listed streak goal.</p></section>}

        {activeTab === 'rewards' && <section className="subpage sponsor-gifts-section"><div className="offers-title"><div><p className="eyebrow">SPONSOR MILESTONES</p><h2>Gifts you’ve won.</h2></div><span className="reward-count-label">{unlockedGifts.length} GIFTS WON</span></div><div className="sponsor-milestone-panel"><div><span className="section-label"><span className="section-marker" /> NEXT GIFT · {nextSponsorGift.name.toUpperCase()}</span><p><strong>{stepsUntilNextGift.toLocaleString()}</strong> more goal steps unlock your next sponsor gift.</p></div><div className="progress-track"><span style={{ width: `${Math.round((stepsTowardNextGift / SPONSOR_GIFT_STEP_INTERVAL) * 100)}%` }} /></div></div>{unlockedGifts.length > 0 ? <div className="unlocked-gift-list">{unlockedGifts.map((gift) => {
          const redeemed = Boolean(gift.redeemedAt)
          return <article className={`unlocked-gift ${redeemed ? 'unlocked-gift-redeemed' : ''}`} key={gift.id}>
            <span className="reward-star"><Gift size={15} /></span>
            <div className="unlocked-gift-copy">
              <span><strong>{gift.name}</strong><small>{gift.sponsor}</small></span>
              <div className="gift-claim-details">
                <span><small>REDEMPTION CODE</small><code>{gift.redemptionCode}</code></span>
                <span><small>EXPIRES</small><time dateTime={gift.expiresAt}>{formatGiftExpiration(gift.expiresAt)}</time></span>
              </div>
            </div>
            <button type="button" className="gift-redeem-button" aria-label={`${redeemed ? 'Collected' : 'Mark collected'}: ${gift.name}`} disabled={redeemed} onClick={() => markGiftRedeemed(gift.id)}>{redeemed ? <><Check size={14} /> Collected</> : 'Mark collected'}</button>
          </article>
        })}</div> : <p className="extra-rewards-note"><ShieldCheck size={14} /> Gifts you unlock stay yours, even after a new goal begins.</p>}</section>}

        {activeTab === 'profile' && (
          <section className="subpage profile-page">
            <div className="subpage-heading">
              <div><p className="eyebrow">A LITTLE ABOUT YOU</p><h1>Your <em>story.</em></h1><p>Help your next walking buddy get to know you.</p></div>
              <div className="appearance-setting"><span className="appearance-setting-icon">{nightMode ? <Moon size={18} /> : <Sun size={18} />}</span><span className="appearance-setting-copy"><strong>Night mode</strong><small>{nightMode ? 'On · saved for next time' : 'Off · daytime colors'}</small></span><button type="button" role="switch" aria-checked={nightMode} aria-label="Night mode" className={`appearance-switch ${nightMode ? 'on' : ''}`} onClick={() => setNightMode((value) => !value)}><span /></button></div>
            </div>
            <div className="profile-layout">
              <section className="profile-card panel">
                <div className="profile-cover"><span>ATHENS, GREECE <span>·</span> 37°58′N</span></div>
                <div className="profile-avatar-row">
                  <span className="profile-photo-wrap"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=180&h=180&q=85" alt="Elena's profile" />{profileVerified && <span className="verified-photo-badge" aria-label="Verified profile photo"><BadgeCheck size={20} fill="currentColor" /></span>}</span>
                  <div className="profile-avatar-actions"><button type="button" className="secondary-button">Change photo</button><button type="button" className={`verify-photo-button ${profileVerified ? 'verified' : ''}`} onClick={() => setModal('verify-photo')} disabled={profileVerified}>{profileVerified ? <><BadgeCheck size={14} /> Photo verified</> : <><ShieldCheck size={14} /> Verify photo</>}</button></div>
                </div>
                <form className="profile-form" onSubmit={(event) => { event.preventDefault(); setProfileSaved(true); showToast('Your profile has been saved.') }}>
                  <div className="form-two">
                    <label>Username<input defaultValue="Elena P." /></label>
                    <label>Occupation<input defaultValue="Creative producer" /></label>
                  </div>
                  <label>Exact address <span className="optional-label">(used only to plan your routes)</span><input autoComplete="street-address" defaultValue="Pangrati, Athens" /></label>
                  <label>Tell us a little about you<textarea defaultValue="Usually taking the scenic route. Into old bookstores, live music, my very opinionated cat, and finding the best freddo in Athens." rows="4" /></label>
                  <div className="profile-form-bottom">
                    <span><ShieldCheck size={15} /> Never shown on your profile or to matches.</span>
                    <button type="submit" className="primary-button">{profileSaved ? <><Check size={16} /> Saved</> : 'Save profile'}</button>
                  </div>
                </form>
              </section>
              <aside className="profile-side panel">
                <div className="section-label"><span className="section-marker coral-marker" /> YOUR WALKING STYLE</div>
                <h2>Little details, good connections.</h2>
                <p>Interests help us find people you might enjoy walking with.</p>
                <div className="profile-interests">{['Slow mornings', 'Live music', 'Cats', 'Architecture', 'Coffee'].map((interest) => <span key={interest}>{interest}<button type="button" aria-label={`Remove ${interest}`} onClick={(event) => event.currentTarget.parentElement.remove()}><X size={12} /></button></span>)}</div>
                <button type="button" className="add-interest" onClick={() => showToast('Interest editor coming soon.')}><Plus size={14} /> Add an interest</button>
                <div className="privacy-note"><ShieldCheck size={18} /><span><strong>Your address stays private.</strong><small>It is available only to the app for route planning, never to walkers or matches.</small></span></div>
              </aside>
            </div>
          </section>
        )}

        <footer className="site-footer"><span>kínesi<span className="wordmark-dot">.</span> <small>Made for the long way home.</small></span><span>ATHENS, GREECE <span>·</span> {currentYear}</span></footer>
      </main>

      <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.filter((item) => item.id !== 'messages').map(({ id, label, icon: Icon }) => <button type="button" key={id} className={`${id === 'home' ? 'home-nav' : ''} ${activeTab === id ? 'active' : ''}`} onClick={() => chooseTab(id)}><Icon size={19} /><span>{label}</span></button>)}<button type="button" className={activeTab === 'profile' ? 'active' : ''} onClick={() => chooseTab('profile')}><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80" alt="" /><span>Profile</span></button></nav>

      {modal && <div className="modal-backdrop" onClick={closeModal}><section className={`modal-card ${modal === 'reward' ? 'reward-modal' : ''} ${modal === 'failed' ? 'failed-modal' : ''}`} role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" aria-label="Close dialog" onClick={closeModal}><X size={18} /></button>
        {modal === 'streak' && <><div className="modal-icon streak-modal-icon"><Flame size={21} fill="currentColor" /></div><p className="eyebrow">YOUR WALKING RHYTHM</p><h2>{streak} day streak</h2><p className="modal-description">Your current goal is set to <strong>{goal} days</strong>. Keep going to unlock your bonus.</p><div className="streak-modal-progress"><div className="progress-caption"><span>DAY {streak} OF {goal}</span><strong>{goal - streak} TO GO</strong></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><div className="streak-modal-reward"><Star size={15} fill="currentColor" /> +{rewardSteps.toLocaleString()} bonus steps</div></div><button type="button" className="primary-button modal-submit" onClick={() => { setFreezeReason(''); setFreezeMessage(''); setModal('freeze') }}><Pause size={15} /> Freeze this streak</button><button type="button" className="text-button modal-later" onClick={() => setModal('confirm-failure')}>End this goal</button></>}
        {modal === 'confirm-failure' && <><div className="modal-icon failed-modal-icon"><RefreshCw size={20} /></div><p className="eyebrow">END YOUR CURRENT CHALLENGE</p><h2>Are you sure?</h2><p className="modal-description">Ending this goal resets its progress. You won’t receive the goal bonus, and no remaining steps will carry into your next goal. Gifts you already unlocked stay secured.</p><div className="stop-route-actions"><button type="button" className="secondary-button" onClick={() => setModal('streak')}>Keep my goal</button><button type="button" className="stop-route-confirm" onClick={failGoal}>End goal</button></div></>}
        {modal === 'stop-route' && <><div className="modal-icon stop-route-icon"><Frown size={22} /></div><p className="eyebrow">ROUTE IN PROGRESS</p><h2>Are you sure you want to stop your route?</h2><p className="modal-description">Your {routeProgressSteps.toLocaleString()} route steps won’t count toward your total, and your streak won’t advance.</p><div className="stop-route-actions"><button type="button" className="secondary-button" onClick={() => setModal('')}>No, keep walking</button><button type="button" className="stop-route-confirm" onClick={confirmStopRoute}>Yes, stop route</button></div></>}
        {modal === 'route-complete' && <div className="route-complete-content"><div className="fireworks-scene"><Sparkles size={25} /><PartyPopper size={32} /><Sparkles size={18} /></div><p className="eyebrow">YOU MADE IT</p><h2>Beautifully done!</h2><p className="modal-description">You completed your {targetSteps.toLocaleString()}-step route. Your steps have been added to your goal.</p><div className="route-complete-stats"><span><Flame size={16} /> {streak} day streak</span><span><Zap size={16} /> {goalSteps.toLocaleString()} goal steps</span></div><button type="button" className="primary-button modal-submit" onClick={() => setModal('')}>Keep going</button></div>}
        {modal === 'lucky-offer' && currentRoute.luckyOffer && <><div className="modal-icon lucky-modal-icon"><Sparkles size={20} /></div><p className="eyebrow">LUCKY ROUTE · {currentRoute.stop.toUpperCase()}</p><h2>{currentRoute.luckyOffer.prize}</h2><p className="modal-description">You’re about {currentRoute.luckyOffer.meters} meters from the store. Show this sponsor-funded code to the cashier.</p><div className="lucky-code-card"><small>YOUR REDEMPTION CODE</small><strong>{currentRoute.luckyOffer.code}</strong></div><p className="lucky-odds-note">{currentRoute.luckyOffer.chance}. One offer per eligible route; prizes may vary.</p><button type="button" className="primary-button modal-submit" onClick={() => { setLuckyRedeemed(true); setModal('') }}><Check size={15} /> Mark as redeemed</button></>}
        {modal === 'verify-photo' && <><div className="modal-icon verify-modal-icon"><BadgeCheck size={21} /></div><p className="eyebrow">A SAFER WAY TO SAY HELLO</p><h2>Verify your profile photo.</h2><p className="modal-description">A full app would ask for a live selfie and securely compare it with your profile photo. Verified profiles show a checkmark to other walkers.</p><div className="verification-preview"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=85" alt="Current profile photo for the demo check" /><span><BadgeCheck size={18} /> Selfie check preview</span></div><p className="verification-demo-note">Prototype only: this button simulates the check and does not access your camera or verify identity.</p><button type="button" className="primary-button modal-submit" onClick={completePhotoVerification}><BadgeCheck size={16} /> Run demo verification</button></>}
        {modal === 'freeze' && <><div className="modal-icon pause-modal-icon"><Pause size={20} /></div><p className="eyebrow">A DAY OFF IS PART OF THE PLAN</p><h2>Pause your streak.</h2><p className="modal-description">Life happens. Choose what’s up and we’ll keep your streak right where it is.</p><div className="freeze-options">{['Illness or injury', 'Rest day', 'I don’t have time', 'Bad weather'].map((reason) => <button type="button" key={reason} className={freezeReason === reason ? 'selected' : ''} onClick={() => { setFreezeReason(reason); setFreezeMessage('') }}><span className={`reason-dot ${freezeReason === reason ? 'checked' : ''}`}>{freezeReason === reason && <Check size={11} />}</span><span>{reason}</span>{reason === 'Bad weather' ? <small>Unlimited · forecast checked</small> : <small>{freezePasses[reason]} of 3 left</small>}</button>)}</div>{freezeMessage && <p className={`freeze-feedback ${freezeReason === 'Bad weather' ? 'freeze-error' : ''}`}>{freezeMessage}</p>}<button type="button" className="primary-button modal-submit" onClick={submitFreeze}><Pause size={15} /> Freeze today</button><p className="modal-footnote"><Sun size={13} /> Bad weather is checked against your local forecast.</p></>}
        {modal === 'schedule' && <>{scheduleSent ? <><div className="modal-icon success-modal-icon"><Check size={21} /></div><p className="eyebrow">SOMETHING TO LOOK FORWARD TO</p><h2>Walk invite sent.</h2><p className="modal-description">We’ll let your match know and message you when they reply.</p><button type="button" className="primary-button modal-submit" onClick={() => setModal('')}>Lovely <Check size={15} /></button></> : <><div className="modal-icon schedule-modal-icon"><CalendarDays size={20} /></div><p className="eyebrow">MAKE A LITTLE PLAN</p><h2>Schedule a walk.</h2><p className="modal-description">Pick a time and we’ll find a lovely route for the two of you.</p><div className="schedule-form"><label>DAY<input type="date" defaultValue="2026-05-20" /></label><label>TIME<input type="time" defaultValue="10:30" /></label><label>YOUR WALK<select defaultValue="3200"><option value="3200">Around 3,200 steps · 2.4 km</option><option value="5100">Around 5,100 steps · 3.8 km</option><option value="7000">Around 7,000 steps · 5.2 km</option></select></label></div><div className="meeting-note"><MapPin size={16} /><span><strong>We’ll pick a meeting point</strong><small>Somewhere easy to find, near both of you.</small></span></div><button type="button" className="primary-button modal-submit" onClick={() => setScheduleSent(true)}><CalendarDays size={15} /> Send walk invite</button></>}</>}
        {modal === 'match' && <><div className="match-spark">✳</div><p className="eyebrow">A LITTLE ATHENS MAGIC</p><h2>Well, hello <em>{matchedPerson.name}.</em></h2><p className="modal-description">You both want the long way home. Say hello, or make a plan for a walk.</p><div className="match-avatars"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" alt="Elena" /><Heart size={19} fill="currentColor" /><img src={`https://images.unsplash.com/${matchedPerson.image}?auto=format&fit=crop&w=120&h=120&q=80`} alt={matchedPerson.name} /></div><button type="button" className="primary-button modal-submit" onClick={() => { setModal('schedule'); setScheduleSent(false) }}><CalendarDays size={15} /> Schedule a walk</button><button type="button" className="text-button match-dismiss" onClick={() => { setModal(''); chooseTab('messages') }}><MessageCircle size={15} /> Say hello in messages</button></>}
        {modal === 'reward' && <><div className="fireworks-scene reward-fireworks" aria-hidden="true"><Sparkles size={25} /><PartyPopper size={32} /><Sparkles size={18} /></div><p className="eyebrow">YOU SHOWED UP FOR YOU</p><h2>{goal} days, <em>beautifully done.</em></h2><p className="modal-description">Congratulations! You’ve successfully completed your goal! As a reward, you’ve unlocked the following gifts: {goalCompletion?.gifts.map((gift) => gift.name).join(', ') || 'No new gifts'}. Additionally, {goalCompletion?.remainingSteps.toLocaleString() || '0'} remaining steps will be transferred to your next goal.</p>{goalCompletion?.gifts.map((gift) => <p className="gift-unlock-message" key={gift.id}>Congratulations! You’ve unlocked a new gift: {gift.name}. Enjoy your reward!</p>)}<p className="modal-footnote">Start a new goal now to keep these remaining steps. If you leave without starting one, they’ll be lost.</p><div className="bonus-stamp"><Sparkles size={20} /><strong>+{rewardSteps.toLocaleString()}</strong><span>BONUS STEPS</span></div><GoalPicker onChoose={chooseNextGoal} /><button type="button" className="text-button modal-later" onClick={() => { closeModal(); chooseTab('rewards') }}>Choose later <ArrowUpRight size={14} /></button></>}
        {modal === 'failed' && <><div className="modal-icon failed-modal-icon"><RefreshCw size={20} /></div><p className="eyebrow">A FRESH START IS STILL A START</p><h2>Your streak ended.</h2><p className="modal-description">Unfortunately, you didn’t reach your goal this time. Don’t give up! Try again with your next challenge!</p><p className="next-goal-label">CHOOSE YOUR NEXT GOAL</p><GoalPicker onChoose={chooseNextGoal} /><button type="button" className="text-button modal-later" onClick={closeModal}>Maybe later</button></>}
      </section></div>}
      {toast && <div className="toast-message"><Check size={16} /> {toast}</div>}
    </div>
  )
}

export default App
