import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { Mail, Send } from 'lucide-react';
import gsap from 'gsap';

const Github = ({size=20}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17a5.2 5.2 0 0 0-1.45-3.8 4.9 4.9 0 0 0-.16-3.7s-1.13-.36-3.68 1.36a12.5 12.5 0 0 0-6.6 0C6.13 2 5 2 5 2a4.9 4.9 0 0 0-.16 3.7A5.2 5.2 0 0 0 3.39 9.5c0 5.77 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 8.89 19.7v4.3"/><path d="M8 19c-3 1-4-1-5-1"/></svg>
);

const Linkedin = ({size=20}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function Contact() {
  const formRef = useRef(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Detect if keys are default template placeholders
    const isMockMode = !serviceId || serviceId === 'YOUR_SERVICE_ID' || serviceId.startsWith('YOUR_');

    try {
      if (isMockMode) {
        // Local simulation delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setToast({ show: true, message: 'Message sent! 🎉 (Local Mock Mode)', type: 'success' });
        reset();
      } else {
        await emailjs.sendForm(
          serviceId,
          templateId,
          formRef.current,
          publicKey
        );
        setToast({ show: true, message: 'Message sent! 🎉', type: 'success' });
        reset();
      }
    } catch (error) {
      console.error('[EmailJS Error]', error);
      const errorMsg = error?.text || error?.message || 'Something went wrong. Try again.';
      setToast({ show: true, message: `Error: ${errorMsg}`, type: 'error' });
    }
    
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 5000);
  };

  useEffect(() => {
    // Magnetic hover for social icons
    const magneticElements = document.querySelectorAll('.magnetic-social');
    
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });
  }, []);

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden bg-transparent">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
          
          {/* Left Column: Info & Globe */}
          <div className="relative">
             <div className="absolute inset-0 -z-10 h-[400px] w-[400px] -translate-x-1/4 -translate-y-1/4 opacity-30 blur-[100px] rounded-full bg-accent"></div>
             
             <div className="mb-12">
               <span className="text-sm font-mono uppercase tracking-widest text-accent-light">Section 03</span>
               <h2 className="mt-2 text-4xl font-heading font-bold text-white md:text-5xl lg:text-6xl">
                 Let's Build<br/>Together
               </h2>
             </div>
             
             {/* Framing slot for global 3D Globe */}
             <div className="h-[300px] w-[300px] mx-auto lg:mx-0 relative pointer-events-none">
                {/* 3D Globe renders in background and aligns with this space */}
             </div>
             
             <div className="mt-12 flex gap-4">
               {[
                 { icon: <Github size={20} />, href: 'https://github.com/musharafali-dev' },
                 { icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/musharafali' },
                 { icon: <Mail size={20} />, href: 'mailto:itsmalipk@gmail.com' }
               ].map((social, idx) => (
                 <a 
                   key={idx} 
                   href={social.href}
                   target="_blank"
                   rel="noreferrer"
                   className="magnetic-social flex h-[36px] w-[36px] items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 hover:text-[rgb(var(--accent-light))]"
                   aria-label="Social link"
                 >
                   {social.icon}
                 </a>
               ))}
             </div>
          </div>

          {/* Right Column: Form */}
          <div>
             <div className="rounded-2xl border border-white/10 bg-surface p-8 backdrop-blur-xl relative">
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  <div>
                    <label className="mb-2 block font-mono text-[9px] uppercase tracking-widest text-muted">Name</label>
                    <input 
                      {...register("name", { required: true })}
                      name="name"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-all focus:border-[rgb(var(--accent-light))] focus:bg-[rgba(var(--accent),0.1)] focus:outline-none focus:shadow-[0_0_14px_rgba(var(--accent-light),0.35)]"
                    />
                    {errors.name && <span className="text-xs text-red-500 mt-1">This field is required</span>}
                  </div>
                  
                  <div>
                    <label className="mb-2 block font-mono text-[9px] uppercase tracking-widest text-muted">Email</label>
                    <input 
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      name="email"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-all focus:border-[rgb(var(--accent-light))] focus:bg-[rgba(var(--accent),0.1)] focus:outline-none focus:shadow-[0_0_14px_rgba(var(--accent-light),0.35)]"
                    />
                    {errors.email && <span className="text-xs text-red-500 mt-1">Valid email is required</span>}
                  </div>
                  
                  <div>
                    <label className="mb-2 block font-mono text-[9px] uppercase tracking-widest text-muted">Subject</label>
                    <input 
                      {...register("subject", { required: true })}
                      name="subject"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-all focus:border-[rgb(var(--accent-light))] focus:bg-[rgba(var(--accent),0.1)] focus:outline-none focus:shadow-[0_0_14px_rgba(var(--accent-light),0.35)]"
                    />
                    {errors.subject && <span className="text-xs text-red-500 mt-1">This field is required</span>}
                  </div>
                  
                  <div>
                    <label className="mb-2 block font-mono text-[9px] uppercase tracking-widest text-muted">Message</label>
                    <textarea 
                      {...register("message", { required: true })}
                      name="message"
                      rows="4"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-white transition-all focus:border-[rgb(var(--accent-light))] focus:bg-[rgba(var(--accent),0.1)] focus:outline-none focus:shadow-[0_0_14px_rgba(var(--accent-light),0.35)] resize-none"
                    ></textarea>
                    {errors.message && <span className="text-xs text-red-500 mt-1">This field is required</span>}
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-light))] py-4 font-medium text-white transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 shadow-[0_4px_20px_rgba(var(--accent),0.25)] hover:shadow-[0_4px_25px_rgba(var(--accent-light),0.4)]"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Send size={18} />}
                  </button>

                </form>

                {/* Toast Notification */}
                {toast.show && (
                  <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium ${
                    toast.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'
                  }`}>
                    {toast.message}
                  </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
