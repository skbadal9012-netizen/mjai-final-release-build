/**
 * MJAI — Final Release Build App Logic
 * Commander: DR SK BADAL
 * Features: Tab switching, 60-second dynamic rotating password, countdown timer, 
 * WhatsApp notification dispatch for access requests & credentials.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Commander Phone Number for WhatsApp Alerts (Dr. SK Badal)
    const COMMANDER_PHONE = "919876543210"; // Placeholder / Default Commander WhatsApp

    // --- Tab Switching Logic ---
    const navTabs = document.querySelectorAll('.nav-tab');
    const modules = document.querySelectorAll('.module-section');

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');
            
            navTabs.forEach(t => t.classList.remove('active'));
            modules.forEach(m => m.classList.remove('active'));

            tab.classList.add('active');
            const targetModule = document.getElementById(targetId);
            if (targetModule) {
                targetModule.classList.add('active');
            }
        });
    });

    // --- Update Banner Logic ---
    const updateBanner = document.getElementById('updateBanner');
    const updateBtn = document.getElementById('updateBtn');
    const dismissUpdate = document.getElementById('dismissUpdate');

    // Show banner after 2 seconds for demo
    setTimeout(() => {
        if (updateBanner) updateBanner.classList.remove('hidden');
    }, 2000);

    if (dismissUpdate) {
        dismissUpdate.addEventListener('click', () => {
            updateBanner.classList.add('hidden');
        });
    }

    if (updateBtn) {
        updateBtn.addEventListener('click', () => {
            alert('MJAI v2.6.0-release update deployment initiated successfully!');
            updateBanner.classList.add('hidden');
            const versionBadge = document.getElementById('versionBadge');
            if (versionBadge) versionBadge.textContent = 'v2.6.0-release';
        });
    }

    // --- Dynamic Password & 60-Second Rotation System ---
    let currentPassword = generateRandomPassword();
    let timeLeft = 60;
    const passDisplay = document.getElementById('dynamicPassDisplay');
    const timerDisplay = document.getElementById('passTimer');
    const copyPassBtn = document.getElementById('copyPassBtn');

    function generateRandomPassword() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let pass = 'MJAI-';
        for (let i = 0; i < 4; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return pass;
    }

    function updatePasswordDisplay() {
        if (passDisplay) passDisplay.textContent = currentPassword;
    }

    // Initialize password display
    updatePasswordDisplay();

    // Countdown Timer & Rotation Interval
    const timerInterval = setInterval(() => {
        timeLeft--;
        if (timerDisplay) timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            // Rotate Password
            currentPassword = generateRandomPassword();
            updatePasswordDisplay();
            timeLeft = 60;

            // Automatically dispatch new password alert to Commander WhatsApp in background simulation or log
            console.log(`[MJAI SECURITY] Password rotated to: ${currentPassword}`);
        }
    }, 1000);

    // Copy Password Feature
    if (copyPassBtn) {
        copyPassBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(currentPassword).then(() => {
                const originalText = copyPassBtn.textContent;
                copyPassBtn.textContent = 'Copied!';
                copyPassBtn.style.background = 'var(--accent-green, #10b981)';
                setTimeout(() => {
                    copyPassBtn.textContent = originalText;
                    copyPassBtn.style.background = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy password: ', err);
            });
        });
    }

    // --- Access Request Form & WhatsApp Dispatch ---
    const accessForm = document.getElementById('accessRequestForm');
    if (accessForm) {
        accessForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const visitorName = document.getElementById('visitorName').value.trim();
            const visitorPhone = document.getElementById('visitorPhone').value.trim();
            const accessReason = document.getElementById('accessReason').value.trim();

            if (!visitorName || !visitorPhone || !accessReason) {
                alert('Please fill in all required fields.');
                return;
            }

            // Construct WhatsApp Message
            const msg = `🚨 *MJAI ACCESS REQUEST* 🚨%0A%0A*Name:* ${encodeURIComponent(visitorName)}%0A*Phone:* ${encodeURIComponent(visitorPhone)}%0A*Reason:* ${encodeURIComponent(accessReason)}%0A*Current Active Pass:* ${currentPassword}%0A%0APlease authorize or deny access.`;
            
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${COMMANDER_PHONE}&text=${msg}`;

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');

            // Success feedback
            alert(`Access request submitted successfully for ${visitorName}! Redirecting to WhatsApp to notify Commander Dr. SK Badal.`);
            accessForm.reset();
        });
    }

    // --- Neural AI Core Mock Chat ---
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatMessages = document.getElementById('chatMessages');

    if (sendChatBtn && chatInput && chatMessages) {
        const handleSendMessage = () => {
            const text = chatInput.value.trim();
            if (!text) return;

            // Append User Message
            const userBubble = document.createElement('div');
            userBubble.className = 'chat-bubble user';
            userBubble.style.cssText = 'align-self: flex-end; background: var(--accent-color); color: #fff; padding: 10px 14px; border-radius: 12px 12px 0 12px; max-width: 80%; font-size: 14px; margin-bottom: 8px;';
            userBubble.textContent = text;
            chatMessages.appendChild(userBubble);

            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Simulate AI Response
            setTimeout(() => {
                const aiBubble = document.createElement('div');
                aiBubble.className = 'chat-bubble ai';
                aiBubble.style.cssText = 'align-self: flex-start; background: var(--surface-color); border: 1px solid var(--border-color); color: var(--text-primary); padding: 10px 14px; border-radius: 12px 12px 12px 0; max-width: 80%; font-size: 14px; margin-bottom: 8px;';
                aiBubble.innerHTML = `<strong>MJAI Neural Core:</strong> Acknowledged request regarding "${text}". Security clearance verified under Commander Dr. SK Badal. Systems operating at 100% efficiency.`;
                chatMessages.appendChild(aiBubble);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 800);
        };

        sendChatBtn.addEventListener('click', handleSendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
    }

    // --- Terminal Live Simulation ---
    const terminalLogs = document.getElementById('terminalLogs');
    if (terminalLogs) {
        const logs = [
            "[INFO] MJAI Neural Grid initializing...",
            "[SEC] 60-second rotating password system active.",
            "[NET] WhatsApp alert bridge connected to Commander SK Badal.",
            "[SYS] Memory allocation stable at 14.2% [OK]",
            "[AI] Neural core responding within 12ms latency."
        ];
        let index = 0;
        setInterval(() => {
            if (index < logs.length) {
                const p = document.createElement('div');
                p.style.cssText = 'color: #10b981; font-family: monospace; font-size: 13px; margin-bottom: 4px;';
                p.textContent = logs[index];
                terminalLogs.appendChild(p);
                terminalLogs.scrollTop = terminalLogs.scrollHeight;
                index++;
            }
        }, 3000);
    }
});
