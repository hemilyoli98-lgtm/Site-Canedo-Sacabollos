"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Target, Waves, Zap, Shield, CheckCircle, ArrowUpRight } from "lucide-react";

export default function Home() {
  // --- ESTADOS INTERACTIVOS ---
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [carsPerMonth, setCarsPerMonth] = useState(10);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Loader Cinematográfico
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 600);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // Control del Comparador Antes/Después
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <div className="relative bg-[#050505] text-[#F5F5F7] min-h-screen selection:bg-neutral-800 selection:text-white">
      
      {/* 1. CINEMATIC LOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
          >
            <div className="text-center space-y-4">
              <h2 className="text-xs uppercase tracking-[0.4em] text-neutral-500 font-light">Canedo Sacabollos Est. 1999</h2>
              <div className="h-[2px] w-48 bg-neutral-900 relative overflow-hidden mx-auto">
                <div className="absolute top-0 left-0 h-full bg-white transition-all duration-75" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xl font-mono text-neutral-400">{progress}%</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HERO FULLSCREEN */}
      <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#050505] z-10" />
        <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070')" }} />
        
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-8">
          <span className="text-xs uppercase tracking-[0.6em] text-amber-400 font-medium">El arte de la perfección artesanal</span>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white leading-none">
            27 años formando <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 via-neutral-400 to-neutral-600">especialistas.</span>
          </h1>
          <p className="text-lg md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto">
            Aprendé el oficio de precisión automotriz que transformó la realidad financiera de miles de personas en toda Latinoamérica.
          </p>
          <div className="pt-4">
            <button className="px-8 py-4 rounded-full text-sm font-medium tracking-wide bg-white text-black hover:bg-neutral-200 transition-all transform hover:scale-105">
              Ver cómo empieza todo
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="text-neutral-600 w-6 h-6" />
        </div>
      </section>

      {/* 3. TIMELINE INTERACTIVA */}
      <section className="py-32 px-6 max-w-4xl mx-auto relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-[75%] w-[1px] bg-neutral-800 top-40" />
        <div className="text-center mb-24">
          <h2 className="text-xs uppercase tracking-[0.4em] text-neutral-500 mb-2">Trayectoria familiar</h2>
          <p className="text-3xl md:text-5xl font-bold tracking-tight">De un taller local a una escuela continental.</p>
        </div>
        <div className="space-y-24">
          {[
            { y: "1999", t: "El Origen", d: "Oscar Canedo inicia su taller en Buenos Aires perfeccionando el PDR de forma autodidacta." },
            { y: "2008", t: "La Expansión", d: "Consolidación como referentes absolutos en granizo en Argentina y desarrollo del método Canedo." },
            { y: "2018", t: "Nace la Academia", d: "Apertura formal de cursos presenciales ante la demanda masiva de técnicos en la región." },
            { y: "2026", t: "Latinoamérica Conectada", d: "Plataforma global online y distribución de instrumental propio de alta gama." }
          ].map((item, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row items-center justify-between relative ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
              <div className="w-full md:w-[45%] text-center md:text-left px-4">
                <span className="text-4xl font-black text-neutral-800 block mb-1">{item.y}</span>
                <h3 className="text-lg font-semibold text-white mb-1">{item.t}</h3>
                <p className="text-neutral-400 font-light text-sm leading-relaxed">{item.d}</p>
              </div>
              <div className="w-4 h-4 rounded-full bg-white border-4 border-black z-10 hidden md:block" />
              <div className="w-full md:w-[45%] hidden md:block" />
            </div>
          ))}
        </div>
      </section>

      {/* 4. BEFORE / AFTER (COMPARADOR SLIDER) */}
      <section className="py-32 bg-[#0a0a0a] flex flex-col items-center justify-center px-6">
        <div className="text-center mb-16 max-w-2xl">
          <h2 className="text-xs uppercase tracking-[0.4em] text-neutral-500 mb-3">Resultados Reales</h2>
          <p className="text-3xl md:text-5xl font-bold tracking-tight">Precisión milimétrica verificable.</p>
        </div>
        <div 
          ref={containerRef}
          className="relative w-full max-w-3xl aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize border border-neutral-800 select-none"
          onMouseMove={(e) => isDragging && handleMove(e.clientX)}
          onTouchMove={(e) => isDragging && handleMove(e.touches[0].clientX)}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=1000')" }}>
            <span className="absolute bottom-4 left-4 bg-black/70 text-[10px] tracking-widest px-3 py-1 rounded font-mono">DAÑO POR GRANIZO</span>
          </div>
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1000')",
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100, 0 100%)`
            }}
          >
            <span className="absolute bottom-4 right-4 bg-white text-black text-[10px] tracking-widest px-3 py-1 rounded font-mono">REPARACIÓN ARTESANAL</span>
          </div>
          <div className="absolute top-0 bottom-0 w-[2px] bg-white z-20" style={{ left: `${sliderPosition}%` }}>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold shadow-2xl border-2 border-black">↔</div>
          </div>
        </div>
      </section>

      {/* 5. LA CIENCIA DETRÁS DEL PDR */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-xs uppercase tracking-[0.4em] text-amber-400 mb-3">Metodología Física</h2>
          <p className="text-3xl md:text-5xl font-bold tracking-tight">La ciencia detrás de cada milímetro recuperado.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { i: Target, t: "1. Lectura de Reflexión", d: "Uso de lámparas LED específicas para ubicar el centro exacto de la deformación molecular." },
            { i: Waves, t: "2. Gestión de Tensiones", d: "Identificación de los puntos de traba magnética y alivio de fuerzas en la periferia de la pieza." },
            { i: Zap, t: "3. Micro-Masaje Técnico", d: "Presión milimétrica controlada desde el reverso usando palancas de acero templado." },
            { i: Shield, t: "4. Clasificación Estricta", d: "Planificación de fuerzas basada en la escala técnica de 4 grados de granizo profesional." }
          ].map((item, idx) => {
            const Icon = item.i;
            return (
              <div key={idx} className="glass-premium p-6 rounded-xl flex flex-col justify-between h-64">
                <Icon className="w-6 h-6 text-neutral-400" />
                <div>
                  <h3 className="text-base font-semibold mb-1 text-white">{item.t}</h3>
                  <p className="text-neutral-400 font-light text-xs leading-relaxed">{item.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. HISTORIAS REALES STYLE NETFLIX */}
      <section className="py-32 bg-[#050505] overflow-hidden pl-6 md:pl-16">
        <div className="max-w-2xl mb-12">
          <h2 className="text-xs uppercase tracking-[0.4em] text-neutral-500 mb-3">Impacto Social</h2>
          <p className="text-3xl md:text-4xl font-bold tracking-tight">Historias de transformación real.</p>
        </div>
        <div className="flex space-x-6 overflow-x-auto pb-6 pr-6">
          {[
            { n: "Carlos Mendoza", o: "Mendoza, Arg.", q: "Pasé de cobrar un sueldo mínimo en un taller convencional a abrir mi propia empresa de granizo. Canedo me dio un oficio de oro.", g: "Caso de Éxito" },
            { n: "Mateo Silva", o: "Santiago, Chile", q: "Hice el curso online con dudas, pero el nivel analítico de los módulos superó mis expectativas. Recuperé la inversión al mes.", g: "Alumno Internacional" },
            { n: "Esteban Rossi", o: "Córdoba, Arg.", q: "La precisión con la que Oscar enseña a leer las líneas de luz marca la diferencia entre un hobbista y un profesional.", g: "Curso Presencial" }
          ].map((t, idx) => (
            <div key={idx} className="min-w-[290px] md:min-w-[400px] bg-neutral-900/40 border border-neutral-900 p-6 rounded-xl flex flex-col justify-between h-64">
              <span className="text-[10px] font-mono text-amber-400 tracking-wider uppercase">{t.g}</span>
              <p className="text-neutral-300 font-light italic text-sm">"{t.q}"</p>
              <div>
                <h4 className="text-white text-sm font-medium">{t.n}</h4>
                <p className="text-neutral-500 text-[11px]">{t.o}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. LA ESCUELA CANEDO */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-xs uppercase tracking-[0.4em] text-neutral-500 mb-3">La Academia</h2>
          <p className="text-3xl md:text-5xl font-bold tracking-tight">Elegí tu camino profesional.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { t: "Presencial Intensivo", l: "Buenos Aires, Argentina", d: "Semanas de inmersión total", f: ["Práctica 100% sobre paneles reales", "Cupos ultra-limitados", "Acceso directo a Oscar Canedo", "Certificación oficial homologada"] },
            { t: "Formación Online Global", l: "Acceso ilimitado internacional", d: "A tu propio ritmo", f: ["Módulos en HD ultra-detallados", "Soporte y corrección vía video", "Comunidad activa de egresados", "Descuento exclusivo en herramientas"] }
          ].map((course, idx) => (
            <div key={idx} className="border border-neutral-900 p-8 rounded-2xl bg-neutral-900/20 flex flex-col justify-between space-y-8">
              <div>
                <span className="text-[11px] bg-neutral-900 text-neutral-400 px-3 py-1 rounded-full font-mono">{course.d}</span>
                <h3 className="text-xl font-bold text-white mt-4 mb-1">{course.t}</h3>
                <p className="text-neutral-500 text-xs">{course.l}</p>
                <ul className="mt-6 space-y-3">
                  {course.f.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-2 text-neutral-300 text-xs">
                      <CheckCircle className="w-4 h-4 text-neutral-600 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-3 rounded-lg bg-neutral-900 text-white font-medium text-xs tracking-wide hover:bg-neutral-800 transition-colors">
                Solicitar Programa Completo
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 8. MAPA LATAM */}
      <section className="py-32 bg-[#020202] text-center px-6">
        <div className="max-w-xl mx-auto mb-12">
          <h2 className="text-xs uppercase tracking-[0.4em] text-neutral-500 mb-3">Red Continental</h2>
          <p className="text-3xl font-bold tracking-tight">Alumnos en toda la región.</p>
        </div>
        <div className="relative w-full max-w-2xl mx-auto aspect-[16/10] bg-neutral-950 rounded-2xl border border-neutral-900 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <p className="text-xs font-mono text-neutral-600 tracking-widest uppercase">Indicadores Luminosos de Operación Satelital</p>
          {[
            { c: "Buenos Aires", t: "75%", l: "50%" },
            { c: "Santiago", t: "72%", l: "44%" },
            { c: "Bogotá", t: "45%", l: "42%" },
            { c: "México DF", t: "32%", l: "30%" }
          ].map((hub, idx) => (
            <div key={idx} className="absolute flex h-2 w-2" style={{ top: hub.t, left: hub.l }}>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </div>
          ))}
        </div>
      </section>

      {/* 9. CALCULADORA ROI INTERACTIVA */}
      <section className="py-32 px-6 max-w-3xl mx-auto">
        <div className="glass-premium p-8 md:p-12 rounded-2xl border border-neutral-800 space-y-8">
          <div>
            <h2 className="text-xs uppercase tracking-[0.4em] text-amber-400 mb-1">Simulador Financiero</h2>
            <h3 className="text-xl md:text-3xl font-bold tracking-tight text-white">Proyectá tu modelo de negocio</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs text-neutral-300">Autos reparados por mes:</label>
              <span className="text-lg font-bold text-white font-mono">{carsPerMonth}</span>
            </div>
            <input 
              type="range" min="2" max="40" value={carsPerMonth} 
              onChange={(e) => setCarsPerMonth(Number(e.target.value))}
              className="w-full accent-white bg-neutral-800 h-1 rounded-lg cursor-pointer"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-900">
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-900">
              <span className="text-[10px] text-neutral-500 uppercase block mb-0.5">Ingreso Mensual Estimado</span>
              <span className="text-2xl font-black text-white font-mono">USD {(carsPerMonth * 150).toLocaleString()}</span>
            </div>
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-900">
              <span className="text-[10px] text-neutral-500 uppercase block mb-0.5">Retorno Anual Proyectado</span>
              <span className="text-2xl font-black text-amber-400 font-mono">USD {(carsPerMonth * 150 * 12).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. HERRAMIENTAS PREMIUM */}
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-xs uppercase tracking-[0.4em] text-neutral-500 mb-2">Instrumental Profesional</h2>
            <p className="text-2xl font-bold tracking-tight">Herramientas con memoria molecular.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { n: "Palancas de Tracción Pro", d: "Acero templado con aleación de alta elasticidad.", p: "Consultar Catálogo" },
            { n: "Lámpara LED Lineal de Lectura", d: "Diseño ergonómico para detección milimétrica de sombras.", p: "Premium Edition" }
          ].map((tool, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-neutral-950 border border-neutral-900 flex flex-col justify-between h-48">
              <div>
                <h3 className="text-lg font-bold text-white">{tool.n}</h3>
                <p className="text-neutral-400 text-xs font-light mt-1">{tool.d}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-neutral-900 text-xs">
                <span className="font-mono text-amber-400">{tool.p}</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-600" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. FAQ ACORDEÓN */}
      <section className="py-32 max-w-2xl mx-auto px-6">
        <h2 className="text-center text-xs uppercase tracking-[0.4em] text-neutral-500 mb-10">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {[
            { q: "¿Es necesario tener conocimientos previos de chapa o pintura?", a: "No. El sistema PDR es un oficio totalmente artesanal e independiente. Nuestra formación arranca desde cero absoluto." },
            { q: "¿Los cursos incluyen soporte post-cursada?", a: "Sí, todos los egresados acceden a nuestro canal directo de mentorías para validar sus primeros trabajos en tiempo real." }
          ].map((faq, idx) => (
            <div key={idx} className="border-b border-neutral-900 pb-3">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left flex justify-between items-center py-2 text-white font-medium text-sm"
              >
                <span>{faq.q}</span>
                <span className="text-neutral-500">{openFaq === idx ? "−" : "+"}</span>
              </button>
              {openFaq === idx && <p className="text-neutral-400 font-light text-xs mt-2 leading-relaxed">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* 12. CTA FINAL */}
      <section className="h-screen w-full flex items-center justify-center bg-black px-6 text-center relative">
        <div className="max-w-3xl space-y-8 relative z-10">
          <h2 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-white leading-tight">
            Tu próximo trabajo puede convertirse en tu propia empresa.
          </h2>
          <p className="text-neutral-400 text-sm md:text-lg font-light max-w-md mx-auto">
            Unite a la próxima generación de técnicos Sacabollos formados por la familia Canedo.
          </p>
          <div className="pt-4">
            <button className="px-8 py-4 bg-white text-black font-semibold rounded-full tracking-wide text-xs transition-transform transform hover:scale-105">
              Quiero aprender con Canedo
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
