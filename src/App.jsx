import { useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowRight, Bell, Bookmark, Check, ChevronDown,
  ChevronRight, CircleHelp, Flame, Hash, Home, MessageCircle, MoreHorizontal,
  Plus, Search, Send, ShieldCheck, Sparkles, Star, TrendingUp, Trophy,
  Users, Vote, X, Menu
} from 'lucide-react';

const topics = ['For you', 'Following', 'Matchday', 'Transfers', 'Tactics'];

const posts = [
  {
    id: 1, initials: 'JM', author: 'James M.', handle: '@jamesontouchline',
    club: 'Arsenal', time: '12 min ago', tag: 'TACTICS', tagClass: 'blue',
    title: 'Is the inverted fullback role becoming a problem for Arsenal?',
    body: 'We look so much better when the midfield has an extra body, but the space left behind on transitions is worrying. Is it a personnel issue or the system itself?',
    replies: 84, likes: 216, saves: 32, color: 'coral', hot: true
  },
  {
    id: 2, initials: 'AK', author: 'Ada K.', handle: '@adawatchesfootball',
    club: 'Chelsea', time: '28 min ago', tag: 'PREMIER LEAGUE', tagClass: 'green',
    title: 'The best young midfielders in the league right now — who are you taking?',
    body: 'Not just potential. Who is already delivering week in, week out? I have three names in mind, but one of them might be a controversial pick…',
    replies: 53, likes: 148, saves: 19, color: 'purple', hot: false
  },
  {
    id: 3, initials: 'TO', author: 'Tunde O.', handle: '@theawayend',
    club: 'General football', time: '41 min ago', tag: 'DEBATE', tagClass: 'amber',
    title: 'Does a great manager need to win trophies to be considered elite?',
    body: 'Some of the best tactical work we have seen has come from teams that never lifted the biggest prizes. Where do you draw the line between genius and results?',
    replies: 127, likes: 302, saves: 61, color: 'teal', hot: true
  }
];

const clubs = [
  { name: 'Arsenal', members: '12.8k', initials: 'A', color: '#D94A50', live: true },
  { name: 'Manchester United', members: '11.2k', initials: 'M', color: '#E64B4B' },
  { name: 'Chelsea', members: '9.6k', initials: 'C', color: '#3478D4' },
  { name: 'Liverpool', members: '9.1k', initials: 'L', color: '#C63E4A' }
];

function Brand() {
  return <div className="brand-mark"><span className="brand-icon"><Activity size={19} strokeWidth={2.8} /></span><span>football<span className="brand-light">forum</span><i>.</i></span></div>;
}

function Avatar({ initials, color = 'navy', size = 'normal' }) {
  return <div className={`avatar avatar-${color} avatar-${size}`}>{initials}</div>;
}

function App() {
  const [activeTopic, setActiveTopic] = useState('For you');
  const [activeNav, setActiveNav] = useState('Home');
  const [liked, setLiked] = useState([]);
  const [saved, setSaved] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showComposer, setShowComposer] = useState(false);
  const [draft, setDraft] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState('');

  const toggle = (list, setter, id) => setter(list.includes(id) ? list.filter(x => x !== id) : [...list, id]);
  const notify = (message) => { setNotice(message); window.setTimeout(() => setNotice(''), 2600); };

  const visiblePosts = activeTopic === 'Following'
    ? posts.filter(p => following.includes(p.id) || p.id === 1)
    : activeTopic === 'Transfers' ? posts.filter(p => p.id === 2)
    : activeTopic === 'Tactics' ? posts.filter(p => p.id === 1)
    : posts;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <button className="mobile-menu icon-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu"><Menu size={21}/></button>
          <Brand />
          <div className="search-box"><Search size={17}/><input aria-label="Search" placeholder="Search clubs, conversations, fans..." /><kbd>⌘ K</kbd></div>
          <div className="top-actions">
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => notify('You’re all caught up.') }><Bell size={19}/><span className="notification-dot"/></button>
            <button className="create-button" onClick={() => setShowComposer(true)}><Plus size={17}/><span>Start a discussion</span></button>
            <button className="profile-trigger" onClick={() => notify('Your profile is coming into focus.') }><Avatar initials="TO" color="lime" size="small"/><ChevronDown size={14}/></button>
          </div>
        </div>
      </header>

      <div className="page-layout">
        <aside className={`left-sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
          <div className="sidebar-label">YOUR SPACE</div>
          <nav className="main-nav">
            {[
              { name: 'Home', icon: Home },
              { name: 'Discover', icon: Search },
              { name: 'Matchday Arena', icon: Trophy, badge: 'LIVE' },
              { name: 'Predictions', icon: Vote }
            ].map(item => <button key={item.name} className={`nav-item ${activeNav === item.name ? 'nav-active' : ''}`} onClick={() => { setActiveNav(item.name); setMobileMenu(false); if (item.name !== 'Home') notify(item.name + ' is on the roadmap.'); }}>
              <item.icon size={18}/><span>{item.name}</span>{item.badge && <span className="live-pill">{item.badge}</span>}
            </button>)}
          </nav>

          <div className="sidebar-divider"/>
          <div className="sidebar-heading"><span className="sidebar-label">YOUR CLUBHOUSES</span><button className="tiny-icon" onClick={() => notify('More clubhouses unlock as you level up.')} aria-label="Add clubhouse"><Plus size={16}/></button></div>
          <div className="club-list">
            {clubs.map((club, i) => <button key={club.name} className="club-item" onClick={() => notify(club.name + ' clubhouse preview coming soon.')}>
              <span className="club-crest" style={{'--club': club.color}}>{club.initials}</span>
              <span className="club-copy"><strong>{club.name}</strong><small>{club.members} fans</small></span>
              {club.live && <span className="club-live-dot"/>}
            </button>)}
          </div>
          <button className="text-link" onClick={() => notify('Clubhouse discovery is coming soon.')}>Explore clubhouses <ArrowRight size={14}/></button>

          <div className="sidebar-divider"/>
          <div className="sidebar-label">YOUR PROGRESS</div>
          <div className="level-card">
            <div className="level-top"><span className="level-emblem"><Star size={15} fill="currentColor"/></span><span className="level-name">THE TRIALIST</span><span className="level-count">LVL 01</span></div>
            <p>You’re on your way to the first team.</p>
            <div className="progress-track"><span/></div>
            <div className="progress-caption"><span>Make your mark</span><strong>2 / 5</strong></div>
            <div className="level-next"><ShieldCheck size={14}/> The Call-Up <span>next</span></div>
          </div>
          <div className="sidebar-bottom"><div className="sidebar-bottom-icon"><CircleHelp size={16}/></div><div><strong>Good football starts here.</strong><span>Keep it clever. Keep it respectful.</span></div></div>
        </aside>

        <main className="feed-column">
          <section className="welcome-row">
            <div><div className="eyebrow"><span className="eyebrow-line"/> FRIDAY, 23 OCTOBER</div><h1>The beautiful game.<br/><span>Every point of view.</span></h1><p>Your people. Your club. Your football conversation.</p></div>
            <div className="welcome-ball" aria-hidden="true"><div className="ball-ring ring-one"/><div className="ball-ring ring-two"/><div className="ball-core">⚽</div><span className="ball-spark spark-one">✳</span><span className="ball-spark spark-two">✳</span></div>
          </section>

          <section className="match-banner">
            <div className="match-topline"><span className="match-label"><span className="live-dot"/> THE MATCHDAY DESK</span><span className="match-league">PREMIER LEAGUE · FEATURED DISCUSSION</span></div>
            <div className="match-main">
              <div className="match-team"><div className="match-crest arsenal-crest">A</div><div><strong>Arsenal</strong><small>THE GUNNERS</small></div></div>
              <div className="match-vs"><span>VS</span><small>THE BIG DEBATE</small></div>
              <div className="match-team match-team-right"><div className="match-crest city-crest">M</div><div><strong>Man City</strong><small>THE CITIZENS</small></div></div>
            </div>
            <div className="match-bottom"><span><MessageCircle size={14}/> 248 fans are talking</span><button onClick={() => notify('Matchday Arena discussions are being built next.')}>Enter the conversation <ArrowRight size={15}/></button></div>
          </section>

          <div className="feed-heading"><div><div className="section-kicker">THE TOUCHLINE</div><h2>What’s happening</h2></div><button className="sort-button" onClick={() => notify('Showing the most relevant conversations first.')}>For you <ChevronDown size={15}/></button></div>

          <div className="topic-tabs" role="tablist" aria-label="Feed topics">
            {topics.map(topic => <button role="tab" aria-selected={activeTopic === topic} key={topic} className={activeTopic === topic ? 'topic-active' : ''} onClick={() => setActiveTopic(topic)}>{topic}{topic === 'Matchday' && <span className="tab-dot"/>}</button>)}
          </div>

          <button className="quick-compose" onClick={() => setShowComposer(true)}><Avatar initials="TO" color="lime" size="small"/><span>Got a take? Put it out there...</span><span className="compose-plus"><Plus size={17}/></span></button>

          <div className="posts-list">
            {visiblePosts.map(post => <article className="post-card" key={post.id}>
              <div className="post-top"><Avatar initials={post.initials} color={post.color}/><div className="post-author"><div><strong>{post.author}</strong>{post.hot && <span className="trusted-mark"><Check size={10}/></span>}<span className="post-handle">{post.handle}</span></div><div className="post-meta">{post.club}<span>·</span>{post.time}</div></div><button className="post-more" aria-label="More post options" onClick={() => notify('Post options: report, hide, or share.') }><MoreHorizontal size={20}/></button></div>
              <div className="post-content"><div className={`post-tag tag-${post.tagClass}`}><span/>{post.tag}</div><h3>{post.title}</h3><p>{post.body}</p></div>
              <div className="post-footer"><div className="post-actions"><button className={liked.includes(post.id) ? 'action-liked' : ''} onClick={() => toggle(liked, setLiked, post.id)} aria-label="Like discussion"><Flame size={17} fill={liked.includes(post.id) ? 'currentColor' : 'none'}/><span>{post.likes + (liked.includes(post.id) ? 1 : 0)}</span></button><button onClick={() => notify('Replies are the next part of the discussion experience.')}><MessageCircle size={17}/><span>{post.replies}</span></button><button className={saved.includes(post.id) ? 'action-saved' : ''} onClick={() => toggle(saved, setSaved, post.id)} aria-label="Save discussion"><Bookmark size={16} fill={saved.includes(post.id) ? 'currentColor' : 'none'}/><span>{post.saves + (saved.includes(post.id) ? 1 : 0)}</span></button></div><button className="join-debate" onClick={() => toggle(following, setFollowing, post.id)}>{following.includes(post.id) ? 'Following' : 'Join debate'} <ArrowRight size={14}/></button></div>
            </article>)}
            {visiblePosts.length === 0 && <div className="empty-state"><MessageCircle size={25}/><strong>It’s quiet on this touchline.</strong><span>Start a conversation and get things moving.</span><button onClick={() => setShowComposer(true)}>Start a discussion</button></div>}
          </div>
          <div className="feed-end"><span/> YOU’RE ALL CAUGHT UP <span/></div>
        </main>

        <aside className="right-sidebar">
          <section className="side-panel pulse-panel"><div className="panel-title"><div><span className="panel-eyebrow">AROUND THE GROUNDS</span><h3>Football pulse</h3></div><span className="pulse-icon"><Activity size={16}/></span></div>
            <div className="pulse-stat"><div><span className="pulse-number">1,284</span><span className="pulse-caption">fans online now</span></div><div className="pulse-chart"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div></div>
            <div className="pulse-line"><span/><span/> Community is buzzing <strong>+18%</strong></div>
          </section>

          <section className="side-panel trending-panel"><div className="panel-title"><div><span className="panel-eyebrow">THE TALK OF THE TOWN</span><h3>Trending debates</h3></div><TrendingUp size={17} className="muted-icon"/></div>
            {[
              {n:'01',title:'The Ballon d’Or debate',meta:'Football · 2.4k replies',up:'+24%',hot:true},
              {n:'02',title:'January transfer wishlists',meta:'Transfers · 1.8k replies',up:'+17%'},
              {n:'03',title:'Is VAR helping the game?',meta:'Refereeing · 986 replies',up:'+12%'},
              {n:'04',title:'Who owns the midfield?',meta:'Tactics · 742 replies',up:'+8%'}
            ].map(item => <button className="trend-item" key={item.n} onClick={() => notify(item.title + ' — discussion preview coming soon.')}><span className="trend-number">{item.n}</span><span className="trend-copy"><strong>{item.title}</strong><small>{item.meta}</small></span><span className="trend-growth">{item.up}</span></button>)}
            <button className="panel-link" onClick={() => {setActiveTopic('For you'); notify('You’re seeing the latest conversations.')}}>See what’s trending <ArrowRight size={14}/></button>
          </section>

          <section className="side-panel level-side-panel"><div className="level-side-art"><div className="art-star"><Star size={24} fill="currentColor"/></div><span className="art-ring"/></div><div className="level-side-content"><span className="panel-eyebrow">EARN YOUR PLACE</span><h3>Every contribution<br/>moves you forward.</h3><p>Thoughtful takes. Good debates. A reputation that means something.</p><button onClick={() => notify('Your reputation guide is coming soon.')}>How levels work <ArrowRight size={14}/></button></div></section>

          <footer className="right-footer"><div><a href="#about" onClick={e => {e.preventDefault(); notify('About Football Forum coming soon.')}}>About</a><a href="#guidelines" onClick={e => {e.preventDefault(); notify('Community guidelines coming soon.')}}>Guidelines</a><a href="#privacy" onClick={e => {e.preventDefault(); notify('Privacy details coming soon.')}}>Privacy</a></div><span>© 2026 Football Forum</span><span className="footer-signoff">Built for the love of the game <span>✳</span></span></footer>
        </aside>
      </div>

      <nav className="mobile-bottom-nav">
        {[{name:'Home',icon:Home},{name:'Discover',icon:Search},{name:'Matchday',icon:Trophy},{name:'Profile',icon:Users}].map(item => <button key={item.name} className={activeNav === item.name || (item.name === 'Matchday' && activeNav === 'Matchday Arena') ? 'mobile-nav-active' : ''} onClick={() => {setActiveNav(item.name === 'Matchday' ? 'Matchday Arena' : item.name); if (item.name !== 'Home') notify(item.name + ' is on the roadmap.')}}><item.icon size={20}/><span>{item.name}</span></button>)}
      </nav>

      {notice && <div className="toast"><Check size={16}/>{notice}<button onClick={() => setNotice('')} aria-label="Dismiss"><X size={14}/></button></div>}
      {showComposer && <div className="modal-backdrop" onClick={() => setShowComposer(false)}><section className="composer-modal" onClick={e => e.stopPropagation()}><div className="modal-header"><div><span className="panel-eyebrow">YOUR TAKE, YOUR TOUCHLINE</span><h2>Start a discussion</h2></div><button className="icon-button" onClick={() => setShowComposer(false)} aria-label="Close"><X size={19}/></button></div><div className="composer-user"><Avatar initials="TO" color="lime"/><div><strong>Your voice belongs here.</strong><span>Keep it football. Keep it respectful.</span></div></div><textarea value={draft} onChange={e => setDraft(e.target.value)} placeholder="What’s on your football mind?" rows={5}/><div className="composer-bottom"><span>{draft.length}/500</span><button className="create-button" disabled={!draft.trim() || draft.length > 500} onClick={() => {setShowComposer(false); setDraft(''); notify('Your draft is ready for the discussion engine to be connected.')}}><Send size={15}/> Post discussion</button></div><div className="composer-note"><ShieldCheck size={14}/> Community guidelines apply to every post.</div></section></div>}
    </div>
  );
}

export default App;