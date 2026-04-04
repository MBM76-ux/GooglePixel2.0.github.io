import { useState } from "react";
import pixel8 from "../../assets/images/pixel 8.jpg";
import pixel9 from "../../assets/images/Pixel 9.jpg";
import pixelFold from "../../assets/images/pixel fold.jpg";

const initialPhones = [
  { id:1,  model:"Pixel 9 Pro XL", series:"Pro",      price:1099, ram:16, storage:256, battery:5060, year:2024, stock:"In Stock"     },
  { id:2,  model:"Pixel 9 Pro",    series:"Pro",      price:999,  ram:16, storage:128, battery:4700, year:2024, stock:"In Stock"     },
  { id:3,  model:"Pixel 9",        series:"Standard", price:799,  ram:12, storage:128, battery:4700, year:2024, stock:"In Stock"     },
  { id:4,  model:"Pixel 9 Fold",   series:"Fold",     price:1799, ram:16, storage:256, battery:4650, year:2024, stock:"Low Stock"    },
  { id:5,  model:"Pixel 8 Pro",    series:"Pro",      price:799,  ram:12, storage:128, battery:5050, year:2023, stock:"In Stock"     },
  { id:6,  model:"Pixel 8",        series:"Standard", price:599,  ram:8,  storage:128, battery:4575, year:2023, stock:"In Stock"     },
  { id:7,  model:"Pixel 8a",       series:"A-Series", price:499,  ram:8,  storage:128, battery:4492, year:2024, stock:"In Stock"     },
  { id:8,  model:"Pixel 7a",       series:"A-Series", price:349,  ram:8,  storage:128, battery:4385, year:2023, stock:"Low Stock"    },
  { id:9,  model:"Pixel 7 Pro",    series:"Pro",      price:599,  ram:12, storage:128, battery:5000, year:2022, stock:"Out of Stock" },
  { id:10, model:"Pixel 6a",       series:"A-Series", price:299,  ram:6,  storage:128, battery:4410, year:2022, stock:"Out of Stock" },
];

const seriesClass = (s) => {
  if (s==='A-Series') return 'series-a';
  if (s==='Pro')      return 'series-pro';
  if (s==='Fold')     return 'series-fold';
  return 'series-standard';
};
const stockClass = (s) => {
  if (s==='In Stock')  return 'in-stock';
  if (s==='Low Stock') return 'low-stock';
  return 'out-stock';
};

const HomePage = () => {
  const [phones, setPhones]           = useState(initialPhones);
  const [nextId, setNextId]           = useState(11);
  const [activeTab, setActiveTab]     = useState('crud');
  const [activeChip, setActiveChip]   = useState('all');
  const [search, setSearch]           = useState('');
  const [editingId, setEditingId]     = useState(null);
  const [showModal, setShowModal]     = useState(false);
  const [summaryText, setSummaryText] = useState('');
  const [form, setForm]               = useState({ model:'', series:'Standard', price:'', ram:'', storage:'', battery:'', year:'', stock:'In Stock' });
  const [editForm, setEditForm]       = useState({ model:'', series:'Standard', price:'', ram:'', storage:'', battery:'', year:'', stock:'In Stock' });

  const projectName   = "Google Pixel Store";
  const totalProducts = 3;
  const isAvailable   = true;
  const phoneModels   = ["Pixel 9", "Pixel 8", "Pixel Fold"];
  const company       = { name:"Google", product:"Pixel", country:"China" };

  const avgPrice     = phones.length ? Math.round(phones.reduce((s,p)=>s+p.price,0)/phones.length) : 0;
  const inStockCount = phones.filter(p=>p.stock==='In Stock').length;

  const filteredPhones = () => {
    let r = phones;
    if (search) r = r.filter(p =>
      p.model.toLowerCase().includes(search.toLowerCase()) ||
      p.series.toLowerCase().includes(search.toLowerCase()) ||
      String(p.price).includes(search) ||
      String(p.year).includes(search) ||
      String(p.ram).includes(search)
    );
    if      (activeChip==='Pro')       r = r.filter(p=>p.series==='Pro');
    else if (activeChip==='A-Series')  r = r.filter(p=>p.series==='A-Series');
    else if (activeChip==='Fold')      r = r.filter(p=>p.series==='Fold');
    else if (activeChip==='instock')   r = r.filter(p=>p.stock==='In Stock');
    else if (activeChip==='price-low') r = r.filter(p=>p.price<700);
    else if (activeChip==='2024')      r = r.filter(p=>p.year===2024);
    return r;
  };

  const addPhone = () => {
    const { model, series, price, ram, storage, battery, year, stock } = form;
    if (!model||!price||!ram||!storage||!battery||!year) { alert('Please fill all fields!'); return; }
    setPhones(prev=>[...prev,{id:nextId,model,series,price:+price,ram:+ram,storage:+storage,battery:+battery,year:+year,stock}]);
    setNextId(n=>n+1);
    setForm({ model:'', series:'Standard', price:'', ram:'', storage:'', battery:'', year:'', stock:'In Stock' });
  };

  const deletePhone = (id) => {
    if (!confirm('Delete this device?')) return;
    setPhones(prev=>prev.filter(p=>p.id!==id));
  };

  const openEdit = (id) => {
    const p = phones.find(p=>p.id===id); if(!p) return;
    setEditingId(id);
    setEditForm({model:p.model,series:p.series,price:p.price,ram:p.ram,storage:p.storage,battery:p.battery,year:p.year,stock:p.stock});
    setShowModal(true);
  };

  const updatePhone = () => {
    setPhones(prev=>prev.map(p=>p.id===editingId?{...p,...editForm,price:+editForm.price,ram:+editForm.ram,storage:+editForm.storage,battery:+editForm.battery,year:+editForm.year}:p));
    setShowModal(false); setEditingId(null);
  };

  const renderIfElse = () => phones.map((p,i)=>{
    const tier     = p.price>=1000?<span style={{color:'#a78bfa'}}>Premium 💎</span>:p.price>=700?<span style={{color:'#4f8ef7'}}>Mid-High 🔷</span>:p.price>=500?<span style={{color:'#4fcea2'}}>Mid-Range ✅</span>:<span style={{color:'#f7b64f'}}>Budget 💰</span>;
    const ramLvl   = p.ram>=12?<span style={{color:'#4fcea2'}}>High-RAM</span>:<span style={{color:'#f7b64f'}}>Std-RAM</span>;
    const battLvl  = p.battery>=5000?<span style={{color:'#4fcea2'}}>Long-life 🔋</span>:<span style={{color:'#666'}}>Standard</span>;
    const stockLvl = p.stock==='Out of Stock'?<span style={{color:'#f7564f'}}>⚠ OOS</span>:p.stock==='Low Stock'?<span style={{color:'#f7b64f'}}>⚡ Low</span>:<span style={{color:'#4fcea2'}}>✓ Avail</span>;
    const ageLvl   = p.year>=2024?<span style={{color:'#4f8ef7'}}>New</span>:<span style={{color:'#666'}}>Older</span>;
    return <div key={i} style={{background:'#0a0a0f',borderRadius:'6px',padding:'.6rem 1rem',fontFamily:'monospace',fontSize:'.7rem',lineHeight:'1.9',color:'#ccc',border:'1px solid #2a2a3d',marginBottom:'4px'}}>
      <span style={{color:'#4f8ef7'}}>{p.model}</span> → {tier} · {ramLvl} · {battLvl} · {stockLvl} · {ageLvl}
    </div>;
  });

  const renderForLoop = () => phones.map((p,i)=>(
    <div key={i} style={{background:'#0a0a0f',borderRadius:'6px',padding:'.6rem 1rem',fontFamily:'monospace',fontSize:'.7rem',color:'#ccc',border:'1px solid #2a2a3d',marginBottom:'4px'}}>
      <span style={{color:'#4f8ef7'}}>{i+1}.</span> {p.model} <span style={{color:'#4fcea2'}}>${p.price}</span>
    </div>
  ));

  const renderWhileLoop = () => {
    let i=0; const out=[];
    while(i<phones.length){
      const p=phones[i];
      out.push(<div key={i} style={{background:'#0a0a0f',borderRadius:'6px',padding:'.6rem 1rem',fontFamily:'monospace',fontSize:'.7rem',color:'#ccc',border:'1px solid #2a2a3d',marginBottom:'4px'}}>
        <span style={{color:'#4f8ef7'}}>[{String(i+1).padStart(2,'0')}]</span> {p.model} → RAM: <span style={{color:'#4fcea2'}}>{p.ram}GB</span> | Batt: <span style={{color:'#f7b64f'}}>{p.battery}mAh</span>
      </div>); i++;
    }
    return out;
  };

  const renderPriceCategories = () => {
    const cats={Premium:[],MidHigh:[],MidRange:[],Budget:[]};
    for(let j=0;j<phones.length;j++){
      const p=phones[j];
      if(p.price>=1000) cats.Premium.push(p.model);
      else if(p.price>=700) cats.MidHigh.push(p.model);
      else if(p.price>=500) cats.MidRange.push(p.model);
      else cats.Budget.push(p.model);
    }
    const colors={Premium:'#a78bfa',MidHigh:'#4f8ef7',MidRange:'#4fcea2',Budget:'#f7b64f'};
    return Object.entries(cats).map(([cat,models])=>(
      <div key={cat} style={{background:'#0a0a0f',borderRadius:'6px',padding:'.6rem 1rem',fontFamily:'monospace',fontSize:'.7rem',color:'#ccc',border:'1px solid #2a2a3d',marginBottom:'4px'}}>
        <span style={{color:colors[cat]}}>[{cat}]</span> → {models.join(', ')||'None'}
      </div>
    ));
  };

  const renderObjectMethods = () => {
    const s = phones[0];
    const rows=[
      ['Object.keys(phone)',          JSON.stringify(Object.keys(s))],
      ['Object.values(phone)',         JSON.stringify(Object.values(s))],
      ['Object.entries(phone)[0]',     JSON.stringify(Object.entries(s)[0])],
      ['Object.assign({}, phone)',     `model: ${Object.assign({},s).model}`],
      ['hasOwnProperty("model")',      String(s.hasOwnProperty('model'))],
      ['delete phone.country (copy)',  'property deleted from copy'],
      ['Object.freeze(phone)',         'object frozen — no changes allowed'],
      ['Spread: {...phone, price:999}',`new price: ${({...s,price:999}).price}`],
      ['Object.fromEntries(...)',       `rebuilt: ${JSON.stringify(Object.fromEntries(Object.entries(s).slice(0,2)))}`],
    ];
    return rows.map(([key,val],i)=>(
      <div key={i} style={{display:'flex',gap:'.75rem',padding:'.35rem 0',borderBottom:'1px solid rgba(255,255,255,.05)',fontSize:'.78rem',flexWrap:'wrap'}}>
        <span style={{fontFamily:'monospace',color:'#4f8ef7',minWidth:'220px',fontSize:'.7rem'}}>{key}</span>
        <span style={{color:'#e8e8f0',wordBreak:'break-all'}}>{val}</span>
      </div>
    ));
  };

  const renderStringMethods = () => {
    const s = "  Pixel 9 Pro XL  ";
    const rows=[
      ['trim()',               `"${s.trim()}"`],
      ['toUpperCase()',        s.trim().toUpperCase()],
      ['toLowerCase()',        s.trim().toLowerCase()],
      ['includes("Pixel")',    String(s.includes('Pixel'))],
      ['startsWith("  Pixel")',String(s.startsWith('  Pixel'))],
      ['endsWith("XL  ")',     String(s.endsWith('XL  '))],
      ['replace("Pro XL","Mini")', s.trim().replace('Pro XL','Mini')],
      ['split(" ")',           JSON.stringify(s.trim().split(' '))],
      ['slice(0,7)',           s.trim().slice(0,7)],
      ['indexOf("9")',         String(s.indexOf('9'))],
      ['padStart(20,"*")',     s.trim().padStart(20,'*')],
      ['split+join("-")',      s.trim().split(' ').join('-')],
    ];
    return rows.map(([key,val],i)=>(
      <div key={i} style={{display:'flex',gap:'.75rem',padding:'.35rem 0',borderBottom:'1px solid rgba(255,255,255,.05)',fontSize:'.78rem',flexWrap:'wrap'}}>
        <span style={{fontFamily:'monospace',color:'#4f8ef7',minWidth:'220px',fontSize:'.7rem'}}>{key}</span>
        <span style={{color:'#e8e8f0',wordBreak:'break-all'}}>{val}</span>
      </div>
    ));
  };

  const inputStyle = {background:'#111',border:'1px solid #2a2a3d',color:'#e8e8f0',padding:'.55rem .85rem',borderRadius:'6px',fontSize:'.88rem',width:'100%'};
  const labelStyle = {fontFamily:'monospace',fontSize:'.65rem',color:'#6b6b85',textTransform:'uppercase',display:'block',marginBottom:'.3rem'};
  const chipStyle  = (active) => ({fontFamily:'monospace',fontSize:'.7rem',padding:'.32rem .8rem',borderRadius:'20px',border:`1px solid ${active?'#4f8ef7':'#2a2a3d'}`,background:active?'rgba(79,142,247,.1)':'#111',color:active?'#4f8ef7':'#6b6b85',cursor:'pointer',display:'inline-block'});
  const tabStyle   = (active) => ({fontFamily:'monospace',fontSize:'.72rem',padding:'.5rem 1.2rem',border:`1px solid ${active?'#4f8ef7':'#2a2a3d'}`,background:active?'rgba(79,142,247,.08)':'#111',color:active?'#4f8ef7':'#6b6b85',borderRadius:'4px',cursor:'pointer',textTransform:'uppercase',letterSpacing:'.07em'});

  return (
    <div>
      {/* ── HERO ── */}
      <section className="bg-gray-900 text-white py-20 text-center">
        <h1 className="text-5xl font-bold animate-pulse">Meet the New Pixel Phone</h1>
        <p className="mt-4 text-lg">The smartest and fastest Pixel yet</p>
        <button className="mt-6 bg-white text-black px-8 py-3 rounded font-medium hover:scale-110 transition">Buy Now</button>
      </section>

      {/* ── PRODUCT CARDS ── */}
      <section className="grid md:grid-cols-3 gap-8 p-12 bg-black">
        {[[pixel9,'Pixel 9','Powerful AI smartphone'],[pixel8,'Pixel 8','Best camera experience'],[pixelFold,'Pixel Fold','Foldable innovation']].map(([img,name,desc])=>(
          <div key={name} className="bg-gray-900 p-6 rounded shadow-lg text-center transform hover:scale-105 hover:shadow-2xl transition duration-300">
            <img src={img} className="mx-auto h-60 object-cover rounded" alt={name}/>
            <h2 className="text-xl font-bold mt-4 text-white">{name}</h2>
            <p className="text-gray-400">{desc}</p>
          </div>
        ))}
      </section>

      {/* ── FEATURES ── */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold">Amazing Features</h2>
        <div className="grid md:grid-cols-3 gap-10 mt-10 px-10">
          {[['AI Camera','Take stunning photos'],['Fast Performance','Powered by Google Tensor'],['Long Battery','All day battery life']].map(([t,d])=>(
            <div key={t} className="bg-gray-800 p-6 rounded shadow"><h3 className="text-xl font-bold">{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="p-12 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">What Users Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {['Amazing phone 🔥','Best camera ever 📸','Super fast ⚡'].map(t=><div key={t} className="p-6 shadow rounded">{t}</div>)}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="p-12 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-8">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {['$699','$799','$999'].map(p=><div key={p} className="p-6 bg-white shadow rounded font-bold text-xl">{p}</div>)}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="p-12 bg-black text-white text-center">
        <h2 className="text-2xl font-bold">Subscribe</h2>
        <input type="email" placeholder="Enter email" className="mt-4 p-3 rounded text-black"/>
        <button className="ml-2 bg-white text-black px-4 py-3 rounded">Join</button>
      </section>

      {/* ── FAQ ── */}
      <section className="p-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">FAQ</h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          {[['What is Pixel?',"Google's premium smartphone."],['Is it waterproof?','Yes, IP68 rated.'],['Battery timing?','All day battery life.']].map(([q,a])=>(
            <details key={q} className="p-4 shadow rounded"><summary className="font-medium cursor-pointer">{q}</summary><p className="mt-2 text-gray-600">{a}</p></details>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="p-12 bg-gray-900 text-white text-center">
        <div className="grid md:grid-cols-3 gap-6">
          {[['1M+','Users'],['50+','Countries'],['4.9⭐','Rating']].map(([n,l])=>(
            <div key={l}><h2 className="text-3xl font-bold">{n}</h2><p>{l}</p></div>
          ))}
        </div>
      </section>

      {/* ── PROJECT INFO ── */}
      <section className="p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Project Information</h2>
        <p className="mt-4">Project Name: <strong>{projectName}</strong></p>
        <p>Total Products: <strong>{totalProducts}</strong></p>
        <p>Available: <strong>{isAvailable?'In Stock ✅':'Out of Stock ❌'}</strong></p>
        <p>Phone Models: <strong>{phoneModels.join(' | ')}</strong></p>
        <p>Company: <strong>{company.name} - {company.product} ({company.country})</strong></p>
        <button onClick={()=>setSummaryText(`📱 Welcome to ${projectName}! We currently offer ${totalProducts} amazing Pixel models: ${phoneModels.join(', ')}.`)}
          className="mt-6 bg-black text-white px-6 py-3 rounded hover:scale-110 transition">Show Project Summary</button>
        {summaryText && <p className="mt-6 text-xl font-semibold">{summaryText}</p>}
      </section>

      {/* ══════════════════════════════════════ */}
      {/*       LAB 04 — CRUD SECTION           */}
      {/* ══════════════════════════════════════ */}
      <section style={{background:'#030712',padding:'4rem 1.5rem'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white">Pixel Device Manager</h2>
            <p className="text-gray-400 mt-2">CRUD Operations · Search & Filters · Control Structures</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[[phones.length,'Total Devices','text-blue-400'],[inStockCount,'In Stock','text-green-400'],['$'+avgPrice,'Avg Price','text-blue-400']].map(([val,lbl,cls])=>(
              <div key={lbl} className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center">
                <div className={`text-2xl font-bold font-mono ${cls}`}>{val}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{lbl}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{display:'flex',gap:'12px',marginBottom:'32px',flexWrap:'wrap'}}>
            {[['crud','① CRUD Operations'],['control','② Control Structures'],['objmethods','③ Object Methods'],['stringmethods','④ String Methods']].map(([key,label])=>(
              <button key={key} onClick={()=>setActiveTab(key)} style={tabStyle(activeTab===key)}>{label}</button>
            ))}
          </div>

          {/* ── CRUD TAB ── */}
          {activeTab==='crud' && (
            <div>
              <h3 className="text-white text-xl font-bold mb-4">Add New Device</h3>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[['model','Model Name','text','e.g. Pixel 9 Pro'],['price','Price (USD)','number','799'],['ram','RAM (GB)','number','12'],['storage','Storage (GB)','number','256'],['battery','Battery (mAh)','number','4700'],['year','Release Year','number','2024']].map(([f,l,t,ph])=>(
                    <div key={f}><label style={labelStyle}>{l}</label><input style={inputStyle} type={t} placeholder={ph} value={form[f]} onChange={e=>setForm(p=>({...p,[f]:e.target.value}))}/></div>
                  ))}
                  <div><label style={labelStyle}>Series</label>
                    <select style={inputStyle} value={form.series} onChange={e=>setForm(p=>({...p,series:e.target.value}))}>
                      {['Standard','Pro','A-Series','Fold'].map(s=><option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div><label style={labelStyle}>Stock Status</label>
                    <select style={inputStyle} value={form.stock} onChange={e=>setForm(p=>({...p,stock:e.target.value}))}>
                      {['In Stock','Low Stock','Out of Stock'].map(s=><option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button onClick={addPhone} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded text-sm uppercase">＋ Add Device</button>
                  <button onClick={()=>setForm({model:'',series:'Standard',price:'',ram:'',storage:'',battery:'',year:'',stock:'In Stock'})}
                    style={{border:'1px solid #4b5563',color:'#d1d5db',padding:'.5rem 1.5rem',borderRadius:'6px',background:'transparent',cursor:'pointer',fontSize:'.875rem'}}>Clear</button>
                </div>
              </div>

              <h3 className="text-white text-xl font-bold mb-4">Search & Filter</h3>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 mb-8">
                <div className="flex gap-3 mb-4">
                  <input type="text" placeholder="Search by model, series, price, year…" value={search} onChange={e=>setSearch(e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-700 text-white p-2.5 rounded focus:outline-none focus:border-blue-400 text-sm"/>
                  <button onClick={()=>{setSearch('');setActiveChip('all');}}
                    style={{border:'1px solid #4b5563',color:'#d1d5db',padding:'.5rem 1rem',borderRadius:'6px',background:'transparent',cursor:'pointer',fontSize:'.875rem'}}>Reset</button>
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'8px',alignItems:'center'}}>
                  <span style={{color:'#6b7280',fontSize:'.75rem',fontFamily:'monospace',textTransform:'uppercase',marginRight:'4px'}}>Filter:</span>
                  {[['all','All'],['Pro','Pro Series'],['A-Series','A-Series'],['Fold','Fold'],['instock','In Stock'],['price-low','Under $700'],['2024','2024 Models']].map(([key,label])=>(
                    <span key={key} style={chipStyle(activeChip===key)} onClick={()=>setActiveChip(key)}>{label}</span>
                  ))}
                </div>
              </div>

              <h3 className="text-white text-xl font-bold mb-4">Device Catalog</h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))',gap:'1.25rem'}}>
                {filteredPhones().length===0
                  ? <div style={{gridColumn:'1/-1',textAlign:'center',padding:'4rem',color:'#6b7280',fontFamily:'monospace',fontSize:'.875rem'}}>📵 No devices match your filters.</div>
                  : filteredPhones().map((p,i)=>(
                    <div key={p.id} style={{background:'#1a1a27',border:'1px solid #2a2a3d',borderRadius:'12px',overflow:'hidden',transition:'transform .22s,border-color .22s,box-shadow .22s'}}
                      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.borderColor='#4f8ef7';}}
                      onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.borderColor='#2a2a3d';}}>
                      <div style={{padding:'1rem 1.2rem .7rem',borderBottom:'1px solid #2a2a3d',display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                        <div>
                          <div style={{fontSize:'1rem',fontWeight:'700',color:'#fff'}}>{p.model}</div>
                          <span style={{display:'inline-block',fontFamily:'monospace',fontSize:'.62rem',padding:'.22rem .55rem',borderRadius:'3px',marginTop:'.3rem',...{
                            'series-a':     {background:'rgba(79,200,162,.12)',color:'#4fcea2',border:'1px solid rgba(79,200,162,.25)'},
                            'series-pro':   {background:'rgba(167,139,250,.12)',color:'#a78bfa',border:'1px solid rgba(167,139,250,.25)'},
                            'series-fold':  {background:'rgba(247,182,79,.12)',color:'#f7b64f',border:'1px solid rgba(247,182,79,.25)'},
                            'series-standard':{background:'rgba(79,142,247,.12)',color:'#4f8ef7',border:'1px solid rgba(79,142,247,.25)'},
                          }[seriesClass(p.series)]}}>{p.series}</span>
                        </div>
                        <div style={{fontFamily:'monospace',fontSize:'1.05rem',color:'#4f8ef7',fontWeight:'700'}}>${p.price}</div>
                      </div>
                      <div style={{padding:'1rem 1.2rem'}}>
                        {[['RAM',p.ram+' GB'],['Storage',p.storage+' GB'],['Battery',p.battery+' mAh'],['Year',p.year],['Stock',p.stock]].map(([key,val])=>(
                          <div key={key} style={{display:'flex',justifyContent:'space-between',padding:'.3rem 0',borderBottom:'1px solid rgba(255,255,255,.05)',fontSize:'.82rem'}}>
                            <span style={{color:'#6b6b85',fontFamily:'monospace',fontSize:'.68rem'}}>{key}</span>
                            {key==='Stock'
                              ? <span style={{display:'inline-block',fontFamily:'monospace',fontSize:'.6rem',padding:'.2rem .55rem',borderRadius:'3px',textTransform:'uppercase',...{
                                  'In Stock': {background:'rgba(79,200,162,.12)',color:'#4fcea2'},
                                  'Low Stock':{background:'rgba(247,182,79,.12)',color:'#f7b64f'},
                                  'Out of Stock':{background:'rgba(247,86,79,.12)',color:'#f7564f'},
                                }[val]}}>{val}</span>
                              : <span style={{fontWeight:'600',color:'#e8e8f0'}}>{val}</span>}
                          </div>
                        ))}
                      </div>
                      <div style={{padding:'.8rem 1.2rem 1rem',display:'flex',gap:'.6rem'}}>
                        <button onClick={()=>openEdit(p.id)} style={{fontFamily:'monospace',fontSize:'.7rem',padding:'.45rem .9rem',borderRadius:'6px',border:'1px solid rgba(167,139,250,.3)',background:'rgba(167,139,250,.12)',color:'#a78bfa',cursor:'pointer',flex:1,fontWeight:'700',textTransform:'uppercase'}}>✏ Edit</button>
                        <button onClick={()=>deletePhone(p.id)} style={{fontFamily:'monospace',fontSize:'.7rem',padding:'.45rem .9rem',borderRadius:'6px',border:'1px solid rgba(247,86,79,.3)',background:'rgba(247,86,79,.12)',color:'#f7564f',cursor:'pointer',flex:1,fontWeight:'700',textTransform:'uppercase'}}>✕ Delete</button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}

          {/* ── CONTROL STRUCTURES TAB ── */}
          {activeTab==='control' && (
            <div className="grid md:grid-cols-2 gap-6">
              {[
                ['If–Else Conditions','#3b82f6','If–Else','5 conditions per phone: price tier, RAM, battery, stock, year.',renderIfElse()],
                ['For Loop — List','#4fcea2','For Loop','Iterates array index 0 → length-1.',renderForLoop()],
                ['While Loop','#a78bfa','While Loop','Loops while index < array.length.',renderWhileLoop()],
                ['Loop + Conditions — Price Categories','#f7b64f','Loop + If','For loop with nested if–else to group into tiers.',renderPriceCategories()],
              ].map(([title,color,label,sub,content])=>(
                <div key={title} className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700">
                    <span style={{background:color+'22',color,border:`1px solid ${color}44`,fontSize:'.75rem',fontFamily:'monospace',padding:'.25rem .5rem',borderRadius:'4px',textTransform:'uppercase'}}>{label}</span>
                    <span className="text-white text-sm font-bold">{title}</span>
                  </div>
                  <div className="p-4"><p className="text-gray-500 text-xs font-mono mb-3">{sub}</p>{content}</div>
                </div>
              ))}
            </div>
          )}

          {/* ── OBJECT METHODS TAB ── */}
          {activeTab==='objmethods' && (
            <div>
              <h3 className="text-white text-xl font-bold mb-6">Object CRUD Methods</h3>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
                <p className="text-gray-400 text-xs font-mono mb-4">Object.keys · Object.values · Object.entries · Object.assign · Object.freeze · delete · hasOwnProperty · Object.fromEntries · Spread</p>
                {renderObjectMethods()}
              </div>
            </div>
          )}

          {/* ── STRING METHODS TAB ── */}
          {activeTab==='stringmethods' && (
            <div>
              <h3 className="text-white text-xl font-bold mb-6">String Methods (10+)</h3>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
                <p className="text-gray-400 text-xs font-mono mb-4">trim · toUpperCase · toLowerCase · includes · startsWith · endsWith · replace · split · slice · indexOf · padStart · join</p>
                {renderStringMethods()}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── EDIT MODAL ── */}
      {showModal && (
        <div onClick={e=>{if(e.target===e.currentTarget)setShowModal(false);}}
          style={{position:'fixed',inset:0,background:'rgba(0,0,0,.8)',backdropFilter:'blur(6px)',zIndex:500,display:'flex',alignItems:'center',justifyContent:'center',padding:'1.5rem'}}>
          <div style={{background:'#111118',border:'1px solid #2a2a3d',borderRadius:'14px',padding:'2rem',width:'100%',maxWidth:'540px'}}>
            <h2 className="text-white text-xl font-bold mb-5">✏️ Edit Device</h2>
            <div className="grid grid-cols-2 gap-4">
              {[['model','Model Name','text'],['price','Price (USD)','number'],['ram','RAM (GB)','number'],['storage','Storage (GB)','number'],['battery','Battery (mAh)','number'],['year','Release Year','number']].map(([f,l,t])=>(
                <div key={f}><label style={labelStyle}>{l}</label><input style={inputStyle} type={t} value={editForm[f]} onChange={e=>setEditForm(p=>({...p,[f]:e.target.value}))}/></div>
              ))}
              <div><label style={labelStyle}>Series</label>
                <select style={inputStyle} value={editForm.series} onChange={e=>setEditForm(p=>({...p,series:e.target.value}))}>
                  {['Standard','Pro','A-Series','Fold'].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div><label style={labelStyle}>Stock Status</label>
                <select style={inputStyle} value={editForm.stock} onChange={e=>setEditForm(p=>({...p,stock:e.target.value}))}>
                  {['In Stock','Low Stock','Out of Stock'].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={updatePhone} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded text-sm uppercase">✓ Update</button>
              <button onClick={()=>setShowModal(false)} style={{border:'1px solid #4b5563',color:'#d1d5db',padding:'.5rem 1.5rem',borderRadius:'6px',background:'transparent',cursor:'pointer'}}>✕ Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
