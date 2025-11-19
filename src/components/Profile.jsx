import React, { useState, useEffect, useRef } from "react";
import "./Profile.css";

// --- Sample Data for Demonstration ---
const initialFriends = [
  { id: 1, name: "Aisha", level: "Silver I", lastSeen: "2h ago" },
  { id: 2, name: "Raghav", level: "Bronze II", lastSeen: "1d ago" },
];
const initialPotentialFriends = [
  { id: 4, name: "Liam", level: "Gold III", lastSeen: "15m ago" },
  { id: 5, name: "Zoe", level: "Bronze I", lastSeen: "5h ago" },
  { id: 6, name: "Ethan", level: "Silver II", lastSeen: "2w ago" },
];

// Content for the Ranking Panel
const workspaceRankings = [
    { rank: 1, team: "Data Science Dept.", xp: "9,800", level: "Master", progress: 95 },
    { rank: 2, team: "Web Development Team", xp: "8,500", level: "Expert", progress: 85 },
    { rank: 3, team: "Marketing & Strategy", xp: "7,200", level: "Pro", progress: 72 },
    { rank: 4, team: "Product Design Hub", xp: "6,100", level: "Advanced", progress: 61 },
    { rank: 5, team: "HR & Operations", xp: "4,900", level: "Intermediate", progress: 49 },
];

// Content for the Testimonials Panel
const sampleTestimonials = [
  { id: 1, name: "Julie Tref", title: "Senior Analyst", text: "The **bite-sized courses** made learning new analytics tools incredibly easy. My proficiency in Python has jumped by 40% in just two months! Highly practical and engaging.", avatar: "J" },
  { id: 2, name: "Alfonso Laken", title: "Project Manager", text: "I love the **gamification**! The XP points and badges keep me motivated to complete modules. It transformed a dull compliance course into a competitive fun activity.", avatar: "A" },
  { id: 3, name: "Sara Chen", title: "UX Designer", text: "The support community is fantastic. I posed a tricky design problem and got three different, workable solutions within an hour. **Great community knowledge sharing.**", avatar: "S" },
  { id: 4, name: "Marco Diaz", title: "DevOps Engineer", text: "Unlike other platforms, the content here is **always up-to-date** with the latest industry standards. The Kubernetes track was flawless and immediately applicable to my work.", avatar: "M" },
];

const characterList = [
    "Warrior", "Mage", "Rogue", "Archer", "Wizard", "Ninja", 
    "Samurai", "Viking", "Dwarf", "Elf", "Fairy", "Ghost" 
];

// -------------------------------------

const Profile = ({ profileData = {}, goBack = () => console.log("Go Back clicked") }) => {
  
  // --- STATE INITIALIZATION ---
  // Using localStorage for persistent profile data
  const storedProfile = JSON.parse(localStorage.getItem("ls_profile") || "null");
  const initialProfile = storedProfile || {
    firstName: profileData.firstName || "Anu",
    lastName: profileData.lastName || "Piya", 
    gender: profileData.gender || "Female", 
    about: profileData.about || "Passionate learner and developer.",
    xp: profileData.xp || "3740",
    rank: profileData.rank || "Gold II",
    badges: profileData.badges || "12",
    photo: profileData.photo || null,
    character: profileData.character || "Archer",
  };

  const [localProfile, setLocalProfile] = useState(initialProfile);
  
  // Friends State
  const [currentFriends, setCurrentFriends] = useState(initialFriends);
  const [potentialFriends, setPotentialFriends] = useState(initialPotentialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null); 
  
  // Panel State
  const [activePanel, setActivePanel] = useState("dashboard"); 
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ 
    firstName: localProfile.firstName, 
    lastName: localProfile.lastName,
    gender: localProfile.gender,
    about: localProfile.about 
  });
  
  // Chat States
  const [friendChatMessages, setFriendChatMessages] = useState([]); // 1-on-1 chat
  const [globalChatMessages, setGlobalChatMessages] = useState([]); // Public chat
  const [chatInput, setChatInput] = useState("");
  
  // Ref for auto-scrolling chat
  const chatMessagesRef = useRef(null);
  
  // -----------------------------------

  // --- useEffects ---
  useEffect(() => {
    // Save profile to local storage on change
    localStorage.setItem("ls_profile", JSON.stringify(localProfile));
    setEditForm({ 
      firstName: localProfile.firstName, 
      lastName: localProfile.lastName,
      gender: localProfile.gender,
      about: localProfile.about 
    });
  }, [localProfile]);

  useEffect(() => {
    // Reset friend chat when switching away from Friends/Detail/Chat
    if (activePanel !== 'friends' && activePanel !== 'detail' && activePanel !== 'chat') {
        setSelectedFriend(null);
        setFriendChatMessages([]);
    }
    
    // Initialize dummy friend chat messages when entering friend chat
    if (activePanel === 'chat' && friendChatMessages.length === 0 && selectedFriend) {
        setFriendChatMessages([
            { id: 1, sender: selectedFriend.name, text: `Hey ${localProfile.firstName}, how is the ${selectedFriend.level} path?`, type: "received" },
            { id: 2, sender: localProfile.firstName, text: "It's tough! You wanna try a module together?", type: "sent" },
        ]);
    } 

    // Initialize dummy global chat messages when entering global chat
    if (activePanel === 'globalchat' && globalChatMessages.length === 0) {
        setGlobalChatMessages([
            { id: 1, sender: "System", text: "Welcome to the **Global Learning Chat**! Please be polite.", type: "system" },
            { id: 2, sender: "Liam", text: "Is anyone else struggling with the final challenge in the 'Advanced React' course?", type: "received" },
            { id: 3, sender: "Zoe", text: "Yes! Check the forum under 'Hooks Issue'. I posted a solution there.", type: "received" },
        ]);
    }

  }, [activePanel, selectedFriend]);
  
  // Auto-scroll chat window when new messages arrive
  useEffect(() => {
    if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [friendChatMessages, globalChatMessages]);

  // --- Handlers ---
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setLocalProfile((prev) => ({ ...prev, photo: reader.result, character: null }));
    };
    reader.readAsDataURL(file);
  };

  const handleCharacterSelect = (char) => {
    setLocalProfile((prev) => ({ ...prev, character: char, photo: null }));
  };

  const handleFormChange = (e) => {
    setEditForm({...editForm, [e.target.name]: e.target.value});
  };

  const handleSaveEdit = () => {
    setLocalProfile((prev) => ({ 
        ...prev, 
        firstName: editForm.firstName, 
        lastName: editForm.lastName, 
        gender: editForm.gender, 
        about: editForm.about 
    }));
    setIsEditing(false);
  };
  
  const handleAddFriend = (friend) => {
    setCurrentFriends((prev) => [...prev, friend]);
    setPotentialFriends((prev) => prev.filter(f => f.id !== friend.id));
    setSelectedFriend(null);
    setActivePanel('friends');
  };

  // 💡 NEW HANDLER: Function to remove a friend
  const handleRemoveFriend = (friendToRemove) => {
    if (window.confirm(`Are you sure you want to remove ${friendToRemove.name} from your friends list?`)) {
        // 1. Remove from currentFriends list
        setCurrentFriends(prev => prev.filter(f => f.id !== friendToRemove.id));
        
        // 2. Optionally move back to potentialFriends (if not already there)
        // NOTE: This assumes the friend was originally a potential friend.
        // To prevent duplicates, we check if they are already in potentialFriends.
        if (!potentialFriends.some(f => f.id === friendToRemove.id) && friendToRemove.id > 2) {
            setPotentialFriends(prev => [...prev, friendToRemove]);
        }

        // 3. Reset selected friend and navigate back to the friends list
        setSelectedFriend(null);
        setActivePanel('friends');
    }
  };

  const handleSendMessage = (isGlobal = false) => {
    if (chatInput.trim() === "") return;

    const newMessage = {
        id: Date.now(),
        sender: localProfile.firstName,
        text: chatInput.trim(),
        type: "sent"
    };
    
    setChatInput("");

    if (isGlobal) {
        setGlobalChatMessages(prev => [...prev, newMessage]);
        
        // Simulate a received message in the Global Chat
        setTimeout(() => {
            const botResponses = [
                "That's a good point! I agree completely.",
                "Hmm, I haven't tried that approach yet. Thanks for the tip!",
                "Does anyone have a resource link for this topic?",
                "Interesting! I'll look into that after my next module.",
                "Awesome, thanks for the contribution!"
            ];
            const randomBotName = ["LearningBot-01", "XP_Giver", "Mentor_AI"][Math.floor(Math.random() * 3)];
            
            const reply = {
                id: Date.now() + 1,
                sender: randomBotName, 
                text: botResponses[Math.floor(Math.random() * botResponses.length)],
                type: "received"
            };
            setGlobalChatMessages(prev => [...prev, reply]);
        }, 1500); // 1.5 second delay
        
    } else {
        // 1-on-1 friend chat reply logic
        setFriendChatMessages(prev => [...prev, newMessage]);

        setTimeout(() => {
            const reply = {
                id: Date.now() + 1,
                sender: selectedFriend.name,
                text: "Got your message! I'll check it out.",
                type: "received"
            };
            setFriendChatMessages(prev => [...prev, reply]);
        }, 1500);
    }
  };


  // --- Panel Renderers ---

  const renderDashboardPanel = () => (
    <>
      <h4>My Dashboard Overview</h4>
      <div className="stat-cards-grid">
          <div className="stat-card large">
              <div><h4>Learning Score</h4><div className="big-score">3.75</div></div>
              <div className="score-meta"><p>Top 15%</p></div>
          </div>
          <div className="stat-card"><h4>Finished Skills</h4><div className="stat-value">4</div></div>
          <div className="stat-card"><h4>Watched Workflows</h4><div className="stat-value">12</div></div>
          <div className="stat-card"><h4>Viewed Time</h4><div className="stat-value">1h 32m</div></div>
      </div>
      
      {/* Ranking Card - Updated Content */}
      <div className="ranking-card full-width-card">
          <h4>🏆 Ranking by Workspace</h4>
          <ol className="ranking-list">
              {workspaceRankings.map((r) => (
                  <li key={r.rank} className="ranking-item">
                      <span className="rank-num">#{r.rank}</span>
                      <span className="team-name">**{r.team}**</span>
                      <span className="team-level">({r.level})</span>
                      <span className="team-xp">{r.xp} XP</span>
                      <div className="progress-bar-wrap">
                          <div className="progress-bar" style={{width: `${r.progress}%`}}></div>
                      </div>
                  </li>
              ))}
          </ol>
      </div>
    </>
  );

  const renderFriendsPanel = () => (
    <>
      <h4>👥 My Friends ({currentFriends.length})</h4>
      <div className="friend-grid current-friends">
        {currentFriends.map((f) => (
          <div key={f.id} className="friend-card" onClick={() => { setSelectedFriend(f); setActivePanel('detail'); }}>
            <div className="friend-initial">{f.name.charAt(0)}</div>
            <h5>{f.name}</h5>
            <p>{f.level}</p>
            <div className="friend-actions">
                <button className="add-friend-btn">View Profile</button>
            </div>
          </div>
        ))}
      </div>
      
      {potentialFriends.length > 0 && (
        <>
            <h4 style={{marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px'}}>People You May Know</h4>
            <div className="friend-grid potential-friends">
                {potentialFriends.map((f) => (
                    <div key={f.id} className="friend-card potential" onClick={() => { setSelectedFriend(f); setActivePanel('detail'); }}>
                        <div className="friend-initial">{f.name.charAt(0)}</div>
                        <h5>{f.name}</h5>
                        <p>{f.level}</p>
                        <div className="friend-actions">
                            <button className="add-friend-btn">View Profile</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
      )}
    </>
  );

  const renderFriendDetailPanel = () => {
    if (!selectedFriend) return <div>Friend not found.</div>;
    const isFriend = currentFriends.some(f => f.id === selectedFriend.id);
    
    return (
        <div className="friend-detail-panel">
            <button className="back-to-friends" onClick={() => setActivePanel('friends')}>← Back to Friends List</button>
            <div className="friend-detail-header">
                <div className="friend-initial large">{selectedFriend.name.charAt(0)}</div>
                <div>
                    <h2>{selectedFriend.name}</h2>
                    <p>Level: **{selectedFriend.level}**</p>
                    <p>Last Active: {selectedFriend.lastSeen}</p>
                </div>
            </div>
            
            <div className="friend-detail-actions">
                {isFriend ? (
                    <>
                        <button className="chat-btn-action" onClick={() => setActivePanel('chat')}>💬 Start Chat</button>
                        {/* 💡 ATTACHED handleRemoveFriend HERE */}
                        <button 
                            className="remove-friend-action" 
                            onClick={() => handleRemoveFriend(selectedFriend)}
                        >
                            ❌ Remove Friend
                        </button>
                    </>
                ) : (
                    <button className="add-friend-action" onClick={() => handleAddFriend(selectedFriend)}>🤝 Add Friend</button>
                )}
            </div>
            
            <div className="friend-detail-stats">
                <h4>{selectedFriend.name}'s Stats</h4>
                <div className="stat-row">
                    <span>XP:</span> <span>5400</span>
                </div>
                <div className="stat-row">
                    <span>Finished Courses:</span> <span>6</span>
                </div>
                <div className="stat-row">
                    <span>Current Rank:</span> <span>{selectedFriend.level}</span>
                </div>
            </div>
        </div>
    );
  };
  
  // Friend (1-on-1) Chat Panel
  const renderChatRoomPanel = () => (
    <div className="chat-room">
        <div className="chat-header">
            <h3>Chatting with {selectedFriend.name}</h3>
            <button className="close-chat" onClick={() => setActivePanel('detail')}>← Back to Profile</button>
        </div>
        <div className="chat-messages" ref={chatMessagesRef}>
            {friendChatMessages.map((msg) => (
                <div key={msg.id} className={`chat-msg ${msg.type}`}>
                    <div className="msg-bubble">
                        <strong>{msg.sender === localProfile.firstName ? "You" : msg.sender}</strong>
                        <p>{msg.text}</p>
                        <small>{new Date(msg.id).toLocaleTimeString()}</small>
                    </div>
                </div>
            ))}
        </div>
        <div className="chat-input">
            <input 
                type="text" 
                placeholder="Type a private message..." 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)} 
                onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(false); }}
            />
            <button onClick={() => handleSendMessage(false)}>Send</button>
        </div>
    </div>
  );
  
  // Global (Public) Chat Room Panel
  const renderGlobalChatPanel = () => (
    <div className="chat-room global-chat">
        <div className="chat-header">
            <h3> Global Chat Room (Public)</h3>
            <button className="close-chat" onClick={() => setActivePanel('dashboard')}>← Exit Chat</button>
        </div>
        <div className="chat-messages" ref={chatMessagesRef}>
            {globalChatMessages.map((msg) => (
                <div key={msg.id} className={`chat-msg ${msg.type}`}>
                    <div className="msg-bubble">
                        {msg.type !== "system" && <strong>{msg.sender === localProfile.firstName ? "You" : msg.sender}</strong>}
                        <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </div>
                </div>
            ))}
        </div>
        <div className="chat-input">
            <input 
                type="text" 
                placeholder="Type a public message for all learners..." 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)} 
                onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(true); }}
            />
            <button onClick={() => handleSendMessage(true)}>Send</button>
        </div>
        
    </div>
  );

  // Testimonials Panel - Updated Content
  const renderTestimonialsPanel = () => (
    <div className="testimonials-panel">
      <h4>⭐ What Our Users Say</h4>
      <div className="testimonial-grid">
          {sampleTestimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                  <blockquote dangerouslySetInnerHTML={{ __html: t.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></blockquote>
                  <div className="testimonial-footer">
                      <div className="testimonial-avatar">{t.avatar}</div>
                      <div>
                          <strong>{t.name}</strong>
                          <p>{t.title}</p>
                      </div>
                  </div>
              </div>
          ))}
      </div>
      <div className="note-card">
          <p>Want to be featured? Share your success story on the **Global Chat Room**!</p>
      </div>
    </div>
  );

  const renderEditProfilePanel = () => (
    <>
        <h4>✏️ Edit Profile Details</h4>
        <div className="edit-form-container">
            {!isEditing ? (
                <div className="current-details">
                    <p><strong>First Name:</strong> {localProfile.firstName}</p>
                    <p><strong>Last Name:</strong> {localProfile.lastName}</p>
                    <p><strong>Gender:</strong> {localProfile.gender}</p>
                    <p><strong>About:</strong> {localProfile.about}</p>
                    <button className="edit-btn" onClick={() => { setIsEditing(true); }}>Edit Details</button>
                </div>
            ) : (
                <div className="edit-fields">
                    <label>First Name</label><input name="firstName" value={editForm.firstName} onChange={handleFormChange} />
                    <label>Last Name</label><input name="lastName" value={editForm.lastName} onChange={handleFormChange} />
                    
                    <label>Gender</label>
                    <select name="gender" value={editForm.gender} onChange={handleFormChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <label>About Bio</label>
                    <textarea name="about" value={editForm.about} onChange={handleFormChange}/>
                    
                    <div className="edit-actions">
                        <button className="save-btn" onClick={handleSaveEdit}>Save Changes</button>
                        <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>

        <h4 style={{marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px'}}>🎭 Choose Your Avatar</h4>
        <div className="character-grid">
            {characterList.map((c) => (
            <div
                key={c}
                className={`char-card ${localProfile.character === c ? "active" : ""}`}
                onClick={() => handleCharacterSelect(c)}
            >
                <img 
                // Dicebear allows specific sprites based on the seed name for diversity
                src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${c}&flip=true`} 
                alt={c} 
                />
                <h5>{c}</h5>
            </div>
            ))}
        </div>
    </>
  );


  // Maps the activePanel state to the correct content renderer
  const renderPanelContent = () => {
    switch (activePanel) {
      case 'dashboard':
        return renderDashboardPanel();
      case 'friends':
        return renderFriendsPanel();
      case 'detail':
        return renderFriendDetailPanel();
      case 'testimonials':
        return renderTestimonialsPanel();
      case 'chat':
        return renderChatRoomPanel(); // 1-on-1 friend chat
      case 'globalchat':
        return renderGlobalChatPanel(); // Public chat room
      case 'edit':
      case 'photo': 
        return renderEditProfilePanel();
      default:
        return <h2>Select an option from the menu.</h2>;
    }
  };


  return (
    <div className="profile-page">
      <button className="close-btn" onClick={goBack}>✕</button>

      <div className="profile-dashboard">
        <aside className="profile-sidebar">
          
          <div className="sidebar-top-section">
            <div className="avatar-wrap">
                <img
                    src={ localProfile.photo || `https://api.dicebear.com/8.x/adventurer/svg?seed=${localProfile.character || 'Anu'}` }
                    alt="avatar"
                    className="profile-avatar"
                />
            </div>
            <div className="sidebar-info">
              <h2>{localProfile.firstName} {localProfile.lastName}</h2>
              <p className="bio">{localProfile.about}</p>
              <div className="mini-stats">
                <div><strong>XP</strong><span>{localProfile.xp}</span></div>
                <div><strong>Rank</strong><span>{localProfile.rank}</span></div>
                <div><strong>Badges</strong><span>{localProfile.badges}</span></div>
              </div>
            </div>
          </div>
          

          {/* New Sidebar Navigation Menu */}
          <div className="sidebar-actions new-menu">
            <button onClick={() => setActivePanel("edit")}><label> Edit Profile</label></button>
            <button onClick={() => { setActivePanel("edit"); }}>
                <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} id="photo-upload" />
                <label htmlFor="photo-upload">📸 Change Photo</label>
            </button>
            <div style={{ margin: '10px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}></div>
            <button onClick={() => setActivePanel("dashboard")}>Dashboard</button>
            <button onClick={() => setActivePanel("friends")}>👥 Friends ({currentFriends.length})</button>
            <button onClick={() => setActivePanel("globalchat")}>Global Chat Room</button>
            <button onClick={() => setActivePanel("testimonials")}>Testimonials</button>
            {/* Show chat button only if a friend is selected for quick access */}
            {selectedFriend && activePanel === 'detail' && (
                <button onClick={() => setActivePanel("chat")}>Chat with {selectedFriend.name}</button>
            )}
            {!selectedFriend && (
                <button disabled style={{ opacity: 0.5, cursor: 'default' }}> Select Friend to Chat</button>
            )}
          </div>
        </aside>

        {/* Main Section (Dynamic Content) */}
        <main className="profile-main">
          <div className="dynamic-panel">
            {renderPanelContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;