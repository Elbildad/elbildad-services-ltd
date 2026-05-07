<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Request Submitted — Elbildad Services</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * { font-family: 'Inter', sans-serif; }
        body { background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%); min-height: 100vh; }

        .particles { position: fixed; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
        .particle { position: absolute; border-radius: 50%; animation: floatUp linear infinite; opacity: 0.12; }
        @keyframes floatUp {
            0%   { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10%  { opacity: 0.12; }
            90%  { opacity: 0.12; }
            100% { transform: translateY(-100px) rotate(720deg); opacity: 0; }
        }

        .success-card { animation: slideUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px) scale(0.96); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .check-circle { animation: popIn 0.6s 0.3s cubic-bezier(0.175,0.885,0.32,1.275) both; }
        @keyframes popIn {
            from { opacity: 0; transform: scale(0.4); }
            to   { opacity: 1; transform: scale(1); }
        }

        .ripple   { animation: rippleAnim 2s ease-out 0.9s infinite; }
        .ripple-2 { animation: rippleAnim 2s ease-out 1.4s infinite; }
        @keyframes rippleAnim {
            0%   { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(1.9); opacity: 0; }
        }

        .check-path { stroke-dasharray: 60; stroke-dashoffset: 60; animation: drawCheck 0.5s ease-out 0.9s forwards; }
        @keyframes drawCheck { to { stroke-dashoffset: 0; } }

        .fade-up          { animation: fadeInUp 0.5s ease both; }
        .delay-ref        { animation-delay: 1.1s; }
        .delay-agent      { animation-delay: 1.25s; }
        .delay-steps      { animation-delay: 1.3s; }
        .delay-cta        { animation-delay: 1.5s; }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
        }

        .glass { background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); }

        .step-item { animation: fadeInUp 0.4s ease both; }
        .step-item:nth-child(1) { animation-delay: 1.4s; }
        .step-item:nth-child(2) { animation-delay: 1.55s; }
        .step-item:nth-child(3) { animation-delay: 1.7s; }

        .btn-login { background: linear-gradient(135deg,#2563eb,#1d4ed8); box-shadow: 0 0 0 0 rgba(37,99,235,.5); transition: all .3s ease; }
        .btn-login:hover { box-shadow: 0 8px 25px rgba(37,99,235,.5); transform: translateY(-2px); }
        .btn-login:active { transform: translateY(0); }

        .btn-wa { background: linear-gradient(135deg,#16a34a,#15803d); transition: all .3s ease; }
        .btn-wa:hover { box-shadow: 0 8px 25px rgba(22,163,74,.45); transform: translateY(-2px); }
        .btn-wa:active { transform: translateY(0); }

        .btn-home { transition: all .3s ease; }
        .btn-home:hover { background: rgba(255,255,255,.08); transform: translateY(-2px); }

        .copy-btn { transition: all .2s ease; }
        .copy-btn:hover { opacity: .8; }
        .copy-btn:active { transform: scale(.9); }

        .agent-avatar { background: linear-gradient(135deg,#6366f1,#8b5cf6); }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen py-12 px-4 relative">

    <div class="particles" id="particles"></div>

    <div class="relative z-10 w-full max-w-lg">
        <div class="success-card glass rounded-3xl p-8 md:p-10 text-white text-center shadow-2xl">

            {{-- Animated success icon --}}
            <div class="relative flex items-center justify-center mb-7">
                <div class="ripple absolute w-24 h-24 rounded-full bg-emerald-500 opacity-50"></div>
                <div class="ripple-2 absolute w-24 h-24 rounded-full bg-emerald-500 opacity-50"></div>
                <div class="check-circle relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/40">
                    <svg class="w-12 h-12" viewBox="0 0 48 48" fill="none">
                        <path class="check-path" d="M12 24L21 33L36 16" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div id="confetti-burst" class="absolute inset-0 overflow-visible pointer-events-none"></div>
                </div>
            </div>

            {{-- Heading --}}
            <h1 class="text-3xl md:text-4xl font-bold mb-2">Request Submitted! 🎉</h1>
            <p class="text-slate-300 text-sm md:text-base mb-6 leading-relaxed">
                Thank you, <span class="font-semibold text-white">{{ $rfq->customer->name ?? 'valued customer' }}</span>!
                Your sourcing request for
                <span class="text-emerald-400 font-medium">{{ $rfq->product_name }}</span>
                has been received.
            </p>

            {{-- Reference number --}}
            <div class="fade-up delay-ref glass rounded-2xl p-4 mb-5">
                <p class="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Your Reference Number</p>
                <div class="flex items-center justify-center gap-3">
                    <span id="ref-number" class="text-lg md:text-xl font-mono font-bold text-emerald-400 tracking-wider select-all">
                        ELB-{{ strtoupper(substr($rfq->tracking_token, 0, 8)) }}
                    </span>
                    <button onclick="copyRef()" class="copy-btn flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-slate-300">
                        <svg id="copy-icon" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                        </svg>
                        <span id="copy-label">Copy</span>
                    </button>
                </div>
                <p class="text-xs text-slate-500 mt-1.5">Save this to track your request</p>
            </div>

            {{-- ── Assigned Agent card ── --}}
            @if($rfq->assignedAgent)
            <div class="fade-up delay-agent glass rounded-2xl p-5 mb-5 text-left">
                <p class="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Your Assigned Agent</p>
                <div class="flex items-center gap-4">
                    {{-- Avatar with initials --}}
                    <div class="agent-avatar w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {{ strtoupper(substr($rfq->assignedAgent->name, 0, 1)) }}
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="font-semibold text-white truncate">{{ $rfq->assignedAgent->name }}</p>
                        <p class="text-xs text-slate-400">Sourcing Specialist</p>
                        @if($rfq->assignedAgent->whatsapp_number)
                        <p class="text-xs text-emerald-400 mt-0.5">{{ $rfq->assignedAgent->whatsapp_number }}</p>
                        @endif
                    </div>
                    {{-- Direct chat button --}}
                    @if($rfq->assignedAgent->whatsapp_number)
                    @php
                        $agentWa = preg_replace('/\D/', '', $rfq->assignedAgent->whatsapp_number);
                        // Normalise Nigerian numbers: if starts with 0, replace with 234
                        if (str_starts_with($agentWa, '0')) {
                            $agentWa = '234' . substr($agentWa, 1);
                        }
                        $rfqRef = 'ELB-' . strtoupper(substr($rfq->tracking_token, 0, 8));
                        $waMsg  = urlencode("Hi, I'm {$rfq->customer->name}. My RFQ reference is {$rfqRef} (for {$rfq->product_name}). I'd like to follow up.");
                    @endphp
                    <a href="https://wa.me/{{ $agentWa }}?text={{ $waMsg }}" target="_blank"
                       class="flex-shrink-0 flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5">
                        <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current flex-shrink-0">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.846L.057 23.625a.75.75 0 00.92.92l5.78-1.477A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.99 0-3.865-.553-5.463-1.515l-.392-.232-4.054 1.036 1.054-3.953-.255-.406A9.712 9.712 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                        </svg>
                        Chat Now
                    </a>
                    @endif
                </div>
            </div>
            @else
            {{-- No agent yet — queued --}}
            <div class="fade-up delay-agent glass rounded-2xl p-4 mb-5 text-left flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-amber-500/20 flex-shrink-0 flex items-center justify-center">
                    <svg class="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <div>
                    <p class="text-sm font-semibold text-white">Agent being assigned…</p>
                    <p class="text-xs text-slate-400 mt-0.5">A specialist will be assigned shortly and will reach out via WhatsApp.</p>
                </div>
            </div>
            @endif

            {{-- What happens next --}}
            <div class="fade-up delay-steps text-left mb-6 space-y-2.5">
                <p class="text-xs font-semibold uppercase tracking-widest text-slate-400 text-center mb-3">What happens next?</p>

                <div class="step-item flex items-start gap-3 glass rounded-xl p-3.5">
                    <div class="w-7 h-7 rounded-full bg-blue-500/20 flex-shrink-0 flex items-center justify-center text-blue-400 font-bold text-xs">1</div>
                    <div>
                        <p class="text-sm font-medium text-white">Agent Assigned</p>
                        <p class="text-xs text-slate-400">A sourcing specialist reviews your request within a few hours.</p>
                    </div>
                </div>

                <div class="step-item flex items-start gap-3 glass rounded-xl p-3.5">
                    <div class="w-7 h-7 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center text-purple-400 font-bold text-xs">2</div>
                    <div>
                        <p class="text-sm font-medium text-white">WhatsApp Update</p>
                        <p class="text-xs text-slate-400">You'll receive a quote and sourcing details via WhatsApp within 48 hours.</p>
                    </div>
                </div>

                <div class="step-item flex items-start gap-3 glass rounded-xl p-3.5">
                    <div class="w-7 h-7 rounded-full bg-emerald-500/20 flex-shrink-0 flex items-center justify-center text-emerald-400 font-bold text-xs">3</div>
                    <div>
                        <p class="text-sm font-medium text-white">Track in Dashboard</p>
                        <p class="text-xs text-slate-400">Log in anytime to see live status updates on your request.</p>
                    </div>
                </div>
            </div>

            {{-- CTA buttons --}}
            <div class="fade-up delay-cta space-y-3">
                <a href="{{ route('login') }}"
                   class="btn-login w-full flex items-center justify-center gap-2 rounded-2xl py-4 text-base font-semibold text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                    </svg>
                    Login to Your Dashboard
                </a>

                {{-- General Elbildad WhatsApp (fallback or no agent) --}}
                <a href="https://wa.me/2348032775756?text={{ urlencode('Hi Elbildad, I just submitted an RFQ (Ref: ELB-' . strtoupper(substr($rfq->tracking_token, 0, 8)) . '). I have a question.') }}"
                   target="_blank"
                   class="btn-wa w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold text-white">
                    <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current flex-shrink-0">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.846L.057 23.625a.75.75 0 00.92.92l5.78-1.477A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.99 0-3.865-.553-5.463-1.515l-.392-.232-4.054 1.036 1.054-3.953-.255-.406A9.712 9.712 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                    </svg>
                    Chat with Elbildad Support
                </a>

                <a href="{{ url('/') }}"
                   class="btn-home w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-medium text-slate-300 border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    Back to Home
                </a>
            </div>

        </div>

        <div class="text-center mt-6">
            <a href="{{ url('/') }}" class="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                <img src="/images/logo/elbildad-logo.png" alt="Elbildad" class="w-5 h-5 object-contain opacity-60">
                <span>Elbildad Services Ltd</span>
            </a>
        </div>
    </div>

    <script>
        // Floating particles
        const pCont = document.getElementById('particles');
        ['#2563eb','#10b981','#8b5cf6','#f59e0b','#06b6d4'].forEach(c => {
            for (let i = 0; i < 5; i++) {
                const p = document.createElement('div');
                p.className = 'particle';
                const s = Math.random()*8+4;
                p.style.cssText = `width:${s}px;height:${s}px;background:${c};left:${Math.random()*100}%;animation-duration:${Math.random()*15+10}s;animation-delay:${Math.random()*10}s;`;
                pCont.appendChild(p);
            }
        });

        // Confetti burst
        setTimeout(() => {
            const burst = document.getElementById('confetti-burst');
            const cols = ['#10b981','#2563eb','#f59e0b','#8b5cf6','#ef4444','#ec4899'];
            for (let i = 0; i < 22; i++) {
                const dot = document.createElement('div');
                dot.style.cssText = `position:absolute;border-radius:2px;width:${Math.random()*5+3}px;height:${Math.random()*5+3}px;background:${cols[Math.floor(Math.random()*cols.length)]};top:50%;left:50%;`;
                const angle = Math.random()*Math.PI*2;
                const dist  = Math.random()*70+40;
                dot.animate([
                    { transform:`translate(-50%,-50%) translate(0,0) rotate(0deg)`, opacity:1 },
                    { transform:`translate(-50%,-50%) translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist}px) rotate(${angle*180}deg)`, opacity:0 }
                ], { duration:Math.random()*600+400, delay:Math.random()*200, fill:'forwards', easing:'ease-out' });
                burst.appendChild(dot);
            }
        }, 900);

        // Copy ref
        function copyRef() {
            const ref = document.getElementById('ref-number').innerText.trim();
            navigator.clipboard.writeText(ref).then(() => {
                document.getElementById('copy-label').textContent = 'Copied!';
                document.getElementById('copy-icon').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>';
                setTimeout(() => {
                    document.getElementById('copy-label').textContent = 'Copy';
                    document.getElementById('copy-icon').innerHTML = '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>';
                }, 2000);
            });
        }
    </script>
</body>
</html>
